import { AuthenticationError } from 'apollo-server-express'
import {
	Subscription,
	Resolver,
	Root,
	Arg,
	ObjectType,
	Field
} from 'type-graphql'
import { Message, Group } from '../generated/type-graphql'
import type { Context } from '../types'
import { MessageSelection, PubSubPayload } from '../types'

@ObjectType()
class PubSubMessagePayloadUser {
	@Field() public name!: string
}

@ObjectType()
export class PubSubMessagePayload {
	@Field() public id!: string

	@Field() public group!: Group

	@Field() public text!: string

	@Field() public timestamp!: string

	@Field() public user!: PubSubMessagePayloadUser
}

@Resolver(() => Message)
export default class MessageListenerResolver {
	@Subscription(() => PubSubMessagePayload, {
		nullable: true,
		subscribe: (_, args, ctx) => {
			const { userGroups, pubSub, prisma }: Context = ctx

			args.groups.forEach((group: string) => {
				if (!userGroups?.includes(group))
					throw new AuthenticationError(
						'You are not a part of this group!'
					)
			})

			// uhhhhhhhhh
			setTimeout(() => {
				void Promise.all(
					args.groups.map(async (group: string) => {
						const lastMessage = await prisma.message.findMany({
							take: -1,
							where: { groupId: group },
							...MessageSelection
						})

						if (lastMessage.length === 1)
							await pubSub.publish(group, lastMessage[0])
					})
				)
			}, 0)

			return pubSub.asyncIterator(args.groups)
		}
	})
	public async messageListen(
		@Root() payload: PubSubPayload<'message'>,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		@Arg('groups', () => [String]) groups: string[]
	): Promise<PubSubPayload<'message'>> {
		return payload
	}
}
