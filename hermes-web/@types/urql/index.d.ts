// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as urql from 'urql'

declare module 'urql' {
	export declare type OperationResult<
		Data = never,
		Variables = never,
		Key = never
	> = {
		/** The [operation]{@link Operation} which has been executed. */
		operation: Operation<Data, Variables>
		/** The data returned from the Graphql server. */
		data?: {
			[key in Key]: Data
		}
		/** Any errors resulting from the operation. */
		error?: CombinedError
		/** Optional extensions return by the Graphql server. */
		extensions?: Record<string, unknown>
		/** Optional stale flag added by exchanges that return stale results. */
		stale?: boolean
	}

	export declare type UseMutationResponse<
		Data = never,
		Variables = never,
		Key = never
	> = [
		UseMutationState<Data, Variables>,
		(
			variables?: Variables,
			context?: Partial<OperationContext>
		) => Promise<OperationResult<Data, Variables, Key>>
	]

	export declare function useMutation<
		Data = never,
		Variables = never,
		Key = never
	>(
		query: DocumentNode | TypedDocumentNode<Data, Variables> | string
	): UseMutationResponse<Data, Variables, Key>
}
