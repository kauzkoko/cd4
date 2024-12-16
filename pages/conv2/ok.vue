<template>
  <div class="w-100dvw h-100dvh flexCenter" :class="[toggleCounter % 2 ? 'flex-row' : 'flex-col']">
    <TransitionGroup
      enter-active-class="animate__animated animate__zoomInLeft"
      leave-active-class="animate__animated animate__zoomOutLeft"
    >
      <div v-show="toggled" @click="toggle()" class="w-90vw h-90vh bg-blue flex flex-wrap" :key="1">
		<div v-for="n in 9" :style="`width: ${100/9}px; height: ${100/9}px`" class="bg-black rounded-full"></div>
	  </div>
      <div v-show="!toggled" @click="toggle()" class="w-90vw h-90vh bg-yellow" :key="2">2</div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import 'animate.css';
const { orientation, angle } = useScreenOrientation()

const toggleCounter = ref(0)
const toggle = () => {
  toggleCounter.value++
}

watch(orientation, () => {
	toggle()
})

const toggled = computed(() => toggleCounter.value % 2)
</script>
