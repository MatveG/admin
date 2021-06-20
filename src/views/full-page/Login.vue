<template>
  <card-component title="Login" icon="lock">
    <form @submit.prevent="submit" method="POST">
      <b-field label="E-mail Address">
        <b-input v-model="formData.email" name="email" type="email" required autofocus/>
      </b-field>

      <b-field label="Password">
        <b-input v-model="formData.password" type="password" name="password" required/>
      </b-field>

      <b-field>
        <b-checkbox v-model="formData.remember" class="is-thin">
          Remember me
        </b-checkbox>
      </b-field>

      <hr>

      <b-field grouped>
        <div class="control">
          <button type="submit" class="button is-primary" :class="{'is-loading':isLoading}">
            Login
          </button>
        </div>
        <div class="control">
          <router-link to="/password-recovery" class="button is-outlined is-primary">
            Forgot Password?
          </router-link>
        </div>
      </b-field>
    </form>
  </card-component>
</template>

<script>
import axios from 'axios'
import CardComponent from '@/components/CardComponent'

export default {
  name: 'Login',
  components: { CardComponent },
  data () {
    return {
      isLoading: false,
      formData: {}
    }
  },
  methods: {
    async submit () {
      this.isLoading = true;

      await axios.get('/csrf-cookie');
      const response = await axios.post('/login', this.formData);

      if (response.status === 200) {
        const token = `${response.data.type} ${response.data.token}`;

        if (this.formData.remember) {
          localStorage.setItem('_utoken', token);
        }
        axios.defaults.headers.common = { 'Authorization': token };
        await this.$router.push({ name: 'home' });
      } else {
        alert('Wrong credentials!');
      }

      this.isLoading = false;
    }
  }
}
</script>
