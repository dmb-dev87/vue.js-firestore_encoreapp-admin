<template>
  <div>
    <CCol xs="12" lg="12">
      <CCard>
        <CCardBody>
          <CTabs variant="pills">
            <CTab title="Name and address" active>
              <CDetailsNameAddress />
            </CTab>
            <CTab title="About">
              <CDetailsAbout />
            </CTab>
            <CTab title="Internet">
              <CDetailsInternet />
            </CTab>
            <CTab title="Gallery">
              <CDetailsGallery />
            </CTab>
            <CTab title="Discount levels">
              <CDetailsDiscountLevels />
            </CTab>
          </CTabs>
        </CCardBody>
      </CCard>
    </CCol>
  </div>
</template>

<script>
import * as Details from './index.js'
export default {
  name: 'Details',
  components: {
    ...Details
  }
}
</script>
