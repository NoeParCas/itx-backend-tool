import { SortWeightQuery } from '../../../../src/Itx/Application/Query/SortWeightQuery'
import ProductView from '../../../../src/Itx/Application/Query/View/ProductView'
import SizeStockView from '../../../../src/Itx/Application/Query/View/SizeStockView'
import SizeStockScoreStrategy from '../../../../src/Itx/Application/Service/SizeStockScoreStrategy' 
import { PRODUCT_ID, PRODUCT_NAME, SIZE_L, SIZE_M, SIZE_S } from '../../Infrastructure/Mocks/mocks'

describe('SizeStockScoreStrategy', () => {
    let sizeStockScoreStrategy: SizeStockScoreStrategy
    let weights: SortWeightQuery
  
    beforeEach(() => {
      sizeStockScoreStrategy = new SizeStockScoreStrategy()
      weights = {
				id: 'random',
        salesUnit: 0.25, 
        stockRatio: 0.75
      }
    })
  
    it('should calculate the score based on the number of size/stock entries with stock greater than zero', () => {
      const product = new ProductView(
				PRODUCT_ID, 
				PRODUCT_NAME,
				0, 
				[
					new SizeStockView(SIZE_S, 5),
					new SizeStockView(SIZE_M, 0),
					new SizeStockView(SIZE_L, 10)
				]		
			)
      const score = sizeStockScoreStrategy.calculateScore(product, weights)

      expect(score).toBe(parseFloat((2 * 0.75).toFixed(2)))
      expect(score).toBe(1.5)
    })
  
    it('should return a score of zero if no size/stock entries have stock greater than zero', () => {
			const product = new ProductView(
				PRODUCT_ID, 
				PRODUCT_NAME,
				0, 
				[
					new SizeStockView(SIZE_S, 0),
					new SizeStockView(SIZE_M, 0),
					new SizeStockView(SIZE_L, 0)
				]		
			)
      const score = sizeStockScoreStrategy.calculateScore(product, weights)
      expect(score).toBe(0)
    })

		it('should return a score of zero if there is no weight for stockRatio', () => {
			const product = new ProductView(
				PRODUCT_ID, 
				PRODUCT_NAME,
				0, 
				[
					new SizeStockView(SIZE_S, 5),
					new SizeStockView(SIZE_M, 0),
					new SizeStockView(SIZE_L, 10)
				]		
			)
			weights = {
				id: 'random',
				salesUnit: 1, 
				stockRatio: 0
			}	
			const score = sizeStockScoreStrategy.calculateScore(product, weights)
			expect(score).toBe(0)
		})
  })

