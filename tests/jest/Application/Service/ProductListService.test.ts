import { SortWeightQuery } from '../../../../src/Itx/Application/Query/SortWeightQuery'
import ProductView from '../../../../src/Itx/Application/Query/View/ProductView'
import SizeStockView from '../../../../src/Itx/Application/Query/View/SizeStockView'
import ProductListService from '../../../../src/Itx/Application/Service/ProductListService'
import SalesScoreStrategy from '../../../../src/Itx/Application/Service/SalesScoreStrategy'
import SizeStockScoreStrategy from '../../../../src/Itx/Application/Service/SizeStockScoreStrategy'
import { ANY_OTHER_PRODUCT_ID, ANY_OTHER_PRODUCT_NAME, ANY_OTHER_PRODUCT_UNIT_SALES, PRODUCT_ID, PRODUCT_NAME, PRODUCT_UNIT_SALES, RANDOM_SIZE_STOCK, RANDOM_SIZE_STOCK_2, RANDOM_SIZE_STOCK_3, RANDOM_SIZE_STOCK_4, SIZE_L, SIZE_M, SIZE_S } from '../../Infrastructure/Mocks/mocks'

describe('ProductListService', () => {
	let service: ProductListService
	let mockSalesScoreStrategy: jest.Mocked<SalesScoreStrategy>
	let mockSizeStockScoreStrategy: jest.Mocked<SizeStockScoreStrategy>
	let products: ProductView[]
  let weights: SortWeightQuery

  beforeEach(() => {
    mockSalesScoreStrategy = {
      calculateScore: jest.fn(),
    } as jest.Mocked<SalesScoreStrategy>

    mockSizeStockScoreStrategy = {
      calculateScore: jest.fn(),
    } as jest.Mocked<SizeStockScoreStrategy>
    service = new ProductListService([
      mockSalesScoreStrategy,
      mockSizeStockScoreStrategy,
    ])
		weights = {
			id: 'ramdomId',
			salesUnit: 0.7,
			stockRatio: 0.3
		}
		products = [
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
	})

	it('should call calculateScore on each scoring strategy for each product', () => {
    service.listProducts(products, weights)

    expect(mockSalesScoreStrategy.calculateScore).toHaveBeenCalledTimes(products.length)
    products.forEach((product) => {
      expect(mockSalesScoreStrategy.calculateScore).toHaveBeenCalledWith(product, weights)
    })

    expect(mockSizeStockScoreStrategy.calculateScore).toHaveBeenCalledTimes(products.length)
    products.forEach((product) => {
      expect(mockSizeStockScoreStrategy.calculateScore).toHaveBeenCalledWith(product, weights)
    })
  })

	it('should sort the products by their total score in descending order', () => {
		mockSalesScoreStrategy.calculateScore
		.mockReturnValueOnce(7) 
		.mockReturnValueOnce(14) 
		mockSizeStockScoreStrategy.calculateScore
		.mockReturnValueOnce(0.9)
		.mockReturnValueOnce(0.3)

    const sortedProducts = service.listProducts(products, weights)

    expect(sortedProducts[0].id).toBe(2)
		expect(sortedProducts[1].id).toBe(1)
  })
})
