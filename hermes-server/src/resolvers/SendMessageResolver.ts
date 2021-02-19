import { ApolloError } from 'apollo-server-express'
import { PubSubEngine } from 'graphql-subscriptions'
import { Mutation, Resolver, Ctx, Authorized, Arg, PubSub } from 'type-graphql'
import { Message } from '../generated/type-graphql'
import type { PubSubPayload } from '../types'
import { Context, MessageSelection } from '../types'
import { PubSubMessagePayload } from './MessageListenerResolver'

@Resolver(() => Message)
export default class SendMessageResolver {
	@Authorized()
	@Mutation(() => PubSubMessagePayload)
	public async sendMessage(
		@Ctx() { prisma, req: { userID } }: Context,
		@PubSub() pubSub: PubSubEngine,
		@Arg('text') text: string,
		@Arg('groupId') groupId: string
	): Promise<PubSubPayload<'message'>> {
		const authed =
			(await prisma.user.findUnique({ where: { id: userID } })) !== null
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
						id: userID
					}
				}
			},
			...MessageSelection
		})

		await pubSub.publish(groupId, message)
		return { ...message, initial: false }
	}
}
