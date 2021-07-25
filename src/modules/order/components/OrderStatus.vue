<template>
  <card-component title="Заказ" icon="information-outline">
    <template v-if="order.id">
      <p>
        <span class="has-text-grey">Номер:</span>&nbsp;{{order.id}}
      </p>
      <p>
        <span class="has-text-grey">Создан:</span>&nbsp;{{order.created_at}}
      </p>
      <p>
        <span class="has-text-grey">Обновлен:</span>&nbsp;{{order.updated_at}}
      </p>
      <hr>
    </template>

    <b-field :type="{ 'is-danger': $v.order.status.$error }"
             label="Статус" label-position="on-border">
      <b-select v-model="order.status" expanded>
        <option
            v-for="(value, idx) in Object.entries(settings.status)"
            :key="idx"
            :value="value[0]">
          {{value[1]}}
        </option>
      </b-select>
    </b-field>

    <b-field label="Заметки" label-position="on-border">
      <b-input v-model="order.notes" type="textarea" rows="2"/>
    </b-field>
  </card-component>
</template>

<script>
import CardComponent from '@/components/CardComponent';

export default {
  name: 'OrderStatus',
  components: {
    CardComponent
  },
  props: {
    order: {
      type: Object,
      required: true
    },
    $v: {
      type: Object,
      required: true
    },
    settings: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>

</style>
