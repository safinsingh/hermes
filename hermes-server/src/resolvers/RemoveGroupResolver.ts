import type { Prisma } from '@prisma/client'
import { Arg, Mutation, Resolver, Ctx } from 'type-graphql'
import { User, Group } from '../generated/type-graphql'
import { Context } from '../types'

@Resolver(() => User)
export default class RemoveGroupResolver {
	@Mutation(() => Group)
	public async removeGroup(
		@Ctx() { prisma, req: { userID } }: Context,
		@Arg('groupId') groupId: string
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
						id: userID
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
