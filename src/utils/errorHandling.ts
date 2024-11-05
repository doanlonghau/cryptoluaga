import { ApolloError } from '@apollo/client'
import { decode } from 'html-entities'
import toast from 'react-hot-toast'

export default function errorHandling(error: ApolloError) {
	if (error.networkError) {
		return toast.error('Network error: ' + error.networkError)
	} else if (error.graphQLErrors.length > 0) {
		return toast.error('GraphQL error: ' + decode(error.message))
	} else {
		return toast.error('Error: ' + decode(error.message))
	}
}
