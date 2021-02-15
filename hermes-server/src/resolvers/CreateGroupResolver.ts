import type { Prisma } from '@prisma/client'
import * as argon2 from 'argon2'
import { Arg, Mutation, Resolver, Ctx, Authorized } from 'type-graphql'
import { argonSecret } from '../config'
import { Group } from '../generated/type-graphql'
import { Context } from '../types'

@Resolver(() => Group)
export default class CreateGroupResolver {
	@Authorized()
	@Mutation(() => Group)
	public async createGroup(
		@Ctx() { prisma, req: { userID } }: Context,
		@Arg('name') name: string,
		@Arg('password', { nullable: true }) password?: string
	): Promise<
		Prisma.GroupGetPayload<{
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
				users: {
					connect: { id: userID }
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
