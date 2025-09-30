<script lang="ts" setup>
import {ref} from "vue";

interface Props {
  label?: string;
  modelValue: string;
  placeholder?: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const inputType = ref<"text" | "date">("text");

function handleInput(e: Event) {
  emit("update:modelValue", (e.target as HTMLInputElement).value);
}
</script>

<template>
  <div class="flex flex-col gap-1">
    <label v-if="props.label" class="text-sm text-gray-600">{{ props.label }}</label>

    <input
        :placeholder="props.placeholder ?? 'Выберите дату'"
        :type="inputType"
        :value="props.modelValue"
        class="w-full rounded-md border px-3 py-2 outline-none transition
             border-gray-300 focus:border-blue-500
             placeholder-gray-400 disabled:bg-gray-100"
        @blur="!props.modelValue && (inputType = 'text')"
        @focus="inputType = 'date'"
        @input="handleInput"
    />
  </div>
</template>
