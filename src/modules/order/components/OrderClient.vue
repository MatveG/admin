<template>
  <card-component title="Клиент" icon="account-box-outline">
    <b-field label="E-mail" label-position="on-border">
      <b-input v-model="order.email"></b-input>
    </b-field>
    <b-field :type="{ 'is-danger': $v.order.phone.$error }"
             label="Телефон" label-position="on-border">
      <b-input v-model="order.phone"></b-input>
    </b-field>
    <b-field label="Имя" label-position="on-border">
      <b-input v-model="order.name"></b-input>
    </b-field>
    <b-field label="Фамилия" label-position="on-border">
      <b-input v-model="order.surname"></b-input>
    </b-field>
    <b-field label="Комментарии" label-position="on-border">
      <b-input v-model="order.text" type="textarea" rows="2"/>
    </b-field>
  </card-component>
</template>

<script>
import CardComponent from '@/components/CardComponent'

export default {
  name: 'OrderClient',
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
    }
  }
}
</script>

<style scoped>

</style>
