<template>
  <CRow>
    <CCol md="12">
      <CCard>
        <CCardBody>
          <CForm>
            <CSelect
              label="Be a 'Featured venue':"
              size="md"
              horizontal
              :value.sync="selectedOption"
              :options="selectOptions"
              placeholder="-"
            />
            <hr class="mt-1 mb-3">
            <CSelect
              label="QR code or PIN code:"
              size="md"
              horizontal
              :value.sync="selectedOption"
              :options="selectOptions"
              placeholder="-"
            />
            <hr class="mt-1 mb-3">
            <CSelect
              label="Activate Encore points:"
              size="md"
              horizontal
              :value.sync="selectedOption"
              :options="selectOptions"
              placeholder="-"
            />
            <hr class="mt-1 mb-3">
            <CSelect
              label="Minimum purchase:"
              size="md"
              horizontal
              :value.sync="selectedOption"
              :options="selectOptions"
              placeholder="-"
            />
            <CInput
              label="Black-out dates:"
              placeholder="Set the dates where the program will not apply, if any. Format: DD/MM e.g. 24/12"
              horizontal
            />
            <CTextarea
              label="Terms:"
              placeholder="State any terms regarding the dicount."
              horizontal
              rows="2"
            />
            <hr class="mt-1 mb-3">
            <CRow>
              <CCol sm="3" class="col-form-label" tag="label">
                Alcohol:
              </CCol>
              <CCol sm="9">
                <CInputCheckbox
                />
                <strong class="ml-4">
                  Is alcohol served? (if applicable)
                </strong>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="3" class="col-form-label" tag="label">
                Family friendly:
              </CCol>
              <CCol sm="9">
                <CInputCheckbox
                />
                <strong class="ml-4">
                  Is the venue family/kids friendly? (if applicable)
                </strong>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="3" class="col-form-label" tag="label">
                Handicap:
              </CCol>
              <CCol sm="9">
                <CInputCheckbox
                />
                <strong class="ml-4">
                  Is the venue handicap accessible/friendly? (if applicable)
                </strong>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="3" class="col-form-label" tag="label">
                Wifi:
              </CCol>
              <CCol sm="9">
                <CInputCheckbox
                />
                <strong class="ml-4">
                  Wifi available? (if applicable)
                </strong>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="3" class="col-form-label" tag="label">
                Vegan:
              </CCol>
              <CCol sm="9">
                <CInputCheckbox
                />
                <strong class="ml-4">
                  Vegan options available? (if applicable)
                </strong>
              </CCol>
            </CRow>
            <hr class="mt-1 mb-3">
          </CForm>
          <CRow class="mt-3">
            <CCol sm="3" />
            <CCol sm="9">
              <CButton class="px-4" type="submit" color="danger"><CIcon name="cil-check-circle"/> Save settings</CButton>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>

  export default {
    name: 'MainSettings',
  }
</script>
