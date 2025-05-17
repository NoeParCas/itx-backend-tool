export interface ValidatorService<T> {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	validate(schema: T, data: any): Promise<unknown>
}
