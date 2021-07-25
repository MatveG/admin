<template>
  <b-button
      :size="size"
      @click="click"
      outlined
      type="is-danger"
      icon-right="delete"
      slot="trigger"/>
</template>

<script>
import useDialogs from '@/compositions/useDialogs';

export default {
  name: 'RemoveButton',
  props: {
    size: {
      type: String,
      default: ''
    }
  },
  methods: {
    click () {
      this.confirmDialog(() => this.$emit('click'), 'Удалить?', 'is-danger', 'delete');
    }
  },
  setup () {
    const { confirmDialog } = useDialogs();
    return {
      confirmDialog
    };
  }
};
</script>

<style scoped>

</style>
