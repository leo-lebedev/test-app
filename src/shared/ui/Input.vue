<template>
  <div class="flex flex-col gap-1">
    <label v-if="props.label" class="text-sm text-gray-600">
      {{ props.label }} <span v-if="props.required" class="text-red-500">*</span>
    </label>

    <input
        :class="props.error ? 'border-red-500 focus:border-red-500' : ''"
        :placeholder="props.placeholder"
        :type="props.type"
        :value="props.modelValue"
        class="w-full rounded-md border px-3 py-2 outline-none transition
             border-gray-300 focus:border-blue-500
             placeholder-gray-400 disabled:bg-gray-100"
        @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />

    <p v-if="props.error" class="text-xs text-red-500 flex items-center gap-1">
      <span class="i-heroicons-exclamation-circle w-4 h-4"></span>
      {{ props.error }}
    </p>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  label?: string;
  modelValue: string | number;
  placeholder?: string;
  error?: string;
  type?: string;
  required?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: "text",
  placeholder: "",
  required: false,
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string | number): void;
}>();
</script>
