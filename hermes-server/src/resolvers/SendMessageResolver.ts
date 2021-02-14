import type { Prisma } from '@prisma/client'
import { ApolloError } from 'apollo-server-express'
import { Mutation, Resolver, Ctx, Authorized, Arg } from 'type-graphql'
import { Message } from '../generated/type-graphql'
import { Context } from '../types'

const userSelection = {
	select: {
		group: {
			select: {
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

@Resolver((of) => Message)
export default class SendMessageResolver {
	@Authorized()
	@Mutation((returns) => Message)
	public async sendMessage(
		@Ctx() { prisma }: Context,
		@Arg('text') text: string,
		@Arg('userId') userId: string,
		@Arg('groupId') groupId: string
	): Promise<Prisma.MessageGetPayload<typeof userSelection>> {
		const authed =
			(await prisma.user.findUnique({ where: { id: userId } })) !== null
		if (!authed)
			throw new ApolloError(
				"You don't have permission to send messages here!"
			)

		const message = await prisma.message.create({
			data: {
				group: {
					connect: {
						id: groupId
					}
				},
				text,
				user: {
					connect: {
						id: userId
					}
				}
			},
			...userSelection
		})

		return message
	}
}
