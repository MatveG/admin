<script>
export default {
  name: 'EditView',
  data () {
    return {
      mounted: false,
      loading: false,
      saved: true,
      timers: {}
    }
  },
  validations: {},
  mounted () {
    this.mounted = true;
  },
  methods: {
    dataChanged (timerMethod) {
      this.setDraftState();

      if (this.propId) {
        this.resetSaveTimer(timerMethod);
      }
    },

    async saveData (saveHandler) {
      this.$v.$touch();

      if (this.$v.$invalid) {
        this.$buefy.toast.open({
          message: 'Заполните обязательные поля',
          type: 'is-warning',
          queue: true
        });
      } else {
        this.resetSaveTimer().setLoadingState();
        await saveHandler();
        this.setSavedState();
      }
      return this;
    },

    setDraftState () {
      this.saved = false;
      return this;
    },

    setLoadingState () {
      this.saved = false;
      this.loading = true;
      return this;
    },

    setSavedState () {
      this.saved = true;
      this.loading = false;
      return this;
    },

    resetSaveTimer (timeoutHandler) {
      this.clearSaveTimer();
      this.timers.save = setTimeout(timeoutHandler, 2000);
      return this;
    },

    clearSaveTimer () {
      clearTimeout(this.timers.save);
      return this;
    }
  }
}
</script>
