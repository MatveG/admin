<template>
  <section class="section is-main-section">
    <buttons-toolbar>
      <template slot="left">
        <back-button @click="$router.push({ name: 'documents' })"/>
      </template>
      <template slot="right">
        <save-button :loading="isLoading" :disabled="isSaved" @click="submit"/>
      </template>
    </buttons-toolbar>

    <div class="columns">
      <div class="column is-9">
        <form @submit.prevent @change="changed" @keyup="isSaved = false">

          <card-component>
            <b-tabs type="is-boxed">
              <b-tab-item label="Название" icon="form-textbox">
                <b-field label="Название" horizontal>
                  <b-input v-model="document.title"/>
                </b-field>
                <div class="card">
                  <quill-editor v-model="document.text" @change="changed" class="quill-editor"/>
                </div>
              </b-tab-item>

              <b-tab-item label="Мета" icon="search-web">
                <b-field label="Заголовок" message="Тег title" horizontal>
                  <b-input v-model="document.seo_title" />
                </b-field>
                <b-field label="Описание" message="Тег description" horizontal>
                  <b-input v-model="document.seo_description" />
                </b-field>
                <b-field label="Ключевые слова" message="Тег keywords" horizontal>
                  <b-input v-model="document.seo_keywords" />
                </b-field>
                <b-field label="Текст" horizontal>
                  <b-input v-model="document.seo_text" type="textarea" />
                </b-field>
              </b-tab-item>
            </b-tabs>
          </card-component>

        </form>
      </div>

      <div class="column">
        <card-component :title="`ID: ${document.id || ''}`" :hasButtonSlot="true"
                        class="tile is-child" icon="shape">
          <template v-slot:button>
            <b-button icon-left="open-in-new" size="is-small" tag="a" to="/"/>
          </template>

          <b-field class="has-text-centered">
            <b-switch v-model="document.is_active">Активен</b-switch>
          </b-field>
          <b-field label="Url документа" label-position="on-border">
            <div class="control is-left">
              <div class="button is-static">/</div>
            </div>
            <b-input v-model="document.slug" />
          </b-field>
        </card-component>
      </div>
    </div>
  </section>
</template>

<script>
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import { quillEditor } from 'vue-quill-editor';
import { maxLength, minLength, required } from 'vuelidate/lib/validators';
import AutoSaveForm from '@/containers/AutoSaveForm';
import CardComponent from '@/components/CardComponent';
import ButtonsToolbar from '@/components/ButtonsToolbar';
import BackButton from '@/components/buttons/BackButton';
import SaveButton from '@/components/buttons/SaveButton';
import useDocumentState from '../compositions/useDocumentState';

export default {
  name: 'DocumentEdit',
  extends: AutoSaveForm,
  components: {
    quillEditor,
    ButtonsToolbar,
    BackButton,
    SaveButton,
    CardComponent
  },
  props: {
    propId: {
      type: [String, Number],
      default: null
    }
  },
  validations: {
    document: {
      title: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(255)
      },
      slug: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(50)
      }
    }
  },
  async mounted () {
    if (this.propId) {
      await this.fetchDocument(this.propId);
    }
  },
  methods: {
    async save () {
      if (this.propId) {
        return this.updateDocument(this.document);
      }
      await this.storeDocument(this.document);
      await this.$router.replace({
        name: 'document.edit',
        params: { propId: this.document.id }
      });
    }
  },
  setup () {
    return {
      ...useDocumentState()
    };
  }
};
</script>

<style>
.quill-editor .ql-toolbar {
  border-top: 0;
  border-right: 0;
  border-left: 0;
  border-color: #eee;
}
.quill-editor .ql-container {
  border: 0;
}
</style>
