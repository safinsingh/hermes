import 'reflect-metadata'

import { createServer } from 'http'
import { join } from 'path'
import * as amqp from 'amqplib'
import { ApolloServer } from 'apollo-server-express'
import cookieParser from 'cookie-parser'
import express from 'express'
import RateLimit from 'express-slow-down'
import { AMQPPubSub } from 'graphql-amqp-subscriptions'
import RedisStore from 'rate-limit-redis'
import { buildSchema } from 'type-graphql'
import { authChecker } from './auth'
import { prisma, port, redisURL, amqpUri } from './config'
import { jwt, logger, wsVerify } from './middleware'
import {
	FindManyGroupResolver,
	LoginResolver,
	SignUpResolver,
	SignOutResolver,
	SendMessageResolver,
	CreateGroupResolver,
	JoinGroupResolver,
	RemoveGroupResolver,
	MessageListenerResolver
} from './resolvers'
import type { Context } from './types'

const limiter = () =>
	RateLimit({
		delayAfter: 100,
		delayMs: 500,
		store: new RedisStore({
			redisURL
		}),
		windowMs: 60 * 1_000
	})

const main = async () => {
	const amqpConn = await amqp.connect(amqpUri)
	const pubSub = new AMQPPubSub({
		connection: amqpConn
	})

	const schema = await buildSchema({
		authChecker,
		emitSchemaFile: join(__dirname, '../prisma/schema.generated.graphql'),
		pubSub,
		resolvers: [
			FindManyGroupResolver,
			LoginResolver,
			SignUpResolver,
			SignOutResolver,
			SendMessageResolver,
			CreateGroupResolver,
			JoinGroupResolver,
			RemoveGroupResolver,
			MessageListenerResolver
		],
		validate: false
	})

	const apollo = new ApolloServer({
		context: ({ req, res, connection }): Context => ({
			prisma,
			req,
			res,
			userGroups: connection?.context.userGroups
		}),
		schema,
		subscriptions: {
			onConnect: async (_, __, context) => wsVerify(context)
		}
	})

	const app = express()
	app.use(logger())
	app.use(limiter())
	app.use(cookieParser())
	app.use(jwt())

	apollo.applyMiddleware({
		app,
		cors: {
			credentials: true,
			origin: [
				'http://localhost:3000',
				'ws://localhost:4000',
				'http://localhost:4000'
			]
		}
	})

	const http = createServer(app)
	apollo.installSubscriptionHandlers(http)

	http.listen(port, () => {
		console.log(
			`🚀 Server ready at http://localhost:${port}${apollo.graphqlPath}`
		)
		console.log(
			`🚀 Subscriptions ready at ws://localhost:${port}${apollo.subscriptionsPath}`
		)
	})

	const exit = () => {
		void Promise.all([prisma.$disconnect(), apollo.stop(), http.close()])
	}

	process.on('SIGINT', exit)
	process.on('SIGQUIT', exit)
	process.on('SIGTERM', exit)
}

main().catch(console.error)
