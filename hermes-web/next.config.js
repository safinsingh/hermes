const path = require('path')

/** @type {import('next/dist/next-server/server/config').NextConfig} */
module.exports = {
	future: {
		webpack5: true
	},
	reactStrictMode: true,
	webpack: (config) => {
		config.resolve.alias['~'] = path.resolve('./src')
		return config
	}
}
