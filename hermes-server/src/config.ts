import crypto from 'crypto'
import { PrismaClient } from '@prisma/client'

const jwtSecret = process.env.JWT_KEY ?? crypto.randomBytes(20).toString('hex')
const argonSecret = Buffer.from(
	process.env.ARGON2_SECRET ?? crypto.randomBytes(20).toString('hex')
)
const port = process.env.PORT ?? 4_000
const prisma = new PrismaClient()

export { jwtSecret, prisma, port, argonSecret }
