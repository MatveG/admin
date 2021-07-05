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
      if (this.$v) {
        this.$v.$touch();

        if (this.$v.$invalid) {
          return this.validationErrorMessage();
        }
      }

      this.resetSaveTimer().setLoadingState();
      await saveHandler();
      this.setSavedState();

      return this;
    },

    validationErrorMessage () {
      this.$buefy.toast.open({
        message: 'Заполните обязательные поля',
        type: 'is-warning',
        queue: true
      });
      return this;
    },

    resetSaveTimer (timeoutHandler) {
      clearTimeout(this.timers.save);
      this.timers.save = setTimeout(timeoutHandler, 2000);
      return this;
    },

    setDraftState () {
      clearTimeout(this.timers.save);
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
    }
  }
}
</script>
