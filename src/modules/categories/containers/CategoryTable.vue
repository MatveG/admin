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
                 :per-page="20"
                 :loading="loading"
                 custom-row-key="id"
                 default-sort="ord"
                 hoverable
                 detailed
                 detail-key="id"
                 :show-detail-icon="false"
                 :opened-detailed="opened"
                 class="detail-paddingless">

                <b-table-column field="ord" label="" width="10%" sortable centered v-slot="props">
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
    update (row) {
      // this.stateLoading();
      // this.$store.dispatch('patchCategory', row).then(() => this.stateSaved());
    },

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
.detail-paddingless .detail td {
  padding: 0;
}
.detail-paddingless .detail-container {
  padding: 0 !important;
  margin: 0 !important;
}
</style>
