<script>
export default {
  name: 'MainView',
  data () {
    return {
      loading: false,
      perPage: 30,
      checked: [],
      filters: {}
    }
  },
  methods: {
    toggleFilter (name) {
      this.filters[name] = !this.filters[name];
      if (this.$refs.table) {
        this.$refs.table.filters = {
          ...this.$refs.table.filters,
          [name]: this.$refs.table.filters[name] ? null : 'true'
        };
      }
    },

    confirmDelete (deleteHandler) {
      this.$buefy.dialog.confirm({
        hasIcon: true,
        type: 'is-danger',
        icon: 'delete',
        message: 'Удалить?',
        onConfirm: () => deleteHandler()
      })
    },

    setLoadingState () {
      this.loading = true;
      return this;
    },

    setReadyState () {
      this.loading = false;
      return this;
    }
  }
}
</script>

<style>
.b-table .table td {
  vertical-align: middle;
}
</style>
