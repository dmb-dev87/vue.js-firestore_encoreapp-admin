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
                />
              </CCol>
            </CRow>
            <CInput
              label="Teaser line:"
              placeholder="Type your short teaser line here"
              horizontal
            />
            <CTextarea
              label="About the business:"
              placeholder="Tell us a little bit about your business"
              horizontal
              rows="2"
            />
            <hr class="mt-1 mb-3">
            <CInput
              label="Location:"
              placeholder="Location"
              horizontal
              autocomplete="location"
            />
            <hr class="mt-1 mb-3">
            <CTextarea
              label="The opening hours:"
              placeholder="Put the opening hours here"
              horizontal
              rows="2"
            />
          </CForm>
          <CRow>
            <CCol sm="3" />
            <CCol sm="9">
              <CButton class="px-4" type="submit" color="danger"><CIcon name="cil-check-circle"/> Save and go to next</CButton>
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
  }
</script>
