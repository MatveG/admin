<template>
  <section class="section is-main-section">
    <buttons-toolbar>
      <template slot="left">
        <back-button @click="$router.push({ name: 'users' })"/>
      </template>
      <template slot="right">
        <save-button :loading="isLoading" :disabled="isSaved" @click="submit"/>
      </template>
    </buttons-toolbar>

    <form @submit.prevent @change="changed" @keyup="isSaved = false">
      <component-tiles>
        <user-general :user="user" :$v="$v" class="tile is-child"/>
        <user-rights :user="user" class="tile is-child"/>

        <card-component title="Аватар" icon="card-account-details-outline" class="tile is-child">
          <div class="has-text-centered">
            <div class="is-inline-block" style="width: 50%">
              <div class="is-user-avatar">
                <img src="" alt="">
              </div>
            </div>
          </div>
          <images-uploader
              v-if="user.id"
              v-model="user.images"
              :path="user.imagesPath"
              :id="user.id"
              module="user"/>
        </card-component>
      </component-tiles>
    </form>

    <user-password class="mt-5"/>
  </section>
</template>

<script>
import { maxLength, minLength, required, email } from 'vuelidate/lib/validators';
import CardComponent from '@/components/CardComponent';
import ImagesUploader from '@/containers/ImagesUploader';
import ComponentTiles from '@/components/ComponentTiles';
import ButtonsToolbar from '@/components/ButtonsToolbar';
import BackButton from '@/components/buttons/BackButton';
import SaveButton from '@/components/buttons/SaveButton';
import AutoSaveForm from '@/containers/AutoSaveForm';
import UserPassword from '../components/UserPassword';
import UserRights from '../components/UserRights';
import UserGeneral from '../components/UserGeneral';
import useUserState from '../compositions/useUserState';

export default {
  name: 'DocumentEdit',
  extends: AutoSaveForm,
  components: {
    CardComponent,
    ImagesUploader,
    ComponentTiles,
    ButtonsToolbar,
    BackButton,
    SaveButton,
    UserPassword,
    UserGeneral,
    UserRights
  },
  props: {
    propId: {
      type: [String, Number],
      default: null
    }
  },
  validations: {
    user: {
      name: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(50)
      },
      email: {
        required,
        email
      }
    }
  },
  async mounted () {
    if (this.propId) {
      await this.fetchUser(this.propId);
    }
  },
  methods: {
    async save () {
      if (this.propId) {
        return this.updateUser(this.user);
      }
      await this.storeUser(this.user);
      await this.$router.replace({
        name: 'user.edit',
        params: { propId: this.user.id }
      });
    }
  },
  setup () {
    return {
      ...useUserState()
    };
  }
};
</script>

<style scoped>

</style>
