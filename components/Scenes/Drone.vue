<template>
  <ViewsBasic />
  <TresMesh>
    <TresBoxGeometry :args="[1, 1, 1]" />
    <TresMeshStandardMaterial color="white" />
  </TresMesh>
  <LightsBasic />
</template>