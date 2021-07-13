<template>
  <div>
    <b-table
        :data="isCreated ? [...items, item] : items"
        :opened-detailed="opened"
        :show-detail-icon="false"
        @dragstart="dragstart($event); reset()"
        @dragover="dragover"
        @dragleave="dragleave"
        @drop="dragdrop($event); swap($event)"
        draggable
        detailed
        hoverable
        ref="table"
        custom-row-key="id"
        default-sort="ord"
        detail-key="id"
        class="detail-simple">

      <b-table-column field="ord" label="↑↓" width="10%" sortable centered v-slot="props">
        {{ props.row.ord }}
      </b-table-column>

      <b-table-column field="title" label="Имя" width="30%" sortable v-slot="props">
        <b-field v-if="isEdited(props.row)" :type="{ 'is-danger': $v.item.title.$error }">
          <b-input v-model="item.title"/>
        </b-field>
        <span v-else :class="{ 'has-text-weight-bold': props.row.is_parent }">
          {{ props.row.title }}
        </span>
      </b-table-column>

      <b-table-column field="type" label="Тип" width="20%" sortable centered v-slot="props">
        <edit-data-type
            v-if="isEdited(props.row)"
            v-model="item"
            :data-types="dataTypes"
            :v="$v.item"
            @change="changeType"/>
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

      <b-table-column label="*" width="20%" centered v-slot="props">
        <div v-if="isEdited(props.row)" class="buttons is-pulled-right is-flex-wrap-nowrap">
          <b-button @click="save" size="is-small" type="is-primary" icon-right="check"/>
          <b-button @click="reset" size="is-small" icon-right="close"/>
        </div>
        <div v-else class="buttons is-pulled-right is-flex-wrap-nowrap">
          <b-button v-if="props.row.is_parent" @click="createChild(props.row.id)"
                    size="is-small" type="is-link is-light" icon-right="plus"/>
          <b-button @click="edit(props.row)"
                    size="is-small" type="is-primary" icon-right="square-edit-outline"/>
          <b-button @click="remove(props.row.id)"
                    size="is-small" type="is-danger is-light" icon-right="delete"/>
        </div>
      </b-table-column>

      <template slot="detail" slot-scope="props">
        <category-properties
            :properties="properties"
            :category-id="categoryId"
            :parent-id="props.row.id"
            :data-types="dataTypes"
            :ref="`subTable-${props.row.id}`"/>
      </template>
    </b-table>

    <div v-if="!parentId" class="buttons is-centered mt-3">
      <b-button size="is-small" @click="create" type="is-primary" icon-left="plus">
        Добавить
      </b-button>
    </div>
  </div>
</template>

<script>
import { ref, computed } from '@vue/composition-api'
import { minLength, required, requiredIf } from 'vuelidate/lib/validators'
import EditDataType from '@/components/EditDataType'
import useDialogs from '@/compositions/useDialogs'
import useDraggingRows from '@/compositions/useDraggingRows'

export default {
  name: 'CategoryProperties',
  components: { EditDataType },
  props: {
    properties: {
      type: Array,
      required: true
    },
    categoryId: {
      type: Number,
      required: true
    },
    parentId: {
      type: Number,
      default: null
    },
    dataTypes: {
      type: Object,
      required: true
    }
  },
  validations: {
    item: {
      title: {
        required,
        minLength: minLength(2)
      },
      type: {
        required
      },
      values: {
        required: requiredIf((item) => item.type === 'select' || item.type === 'multiple'),
        minLength: minLength(1)
      }
    }
  },
  methods: {
    create () {
      this.reset();
      this.$refs.table.initSort();
      this.isCreated = true;
      this.item = {
        parent_id: this.parentId,
        category_id: this.categoryId
      }
    },

    edit (row) {
      this.reset();
      this.item = { ...row };
    },

    save () {
      this.$v.$touch();

      if (this.$v.$invalid) {
        return false;
      }
      this.$emit(this.item.id ? 'update' : 'store', this.item);
      this.reset();
    },

    remove (id) {
      this.confirmDelete(() => {
        this.$emit('remove', id);
      });
    },

    swap (event) {
      const [targetRow, dragRow] = [event.row, this.draggingRow];

      if (targetRow && dragRow && targetRow !== dragRow) {
        [targetRow.ord, dragRow.ord] = [dragRow.ord, targetRow.ord];
        this.$emit('update', targetRow);
        this.$emit('update', dragRow);
        this.$refs.table.initSort();
      }
    },

    reset () {
      this.$v.$reset();
      this.item = {};
      this.isCreated = false;
    },

    createChild (id) {
      this.$refs[`subTable-${id}`].create();
    }
  },
  setup (props) {
    const item = ref({});
    const isCreated = ref(false);

    const items = computed(() => {
      return props.properties.filter((el) => {
        return props.parentId === null || el.parent_id === props.parentId;
      });
    });
    const opened = computed(() => {
      return items.value.filter((el) => el.is_parent).map((el) => el.id);
    });

    function isEdited (row) {
      return row.id === item.value.id || row === item.value;
    }

    function changeType () {
      item.value.is_required = false;
      item.value.is_filter = false;
    }

    return {
      item,
      isCreated,
      items,
      opened,
      isEdited,
      changeType,
      ...useDialogs(),
      ...useDraggingRows()
    };
  }
}
</script>

<style scoped>

</style>
