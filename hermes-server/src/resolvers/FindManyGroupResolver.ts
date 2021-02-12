import { UserWhereUniqueInput, Group, User } from '@generated/type-graphql'
import type { Prisma } from '@prisma/client'
import { ApolloError } from 'apollo-server-express'
import { Arg, Query, Resolver, Ctx, Authorized } from 'type-graphql'
import { Context } from '~/types'

@Resolver((of) => User)
export default class FindManyGroupResolver {
	@Authorized()
	@Query((returns) => [Group])
	public async groups(
		@Ctx() { prisma }: Context,
		@Arg('user') user: UserWhereUniqueInput
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
				},
				id: true,
				name: true
			},
			where: user
		})

		if (!userResolved)
			throw new ApolloError('Failed to resolve user given session ID!')

		return userResolved.groups
	}
}
