import { User } from '@generated/type-graphql'
import { AuthenticationError } from 'apollo-server-express'
import * as argon2 from 'argon2'
import { Arg, Query, Resolver, Ctx } from 'type-graphql'
import { createTokens } from '~/auth'
import { argonSecret } from '~/config'
import { Context } from '~/types'

@Resolver((of) => User)
export default class LoginResolver {
	@Query((returns) => User)
	public async login(
		@Ctx() { prisma, res }: Context,
		@Arg('email') email: string,
		@Arg('password') password: string
	): Promise<User> {
		const user = await prisma.user.findUnique({
			where: {
				email
			}
		})

		if (!user) throw new AuthenticationError('Your email is incorrect!')
		if (await argon2.verify(user.password, password, { secret: argonSecret }))
			throw new AuthenticationError('Your password is incorrect!')

		const { accessToken, refreshToken } = createTokens(user)

		res.cookie('accessToken', accessToken, {
			maxAge: 1_000 * 60 * 15
		})
		res.cookie('refreshToken', refreshToken, {
			maxAge: 1_000 * 60 * 60 * 24 * 7
		})

		return user
	}
}
