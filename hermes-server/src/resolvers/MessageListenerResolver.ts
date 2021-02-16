import { AuthenticationError } from 'apollo-server-express'
import type { AMQPPubSub } from 'graphql-amqp-subscriptions'
import {
	Subscription,
	Resolver,
	Root,
	Arg,
	ObjectType,
	Field
} from 'type-graphql'
import { Message, Group } from '../generated/type-graphql'
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
}

@Resolver(() => Message)
export default class MessageListenerResolver {
	@Subscription(() => PubSubMessagePayload, {
		nullable: true,
		subscribe: (_, args, ctx) => {
			const {
				userGroups,
				pubSub
			}: { userGroups?: string[]; pubSub: AMQPPubSub } = ctx

			args.groups.forEach((group: string) => {
				if (!userGroups?.includes(group))
					throw new AuthenticationError(
						'You are not a part of this group!'
					)
			})

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
