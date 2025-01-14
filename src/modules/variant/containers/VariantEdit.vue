<template>
  <div class="box">
    <form @submit.prevent="save" @change="changed" @keyup="changed">
      <card-component title="Параметры варианта">
        <div class="columns">
          <div class="column">
            <b-field label="Артикул" label-position="on-border">
              <b-input v-model="variant.code" placeholder="Уникальный идентификатор" />
            </b-field>
          </div>
          <div class="column">
            <b-field label="Штрих-код" label-position="on-border">
              <b-input v-model="variant.barcode" placeholder="Штрих-код товара" />
            </b-field>
          </div>
        </div>

        <div class="columns" v-if="variant.parameters">
          <div v-for="(parameter, idx) in product.category.parameters" :key="idx" class="column">
            <b-field :label="parameter.title" label-position="on-border"
                     :type="{ 'is-danger': $v.variant.parameters[parameter.id]
                     && $v.variant.parameters[parameter.id].$error }">
              <b-input
                  v-if="parameter.type === 'number'"
                  v-model="variant.parameters[parameter.id]"
                  :placeholder="'Параметр [' + parameter.title + ']'"
                  type="number"
                  step="any"
                  required/>

              <b-input v-if="parameter.type === 'string'" v-model="variant.parameters[parameter.id]"
                       :placeholder="'Параметр [' + parameter.title + ']'" required />

              <b-select
                  v-if="parameter.type === 'select'"
                  v-model="variant.parameters[parameter.id]"
                  expanded
                  required>
                <option :value="null">выберите</option>
                <option v-for="(value, idx) in parameter.values" :key="idx">{{ value }}</option>
              </b-select>
            </b-field>
          </div>
        </div>

        <div class="columns">
          <div class="column" />
          <div class="column">
            <b-field label="Вес" label-position="on-border">
              <b-input v-model="variant.weight" placeholder="Вес доставки" />
              <div class="control"><div class="button is-static">кг</div></div>
            </b-field>
          </div>
          <div class="column" />
        </div>
      </card-component>

      <card-component v-if="variant.id" title="Собственные фото" class="card-images margin-line">
        <!--Images upload-->
      </card-component>

      <div class="buttons margin-line is-centered">
        <button :disabled="saved" @click="save" :class="{ 'is-loading': loading }"
                type="button" class="button is-primary">Сохранить</button>
        <button @click="close()" type="button" class="button">Закрыть</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CardComponent from '@/components/CardComponent';

export default {
  name: 'VariantEdit',

  components: {
    CardComponent
  },

  props: {
    variant: {
      type: Object,
      default: () => {}
    }
  },

  data () {
    return {
      timer: null,
      modal: false
    };
  },

  computed: mapGetters(['products']),

  validations () {
    const res = {
      variant: {
        // code: this.validationsByType('string'),
        parameters: {}
      }
    };

    this.product.category.parameters.forEach((parameter) => {
      // res.variant.parameters[parameter.id] = this.validationsByType(parameter.type);
    });

    return res;
  },

  methods: {
    assign (property, value) {
      this.variant[property] = value;
      this.stateDraft().save();
    },

    changed () {
      this.stateDraft();

      if (this.variant.id) {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => this.save(), 2000);
      }
    },

    async save () {
      if (this.validate()) {
        this.stateLoading();

        clearTimeout(this.timer);
        await this.$store.dispatch(this.variant.id ? 'patchVariant' : 'storeVariant', this.variant);

        this.stateSaved();
      }
    },

    close () {
      clearTimeout(this.timer);
      this.$emit('close');
    }
  }
};

</script>

<style>
.modal-edit-variant .modal-content {
  width: 700px;
}
.modal-edit-variant .box {
  width: 100%;
}
.modal-edit-variant .card-images .card-content {
  padding: .5rem;
}
</style>
