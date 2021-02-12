import type { PrismaClient } from '@prisma/client'
import type { Request, Response } from 'express'

export type Context = {
	prisma: PrismaClient
	req: Request
	res: Response
	userID: string
}
