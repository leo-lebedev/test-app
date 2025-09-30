<script lang="ts" setup>
import {computed} from "vue";

interface Props {
  label?: string;
  modelValue: string;
  placeholder?: string;
  maxLength?: number;
  required?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: "",
  maxLength: 500,
  required: false,
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const count = computed(() => props.modelValue.length);
</script>

<template>
  <div class="flex flex-col gap-1">
    <label v-if="props.label" class="text-sm text-gray-600">
      {{ props.label }} <span v-if="props.required" class="text-red-500">*</span>
    </label>

    <textarea
        :maxlength="props.maxLength"
        :placeholder="props.placeholder"
        :value="props.modelValue"
        class="w-full rounded-md border px-3 py-2 outline-none transition
             border-gray-300 focus:border-blue-500
             placeholder-gray-400 disabled:bg-gray-100 resize-none"
        rows="5"
        @input="emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
    />

    <div class="text-xs text-gray-500 text-right">
      {{ count }}/{{ props.maxLength }}
    </div>
  </div>
</template>
