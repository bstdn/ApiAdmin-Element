const mixin = {
  data() {
    return {
      list: [],
      total: 0,
      listLoading: false,
      dialogStatus: '',
      dialogFormVisible: false,
      dialogSubmitLoading: false,
      pagination: {
        page: 1,
        size: 10
      }
    }
  },
  methods: {
    formClose() {
      this.dialogFormVisible = false
    }
  }
}

export default mixin
