export const useSlidersStore = defineStore('sliders', () => {
  const sliders = ref([
    { name: "gain", min: 0, max: 1, step: 0.01, value: 1 }
  ])

  function updateSliderValue(name, value) {
    const slider = sliders.value.find(s => s.name === name)
    if (slider) {
      slider.value = value
    }
  }

  function addSlider(slider) {
    sliders.value.push(slider)
  }

  return {
    sliders,
    updateSliderValue,
    addSlider
  }
})