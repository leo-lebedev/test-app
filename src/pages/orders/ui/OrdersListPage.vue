<template>
  <div>
    <h2 class="py-6 text-lg font-semibold">Просмотр заказа</h2>

    <div class="grid grid-cols-1 gap-3">
      <OrderCard v-for="o in store.orders" :key="o.id" :order="o"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {useOrdersStore} from '../../../shared/model/ordersStore'
import OrderCard from '../../../entities/order/ui/OrderCard.vue'

const store = useOrdersStore()
</script>
