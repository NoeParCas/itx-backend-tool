import SizeStockView from './SizeStockView'

export default class ProductView {
	constructor(
		readonly id: number, 
		readonly name: string, 
		readonly sales: number,
		readonly sizeStock: SizeStockView[]
	) {}
}
