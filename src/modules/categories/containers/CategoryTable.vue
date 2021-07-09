<template>
    <div :class="{'nested' : nested}">
        <b-table ref="table"
                 :data="categories"
                 :loading="loading"
                 :opened-detailed="expanded"
                 :show-detail-icon="false"
                 @drop="dragdrop($event);swapOrd($event)"
                 @dragstart="dragstart"
                 @dragover="dragover"
                 @dragleave="dragleave"
                 draggable
                 hoverable
                 detailed
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
                    <b-checkbox v-model="props.row.is_active" @change.native="update(props.row)" class="is-small" />
                </b-table-column>

                <b-table-column custom-key="actions" width="15%" centered v-slot="props">
                  <div class="buttons">
                    <b-button
                        :to="{ name: 'category.edit', params: { propId: props.row.id } }"
                        :size="nested ? 'is-small' : ''"
                        tag="router-link"
                        type="is-primary"
                        icon-right="square-edit-outline"
                        slot="trigger"/>
                    <b-button
                        :size="nested ? 'is-small' : ''"
                        @click="confirmDelete(() => delete(props.row.id))"
                        type="is-danger"
                        icon-right="delete"
                        slot="trigger"/>
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
import { mapActions } from 'vuex'
import useDraggingRows from '@/hooks/useDraggingRows'
import useExpandRow from '@/hooks/useExpandRow'
import useDialogs from '@/hooks/useDialogs'
import useListState from '@/hooks/useListState'
import CategoryTable from './CategoryTable'

export default {
  name: 'CategoryTable',
  components: {
    CategoryTable
  },
  props: {
    categories: {
      type: Array,
      default: () => []
    },
    nested: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      opened: []
    }
  },
  setup (props, context) {
    const { confirmDelete } = useDialogs(props, context);
    return {
      confirmDelete,
      ...useListState(),
      ...useDraggingRows(),
      ...useExpandRow()
    };
  },
  methods: {
    async update (row) {
      this.loadingState();
      await this.updateCategory(row);
      this.readyState();
    },

    async delete (id) {
      this.loadingState();
      await this.deleteCategory(id);
      this.readyState();
    },

    async swapOrd (payload) {
      const [targetRow, dragRow] = [payload.row, this.draggingRow];

      if (targetRow && dragRow && targetRow.ord !== dragRow.ord) {
        [targetRow.ord, dragRow.ord] = [dragRow.ord, targetRow.ord];
        this.setLoadingState();
        await this.updateCategory(targetRow);
        await this.updateCategory(dragRow);
        this.setReadyState();
        this.$refs.table.initSort();
      }
    },

    ...mapActions([
      'updateCategory',
      'deleteCategory'
    ])
  }
}
</script>

<style>
.detail-paddingless tr.detail table {
  background-color: transparent;
}
.detail-paddingless tr.detail table td {
  padding-top: 0.1rem;
  padding-bottom: 0.1rem;
  border-color: #eee;
  color: #666;
}
.detail-paddingless tr.detail table.is-hoverable tr:hover {
  background-color: #fff;
}
</style>
