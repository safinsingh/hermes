import { ApolloError } from 'apollo-server-express'
import * as argon2 from 'argon2'
import { Arg, Mutation, Resolver, Ctx } from 'type-graphql'
import { applyTokens } from '../auth'
import { argonSecret } from '../config'
import { User } from '../generated/type-graphql'
import { Context } from '../types'

@Resolver(() => User)
export default class SignUpResolver {
	@Mutation(() => User)
	public async signUp(
		@Ctx() { prisma, req, res }: Context,
		@Arg('email') email: string,
		@Arg('password') password: string,
		@Arg('name') name: string
	): Promise<User> {
		let user: User

		try {
			user = await prisma.user.create({
				data: {
					email,
					name,
					password: await argon2.hash(password, { salt: argonSecret })
				}
			})
		} catch (error) {
			if (error.code === 'P2002')
				throw new ApolloError('Email is already taken!')
			else throw new ApolloError('Internal server error!')
		}

		applyTokens({ req, res, user })
		return user
	}
}
