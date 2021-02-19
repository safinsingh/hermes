import { Flex, chakra } from '@chakra-ui/react'
import Link from 'next/link'

const Navbar: React.FC<{
	active: string | '/' | '/chat' | '/login' | '/signup'
}> = ({ active }) => (
	<Flex
		align="center"
		// eslint-disable-next-line react/forbid-component-props
		className="blur-white"
		justify="center"
		mb={3}
		position={
			active === '/chat' ||
			!(
				active === '/' ||
				active === '/chat' ||
				active === '/login' ||
				active === '/signup'
			)
				? 'sticky'
				: 'absolute'
		}
		px={['4', '6']}
		py={['4', '6']}
		top={0}
		w="100%"
		zIndex={999}
	>
		{['Home', 'Sign Up', 'Login', 'Chat'].map((page) => {
			const path =
				'/' + (page === 'Home' ? '' : page.replace(' ', '').toLowerCase())
			const isActive = page === path

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
