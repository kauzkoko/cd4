<template>
    <div class="fullScreen overflow-hidden fixed top-0 left-0">
        <div v-for="(style, index) in cochonetteStyles" :key="`cochonette-${index}`"
             class="fixed bg-blue rd-full w-90px h-90px trans"
             :style="style">
             cochonette: {{ cochonette }}
        </div>
        
        <div v-for="(style, index) in colorStyles" :key="`color-${index}`"
             class="fixed bg-red rd-full w-60px h-60px"
             :style="style">
             color: {{ color }}
        </div>
        
        <div v-for="(style, index) in whiteStyles" :key="`white-${index}`"
             class="fixed bg-white border-solid border-2 border-black rd-full w-50px h-50px overflow-hidden"
             :style="style">
             white: {{ white }}
        </div>
    </div>
</template>

<script setup>
const { status, data, send, open, close } = useWebSocket('ws://localhost:8765')

// Initialize reactive variables
const cochonette = ref(0)
const color = ref(0)
const white = ref(0)

// Change to arrays of styles
const cochonetteStyles = ref([])
const colorStyles = ref([])
const whiteStyles = ref([])

// Add scaling constants
const YOLO_SIZE = 640
const SCREEN_WIDTH = 1920
const SCREEN_HEIGHT = 1080

watch(data, (newVal) => {
    if (!newVal) return
    
    // Reset counts
    cochonette.value = 0
    color.value = 0
    white.value = 0
    
    // Reset style arrays
    cochonetteStyles.value = []
    colorStyles.value = []
    whiteStyles.value = []
    
    // Parse JSON if needed
    const detections = typeof newVal === 'string' ? JSON.parse(newVal) : newVal
    
    // Process detections
    detections.forEach(detection => {
        // Scale the coordinates and dimensions
        const scaledX = (detection.x_center / YOLO_SIZE) * SCREEN_WIDTH
        const scaledY = (detection.y_center / YOLO_SIZE) * SCREEN_HEIGHT
        const scaledWidth = (detection.width / YOLO_SIZE) * SCREEN_WIDTH
        const scaledHeight = (detection.height / YOLO_SIZE) * SCREEN_HEIGHT

        const style = {
            transform: `translate(${scaledX}px, ${scaledY}px)`,
        }
        
        switch (detection.class_name) {
            case 'cochonette':
                cochonette.value++
                cochonetteStyles.value.push(style)
                break
            case 'color':
                color.value++
                colorStyles.value.push(style)
                break
            case 'white':
                white.value++
                whiteStyles.value.push(style)
                break
        }
    })
})
</script>


<style scoped>
.trans {
    /* transition: transform 0.05s linear; */
}
</style>