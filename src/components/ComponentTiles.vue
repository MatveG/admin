<script>
export default {
  name: 'ComponentTiles',
  props: {
    maxPerRow: {
      type: Number,
      default: 5
    }
  },
  render (createElement) {
    if (this.$slots.default.length <= this.maxPerRow) {
      return this.renderAncestor(createElement, this.$slots.default);
    }

    return createElement(
      'div',
      { attrs: { 'class': 'is-tiles-wrapper' } },
      chunkSlots(this.$slots.default, this.maxPerRow).map((group) => {
        return this.renderAncestor(createElement, group);
      }
      )
    );
  },
  methods: {
    renderAncestor (createElement, elements) {
      return createElement(
        'div',
        { attrs: { 'class': 'tile is-ancestor' } },
        elements.map((element) => {
          return createElement('div', { attrs: { 'class': 'tile is-parent' } }, [element]);
        })
      );
    }
  }
};

function chunkSlots (arr, chunkSize = 1, cache = []) {
  const tmp = [...arr];

  if (chunkSize <= 0) {
    return cache;
  }

  while (tmp.length) {
    cache.push(tmp.splice(0, chunkSize));
  }

  return cache;
}
</script>
