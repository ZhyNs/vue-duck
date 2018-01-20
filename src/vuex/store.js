import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  backHomeNavShow: true
}

const mutations={
  backHomeNavShow(state, val) {
    state.backHomeNavShow = val;
  }
}

const actions = {

}

export default new Vuex.Store({
  state,
  mutations,
  actions
});