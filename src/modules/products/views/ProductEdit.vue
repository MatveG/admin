<template>
  <section class="section is-main-section">
    <div class="is-right buttons">
      <b-button type="is-primary" icon-right="content-save" :loading="loading" :disabled="saved" @click="save"/>
      <b-button icon-right="arrow-left-circle" @click="goBack"/>
    </div>

    <form @submit.prevent="save" @change="changed" @keyup="stateDraft">
      <div class="columns">
        <div class="column is-two-thirds">
          <product-main :$v="$v"/>
          <images-upload v-if="mounted && product.id"
               :prop-images="product.images"
               :prop-max="10"
               :prop-api="`/admin/products/${product.id}`"
               prop-width="20%"
               @update="assign('images', $event)"/>
        </div>
        <div class="column">
          <product-category
              :$v="$v"
              :changed="changed"/>
          <product-price
              :discount="discount"
              :toggleDiscount="toggleDiscount"
              :updateSalePrice="updateSalePrice"/>
          <product-presence/>
        </div>
      </div>
    </form>
    <product-variants v-if="mounted && product.id" :discount="discount" />
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import settings from '@/mixins/settings'
import states from '@/mixins/states'
import validInput from '@/mixins/validate'
import ImagesUpload from '@/components/ImagesUpload'
import ProductCategory from '../components/ProductCategory'
import ProductMain from '../components/ProductMain'
import ProductPresence from '../components/ProductPresence'
import ProductPrice from '../components/ProductPrice'
import ProductVariants from '../components/ProductVariants'

export default {
  name: 'ProductEdit',
  mixins: [
    settings,
    states,
    validInput
  ],
  components: {
    ImagesUpload,
    ProductCategory,
    ProductMain,
    ProductPresence,
    ProductPrice,
    ProductVariants
  },
  props: {
    propId: {
      type: [String, Number],
      default: null
    }
  },
  data () {
    return {
      mounted: false,
      timers: {},
      discount: {
        amount: 0,
        percent: null
      }
    }
  },
  computed: mapGetters(['product']),
  validations: {
    product: {
      category_id: {
        required
      },
      model: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(255)
      }
    }
  },
  mounted () {
    this.$store.dispatch(this.propId ? 'fetchProduct' : 'resetProduct', this.propId);
    this.mounted = true;
  },
  watch: {
    'product.price_sale': function () {
      this.discount.amount = this.product.price - this.product.price_sale;
    },
    'product.is_stock': function () {
      this.product.stock = !this.product.is_stock ? 0
        : this.product.stock === 0 ? 1 : this.product.stock;
    }
  },
  methods: {
    goBack () {
      this.$router.push({ name: 'product' });
    },

    assign (property, value) {
      this.product[property] = value;
      this.stateDraft();
      this.save();
    },

    changed () {
      this.stateDraft();

      if (this.propId) {
        clearTimeout(this.timers.save);
        this.timers.save = setTimeout(() => this.save(), 2000);
      }
    },

    async save () {
      if (this.validate()) {
        this.stateLoading();
        clearTimeout(this.timers.save);

        if (this.propId) {
          await this.$store.dispatch('updateProduct', this.product);
        } else {
          await this.$store.dispatch('storeProduct', this.product);
          await this.$router.replace({
            name: 'products-edit',
            params: { propId: this.product.id }
          });
        }
        this.stateSaved();
      }
    },

    toggleDiscount () {
      this.discount.amount = 0;
      this.product.sale_text = null;
      this.product.price_sale = (this.product.is_sale) ? this.product.price : 0;
    },

    updateSalePrice () {
      clearTimeout(this.timers.discount);
      this.discount.amount = Math.round(this.product.price * this.discount.percent / 100);
      this.product.price_sale = this.product.price - this.discount.amount;
      this.timers.discount = setTimeout(() => {
        this.discount.percent = null;
      }, 2000);
    }
  }
}
</script>

<style scoped>

</style>
