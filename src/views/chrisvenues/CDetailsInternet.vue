<template>
  <CRow>
    <CCol md="12">
      <CCard>
        <CCardBody>
          <CForm>
            <CInput
              label="Email:"
              placeholder="Email"
              horizontal
              :value="chrisvenue.email"
              v-model="chrisvenue.email"
            />
            <CInput
              label="Website:"
              placeholder="Website"
              horizontal
              :value="chrisvenue.website"
              v-model="chrisvenue.website"
            />
            <CInput
              label="Facebook URL:"
              placeholder="Type Facebook URL"
              horizontal
              :value="chrisvenue.facebookurl"
              v-model="chrisvenue.facebookurl"
            />
            <CInput
              label="Instagram URL:"
              placeholder="Type Instagram URL"
              horizontal
              :value="chrisvenue.instagramurl"
              v-model="chrisvenue.instagramurl"
            />
            <CInput
              label="YouTube URL:"
              placeholder="Type YouTube URL"
              horizontal
              :value="chrisvenue.youtubeurl"
              v-model="chrisvenue.youtubeurl"
            />
            <CInput
              label="Twitter URL:"
              placeholder="Type Twitter URL"
              horizontal
              :value="chrisvenue.twitterurl"
              v-model="chrisvenue.twitterurl"
            />
          </CForm>
          <CRow>
            <CCol sm="3" />
            <CCol sm="9">
              <CButton class="px-4" type="submit" color="danger" @click="updateChrisvenueData"><CIcon name="cil-check-circle"/> Save and go to next</CButton>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
export default {
  name: 'CDetailsInternet',
  props: {
    chrisvenue: Object
  },
  methods: {
    updateChrisvenueData() {
      let dbRef = db.collection('chrisvenues').doc(this.$route.params.id)
      dbRef.update(this.chrisvenue).then(() => {
        console.log("Chrisvenue successfully updated!")
      }).catch((error) =>{
        console.log(error)
      })
    }
  }
}
</script>
