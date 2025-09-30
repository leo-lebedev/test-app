<template>
  <div>
    <h2 class="py-6 text-lg font-semibold">Разместить заказ</h2>

    <OrderForm v-if="mode==='edit' && order" :initial="order" @save="onSave"/>
    <div v-else>Заказ не найден</div>
  </div>

</template>

<script lang="ts" setup>
import {computed, ref} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {useOrdersStore} from '../../../shared/model/ordersStore'
import OrderForm from '../../../widgets/order-form/OrderForm.vue'
import {useToastsStore} from '../../../shared/model/toastsStore'

const route = useRoute()
const router = useRouter()
const store = useOrdersStore()
const toasts = useToastsStore()
const mode = ref<'view' | 'edit'>((route.params as any).mode || (route.path.endsWith('/edit') ? 'edit' : 'view'))

const order = computed(() => {
  if (route.path === '/order/new/edit') {
    const created = store.createBlank()
    router.replace(`/order/${created.id}/edit`)
    return created
  }
  return store.getById(String(route.params.id))
})

function onSave(updated: any) {
  store.update(updated)
  mode.value = 'view'
  router.push('/')
  toasts.push('Заказ успешно сохранён', 'success')
}
</script>
