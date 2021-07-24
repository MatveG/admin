<template>
  <section class="section is-main-section">
    <card-component class="has-table has-mobile-sort-spaced"
                    title="Документы" icon="account-cog-outline">
      <users-toolbar @toggle="toggleFilter"/>

      <b-table
          :data="users"
          :loading="isLoading"
          :per-page="25"
          ref="table"
          paginated
          hoverable
          class="valign-center"
          default-sort="title">

        <b-table-column label="ID" field="id" width="10%"
                        sortable centered v-slot="props">
          {{props.row.id }}
        </b-table-column>

        <b-table-column label="Имя" field="name" width="20%"
                        sortable searchable v-slot="props">
          {{ props.row.name }}
        </b-table-column>

        <b-table-column label="E-mail" field="email" width="20%"
                        sortable searchable v-slot="props">
          {{ props.row.email }}
        </b-table-column>

        <b-table-column label="Дата регистрации" field="created_at" width="20%"
                        centered sortable v-slot="props">
          {{new Date(props.row.created_at).toLocaleDateString("ru-RU")}}
        </b-table-column>

        <b-table-column field="is_active" label="Активен" width="15%"
                        sortable centered v-slot="props">
          <b-switch v-model="props.row.is_active" @input="updateUsersRow(props.row)" outlined/>
        </b-table-column>

        <b-table-column cell-class="is-centered buttons is-flex-wrap-nowrap"
                        label="*" custom-key="actions" width="15%" centered v-slot="props">
          <edit-button :to="{ name: 'user.edit', params: { propId: props.row.id } }"/>
          <remove-button @click="removeUsersRow(props.row)"/>
        </b-table-column>
      </b-table>
    </card-component>
  </section>
</template>

<script>
import CardComponent from '@/components/CardComponent';
import EditButton from '@/components/buttons/EditButton';
import RemoveButton from '@/components/buttons/RemoveButton';
import UsersToolbar from '../components/UsersToolbar';
import useTableFilters from '@/compositions/useTableFilters';
import useUserState from '../compositions/useUserState';

export default {
  name: 'DocumentMain',
  components: {
    UsersToolbar,
    CardComponent,
    EditButton,
    RemoveButton
  },
  async mounted () {
    await this.fetchUsers();
  },
  setup (props, context) {
    return {
      ...useUserState(),
      ...useTableFilters(props, context)
    };
  }
};
</script>

<style scoped>

</style>
