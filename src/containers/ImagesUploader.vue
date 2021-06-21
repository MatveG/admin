<template>
  <div>
    <draggable ghost-class="opacity-30" v-model="propImages" @start="dragStart" @end="dragEnd">
      <transition-group class="images-grid">
        <div v-for="(image, idx) in propImages" :key="idx" class="image-cont">
          <img :src="image" alt="">
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
import axios from '@/api/axios'

export default {
  name: 'ImagesUploader',
  components: {
    draggable
  },
  props: {
    id: {
      type: Number,
      required: true
    },
    model: {
      type: String,
      required: true
    },
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
      // images: [...this.propImages],
      uploadFiles: []
    }
  },
  watch: {
    // 'propImages': function () {
    //   this.images = [...this.propImages];
    // },
    'uploadFiles': function () {
      if (this.uploadFiles.length) {
        this.uploadImages();
        // this.uploadFiles = [];
      }
    }
  },
  methods: {
    dragStart () {
      this.temp = this.propImages;
    },

    dragEnd () {
      if (this.propImages !== this.temp) {
        this.$emit('update', this.propImages);
      }
    },

    deleteImage (idx) {
      this.propImages.splice(idx, 1);
      this.$emit('update', this.propImages);
    },

    uploadImages () {
      if (this.validateImages(this.uploadFiles)) {
        this.handleUpload();
      }
    },

    validateImages () {
      this.uploadFiles.forEach((file) => {
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
    },

    async handleUpload () {
      const request = new FormData();
      const settings = { headers: { 'content-type': 'multipart/form-data' } };

      this.uploadFiles.forEach((image) => request.append('images[]', image));

      try {
        const { data } = await axios.post(`images/upload/${this.model}/${this.id}/`, request, settings);
        console.error('data', data);
      } catch (error) {
        console.error('Error uploading images', error);
      }
    },

    async handleUpdate (images) {
      console.log('updateImages', { images });
      try {
        const { data } = await axios.post(`products/${this.product.id}/update-images`, { images });

        console.log('updateImages', data);
        // this.product.images = data;
        this.product['images'] = data;
      } catch (error) {
        console.error('Error updating images', error);
      }
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
