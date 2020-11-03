<template>
  <CRow>
    <CCol md="12">
      <CCard>
        <CCardBody>
          <CForm>
            <CInput
              label="*Business name:"
              placeholder="Business name"
              horizontal
              :value="chrisvenue.name"
              v-model="chrisvenue.name"
            />
            <CInput
              label="*Contact name:"
              placeholder="Contact name"
              horizontal
              :value="chrisvenue.contactperson"
              v-model="chrisvenue.contactperson"
            />
            <CInput
              label="Contact person email:"
              placeholder="Contact person email"
              horizontal
              autocomplete="email"
              :value="chrisvenue.contactpersonemail"
              v-model="chrisvenue.contactpersonemail"
            />
            <CRow class="mb-3">
              <CCol sm="3" class="col-form-label" tag="label">
                *Contact person phone:
              </CCol>
              <CCol sm="9">
                <VuePhoneNumberInput
                  default-country-code="AE"
                  v-model="chrisvenue.contactpersonphone"
                  :value="chrisvenue.contactpersonphone"
                />
              </CCol>
            </CRow>
            <hr class="mt-1 mb-3">
            <CInput
              label="Address:"
              placeholder="Address"
              horizontal
              autocomplete="address"
              :value="chrisvenue.address1"
              v-model="chrisvenue.address1"
            />
            <CInput
              label="Address 2:"
              placeholder="Address"
              horizontal
              autocomplete="address"
              :value="chrisvenue.address2"
              v-model="chrisvenue.address2"
            />
            <CInput
              label="Area:"
              placeholder="Area"
              horizontal
              :value="chrisvenue.area"
              v-model="chrisvenue.area"
            />
            <CInput
              label="Zip code:"
              placeholder="Zip code"
              horizontal
              :value="chrisvenue.zipcode"
              v-model="chrisvenue.zipcode"
            />
            <CInput
              label="*City:"
              placeholder="City"
              horizontal
              :value="chrisvenue.city"
              v-model="chrisvenue.city"
            />
            <CSelect
              label="*Country:"
              horizontal
              :value.sync="chrisvenue.country"
              v-model="chrisvenue.country"
              :options="countries"
              placeholder="Click to select country"
            />
            <CRow class="mb-3">
              <CCol sm="3" class="col-form-label" tag="label">
                *Phone, landline:
              </CCol>
              <CCol sm="9">
                <VuePhoneNumberInput
                  default-country-code="AE"
                  v-model="chrisvenue.phonelandline"
                  :value="chrisvenue.phonelandline"
                />
              </CCol>
            </CRow>
            <CRow class="mb-3">
              <CCol sm="3" class="col-form-label" tag="label">
                *Phone, mobile:
              </CCol>
              <CCol sm="9">
                <VuePhoneNumberInput
                  default-country-code="AE"
                  v-model="chrisvenue.phonemobile"
                  :value="chrisvenue.phonemobile"
                />
              </CCol>
            </CRow>
          </CForm>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import { db } from "./../../firebase.js"
import countryData from "./../data/CountryData"
import VuePhoneNumberInput from "vue-phone-number-input"

export default {
  name: 'CDetailsNameAddress',
  components: {
    VuePhoneNumberInput,
  },
  props: {
    chrisvenue: Object
  },
  data () {
    return {
      countries: countryData,
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {

  }
}
</script>
