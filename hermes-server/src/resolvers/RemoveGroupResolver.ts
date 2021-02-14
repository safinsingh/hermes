import type { Prisma } from '@prisma/client'
import { Arg, Mutation, Resolver, Ctx } from 'type-graphql'
import { User, Group } from '../generated/type-graphql'
import { Context } from '../types'

@Resolver((of) => User)
export default class RemoveGroupResolver {
	@Mutation((returns) => Group)
	public async removeGroup(
		@Ctx() { prisma }: Context,
		@Arg('groupId') groupId: string,
		@Arg('userId') userId: string
	): Promise<
		Prisma.GroupGetPayload<{
			select: {
				name: true
			}
		}>
	> {
		const group = await prisma.group.update({
			data: {
				users: {
					disconnect: {
						id: userId
					}
				}
			},
			select: {
				name: true
			},
			where: { id: groupId }
		})

		return group
	}
}
