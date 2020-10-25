<template>
  <div>
    <CRow>
      <CCol lg="12">
        <CTableWrapper :items="getShuffledChrisvenuesData()" :fields="fields">
          <template #header>
            <CRow>
              <CCol>
                <CIcon name="cil-bank"/> Venues List
              </CCol>
              <CCol sm="3" class="text-right">
                <CButton class="px-3" color="success" @click="goAddChrisvenue">Add Venue</CButton>
              </CCol>
            </CRow>
          </template>
        </CTableWrapper>
      </CCol>
    </CRow>
  </div>
</template>

<script>
  import { db, auth } from './../../firebase.js'
  import CTableWrapper from './Table.vue'

  export default {
    name: 'Chrisvenue',
    components: {
      CTableWrapper
    },
    data() {
      return {
        Chrisvenues: [],
        fields:  ['name', 'area', 'city', 'country', 'address1', 'email', 'action']
      }
    },
    async created() {
      await this.getCurrentUser()

      let dbRef
      if (this.currentUser.userrole == "admin") {
        dbRef = db.collection('chrisvenues')
      } else {
        dbRef = db.collection('chrisvenues')
          .where('owner', '==', auth.currentUser.uid)
      }

      dbRef.get()
        .then(querySnapshot => {
          this.Chrisvenues = []
          querySnapshot.docs.map((doc) => {
            this.Chrisvenues.push({
              key: doc.id,
              name: doc.data().name,
              area: doc.data().area,
              city: doc.data().city,
              country: doc.data().country,
              address1: doc.data().address1,
              email: doc.data().email,
            })
          })
        })
    },
    methods: {
      async getCurrentUser() {
        const query = db.collection('users').doc(auth.currentUser.uid)
        await query.get()
          .then((doc) => {
            this.currentUser = doc.data()
          })
      },
      shuffleArray (array) {
        for (let i = array.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1))
          let temp = array[i]
          array[i] = array[j]
          array[j] = temp
        }
        return array
      },
      getShuffledChrisvenuesData () {
        return this.shuffleArray(this.Chrisvenues.slice(0))
      },
      goAddChrisvenue() {
        this.$router.push({path: '/chrisvenue/add'})
      },
    }
  }
</script>
