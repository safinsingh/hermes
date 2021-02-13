import 'reflect-metadata'

import { join } from 'path'
import { ApolloServer } from 'apollo-server-express'
import cookieParser from 'cookie-parser'
import express from 'express'
import RateLimit from 'express-slow-down'
import RedisStore from 'rate-limit-redis'
import { buildSchema } from 'type-graphql'
import { authChecker } from './auth'
import { prisma, port, redisURL } from './config'
import { jwt, logger } from './middleware'
import {
	FindManyGroupResolver,
	LoginResolver,
	SignUpResolver
} from './resolvers'
import type { Context } from './types'

const main = async () => {
	const schema = await buildSchema({
		authChecker,
		emitSchemaFile: join(__dirname, '../prisma/schema.generated.graphql'),
		resolvers: [FindManyGroupResolver, LoginResolver, SignUpResolver],
		validate: false
	})

	const server = new ApolloServer({
		context: ({ req, res }): Context => ({ prisma, req, res }),
		playground: true,
		schema
	})

	const limiter = RateLimit({
		delayAfter: 100,
		delayMs: 500,
		store: new RedisStore({
			redisURL
		}),
		windowMs: 60 * 1_000
	})

	const app = express()
	app.use(cookieParser())
	app.use(jwt())
	app.use(logger())
	app.use(limiter)

	server.applyMiddleware({ app })
	app.listen({ port }, () => {
		console.log(
			`Hermes GraphQL is listening on http://localhost:${port}${server.graphqlPath}`
		)
	})
}

main().catch(console.error)
