export const useExperienceStore = defineStore('experience', () => {
  const currentStep = ref(0)

  const increaseStep = () => currentStep.value++

  return {
    currentStep,
    increaseStep
  }
})