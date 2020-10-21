<template>
  <CRow>
    <CCol md="12">
      <CCard>
        <CCardBody>
          <CForm>
            <CInput
              label="Old password"
              placeholder="Old password"
              horizontal
              type="password"
            />
            <CInput
              label="New password"
              placeholder="New password"
              horizontal
              type="password"
            />
            <CInput
              label="Repeat new password"
              placeholder="Repeat new password"
              horizontal
              type="password"
            />
          </CForm>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>

  export default {
    name: 'ChangePassword',
  }
</script>
