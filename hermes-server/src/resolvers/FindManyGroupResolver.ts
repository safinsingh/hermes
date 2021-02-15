import type { Prisma } from '@prisma/client'
import { ApolloError } from 'apollo-server-express'
import { Query, Resolver, Ctx, Authorized } from 'type-graphql'
import { Group, User } from '../generated/type-graphql'
import { Context } from '../types'

@Resolver(() => User)
export default class FindManyGroupResolver {
	@Authorized()
	@Query(() => [Group])
	public async groups(
		@Ctx() { prisma, req }: Context
	): Promise<
		Array<
			Prisma.GroupGetPayload<{
				select: {
					id: true
					name: true
				}
			}>
		>
	> {
		const userResolved = await prisma.user.findUnique({
			select: {
				groups: {
					select: {
						id: true,
						name: true
					}
				}
			},
			where: {
				id: req.userID
			}
		})

		if (!userResolved)
			throw new ApolloError('Failed to resolve user given session ID!')

		return userResolved.groups
	}
}
