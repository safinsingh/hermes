import {
	Button,
	FormControl,
	FormHelperText,
	FormLabel,
	Input,
	Modal,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Stack,
	useDisclosure
} from '@chakra-ui/react'
import type { FormEventHandler } from 'react'
import type { UseFormMethods } from 'react-hook-form'

const FormModal = ({
	fields,
	onSubmit,
	register,
	loading,
	action,
	buttonText
}: {
	fields: Array<{
		name: string
		helperText?: string
		id: string
		inputType?: string
	}>
	onSubmit: FormEventHandler<HTMLFormElement>
	register: UseFormMethods['register']
	loading: boolean
	action: string
	buttonText: string
}) => {
	const { isOpen, onOpen, onClose } = useDisclosure()

	return (
		<>
			<Button colorScheme="teal" mr="2" onClick={onOpen}>
				{buttonText}
			</Button>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent p={2}>
					<ModalHeader>{buttonText}</ModalHeader>
					<ModalCloseButton />
					<form onSubmit={onSubmit}>
						<Stack px={6} spacing={4}>
							{fields.map((field) => (
								<FormControl id={field.id} key={field.id}>
									<FormLabel>{field.name}</FormLabel>
									<Input
										name={field.id}
										ref={register}
										type={field.inputType ?? 'text'}
									/>
									{field.helperText && (
										<FormHelperText>{field.helperText}</FormHelperText>
									)}
								</FormControl>
							))}
						</Stack>
						<ModalFooter>
							<Button
								colorScheme="teal"
								isLoading={loading}
								px="2"
								type="submit"
							>
								{action}
							</Button>
						</ModalFooter>
					</form>
				</ModalContent>
			</Modal>
		</>
	)
}

export default FormModal
