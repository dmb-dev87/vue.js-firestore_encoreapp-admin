<template>
  <div>
    <CRow>
      <CCol lg="12">
        <SliderTable :items="getShuffledSlidersData()" :fields="fields">
          <template #header>
            <CRow>
              <CCol>
                <CIcon name="cil-bank"/> Slider List
              </CCol>
              <CCol sm="3" class="text-right">
                <CButton class="px-3" color="success" @click="goAddSlider">Add Slider</CButton>
              </CCol>
            </CRow>
          </template>
        </SliderTable>
      </CCol>
    </CRow>
  </div>
</template>

<script>
  import * as Sliders from './index.js'
  import { db, auth } from './../../firebase.js'
  import SliderTable from './SliderTable.vue'

  export default {
    name: 'SliderList',
    components: {
      ...Sliders,
      SliderTable
    },
    data() {
      return {
        sliders: Array,
        fields:  ['image', 'url', 'action']
      }
    },
    async created() {
      await this.getCurrentUser()

      let dbRef
      if (this.currentUser.userrole == "admin") {
        dbRef = db.collection('slider')
      } else {
        this.sliders = []
        return
      }

      dbRef.get()
        .then(querySnapshot => {
          this.sliders = []
          querySnapshot.docs.map((doc) => {
            this.sliders.push({
              key: doc.id,
              image: doc.data().slider_images,
              url: doc.data().slider_images,
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

      getShuffledSlidersData () {
        return this.shuffleArray(this.sliders.slice(0))
      },
      goAddSlider() {
        this.$router.push({path: '/slider/add'})
      },
    }
  }
</script>
