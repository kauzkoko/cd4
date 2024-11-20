<template>
  <div class="fixed right-0 bottom-0 p-4">
    <!-- Single button if title is string -->
    <button
      v-if="!Array.isArray(title)"
      @click="$emit('clicked')"
      class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      {{ title }}
    </button>

    <!-- Multiple buttons if title is array -->
    <template v-else>
      <button
        v-for="(buttonTitle, index) in title"
        :key="index"
        @click="$emit('clicked', index)"
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2 last:mr-0"
      >
        {{ buttonTitle }}
      </button>
    </template>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: [String, Array],
    required: true
  }
})

defineEmits(['clicked'])
</script>