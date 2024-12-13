<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[cameraX, 1, cameraZ]" :rotation="[0, (alpha * Math.PI) / 180, 0]" />
    <TresMesh v-for="(detection, index) in filteredDetections" :key="index" :position="[
      mapCoordinate(detection.x_center, 1920, 20),
      0,
      mapCoordinate(detection.y_center, 1080, 20)
    ]">
      <TresSphereGeometry :args="[detection.class_name === 'cochonette' ? 0.6 : 0.3, 16, 16]" />
      <TresMeshStandardMaterial :color="getColorForClass(detection.class_name)" />
      <!-- <Suspense>
        <PositionalAudio v-if="detection.class_name === 'cochonette'" ref="positionalAudioRef" :ready="true" loop helper
          :autoplay="false" :key="trigger" url="/waterBig.m4a" />
      </Suspense> -->
      <Suspense>
        <PositionalAudio ref="positionalAudioRef" :ready="true" loop helper
          :autoplay="false" :key="trigger" :url="mode === 'color' ? audioSrcsColor[detection.class_name] : audioSrcsNoise[detection.class_name]" />
      </Suspense>
    </TresMesh>
    <TresAmbientLight :intensity="1" />
    <TresDirectionalLight :position="[2, 2, 2]" :intensity="1" />
    <TresGridHelper :args="[100, 100]" />
    <!-- <OrbitControls /> -->
  </TresCanvas>
  <div class="fixed top-0 right-0 p-2 bg-white border rounded">
    <button class=" p-2 bg-white border rounded" @click="isPaused = !isPaused">
      {{ isPaused ? 'Resume' : 'Pause' }}
    </button>
    <button class=" p-2 bg-white border rounded" @click="trigger++">trigger++</button>
    <button class="p-2 bg-white border rounded" @click="snapshot()">
      snapshot
    </button>
    <button class="p-2 bg-white border rounded" @click="toggleMode">toggle mode</button>
    <div>alpha value: {{ alpha }}</div>
  </div>

</template>

<script setup>
import { gsap } from 'gsap'

const cameraZ = ref(20)
const cameraX = ref(0)

const gl = {
  clearColor: 'white',
  shadows: true,
  alpha: true,
  windowSize: true,
}

const { status, data, send, open, close } = useWebSocket('ws://localhost:8765')
const detections = ref([{ "class_name": "color", "confidence": 0.99, "x_center": 795.66, "y_center": 565.56, "width": 86.34, "height": 83.41 }, { "class_name": "cochonette", "confidence": 0.99, "x_center": 1289.37, "y_center": 410.22, "width": 132.03, "height": 126.7 }, { "class_name": "color", "confidence": 0.98, "x_center": 913.4, "y_center": 347.61, "width": 83.8, "height": 86.25 }, { "class_name": "white", "confidence": 0.98, "x_center": 441.24, "y_center": 766.04, "width": 92.95, "height": 86.4 }, { "class_name": "color", "confidence": 0.94, "x_center": 402.84, "y_center": 214.98, "width": 92.44, "height": 87.23 }, { "class_name": "white", "confidence": 0.88, "x_center": 749.1, "y_center": 796.08, "width": 87.31, "height": 86.12 }])

const isPaused = ref(true)

setInterval(() => {
  if (!isPaused.value) {
    detections.value = typeof data.value === 'string' ? JSON.parse(data.value) : data.value
  }
}, 1000)

const filteredDetections = computed(() => {
  return detections.value.filter(detection => detection.confidence > 0.5)
})

const modes = ['color', 'noise']
const mode = ref(modes[0])
const toggleMode = () => {
  mode.value = mode.value === modes[0] ? modes[1] : modes[0]
  trigger.value++
}

const audioSrcsColor = {
  color: '/color.mp3',
  white: '/white.mp3',
  cochonette: '/blue.mp3',
}

const audioSrcsNoise = {
  color: '/noise.mp3',
  white: '/noisehigh.mp3',
  cochonette: '/noiselow.mp3',
}

const getColorForClass = (className) => {
  const colorMap = {
    color: '#ffff00',
    white: '#ffffff',
    cochonette: '#0000ff',
  }
  return colorMap[className] || '#888888'
}

const mapCoordinate = (value, oldMax, newMax) => {
  return (value / oldMax * newMax) - (newMax / 2)
}

const cameraRef = ref(null)
const cameraPosition = ref([0, 0, 10])

function snapshot() {
  const angleInRadians = (alpha.value * Math.PI) / 180
  const targetX = cameraX.value - (20 * Math.sin(angleInRadians))
  const targetZ = cameraZ.value - (20 * Math.cos(angleInRadians))

  isPaused.value = true

  gsap.to(cameraX, {
    value: targetX,
    duration: 3,
    ease: 'power2.out'
  })
  gsap.to(cameraZ, {
    value: targetZ,
    duration: 3,
    ease: 'power2.out'
  })

  // Return to original position
  gsap.to(cameraX, {
    value: 0,
    duration: 3,
    delay: 4,
    ease: 'power2.out'
  })
  gsap.to(cameraZ, {
    value: 20,
    duration: 3,
    delay: 4,
    ease: 'power2.out',
    onComplete: () => {
      isPaused.value = false
    }
  })
}

const trigger = ref(0)
const alpha = ref(0)
console.log(location.host)
const { status: st, data: da, send: se, open: op, close: cl } = useWebSocket('wss://' + location.host + '/_ws')
watch(da, (newValue) => {
  console.log('WebSocket data received:', newValue)
  let data
  try {
    data = typeof newValue === 'string' ? JSON.parse(newValue) : newValue
  } catch (error) {
    console.error('Failed to parse WebSocket data:', error)
    return
  }
  
  const type = data?.type ?? 'none'
  // console.log('Parsed data type:', type)

  if (type === 'alpha') {
    // console.log('in alpha')
    alpha.value = data.value
  }

  if (type === 'toggleMode') {
    console.log('in toggleMode')
    toggleMode()
  }

  if (type === 'snapshot') {
    console.log('in snapshot')
    snapshot()
  }
})
</script>
