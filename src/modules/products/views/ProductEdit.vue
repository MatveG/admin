<template>
  <section class="section is-main-section">
    <buttons-toolbar>
      <b-button type="is-primary" icon-right="content-save" :loading="loading" :disabled="saved" @click="saveProduct"/>
      <b-button icon-right="arrow-left-circle" tag="router-link" :to="{ name: 'products' }"/>
    </buttons-toolbar>

    <form class="columns" @submit.prevent="saveProduct" @change="changed" @keyup="setDraftState">
      <div class="column is-two-thirds">
        <product-general
            :product="product"
            :v="$v.product">
          <product-features
              v-if="product.category"
              :product="product"
              :features="product.category.features"
              :v="$v.product.features"/>
        </product-general>
        <images-upload
            prop-width="20%"
            v-if="mounted && product.id"
            :prop-images="product.images"
            :prop-max="10"
            :prop-api="`/admin/products/${product.id}`"
            @update="setProperty('images', $event)"/>
      </div>

      <div class="column">
        <product-category
            :product="product"
            :categories="categories"
            :v="$v.product"
            @changed="changed"/>
        <product-price
            :product="product"
            :discount="discount"
            :currency-sign="setting('currency', 'sign')"
            @toggleDiscount="toggleDiscount"
            @updateSalePrice="updateSalePrice"/>
        <product-presence :product="product"/>
      </div>
    </form>
<!--    <product-variants v-if="product.id" :discount="discount" />-->
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import EditView from '@/commons/EditView'
import ButtonsToolbar from '@/components/ButtonsToolbar'
import ImagesUpload from '@/components/ImagesUpload'
import ProductCategory from '../components/ProductCategory'
import ProductFeatures from '../components/ProductFeatures'
import ProductGeneral from '../components/ProductGeneral'
import ProductPresence from '../components/ProductPresence'
import ProductPrice from '../components/ProductPrice'
import validations from '../validations/ProductEdit'

export default {
  name: 'ProductEdit',
  extends: EditView,
  components: {
    ButtonsToolbar,
    ImagesUpload,
    ProductCategory,
    ProductFeatures,
    ProductGeneral,
    ProductPresence,
    ProductPrice
  },
  props: {
    propId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      discount: {
        amount: 0,
        percent: null
      }
    }
  },
  computed: mapGetters({
    setting: 'getSetting',
    product: 'getProduct',
    categories: 'getCategories'
  }),
  validations () {
    return validations(this);
  },
  mounted () {
    this.$store.dispatch('fetchCategories');
    this.$store.dispatch(this.propId ? 'fetchProduct' : 'resetProduct', this.propId);
  },
  watch: {
    // 'product.price_sale': function () {
    //   this.discount.amount = this.product.price - this.product.price_sale;
    // },
    // 'product.is_stock': function () {
    //   this.product.stock = !this.product.is_stock ? 0 : this.product.stock === 0 ? 1 : this.product.stock;
    // }
  },
  methods: {
    changed () {
      this.dataChanged(this.saveProduct);
    },

    setProperty (property, value) {
      this.product[property] = value;
      this.setDraftState().saveProduct();
    },

    toggleDiscount () {
      this.discount.amount = 0;
      this.product.sale_text = null;
      // this.product.price_sale = (this.product.is_sale) ? this.product.price : 0;
    },

    updateSalePrice () {
      clearTimeout(this.timers.discount);
      this.discount.amount = Math.round(this.product.price * this.discount.percent / 100);
      // this.product.price_sale = this.product.price - this.discount.amount;
      this.timers.discount = setTimeout(() => {
        this.discount.percent = null;
      }, 2000);
    },

    saveProduct () {
      this.saveData(async () => {
        if (this.propId) {
          await this.$store.dispatch('updateProduct', this.product);
        } else {
          await this.$store.dispatch('storeProduct', this.product);
          await this.$router.replace({
            name: 'products-edit',
            params: { propId: this.product.id }
          });
        }
      });
    }
  }
}
</script>

<style scoped>

</style>
