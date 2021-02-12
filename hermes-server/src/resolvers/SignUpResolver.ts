import * as argon2 from 'argon2'
import { Arg, Mutation, Resolver, Ctx } from 'type-graphql'
import { applyTokens } from '../auth'
import { argonSecret } from '../config'
import { User } from '../type-graphql-gen'
import { Context } from '../types'

@Resolver((of) => User)
export default class SignUpResolver {
	@Mutation((returns) => User)
	public async signUp(
		@Ctx() { prisma, req, res }: Context,
		@Arg('email') email: string,
		@Arg('password') password: string
	): Promise<User> {
		const user = await prisma.user.create({
			data: {
				email,
				name: email,
				password: await argon2.hash(password, { salt: argonSecret })
			}
		})

		applyTokens({ req, res, user })
		return user
	}
}
