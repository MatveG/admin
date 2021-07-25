<template>
  <section class="section is-main-section">
    <access-denied v-if="!canRead"/>
    <card-component v-else class="has-table has-mobile-sort-spaced"
                    title="Настройки" icon="cog-outline">
      <div class="m-5 p-5">
        <b-table
            :data="settings"
            :loading="isLoading"
            :per-page="15"
            paginated
            hoverable
            class="valign-center"
            default-sort="group">

          <b-table-column v-slot="props" sortable searchable
                          label="Категория" field="group" width="15%">
            {{props.row.group.charAt(0).toUpperCase()}}{{props.row.group.substr(1)}}
          </b-table-column>

          <b-table-column v-slot="props" sortable searchable
                          label="Ключ" field="key" width="15%">
            {{props.row.key}}
          </b-table-column>

          <b-table-column v-slot="props" sortable searchable
                          label="Название" field="title" width="30%">
            {{props.row.title}}
          </b-table-column>

          <b-table-column v-slot="props" sortable label="Значение" field="value" width="35%">
            <template v-if="props.row.type === 'object'">
              <template v-for="key in Object.keys(props.row.value)">
                <b-field :key="key" :label="key" label-position="on-border">
                  <b-input
                      v-model="props.row.value[key]"
                      :disabled="!canUpdate"
                      @input="touchRow(props.row)"
                      size="is-small"/>
                  <p class="control">
                    <remove-button @click="removeKey(props.row, key)" size="is-small"/>
                  </p>
                </b-field>
              </template>
              <b-button outlined size="is-small" type="is-primary" icon-right="plus"
                        @click="addKey(props.row)"/>
            </template>

            <b-field v-else-if="props.row.type === 'boolean'" :message="props.row.hint">
              <b-switch
                  v-model="props.row.value"
                  :disabled="!canUpdate"
                  @input="touchRow(props.row)"
                  outlined/>
            </b-field>

            <b-field v-else :message="props.row.hint">
              <b-input
                  v-model="props.row.value"
                  :disabled="!canUpdate"
                  @input="touchRow(props.row)"/>
            </b-field>
          </b-table-column>

          <b-table-column v-slot="props" sortable width="5%">
            <save-button
                v-if="touched.includes(props.row.id)"
                :loading="loading.includes(props.row.id)"
                @click="saveRow(props.row)"/>
          </b-table-column>
        </b-table>
      </div>
    </card-component>
  </section>
</template>

<script>
import AccessDenied from '@/components/AccessDenied';
import CardComponent from '@/components/CardComponent';
import SaveButton from '@/components/buttons/SaveButton';
import RemoveButton from '@/components/buttons/RemoveButton';
import useSettingState from '../compositions/useSettingState';
import useAccessRights from '@/compositions/useAccessRights';

export default {
  name: 'SettingMain',
  components: {
    AccessDenied,
    CardComponent,
    RemoveButton,
    SaveButton
  },
  data () {
    return {
      touched: [],
      loading: []
    };
  },
  mounted () {
    this.fetchSettings();
  },
  methods: {
    async saveRow (row) {
      this.loading.push(row.id);
      await this.updateSettingsRow(row);
      this.touched = this.touched.filter((el) => el !== row.id);
      this.loading = this.loading.filter((el) => el !== row.id);
    },
    touchRow (row) {
      this.touched.push(row.id);
    },
    addKey (row) {
      this.$buefy.dialog.prompt({
        message: `Значение нового ключа`,
        trapFocus: true,
        onConfirm: (value) => {
          row.value = { ...row.value, [value]: null };
        }
      });
    },
    removeKey (row, key) {
      this.touched.push(row.id);
      this.$delete(row.value, key);
    }
  },
  setup () {
    return {
      ...useSettingState(),
      ...useAccessRights('settings')
    };
  }
};
</script>

<style scoped>

</style>
