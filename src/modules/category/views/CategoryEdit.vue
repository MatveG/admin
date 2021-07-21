<template>
  <section class="section is-main-section">
    <buttons-toolbar>
      <template slot="left">
        <back-button @click="$router.push({ name: 'categories' })"/>
      </template>
      <template slot="right">
        <save-button :loading="isLoading" :disabled="isSaved" @click="submit"/>
      </template>
    </buttons-toolbar>

    <div class="columns">
      <div class="column is-9">
        <form @submit.prevent @change="changed" @keyup="isSaved = false">
          <category-general :category="category" :$v="$v"/>
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
        <form @submit.prevent @change="changed" @keyup="isSaved = false">
          <category-parent :category="category" :parentCategories="parentCategories" :$v="$v"/>
        </form>

        <card-component v-if="category.id" class="mt-5" title="Фотография" icon="image">
          <images-uploader
              v-model="category.images"
              :path="category.imagesPath"
              :id="category.id"
              module="category"/>
        </card-component>
      </div>
    </div>
  </section>
</template>

<script>
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import EditForm from '@/containers/EditForm'
import CardComponent from '@/components/CardComponent'
import ButtonsToolbar from '@/components/ButtonsToolbar'
import BackButton from '@/components/buttons/BackButton'
import SaveButton from '@/components/buttons/SaveButton'
import ImagesUploader from '@/containers/ImagesUploader'
import CategoryFeatures from '@/modules/feature/containers/CategoryFeatures';
import CategoryParameters from '@/modules/parameter/containers/CategoryParameters';
import CategoryParent from '../components/CategoryParent'
import CategoryGeneral from '../components/CategoryGeneral'
import useCategoriesApi from '../compositions/useCategoryState'

export default {
  name: 'CategoryEdit',
  extends: EditForm,
  components: {
    SaveButton,
    BackButton,
    CategoryGeneral,
    CardComponent,
    ButtonsToolbar,
    ImagesUploader,
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
  mounted () {
    if (this.propId) {
      this.fetchCategory(this.propId);
    }
    this.fetchCategories();
  },
  methods: {
    async save () {
      if (this.propId) {
        return this.updateCategory(this.category);
      }
      await this.storeCategory(this.category);
      await this.$router.replace({
        name: 'category.edit',
        params: { propId: this.category.id }
      });
    }
  },
  setup () {
    return {
      ...useCategoriesApi()
    };
  }
}
</script>

<style scoped>

</style>
