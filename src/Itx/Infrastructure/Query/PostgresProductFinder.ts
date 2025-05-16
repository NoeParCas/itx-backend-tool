import { Knex } from 'knex'
import { ProductFinder } from '../../Application/Query/Finder/ProductFinder'

export default class PostgresProductFinder implements ProductFinder {
	constructor(
		private readonly postgresClient: Knex
	) {}

	private findByIdQuery(id: string) {
		return this.postgresClient('products')
			.select('products.id', 'products.name', 'products.sales')
			.where('products.id', id)
			.innerJoin('size_stock', 'products.id', 'size_stock.product_id')
			.select('size_stock.size', 'size_stock.stock')
	}
}
