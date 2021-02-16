import { parse as parseCookieRaw } from 'cookie'
import type { Response, Request, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'
import type { ConnectionContext } from 'subscriptions-transport-ws'
import { applyTokens } from '../auth'
import { prisma, jwtSecret } from '../config'

export default () => {
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

export const wsVerify = async (context: ConnectionContext) => {
	const { cookie } = context.request.headers
	const authError =
		"You must be authenticated to subscribe to a group's message"

	if (!cookie) throw new Error(authError)
	const { accessToken } = parseCookieRaw(cookie) as {
		accessToken?: string
	}
	if (!accessToken) throw new Error(authError)

	const { id } = jwt.verify(accessToken, jwtSecret) as {
		id: string
	}

	const user = await prisma.user.findUnique({
		include: {
			groups: {
				select: {
					id: true
				}
			}
		},
		where: { id }
	})

	return { userGroups: user?.groups.map((group) => group.id) }
}
