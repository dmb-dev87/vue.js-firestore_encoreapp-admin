<template>
  <div class="d-flex align-items-center min-vh-100">
    <CContainer fluid>
      <CRow class="justify-content-center">
        <CCol md="4">
          <div class="login-logo">
            <img alt="Encore Loyalty APP logo" src="https://encoreapp.net/img/logo-dark.png" width="300">
          </div>
          <CCard class="mx-4 mb-0">
            <CCardBody class="p-4">
              <CForm>
                <p class="login-box-msg">Register your business and you are one step closer to more sales and more customers.</p>
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
                <VuePhoneNumberInput
                  default-country-code="AE"
                  v-model.trim="signupForm.phoneNumber"
                />
                <CInput
                  v-model.trim="signupForm.password"
                  placeholder="Password"
                  type="password"
                  class="mt-3 mb-4"
                >
                  <template #append-content><CIcon name="cil-lock-locked"/></template>
                </CInput>
                <CRow>
                  <CCol col="9" class="icheck-primary">
                    <input
                      type="checkbox"
                      :checked="termsAndCond"
                      @click="updateTermsAndCond"
                    />
                    <CLink @click="showModal">
                      I agree to the Encore T & C's
                    </CLink>
                  </CCol>
                  <CCol col="3" class="text-right">
                    <CButton color="primary" @click="signup()">Register</CButton>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol>
                    <p class="mt-2">
                      Already have an account?
                      <CLink
                        href="/login"
                      >
                        Login here.
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
    <CModal
      title="Encoreapp Terms & Conditions"
      :show.sync="myModal"
      size="xl"
      color="primary"
    >
      <TermsAndConditions />
    </CModal>
  </div>
</template>

<script>
import VuePhoneNumberInput from "vue-phone-number-input"
import TermsAndConditions from "../modalpages/TermsAndConditions"

export default {
  name: 'Register',
  components: {
    VuePhoneNumberInput,
    TermsAndConditions,
  },
  data() {
    return {
      signupForm: {
        contactName: '',
        email: '',
        phoneNumber: '',
        password: ''
      },
      myModal: false,
      termsAndCond: false,
    }
  },
  methods: {
    signup() {
      if (this.termsAndCond === false) {
        window.alert("You have to agree the terms and conditions.")
        return
      }

      this.$store.dispatch('signup', {
        contactName: this.signupForm.contactName,
        email: this.signupForm.email,
        phoneNumber: this.signupForm.phoneNumber,
        password: this.signupForm.password
      })
    },
    showModal() {
      this.myModal = true
    },
    updateTermsAndCond(event) {
      this.termsAndCond = event.target.checked
    }
  }
}
</script>
