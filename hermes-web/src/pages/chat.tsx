/* eslint-disable @typescript-eslint/unbound-method */

import { ChatIcon, LinkIcon, CloseIcon } from '@chakra-ui/icons'
import {
	Container,
	useToast,
	Flex,
	IconButton,
	HStack,
	VStack,
	Text,
	Button
} from '@chakra-ui/react'
import type {
	Group,
	MutationCreateGroupArgs,
	MutationJoinGroupArgs,
	MutationRemoveGroupArgs,
	MutationSendMessageArgs
} from 'hermes-server/dist/generated/urql'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, gql } from 'urql'
import { FormModal, Loading } from '~/components'
import useMessages from '~/hooks/useMessages'
import useSignOut from '~/hooks/useSignOut'

const CREATE_GROUP_MUTATION = gql`
	mutation($name: String!, $password: String) {
		createGroup(name: $name, password: $password) {
			id
			name
		}
	}
`

const JOIN_GROUP_MUTATION = gql`
	mutation($id: String!, $password: String) {
		joinGroup(id: $id, password: $password) {
			id
			name
		}
	}
`

const REMOVE_GROUP_MUTATION = gql`
	mutation($groupId: String!) {
		removeGroup(groupId: $groupId) {
			name
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

const Chat = () => {
	const router = useRouter()
	const { register, handleSubmit } = useForm()
	const { register: registerJoin, handleSubmit: handleJoinSubmit } = useForm()
	const toast = useToast({
		isClosable: true,
		position: 'top-right',
		variant: 'solid'
	})

	const [, createGroup] = useMutation<
		{ createGroup: Group },
		MutationCreateGroupArgs
	>(CREATE_GROUP_MUTATION)
	const [, joinGroup] = useMutation<
		{ joinGroup: Group },
		MutationJoinGroupArgs
	>(JOIN_GROUP_MUTATION)
	const [, removeGroup] = useMutation<
		{ removeGroup: { name: string } },
		MutationRemoveGroupArgs
	>(REMOVE_GROUP_MUTATION)
	const [, sendMessage] = useMutation<
		{ sendMessage: { id: string } },
		MutationSendMessageArgs
	>(POST_MESSAGE_MUTATION)

	const { data, fetching, error } = useMessages()
	const [loading, setLoading] = useState(false)
	const [joinLoading, setJoinLoading] = useState(false)
	const { loading: signOutLoading, signOut } = useSignOut()

	const onJoinSubmit = async ({ id, password }: MutationJoinGroupArgs) => {
		if (!id) {
			toast({
				description: 'Please specify (at least) the ID!',
				status: 'error',
				title: 'Error'
			})
			return
		}

		setJoinLoading(true)
		const group = await joinGroup({ id, password })
		setJoinLoading(false)

		if (group.error) {
			toast({
				description: group.error.message,
				status: 'error',
				title: 'Error'
			})
		} else {
			const { name: groupName, id: groupId } = group.data.joinGroup

			toast({
				description: `Joined group: ${groupName}`,
				status: 'success',
				title: `Success`
			})
			await router.push(`/group/${groupId}`)
			await sendMessage({ groupId, text: 'Hello, world!' })
		}
	}

	const onSubmit = async ({ password, name }: MutationCreateGroupArgs) => {
		if (!name) {
			toast({
				description: 'Please specify (at least) a name for your group!',
				status: 'error',
				title: 'Error'
			})
			return
		}

		setLoading(true)
		const group = await createGroup({ name, password })
		setLoading(false)

		if (group.error) {
			toast({
				description: group.error.message,
				status: 'error',
				title: 'Error'
			})
		} else {
			const { name: groupName, id: groupId } = group.data.createGroup

			toast({
				description: `Created group: ${groupName}`,
				status: 'success',
				title: `Success`
			})
			await router.push(`/group/${groupId}`)
			await sendMessage({ groupId, text: 'Hello, world!' })
		}
	}

	if (error)
		toast({
			description: error.message,
			position: 'top-right',
			status: 'error',
			title: 'Error'
		})

	return (
		<Container pt="5.5rem">
			<FormModal
				action="Create"
				buttonText="Create a group"
				fields={[
					{
						id: 'name',
						name: 'Group Name'
					},
					{
						helperText: 'Optional',
						id: 'password',
						inputType: 'password',
						name: 'Group password'
					}
				]}
				loading={loading}
				onSubmit={handleSubmit(onSubmit)}
				register={register}
			/>
			<FormModal
				action="Join"
				buttonText="Join a group"
				fields={[
					{
						id: 'id',
						name: 'Group ID'
					},
					{
						helperText: 'Optional',
						id: 'password',
						inputType: 'password',
						name: 'Group password'
					}
				]}
				loading={joinLoading}
				onSubmit={handleJoinSubmit(onJoinSubmit)}
				register={registerJoin}
			/>
			<Button
				colorScheme="red"
				isLoading={signOutLoading}
				onClick={signOut}
			>
				Sign out
			</Button>
			{fetching ? (
				<Loading />
			) : (
				Object.entries(data ?? {}).map(
					([id, { name, lastMessage }]) => (
						<Flex
							align="center"
							borderRadius="lg"
							borderWidth="1px"
							justify="space-between"
							key={id}
							my="3"
							p="6"
						>
							<VStack align="left">
								<Text>{name}</Text>
								{lastMessage && (
									<Text color="gray.500" fontSize="sm">
										{new Date(
											lastMessage.timestamp
										).toLocaleTimeString()}
										: {lastMessage.text}
									</Text>
								)}
							</VStack>
							<HStack spacing="3">
								<IconButton
									aria-label="Go to group"
									icon={<ChatIcon />}
									onClick={async () => {
										await router.push(`/group/${id}`)
									}}
								/>
								<IconButton
									aria-label="Share group ID"
									icon={<LinkIcon />}
									onClick={async () => {
										await navigator.clipboard.writeText(id)
										toast({
											description: `Copied group ID to clipboard!`,
											status: 'success',
											title: `Success`
										})
									}}
								/>
								<IconButton
									aria-label="Leave group"
									icon={<CloseIcon />}
									onClick={async () => {
										const response = await removeGroup({
											groupId: id
										})

										if (response.error) {
											toast({
												description:
													response.error.message,
												status: 'error',
												title: 'Error'
											})
										}
									}}
								/>
							</HStack>
						</Flex>
					)
				)
			)}
		</Container>
	)
}

export default Chat
