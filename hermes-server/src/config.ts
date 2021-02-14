import crypto from 'crypto'
import { PrismaClient } from '@prisma/client'

const jwtSecret = process.env.JWT_KEY ?? crypto.randomBytes(20).toString('hex')
const argonSecret = Buffer.from(
	process.env.ARGON2_SECRET ?? crypto.randomBytes(20).toString('hex')
)
const port = process.env.PORT ?? 4_000
const prisma = new PrismaClient()
const redisURL = process.env.REDIS_URL ?? ''
const pubSubHost = process.env.PUBSUB_HOST ?? 'localhost'
const pubSubPort = Number.parseInt(process.env.PUBSUB_PORT ?? '0', 10)

export {
	jwtSecret,
	prisma,
	port,
	argonSecret,
	redisURL,
	pubSubHost,
	pubSubPort
}
