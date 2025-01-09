<template>
    <div class="w-100dvw h-100dvh flex justify-center items-center">
        <div class="grid">
            <div v-for="n in 20" class="bg-blue-500 w-70% aspect-square rounded-full"></div>
        </div>
    </div>
</template>

<style>
.grid {
    grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
    grid-auto-rows: 100px;
    grid-auto-flow: dense;
}
</style>