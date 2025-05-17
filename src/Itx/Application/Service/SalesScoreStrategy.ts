import { SortWeightQuery } from '../Query/SortWeightQuery'
import ProductView from '../Query/View/ProductView'
import ScoreStrategy from './ScoreStrategy'

export default class SalesScoreStrategy implements ScoreStrategy {
	calculateScore(product: ProductView, weights: SortWeightQuery): number {
		return parseFloat((product.sales * weights.salesUnit).toFixed(2))
	}
}
