import { Controller } from './Controller'
import { QueryHandler } from '../../Application/Query/QueryHandler'
import ProductView from '../../Application/Query/View/ProductView'
import { SortWeightQuery } from '../../Application/Query/SortWeightQuery'
import { Request, Response } from 'express'
import Joi from 'joi'
import { ValidatorService } from '../../Application/Service/ValidatorService'
import NotFoundError from '../../Domain/Exceptions/NotFoundError'
import InvalidWeightValueException from '../../Domain/Exceptions/InvalidWeightValueException'
import { InvalidValueException } from '../../Domain/Exceptions/InvalidValueException'

export default class ListedProductsController implements Controller {
	constructor(
		private readonly queryHandler: QueryHandler<SortWeightQuery, ProductView>,
		private readonly schemaValidator: ValidatorService<Joi.ObjectSchema<unknown>>
	) {}
	
	async run(req: Request, res: Response) {
		try {
			await this.validateSchema(req)
			this.validateRequestBodyValues(req.body)

			const { salesUnit, stockRatio } = req.body

			const products = await this.queryHandler.getAll(new SortWeightQuery(req.url, salesUnit, stockRatio))

			res.status(200).json(products)
		} catch (error) {
			if (error instanceof Joi.ValidationError || error instanceof InvalidValueException) {
				return res.status(400).json({ error: error.message })
			}
			if (error instanceof NotFoundError) {
				return res.status(404).json({ error: error.message })
			}

			console.error('Error in ListedProductsController:', error)
			res.status(500).json({ error: 'Internal Server Error' })
		}
	}

	async validateSchema(req: Request) {
		const schema = this.buildSchemaObject()

		await this.schemaValidator.validate(schema.bodyParams, req.body)
	}


	private buildSchemaObject() {
		return {
			bodyParams: Joi.object({
				salesUnit: Joi.number().min(0).max(1).required(),
				stockRatio: Joi.number().min(0).max(1).required()
			})
		}
	}

	private validateRequestBodyValues(body: object) {
		const values = Object.values(body)
	
		const sum = values.reduce((acc: number, value) => {
			return acc + (value as number)
		}, 0)

		if (sum !== 1) {
			throw new InvalidWeightValueException(body)
		}
	}
}


