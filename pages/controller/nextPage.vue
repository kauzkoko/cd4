<template>
  <div class="fullScreen flexCenter flex-col">
    <div>text: {{ texts[textStep % texts.length].content }}</div>
    <div>textStep: {{ textStep }}</div>
    <div>currentStep: {{ currentStep }}</div>
    <button @click="store.increaseStep()">increase step</button>
    <div id="animateMe">animate me</div>
    <div>
      <audio ref="audioRef" :src="texts[textStep % texts.length].audioSrc ?? '/waterBig.m4a'" controls></audio>
    </div>
  </div>
</template>

<script setup>
import gsap from 'gsap'
const store = useExperienceStore()
const { currentStep } = storeToRefs(store)

const audioRef = ref(null)

const animations = [
  { x: 100, y: 100, duration: 2 },
  { x: 0, y: 50 },
  { x: 200, y: -300 },
  { x: -200, y: 0 },
]

const textStep = ref(0)
const texts = [
  { content: 'Im the first step', audioSrc: '/waterBig.m4a', volume: 1 },
  { content: 'Im the second step', audioSrc: '/waterBigger.m4a', volume: 1.2 },
  { content: 'Im the third step', audioSrc: '/waterMedium.m4a' },
  { content: 'Im the fourth step' },
]

onKeyStroke([' '], (e) => {
  e.preventDefault()
  audioRef.value.pause()
  gsap
    .to('#animateMe', {
      ...animations[currentStep.value % animations.length],
      duration: animations[currentStep.value % animations.length].duration ?? 1,
      ease: 'easeInOut',
    })
    .eventCallback('onComplete', () => {
      textStep.value++
      setTimeout(() => audioRef.value.play(), 500)
    })
  store.increaseStep()
})
</script>
