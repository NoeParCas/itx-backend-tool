import { Knex } from 'knex'
import getQueryBuilderMock from '../Mocks/QueryBuilderMock'
import PostgresProductFinder from '../../../../src/Itx/Infrastructure/Query/PostgresProductFinder'
import ProductView from '../../../../src/Itx/Application/Query/View/ProductView'
import SizeStockView from '../../../../src/Itx/Application/Query/View/SizeStockView'
import ProductNotFoundException from '../../../../src/Itx/Domain/Exceptions/ProductNotFoundException'
import { PRODUCT_ID, PRODUCT_NAME, PRODUCT_UNIT_SALES, RANDOM_SIZE_STOCK, SIZE_M, SIZE_S, 
	RANDOM_SIZE_STOCK_2,
	SIZE_L,
	RANDOM_SIZE_STOCK_3,RANDOM_SIZE_STOCK_4,
	ANY_OTHER_PRODUCT_ID, ANY_OTHER_PRODUCT_NAME, ANY_OTHER_PRODUCT_UNIT_SALES
} from '../Mocks/mocks'

describe('PostgresProductFinder', () => {
	const queryBuilder = getQueryBuilderMock() 
	const QUERY_RESULT = [
		{
			id: PRODUCT_ID,
			name: PRODUCT_NAME,
			latest_sales: PRODUCT_UNIT_SALES,
			latest_stock: [
				{ size: SIZE_S, stock: RANDOM_SIZE_STOCK },
				{ size: SIZE_M, stock: RANDOM_SIZE_STOCK_2 },
				{ size: SIZE_L, stock: RANDOM_SIZE_STOCK_3 }
			]
		},
		{
			id: ANY_OTHER_PRODUCT_ID,
			name: ANY_OTHER_PRODUCT_NAME,
			latest_sales: ANY_OTHER_PRODUCT_UNIT_SALES,
			latest_stock: [
				{ size: SIZE_S, stock: RANDOM_SIZE_STOCK_4 },
				{ size: SIZE_M, stock: RANDOM_SIZE_STOCK_2 },
				{ size: SIZE_L, stock: RANDOM_SIZE_STOCK_4 }
			]
		}
	]
	const EXPECTED_FINDER_RESULT = [
		new ProductView(
			PRODUCT_ID,
			PRODUCT_NAME,
			PRODUCT_UNIT_SALES,
			[
				new SizeStockView(SIZE_S, RANDOM_SIZE_STOCK),
				new SizeStockView(SIZE_M, RANDOM_SIZE_STOCK_2),
				new SizeStockView(SIZE_L, RANDOM_SIZE_STOCK_3)
			]
		),
		new ProductView(
			ANY_OTHER_PRODUCT_ID,
			ANY_OTHER_PRODUCT_NAME,
			ANY_OTHER_PRODUCT_UNIT_SALES,
			[
				new SizeStockView(SIZE_S, RANDOM_SIZE_STOCK_4),
				new SizeStockView(SIZE_M, RANDOM_SIZE_STOCK_2),
				new SizeStockView(SIZE_L, RANDOM_SIZE_STOCK_4)
			]
		)
	]

	it('should return all updated product information', async () => {
		const knexMock = (jest.fn().mockReturnValue(queryBuilder) as unknown) as Knex
		const productFinder = new PostgresProductFinder(knexMock)

		jest.spyOn(productFinder, 'findAllQuery').mockResolvedValue(QUERY_RESULT) 
		
		const result = await productFinder.findAll()

		expect(result).toEqual(EXPECTED_FINDER_RESULT)
	})

	it('should throw an error if no products are found', async () => {
		const knexMock = jest.fn().mockReturnValue(queryBuilder) as unknown as Knex
		const productFinder = new PostgresProductFinder(knexMock)

		jest.spyOn(productFinder, 'findAllQuery').mockResolvedValue([]) 

		await expect(productFinder.findAll()).rejects.toThrow(ProductNotFoundException)
	})
})
