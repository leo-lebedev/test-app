<template>
  <div class="flex flex-col gap-1 relative">
    <label v-if="props.label" class="text-sm text-gray-600">{{ props.label }}</label>
    <input
        v-model="query"
        :placeholder="props.placeholder"
        class="w-full rounded-md border px-3 py-2 outline-none
             border-gray-300 focus:border-blue-500"
        type="text"
        @blur="handleBlur"
        @focus="isFocused = true"
    />
    <ul
        v-if="isFocused && filtered.length"
        class="absolute top-full left-0 mt-1 w-full rounded-md border bg-white shadow-lg z-10"
    >
      <li
          v-for="opt in filtered"
          :key="opt.value"
          class="px-3 py-2 cursor-pointer hover:bg-gray-100"
          @mousedown.prevent="select(opt)"
      >
        {{ opt.label }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import {computed, ref} from 'vue';

interface Option {
  label: string;
  value: string;
}

interface Props {
  label?: string;
  modelValue: string;
  options: Option[];
  placeholder?: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const query = ref(props.modelValue);
const isFocused = ref(false);

const filtered = computed(() =>
    props.options.filter(opt =>
        opt.label.toLowerCase().includes(query.value.toLowerCase())
    )
);

function select(opt: Option) {
  emit('update:modelValue', opt.label);
  query.value = opt.label;
  isFocused.value = false;
}

// Чтобы список не скрывался до клика на элемент
function handleBlur() {
  setTimeout(() => {
    isFocused.value = false;
  }, 100);
}
</script>
