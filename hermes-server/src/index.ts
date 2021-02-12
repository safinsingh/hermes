import 'reflect-metadata'

import { join } from 'path'
import { ApolloServer } from 'apollo-server-express'
import cookieParser from 'cookie-parser'
import express from 'express'
import { buildSchema } from 'type-graphql'
import { authChecker, jwtVerify } from './auth'
import { prisma, port } from './config'
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

	const app = express()
	app.use(cookieParser())
	app.use(jwtVerify())

	server.applyMiddleware({ app })
	app.listen({ port }, () => {
		console.log(
			`Hermes GraphQL is listening on http://localhost:${port}${server.graphqlPath}`
		)
	})
}

main().catch(console.error)
