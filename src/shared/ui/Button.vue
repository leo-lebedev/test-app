<template>
  <button
      :class="[
      props.variant === 'primary'
        ? 'bg-[#1928F0] text-white hover:bg-blue-700'
        : 'hover:bg-purple-50 bg-[#F6F6F6]'
    ]"
      :disabled="props.disabled || props.loading"
      :type="props.type"
      class="w-full px-4 py-2 text-sm font-medium transition flex justify-center items-center gap-2
           disabled:opacity-50 disabled:cursor-not-allowed rounded-xl h-[60px] cursor-pointer"
      @click="emit('click')"
  >
    <span v-if="props.loading" class="i-heroicons-arrow-path-20-solid animate-spin w-4 h-4"></span>
    {{ props.label }}
  </button>
</template>

<script lang="ts" setup>
interface Props {
  label: string;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit";
}

const props = withDefaults(defineProps<Props>(), {
  variant: "primary",
  disabled: false,
  loading: false,
  type: "button",
});

const emit = defineEmits<{
  (e: "click"): void;
}>();
</script>

