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

    <CRenderFunction flat :content-to-render="$options.nav"/>
    <CButton size="lg" color="danger" block @click="signout">Log out</CButton>
    <CSidebarMinimizer
      class="d-md-down-none"
      @click.native="$store.commit('set', ['sidebarMinimize', !minimize])"
    />
  </CSidebar>
</template>

<script>
import nav from './_nav'
import firebase from 'firebase'

export default {
  name: 'TheSidebar',
  nav,
  data() {
    return {
      venueTitle: "Venue Admin",
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
  },
  async created () {
    await this.getCurrentUser()

    if (this.currentUser.userrole == "admin") {
      this.venueTitle ="Venue Admin"
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
