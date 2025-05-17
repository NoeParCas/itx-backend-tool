import { SortWeightQuery } from '../Query/SortWeightQuery'
import ProductView from '../Query/View/ProductView'
import ScoreStrategy from './ScoreStrategy'

export class SizeStockScoreStrategy implements ScoreStrategy {
	calculateScore(product: ProductView, weights: SortWeightQuery): number {
		const stockScore = product.sizeStock.filter((sizeStock) => sizeStock.stock > 0).length
		return parseFloat((stockScore * weights.stockRatio).toFixed(2))	
	}
}
