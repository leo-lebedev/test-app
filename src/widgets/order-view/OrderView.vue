<template>
  <div>
    <div class="grid grid-cols-4 gap-3">
      <div>
        <div class="muted">Дедлайн</div>
        <div>{{ order.deadline || '—' }}</div>
      </div>
      <div>
        <div class="muted">Город</div>
        <div>{{ order.city || '—' }}</div>
      </div>
      <div>
        <div class="muted">Вид оплаты</div>
        <div>{{ order.paymentType }}</div>
      </div>
      <div>
        <div class="muted">Вес</div>
        <div>{{ order.weightKg ?? '—' }} кг</div>
      </div>
    </div>

    <div class="my-3 flex gap-2 flex-wrap">
      <span v-if="order.prepay"
            class="px-2 py-1 rounded-full text-xs font-semibold text-primary bg-[#f0f2ff]">Аванс</span>
      <span v-for="f in order.features" :key="f"
            class="px-2 py-1 rounded-full text-xs font-semibold text-primary bg-[#f0f2ff]">{{ f }}</span>
    </div>

    <h3 class="m-0 mb-2 text-lg font-semibold">{{ order.title || 'Без названия' }}</h3>
    <p class="m-0 text-muted whitespace-pre-wrap">{{ order.description || 'Нет описания' }}</p>
  </div>
</template>

<script lang="ts" setup>
import type {Order} from '../../shared/model/orderStore'

defineProps<{ order: Order }>()
</script>
