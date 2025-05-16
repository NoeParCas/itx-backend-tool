import ProductView from '../View/ProductView'

export interface ProductFinder {
	findById(id: string): Promise<ProductView>
}
