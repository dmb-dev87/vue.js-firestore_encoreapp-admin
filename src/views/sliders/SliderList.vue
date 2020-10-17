<template>
  <div>
    <CRow>
      <CCol lg="12">
        <SliderTable :items="getShuffledSlidersData()" :fields="fields">
          <template #header>
            <CIcon name="cil-bank"/> Slider List
          </template>
        </SliderTable>
      </CCol>
    </CRow>
  </div>
</template>

<script>
  import * as Sliders from './index.js'
  import { db } from './../../firebase.js'
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
    created() {
      let dbRef = db.collection('slider').onSnapshot((snapshotChange) => {
        this.sliders = []
        snapshotChange.forEach((doc) => {
          this.sliders.push({
            key: doc.id,
            image: doc.data().slider_images,
            url: doc.data().slider_images,
          })
        })
        console.log(this.sliders);
      })
    },
    methods: {
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
      }
    }
  }
</script>
