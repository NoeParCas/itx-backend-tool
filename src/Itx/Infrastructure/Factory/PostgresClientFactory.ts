import knex, { Knex } from 'knex'
import { v4 } from 'uuid'

type PostgresConnectionType = {
	host: string
	database: string
	user: string
	password: string
	port: number
}

let instance: string
export class PostgresClientFactory {
	static createConnection(config: PostgresConnectionType): Knex {
    const pgConnectionConfig = {
      client: 'pg',
      connection: {
				port: config.port || process.env.POSTGRES_PORT as unknown as number,
        host: config.host || process.env.POSTGRES_HOST as unknown as string,
        database: config.database || process.env.POSTGRES_DB as unknown as string,
        user: config.user || process.env.POSTGRES_USER as unknown as string,
        password: config.password || process.env.POSTGRES_PASSWORD as unknown as string,
      },
      pool: {
        min: 0,
        max: 70,
        acquireTimeoutMillis: 30000,
        idleTimeoutMillis: 30000,
        propagateCreateError: false
      }
    }

		if(!instance) {
			instance = v4()
		}

    return knex(pgConnectionConfig)
			.on('start', function(builder: Knex.QueryBuilder) {
				builder.toSQL().toNative()
			})
  }
}
