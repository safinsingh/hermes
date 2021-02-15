import {
	Subscription,
	Resolver,
	Authorized,
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
		topics: ({ args }) => args.groupId
	})
	public messageListen(
		@Root() payload: PubSubPayload<'message'>,
		@Arg('groupId') groupId: string
	): PubSubPayload<'message'> {
		return payload
	}
}
