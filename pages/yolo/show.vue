<template>
    <div class="fullScreen overflow-hidden">
        <div v-for="(style, index) in cochonetteStyles" :key="`cochonette-${index}`"
             class="fixed bg-blue rd-full w-100px h-100px"
             :style="style">
             cochonette: {{ cochonette }}
        </div>
        
        <div v-for="(style, index) in colorStyles" :key="`color-${index}`"
             class="fixed bg-red rd-full w-50px h-50px"
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
        const style = {
            left: `${detection.x_center - detection.width/2}px`,
            top: `${detection.y_center - detection.height/2}px`,
            width: `${detection.width}px`,
            height: `${detection.height}px`,
            transform: 'translate(-50%, -50%)'
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


