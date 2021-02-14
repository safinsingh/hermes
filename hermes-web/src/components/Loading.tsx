import { Flex, Spinner } from '@chakra-ui/react'

const Loading = () => (
	<Flex align="center" h="100%" justify="center" w="100%">
		<Spinner size="xl" />
	</Flex>
)

export default Loading
