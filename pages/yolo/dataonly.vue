<template>
    <div>
        <div>cochonette: {{ cochonette }}</div>
        <div>color: {{ color }}</div>
        <div>white: {{ white }}</div>
    </div>
</template>

<script setup>
const { status, data, send, open, close } = useWebSocket('ws://localhost:8765')

// Initialize reactive variables
const cochonette = ref(0)
const color = ref(0)
const white = ref(0)

// Watch for new data and update counts
watch(data, (newVal) => {
    if (!newVal) return
    
    // Reset counts
    cochonette.value = 0
    color.value = 0
    white.value = 0
    
    // Parse JSON if needed
    const detections = typeof newVal === 'string' ? JSON.parse(newVal) : newVal
    
    // Count occurrences of each class
    detections.forEach(detection => {
        switch (detection.class_name) {
            case 'cochonette':
                cochonette.value++
                break
            case 'color':
                color.value++
                break
            case 'white':
                white.value++
                break
        }
    })
})
</script>


