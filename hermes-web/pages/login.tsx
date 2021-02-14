import {
	Input,
	FormControl,
	FormLabel,
	Button,
	Container,
	Stack,
	Flex,
	useToast
} from '@chakra-ui/react'
import type { User, MutationLoginArgs } from 'hermes-server/dist/generated/urql'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'urql'

const LoginMutation = `
mutation ($email: String!, $password: String!) {
	login (email: $email, password: $password) {
		name
		id
	}
}
`

const LogIn = () => {
	// eslint-disable-next-line @typescript-eslint/unbound-method
	const { register, handleSubmit } = useForm()
	const [, logIn] = useMutation<User, MutationLoginArgs, 'login'>(
		LoginMutation
	)
	const [loading, setLoading] = useState(false)
	const toast = useToast()

	const onSubmit = async ({ email, password }: MutationLoginArgs) => {
		if (!email || !password) {
			toast({
				description: 'Please fill out all the fields!',
				position: 'top-right',
				status: 'error',
				title: 'Error'
			})
			return
		}

		setLoading(true)
		const user = await logIn({ email, password })
		setLoading(false)

		if (user.error)
			toast({
				description: user.error.message,
				position: 'top-right',
				status: 'error',
				title: 'Error'
			})
		else {
			const [firstName] = user.data.login.name.split(' ')
			toast({
				description: 'Redirecting you...',
				position: 'top-right',
				status: 'success',
				title: `Welcome${firstName && `, ${firstName}`}!`
			})
		}
	}

	return (
		<Flex align="center" justify="center" minHeight="100vh">
			<Container>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Stack spacing={3}>
						<FormControl id="email">
							<FormLabel>Email address</FormLabel>
							<Input name="email" ref={register} type="text" />
						</FormControl>
						<FormControl id="password">
							<FormLabel>Password</FormLabel>
							<Input name="password" ref={register} type="password" />
						</FormControl>
						<Button colorScheme="teal" isLoading={loading} type="submit">
							Log In
						</Button>
					</Stack>
				</form>
			</Container>
		</Flex>
	)
}

export default LogIn
