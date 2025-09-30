<template>
  <div class="fixed top-20 right-4 flex flex-col gap-2 z-20">
    <div
        v-for="t in toasts"
        :key="t.id"
        :class="[
        'flex items-center gap-3 p-4 rounded-2xl min-w-[260px] shadow-md text-white',
        t.type === 'success' ? 'bg-green-600' : 'bg-red-600'
      ]"
    >
      <img alt="check" src="/assets/icons/check.svg">
      <span class="flex-1">{{ t.message }}</span>
      <button class="ml-2 text-white text-lg font-bold hover:opacity-80" @click="close(t.id)">
        ×
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {storeToRefs} from 'pinia'
import {useToastsStore} from '../model/toastsStore'

const store = useToastsStore()
const {toasts} = storeToRefs(store)

function close(id: number) {
  store.remove(id)
}
</script>

