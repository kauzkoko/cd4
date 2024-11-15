export const useSlidersStore = defineStore('sliders', {
  state: () => ({
    sliders: [
      { name: "gain", min: 0, max: 1, step: 0.01, value: 1 }
    ]
  }),
  
  actions: {
    updateSliderValue(name, value) {
      const slider = this.sliders.find(s => s.name === name)
      if (slider) {
        slider.value = value
      }
    },
    
    addSlider(slider) {
      this.sliders.push(slider)
    }
  }
}) 