<template>
  <section class="section is-main-section">
    <buttons-toolbar>
      <b-button :loading="loading" :disabled="saved" @click="saveProduct"
                type="is-primary" icon-right="content-save"/>
      <b-button :to="{ name: 'products' }" tag="router-link" icon-right="arrow-left-circle"/>
    </buttons-toolbar>

    <form @submit.prevent="saveProduct" @change="changed" @keyup="draftState" class="columns">
      <div class="column is-two-thirds">
        <product-general
            v-model="product"
            :v="$v.product">
            <product-features
                v-if="product.category"
                v-model="product"
                :features="product.category.features"
                :v="$v.product.features"/>
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
            v-model="product"
            :categories="categories"
            :v="$v.product"
            @changed="changed"/>
        <product-price
            v-model="product"
            :currency-sign="$settings('currency', 'sign')"/>
        <product-availability
            v-model="product"
            :stocks="$settings('shop', 'stocks')"/>
      </div>
    </form>
<!--    <product-variants v-if="product.id" :discount="discount" />-->
  </section>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import ButtonsToolbar from '@/components/ButtonsToolbar'
import CardComponent from '@/components/CardComponent'
import ImagesUploader from '@/containers/ImagesUploader'
import ProductAvailability from '../components/ProductAvailability'
import ProductCategory from '../components/ProductCategory'
import ProductFeatures from '../components/ProductFeatures'
import ProductGeneral from '../components/ProductGeneral'
import ProductPrice from '../components/ProductPrice'
import useEditState from '@/hooks/useEditState'
import validations from '../validations/product'

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
  computed: {
    ...mapGetters({
      product: 'getProduct',
      categories: 'getCategories'
    }),
    discount: function () {
      return this.product.price_old - this.product.price;
    }
  },
  validations () {
    return validations(this);
  },
  setup (props, context) {
    return {
      ...useEditState(props, context)
    };
  },
  mounted () {
    this.fetchCategories();

    if (this.propId) {
      this.setProduct({});
      this.fetchProduct(this.propId);
    } else {
      this.setProduct({});
    }
  },
  methods: {
    changed () {
      this.draftState();

      if (this.propId) {
        this.resetSaveTimer(this.saveProduct);
      }
    },

    saveProduct () {
      this.saveData(async () => {
        if (this.propId) {
          await this.updateProduct(this.product);
        } else {
          await this.storeProduct(this.product);
          await this.$router.replace({
            name: 'product-edit',
            params: { propId: this.product.id }
          });
        }
      });
    },

    async saveData (saveHandler) {
      if (this.$v) {
        this.$v.$touch();

        if (this.$v.$invalid) {
          return this.validationErrorMessage();
        }
      }
      clearTimeout(this.timers.save);
      this.loadingState();
      await saveHandler();
      this.savedState();
      return this;
    },

    validationErrorMessage () {
      this.$buefy.toast.open({
        message: 'Заполните обязательные поля',
        type: 'is-warning',
        queue: true
      });
      return this;
    },

    ...mapActions([
      'fetchProduct',
      'updateProduct',
      'storeProduct',
      'fetchCategories'
    ]),
    ...mapMutations({
      setProduct: 'PRODUCT_SET'
    })
  }
}
</script>

<style scoped>

</style>
