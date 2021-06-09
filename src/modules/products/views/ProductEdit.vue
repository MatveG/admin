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
        <card-component title="Фотографии" icon="image" class="card-top-margin">
          <images-uploader
              v-if="product.id"
              :prop-images="product.images"
              :max-amount="10"
              @upload="uploadImages($event)"
              @update="updateImages($event)"/>
        </card-component>
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
            :currency-sign="$settings('currency', 'sign')"
            @toggleDiscount="toggleDiscount"
            @updateSalePrice="updateSalePrice"/>
        <product-availability :product="product"/>
      </div>
    </form>
    <!--<product-variants v-if="product.id" :discount="discount" />-->
  </section>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import EditView from '@/commons/EditView'
import ButtonsToolbar from '@/components/ButtonsToolbar'
import CardComponent from '@/components/CardComponent'
import ImagesUploader from '@/containers/ImagesUploader'
import ProductAvailability from '../components/ProductAvailability'
import ProductCategory from '../components/ProductCategory'
import ProductFeatures from '../components/ProductFeatures'
import ProductGeneral from '../components/ProductGeneral'
import ProductPrice from '../components/ProductPrice'
import validations from '../validations/product'

export default {
  name: 'ProductEdit',
  extends: EditView,
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
  data () {
    return {
      discount: {
        amount: 0,
        percent: null
      }
    }
  },
  computed: mapGetters({
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
    'product.price': function () {
      if (this.product.is_sale) {
        this.discount.amount = this.product.price_old - this.product.price;
      }
    },
    'product.is_stock': function () {
      this.product.stock = !this.product.is_stock ? 0 : this.product.stock === 0 ? 1 : this.product.stock;
    }
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
      this.product.is_sale
        ? this.product.price_old = this.product.price
        : this.product.price = this.product.price_old;
    },

    updateSalePrice () {
      this.discount.amount = Math.round(this.product.price_old * this.discount.percent / 100);
      this.product.price = this.product.price_old - this.discount.amount;
      this.discount.percent = null;
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
    },

    async uploadImages (images) {
      const request = new FormData();
      const settings = { headers: { 'content-type': 'multipart/form-data' } };

      images.forEach((image) => request.append('images[]', image));

      try {
        const { data } = await axios.post(`products/${this.product.id}/upload-images`, request, settings);

        console.log('uploadImages', data);
        // this.product.images = data;
        this.product['images'] = data;
      } catch (error) {
        console.error('Error uploading images', error);
      }
    },

    async updateImages (images) {
      console.log('updateImages', { images });
      try {
        const { data } = await axios.post(`products/${this.product.id}/update-images`, { images });

        console.log('updateImages', data);
        // this.product.images = data;
        this.product['images'] = data;
      } catch (error) {
        console.error('Error updating images', error);
      }
    }
  }
}
</script>

<style scoped>

</style>
