<template>
  <div>
    <section class="section is-main-section">
      <card-component class="has-table has-mobile-sort-spaced" title="Clients" icon="account-multiple">
        <refresh-button slot="button"/>
        <card-toolbar slot="toolbar" class="is-upper">
          <div slot="left" class="buttons has-addons">
            <button class="button is-active" @click="actionSample">Active</button>
            <button class="button" disabled>Recent</button>
            <button class="button" disabled>Archived</button>
          </div>
          <form slot="right" @submit.prevent="actionSample">
            <div class="field has-addons" >
              <div class="control">
                <input class="input" type="text" placeholder="Sample field...">
              </div>
              <div class="control">
                <button type="submit" class="button is-primary">
                  <b-icon icon="dots-horizontal" custom-size="default"/>
                </button>
              </div>
            </div>
          </form>
        </card-toolbar>

        <clients-table-sample data-url="/data-sources/clients.json" :checkable="true"/>

      </card-component>
    </section>
  </div>

</template>

<script>
import ClientsTableSample from '@/components/ClientsTableSample'
import CardComponent from '@/components/CardComponent'
import RefreshButton from '@/components/RefreshButton'
import CardToolbar from '@/components/CardToolbar'
export default {
  name: 'Tables',
  components: {
    CardToolbar,
    RefreshButton,
    CardComponent,
    ClientsTableSample
  },
  methods: {
    actionSample () {
      this.$buefy.toast.open({
        message: 'Some action',
        type: 'is-info',
        queue: false
      })
    }
  }
}
</script>
