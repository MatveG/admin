<template>
  <section class="section is-main-section">
    <buttons-toolbar>
      <template slot="left">
        <b-button :to="{ name: 'categories' }" tag="router-link" icon-right="arrow-left-circle"/>
      </template>
      <template slot="right">
        <b-button :loading="loading" :disabled="saved" @click="submit"
                  type="is-primary" icon-right="content-save"/>
      </template>
    </buttons-toolbar>

    <div class="columns">
      <div class="column is-9">
        <form @submit.prevent="submit" @change="changed" @keyup="draftState">
          <category-general v-model="category" :v="$v.category"/>
        </form>

        <card-component
            v-if="!category.is_parent"
            class="mt-5"
            title="Характеристики и параметры"
            icon="subtitles-outline">
          <b-tabs type="is-boxed">
            <b-tab-item label="Характеристики">
              <category-features v-if="category.id" :categoryId="category.id"/>
            </b-tab-item>
            <b-tab-item label="Параметры">
              <category-parameters v-if="category.id" :categoryId="category.id"/>
            </b-tab-item>
          </b-tabs>
        </card-component>
      </div>

      <div class="column">
        <category-parent
            v-model="category"
            :parentCategories="getParentCategories"
            :v="$v.category"
            @change="changed"/>

        <card-component v-if="category.id" class="mt-5" title="Фотография" icon="image">
<!--          <images-upload :prop-images="category.images" @update="assign('images', $event)"-->
<!--                         :prop-api="`/admin/categories/${category.id}`" :prop-max="1" prop-width="100%" />-->
        </card-component>
      </div>
    </div>
  </section>
</template>

<script>
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import { useActions, useGetters } from 'vuex-composition-helpers'
import CardComponent from '@/components/CardComponent'
import ButtonsToolbar from '@/components/ButtonsToolbar'
import CategoryFeatures from '@/modules/features/containers/CategoryFeatures';
import CategoryParameters from '@/modules/parameters/containers/CategoryParameters';
import CategoryParent from '../components/CategoryParent'
import CategoryGeneral from '../components/CategoryGeneral'
import useGlobalLoader from '@/compositions/useGlobalLoader'
import useEditState from '@/compositions/useEditState'
import useAutoSave from '@/compositions/useAutoSave'
import useDialogs from '@/compositions/useDialogs'

export default {
  name: 'CategoryEdit',
  components: {
    CategoryGeneral,
    CardComponent,
    ButtonsToolbar,
    CategoryParent,
    CategoryFeatures,
    CategoryParameters
  },
  props: {
    propId: {
      type: [String, Number],
      default: null
    }
  },
  validations: {
    category: {
      title: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(255)
      },
      title_short: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(255)
      },
      parent_id: {
        required
      }
    }
  },
  data () {
    return {
      category: {}
    }
  },
  async mounted () {
    this.resetCategory();

    if (this.propId) {
      this.globalLoading();
      await this.fetchCategory(this.propId);
      this.category = { ...this.getCategory };
      this.globalReady();
    }
    await this.fetchCategories();
  },
  methods: {
    changed () {
      if (this.propId) {
        this.initAutoSave(this.submit);
      }
      this.draftState();
    },

    submit () {
      this.$v.$touch();
      this.cancelAutoSave();

      return this.$v.$invalid ? this.validationError() : this.save();
    },

    async save () {
      this.loadingState();

      if (this.propId) {
        await this.updateCategory(this.category);
      } else {
        await this.storeCategory(this.category);
        await this.$router.replace({
          name: 'category-edit',
          params: { propId: this.category.id }
        });
      }

      this.savedState();
    }
  },
  setup (props, context) {
    const { validationError } = useDialogs();

    return {
      validationError,
      ...useGlobalLoader(),
      ...useAutoSave(),
      ...useEditState(props, context),
      ...useGetters([
        'getCategory',
        'getParentCategories'
      ]),
      ...useActions([
        'fetchCategories',
        'fetchCategory',
        'storeCategory',
        'updateCategory',
        'resetCategory'
      ])
    };
  }
}
</script>

<style scoped>

</style>
