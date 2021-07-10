<template>
  <div>
    <b-table
        :data="creating ? [...items, item] : items"
        :loading="loading"
        :opened-detailed="opened"
        :show-detail-icon="false"
        @drop="dragdrop($event); swapOrd($event)"
        @dragstart="dragstart"
        @dragover="dragover"
        @dragleave="dragleave"
        hoverable
        draggable
        detailed
        ref="table"
        custom-row-key="id"
        default-sort="ord"
        detail-key="id"
        class="valign-center">

      <b-table-column field="ord" label="↑↓" width="10%" sortable centered v-slot="props">
        {{ props.row.ord }}
      </b-table-column>

      <b-table-column field="title" label="Имя" width="30%" sortable v-slot="props">
        <b-field v-if="isEdited(props.row)">
          <b-input v-model="item.title"/>
        </b-field>
        <span v-else>{{ props.row.title }}</span>
      </b-table-column>

      <b-table-column field="type" label="Тип" width="25%" sortable centered v-slot="props">
        <edit-type v-if="isEdited(props.row)" v-model="item" :dataTypes="dataTypes"/>
        <span v-else>{{ dataTypes[props.row.type] }}</span>
      </b-table-column>

      <b-table-column field="is_required" label="Обязательное" width="10%" sortable centered v-slot="props">
        <b-checkbox
            v-if="isEdited(props.row)"
            v-model="item.is_required"
            :disabled="item.type === 'group'"/>
        <b-icon v-else-if="props.row.is_required" icon="check" size="is-small"/>
      </b-table-column>

      <b-table-column field="is_filter" label="Фильтр" width="10%" sortable centered v-slot="props">
        <b-checkbox
            v-if="isEdited(props.row)"
            v-model ="item.is_filter"
            :disabled="item.type === 'text' || item.type === 'group'" />
        <b-icon v-else-if="props.row.is_filter" icon="check" size="is-small"/>
      </b-table-column>

      <b-table-column label="*" width="25%" centered v-slot="props">
        <div v-if="isEdited(props.row)" class="buttons is-centered is-flex-wrap-nowrap">
          <b-button @click="save" size="is-small" type="is-primary" icon-right="check"/>
          <b-button @click="reset" size="is-small" icon-right="close"/>
        </div>
        <div v-else class="buttons is-centered is-flex-wrap-nowrap">
          <b-button v-if="props.row.is_parent" @click="createChild(props.row.id)"
                    size="is-small" type="is-primary" icon-right="plus"/>
          <b-button @click="edit(props.row)"
                    size="is-small" type="is-primary" icon-right="square-edit-outline"/>
          <b-button @click="confirmDelete(() => deleteFeature(props.row.id))"
                    size="is-small" type="is-danger" icon-right="delete"/>
        </div>
      </b-table-column>

      <template slot="detail" slot-scope="props">
        <features-list
            :features="features"
            :category-id="categoryId"
            :parent-id="props.row.id"
            :ref="`childTable-${props.row.id}`"/>
      </template>
    </b-table>

    <div v-if="parentId === 0" class="buttons is-centered margin-line">
      <button class="button is-primary" type="button" @click="create">Добавить</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import useDialogs from '@/hooks/useDialogs'
import useListState from '@/hooks/useListState'
import useDraggingRows from '@/hooks/useDraggingRows'
import useEditableList from '../hooks/useEditableList'
import EditType from '@/modules/features/components/EditType'

const dataTypes = {
  group: 'группа',
  number: 'число',
  string: 'строка',
  text: 'текст',
  bool: 'есть/нет',
  select: 'выбор',
  multiple: 'мульти выбор'
};

export default {
  name: 'FeaturesList',
  components: {
    EditType
  },
  props: {
    features: {
      type: Array,
      required: true
    },
    categoryId: {
      type: Number,
      required: true
    },
    parentId: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      dataTypes
    }
  },
  computed: {
    items () {
      return this.features.filter((el) => el.parent_id === this.parentId);
    },
    opened () {
      return this.features.filter((el) => el.is_parent).map((el) => el.id);
    }
  },
  setup (props, context) {
    const { confirmDelete } = useDialogs(props, context);
    return {
      confirmDelete,
      ...useListState(),
      ...useDraggingRows(),
      ...useEditableList()
    };
  },
  methods: {
    create () {
      this.$refs.table.initSort();
      this.reset();
      this.creating = true;
      this.item = {
        parent_id: this.parentId,
        category_id: this.categoryId
      };
    },

    edit (row) {
      this.reset();
      this.item = { ...row };
    },

    async save () {
      this.loadingState();
      await this[this.item.id ? 'updateFeature' : 'storeFeature'](this.item);
      this.readyState();
      this.reset();
    },

    createChild (id) {
      this.$refs[`childTable-${id}`].create();
    },

    async swapOrd (payload) {
      const [targetRow, dragRow] = [payload.row, this.draggingRow];

      if (targetRow && dragRow && targetRow !== dragRow) {
        [targetRow.ord, dragRow.ord] = [dragRow.ord, targetRow.ord];
        this.loadingState();
        await Promise.all([this.updateFeature(targetRow), this.updateFeature(dragRow)])
        this.$refs.table.initSort();
        this.readyState();
      }
    },

    ...mapActions([
      'storeFeature',
      'updateFeature',
      'deleteFeature'
    ])
  }
}
</script>

<style scoped>

</style>
