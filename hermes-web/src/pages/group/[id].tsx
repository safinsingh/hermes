/* eslint-disable @typescript-eslint/unbound-method */

import {
	Avatar,
	Box,
	Container,
	Text,
	useToast,
	Flex,
	Input,
	chakra
} from '@chakra-ui/react'
import gql from 'graphql-tag'
import type { MutationSendMessageArgs } from 'hermes-server/dist/generated/urql'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'urql'
import { Loading } from '~/components'
import useMessages from '~/hooks/useMessages'

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
	const messageStream = useMessages()
	const [, setMe] = useState<string | undefined>(undefined)

	useEffect(() => {
		setMe(localStorage.getItem('myID'))
	}, [])

	const toast = useToast({
		isClosable: true,
		position: 'top-right',
		variant: 'solid'
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
		<Container pt="5.5rem">
			<chakra.div h="calc(100vh - 5.5rem - 3.5rem)" overflow="hidden">
				{data[id].messages.map((msg) => (
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
			</chakra.div>
			<chakra.form h="2.5rem" mb={4} onSubmit={handleSubmit(onSubmit)}>
				<Input
					bg="white"
					disabled={loading}
					name="text"
					placeholder="Send message ↵"
					ref={register}
					type="text"
				/>
			</chakra.form>
		</Container>
	)
}

export default GroupPage
