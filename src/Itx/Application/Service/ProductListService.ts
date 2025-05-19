import ProductView from '../Query/View/ProductView'
import { SortWeightQuery } from '../Query/SortWeightQuery'
import ScoreStrategy from './ScoreStrategy'

export default class ProductListService {
	constructor(
		private readonly scoringStrategies: ScoreStrategy[]
	) {}
	
	listProducts(products: ProductView[], weights: SortWeightQuery): ProductView[] {
		const productScores = products.map((product) => {
			const totalScore = this.calculateTotalScore(product, weights)
			return {
				product,
				score: totalScore
			}
		})

		return productScores
			.sort((a, b) => b.score - a.score)
			.map((entry) => entry.product) 
	}

	private calculateTotalScore(product: ProductView, weights: SortWeightQuery): number {
		return this.scoringStrategies
			.map((strategy) => strategy.calculateScore(product, weights))
			.reduce((acc, score) => acc + score, 0)
	}
}
