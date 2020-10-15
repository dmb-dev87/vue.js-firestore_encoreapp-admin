<template>
  <div>
    <CRow>
      <CCol lg="12">
        <CategoryTable :items="getShuffledCategriesData()" :fields="fields">
          <template #header>
            <CIcon name="cil-bank"/> Category List
          </template>
        </CategoryTable>
      </CCol>
    </CRow>
  </div>
</template>

<script>
  import * as Categories from './index.js'
  import { db } from './../../firebase.js'
  import CategoryTable from './CategoryTable.vue'

  export default {
    name: 'CategoryList',
    components: {
      ...Categories,
      CategoryTable
    },
    data() {
      return {
        categories: Array,
        fields:  ['id', 'name', 'image', 'action']
      }
    },
    created() {
      let dbRef = db.collection('category').onSnapshot((snapshotChange) => {
        this.categories = []
        snapshotChange.forEach((doc) => {
          this.categories.push({
            key: doc.id,
            id: doc.data().category_id,
            name: doc.data().category_name,
            image: doc.data().category_image,
          })
        })
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

      getShuffledCategriesData () {
        return this.shuffleArray(this.categories.slice(0))
      }
    }
  }
</script>
