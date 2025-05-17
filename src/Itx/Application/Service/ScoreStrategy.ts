import { SortWeightQuery } from '../Query/SortWeightQuery'
import ProductView from '../Query/View/ProductView'

export default interface ScoreStrategy {
	calculateScore(product: ProductView, weights: SortWeightQuery): number
}
