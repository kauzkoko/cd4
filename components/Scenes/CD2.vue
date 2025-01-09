<template>
  <TresPerspectiveCamera ref="camera" :position="[0, 0, 3]" :lookAt="[0, 0, 0]" />
  <TresMesh position:[0, 0, 0] :rotation="[0, 0.1, 0]">
    <TresBoxGeometry />
    <TresMeshNormalMaterial :opacity="0" transparent />
    <Html center prepend transform :distance-factor="1" wrapperClass="test">
    <html :style="{ width: `${width}px`, height: `${height}px` }" class="flexCenter bg-red">
    <div class="bg-black text-amber md:bg-blue">stuff</div>

    </html>

    </Html>
  </TresMesh>
  <!-- <GridHelper /> -->
  <MouseParallax :factor="0.1" :local="false" />
  <LightsBasic />
</template>

<script setup>
import { Html } from '@tresjs/cientos'

const { x, y } = useMouse()
const { width, height } = useWindowSize()
const camera = ref(null)

const opacity = ref(1)
onMounted(() => {
  watch([width, height], () => {
    console.log('changed')
    opacity.value = 0
  })
})
</script>

<style>
.test {
  transition: opacity 0.3s ease-out;
}
</style>
