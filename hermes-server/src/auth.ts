import type { User } from '@generated/type-graphql'
import type { Response, Request, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'
import type { AuthChecker } from 'type-graphql'
import { prisma, jwtSecret } from '~/config'
import type { Context } from '~/types'

export const authChecker: AuthChecker<Context> = async ({
	context: { userID }
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

export const createTokens = (user: User | { id: string; count: number }) => ({
	accessToken: jwt.sign({ count: user.count, id: user.id }, jwtSecret, {
		algorithm: 'HS256',
		expiresIn: '7d'
	}),
	refreshToken: jwt.sign({ id: user.id }, jwtSecret, {
		algorithm: 'HS256',
		expiresIn: '15m'
	})
})

export const jwtVerify = () => {
	return async (request: Request, response: Response, next: NextFunction) => {
		const { accessToken, refreshToken } = request.cookies

		if (!accessToken || !refreshToken) return next()

		try {
			const { id } = jwt.verify(accessToken, jwtSecret) as {
				id: string
			}
			;(request as Request & { userID: string }).userID = id

			return next()
			// eslint-disable-next-line no-empty
		} catch {}

		if (!refreshToken) return next()

		let data: {
			id: string
			count: number
		}

		try {
			data = jwt.verify(refreshToken, jwtSecret) as typeof data
		} catch {
			return next()
		}

		const user = await prisma.user.findUnique({
			select: {
				count: true,
				id: true
			},
			where: {
				id: data.id
			}
		})

		if (!user || user.count !== data.count) return next()

		const {
			accessToken: newAccessToken,
			refreshToken: newRefreshToken
		} = createTokens(user)
		response.cookie('accessToken', newAccessToken, {
			maxAge: 1_000 * 60 * 15
		})
		response.cookie('refreshToken', newRefreshToken, {
			maxAge: 1_000 * 60 * 60 * 24 * 7
		})
		;(request as Request & { userID: string }).userID = user.id

		return next()
	}
}
