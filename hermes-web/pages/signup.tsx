import {
	Input,
	FormControl,
	FormLabel,
	FormHelperText,
	Button,
	Container,
	Stack,
	Flex,
	useToast
} from '@chakra-ui/react'
import type {
	User,
	MutationSignUpArgs
} from 'hermes-server/dist/generated/urql'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'urql'

const SignUpMutation = `
mutation ($email: String!, $name: String!, $password: String!) {
	signUp (email: $email, name: $name, password: $password) {
		name
		id
	}
}
`

const Index = () => {
	// eslint-disable-next-line @typescript-eslint/unbound-method
	const { register, handleSubmit } = useForm()
	const [, signUp] = useMutation<User, MutationSignUpArgs, 'signUp'>(
		SignUpMutation
	)
	const [loading, setLoading] = useState(false)
	const toast = useToast()

	const onSubmit = async ({ email, name, password }: MutationSignUpArgs) => {
		if (!email || !name || !password) {
			toast({
				description: 'Please fill out all the fields!',
				position: 'top-right',
				status: 'error',
				title: 'Error'
			})
			return
		}

		setLoading(true)
		const user = await signUp({ email, name, password })
		setLoading(false)

		if (user.error)
			toast({
				description: user.error.message,
				position: 'top-right',
				status: 'error',
				title: 'Error'
			})
		else {
			const [firstName] = user.data.signUp.name.split(' ')
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
						<FormControl id="nickname">
							<FormLabel>Nickname</FormLabel>
							<Input name="name" ref={register} type="text" />
						</FormControl>
						<FormControl id="email">
							<FormLabel>Email address</FormLabel>
							<Input name="email" ref={register} type="text" />
							<FormHelperText>
								You&apos;ll use this to chat with other people.
							</FormHelperText>
						</FormControl>
						<FormControl id="password">
							<FormLabel>Password</FormLabel>
							<Input name="password" ref={register} type="password" />
							<FormHelperText>Keep this secret!</FormHelperText>
						</FormControl>
						<Button colorScheme="teal" isLoading={loading} type="submit">
							Sign Up
						</Button>
					</Stack>
				</form>
			</Container>
		</Flex>
	)
}

export default Index
