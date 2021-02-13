import type { Prisma } from '@prisma/client'
import type { Response, Request } from 'express'
import * as jwt from 'jsonwebtoken'
import type { AuthChecker } from 'type-graphql'
import { prisma, jwtSecret } from './config'
import type { Context } from './types'

export const authChecker: AuthChecker<Context> = async ({
	context: {
		req: { userID }
	}
}) => {
	if (!userID) return false

	const user = await prisma.user.findUnique({
		select: {
			id: true
		},
		where: {
			id: userID
		}
	})

	return Boolean(user?.id)
}

export const createTokens = ({
	id,
	count
}: Prisma.UserGetPayload<{
	select: { id: true; count: true }
}>) => ({
	accessToken: jwt.sign({ count, id }, jwtSecret, {
		algorithm: 'HS256',
		expiresIn: '7d'
	}),
	refreshToken: jwt.sign({ id }, jwtSecret, {
		algorithm: 'HS256',
		expiresIn: '15m'
	})
})

export const applyTokens = ({
	req,
	res,
	user
}: {
	req: Request
	res: Response
	user: Prisma.UserGetPayload<{
		select: { id: true; count: true }
	}>
}) => {
	const {
		accessToken: newAccessToken,
		refreshToken: newRefreshToken
	} = createTokens(user)

	res.cookie('accessToken', newAccessToken, {
		maxAge: 1_000 * 60 * 15
	})

	res.cookie('refreshToken', newRefreshToken, {
		maxAge: 1_000 * 60 * 60 * 24 * 7
	})

	req.userID = user.id
}
