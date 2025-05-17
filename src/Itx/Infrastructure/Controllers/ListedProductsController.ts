import { ProductFinder } from '../../Application/Query/Finder/ProductFinder'
import { Request, Response } from 'express'
import { Controller } from './Controller'

export default class ListedProductsController implements Controller {
	constructor(
			private readonly productFinder: ProductFinder
	) {}
	
	async run(req: Request, res: Response): Promise<void> {
		const products = await this.productFinder.findAll()
		console.log('Those are the products', products)
		res.status(200).json(products)
	}
}
