<template>
  <card-toolbar slot="toolbar" class="is-upper">
    <b-field slot="left" grouped>
      <b-field v-for="(key) in Object.keys(filters)" :key="key">
        <b-select
            v-model="filters[key]"
            @input="$emit('toggle', key, $event)"
            :placeholder="titles[key]">
          <option :value="null">Все</option>
          <option
              v-for="(value, idx) in Object.entries(settings[key])"
              :key="idx"
              :value="value[0]">
            {{value[1]}}
          </option>
        </b-select>
      </b-field>

      <b-button
          v-if="Object.entries(filters).find((el) => el[1] !== null)"
          @click="reset"
          outlined
          type="is-link"
          icon-right="close"/>
    </b-field>
    <div slot="right">
      <b-button
          v-if="canCreate"
          :to="{ name: 'order.create' }"
          tag="router-link"
          target="_blank"
          type="is-primary"
          icon-right="plus-circle"/>
    </div>
  </card-toolbar>
</template>

<script>
import CardToolbar from '@/components/CardToolbar';

export default {
  name: 'ProductsToolbar',
  components: {
    CardToolbar
  },
  props: {
    settings: {
      type: Object,
      required: true
    },
    canCreate: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      filters: {
        payment: null,
        delivery: null,
        status: null
      },
      titles: {
        payment: 'Оплата',
        delivery: 'Доставка',
        status: 'Статус'
      }
    };
  },
  methods: {
    reset () {
      Object.keys(this.filters).forEach((key) => {
        this.filters[key] = null;
      });
      this.$emit('reset');
    }
  }
};
</script>

<style scoped>

</style>
