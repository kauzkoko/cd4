<template>
  <TresPerspectiveCamera :position="[cameraX, 0, cameraZ]" :rotation="[0, 0.3, 0]" />
  <Suspense v-for="(path, index) in videoPaths" :key="path.path">
    <PlaneUno :videoPath="path.path" :position="[0, 0, index * -19]" :rotation="[0, 0, 0]" :text="path.text" />
  </Suspense>
  <LightsBasic /> 
</template>

<script setup>
import { ref } from 'vue'
import { onKeyStroke } from '@vueuse/core'
import gsap from 'gsap'

const videoPaths = [
  {
    path: "/boule.mp4",
    text: "Introduction"
  },
  {
    path: "/train.mov",
    text: "Background"
  },
  {
    path: "/train.mov",
    text: "Methods"
  },
  {
    path: "/4.mov",
    text: "Results"
  },
  {
    path: "/5.mov",
    text: "Discussion"
  },
  {
    path: "/6.mov",
    text: "Conclusion"
  }
]

const cameraZ = ref(20)
const cameraX = ref(5)

onKeyStroke(' ', (e) => {
  e.preventDefault()
  gsap.to(cameraX, {
    value: 10,
    duration: 1,
    ease: "power2.inOut"
  })
  gsap.to(cameraX, {
    value: 5,
    duration: 1,
    delay: 1.5,
    ease: "power2.inOut"
  })
  gsap.to(cameraZ, {
    value: cameraZ.value - 20,
    delay: 1.5,
    duration: 1,
    ease: "power2.inOut"
  })
})


</script>
