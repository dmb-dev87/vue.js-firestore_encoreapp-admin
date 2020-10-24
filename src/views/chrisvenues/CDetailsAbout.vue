<template>
  <CRow>
    <CCol md="12">
      <CCard>
        <CCardBody>
          <CForm>
            <CSelect
              label="*Category:"
              size="md"
              horizontal
              :value.sync="chrisvenue.category_name"
              :options="categories"
            />
            <CRow>
              <CCol sm="3" class="col-form-label" tag="label">
                Is this a branch:
              </CCol>
              <CCol sm="3">
                <CSwitch
                  type="checkbox"
                  class="mr-1"
                  color="success"
                  :checked="chrisvenue.isBranch"
                  shape="pill"
                  variant="opposite"
                  :checked.sync="chrisvenue.isBranch"
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
                  :value="chrisvenue.branchgroupid"
                  v-model="chrisvenue.branchgroupid"
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
              label="*About the business:"
              placeholder="Tell us a little bit about your business"
              horizontal
              rows="2"
              :value="chrisvenue.about"
              v-model="chrisvenue.about"
            />
            <hr class="mt-1 mb-3">
            <CRow>
              <CCol sm="3" class="col-form-label" tag="label">
                *Location:
              </CCol>
              <CCol sm="4">
                <CInput
                  label="Latitude:"
                  placeholder="Latitude"
                  horizontal
                  type="number"
                  :value="location.latitude"
                  v-model="location.latitude"
                />
              </CCol>
              <CCol sm="4">
                <CInput
                  label="Longitude:"
                  placeholder="Longitude"
                  horizontal
                  type="number"
                  :value="location.longitude"
                  v-model="location.longitude"
                />
              </CCol>
            </CRow>
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
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
export default {
  name: 'CDetailsAbout',
  props: {
    chrisvenue: Object,
    categories: [],
    location: {

    }
  },
  data() {
    return {
    }
  },
  mounted() {
    this.geolocate()
  },
  methods: {

  }
}

</script>
