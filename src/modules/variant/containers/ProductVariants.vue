<template>
  <card-component icon="form-select" class="mt-5">
    <card-toolbar slot="toolbar" class="is-upper px-2 py-0">
      <p slot="left" class="card-header-title">
        <b-icon icon="form-select" size="is-small"/>
        <span class="ml-2">Варианты товара</span>
      </p>
      <div slot="right" class="buttons">
        <b-button type="is-primary" size="is-small" icon-right="plus-circle" @click="create"/>
      </div>
    </card-toolbar>

    <b-table class="table-vertical-center"
             default-sort="code"
             v-if="product.variants && product.variants.length"
             :data="product.variants"
             :loading="loading"
             hoverable>
      <b-table-column field="images" label="Фото" width="5%"
                      sortable centered v-slot="props">
          <span v-if="props.row.images.length" class="icon has-text-dark">
              <i class="fas fa-check-square"></i>
          </span>
      </b-table-column>

      <b-table-column field="code" label="Артикул" width="10%"
                      sortable centered class="is-italic" v-slot="props">
          <span :class="!props.row.code ? 'has-text-grey-light' : ''">
            {{ (props.row.code) ? props.row.code : '[empty]' }}
          </span>
      </b-table-column>

      <b-table-column field="parameters" label="Параметры" width="30%" centered v-slot="props">
        <div class="buttons is-centered">
          <div v-for="(parameter, idx) in product.category.parameters" :key="idx">
            <span v-if="props.row.parameters[parameter.id]"
                  :title="parameter.title" class="tag ml-1">
                {{ props.row.parameters[parameter.id] }}
            </span>
          </div>
        </div>
      </b-table-column>

      <b-table-column field="stock" label="Остаток"
                      width="15%" sortable centered v-slot="props">
        <b-field>
          <b-input v-model.number="props.row.stock" type="number"
                   @keypress.native="forceInteger($event)" @change.native="update(props.row)" />
          <div class="control"><div class="button is-static">шт</div></div>
        </b-field>
      </b-table-column>

      <b-table-column field="surcharge" label="Цена/наценка"
                      width="20%" sortable centered v-slot="props">
        <b-field>
          <div class="control has-icons-right">
            <b-input v-model.number="props.row.price" disabled />
            <span class="icon is-small is-right">{{ settings('currency', 'sign') }}</span>
          </div>
          <b-input v-model.number="props.row.surcharge" @input.native="calcPrice(props.row)"
                   @change.native="update(props.row)" type="number"/>
        </b-field>
      </b-table-column>

      <b-table-column field="is_sale" label="Скидка" width="10%" sortable centered v-slot="props">
        <b-checkbox v-model="props.row.is_sale" :disabled="!product.is_sale"
                    @change.native="calcPriceAndUpdate(props.row)" />
      </b-table-column>

      <b-table-column field="id" label="Действия" width="10%" centered v-slot="props">
        <div class="is-grouped field">
          <button class="button fas fa-pen" type="button" @click="edit(props.row)" />
          <button class="button fas fa-trash-alt ml-1" type="button" @click="destroy(props.row)" />
        </div>
      </b-table-column>
    </b-table>

    <b-modal :active.sync="modal" aria-modal class="modal-edit-variant">
      <variant-edit :variant="variant" @close="modal=false" />
    </b-modal>
  </card-component>
</template>

<script>
import { mapGetters } from 'vuex';
import { forceInteger } from '@/mixins/forceInteger';
import CardComponent from '@/components/CardComponent';
import VariantEdit from './VariantEdit';
import Variant from '../classes/Variant';
import CardToolbar from '@/components/CardToolbar';

export default {
  name: 'ProductVariants',
  mixins: [
    forceInteger
  ],
  components: {
    CardComponent,
    CardToolbar,
    VariantEdit
  },
  props: {
    discount: Object
  },
  data () {
    return {
      modal: false,
      variant: {},
      timer: {}
    };
  },
  computed: mapGetters(['product']),
  watch: {
    'discount.amount': function () {
      this.product.variants.forEach((el) => this.calcPrice(el));
    },
    'product.price': function () {
      this.product.variants.forEach((el) => this.calcPrice(el));
    },
    'product.is_sale': function () {
      this.product.variants.forEach((el) => {
        el.is_sale = this.product.is_sale;
      });
    }
  },
  methods: {
    create () {
      this.variant = Variant.fromProduct(this.product);
      this.modal = true;
    },

    edit (row) {
      this.variant = Variant.fromObj(row);
      this.modal = true;
    },

    update (row) {
      clearTimeout(this.timer);

      row.draft = true;

      this.timer = setTimeout(async () => {
        this.stateLoading();

        await Promise.all(this.product.variants
          .filter((el) => el.draft)
          .map((el) => this.$store.dispatch('patchVariant', el)));

        this.stateSaved();
      }, 2000);
    },

    destroy (row) {
      this.confirm('Удалить?', async () => {
        this.stateLoading();

        await this.$store.dispatch('destroyVariant', row);

        this.stateSaved();
      });
    },

    calcPriceAndUpdate (row) {
      this.calcPrice(row);
      this.update(row);
    },

    calcPrice (row) {
      if (Number.isFinite(+this.product.price) && Number.isFinite(+row.surcharge)) {
        row.price = +this.product.price + +row.surcharge;
        row.price -= (this.product.is_sale && row.is_sale) ? this.discount : 0;
      }
    }
  }
};
</script>

<style scoped>

</style>
