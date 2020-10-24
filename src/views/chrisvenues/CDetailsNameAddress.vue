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
            <CInput
              label="*Contact person phone:"
              placeholder="Contact person phone"
              horizontal
              autocomplete="number"
              :value="chrisvenue.contactpersonphone"
              v-model="chrisvenue.contactpersonphone"
            />
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
              size="md"
              horizontal
              :value.sync="chrisvenue.country"
              v-model="chrisvenue.country"
              :options="countries"
              placeholder="Click to select country"
            />
            <CInput
              label="*Phone, landline:"
              placeholder="Phone, landline"
              horizontal
              :value="chrisvenue.phonelandline"
              v-model="chrisvenue.phonelandline"
            />
            <CInput
              label="Phone, mobile:"
              placeholder="Phone, mobile"
              horizontal
              :value="chrisvenue.phonemobile"
              v-model="chrisvenue.phonemobile"
            />
            <CRow>
              <CCol sm="3">
              </CCol>
              <CCol sm="9">
                <CInputCheckbox
                />
                <strong class="ml-4">
                  I agree to the
                  <CLink href="https://www.encoreapp.net/terms.html">
                    terms and conditions
                  </CLink>
                </strong>
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

export default {
  name: 'CDetailsNameAddress',
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
