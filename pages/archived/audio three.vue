<script setup lang="ts">
import { useControls, TresLeches } from "@tresjs/leches";
import { TransitionPresets } from '@vueuse/core'
import "@tresjs/leches/styles";
import { onMounted, onUnmounted, ref, computed } from 'vue';

const gl = {
  clearColor: "#e4e4e4",
  shadows: true,
  alpha: true,
  windowSize: true,
};

// Define positions for the three spheres
const spherePositions = [
  [-3, 0, 0],  // Left sphere
  [0, 0, 0],   // Center sphere
  [3, 0, 0],   // Right sphere
];

// Different audio files for each sphere (you'll need to add these audio files to your public directory)
const audioFiles = [
  '/shortdeep.mp3',
  '/shortdeep.mp3',    // Replace with your actual audio file
  '/shortdeep.mp3'     // Replace with your actual audio file
];

// Define 5 fixed camera positions [x, y, z]
const cameraPositions = [
  [-5.3, 8.3, 10.6],  // Default/front view
  [10, 5, 0],         // Right side
  [-10, 20, 0],        // Left side
  [0, 15, 0],         // Top view
  [0, 5, -10],        // Back view
];

// Track current camera position index
const currentCameraIndex = ref(0);

// Ref for the camera
const cameraRef = ref(null);

// Function to change camera position
const changeCamera = (direction: 'next' | 'prev') => {
  if (direction === 'next') {
    currentCameraIndex.value = (currentCameraIndex.value + 1) % cameraPositions.length;
  } else {
    currentCameraIndex.value = currentCameraIndex.value === 0 
      ? cameraPositions.length - 1 
      : currentCameraIndex.value - 1;
  }
};

// Handle keyboard events
const handleKeydown = (event: KeyboardEvent) => {
  switch(event.key) {
    case 'ArrowRight':
    case 'ArrowDown':
      changeCamera('next');
      break;
    case 'ArrowLeft':
    case 'ArrowUp':
      changeCamera('prev');
      break;
  }
};

// Add and remove event listeners
onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
});

// Computed current camera position
const currentCameraPosition = computed(() => 
  cameraPositions[currentCameraIndex.value]
);
</script>

<template>
  <TresLeches />
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera 
      ref="cameraRef"
      :position="currentCameraPosition"
      :animation="{ 
        duration: 1000,
        easing: TransitionPresets.easeInOutCubic
      }"
    />
    
    <!-- Map through spheres with different positions -->
    <template v-for="(position, index) in spherePositions" :key="index">
      <Sphere :position="position" :args="[1, 12, 12]">
        <TresMeshNormalMaterial />
        <Suspense>
          <PositionalAudio
            :ref="`audioRef${index}`"
            :ready="true"
            helper
            loop
            :url="audioFiles[index]"
          />
        </Suspense>
      </Sphere>
    </template>

    <TresAmbientLight :intensity="0.5" />
    <TresGridHelper :args="[10, 10]" />
    <OrbitControls />
  </TresCanvas>

  <!-- Optional UI indicator -->
  <div class="camera-controls">
    <p>Camera Position: {{ currentCameraIndex + 1 }}/{{ cameraPositions.length }}</p>
    <button @click="changeCamera('prev')">Previous View</button>
    <button @click="changeCamera('next')">Next View</button>
  </div>
</template>

<style scoped>
.camera-controls {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 10px;
  border-radius: 8px;
  display: flex;
  gap: 10px;
  align-items: center;
}

button {
  padding: 5px 10px;
  border-radius: 4px;
  border: none;
  background: white;
  cursor: pointer;
}

button:hover {
  background: #eee;
}
</style>
