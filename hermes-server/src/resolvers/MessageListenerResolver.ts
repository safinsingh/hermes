import { ApolloError } from 'apollo-server-express'
import {
	Subscription,
	Resolver,
	Root,
	Arg,
	ObjectType,
	Field,
	Ctx
} from 'type-graphql'
import { Message, Group } from '../generated/type-graphql'
import { PubSubPayload, Context } from '../types'

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
		topics: ({ args }) => args.groups
	})
	public async messageListen(
		@Root() payload: PubSubPayload<'message'>,
		@Ctx() { userGroups }: Context,
		@Arg('groups', () => [String]) groups: string[]
	): Promise<PubSubPayload<'message'>> {
		if (!userGroups?.includes(payload.group.id))
			throw new ApolloError('You are not part of this group!')

		return payload
	}
}
