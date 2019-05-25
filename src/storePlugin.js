let store = {};

export default {
  store,
  install (Vue, options){
    Vue.prototype.$mainStore = store;
  }
}
