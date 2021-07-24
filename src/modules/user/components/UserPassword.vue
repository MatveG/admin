<template>
  <card-component title="Изменить пароль" icon="lock">
    <b-field horizontal label="Текущий пароль">
      <b-input name="password_current" type="password"/>
    </b-field>
    <hr>
    <b-field horizontal label="Новый пароль">
      <b-input name="password" type="password"/>
    </b-field>
    <b-field horizontal label="Еще раз новый пароль">
      <b-input name="password_confirmation" type="password"/>
    </b-field>
    <hr>
    <b-field horizontal>
      <div class="control">
        <button type="submit" class="button is-primary">Submit</button>
      </div>
    </b-field>
  </card-component>
</template>

<script>
import CardComponent from '@/components/CardComponent';

export default {
  name: 'UserPassword',
  components: {
    CardComponent
  }
};
</script>
