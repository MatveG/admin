<script>
import useDialogs from '@/compositions/useDialogs';

export default {
  name: 'EditForm',
  validations: {},
  data () {
    return {
      saveTimer: null
    };
  },
  created () {
    if (!this.save) {
      console.error('Save method should be implemented in the inheriting component');
    }
  },
  methods: {
    changed () {
      if (this.propId) {
        clearTimeout(this.saveTimer);
        this.saveTimer = setTimeout(this.save, 2000);
      }
      this.isSaved = false;
    },

    submit () {
      clearTimeout(this.saveTimer);

      this.$v.$touch();

      if (this.$v.$invalid) {
        return this.fireToast('Заполните обязательные поля');
      }
      this.save();
    }
  },
  setup () {
    return {
      ...useDialogs()
    };
  }
};
</script>
