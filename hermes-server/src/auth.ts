import type { Prisma } from '@prisma/client'
import type { Response, Request, NextFunction } from 'express'
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

export const jwtVerify = () => {
	return async (req: Request, res: Response, next: NextFunction) => {
		const { accessToken, refreshToken } = req.cookies as {
			accessToken?: string
			refreshToken?: string
		}

		if (!refreshToken) return next()
		if (!accessToken) {
			let data: { id: string; count: number }
			try {
				data = jwt.verify(refreshToken, jwtSecret) as {
					id: string
					count: number
				}
			} catch {
				return next()
			}

			const { id, count } = data
			let user = await prisma.user.findUnique({
				select: { count: true, id: true },
				where: { id }
			})

			if (count !== user?.count) return next()
			user = await prisma.user.update({
				data: { count: { increment: 1 } },
				where: { id }
			})

			applyTokens({ req, res, user })
			return next()
		}

		const { id: authenticatedID } = jwt.verify(accessToken, jwtSecret) as {
			id: string
		}

		req.userID = authenticatedID
		return next()
	}
}
