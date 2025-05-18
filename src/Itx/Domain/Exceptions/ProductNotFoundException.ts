import NotFoundError from './NotFoundError'

export default class ProductNotFoundException extends NotFoundError {
	public constructor() {
		super('No products found. Please check the database connection, if migrations were executed or the query.')
	}
}
