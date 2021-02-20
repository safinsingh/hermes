import { useRouter } from 'next/router'
import { useState } from 'react'
import { gql, useMutation } from 'urql'
import useFailToast from './useFailToast'

const SIGN_OUT_MUTATION = gql`
	mutation {
		signOut
	}
`

const useSignOut = () => {
	const [, signOutRaw] = useMutation<{}, {}>(SIGN_OUT_MUTATION)
	const [loading, setLoading] = useState(false)
	const toast = useFailToast()
	const router = useRouter()

	const signOut = async () => {
		setLoading(true)
		const response = await signOutRaw()
		localStorage.removeItem('myID')
		setLoading(false)

		if (response.error) {
			toast({ description: response.error.message })
		}
		await router.push('/login')
	}

	return { loading, signOut }
}

export default useSignOut
