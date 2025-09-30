<template>
  <form
      class="grid grid-cols-2 gap-x-6 gap-y-5 bg-white py-6 px-5 rounded-2xl"
      @submit.prevent="save"
  >
    <Input
        v-model.trim="form.title"
        :error="errors.title"
        placeholder="Название заказа*"
    />

    <Input
        v-model="form.weightKg"
        :error="errors.weightKg"
        placeholder="Вес"
        type="number"
    />

    <div class="flex flex-col gap-1">
      <Autocomplete
          v-model.trim="cityInput"
          :options="cityOptions"
          placeholder="Город*"
      />
      <p v-if="errors.city" class="text-xs text-red-500 flex items-center gap-1">
        <span class="i-heroicons-exclamation-circle w-4 h-4"></span>
        {{ errors.city }}
      </p>
    </div>

    <DatePicker v-model="form.deadline" placeholder="Дедлайн*"/>

    <Select
        v-model="form.paymentType"
        :options="paymentTypeOptions"
        class="col-span-2"
        placeholder="Вид оплаты"
    />

    <div class="flex items-center gap-2">
      <input id="prepay" v-model="form.prepay" type="checkbox"/>
      <label for="prepay">Аванс</label>
    </div>

    <Select
        v-model="form.features"
        :options="featuresOptions"
        class="col-span-2"
        multiple
        placeholder="Особенности"
    />

    <Textarea v-model.trim="form.description" class="col-span-2"/>

    <div class="flex gap-3 justify-end mt-4 col-span-2">
      <Button label="Отменить" type="button" variant="secondary" @click="cancel"/>
      <Button label="Сохранить" type="submit" variant="primary"/>
    </div>
  </form>
</template>

<script lang="ts" setup>
import {computed, reactive, ref, watch} from 'vue'
import type {Order} from '../../shared/model/orderStore'
import Input from "../../shared/ui/Input.vue"
import DatePicker from "../../shared/ui/DatePicker.vue"
import Select from "../../shared/ui/Select.vue"
import Textarea from "../../shared/ui/Textarea.vue"
import Button from "../../shared/ui/Button.vue"
import Autocomplete from "../../shared/ui/Autocomplete.vue"

const props = defineProps<{ initial: Order }>()
const emit = defineEmits<{
  (e: 'save', value: Order): void;
  (e: 'cancel'): void;
}>()

const cityOptions = [
  {label: 'Москва', value: 'Moscow'},
  {label: 'Санкт-Петербург', value: 'Saint Petersburg'},
]

const paymentTypeOptions = [
  {label: 'Материал', value: 'Материал'},
  {label: 'Наличные', value: 'Наличные'},
  {label: 'Карта', value: 'Карта'},
]

const featuresOptions = [
  {label: 'Дизайн', value: 'Дизайн'},
  {label: 'B2B', value: 'B2B'},
  {label: 'Маркетинг', value: 'Маркетинг'},
]

function deepClone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value))
}

const form = reactive<Order>(deepClone(props.initial))

const cityInput = ref(
    cityOptions.find(opt => opt.value === props.initial.city)?.label || props.initial.city
)

watch(cityInput, (newValue) => {
  const option = cityOptions.find(opt => opt.label === newValue)
  form.city = option ? option.value : newValue
})

watch(
    () => props.initial,
    (v) => {
      Object.assign(form, deepClone(v))
      cityInput.value = cityOptions.find(opt => opt.value === v.city)?.label || v.city
    },
    {deep: true}
)

const errors = computed(() => {
  const e: Record<string, string> = {}
  if (!form.title || !form.title.trim()) e.title = 'Название обязательно'
  else if (form.title.length > 100) e.title = 'Не более 100 символов'

  if (!form.city || !form.city.trim()) e.city = 'Город обязателен'

  if (form.weightKg != null && +form.weightKg > 10000) e.weightKg = 'Вес не больше 10000'
  else if (form.weightKg != null && +form.weightKg < 0) e.weightKg = 'Вес не может быть отрицательным'

  return e
})

function save() {
  if (Object.keys(errors.value).length) return
  emit('save', deepClone(form))
}

function cancel() {
  const original = deepClone(props.initial)
  Object.assign(form, original)
  cityInput.value = cityOptions.find(opt => opt.value === original.city)?.label || original.city
  emit('cancel')
}
</script>
