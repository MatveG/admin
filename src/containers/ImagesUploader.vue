<template>
  <div>
    <b-loading v-model="isLoading" :is-full-page="false"/>

    <draggable v-model="model" @start="dragStart" @end="dragEnd"
               ghost-class="opacity-30">
      <transition-group class="images-grid">
        <div v-for="(image, idx) in model" :key="idx" class="image-cont">
          <img :src="path + image" alt="">
          <button @click="deleteImage(idx)" class="delete is-danger" type="button"/>
        </div>
      </transition-group>
    </draggable>

    <b-field v-if="model.length < maxAmount"
        class="file is-primary is-centered mt-3">
      <b-upload v-model="upload" multiple>
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
import axios from '@/loaders/axios'
import useModelBinding from '@/compositions/useModelBinding';
import useLoadingState from '@/compositions/useLoadingState'
import useDialogs from '@/compositions/useDialogs';

export default {
  name: 'ImagesUploader',
  components: {
    draggable
  },
  props: {
    value: {
      type: Array,
      required: true
    },
    path: {
      type: String,
      default: ''
    },
    module: {
      type: String,
      required: true
    },
    id: {
      type: Number,
      required: true
    },
    maxAmount: {
      type: [Number],
      default: 1
    }
  },
  data () {
    return {
      upload: []
    }
  },
  watch: {
    'upload': function () {
      if (this.upload.length) {
        this.uploadImages(this.upload);
        this.upload = [];
      }
    }
  },
  methods: {
    uploadImages (files) {
      if (this.filesValid(files)) {
        this.handleUpload(files);
      }
    },

    deleteImage (idx) {
      this.handleUpdate(this.model.filter((el, index) => idx !== index));
    },

    dragStart () {
      this.temp = this.model;
    },

    dragEnd () {
      if (this.model !== this.temp) {
        this.handleUpdate(this.model);
      }
    }
  },
  setup (props, context) {
    const { model } = useModelBinding(props, context);
    const { isLoading, loadingState, readyState } = useLoadingState();
    const { fireToast } = useDialogs();

    function filesValid (files) {
      files.forEach((file) => {
        if (!file.name.match(/\.(jpg|jpeg|gif|png)$/i)) {
          fireToast('Allowed file formats: jpg, jpeg, gif, png');
          return false;
        }
        if (file.size > 1024 * 1024) {
          fireToast('The maximum supported file sizes is 1 mb');
          return false;
        }
      });
      return true;
    }

    async function handleUpload (files) {
      const request = new FormData();
      const settings = { headers: { 'content-type': 'multipart/form-data' } };

      files.forEach((file) => request.append('images[]', file));

      loadingState();
      try {
        const { data } = await axios.post(`/images/upload/${props.module}/${props.id}`, request, settings);
        model.value = data;
      } catch (error) {
        fireToast('Error uploading images', 'is-error');
        console.error(error);
      }
      readyState();
    }

    async function handleUpdate (images) {
      loadingState();

      try {
        const { data } = await axios.post(`/images/update/${props.module}/${props.id}`, { images });
        model.value = data;
      } catch (error) {
        fireToast('Error updating images', 'is-error');
        console.error(error);
      }
      readyState();
    }

    return {
      model,
      isLoading,
      filesValid,
      handleUpload,
      handleUpdate
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
