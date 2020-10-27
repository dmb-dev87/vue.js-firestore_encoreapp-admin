<template>
  <CSidebar 
    fixed 
    :minimize="minimize"
    :show="show"
    @update:show="(value) => $store.commit('set', ['sidebarShow', value])"
  >
    <CSidebarBrand class="d-md-down-none" to="/">
      <img src="https://encoreapp.net/img/logo-light.png" alt="Encore Loyalty APP logo" width="80%">
    </CSidebarBrand>

    <!--<CSidebarNavTitle>{{venueTitle}}</CSidebarNavTitle>-->

    <template v-if="currentUser.userrole==='admin'">
      <CRenderFunction flat :content-to-render="$options.admin_nav"/>
    </template>
    <template v-else>
      <CRenderFunction flat :content-to-render="$options.nav"/>
    </template>

    <CButton size="lg" color="danger" block @click="signout">Log out</CButton>
    <CSidebarMinimizer
      class="d-md-down-none"
      @click.native="$store.commit('set', ['sidebarMinimize', !minimize])"
    />
  </CSidebar>
</template>

<script>
import nav from './_nav'
import admin_nav from './_admin_nav'
import firebase from 'firebase'
import { db, auth } from './../firebase.js'

export default {
  name: 'TheSidebar',
  nav,
  admin_nav,
  data() {
    return {
      currentUser: {

      }
    }
  },
  computed: {
    show () {
      return this.$store.state.sidebarShow 
    },
    minimize () {
      return this.$store.state.sidebarMinimize 
    },
    venueTitle: {
      get () {
        return this.$store.state.venueTitle
      },
      set (title) {
        this.$store.commit('set', ['venueTitle', title])
      }
    }
  },
  async created () {
    await this.getCurrentUser()

    if (this.currentUser.userrole == "admin") {
      this.venueTitle ="Admin Manager"
    } else {
      this.venueTitle="Venue Owner"
    }
  },
  methods: {
    async getCurrentUser() {
      const query = db.collection('users').doc(auth.currentUser.uid)
      await query.get()
        .then((doc) => {
          this.currentUser = doc.data()
        })
    },
    signout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({
            name: "Login"
          })
        })
    }
  }
}
</script>
