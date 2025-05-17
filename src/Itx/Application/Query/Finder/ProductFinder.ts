import ProductView from '../View/ProductView'

export interface ProductFinder {
	findAll(): Promise<ProductView[]>
}
