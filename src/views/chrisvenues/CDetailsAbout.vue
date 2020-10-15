<template>
  <CRow>
    <CCol md="12">
      <CCard>
        <CCardBody>
          <CForm>
            <CSelect
              label="Category:"
              size="md"
              horizontal
              :value.sync="selectedOption"
              :options="selectOptions"
            />
            <CRow>
              <CCol sm="3" class="col-form-label" tag="label">
                Is this a branch:
              </CCol>
              <CCol sm="3">
                <CSwitch
                  class="mr-1"
                  color="dark"
                  :checked="true"
                  shape="pill"
                  variant="opposite"
                />
                <strong>
                  Click if branch
                </strong>
              </CCol>
              <CCol sm="6">
                <CInput
                  placeholder="Type group name if this is a branch"
                  horizontal
                  autocomplete="name"
                  :value="chrisvenue.category_name"
                  v-model="chrisvenue.category_name"
                />
              </CCol>
            </CRow>
            <CInput
              label="Teaser line:"
              placeholder="Type your short teaser line here"
              horizontal
              :value="chrisvenue.teaserline"
              v-model="chrisvenue.teaserline"
            />
            <CTextarea
              label="About the business:"
              placeholder="Tell us a little bit about your business"
              horizontal
              rows="2"
              :value="chrisvenue.about"
              v-model="chrisvenue.about"
            />
            <hr class="mt-1 mb-3">
            <CInput
              label="Location:"
              placeholder="Location"
              horizontal
              autocomplete="location"
              :value="chrisvenue.geolocation.Latitude"
              v-model="chrisvenue.geolocation.Latitude"
            />
            <hr class="mt-1 mb-3">
            <CTextarea
              label="The opening hours:"
              placeholder="Put the opening hours here"
              horizontal
              rows="2"
              :value="chrisvenue.openinghours"
              v-model="chrisvenue.openinghours"
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
  name: 'CDetailsAbout',
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
