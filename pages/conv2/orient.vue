<template>
  <div class="fixed right-0 fullScreen">
    <div>{{ orientation }}</div>
    <div>{{ angle }}</div>
	<div>{{clickedCounter}}</div>
	<div class="fixed top-50vh left-0 children:w-300px children:h-200px">
		<button @click="toggler()">toggler</button>
		<button @click="lock()">lock</button>
		<button @click="unlock()">unlock</button>
	</div>
	<Transition
		enter-active-class="animate__animated animate__zoomInLeft"
		leave-active-class="animate__animated animate__zoomOutLeft"
	>
		<div 
			v-show="toggle" 
			class="fixed top-50vh left-50vw transform-gpu translate-x-50% translate-y--50% bg-yellow"
		>
			animate me
		</div>
	</Transition>
  </div>
</template>

<script setup>
import 'animate.css';

const { isSupported, orientation, angle, lockOrientation, unlockOrientation } = useScreenOrientation()

const clickedCounter = ref(0)
const lock = () => {
  clickedCounter.value++
  lockOrientation(orientation.value)
}

watch(orientation, () => {	// screen.orientation.lock("portrait-primary");
	toggler()
})

const toggle = ref(false)
const toggler = () => toggle.value = !toggle.value

const unlock = () => {
	clickedCounter.value++
	unlockOrientation()
}
</script>
