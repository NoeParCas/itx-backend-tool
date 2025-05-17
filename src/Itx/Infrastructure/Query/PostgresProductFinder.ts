import { Knex } from 'knex'
import { ProductFinder } from '../../Application/Query/Finder/ProductFinder'
import SizeStockView from '../../Application/Query/View/SizeStockView'
import ProductView from '../../Application/Query/View/ProductView'

const SCHEMA = 'itx'
const PRODUCT_TABLE = 'product'
const SIZE_STOCK_TABLE = 'stock'
const SALES_UNITS_TABLE = 'sales_units'

type LatestStockType = {
		size: string
		stock: number
	}
type ProductQueryType = {
	id: number
	name: string
	latest_sales: number
	latest_stock: LatestStockType[]
}
export default class PostgresProductFinder implements ProductFinder {
	constructor(
		private readonly postgresClient: Knex
	) {}

	async findAll(): Promise<ProductView[]> {
		const query = await this.findAllQuery()
		console.log('Query result', query)
		if (query.length === 0) {
			throw new Error('Products not found')
		}

		const products = query.map((product:ProductQueryType ) => {
			const sizeStock = product.latest_stock.map((stock: LatestStockType) => {
				return new SizeStockView(stock.size, stock.stock)
			})

			return new ProductView(
				product.id,
				product.name,
				product.latest_sales,
				sizeStock
			)
		})

		return products
	}

private async findAllQuery() {
	console.log('Finding all products')
	return this.postgresClient(PRODUCT_TABLE)
		.select(
			`${PRODUCT_TABLE}.id`, 
			`${PRODUCT_TABLE}.name`,
			'latest_sales.units as latest_sales',
			this.postgresClient.raw(`jsonb_agg(
				jsonb_build_object(
					'size', latest_stock.size,
					'stock', latest_stock.stock
				)
			) as latest_stock`),
		)
		.withSchema(SCHEMA)
		.leftJoin(
			this.postgresClient.raw(`(
				SELECT product_id, units
				FROM ${SCHEMA}.${SALES_UNITS_TABLE}
				WHERE (product_id, updated_at) IN (
					SELECT product_id, MAX(updated_at)
					FROM ${SCHEMA}.${SALES_UNITS_TABLE}
					GROUP BY product_id
				)
			) as latest_sales`),
			`${PRODUCT_TABLE}.id`,
			'latest_sales.product_id'
		)
		.leftJoin(
			this.postgresClient.raw(`(
				SELECT product_id, size, stock
				FROM ${SCHEMA}.${SIZE_STOCK_TABLE}
				WHERE (product_id, size, updated_at) IN (
					SELECT product_id, size, MAX(updated_at)
					FROM ${SCHEMA}.${SIZE_STOCK_TABLE}
					GROUP BY product_id, size
				)
			) as latest_stock`),
			`${PRODUCT_TABLE}.id`,
			'latest_stock.product_id'
		)
		.groupBy(`${PRODUCT_TABLE}.id`, 'latest_sales.units')
	}
}
