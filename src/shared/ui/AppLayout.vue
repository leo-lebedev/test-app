<template>
  <div class="bg-[#F8F7FA]">
    <header
        class="flex items-center justify-end px-10 py-3 h-[72px] bg-white sticky top-0 z-10 max-w-[1280px] mx-auto">
      <div class="flex items-center gap-2 text-muted">
        <nav class="flex items-center gap-5">
          <button v-for="icon in icons" :key="icon.alt" class="">
            <img :alt="icon.alt" :src="icon.src" class="w-10 h-10"/>
          </button>
          <div>
            <p class="text-sm font-medium">Иванов Иван</p>
            <p class="text-xs font-normal text-[#929DB2]">Сотрудник</p>
          </div>
        </nav>
      </div>
    </header>
    <main class="h-screen max-w-[1280px] mx-auto">
      <slot/>
    </main>
    <ToastHost/>
  </div>
</template>

<script lang="ts" setup>
import ToastHost from './ToastHost.vue'

type HeaderIcon = { src: string; alt: string }
const icons: HeaderIcon[] = [
  {src: 'assets/icons/msg.svg', alt: 'msg'},
  {src: 'assets/icons/bell.svg', alt: 'bell'},
  {src: 'assets/icons/user.svg', alt: 'user'},
]
</script>
