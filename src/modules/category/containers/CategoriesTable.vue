<template>
  <div>
    <categories-toolbar v-if="!nested" @toggle="toggleFilter"/>

    <b-table
        :data="categories.filter((el) => el.parent_id === parentId)"
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
        class="detail-compact"
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
            v-model="props.row.is_active"
            :size="nested ? 'is-small' : ''"
            @input="updateCategoriesRow(props.row)"
            outlined/>
      </b-table-column>

      <b-table-column custom-key="actions" width="15%" centered v-slot="props">
        <div class="buttons">
          <edit-button
              :size="nested ? 'is-small' : ''"
              :to="{ name: 'category.edit', params: { propId: props.row.id } }"/>
          <remove-button :size="nested ? 'is-small' : ''" @click="removeCategoriesRow(props.row)"/>
        </div>
      </b-table-column>

      <template slot="detail" slot-scope="props">
        <category-table v-if="props.row.is_parent" :parent-id="props.row.id"/>
      </template>
    </b-table>
  </div>
</template>

<script>
import EditButton from '@/components/buttons/EditButton'
import RemoveButton from '@/components/buttons/RemoveButton'
import CategoriesToolbar from '../components/CategoriesToolbar'
import useExpandRow from '@/compositions/useExpandRow'
import useDraggingRows from '@/compositions/useDraggingRows'
import useTableFilters from '@/compositions/useTableFilters'
import useCategoryState from '../compositions/useCategoryState'

export default {
  name: 'CategoryTable',
  components: {
    CategoriesToolbar,
    EditButton,
    RemoveButton
  },
  props: {
    parentId: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      nested: this.parentId !== 0
    }
  },
  methods: {
    async swapOrd (payload) {
      const [targetRow, dragRow] = [payload.row, this.draggingRow];

      if (targetRow && dragRow && targetRow.ord !== dragRow.ord) {
        await Promise.all([
          this.updateCategoriesRow({ ...targetRow, ord: dragRow.ord }),
          this.updateCategoriesRow({ ...dragRow, ord: targetRow.ord })
        ]);
        this.$refs.table.initSort();
      }
    }
  },
  setup (props, context) {
    return {
      ...useCategoryState(),
      ...useDraggingRows(),
      ...useExpandRow(),
      ...useTableFilters(props, context)
    };
  }
}
</script>

<style>
.detail-compact tr.detail>td {
  padding: 0;
}
.detail-compact tr.detail table td {
  padding: 0.25rem;
}
</style>
