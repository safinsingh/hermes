import { Query, Resolver } from 'type-graphql'
import { User } from '../generated/type-graphql'

@Resolver(() => User)
export default class JoinGroupResolver {
	@Query(() => Boolean)
	public ping(): string {
		return 'pong!'
	}
}
