import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from './firebase'
import router from './router/index'
import 'regenerator-runtime/runtime';

Vue.use(Vuex)

const state = {
  userProfile: {},
  sidebarShow: 'responsive',
  sidebarMinimize: false,
  venueTitle: "Admin Venue",
}

const mutations = {
  toggleSidebarDesktop (state) {
    const sidebarOpened = [true, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarOpened ? false : 'responsive'
  },
  toggleSidebarMobile (state) {
    const sidebarClosed = [false, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarClosed ? true : 'responsive'
  },
  set (state, [variable, value]) {
    state[variable] = value
  },
  setUserProfile(state, val) {
    state.userProfile = val
  },
}

const actions = {
  async login({ dispatch }, form) {
    // sign user in
    await fb.auth.signInWithEmailAndPassword(form.email, form.password)
      .then((userResponse) => {
        this.dispatch('fetchUserProfile', userResponse.user)
      })
      .catch((err) => {
        window.alert(err.message)
      })
  },
  async fetchUserProfile({ commit }, user) {
    // fetch user profile
    const userProfile = await fb.usersCollection.doc(user.uid).get()

    // set user profile in state
    commit('setUserProfile', userProfile.data())

    // change route to dashboard
    router.push('/')
  },
  async signup({ dispatch }, form) {
    // sign user up
    await fb.auth.createUserWithEmailAndPassword(form.email, form.password)
      .then((userResponse) => {
        const { user } = userResponse.user

        // create user profile object in userCollections
        fb.usersCollection.doc(user.uid).set({
          uid: user.uid,
          email: form.email,
          username: form.contactName,
          mobilenumber: form.phoneNumber,
        })

        // fetch user profile and set in state
        dispatch('fetchUserProfile', user)
      })
      .catch((err) => {
        window.alert(err.message)
      })
  },
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})