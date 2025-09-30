<script lang="ts" setup>
type Kind = 'prepay' | 'feature'
const props = defineProps<{ label: string; kind?: Kind }>()
const klass = props.kind === 'prepay'
  ? 'bg-[#D4FFE0] text-[#137A3A]'
  : 'bg-[#E1E4EE] text-[#2C3A4B]'
</script>

<template>
  <span class="px-3 py-2 rounded-full text-sm font-medium select-none" :class="klass">{{ label }}</span>
  
</template>

<style scoped>
</style>


