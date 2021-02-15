import { Mutation, Resolver, Ctx } from 'type-graphql'
import { User } from '../generated/type-graphql'
import { Context } from '../types'

@Resolver(() => User)
export default class SignOutResolver {
	// TODO: find something better to return here
	@Mutation(() => Boolean)
	public async signOut(@Ctx() { res }: Context): Promise<Boolean> {
		res.clearCookie('accessToken')
		res.clearCookie('refreshToken')

		return true
	}
}
