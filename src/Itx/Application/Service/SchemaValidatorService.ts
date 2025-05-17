import Joi from 'joi'
import { ValidatorService } from './ValidatorService'

export default class SchemaValidatorService implements ValidatorService<Joi.ObjectSchema<unknown>> {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	async validate(schema: Joi.ObjectSchema<unknown>, data: any): Promise<unknown> {
		return await schema.validateAsync(data)
	}
}
