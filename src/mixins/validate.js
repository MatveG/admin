export default {
  methods: {
    validate () {
      this.$v.$touch();

      if (this.$v.$invalid) {
        this.$buefy.toast.open({
          message: 'Заполните обязательные поля',
          type: 'is-warning'
        });
      }

      return !this.$v.$invalid;
    }
  }
}
