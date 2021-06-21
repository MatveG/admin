<template>
  <full-page>
    <card-component title="Восстановление пароля" icon="lock-open">
      <form @submit.prevent="submit" method="post">
        <b-field label="E-mail" message="E-mail указанный при регистрации">
          <b-input v-model="form.email" type="email" name="email" required autofocus/>
        </b-field>
        <hr>
        <b-field class="buttons" grouped>
          <b-button type="is-primary" native-type="submit" :loading="isLoading">
            Восстановить
          </b-button>
          <router-link :to="{name: 'login'}" class="button is-primary is-outlined">
            Назад
          </router-link>
        </b-field>
      </form>
    </card-component>
  </full-page>
</template>

<script>
import FullPage from '@/containers/FullPage'
import CardComponent from '@/components/CardComponent'

export default {
  name: 'Recovery',
  components: {
    FullPage,
    CardComponent
  },
  data () {
    return {
      isLoading: false,
      form: {}
    }
  },
  methods: {
    submit () {
      this.isLoading = true

      setTimeout(() => {
        this.form.email = null
        this.isLoading = false

        this.$buefy.snackbar.open({
          message: 'Link sent',
          duration: 1000,
          queue: false
        })
      }, 750)
    }
  }
}
</script>
