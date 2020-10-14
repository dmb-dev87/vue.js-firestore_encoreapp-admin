<template>
  <CRow>
    <CCol md="12">
      <CCard>
        <CCardBody>
          <CForm>
            <CSelect
              label="Bronze level discount:"
              size="md"
              horizontal
              :value.sync="selectedOption"
              :options="selectOptions"
            />
            <CSelect
              label="Silver level discount: (must be higher than Bronze %)"
              size="md"
              horizontal
              :value.sync="selectedOption"
              :options="selectOptions"
            />
            <CSelect
              label="Gold level discount: (must be higher than Silver %)"
              size="md"
              horizontal
              :value.sync="selectedOption"
              :options="selectOptions"
            />
            <CSelect
              label="Platinum level discount: (must be higher than Gold %)"
              size="md"
              horizontal
              :value.sync="selectedOption"
              :options="selectOptions"
            />
            <hr class="mt-1 mb-3">
            <CSelect
              label="Bonus 'Kicker' discount:"
              size="md"
              horizontal
              :value.sync="selectedOption"
              :options="selectOptions"
            />
            <CSelect
              label="Bonus 'Kicker' discount:"
              size="md"
              horizontal
              :value.sync="selectedOption"
              :options="selectOptions"
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
    name: 'CDetailsDiscountLevels',
  }
</script>
