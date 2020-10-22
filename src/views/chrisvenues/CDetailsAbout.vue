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
              :value.sync="chrisvenue.category_name"
              :options="categories"
            />
            <CRow>
              <CCol sm="3" class="col-form-label" tag="label">
                Is this a branch:
              </CCol>
              <CCol sm="3">
                <CSwitch
                  class="mr-1"
                  color="success"
                  :checked="chrisvenue.isBranch"
                  shape="pill"
                  variant="opposite"
                  @click="update_isBranch($event)"
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
              :value="chrisvenue.geolocation"
              v-model="chrisvenue.geolocation"
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
    categories: []
  },
  methods: {
    update_isBranch: function(arg, event) {
      console.log("+++++++++++++", event.target.checked)
      this.$emit('update-isBranch', event.target.checked)
    }
  }
}

</script>
