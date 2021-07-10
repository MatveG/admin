<template>
  <section class="section is-main-section">
    <buttons-toolbar>
      <b-button :loading="loading" :disabled="saved" @click="saveCategory"
                type="is-primary" icon-right="content-save"/>
      <b-button :to="{ name: 'categories' }" tag="router-link" icon-right="arrow-left-circle"/>
    </buttons-toolbar>

    <div class="columns">
      <div class="column is-9">
        <form @submit.prevent="saveCategory" @change="changed" @keyup="draftState">
          <category-general v-model="category"/>
        </form>

        <card-component
            v-if="!category.is_parent"
            class="mt-5"
            title="Характеристики и параметры"
            icon="subtitles-outline">
          <b-tabs v-model="tab" type="is-boxed">
            <b-tab-item label="Характеристики">
              <category-features v-if="category.id" :categoryId="category.id"/>
            </b-tab-item>
            <b-tab-item label="Параметры">
<!--              <category-parameters v-if="category.id"/>-->
            </b-tab-item>
          </b-tabs>
        </card-component>
      </div>

      <div class="column">
        <category-parent v-model="category" :parentCategories="parentCategories" @change="changed"/>
        <card-component v-if="category.id" class="mt-5" title="Фотография" icon="image">
<!--&lt;!&ndash;          <images-upload :prop-images="category.images" @update="assign('images', $event)"&ndash;&gt;-->
<!--&lt;!&ndash;                         :prop-api="`/admin/categories/${category.id}`" :prop-max="1" prop-width="100%" />&ndash;&gt;-->
        </card-component>
      </div>
    </div>
  </section>
</template>

<script>
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import CardComponent from '@/components/CardComponent'
import ButtonsToolbar from '@/components/ButtonsToolbar'
import CategoryParent from '@/modules/categories/components/CategoryParent'
import CategoryGeneral from '@/modules/categories/components/CategoryGeneral'
import CategoryFeatures from '@/modules/features/containers/CategoryFeatures';
import useEditState from '@/hooks/useEditState'

export default {
  name: 'CategoryEdit',
  components: {
    CategoryGeneral,
    CardComponent,
    ButtonsToolbar,
    CategoryParent,
    CategoryFeatures
  },
  props: {
    propId: {
      type: [String, Number],
      default: null
    }
  },
  data () {
    return {
      tab: 0
    }
  },
  computed: mapGetters({
    category: 'getCategory',
    parentCategories: 'getParentCategories'
  }),
  validations: {
    category: {
      title: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(255)
      },
      title_short: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(255)
      }
    }
  },
  setup (props, context) {
    return {
      ...useEditState(props, context)
    };
  },
  mounted () {
    this.setCategory({});

    if (this.propId) {
      this.fetchCategory(this.propId);
    }
    this.fetchCategories();
  },
  methods: {
    changed () {
      this.draftState();

      if (this.propId) {
        this.resetSaveTimer(this.saveCategory);
      }
    },

    saveCategory () {
      this.saveData(async () => {
        if (this.propId) {
          await this.updateCategory(this.category);
        } else {
          await this.storeCategory(this.category);
          await this.$router.replace({
            name: 'category-edit',
            params: { propId: this.category.id }
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
      // clearTimeout(this.timers.save);
      this.loadingState();
      await saveHandler();
      this.savedState();
      return this;
    },

    ...mapActions([
      'fetchCategory',
      'updateCategory',
      'storeCategory',
      'fetchCategories'
    ]),
    ...mapMutations({
      setCategory: 'CATEGORY_SET'
    })
  }
}
</script>

<style scoped>

</style>
