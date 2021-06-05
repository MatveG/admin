<template>
  <div>
    <section class="section is-main-section">
      <tiles>
        <profile-update-form class="tile is-child"/>
        <card-component title="Profile" icon="account" class="tile is-child">
          <user-avatar class="has-max-width is-aligned-center"/>
          <hr>
          <b-field label="Name">
            <b-input :value="userName" custom-class="is-static" readonly/>
          </b-field>
          <hr>
          <b-field label="E-mail">
            <b-input :value="userEmail" custom-class="is-static" readonly/>
          </b-field>
        </card-component>
      </tiles>
      <password-update-form/>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CardComponent from '@/components/CardComponent'
import ProfileUpdateForm from '@/components/ProfileUpdateForm'
import PasswordUpdateForm from '@/components/PasswordUpdateForm'
import Tiles from '@/components/Tiles'
import UserAvatar from '@/components/UserAvatar'
export default {
  name: 'Profile',
  components: { UserAvatar, Tiles, PasswordUpdateForm, ProfileUpdateForm, CardComponent },
  computed: {
    ...mapState([
      'userName',
      'userEmail'
    ])
  }
}
</script>
