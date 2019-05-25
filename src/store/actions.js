const actions = {
  setNum({ commit }, query) {
    commit('set', { key: 'num', value: query });
  },
  addPoint(context, query) {
    let newArray = context.state['points'].slice();
    newArray.push(query);
    context.commit('set', { key: 'points', value: newArray });
  },
  deletePoint(context, query) {
    let newArray = context.state['points'].slice();
    newArray.splice(query, 1);
    context.commit('set', { key: 'points', value: newArray });
  }
};

export default actions;
