<template>
  <section class="section is-main-section">
    <access-denied v-if="!canRead"/>
    <card-component v-else class="has-table has-mobile-sort-spaced"
                    title="Документы" icon="file-document-outline">
      <documents-toolbar :can-create="canCreate" @toggle="toggleFilter"/>

      <b-table
          :data="documents"
          :loading="isLoading"
          :per-page="25"
          ref="table"
          paginated
          hoverable
          class="valign-center"
          default-sort="title">

        <b-table-column label="ID" field="id" width="15%" sortable centered v-slot="props">
          {{props.row.id }}
        </b-table-column>

        <b-table-column label="Url" field="slug" width="25%" sortable searchable v-slot="props">
          /<span class="is-italic">{{ props.row.slug }}</span>
        </b-table-column>

        <b-table-column label="Тайтл" field="title" width="30%" sortable searchable v-slot="props">
          {{ props.row.title }}
        </b-table-column>

        <b-table-column field="is_active" label="Активен" width="15%"
                        sortable centered v-slot="props">
          <b-switch v-model="props.row.is_active" @input="updateDocumentsRow(props.row)" outlined/>
        </b-table-column>

        <b-table-column cell-class="is-centered buttons is-flex-wrap-nowrap"
                        label="*" custom-key="actions" width="15%" centered v-slot="props">
          <edit-button
              v-if="canUpdate"
              :to="{ name: 'document.edit', params: { propId: props.row.id } }"/>
          <remove-button
              v-if="canDelete"
              @click="removeDocumentsRow(props.row)"/>
        </b-table-column>
      </b-table>
    </card-component>
  </section>
</template>

<script>
import AccessDenied from '@/components/AccessDenied';
import CardComponent from '@/components/CardComponent';
import DocumentsToolbar from '@/modules/document/components/DocumentsToolbar';
import EditButton from '@/components/buttons/EditButton';
import RemoveButton from '@/components/buttons/RemoveButton';
import useTableFilters from '@/compositions/useTableFilters';
import useDocumentState from '../compositions/useDocumentState';
import useAccessRights from '@/compositions/useAccessRights';

export default {
  name: 'DocumentMain',
  components: {
    AccessDenied,
    DocumentsToolbar,
    CardComponent,
    EditButton,
    RemoveButton
  },
  async mounted () {
    await this.fetchDocuments();
  },
  setup (props, context) {
    return {
      ...useDocumentState(),
      ...useTableFilters(props, context),
      ...useAccessRights('documents')
    };
  }
};
</script>

<style scoped>

</style>
