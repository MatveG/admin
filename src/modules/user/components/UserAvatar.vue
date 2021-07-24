<template>
  <card-component title="Профиль" icon="card-account-details-outline" class="tile is-child">
<!--    <user-avatar class="has-max-width is-aligned-center"/>-->
    <div class="is-user-avatar">
      <img src="" alt="">
    </div>
    <images-uploader
        v-if="user.id"
        v-model="user.images"
        :path="user.imagesPath"
        :id="user.id"
        module="user"/>
  </card-component>
</template>

<script>
import CardComponent from '@/components/CardComponent';
import ImagesUploader from '@/containers/ImagesUploader';

export default {
  name: 'UserAvatar',
  components: {
    ImagesUploader,
    CardComponent
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>

</style>
