// eslint-disable-next-line import/no-unassigned-import
import '~/styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { devtoolsExchange } from '@urql/devtools'
import ws from 'isomorphic-ws'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import {
	createClient,
	Provider,
	fetchExchange,
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
		devtoolsExchange,
		dedupExchange,
		fetchExchange,
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

const App = ({ Component, pageProps }) => (
	<Provider value={client}>
		<ChakraProvider theme={customTheme}>
			<Navbar />
			<Component {...pageProps} />
		</ChakraProvider>
	</Provider>
)

export default App
