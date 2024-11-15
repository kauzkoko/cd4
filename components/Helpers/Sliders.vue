<template>
  <div class="fixed bottom-2 left-2">
    <div class="flex items-center gap-2" v-for="slider in slidersStore.sliders" :key="slider.name">
      <label :for="slider.name">{{ slider.name }}:</label>
      <input 
        :id="slider.name" 
        type="range" 
        :min="slider.min" 
        :max="slider.max" 
        :step="slider.step" 
        :value="slider.value"
        @input="updateValue(slider.name, $event.target.value)" 
      />
      <span>{{ parseFloat(slider.value) }}</span>
    </div>
  </div>
</template>

<script setup>
const slidersStore = useSlidersStore()

function updateValue(name, value) {
  slidersStore.updateSliderValue(name, value)
}
</script>