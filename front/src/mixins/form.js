import { globalLoading } from "../utils/events";

export default {
  data() {
    return {
      loading: false
    };
  },
  methods: {
    updateLoading(loading) {
      this.loading = loading;
      globalLoading(loading);
    }
  }
};
