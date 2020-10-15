<template>
  <CRow>
    <CCol col="12" xl="8">
      <CCard>
        <CCardHeader>
          Users
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
import { db } from './../../firebase.js'
export default {
  name: 'Users',
  data () {
    return {
      items: [],
      fields: [
        { key: 'username', label: 'Name', _classes: 'font-weight-bold' },
        { key: 'country' },
        { key: 'email' },
        { key: 'gender' },
        { key: 'phone'}
      ],
      activePage: 1
    }
  },
  created() {
    let dbRef = db.collection('users').onSnapshot((snapshotChange) => {
      this.items = []
      snapshotChange.forEach((doc) => {
        this.items.push({
          key: doc.id,
          username: doc.data().username,
          country: doc.data().country,
          email: doc.data().email,
          gender: doc.data().gender,
          phone: doc.data().mobilenumber,
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
