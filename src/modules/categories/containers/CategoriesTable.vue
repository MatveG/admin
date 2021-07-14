<template>
  <div>
    <b-table
        :data="categories"
        :loading="isLoading"
        :opened-detailed="expanded"
        :show-detail-icon="false"
        @drop="dragdrop($event);swapOrd($event)"
        @dragstart="dragstart"
        @dragover="dragover"
        @dragleave="dragleave"
        draggable
        hoverable
        detailed
        ref="table"
        class="detail-paddingless"
        per-page="25"
        custom-row-key="id"
        detail-key="id"
        default-sort="ord">

      <b-table-column width="5%" centered v-slot="props">
        <a v-if="props.row.is_parent" @click="expandRow(props.row.id)">
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
            :value="props.row.is_active"
            :size="nested ? 'is-small' : ''"
            @input="update(props.row, 'is_active', $event)"
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
        <category-table v-if="props.row.is_parent" :parent-id="props.row.id"/>
      </template>
    </b-table>
  </div>
</template>

<script>
import { useActions, useGetters } from 'vuex-composition-helpers'
import useDraggingRows from '@/compositions/useDraggingRows'
import useExpandRow from '@/compositions/useExpandRow'
import useDialogs from '@/compositions/useDialogs'
import useLoadingState from '@/compositions/useLoadingState'
import { computed } from '@vue/composition-api'

export default {
  name: 'CategoryTable',
  props: {
    parentId: {
      type: Number,
      default: null
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
    async update (row, prop, value) {
      this.loadingState();
      await this.updateInCategories({ ...row, [prop]: value });
      this.readyState();
    },

    remove (id) {
      this.confirmDelete(async () => {
        this.loadingState();
        await this.removeFromCategories(id);
        this.readyState();
      });
    },

    async swapOrd (payload) {
      const [targetRow, dragRow] = [payload.row, this.draggingRow];

      if (targetRow && dragRow && targetRow.ord !== dragRow.ord) {
        await Promise.all([
          this.update(targetRow, 'ord', dragRow.ord),
          this.update(dragRow, 'ord', targetRow.ord)
        ]);
        this.$refs.table.initSort();
      }
    }
  },
  setup (props) {
    const { getCategories } = useGetters(['getCategories']);

    const categories = computed(() => getCategories.value.filter((el) => {
      return props.parentId === null || el.parent_id === props.parentId;
    }));
    const nested = props.parentId !== null;

    const { confirmDelete } = useDialogs();

    return {
      categories,
      nested,
      confirmDelete,
      ...useLoadingState(),
      ...useDraggingRows(),
      ...useExpandRow(),
      ...useActions([
        'updateInCategories',
        'removeFromCategories'
      ])
    };
  }
}
</script>

<style>
.detail-paddingless tr.detail td {
  padding: 0;
}
.detail-paddingless tr.detail table td {
  padding: 0.25rem;
}
</style>
