import {
	Container,
	FormControl,
	Table,
	Td,
	Tr,
	useToast,
	Input,
	FormHelperText,
	FormLabel,
	Button,
	Stack,
	useDisclosure,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	Modal,
	ModalFooter,
	Tbody
} from '@chakra-ui/react'
import gql from 'graphql-tag'
import type {
	Group,
	MutationCreateGroupArgs
} from 'hermes-server/dist/generated/urql'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQuery, useMutation } from 'urql'
import Loading from '~/components/Loading'

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

const Chat = () => {
	// eslint-disable-next-line @typescript-eslint/unbound-method
	const { register, handleSubmit } = useForm()
	const [result, reexecuteQuery] = useQuery<{ groups: Group[] }>({
		query: CHAT_QUERY,
		requestPolicy: 'network-only'
	})
	const [, createGroup] = useMutation<
		Group,
		MutationCreateGroupArgs,
		'createGroup'
	>(CREATE_GROUP_MUTATION)
	const toast = useToast({
		isClosable: true,
		position: 'top-right'
	})
	const { data, fetching, error } = result
	const [loading, setLoading] = useState(false)
	const { isOpen, onOpen, onClose } = useDisclosure()

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
				description: `Created group: ${groupName}!`,
				status: 'success',
				title: `Success`
			})
			onClose()

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
			<Button onClick={onOpen}>Create a group</Button>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent p="4">
					<ModalHeader>Create a group</ModalHeader>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Stack spacing={3}>
							<FormControl id="name">
								<FormLabel>Group name</FormLabel>
								<Input name="name" ref={register} type="text" />
							</FormControl>
							<FormControl id="password">
								<FormLabel>Group password</FormLabel>
								<Input name="groupName" ref={register} type="text" />
								<FormHelperText>Optional</FormHelperText>
							</FormControl>
							<ModalFooter>
								<Button
									colorScheme="teal"
									isLoading={loading}
									px="2"
									type="submit"
								>
									Create
								</Button>
								<Button onClick={onClose} variant="ghost">
									Close
								</Button>
							</ModalFooter>
						</Stack>
					</form>
				</ModalContent>
			</Modal>
			<Table>
				<Tbody>
					{data?.groups.map((group) => (
						<Tr>
							<Td key={group.id}>{group.name}</Td>
						</Tr>
					))}
				</Tbody>
			</Table>
		</Container>
	)
}

export default Chat
