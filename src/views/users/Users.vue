<template>
  <CRow>
    <CCol col="12" xl="8">
      <CCard>
        <CCardHeader>
          <CRow>
            <CCol>
              Users
            </CCol>
            <CCol sm="3" class="text-right">
              <CButton class="px-3" color="success" @click="goAddUser">Add User</CButton>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CDataTable
            hover
            striped
            :items="items"
            :fields="fields"
            :items-per-page="5"
            clickable-rows
            :active-page="activePage"
            @row-clicked="rowClicked"
            :pagination="{ doubleArrows: false, align: 'center'}"
            @page-change="pageChange"
          >
            <template #profileImage="data">
              <td>
                <img :src="data.item.profileImage" height="30px" />
              </td>
            </template>
            <template #status="data">
              <td>
                <CBadge :color="getBadge(data.item.status)">
                  {{data.item.status}}
                </CBadge>
              </td>
            </template>
          </CDataTable>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import { db, auth } from './../../firebase.js'
export default {
  name: 'Users',
  data () {
    return {
      items: [],
      fields: [
        { key: 'profileImage', label: 'Avatar'},
        { key: 'username', label: 'Name', _classes: 'font-weight-bold' },
        { key: 'country' },
        { key: 'email' },
        { key: 'gender' },
        { key: 'phone'}
      ],
      activePage: 1,
      currentUser: {}
    }
  },
  async created() {
    await this.getCurrentUser()
    let dbRef
    if (this.currentUser.userrole == "admin") {
      dbRef = db.collection('users')
    } else {
      dbRef = db.collection('users')
        .where('uid', '==', auth.currentUser.uid)
    }

    dbRef.get()
      .then(querySnapshot => {
        this.items = []
        querySnapshot.docs.map((doc) => {
          this.items.push({
            key: doc.id,
            username: doc.data().username,
            country: doc.data().country,
            email: doc.data().email,
            gender: doc.data().gender,
            phone: doc.data().mobilenumber,
            profileImage: doc.data().profileImage,
          })
        })
      console.log(this.items);
    })
  },
  watch: {
    $route: {
      immediate: true,
      handler (route) {
        if (route.query && route.query.page) {
          this.activePage = Number(route.query.page)
        }
      }
    }
  },
  methods: {
    async getCurrentUser() {
      console.log("++++++++++++1", auth.currentUser.uid)
      const query = db.collection('users').doc(auth.currentUser.uid)
      await query.get()
        .then((doc) => {
          console.log("+++++++++++2", doc.data())
          this.currentUser = doc.data()
        })

      console.log("++++++++++3", this.currentUser)
    },
    goAddUser() {
      this.$router.push({path: '/user/add'})
    },
    getBadge (status) {
      switch (status) {
        case 'Active': return 'success'
        case 'Inactive': return 'secondary'
        case 'Pending': return 'warning'
        case 'Banned': return 'danger'
        default: 'primary'
      }
    },
    rowClicked (item, index) {
      this.$router.push({path: `users/${item.key}`})
    },
    pageChange (val) {
      this.$router.push({ query: { page: val }})
    }
  }
}
</script>
