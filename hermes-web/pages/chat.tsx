/* eslint-disable @typescript-eslint/unbound-method */

import { ChatIcon, LinkIcon, CloseIcon } from '@chakra-ui/icons'
import { Container, useToast, Flex, IconButton, HStack } from '@chakra-ui/react'
import gql from 'graphql-tag'
import type {
	Group,
	MutationCreateGroupArgs,
	MutationJoinGroupArgs
} from 'hermes-server/dist/generated/urql'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQuery, useMutation } from 'urql'
import { FormModal, Loading } from '~/components'

const CHAT_QUERY = gql`
	query {
		groups {
			id
			name
		}
	}
`

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

const Chat = () => {
	const { register, handleSubmit } = useForm()
	const { register: registerJoin, handleSubmit: handleJoinSubmit } = useForm()

	const [result, reexecuteQuery] = useQuery<{ groups: Group[] }>({
		query: CHAT_QUERY,
		requestPolicy: 'network-only'
	})

	const [, createGroup] = useMutation<
		Group,
		MutationCreateGroupArgs,
		'createGroup'
	>(CREATE_GROUP_MUTATION)
	const [, joinGroup] = useMutation<Group, MutationJoinGroupArgs, 'joinGroup'>(
		JOIN_GROUP_MUTATION
	)

	const toast = useToast({
		isClosable: true,
		position: 'top-right',
		variant: 'solid'
	})
	const { data, fetching, error } = result
	const [loading, setLoading] = useState(false)
	const [joinLoading, setJoinLoading] = useState(false)

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
		setLoading(false)

		if (group.error) {
			toast({
				description: group.error.message,
				status: 'error',
				title: 'Error'
			})
		} else {
			const { name: groupName } = group.data.joinGroup

			toast({
				description: `Joined group: ${groupName}`,
				status: 'success',
				title: `Success`
			})

			reexecuteQuery()
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
			const { name: groupName } = group.data.createGroup

			toast({
				description: `Created group: ${groupName}`,
				status: 'success',
				title: `Success`
			})

			reexecuteQuery()
		}
	}

	if (fetching) return <Loading />
	if (error)
		toast({
			description: error.message,
			position: 'top-right',
			status: 'error',
			title: 'Error'
		})

	return (
		<Container>
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
			{data?.groups.map((group) => (
				<Flex
					align="center"
					borderRadius="lg"
					borderWidth="1px"
					justify="space-between"
					key={group.id}
					my="3"
					p="6"
				>
					{group.name}
					<HStack spacing="3">
						<IconButton aria-label="Go to group" icon={<ChatIcon />} />
						<IconButton
							aria-label="Share group link"
							icon={<LinkIcon />}
							onClick={async () => {
								// TODO: change to actual url
								await navigator.clipboard.writeText(group.id)
								toast({
									description: `Copied group ID to clipboard!`,
									status: 'success',
									title: `Success`
								})
							}}
						/>
						<IconButton aria-label="Leave group" icon={<CloseIcon />} />
					</HStack>
				</Flex>
			))}
		</Container>
	)
}

export default Chat
