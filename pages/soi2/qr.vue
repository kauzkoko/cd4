<template>
    <div class="flex flex-col items-center justify-center h-screen">
        <div v-if="!isReading && !hasValidCode" class="flex flex-col items-center justify-center">
            <button @click="startReading">start reading</button>
        </div>
        <div v-show="isReading">
            <video ref="videoElem" w-100vw />
            <div fixed right-0 top-0 bg-white>{{ code }}</div>
            <div fixed right-0 top-30px bg-yellow>{{ codeCounter }}</div>
        </div>
        <div v-show="hasValidCode">
            <h1>You drank {{ drinks.reduce((a, b) => a + b, 0) }} liters of water since your last scan</h1>
            <h2>Details</h2>
            <ol>
                <li v-for="drink in drinks" :key="drink.id">{{ drink }}</li>
            </ol>
        </div>
    </div>
</template>

<script setup>
import QrScanner from "qr-scanner"

const videoElem = ref()
const qrScanner = ref()
const code = ref("")
const codeCounter = ref(0)
const isReading = ref(false)

const drinks = ref([3,5,1.5])
const hasValidCode = ref(false)

onMounted(() => {
    qrScanner.value = new QrScanner(
        videoElem.value,
        (data) => {
            code.value = data.data
            codeCounter.value++
            setTimeout(() => {
                hasValidCode.value = true
                isReading.value = false
            }, 2000)
        },
        { returnDetailedScanResult: true, highlightScanRegion: true }
    )
})
const startReading = () => {
    qrScanner.value.start()
    isReading.value = true
}
</script>