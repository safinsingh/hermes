import { useToast } from '@chakra-ui/react'

const useFailToast = () => {
	return useToast({
		isClosable: true,
		position: 'top-right',
		status: 'error',
		title: 'Error',
		variant: 'solid'
	})
}

export default useFailToast
