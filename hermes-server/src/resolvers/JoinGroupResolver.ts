import type { Prisma } from '@prisma/client'
import { ApolloError } from 'apollo-server-express'
import * as argon2 from 'argon2'
import { Arg, Mutation, Resolver, Ctx } from 'type-graphql'
import { argonSecret } from '../config'
import { User, Group } from '../generated/type-graphql'
import { Context } from '../types'

@Resolver(() => User)
export default class JoinGroupResolver {
	@Mutation(() => Group)
	public async joinGroup(
		@Ctx() { prisma, req: { userID } }: Context,
		@Arg('id') id: string,
		@Arg('password', { nullable: true }) password?: string
	): Promise<
		Prisma.GroupGetPayload<{
			select: {
				id: true
				name: true
			}
		}>
	> {
		const group = await prisma.group.findUnique({
			select: { id: true, name: true, password: true },
			where: { id }
		})

		if (!group)
			throw new ApolloError('Could not find a group with that ID!', '500')

		if (
			!password ||
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			(await argon2.verify(group.password!, password, {
				salt: argonSecret
			}))
		) {
			await prisma.user.update({
				data: {
					groups: {
						connect: {
							id
						}
					}
				},
				where: { id: userID }
			})

			return { id: group.id, name: group.name }
		} else throw new ApolloError('Incorrect group password!', '404')
	}
}
