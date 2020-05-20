import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const type = {
  SET_HAS_AUTHORIZATION: 'SET_HAS_AUTHORIZATION',
  SET_USER : 'SET_USER',
  REMOVE_AUTHORIZATION: 'REMOVE_AUTHORIZATION',
}
const state = {
  isAuthorization: false,
  user: {},
};
const getters = {
  isAuthorization: state => state.isAuthorization,
  user: state => state.user
}
const mutations = {
  [type.SET_HAS_AUTHORIZATION]( state, payload ){
    state.isAuthorization = payload ? payload : false;
  },
  [type.SET_USER]( state, payload ){
    state.user = payload ? payload : {};
  },
  [type.REMOVE_AUTHORIZATION]( state ) {
    state.isAuthorization =  false;
    state.user = null;
  },
};
const actions = {
  setHasAuthority( context, hasToken ) {
    context.commit( type.SET_HAS_AUTHORIZATION, hasToken );
  },
  setItem( context, item ) {
    context.commit( type.SET_USER, item );
  },
  clearAuthority( context ) {
    context.commit( type.REMOVE_AUTHORIZATION );
  },
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
})
