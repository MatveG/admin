<template>
  <section class="section is-main-section">
    <buttons-toolbar>
      <template slot="left">
        <back-button @click="$router.push({ name: 'orders' })"/>
      </template>
      <template slot="right">
        <save-button :loading="isLoading" :disabled="isSaved" @click="submit"/>
      </template>
    </buttons-toolbar>

    <div class="columns">
      <div class="column is-9">
        <div class="columns is-multiline">
          <div class="column is-half">
            <form @submit.prevent @change="changed" @keyup="isSaved = false">
              <order-status :order="order" :$v="$v" :settings="settings"/>
            </form>
          </div>
          <div class="column is-half">
            <form @submit.prevent @change="changed" @keyup="isSaved = false">
              <order-client :order="order" :$v="$v"/>
            </form>
          </div>
          <div class="column is-full">
            <order-products :products="order.products" :edit-mode="true"/>
          </div>
        </div>
      </div>

      <div class="column">
        <form @submit.prevent @change="changed" @keyup="isSaved = false">
          <order-payment :order="order" :$v="$v" :settings="settings"/>
          <order-address :order="order" @clickAdd="addAddress"/>
          <order-summary :order="order"/>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import { minLength, required } from 'vuelidate/lib/validators'
import EditForm from '@/containers/EditForm'
import ButtonsToolbar from '@/components/ButtonsToolbar'
import BackButton from '@/components/buttons/BackButton'
import SaveButton from '@/components/buttons/SaveButton'
import OrderStatus from '../components/OrderStatus'
import OrderClient from '../components/OrderClient'
import OrderProducts from '../containers/OrderProducts'
import OrderPayment from '../components/OrderPayment'
import OrderAddress from '../components/OrderAddress'
import OrderSummary from '../components/OrderSummary'
import useOrderState from '../compositions/useOrderState'

export default {
  name: 'OrderEdit',
  extends: EditForm,
  components: {
    OrderSummary,
    OrderAddress,
    OrderPayment,
    OrderProducts,
    OrderClient,
    OrderStatus,
    ButtonsToolbar,
    BackButton,
    SaveButton
  },
  props: {
    propId: {
      type: [String, Number],
      default: null
    }
  },
  validations: {
    order: {
      status: { required },
      payment: { required },
      delivery: { required },
      phone: {
        required,
        minLength: minLength(7)
      }
    }
  },
  async mounted () {
    if (this.propId) {
      await this.fetchOrder(this.propId)
    }
  },
  methods: {
    addAddress () {
      this.$buefy.dialog.prompt({
        message: `Название значения`,
        trapFocus: true,
        onConfirm: (value) => {
          this.order.address = { ...this.order.address, [value]: null };
        }
      })
    },

    async save () {
      if (this.propId) {
        return this.updateOrder(this.order);
      }
      await this.storeOrder(this.order);
      await this.$router.replace({
        name: 'order.edit',
        params: { propId: this.order.id }
      });
    }
  },
  setup (props, context) {
    const settings = context.root.$settings('order');

    return {
      settings,
      ...useOrderState()
    }
  }
}
</script>

<style scoped>

</style>
