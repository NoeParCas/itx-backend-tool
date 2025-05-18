export default function getQueryBuilderMock() {
	return {
		select: jest.fn().mockReturnThis(),
		from: jest.fn().mockReturnThis(),
		where: jest.fn().mockReturnThis(),
		andWhere: jest.fn().mockReturnThis(),
		orWhere: jest.fn().mockReturnThis(),
		orderBy: jest.fn().mockReturnThis(),
		limit: jest.fn().mockReturnThis(),
		offset: jest.fn().mockReturnThis(),
		innerJoin: jest.fn().mockReturnThis(),
		leftJoin: jest.fn().mockReturnThis(),
		rightJoin: jest.fn().mockReturnThis(),
		groupBy: jest.fn().mockReturnThis(),
		having: jest.fn().mockReturnThis(),
		insert: jest.fn().mockReturnThis(),
		update: jest.fn().mockReturnThis(),
		delete: jest.fn().mockReturnThis(),
		raw: jest.fn()
	}
}
