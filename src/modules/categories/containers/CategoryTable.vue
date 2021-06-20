<template>
    <div :class="{'nested' : nested}">
<!--      <b-table ref="table"-->
<!--               :data="items"-->
<!--               :per-page="perPage"-->
<!--               :loading="loading"-->
<!--               custom-row-key="id"-->
<!--               default-sort="ord"-->
<!--               @drop="drop"-->
<!--               @dragstart="dragstart"-->
<!--               @dragover="dragover"-->
<!--               @dragleave="dragleave"-->
<!--               hoverable-->
<!--               detailed-->
<!--               detail-key="id"-->
<!--               :show-detail-icon="false"-->
<!--               :opened-detailed="opened"-->
<!--               icon-pack="fa"-->
<!--               class="valign-center">-->
        <b-table ref="table"
                 :data="categories"
                 :per-page="perPage"
                 :loading="loading"
                 :opened-detailed="opened"
                 :show-detail-icon="false"
                 hoverable detailed
                 custom-row-key="id"
                 detail-key="id"
                 class="detail-paddingless"
                 default-sort="id">

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
                    <b-checkbox v-model="props.row.is_active" class="is-small" disabled />
                </b-table-column>

                <b-table-column custom-key="actions" width="15%" centered v-slot="props">
<!--                    <b-dropdown hoverable :expanded="false" aria-role="list" class="dropdown-buttons">-->
<!--                        <button @click="edit(props.row)" slot="trigger" class="button is-primary fas fa-pen" />-->

<!--                        <b-dropdown-item v-if="props.row.is_parent" @click="createChild(props.row)" aria-role="listitem">-->
<!--                            <b-icon pack="fas" icon="plus" />-->
<!--                        </b-dropdown-item>-->

<!--                        <b-dropdown-item @click="confirmDestroy(props.row)" aria-role="listitem">-->
<!--                            <b-icon pack="fas" icon="trash" />-->
<!--                        </b-dropdown-item>-->
<!--                    </b-dropdown>-->
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
import draggable from 'vuedraggable'
import CategoryTable from './CategoryTable'
import TableView from '@/commons/TableView'

export default {
  name: 'CategoryTable',
  extends: TableView,
  mixins: [
    draggable
  ],
  components: { CategoryTable },
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
      perPage: null
    }
  },
  computed: {
    opened () {
      return this.categories.filter((el) => el.is_parent).map((el) => el.id);
    }
  },
  methods: {
    drop (payload) {
      const [rowOne, rowTwo] = [payload.row, this.draggingRow];

      if (rowOne && rowTwo && rowOne.ord !== rowTwo.ord) {
        [rowOne.ord, rowTwo.ord] = [rowTwo.ord, rowOne.ord];

        this.$store.dispatch('patchCategory', rowOne);
        this.$store.dispatch('patchCategory', rowTwo);
        this.$refs.table.initSort();
      }
      this.dragdrop(payload);
    }
  }
}
</script>

<style>
.detail-paddingless tr.detail > td {
  padding: 0.3rem;
}
.detail-paddingless div.detail-container {
  padding: 0 !important;
  margin: 0 !important;
}
.detail-paddingless tr.detail table {
  background-color: transparent;
}
.detail-paddingless tr.detail table th {
  visibility: hidden;
  font-size: 0;
}
.detail-paddingless tr.detail table td {
  padding-top: 0;
  padding-bottom: 0;
}
</style>
