import { Flex, chakra } from '@chakra-ui/react'
import Link from 'next/link'

const Navbar: React.FC<{
	active: '/' | '/login' | '/signup' | 'chat'
}> = ({ active }) => (
	<Flex
		align="center"
		justify="center"
		position={
			active === '/login' || active === '/signup' ? 'absolute' : 'sticky'
		}
		px={['4', '6']}
		py={['4', '6']}
		top={0}
		w="100%"
	>
		{['Home', 'Sign Up', 'Login', 'Chat'].map((page) => {
			const path = '/' + page.replace(' ', '').toLowerCase()
			const isActive = active === '/' ? page === 'Home' : page === path

			return (
				<Link href={path} key={page} passHref>
					<chakra.a
						_hover={{ bg: isActive ? 'gray.300' : 'gray.200' }}
						bg={isActive && 'gray.200'}
						borderRadius="base"
						color={isActive ? 'gray.800' : 'gray.600'}
						display="block"
						fontWeight="normal"
						mx={['2', '3']}
						px={['2', '3']}
						py={['1', '2']}
						transition="all 0.3s"
					>
						{page}
					</chakra.a>
				</Link>
			)
		})}
	</Flex>
)

export default Navbar
