import { Query, Resolver, Ctx } from 'type-graphql'
import { User } from '../type-graphql-gen'
import { Context } from '../types'

@Resolver((of) => User)
export default class SignOutResolver {
	// TODO: find something better to return here
	@Query((returns) => Boolean)
	public async signOut(@Ctx() { res }: Context): Promise<Boolean> {
		res.clearCookie('accessToken')
		res.clearCookie('refreshToken')

		return true
	}
}
