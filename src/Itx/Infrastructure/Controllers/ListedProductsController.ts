import { Controller } from './Controller'
import { QueryHandler } from '../../Application/Query/QueryHandler'
import ProductView from '../../Application/Query/View/ProductView'
import { SortWeightQuery } from '../../Application/Query/SortWeightQuery'
import { Request, Response } from 'express'

export default class ListedProductsController implements Controller {
	constructor(
		private readonly queryHandler: QueryHandler<SortWeightQuery, ProductView>
	) {}
	
	async run(req: Request, res: Response) {
		const { salesUnit, stockRatio } = req.body

		try {
			const products = await this.queryHandler.getAll(new SortWeightQuery(req.url, salesUnit, stockRatio))

			res.status(200).json(products)
		} catch (error) {
			console.error('Error fetching products:', error)
			res.status(500).json({ error: 'Internal Server Error' })
		}
	}
}
