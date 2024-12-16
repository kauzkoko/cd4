<template>
  <div class="fixed right-0 fullScreen">
    <div>{{ orientation }}</div>
    <div>{{ angle }}</div>
	<div>{{clickedCounter}}</div>
	<div class="fixed top-50vh left-0">
		<button @click="toggler()">toggler</button>
		<button @click="toggleFullscreen()">toggle fullscreen</button>
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
const { isFullscreen, enter, exit, toggle: toggleFullscreen } = useFullscreen()

const clickedCounter = ref(0)
const lock = () => {
  clickedCounter.value++
  screen.orientation.lock("portrait-primary");
//   lockOrientation(orientation.value)
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
