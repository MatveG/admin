<template>
  <section class="section is-main-section">
    <buttons-toolbar>
      <template slot="left">
        <b-button :to="{ name: 'products' }" tag="router-link" icon-right="arrow-left-circle"/>
      </template>
      <template slot="right">
        <b-button :loading="isLoading" :disabled="isSaved" @click="submit"
                  type="is-primary" icon-right="content-save"/>
      </template>
    </buttons-toolbar>

    <form @submit.prevent="submit" @change="changed" @keyup="draftState" class="columns">
      <div class="column is-two-thirds">
        <product-general
            :product="product"
            :$v="$v">
            <product-features
                v-if="product.category"
                :product="product"
                :features="product.category.features"
                :$v="$v"/>
        </product-general>

        <card-component title="Фотографии" icon="image" class="mt-5">
          <images-uploader
              v-if="product.id"
              :id="product.id"
              :prop-images="product.images"
              :max-amount="10"
              @update="product.images = $event"
              model="product"/>
        </card-component>
      </div>

      <div class="column">
        <product-category
            :product="product"
            :categories="categories"
            :$v="$v"/>
        <product-price
            :product="product"
            :currency-sign="$settings('currency', 'sign')"/>
        <product-availability
            :product="product"
            :stocks="$settings('shop', 'stocks')"/>
      </div>
    </form>
  </section>
</template>

<script>
import { maxLength, minLength, required } from 'vuelidate/lib/validators'
import { useActions, useGetters } from 'vuex-composition-helpers'
import ButtonsToolbar from '@/components/ButtonsToolbar'
import CardComponent from '@/components/CardComponent'
import ImagesUploader from '@/containers/ImagesUploader'
import ProductAvailability from '../components/ProductAvailability'
import ProductCategory from '../components/ProductCategory'
import ProductFeatures from '../components/ProductFeatures'
import ProductGeneral from '../components/ProductGeneral'
import ProductPrice from '../components/ProductPrice'
import useEditState from '@/compositions/useEditState'
import useDialogs from '@/compositions/useDialogs'
import useGlobalLoader from '@/compositions/useGlobalLoader'
import useAutoSave from '@/compositions/useAutoSave'
import validationRule from '@/utils/validationRule'

export default {
  name: 'ProductEdit',
  components: {
    ButtonsToolbar,
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
      required: true
    }
  },
  validations () {
    const res = {
      product: {
        category_id: {
        },
        model: {
          required,
          minLength: minLength(2),
          maxLength: maxLength(255)
        },
        features: {}
      }
    };

    if (this.product.category && this.product.category.features.length) {
      this.product.category.features.filter((el) => el.is_required).forEach((feature) => {
        res.product.features[feature.key] = validationRule(feature.type);
      });
      this.product.category.features.filter((el) => el.is_parent).forEach((feature) => {
        if (feature.children && feature.children.length) {
          feature.children.filter((el) => el.is_required).forEach((subFeature) => {
            res.product.features[subFeature.key] = validationRule(subFeature.type);
          });
        }
      });
    }

    return res;
  },
  data () {
    return {
      product: {}
    }
  },
  async mounted () {
    this.resetProduct();

    if (this.propId) {
      this.globalLoading();
      await this.fetchProduct(this.propId);
      this.product = JSON.parse(JSON.stringify(this.getProduct))
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
        await this.updateProduct(this.product);
      } else {
        await this.storeProduct(this.product);
        await this.$router.replace({
          name: 'product-edit',
          params: { propId: this.product.id }
        });
      }
      this.savedState();
    }
  },
  setup (props, context) {
    return {
      ...useDialogs(),
      ...useGlobalLoader(),
      ...useAutoSave(),
      ...useEditState(props, context),
      ...useGetters({
        getProduct: 'getProduct',
        categories: 'getCategories'
      }),
      ...useActions([
        'fetchCategories',
        'fetchProduct',
        'updateProduct',
        'storeProduct',
        'resetProduct'
      ])
    };
  }
}
</script>

<style scoped>

</style>
