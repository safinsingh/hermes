import { extendTheme } from '@chakra-ui/react'

export const customTheme = extendTheme({
	fonts: {
		body: 'Inter, sans-serif',
		heading: 'Inter, sans-serif'
	},
	initialColorMode: 'dark',
	useSystemColorMode: true
})
