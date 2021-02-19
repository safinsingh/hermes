import { ApolloError } from 'apollo-server-express'
import { Subscription, Resolver, Root, ObjectType, Field } from 'type-graphql'
import { Message, Group } from '../generated/type-graphql'
import type { Context } from '../types'
import { PubSubPayload } from '../types'

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

	@Field() public initial!: boolean
}

@Resolver(() => Message)
export default class MessageListenerResolver {
	@Subscription(() => PubSubMessagePayload, {
		nullable: true,
		subscribe: (_, __, ctx) => {
			const {
				wsContext: { groups },
				pubSub
			}: Context = ctx

			if (!groups) throw new ApolloError('Failed to resolve group!')
			setTimeout(() => {
				void Promise.all(
					groups.map(async ({ messages, id }) => {
						if (messages.length === 1)
							await pubSub.publish(id, messages[0])
					})
				)
			}, 0)

			return pubSub.asyncIterator(groups.map((group) => group.id))
		}
	})
	public async messageListen(
		@Root() payload: PubSubPayload<'message'>
	): Promise<PubSubPayload<'message'>> {
		return payload
	}
}
