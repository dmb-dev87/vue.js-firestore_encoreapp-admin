<template>
  <CRow>
    <CCol md="12">
      <CCard>
        <CCardBody>
          <CForm>
            <CInput
              label="Business name:"
              placeholder="Business name"
              horizontal
              autocomplete="name"
            />
            <CInput
              label="Contact name:"
              placeholder="Contact name"
              horizontal
              autocomplete="name"
            />
            <CInput
              label="Contact person email:"
              placeholder="Contact person email"
              horizontal
              autocomplete="email"
            />
            <CInput
              label="Contact person phone:"
              placeholder="Contact person phone"
              horizontal
              autocomplete="number"
            />
            <hr class="mt-1 mb-3">
            <CInput
              label="Address:"
              placeholder="Address"
              horizontal
              autocomplete="address"
            />
            <CInput
              label="Address 2:"
              placeholder="Address"
              horizontal
              autocomplete="address"
            />
            <CInput
              label="Area:"
              placeholder="Area"
              horizontal
            />
            <CInput
              label="Zip code:"
              placeholder="Zip code"
              horizontal
            />
            <CInput
              label="City:"
              placeholder="City"
              horizontal
            />
            <CSelect
              label="Country:"
              size="md"
              horizontal
              :value.sync="selectedOption"
              :options="selectOptions"
              placeholder="Click to select country"
            />
            <CInput
              label="Phone, landline:"
              placeholder="Phone, landline"
              horizontal
            />
            <CInput
              label="Phone, mobile:"
              placeholder="Phone, mobile"
              horizontal
            />
            <CRow>
              <CCol sm="3">
              </CCol>
              <CCol sm="9">
                <CInputCheckbox
                />
                <strong class="ml-4">
                  I agree to the
                  <CLink>
                    terms and conditions
                  </CLink>
                </strong>
              </CCol>
            </CRow>
          </CForm>
          <CRow class="mt-3">
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
  name: 'CDetailsNameAddress',
}
</script>
