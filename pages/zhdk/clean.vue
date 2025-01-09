<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[cameraX, 1, cameraZ]" :rotation="[0, (alpha * Math.PI) / 180, 0]" />
    <TresMesh v-for="(boule, index) in current.boules" :key="index" :position="[boule.x, 0, boule.y]">
      <TresSphereGeometry :args="[boule.size, 16, 16]" />
      <TresMeshStandardMaterial :color="boule.color" />
      <Suspense>
        <PositionalAudio ref="positionalAudioRef" :ready="true" loop helper :autoplay="false" :key="trigger"
          :url="boule.player === 0 ? sounds.noise.low : boule.player === 1 ? sounds.noise.high : sounds.noise.medium" />
      </Suspense>
    </TresMesh>
    <TresMesh :position="[0, 1, 20]">
      <TresBoxGeometry :args="[1, 2, 1]" />
      <TresMeshStandardMaterial color="gray" transparent />
      <Html center transform>
      <div class="mt--120px flex flex-col items-center">
        <div class="mirror">Start</div>
        <div class="w-2px h-50px bg-black"></div>
      </div>

      </Html>
    </TresMesh>/
    <TresMesh :position="[0, 1, -20]" v-if="trigger > 0">
      <TresBoxGeometry :args="[1, 1, 1]" />
      <TresMeshStandardMaterial color="gray" transparent :opacity="0" />
      <Html center transform>
      <div class="mt--120px flex flex-col items-center">
        <div>Front</div>
        <div class="w-2px h-100px bg-gray"></div>
      </div>

      </Html>
    </TresMesh>
    <TresAmbientLight :intensity="3" />
    <TresDirectionalLight :position="[2, 2, 2]" :intensity="1" />
    <TresGridHelper :args="[100, 100]" />
  </TresCanvas>
  <div class="fixed top-0 right-0 flex flex-row mr-1 children:text-20px children:mt-1">
    <div class="flex flex-col mr-1 children:text-20px children:mt-1">
      <div>Animations</div>
      <button @click="flyToCochonetteAndBack()">flyToCochonetteAndBack</button>
      <button @click="flyToStart()">flyToStart</button>
      <button @click="flyThroughCochonetteToTheEndless()">flyThroughCochonetteToTheEndless</button>
      <button @click="startCircularRotation()">startCircularRotation</button>
    </div>
    <div class="flex flex-col mr-1 children:text-20px children:mt-1">
      <div>Controls</div>
      <button @click="goToNext()">goToNextShot</button>
      <button @click="goToPrevious()">goToPreviousShot</button>
      <button @click="goTo('start')">goToStart</button>
      <div class="text-left">Current step: after {{ stepNames[index] }}</div>
    </div>
    <div class="flex flex-col mr-1 children:text-20px children:mt-1">
      <div>Debug</div>
      <button @click="trigger++">reloadSounds</button>
      <button @click="killTweens()">killTweens</button>
      <button @click="clearIntervals()">clearIntervals</button>
    </div>
  </div>
  <div v-if="trigger < 1" class="w-screen h-screen bg-white fixed top-0 left-0 flexCenter">
    <div @click="trigger++" class="text-black text-80px">START</div>
  </div>
</template>

<script setup>
import { Html } from '@tresjs/cientos'
import { gsap } from 'gsap'
const gl = {
  clearColor: 'white',
  shadows: true,
  alpha: true,
  windowSize: true,
}

const trigger = ref(0)

const {
  steps,
  stepNames,
  index,
  current,
  next,
  previous,
  isFirst,
  isLast,
  goTo,
  goToNext,
  goToPrevious,
  goBackTo,
  isNext,
  isPrevious,
  isCurrent,
  isBefore,
  isAfter,
} = useStepper({
  start: {
    boules: [
      {
        type: 'cochonette',
        player: 0,
        x: 0,
        y: 0,
        color: 'white',
        size: 0.3,
      },
    ],
  },
  firstShot: {
    boules: [
      {
        type: 'cochonette',
        player: 0,
        x: 0,
        y: 0,
        color: 'white',
        size: 0.3,
      },
      {
        type: 'boule',
        player: 1,
        x: 2,
        y: 3,
        color: 'blue',
        size: 0.7,
      },
    ],
  },
  secondShot: {
    boules: [
      {
        type: 'cochonette',
        player: 0,
        x: 0,
        y: 0,
        color: 'white',
        size: 0.3,
      },
      {
        type: 'boule',
        player: 1,
        x: 2,
        y: 3,
        color: 'blue',
        size: 0.7,
      },
      {
        type: 'boule',
        player: 2,
        x: 7,
        y: -1,
        color: 'red',
        size: 0.7,
      },
    ],
  },
  thirdShot: {
    boules: [
      {
        type: 'cochonette',
        player: 0,
        x: 0,
        y: 0,
        color: 'white',
        size: 0.3,
      },
      {
        type: 'boule',
        player: 1,
        x: 2,
        y: 3,
        color: 'blue',
        size: 0.7,
      },
      {
        type: 'boule',
        player: 2,
        x: 7,
        y: -1,
        color: 'red',
        size: 0.7,
      },
      {
        type: 'boule',
        player: 1,
        x: 5,
        y: 1,
        color: 'blue',
        size: 0.7,
      },
    ],
  },
  fourthShot: {
    boules: [
      {
        type: 'cochonette',
        player: 0,
        x: 0,
        y: 0,
        color: 'white',
        size: 0.3,
      },
      {
        type: 'boule',
        player: 1,
        x: 2,
        y: 3,
        color: 'blue',
        size: 0.7,
      },
      {
        type: 'boule',
        player: 2,
        x: 7,
        y: -1,
        color: 'red',
        size: 0.7,
      },
      {
        type: 'boule',
        player: 1,
        x: 5,
        y: 1,
        color: 'blue',
        size: 0.7,
      },
      {
        type: 'boule',
        player: 1,
        x: -5,
        y: -2,
        color: 'blue',
        size: 0.7,
      },
    ],
  },
  fifthShot: {
    boules: [
      {
        type: 'cochonette',
        player: 0,
        x: 0,
        y: 0,
        color: 'white',
        size: 0.3,
      },
      {
        type: 'boule',
        player: 1,
        x: 2,
        y: 3,
        color: 'blue',
        size: 0.7,
      },
      {
        type: 'boule',
        player: 2,
        x: 7,
        y: -1,
        color: 'red',
        size: 0.7,
      },
      {
        type: 'boule',
        player: 1,
        x: 5,
        y: 1,
        color: 'blue',
        size: 0.7,
      },
      {
        type: 'boule',
        player: 1,
        x: -5,
        y: -2,
        color: 'blue',
        size: 0.7,
      },
      {
        type: 'boule',
        player: 2,
        x: -5,
        y: -5,
        color: 'red',
        size: 0.7,
      },
    ],
  },
  sixthShot: {
    boules: [
      {
        type: 'cochonette',
        player: 0,
        x: 0,
        y: 0,
        color: 'white',
        size: 0.3,
      },
      {
        type: 'boule',
        player: 1,
        x: 2,
        y: 3,
        color: 'blue',
        size: 0.7,
      },
      {
        type: 'boule',
        player: 2,
        x: 7,
        y: -1,
        color: 'red',
        size: 0.7,
      },
      {
        type: 'boule',
        player: 1,
        x: 5,
        y: 1,
        color: 'blue',
        size: 0.7,
      },
      {
        type: 'boule',
        player: 1,
        x: -5,
        y: -2,
        color: 'blue',
        size: 0.7,
      },
      {
        type: 'boule',
        player: 2,
        x: -5,
        y: -5,
        color: 'red',
        size: 0.7,
      },
      {
        type: 'boule',
        player: 2,
        x: 3,
        y: -3,
        color: 'red',
        size: 0.7,
      },
    ],
  },
})
const boules = [
  {
    type: 'boule',
    player: 1,
    x: 2,
    y: 3,
    color: 'blue',
    size: 0.7,
  },
  {
    type: 'boule',
    player: 1,
    x: 5,
    y: 1,
    color: 'blue',
    size: 0.7,
  },
  {
    type: 'boule',
    player: 1,
    x: -5,
    y: -2,
    color: 'blue',
    size: 0.7,
  },
  {
    type: 'boule',
    player: 2,
    x: 7,
    y: -1,
    color: 'red',
    size: 0.7,
  },
  {
    type: 'boule',
    player: 2,
    x: 10,
    y: 10,
    color: 'red',
    size: 0.7,
  },
  {
    type: 'boule',
    player: 2,
    x: -5,
    y: -5,
    color: 'red',
    size: 0.7,
  },
  {
    type: 'cochonette',
    player: 0,
    x: 0,
    y: 0,
    color: 'white',
    size: 0.3,
  },
]

let sounds = {}
sounds.noise = {
  low: '/noiselow.mp3',
  medium: '/noise.mp3',
  high: '/noisehigh.mp3',
}

sounds.colors = {
  color: '/color.mp3',
  white: '/white.mp3',
  blue: '/blue.mp3',
}

const alpha = ref(0)
const cameraZ = ref(20)
const cameraX = ref(0)

function killTweens() {
  gsap.killTweensOf([alpha, cameraX, cameraZ])
  clearIntervals()
}

function flyToCochonetteAndBack() {
  killTweens()
  const angleInRadians = (alpha.value * Math.PI) / 180
  const targetX = cameraX.value - 20 * Math.sin(angleInRadians)
  const targetZ = cameraZ.value - 20 * Math.cos(angleInRadians)

  gsap.to(cameraX, {
    value: targetX,
    duration: 3,
    ease: 'power2.out',
  })
  gsap.to(cameraZ, {
    value: targetZ,
    duration: 3,
    ease: 'power2.out',
  })

  // Return to original position
  gsap.to(cameraX, {
    value: 0,
    duration: 3,
    delay: 4,
    ease: 'power2.out',
  })
  gsap.to(cameraZ, {
    value: 20,
    duration: 3,
    delay: 4,
    ease: 'power2.out',
    onComplete: () => {
      console.log('animation complete')
    },
  })
}

function flyThroughCochonetteToTheEndless() {
  killTweens()
  const angleInRadians = (alpha.value * Math.PI) / 180
  const targetX = cameraX.value - 100 * Math.sin(angleInRadians)
  const targetZ = cameraZ.value - 100 * Math.cos(angleInRadians)

  gsap.to(cameraX, {
    value: targetX,
    duration: 5,
    ease: 'none',
  })
  gsap.to(cameraZ, {
    value: targetZ,
    duration: 5,
    ease: 'none',
  })
}

function flyToStart() {
  killTweens()
  gsap.to(cameraX, {
    value: 0,
    duration: 2,
    ease: 'power2.out',
  })
  gsap.to(cameraZ, {
    value: 20,
    duration: 2,
    ease: 'power2.out',
  })
  gsap.to(alpha, {
    value: 0,
    duration: 2,
    ease: 'power2.out',
  })
}

let intervalIdPlayer, intervalIdFront

function clearIntervals() {
  if (intervalIdFront) {
    clearInterval(intervalIdFront)
  }
  if (intervalIdPlayer) {
    clearInterval(intervalIdPlayer)
  }
}

function startCircularRotation() {
  killTweens()
  const targetX = 0
  const targetZ = 0
  gsap.to(cameraX, {
    value: targetX,
    duration: 1,
    ease: 'power2.out',
  })
  gsap.to(cameraZ, {
    value: targetZ,
    duration: 1,
    ease: 'power2.out',
  })
  gsap.to(alpha, {
    value: alpha.value + 360, // Full rotation
    duration: 10,
    delay: 1,
    repeat: -1, // Infinite repetition
    ease: 'none',
    onStart: () => {
      console.log('startCircularRotation')
      intervalIdFront = setInterval(() => {
        console.log('looking to front')
        const audio = new Audio('/strudel/hh2.mp3')
        audio.play()
      }, 10000)
      setTimeout(() => {
        intervalIdPlayer = setInterval(() => {
          console.log('looking at player')
          const audio = new Audio('/strudel/hh.mp3')
          audio.play()
        }, 10000)
      }, 5000)
    },
    onComplete: () => {
      clearIntervals()
    },
  })
}

setTimeout(() => {
  gsap.to(cameraZ, {
    value: 20.001,
    duration: 1,
    ease: 'power1.out',
  })
}, 200)

const { status, data, send, open, close } = useWebSocket('wss://' + location.host + '/_ws')
watch(data, (newValue) => {
  console.log('WebSocket data received:', newValue)
  let data
  try {
    data = typeof newValue === 'string' ? JSON.parse(newValue) : newValue
  } catch (error) {
    console.error('Failed to parse WebSocket data:', error)
    return
  }

  const type = data?.type ?? 'none'
  if (type === 'flyToStart') {
    console.log('flyToStart')
    flyToStart()
  }

  if (type === 'flyToCochonetteAndBack') {
    console.log('flyToCochonetteAndBack')
    flyToCochonetteAndBack()
  }

  if (type === 'flyThroughCochonetteToTheEndless') {
    console.log('flyThroughCochonetteToTheEndless') 
    flyThroughCochonetteToTheEndless()
  }

  if (type === 'startCircularRotation') {
    console.log('startCircularRotation')
    startCircularRotation()
  }
})
</script>

<style>
.mirror {
  transform: scaleX(-1)
}
</style>
