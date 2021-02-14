// eslint-disable-next-line import/no-unassigned-import
import '~/styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { createClient, Provider } from 'urql'
import Navbar from '~/components/Navbar'
import { customTheme } from '~/theme'

const client = createClient({
	fetchOptions: {
		credentials: 'include'
	},
	url: 'http://localhost:4000/graphql'
})

const App = ({ Component, pageProps }) => {
	const { pathname } = useRouter()

	return (
		<Provider value={client}>
			<ChakraProvider theme={customTheme}>
				<Navbar active={pathname as '/' | '/login' | '/signup'} />
				<Component {...pageProps} />
			</ChakraProvider>
		</Provider>
	)
}

export default App
