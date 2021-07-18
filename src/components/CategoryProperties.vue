<template>
  <div>
    <b-table
        :data="isCreated ? [...items, item] : items"
        :opened-detailed="opened"
        :show-detail-icon="false"
        @dragstart="dragstart($event); reset()"
        @dragover="dragover"
        @dragleave="dragleave"
        @drop="dragdrop($event); swapOrd($event)"
        draggable
        detailed
        hoverable
        ref="table"
        class="detail-simple"
        custom-row-key="id"
        default-sort="ord"
        detail-key="id">

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
            :item="item"
            :data-types="dataTypes"
            :v="$v.item"/>
        <span v-else>
          {{ dataTypes[props.row.type] }}
        </span>
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
          <b-button @click="save" outlined size="is-small" type="is-primary" icon-right="check"/>
          <b-button @click="reset" outlined size="is-small" type="is-dark" icon-right="close"/>
        </div>
        <div v-else class="buttons is-pulled-right is-flex-wrap-nowrap">
          <b-button v-if="props.row.is_parent" @click="createChild(props.row.id)"
                    outlined size="is-small" type="is-link" icon-right="plus"/>
          <edit-button size="is-small" @click="edit(props.row)"/>
          <remove-button size="is-small" @click="this.$emit('remove', props.row)"/>
        </div>
      </b-table-column>

      <template slot="detail" slot-scope="props">
        <category-properties
            :properties="properties"
            :parent-id="props.row.id"
            :data-types="dataTypes"
            :ref="`subTable-${props.row.id}`"
            @store="$emit('store', $event)"
            @update="$emit('update', $event)"
            @remove="$emit('remove', $event)"/>
      </template>
    </b-table>

    <div v-if="!parentId" class="buttons is-centered mt-3">
      <b-button @click="create" type="is-primary" icon-left="plus">
        Добавить
      </b-button>
    </div>
  </div>
</template>

<script>
import { minLength, required, requiredIf } from 'vuelidate/lib/validators'
import EditButton from '@/components/buttons/EditButton'
import RemoveButton from '@/components/buttons/RemoveButton'
import EditDataType from '@/components/EditDataType'
import useDialogs from '@/compositions/useDialogs'
import useDraggingRows from '@/compositions/useDraggingRows'

export default {
  name: 'CategoryProperties',
  components: {
    RemoveButton,
    EditButton,
    EditDataType
  },
  props: {
    properties: {
      type: Array,
      required: true
    },
    parentId: {
      type: Number,
      default: 0
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
  data () {
    return {
      item: {},
      isCreated: false
    }
  },
  computed: {
    items: function () {
      return this.properties.filter((el) => el.parent_id === this.parentId);
    },
    opened: function () {
      return this.items.filter((el) => el.is_parent).map((el) => el.id);
    }
  },
  methods: {
    isEdited (row) {
      return row.id === this.item.id || row === this.item;
    },

    create () {
      this.reset();
      this.$refs.table.initSort();
      this.isCreated = true;
      this.item = { parent_id: this.parentId };
    },

    edit (row) {
      this.reset();
      this.item = { ...row };
    },

    save () {
      if (!this.$v.$touch() && this.$v.$invalid) {
        return this.fireToast('Заполните обязательные поля')
      } if (!this.uniqueTitle()) {
        return this.fireToast('Имя должно быть уникальным')
      }
      this.$emit(this.item.id ? 'update' : 'store', this.item);
      this.reset();
    },

    swapOrd (payload) {
      const [targetRow, dragRow] = [payload.row, this.draggingRow];

      if (targetRow && dragRow && targetRow !== dragRow) {
        this.$emit('update', { ...targetRow, ord: dragRow.ord });
        this.$emit('update', { ...dragRow, ord: targetRow.ord });
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
    },

    uniqueTitle () {
      return !this.items.find((el) => el.id !== this.item.id && el.title === this.item.title)
    }
  },
  setup () {
    const { fireToast } = useDialogs();

    return {
      fireToast,
      ...useDraggingRows()
    };
  }
}
</script>

<style>
.detail-simple tr.detail td {
  padding: 0;
}
.detail-simple tr.detail table th {
  visibility: hidden;
  font-size: 0;
}
.detail-simple tr.detail table td {
  padding: 0.25rem;
}
</style>
