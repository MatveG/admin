<template>
  <full-page>
    <card-component title="Авторизация" icon="lock">
      <form @submit.prevent="submit" method="POST">
        <b-field label="E-mail">
          <b-input v-model="formData.email" name="email" type="email" required autofocus/>
        </b-field>
        <b-field label="Пароль">
          <b-input v-model="formData.password" type="password" name="password" required/>
        </b-field>
        <b-field>
          <b-checkbox v-model="formData.remember" name="remember" class="is-thin">
            Зампомнить меня
          </b-checkbox>
        </b-field>
        <hr>
        <b-field class="buttons" grouped>
          <b-button type="is-primary" native-type="submit" :loading="isLoading">
            Вход
          </b-button>
          <router-link :to="{name: 'login-recovery'}" class="button is-outlined is-primary">
            Забыли пароль?
          </router-link>
        </b-field>
      </form>
    </card-component>
  </full-page>
</template>

<script>
// todo: extract login logic
import axios from '@/loaders/axios';
import FullPage from '@/containers/FullPage';
import CardComponent from '@/components/CardComponent';

export default {
  name: 'Login',
  components: {
    FullPage,
    CardComponent
  },
  data () {
    return {
      isLoading: false,
      formData: {}
    };
  },
  methods: {
    async submit () {
      this.isLoading = true;

      await axios.get('/csrf-cookie');
      const response = await axios.post('/login', this.formData);

      if (response.status === 200) {
        const token = `${response.data.type} ${response.data.token}`;

        localStorage.setItem('_utoken', token);

        if (this.formData.remember) {
          // remember user
        }

        await this.$router.push({ name: 'home' });
        this.$buefy.snackbar.open({ message: 'Welcome back' });
      } else {
        alert('Wrong credentials!');
      }

      this.isLoading = false;
    }
  }
};
</script>
