import type { PrismaClient, Prisma } from '@prisma/client'
import type { Request, Response } from 'express'
import type { AMQPPubSub } from 'graphql-amqp-subscriptions'

export type Context = {
	prisma: PrismaClient
	req: Request
	res: Response
	pubSub: AMQPPubSub
	wsContext: {
		groups?: Array<{
			id: string
			name: string
			messages: Array<Prisma.MessageGetPayload<typeof MessageSelection>>
		}>
	}
}

export const MessageSelection = {
	select: {
		group: {
			select: {
				id: true,
				name: true
			}
		},
		id: true,
		text: true,
		timestamp: true,
		user: {
			select: {
				name: true
			}
		}
	}
} as const

export type PubSubPayload<
	T extends 'message' | 'typing',
	D = Prisma.MessageGetPayload<typeof MessageSelection>
> = T extends 'message' ? D : unknown
