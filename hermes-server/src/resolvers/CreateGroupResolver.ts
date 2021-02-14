import type { Prisma } from '@prisma/client'
import * as argon2 from 'argon2'
import { Arg, Mutation, Resolver, Ctx } from 'type-graphql'
import { argonSecret } from '../config'
import { Group } from '../generated/type-graphql'
import { Context } from '../types'

@Resolver((of) => Group)
export default class CreateGroupResolver {
	@Mutation((returns) => Group)
	public async createGroup(
		@Ctx() { prisma }: Context,
		@Arg('name') name: string,
		@Arg('password', { nullable: true }) password?: string,
		@Arg('users', (type) => [String], { nullable: true }) users?: string[]
	): Promise<
		Prisma.UserGetPayload<{
			select: {
				id: true
				name: true
			}
		}>
	> {
		const group = await prisma.group.create({
			data: {
				name,
				password:
					password && (await argon2.hash(password, { salt: argonSecret })),
				users: users && {
					connect: users.map((email) => ({
						email
					}))
				}
			},
			select: {
				id: true,
				name: true
			}
		})

		return group
	}
}
