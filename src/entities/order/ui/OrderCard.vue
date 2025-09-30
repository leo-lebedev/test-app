<template>
  <div class="bg-white py-5 px-6 rounded-2xl">
    <div class="text-center mb-4">
      <h3 class="text-xl font-semibold">{{ order.title || 'Полное название заказа' }}</h3>
    </div>

    <div class="flex gap-2 flex-wrap mb-3">
      <Chip v-if="order.prepay" kind="prepay" label="Аванс"/>
      <Chip v-for="f in order.features" :key="f" :label="f" kind="feature"/>
    </div>

    <div class="flex items-center mb-4 gap-[60px]">
      <div>
        <div class="text-base font-normal text-[#484848]">Дедлайн</div>
        <div class="text-base font-semibold">{{ order.deadline || '—' }}</div>
      </div>
      <div>
        <div class="text-base font-normal text-[#484848]">Город</div>
        <div class="text-base font-semibold">{{ order.city || '—' }}</div>
      </div>
      <div>
        <div class="text-base font-normal text-[#484848]">Вид оплаты</div>
        <div class="text-base font-semibold">{{ order.paymentType }}</div>
      </div>
      <div>
        <div class="text-base font-normal text-[#484848]">Вес</div>
        <div class="text-base font-semibold">{{ order.weightKg ?? '—' }} кг</div>
      </div>
    </div>

    <div class="mb-2 text-base font-normal text-[#484848]">Описание заказа</div>
    <p :class="{ expanded }"
       class="m-0 text-sm font-medium text-[#2F333F] leading-6 text-text/90 whitespace-pre-wrap desc">
      {{ order.description || 'Нет описания' }}
    </p>

    <button
        v-if="canToggle"
        class="mt-2 flex items-center gap-1 text-primary text-sm font-medium text-[#929DB2] transition-transform duration-200"
        @click="expanded = !expanded"
    >
      <span>{{ expanded ? 'Свернуть' : 'Читать дальше' }}</span>
      <svg
          :class="{ 'rotate-180': expanded }"
          class="w-3 h-3 transition-transform duration-200"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M19 9l-7 7-7-7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
      </svg>
    </button>

    <div class="flex justify-end mt-6 w-[167px] ml-auto">
      <Button label="Редактировать" @click="$router.push({ name: 'orders-edit', params: { id: order.id } })"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Button from '../../../shared/ui/Button.vue'
import Chip from '../../../shared/ui/Chip.vue'
import type {Order} from '../../../shared/model/ordersStore'
import {computed, ref} from 'vue'

const props = defineProps<{ order: Order }>()
const expanded = ref(false)
const canToggle = computed(() => (props.order.description || '').length > 120)
</script>

<style scoped>
.desc {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.desc.expanded {
  display: block;
  -webkit-line-clamp: unset;
}
</style>
