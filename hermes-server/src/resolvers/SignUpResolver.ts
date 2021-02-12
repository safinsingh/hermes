import { User } from '@generated/type-graphql'
import * as argon2 from 'argon2'
import { Arg, Mutation, Resolver, Ctx } from 'type-graphql'
import { createTokens } from '~/auth'
import { argonSecret } from '~/config'
import { Context } from '~/types'

@Resolver((of) => User)
export default class SignUpResolver {
	@Mutation((returns) => User)
	public async signUp(
		@Ctx() { prisma, res }: Context,
		@Arg('email') email: string,
		@Arg('password') password: string
	): Promise<User> {
		const user = await prisma.user.create({
			data: {
				email,
				name: email,
				password: await argon2.hash(password, { secret: argonSecret })
			}
		})

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
