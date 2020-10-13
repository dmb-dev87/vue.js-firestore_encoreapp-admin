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
                <p class="login-box-msg">Sign in to Encore online admin</p>
                <CInput
                  v-model.trim="loginForm.email"
                  placeholder="Email"
                  type="email"
                  autocomplete="email"
                >
                  <template #append-content><CIcon name="cil-envelope-closed"/></template>
                </CInput>
                <CInput
                  v-model.trim="loginForm.password"
                  placeholder="Password"
                  type="password"
                  autocomplete="current-password"
                >
                  <template #append-content><CIcon name="cil-lock-locked"/></template>
                </CInput>
                <CRow>
                  <CCol col="6" class="icheck-primary">
                    <CInputCheckbox
                      :label="`Remember Me`"
                    />
                  </CCol>
                  <CCol col="6" class="text-right">
                    <CButton color="primary" class="px-4" @click="login()">Sign In</CButton>
                  </CCol>                  
                </CRow>
                <CRow>
                  <CCol>
                    <p class="mb-1">
                      <CLink
                        href="/resetpassword"
                      >
                        I forgot my password
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
                        I don't have a login - Register
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
  name: 'Login',
  data() {
    return {
      loginForm: {
        email: '',
        password: '',
      }
    }
  },
  methods: {
    login() {
      console.log("email " + this.loginForm.email);
      this.$store.dispatch('login', {
        email: this.loginForm.email,
        password: this.loginForm.password
      })
    }
  },
}
</script>
