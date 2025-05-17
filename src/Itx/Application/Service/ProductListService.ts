import ProductView from '../Query/View/ProductView'
import SizeStockView from '../Query/View/SizeStockView'
import { SortWeightQuery } from '../Query/SortWeightQuery'

export default class ProductListService {
	listProducts(products: ProductView[], weights: SortWeightQuery): ProductView[] {
		const initialMap = new Map<number, ProductView>()
		const productsPonderationMap = products.map((product) => {
			let ponderation = 0
			ponderation += this.calculateProductPonderation(this.sizeStockRatioCalculation(product.sizeStock), weights.stockRatio)
			ponderation += this.calculateProductPonderation(product.sales, weights.salesUnit)

			
			if (!initialMap.has(ponderation)) {
				initialMap.set(ponderation, product)
			}

			return initialMap
		})

		return this.sortMapByIntegerKeyDescending(productsPonderationMap[0])
	}

	private calculateProductPonderation(score: number, weight: number): number {
		return Number((score * weight).toFixed(2))
	}
	private sizeStockRatioCalculation(stock: SizeStockView[]): number {
		const totalStock = stock.reduce((acc, sizeStock) => acc + sizeStock.stock, 0)
		const totalSizes = stock.length
		return totalStock / totalSizes
	}

	private sortMapByIntegerKeyDescending(map: Map<number, ProductView>): ProductView[] {
		const entries = Array.from(map.entries())
	
		entries.sort((a, b) => {
			const integerA = Math.floor(a[0])
			const integerB = Math.floor(b[0])
			return integerB - integerA
		})

		const sortedProducts = entries.map(entry => entry[1])

		return sortedProducts
	}
}
