<template>
  <div class="flex flex-col gap-1 relative">
    <label v-if="props.label" class="text-sm text-gray-600">{{ props.label }}</label>

    <div
        :class="{'text-gray-700': displayLabel}"
        class="w-full rounded-md border px-3 py-2 cursor-pointer outline-none border-gray-300 focus:border-blue-500 text-gray-400"
        @click="isOpen = !isOpen"
    >
      {{ displayLabel || (props.placeholder ?? 'Выберите...') }}
    </div>

    <ul
        v-if="isOpen"
        class="absolute top-full left-0 mt-1 w-full rounded-md border bg-white shadow-lg z-10 max-h-60 overflow-auto"
    >
      <li
          v-for="opt in props.options"
          :key="opt.value"
          :class="{'bg-blue-100': isSelected(opt)}"
          class="px-3 py-2 cursor-pointer hover:bg-gray-100 flex justify-between items-center"
          @click.stop="toggleOption(opt)"
      >
        <span>{{ opt.label }}</span>
        <input
            v-if="props.multiple"
            :checked="isSelected(opt)"
            class="pointer-events-none"
            type="checkbox"
        />
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import {computed, ref, watch} from 'vue'

interface Option {
  label: string
  value: string | number
}

interface Props {
  label?: string
  modelValue: string | string[] | null
  options: Option[]
  placeholder?: string
  multiple?: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: string | string[] | null): void
}>()

const isOpen = ref(false)

const selected = ref<string | string[] | null>(
    props.multiple
        ? Array.isArray(props.modelValue) ? [...props.modelValue] : []
        : typeof props.modelValue === 'string' ? props.modelValue : null
)

watch(
    () => props.modelValue,
    (val) => {
      if (props.multiple) {
        selected.value = Array.isArray(val) ? [...val] : []
      } else {
        selected.value = typeof val === 'string' ? val : null
      }
    }
)

function toggleOption(opt: Option) {
  if (props.multiple) {
    const arr = selected.value as string[]
    const index = arr.indexOf(opt.label)
    if (index >= 0) arr.splice(index, 1)
    else arr.push(opt.label)
    emit('update:modelValue', [...arr])
  } else {
    selected.value = opt.label
    emit('update:modelValue', selected.value)
    isOpen.value = false
  }
}

function isSelected(opt: Option) {
  if (props.multiple) {
    return Array.isArray(selected.value) && (selected.value as string[]).includes(opt.label)
  } else {
    return selected.value === opt.label
  }
}

const displayLabel = computed(() => {
  if (props.multiple) {
    const arr = selected.value as string[]
    if (!arr || !arr.length) return ''
    return arr.join(', ')
  } else {
    return selected.value ?? ''
  }
})
</script>
