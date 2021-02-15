import crypto from 'crypto'
import { PrismaClient } from '@prisma/client'

const jwtSecret = process.env.JWT_KEY ?? crypto.randomBytes(20).toString('hex')
const argonSecret = Buffer.from(
	process.env.ARGON2_SECRET ?? crypto.randomBytes(20).toString('hex')
)
const port = process.env.PORT ? Number.parseInt(process.env.PORT, 10) : 4_000
const prisma = new PrismaClient()
const redisURL = process.env.REDIS_URL ?? ''
const amqpUri = process.env.AMQP_URI ?? ''

export { jwtSecret, prisma, port, argonSecret, redisURL, amqpUri }
