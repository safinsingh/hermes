import type { Response, Request, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'
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
