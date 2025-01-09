<template>
    <div class="w-screen h-screen top-0 left-0 overflow-hidden flexCenter" ref="longPressContainer">
        <div class="w-80vw h-80vh grid grid-cols-3 grid-rows-3">
            <div>
                <button @click="flyToCochonetteAndBack">fly To Cochonette And Back</button>
            </div>
            <div>
                <button @click="flyThroughCochonetteToTheEndless"><span>fly Through Cochonette To The Endless</span></button>
            </div>
            <div>
                <button @click="flyToStart">fly To Start</button>
            </div>
            <div>
                <button @click="startCircularRotation">start Circular Rotation</button>
            </div>
        </div>
    </div>
</template>

<script setup>
const { status, data, send, open, close } = useWebSocket('wss://' + location.host + '/_ws')

function flyToCochonetteAndBack() {
    send(JSON.stringify({ type: 'flyToCochonetteAndBack', message: Math.random() }))
}
function flyThroughCochonetteToTheEndless() {
    send(JSON.stringify({ type: 'flyThroughCochonetteToTheEndless', message: Math.random() }))
}
function flyToStart() {
    send(JSON.stringify({ type: 'flyToStart', message: Math.random() }))
}
function startCircularRotation() {
    send(JSON.stringify({ type: 'startCircularRotation', message: Math.random() }))
}

//calibration
const { x, y } = useMouse()
function calibrate() {
    console.log(x.value, y.value)
}
const longPressContainer = ref()
onLongPress(
    longPressContainer,
    () => calibrate(),
    {
        delay: 1000,
        modifiers: {
            once: true
        }
    }
)
</script>

<style>
div {
    @apply self-center place-self-center;

    button {
        @apply w-50px aspect-1 rounded-full text-10px;
    }
}
</style>