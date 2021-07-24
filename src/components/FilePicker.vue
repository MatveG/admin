<template>
  <b-field class="file">
    <b-upload v-model="file" @input="upload" :accept="accept">
      <a class="button is-primary">
        <b-icon icon="upload" custom-size="default"></b-icon>
        <span>{{ buttonLabel }}</span>
      </a>
    </b-upload>
    <span class="file-name" v-if="file">{{ file.name }}</span>
  </b-field>
</template>

<script>
export default {
  name: 'FilePicker',
  props: {
    accept: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      file: null,
      uploadPercent: 0
    };
  },
  computed: {
    buttonLabel () {
      return !this.file ? 'Загрузить' : 'Загрузить еще';
    }
  },
  methods: {
    upload (file) {
      this.$emit('input', file);
    }
  }
};
</script>
