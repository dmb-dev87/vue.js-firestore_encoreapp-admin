<template>
  <div>
    <CCol xs="12" lg="12">
      <CCard>
        <CCardBody>
          <CTabs variant="pills">
            <CTab title="Name and address" active>
              <CDetailsNameAddress :chrisvenue="Chrisvenue" />
            </CTab>
            <CTab title="About">
              <CDetailsAbout :chrisvenue="Chrisvenue" />
            </CTab>
            <CTab title="Internet">
              <CDetailsInternet :chrisvenue="Chrisvenue" />
            </CTab>
            <CTab title="Gallery">
              <CDetailsGallery :chrisvenue="Chrisvenue" />
            </CTab>
            <CTab title="Discount levels">
              <CDetailsDiscountLevels :chrisvenue="Chrisvenue " />
            </CTab>
          </CTabs>
        </CCardBody>
      </CCard>
    </CCol>
  </div>
</template>

<script>
import * as Details from './index.js'
import { db } from '../../firebase.js'

export default {
  name: 'Details',
  components: {
    ...Details
  },
  data() {
    return {
      Chrisvenue: Object
    }
  },
  created() {
    console.log(this.$route.params.id);
    let dbRef = db.collection('chrisvenues').doc(this.$route.params.id);
    dbRef.get().then((doc) => {
      this.Chrisvenue = doc.data();
      console.log(doc.data());
    }).catch((error) => {
      console.log(error);
    })
  }
}
</script>
