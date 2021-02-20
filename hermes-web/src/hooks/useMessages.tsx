import type { PubSubMessagePayload } from 'hermes-server/dist/generated/urql'
import { gql, useSubscription } from 'urql'

const CHAT_SUBSCRIPTION = gql`
	subscription {
		messageListen {
			group {
				id
				name
			}
			id
			text
			timestamp
			user {
				name
			}
		}
	}
`

const useMessages = () => {
	const [messageStream] = useSubscription<
		{ messageListen: PubSubMessagePayload },
		{
			[group: string]: {
				name: string
				messages: PubSubMessagePayload[]
				lastMessage?: PubSubMessagePayload
			}
		}
	>({ query: CHAT_SUBSCRIPTION }, (prev = {}, { messageListen: message }) => {
		const { group } = message
		const prevMessages = prev[group.id]?.messages ?? []
		const dupe =
			prevMessages.length === 0
				? false
				: prevMessages[prevMessages.length - 1].id === message.id
		const newMessage = dupe ? [] : [message]

		return {
			...prev,
			[group.id]: {
				lastMessage: newMessage[newMessage.length - 1],
				messages: [...prevMessages, ...newMessage],
				name: group.name
			}
		}
	})

	return messageStream
}

export default useMessages
