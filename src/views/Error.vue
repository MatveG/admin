<template>
  <div class="has-text-centered">
    <card-component
        v-if="isInCard"
        title="Sample Error"
        icon="alert"
        :has-button-slot="true"
        :has-card-header-background="true">
      <router-link slot="button" to="/" class="button is-small">
        <b-icon icon="desktop-mac" custom-size="default"/>
      </router-link>
      <error-content title="Error" @go-back="$router.go(-1)"/>
    </card-component>
    <error-content v-else title="Error" @go-back="$router.go(-1)"/>
  </div>
</template>

<script>
import ErrorContent from '@/components/ErrorContent';
import CardComponent from '@/components/CardComponent';

export default {
  name: 'Error',
  components: { CardComponent, ErrorContent },
  props: {
    isInCard: {
      type: Boolean,
      default: true
    }
  }
};
</script>
