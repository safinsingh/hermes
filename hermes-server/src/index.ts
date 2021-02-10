// eslint-disable-next-line import/no-unassigned-import
import 'reflect-metadata'

import { PrismaClient } from '@prisma/client'
import { ApolloServer } from 'apollo-server'
import { buildSchema } from 'type-graphql'
import { crudResolvers } from '../prisma/generated/type-graphql'
import type { Context } from './types'

const prisma = new PrismaClient()

const main = async () => {
	const schema = await buildSchema({
		resolvers: crudResolvers,
		validate: false
	})

	const server = new ApolloServer({
		context: (): Context => ({ prisma }),
		playground: true,
		schema
	})

	const { port } = await server.listen(4_000)
	console.log(`GraphQL is listening on http://localhost:${port}!`)
}

main().catch(console.error)
