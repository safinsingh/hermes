import { AuthenticationError } from 'apollo-server-express'
import * as argon2 from 'argon2'
import { Arg, Query, Resolver, Ctx } from 'type-graphql'
import { applyTokens } from '../auth'
import { argonSecret } from '../config'
import { User } from '../type-graphql-gen'
import { Context } from '../types'

@Resolver((of) => User)
export default class LoginResolver {
	@Query((returns) => User)
	public async login(
		@Ctx() { prisma, req, res }: Context,
		@Arg('email') email: string,
		@Arg('password') password: string
	): Promise<User> {
		const user = await prisma.user.findUnique({
			where: {
				email
			}
		})

		if (!user) {
			throw new AuthenticationError(
				'Could not find a user with that email; would you like to create an account?'
			)
		}

		const authenticated = await argon2.verify(user.password, password, {
			salt: argonSecret
		})

		if (!authenticated) {
			throw new AuthenticationError('Your password is incorrect!')
		}

		applyTokens({ req, res, user })
		return user
	}
}
