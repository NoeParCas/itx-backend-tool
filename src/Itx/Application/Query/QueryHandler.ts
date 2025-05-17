export interface QueryHandler<QueryType, ResponseType> {
	getAll(query: QueryType): Promise<ResponseType[]>
}
