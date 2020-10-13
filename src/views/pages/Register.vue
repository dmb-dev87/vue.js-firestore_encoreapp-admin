<template>
  <div class="d-flex align-items-center min-vh-100">
    <CContainer fluid>
      <CRow class="justify-content-center">
        <CCol md="3">
          <div class="login-logo">
            <img alt="Encore Loyalty APP logo" src="https://encoreapp.net/img/logo-dark.png" width="300">
          </div>
          <CCard class="mx-4 mb-0">
            <CCardBody class="p-4">
              <CForm>
                <p class="login-box-msg">Register for the Encore online admin</p>
                <CInput
                  v-model.trim="signupForm.companyName"
                  placeholder="Company name"
                >
                  <template #append-content><CIcon name="cil-library-building"/></template>
                </CInput>
                <CInput
                  v-model.trim="signupForm.contactName"
                  placeholder="Contact name"
                >
                  <template #append-content><CIcon name="cil-user"/></template>
                </CInput>
                <CInput
                  v-model.trim="signupForm.email"
                  placeholder="Email"
                  type="email"
                  autocomplete="email"
                >
                  <template #append-content><CIcon name="cil-envelope-closed"/></template>
                </CInput>
                <CInput
                  v-model.trim="signupForm.phoneNumber"
                  placeholder="Phone Number"
                  type="number"
                >
                  <template #append-content><CIcon name="cil-phone"/></template>
                </CInput>
                <CInput
                  v-model.trim="signupForm.password"
                  placeholder="Password"
                  type="password"
                  class="mb-4"
                >
                  <template #append-content><CIcon name="cil-lock-locked"/></template>
                </CInput>
                <CRow>
                  <CCol col="6" class="icheck-primary">
                    <CInputCheckbox
                      :label="`I agree terms`"
                    />
                  </CCol>
                  <CCol col="6" class="text-right">
                    <CButton color="primary" class="px-4" @click="signup()">Register</CButton>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol>
                    <p class="mt-2">
                      <CLink
                        href="/login"
                      >
                        I registered already - login
                      </CLink>
                    </p>
                  </CCol>
                </CRow>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      signupForm: {
        companyName: '',
        contactName: '',
        email: '',
        phoneNumber: '',
        password: ''
      }
    }
  },
  methods: {
    signup() {
      this.$store.dispatch('signup', {
        companyName: this.signupForm.companyName,
        contactName: this.signupForm.contactName,
        email: this.signupForm.email,
        phoneNumber: this.signupForm.phoneNumber,
        password: this.signupForm.password
      })
    }
  }
}
</script>
