<template>
  <div class="w-100dvw h-100dvh flexCenter" :class="[toggleCounter % 2 ? 'flex-row' : 'flex-col']">
    <div>{{ amount }}</div>
    <TransitionGroup enter-active-class="animate__animated animate__zoomInLeft"
      leave-active-class="animate__animated animate__zoomOutLeft">
      <div v-show="toggled" @click="toggle()" class="relative w-90vw h-90vh bg-light-900 flex flex-wrap flex-row"
        :key="1">
        <div v-for="n in amount" class="w-10 h-80 bg-red-500 m-5"></div>
        <div v-for="n in amount" class="w-100px h-100px bg-black rounded-full"></div>
      </div>
      <div v-show="!toggled" @click="toggle()" class="w-90vw h-90vh bg-yellow flex flex-wrap flex-row" :key="2">
        <div v-for="n in amount" class="w-100px h-100px bg-black rounded-full"></div>
        <div v-for="n in amount" class="w-10 h-80 bg-red-500 m-5">
          <div v-for="m in 3" class="w-80% aspect-1 bg-black rounded-full">
          </div>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import 'animate.css';
const { orientation, angle } = useScreenOrientation()
const { width, height } = useWindowSize()
const { x, y } = useMouse()

const amount = computed(() => Math.floor(x.value / (width.value / 5)) + 1)

const toggleCounter = ref(0)
const toggle = () => {
  toggleCounter.value++
}

watch(orientation, () => {
  toggle()
})

const toggled = computed(() => toggleCounter.value % 2)
</script>
