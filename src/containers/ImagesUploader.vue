<template>
  <div>
    <draggable ghost-class="opacity-30" v-model="images" @start="dragStart" @end="dragEnd">
      <transition-group class="images-grid">
        <div v-for="(image, idx) in images" :key="idx" class="image-cont">
          <img :src="'http://velohub.lndo.site' + image" alt="">
          <button @click.prevent="deleteImage(idx)" type="button" class="delete is-danger"/>
        </div>
      </transition-group>
    </draggable>

    <b-field
        v-if="propImages.length < maxAmount"
        class="file is-primary is-centered mt-3">
      <b-upload v-model="uploadFiles" multiple class="file-label">
          <span class="file-cta">
              <b-icon class="file-icon" icon="upload"/>
              <span class="file-label">Загрузить</span>
          </span>
      </b-upload>
    </b-field>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'propImagesUploader',
  components: {
    draggable
  },
  props: {
    propImages: {
      type: Array,
      default: () => []
    },
    maxAmount: {
      type: [Number],
      default: 1
    }
  },
  data () {
    return {
      images: [...this.propImages],
      uploadFiles: [],
      height: 0
    }
  },
  watch: {
    'propImages': function () {
      this.images = [...this.propImages];
    },
    'uploadFiles': function () {
      if (this.uploadFiles.length) {
        this.uploadImages(this.uploadFiles);
        this.uploadFiles = [];
      }
    }
  },
  methods: {
    dragStart () {
      this.temp = this.images;
    },

    dragEnd () {
      if (this.images !== this.temp) {
        this.$emit('update', this.images);
      }
    },

    deleteImage (idx) {
      this.images.splice(idx, 1);
      this.$emit('update', this.images);
    },

    uploadImages (files) {
      if (this.validateImages(files)) {
        this.$emit('upload', files)
      }
    },

    validateImages (files) {
      files.forEach((file) => {
        if (!file.name.match(/\.(jpg|jpeg|gif|png)$/i)) {
          this.$buefy.toast.open({
            message: 'Allowed file formats: jpg, jpeg, gif, png',
            type: 'is-warning'
          })
          return false;
        }
        if (file.size > 1024 * 1024) {
          this.$buefy.toast.open({
            message: 'The maximum supported file sizes is 1 mb',
            type: 'is-warning'
          })
          return false;
        }
      });
      return true;
    }
  }
}
</script>

<style scoped>
.images-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20%, 20%));
}
.images-grid .image-cont {
  position: relative;
  margin: 5px;
  padding-top: 100%;
  background: cadetblue;
  border-radius: 0.5rem;
}
.images-grid .image-cont img {
  display: block;
  position: absolute;
  object-fit: cover;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border-radius: 0.5rem;
}
.images-grid .image-cont button {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
}
</style>
