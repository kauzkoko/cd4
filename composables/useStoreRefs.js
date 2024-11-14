export const useStoreRefs = () => {
	const returnedRefs = storeToRefs(useStore())

	return {
	  ...returnedRefs
	}
  }