import SalesScoreStrategy from '../../../../src/Itx/Application/Service/SalesScoreStrategy'
import { SortWeightQuery } from '../../../../src/Itx/Application/Query/SortWeightQuery'
import ProductView from '../../../../src/Itx/Application/Query/View/ProductView'
import { PRODUCT_ID, PRODUCT_NAME } from '../../Infrastructure/Mocks/mocks'

describe('SalesScoreStrategy', () => {
	let salesScoreStrategy: SalesScoreStrategy
  let product: ProductView
  let weights: SortWeightQuery

  beforeEach(() => {
    salesScoreStrategy = new SalesScoreStrategy()
    product = new ProductView(
			PRODUCT_ID, 
			PRODUCT_NAME, 
			10, 
			[]
		)
    weights = {
			id: 'random',
      salesUnit: 0.5,
      stockRatio: 0.5
    }
  })

  it('should calculate the score based on unit sales and salesUnit weight', () => {
    const score = salesScoreStrategy.calculateScore(product, weights)
    expect(score).toBe(parseFloat((10 * 0.5).toFixed(2)))
    expect(score).toBe(5)
  })

  it('should handle zero sales correctly', () => {
    product = new ProductView(
			PRODUCT_ID, 
			PRODUCT_NAME, 
			0, 
			[]
		)
    const score = salesScoreStrategy.calculateScore(product, weights)
    expect(score).toBe(parseFloat((0 * 0.5).toFixed(2)))
    expect(score).toBe(0)
  })
  it('should return a score of zero if there is no weight for salesUnit', () => {
		weights = {
			id: 'random',
      salesUnit: 0,
      stockRatio: 1
    }
    const score = salesScoreStrategy.calculateScore(product, weights)
    expect(score).toBe(parseFloat((10 * 0).toFixed(2)))
    expect(score).toBe(0)
  })
})
