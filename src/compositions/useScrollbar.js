import { ref } from '@vue/composition-api';
import PerfectScrollbar from 'perfect-scrollbar';

export default () => {
  const ps = ref(null);

  function scrollInit (container) {
    ps.value = new PerfectScrollbar(container);
  }

  function scrollUpdate () {
    if (ps) {
      ps.value.update();
    }
  }

  return {
    ps,
    scrollInit,
    scrollUpdate
  };
};
