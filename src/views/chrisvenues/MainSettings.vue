<template>
  <CRow>
    <CCol md="12">
      <CCard>
        <CCardBody>
          <CForm>
            <CSelect
              label="Be a 'Featured venue':"
              size="md"
              horizontal
              :value.sync="chrisvenue.isFeatured"
              :options="featuredOptions"
            />
            <hr class="mt-1 mb-3">
            <CSelect
              label="QR code or PIN code:"
              size="md"
              horizontal
              :value.sync="chrisvenue.isPinOrQr"
              :options="qrpinOptions"
              placeholder="-"
            />
            <hr class="mt-1 mb-3">
            <CSelect
              label="Activate Encore points:"
              size="md"
              horizontal
              :value.sync="chrisvenue.isActive"
              :options="activateOptions"
              placeholder="-"
            />
            <hr class="mt-1 mb-3">
            <CSelect
              label="Minimum purchase:"
              size="md"
              horizontal
              :value.sync="chrisvenue.minimumpurchase"
              :options="purchaseOptions"
              placeholder="-"
            />
            <CInput
              label="Black-out dates:"
              placeholder="Set the dates where the program will not apply, if any. Format: DD/MM e.g. 24/12"
              horizontal
              :value="chrisvenue.blackoutdates"
              v-model="chrisvenue.blackoutdates"
            />
            <CTextarea
              label="Terms:"
              placeholder="State any terms regarding the dicount."
              horizontal
              rows="2"
              :value="chrisvenue.discountterms"
              v-model="chrisvenue.discountterms"
            />
            <hr class="mt-1 mb-3">
            <CRow>
              <CCol sm="3" class="col-form-label" tag="label">
                Alcohol:
              </CCol>
              <CCol sm="9">
                <input
                  type="checkbox"
                  :checked="chrisvenue.featurealcoholserved"
                  @click="update_features('featurealcoholserved', $event)"
                />
                <strong class="ml-1">
                  Is alcohol served? (if applicable)
                </strong>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="3" class="col-form-label" tag="label">
                Family friendly:
              </CCol>
              <CCol sm="9">
                <input
                  type="checkbox"
                  :checked="chrisvenue.featurefamilyfriendly"
                  @click="update_features('featurefamilyfriendly', $event)"
                />
                <strong class="ml-1">
                  Is the venue family/kids friendly? (if applicable)
                </strong>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="3" class="col-form-label" tag="label">
                Handicap:
              </CCol>
              <CCol sm="9">
                <input
                  type="checkbox"
                  :checked="chrisvenue.featurehandicapfriendly"
                  @click="update_features('featurehandicapfriendly', $event)"
                />
                <strong class="ml-1">
                  Is the venue handicap accessible/friendly? (if applicable)
                </strong>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="3" class="col-form-label" tag="label">
                Wifi:
              </CCol>
              <CCol sm="9">
                <input
                  type="checkbox"
                  :checked="chrisvenue.featurewifi"
                  @click="update_features('featurewifi', $event)"
                />
                <strong class="ml-1">
                  Wifi available? (if applicable)
                </strong>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="3" class="col-form-label" tag="label">
                Vegan:
              </CCol>
              <CCol sm="9">
                <input
                  type="checkbox"
                  :checked="chrisvenue.featurevegan"
                  @click="update_features('featurevegan', $event)"
                />
                <strong class="ml-1">
                  Vegan options available? (if applicable)
                </strong>
              </CCol>
            </CRow>
            <hr class="mt-1 mb-3">
          </CForm>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>

  export default {
    name: 'MainSettings',
    props: [
      'chrisvenue',
    ],
    data() {
      return {
        featuredOptions: [
          "-", "ON - Your venue will be FEATURED (add-on charge applies)", "OFF - NOT FEATURED"
        ],
        qrpinOptions: [
          "-", "QR code used for redeem", "PIN code used for redeem"
        ],
        activateOptions: [
          "-", "NO - Encore points not ACTIVE", "YES - Encore points are ACTIVE"
        ],
        purchaseOptions: [
          "No minimum(recommended)", 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 125, 150, 175, 200
        ],
        featurealcoholserved: this.chrisvenue.featurealcoholserved,
        featurefamilyfriendly: false,
        featurehandicapfriendly: false,
        featurewifi: false,
        featurevegan: false,
      }
    },
    mounted() {
      console.log(this.chrisvenue)
      this.featurealcoholserved = this.props.chrisvenue.featurealcoholserved;
    },
    methods: {
      update_features: function(arg, event) {
        console.log("+++++++++++++", event.target.checked)
        let item = {}
        switch (arg) {
          case 'featurealcoholserved':
            item = {type: 'featurealcoholserved', checked: event.target.checked}
            break
          case 'featurefamilyfriendly':
            item = {type: 'featurefamilyfriendly', checked: event.target.checked}
            break
          case 'featurehandicapfriendly':
            item = {type: 'featurehandicapfriendly', checked: event.target.checked}
            break
          case 'featurewifi':
            item = {type: 'featurewifi', checked: event.target.checked}
            break
          case 'featurevegan':
            item = {type: 'featurevegan', checked: event.target.checked}
            break
          default:
            break
        }
        console.log("++++++++++++++++", item)
        this.$emit('update-features', item)
      },
    }
  }
</script>
