<template>
  <div class="c-app flex-row align-items-center">
    <CContainer fluid>
      <CRow class="justify-content-center">
        <CCol md="4">
          <div class="login-logo">
            <img alt="Encore Loyalty APP logo" src="https://encoreapp.net/img/logo-dark.png" width="300">
          </div>
          <CCard class="p-4">
            <CCardBody>
              <CForm>
                <p class="login-box-msg">You forgot your password? Here you can easily retrieve a new password.</p>
                <CInput
                  v-model.trim="email"
                  placeholder="Email"
                  type="email"
                  autocomplete="email"
                >
                  <template #append-content><CIcon name="cil-envelope-closed"/></template>
                </CInput>
                <CRow>
                  <CCol col="12" class="text-center">
                    <CButton color="primary" block @click="resetPassword()">Request new password</CButton>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol>
                    <p class="mt-3 mb-2">
                      <CLink
                        href="/login"
                      >
                        Login
                      </CLink>
                    </p>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol>
                    <p class="mb-0">
                      <CLink
                        href="/register"
                      >
                        Register
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
    name: 'ResetPassword',
    data() {
      return {
        email: '',
      }
    },
    methods: {
      async resetPassword() {
        console.log('email' + this.email)
        this.errorMsg = ''

        try {
          await auth.sendPasswordResetEmail(this.email)
          this.showSuccess = true
        } catch (err) {
          this.errorMsg = err.message
        }
      }
    },
  }
</script>
