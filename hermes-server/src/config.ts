import crypto from 'crypto'
import { PrismaClient } from '@prisma/client'

const { JWT_KEY, ARGON2_SECRET, PORT, REDIS_URL, AMQP_URI } = process.env

const jwtSecret = JWT_KEY ?? crypto.randomBytes(20).toString('hex')
const argonSecret = Buffer.from(
	ARGON2_SECRET ?? crypto.randomBytes(20).toString('hex')
)
const port = PORT ? Number.parseInt(PORT, 10) : 4_000
const prisma = new PrismaClient()
const redisURL = REDIS_URL ?? 'redis://localhost:6379'
const amqpUri = AMQP_URI ?? 'amqp://localhost:5672'

export { jwtSecret, prisma, port, argonSecret, redisURL, amqpUri }
