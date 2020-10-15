<template>
  <CRow>
    <CCol md="12">
      <CCard>
        <CCardBody>
          <CForm>
            <CInput
              label="Business name:"
              placeholder="Business name"
              horizontal
              :value="chrisvenue.name"
              v-model="chrisvenue.name"
            />
            <CInput
              label="Contact name:"
              placeholder="Contact name"
              horizontal
              :value="chrisvenue.name"
              v-model="chrisvenue.name"
            />
            <CInput
              label="Contact person email:"
              placeholder="Contact person email"
              horizontal
              autocomplete="email"
              :value="chrisvenue.email"
              v-model="chrisvenue.email"
            />
            <CInput
              label="Contact person phone:"
              placeholder="Contact person phone"
              horizontal
              autocomplete="number"
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
              label="City:"
              placeholder="City"
              horizontal
              :value="chrisvenue.city"
              v-model="chrisvenue.city"
            />
            <CSelect
              label="Country:"
              size="md"
              horizontal
              :value.sync="selectedOption"
              :options="selectOptions"
              placeholder="Click to select country"
            />
            <CInput
              label="Phone, landline:"
              placeholder="Phone, landline"
              horizontal
              :value="chrisvenue.phonelandline"
              v-model="chrisvenue.phonelandline"
            />
            <CInput
              label="Phone, mobile:"
              placeholder="Phone, mobile"
              horizontal
            />
            <CRow>
              <CCol sm="3">
              </CCol>
              <CCol sm="9">
                <CInputCheckbox
                />
                <strong class="ml-4">
                  I agree to the
                  <CLink>
                    terms and conditions
                  </CLink>
                </strong>
              </CCol>
            </CRow>
          </CForm>
          <CRow class="mt-3">
            <CCol sm="3" />
            <CCol sm="9">
              <CButton class="px-4" type="submit" color="danger" @click="updateChrisvenueData"><CIcon name="cil-check-circle"/> Save and go to next</CButton>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import { db } from "./../../firebase.js"

export default {
  name: 'CDetailsNameAddress',
  props: {
    chrisvenue: Object
  },
  created() {
    console.log(this.chrisvenue)
  },
  methods: {
    updateChrisvenueData() {
      let dbRef = db.collection('chrisvenues').doc(this.$route.params.id)
      dbRef.update(this.chrisvenue).then(() => {
        console.log("Chrisvenue successfully updated!")
      }).catch((error) =>{
        console.log(error)
      })
    }
  }
}
</script>
