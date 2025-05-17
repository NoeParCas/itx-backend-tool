import ProductListService from '../Service/ProductListService'
import { ProductFinder } from './Finder/ProductFinder'
import { QueryHandler } from './QueryHandler'
import { SortWeightQuery } from './SortWeightQuery'
import ProductView from './View/ProductView'

export default class ListedProductsQueryHandler implements QueryHandler<SortWeightQuery, ProductView> {
	constructor(
		private readonly finder: ProductFinder,
		private readonly listService: ProductListService
	) {}

	async getAll(query: SortWeightQuery): Promise<ProductView[]> {
		const products = await this.finder.findAll()
		const listedProducts = this.listService.listProducts(products, query)
		return listedProducts
	}
}
