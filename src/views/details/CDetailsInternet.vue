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
            />
            <CInput
              label="Website:"
              placeholder="Website"
              horizontal
            />
            <CInput
              label="Facebook URL:"
              placeholder="Type Facebook URL"
              horizontal
            />
            <CInput
              label="Instagram URL:"
              placeholder="Type Instagram URL"
              horizontal
            />
            <CInput
              label="YouTube URL:"
              placeholder="Type YouTube URL"
              horizontal
            />
            <CInput
              label="Twitter URL:"
              placeholder="Type Twitter URL"
              horizontal
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
    name: 'CDetailsInternet',
  }
</script>
