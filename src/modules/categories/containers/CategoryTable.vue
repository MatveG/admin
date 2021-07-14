<template>
  <div :class="{'nested' : nested}">
    <b-table
        :data="categories"
        :loading="isLoading"
        :opened-detailed="expanded"
        :show-detail-icon="false"
        @drop="dragdrop($event);swap($event)"
        @dragstart="dragstart"
        @dragover="dragover"
        @dragleave="dragleave"
        draggable
        hoverable
        detailed
        ref="table"
        per-page="25"
        custom-row-key="id"
        detail-key="id"
        class="detail-paddingless"
        default-sort="ord">

      <b-table-column width="5%" centered v-slot="props">
        <a v-if="props.row.is_parent" @click="expandRow(props.row.id)" role="button">
                    <span :class="'icon ' + (isExpanded(props.row.id) ? 'is-expanded' : '')">
                      <i class="mdi mdi-chevron-right mdi-24px"></i>
                    </span>
        </a>
      </b-table-column>

      <b-table-column field="ord" label="↑↓" width="10%" sortable centered v-slot="props">
        {{ props.row.ord }}
      </b-table-column>

      <b-table-column field="id" label="ID" width="10%" sortable centered v-slot="props">
        {{ props.row.id }}
      </b-table-column>

      <b-table-column field="title" label="Название категории" width="50%" sortable v-slot="props">
        {{ props.row.title }}
      </b-table-column>

      <b-table-column field="is_active" label="Активна" width="15%" sortable centered v-slot="props">
        <b-switch
            v-model="props.row.is_active"
            :size="nested ? 'is-small' : ''"
            @change.native="update(props.row)"
            outlined/>
      </b-table-column>

      <b-table-column custom-key="actions" width="15%" centered v-slot="props">
        <div class="buttons">
          <b-button
              :to="{ name: 'category.edit', params: { propId: props.row.id } }"
              :size="nested ? 'is-small' : ''"
              outlined
              tag="router-link"
              type="is-primary"
              icon-right="square-edit-outline"/>
          <b-button
              :size="nested ? 'is-small' : ''"
              @click="remove(props.row.id)"
              outlined
              type="is-danger"
              icon-right="delete"/>
        </div>
      </b-table-column>

      <template slot="detail" slot-scope="props">
        <category-table
            v-if="props.row.is_parent"
            :categories="props.row.children"
            :nested="true" />
      </template>
    </b-table>
  </div>
</template>

<script>
import { useActions } from 'vuex-composition-helpers'
import useDraggingRows from '@/compositions/useDraggingRows'
import useExpandRow from '@/compositions/useExpandRow'
import useDialogs from '@/compositions/useDialogs'
import useLoadingState from '@/compositions/useLoadingState'

export default {
  name: 'CategoryTable',
  props: {
    categories: {
      type: Array,
      required: true
    },
    nested: {
      type: Boolean,
      default: false
    },
    filters: {
      type: Object
    }
  },
  watch: {
    filters: function (newVal) {
      Object.keys(newVal).forEach((key) => {
        this.$set(this.$refs.table.filters, key, this.filters[key] ? 'true' : null);
      });
    }
  },
  methods: {
    async update (row) {
      this.loadingState();
      await this.updateCategory(row);
      this.readyState();
    },

    async swap (payload) {
      const [targetRow, dragRow] = [payload.row, this.draggingRow];

      if (targetRow && dragRow && targetRow.ord !== dragRow.ord) {
        [targetRow.ord, dragRow.ord] = [dragRow.ord, targetRow.ord];
        this.loadingState();
        await this.updateCategory(targetRow);
        await this.updateCategory(dragRow);
        this.readyState();
        this.$refs.table.initSort();
      }
    },

    remove (id) {
      this.confirmDelete(async () => {
        this.loadingState();
        await this.deleteCategory(id);
        this.readyState();
      });
    }
  },
  setup (props, context) {
    const { confirmDelete } = useDialogs(props, context);

    return {
      confirmDelete,
      ...useLoadingState(),
      ...useDraggingRows(),
      ...useExpandRow(),
      ...useActions([
        'updateCategory',
        'deleteCategory'
      ])
    };
  }
}
</script>

<style>
.detail-paddingless tr.detail td {
  padding: 0;
}
/*.detail-paddingless tr.detail table {*/
/*  background-color: transparent;*/
/*}*/
.detail-paddingless tr.detail table td {
  padding: 0.25rem;
}
</style>
