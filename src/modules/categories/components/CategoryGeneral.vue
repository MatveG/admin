<template>
  <card-component title="Основная информация" icon="image-text">
    <b-tabs type="is-boxed">
      <b-tab-item label="Название">
        <b-field :type="{ 'is-danger': v.title.$error }"
                 label="Название" message="Полное название" horizontal>
          <b-input v-model="model.title" />
        </b-field>
        <b-field :type="{ 'is-danger': v.title_short.$error }"
                 label="Текст ссылки" message="Сокращенное название" horizontal>
          <b-input v-model="model.title_short" />
        </b-field>
        <b-field label="Описание" horizontal>
          <b-input v-model="model.description" type="textarea" />
        </b-field>
      </b-tab-item>
      <b-tab-item label="SEO">
        <b-field label="URL" horizontal>
          <b-input v-model="model.slug" custom-class="is-static" readonly />
        </b-field>
        <b-field label="Заголовок" message="Тег title" horizontal>
          <b-input v-model="model.meta_title" />
        </b-field>
        <b-field label="Описание" message="Тег description" horizontal>
          <b-input v-model="model.meta_description" />
        </b-field>
        <b-field label="Ключевые слова" message="Тег keywords" horizontal>
          <b-input v-model="model.meta_keywords" />
        </b-field>
      </b-tab-item>
    </b-tabs>
  </card-component>
</template>

<script>
import useModelBinding from '@/compositions/useModelBinding'
import CardComponent from '@/components/CardComponent'

export default {
  name: 'CategoryGeneral',
  components: {
    CardComponent
  },
  props: {
    value: {
      type: Object,
      required: true
    },
    v: {
      type: Object,
      default: () => {}
    }
  },
  setup (props, context) {
    return { ...useModelBinding(props, context) };
  }
}
</script>

<style scoped>

</style>
