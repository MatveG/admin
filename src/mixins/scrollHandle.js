import PerfectScrollbar from 'perfect-scrollbar'

export default {
  methods: {
    scrollInit (container) {
      this.ps = new PerfectScrollbar(container)
    },
    scrollUpdate () {
      if (this.ps) {
        this.ps.update()
      }
    }
  }
}
