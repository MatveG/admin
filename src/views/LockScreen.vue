<template>
  <div class="has-text-centered">
    <user-avatar class="has-max-width is-aligned-center error-page-icon"/>
    <div class="error-page-caption">
      <h1></h1>
    </div>
    <div class="error-page-action">
      <div class="buttons is-centered">
        <button type="button" class="button is-black">
          Unlock
        </button>
      </div>
      <form>
        <b-field position="is-centered">
          <b-input ref="input" type="password"/>
          <div class="control">
            <button type="submit" class="button is-black">
              <b-icon icon="lock-open" custom-size="default"/>
            </button>
          </div>
        </b-field>
      </form>
    </div>
  </div>
</template>

<script>
import UserAvatar from '@/components/UserAvatar';

export default {
  name: 'LockScreen',
  components: { UserAvatar }
};
</script>
