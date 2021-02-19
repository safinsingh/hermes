// eslint-disable-next-line import/no-unassigned-import
import '~/styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import ws from 'isomorphic-ws'
import { useRouter } from 'next/router'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import {
	createClient,
	Provider,
	defaultExchanges,
	dedupExchange,
	subscriptionExchange
} from 'urql'
import Navbar from '~/components/Navbar'
import { customTheme } from '~/theme'

const subscriptionClient = new SubscriptionClient(
	'ws://localhost:4000/graphql',
	{ reconnect: true },
	ws
)
const client = createClient({
	exchanges: [
		...defaultExchanges,
		dedupExchange,
		subscriptionExchange({
			forwardSubscription: (op) => {
				return subscriptionClient.request(op)
			}
		})
	],
	fetchOptions: {
		credentials: 'include'
	},
	requestPolicy: 'network-only',
	url: 'http://localhost:4000/graphql'
})

const App = ({ Component, pageProps }) => {
	const { pathname } = useRouter()

	return (
		<Provider value={client}>
			<ChakraProvider theme={customTheme}>
				<Navbar
					active={
						pathname as string | '/' | '/chat' | '/login' | '/signup'
					}
				/>
				<Component {...pageProps} />
			</ChakraProvider>
		</Provider>
	)
}

export default App
