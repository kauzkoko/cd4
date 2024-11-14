export const watchStoreRef = (ref, callback) => {
	const storeRefs = storeToRefs(useStore())
	const targetRef = storeRefs[ref]

	watch(targetRef, (value) => {
		callback(value)
	})
  }