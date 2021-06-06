export const _forceInteger = {
  methods: {
    forceInteger (event) {
      event = (event) || window.event;
      const code = (event.which) ? event.which : event.keyCode;

      if (code === 46) {
        event.preventDefault();
      }
    }
  }
};
