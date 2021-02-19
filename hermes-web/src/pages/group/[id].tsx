/* eslint-disable @typescript-eslint/unbound-method */

import {
	Avatar,
	Box,
	Container,
	Text,
	useToast,
	Flex,
	Input
} from '@chakra-ui/react'
import gql from 'graphql-tag'
import type {
	MutationSendMessageArgs,
	PubSubMessagePayload
} from 'hermes-server/dist/generated/urql'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useSubscription } from 'urql'
import { Loading } from '~/components'

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

const POST_MESSAGE_MUTATION = gql`
	mutation($text: String!, $groupId: String!) {
		sendMessage(text: $text, groupId: $groupId) {
			id
		}
	}
`

const GroupPage = () => {
	const router = useRouter()
	const id = router.query.id as string
	const [loading, setLoading] = useState(false)
	const { register, handleSubmit, reset } = useForm()

	const toast = useToast({
		isClosable: true,
		position: 'top-right',
		variant: 'solid'
	})

	const [messageStream] = useSubscription<
		{ messageListen: PubSubMessagePayload },
		PubSubMessagePayload[],
		{}
	>({ query: CHAT_SUBSCRIPTION }, (prev = [], event) => {
		if (
			event.messageListen.group.id === id &&
			prev[prev.length - 1]?.id !== event.messageListen.id
		)
			return [...prev, event.messageListen]
		return prev
	})

	const [, sendMessage] = useMutation<
		{ sendMessage: { id: string } },
		MutationSendMessageArgs
	>(POST_MESSAGE_MUTATION)
	const onSubmit = async ({ text }: { text: string }) => {
		if (!text) return
		setLoading(true)
		const result = await sendMessage({ groupId: id, text })
		setLoading(false)

		reset()
		if (result.error) {
			toast({
				description: result.error.message,
				status: 'error',
				title: 'Error'
			})
		}
	}

	const { data, fetching, error } = messageStream

	if (fetching) return <Loading />
	if (error)
		toast({
			description: error.message,
			position: 'top-right',
			status: 'error',
			title: 'Error'
		})

	return (
		<Container height="100%" position="relative">
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					disabled={loading}
					name="text"
					placeholder="Send message"
					ref={register}
					type="text"
					w="100%"
				/>
				<div style={{ overflow: 'auto' }}>
					{data.map((msg) => (
						<Flex
							align="left"
							borderRadius="lg"
							borderWidth="1px"
							key={msg.id}
							my="3"
							p="6"
						>
							<Avatar mr={4} name={msg.user.name} />
							<Box>
								<Text>{msg.text}</Text>
								<Text color="gray.500" fontSize="sm">
									{new Date(msg.timestamp).toLocaleTimeString()}
								</Text>
							</Box>
						</Flex>
					))}
				</div>
			</form>
		</Container>
	)
}

export default GroupPage
