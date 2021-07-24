<template>
  <card-component title="Права" icon="account-key-outline" class="tile is-child">
    <b-table :data="modules" focusable>
      <b-table-column v-slot="props" label="Модуль">
        {{props.row}}
      </b-table-column>

      <b-table-column
          v-for="(column, index) in columns"
          v-slot="props"
          :key="index"
          :field="column.field"
          :label="column.label"
          centered>
        <b-checkbox
            v-if="user.rights[props.row]"
            v-model="user.rights[props.row][column.field]"/>
        <b-checkbox
            v-else
            :value="false"
            @input="user.rights[props.row] = { [column.field]: $event }"/>
      </b-table-column>
    </b-table>

    <div class="has-text-centered mt-3">
      <b-checkbox @input="checkAll" native-value="Silver">
        Отметить все
      </b-checkbox>
    </div>
  </card-component>
</template>

<script>
import CardComponent from '@/components/CardComponent';

export default {
  name: 'UserRights',
  components: {
    CardComponent
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  methods: {
    checkAll (value) {
      this.modules.forEach((module) => {
        this.user.rights[module] = {
          c: value,
          r: value,
          u: value,
          d: value
        };
      });
    }
  },
  setup () {
    const columns = [
      { field: 'c', label: 'C' },
      { field: 'r', label: 'R' },
      { field: 'u', label: 'U' },
      { field: 'd', label: 'D' }
    ];
    const modules = [
      'documents',
      'settings',
      'users',
      'products',
      'categories',
      'orders'
    ];

    return {
      columns,
      modules
    };
  }
};
</script>

<style scoped>

</style>
