<template>
  <section class="section is-main-section">
    {{error}}
    <buttons-toolbar>
      <template slot="left">
        <back-button @click="$router.push({ name: 'products' })"/>
      </template>
      <template slot="right">
        <save-button :loading="isLoading" :disabled="isSaved" @click="submit"/>
      </template>
    </buttons-toolbar>

    <div class="columns">
      <div class="column is-two-thirds">
        <form @submit.prevent @change="changed" @keyup="isSaved = false">
          <product-general :product="product" :$v="$v">
            <product-features
                :product="product"
                :features="product.category.features"
                :$v="$v"/>
          </product-general>
        </form>

        <card-component v-if="product.id" title="Фотографии" icon="image" class="mt-5">
          <images-uploader
              v-model="product.images"
              :path="product.imagesPath"
              :id="product.id"
              :max-amount="10"
              module="product"/>
        </card-component>
      </div>

      <div class="column">
        <form @submit.prevent @change="changed" @keyup="isSaved = false">
          <product-category :product="product" :categories="categories" :$v="$v"/>
          <product-price :product="product" :currency-sign="$settings('currency', 'sign')"/>
          <product-availability :product="product" :stocks="$settings('shop', 'stocks')"/>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import { maxLength, minLength, required } from 'vuelidate/lib/validators'
import CardComponent from '@/components/CardComponent'
import ButtonsToolbar from '@/components/ButtonsToolbar'
import BackButton from '@/components/buttons/BackButton'
import SaveButton from '@/components/buttons/SaveButton'
import ImagesUploader from '@/containers/ImagesUploader'
import ProductAvailability from '../components/ProductAvailability'
import ProductCategory from '../components/ProductCategory'
import ProductFeatures from '../components/ProductFeatures'
import ProductGeneral from '../components/ProductGeneral'
import ProductPrice from '../components/ProductPrice'
import useDialogs from '@/compositions/useDialogs'
import useAutoSave from '@/compositions/useAutoSave'
import useCategoryState from '@/modules/category/compositions/useCategoryState'
import useProductState from '../compositions/useProductState'
import useValidationRules from '../compositions/useValidationRules'

export default {
  name: 'ProductEdit',
  components: {
    ButtonsToolbar,
    BackButton,
    SaveButton,
    CardComponent,
    ImagesUploader,
    ProductAvailability,
    ProductCategory,
    ProductFeatures,
    ProductGeneral,
    ProductPrice
  },
  props: {
    propId: {
      type: [String, Number],
      default: null
    }
  },
  validations () {
    const res = {
      product: {
        category_id: {
          required
        },
        model: {
          required,
          minLength: minLength(2),
          maxLength: maxLength(255)
        },
        features: {}
      }
    };

    if (this.product.category.features && this.product.category.features.length) {
      this.product.category.features.filter((el) => el.is_required).forEach((feature) => {
        res.product.features[feature.key] = this.validationRules(feature.type);
      });
      this.product.category.features.filter((el) => el.is_parent).forEach((feature) => {
        if (feature.children && feature.children.length) {
          feature.children.filter((el) => el.is_required).forEach((subFeature) => {
            res.product.features[subFeature.key] = this.validationRules(subFeature.type);
          });
        }
      });
    }

    return res;
  },
  async mounted () {
    if (this.propId) {
      await this.fetchProduct(this.propId)
    }
    await this.fetchCategories();
  },
  methods: {
    changed () {
      if (this.propId) {
        this.initAutoSave(this.submit);
      }
      this.isSaved = false;
    },

    submit () {
      this.cancelAutoSave();
      return !this.$v.$touch() && this.$v.$invalid
        ? this.fireToast('Заполните обязательные поля')
        : this.save();
    },

    save () {
      if (this.propId) {
        return this.updateProduct(this.product);
      }
      this.storeProduct(this.product);
      this.$router.replace({
        name: 'product.edit',
        params: { propId: this.product.id }
      });
    }
  },
  setup () {
    const { categories, fetchCategories } = useCategoryState();
    const { fireToast } = useDialogs();

    return {
      categories,
      fetchCategories,
      fireToast,
      ...useAutoSave(),
      ...useProductState(),
      ...useValidationRules()
    };
  }
}
</script>

<style scoped>

</style>
