import { bold, cyan, whiteBright } from 'chalk'
import type { Response, Request, NextFunction } from 'express'

const { log } = console

const logBuilder = (msg: string) => {
	return `${bold(cyan(new Date().toISOString()))} | ${whiteBright(msg)}`
}

export default () => {
	return (
		{ ip, path, method }: Request,
		{ statusCode }: Response,
		next: NextFunction
	) => {
		log(logBuilder(`${method} ${path} => ${statusCode.toString()} (${ip})`))
		next()
	}
}
