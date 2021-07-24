<template>
  <card-component title="Общее" icon="account-circle">
    <b-field :type="{ 'is-danger': $v.user.name.$error }" horizontal label="Имя">
      <b-input v-model="user.name" name="name"/>
    </b-field>
    <b-field :type="{ 'is-danger': $v.user.email.$error }" horizontal label="E-mail">
      <b-input v-model="user.email" name="email"/>
    </b-field>
    <hr>
    <b-field label="ID" label-position="on-border">
      <b-input :value="user.id" readonly disabled/>
    </b-field>
    <b-field label="Создан" label-position="on-border">
      <b-input :value="user.created_at" readonly disabled/>
    </b-field>
    <b-field label="Обновлен" label-position="on-border">
      <b-input :value="user.updated_at" readonly disabled/>
    </b-field>
  </card-component>
</template>

<script>
import CardComponent from '@/components/CardComponent';

export default {
  name: 'UserGeneral',
  components: {
    CardComponent
  },
  props: {
    user: {
      type: Object,
      required: true
    },
    $v: {
      type: Object,
      required: true
    }
  }
};
</script>
