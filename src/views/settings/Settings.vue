<template>
  <div>
    <CCol xs="12" lg="12">
      <CCard>
        <CCardBody>
          <CTabs variant="pills">
            <CTab title="Settings" active>
              <MainSettings />
            </CTab>
            <CTab title="Change password">
              <ChangePassword />
            </CTab>
          </CTabs>
        </CCardBody>
      </CCard>
    </CCol>
  </div>
</template>

<script>
  import * as Settings from './index.js'

  export default {
    name: 'Settings',
    components: {
      ...Settings
    }
  }
</script>
