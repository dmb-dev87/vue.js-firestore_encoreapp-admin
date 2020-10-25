<template>
  <CRow>
    <CCol md="12">
      <CCard>
        <CCardBody>
          <CForm>
            <CSelect
              label="*Bronze level discount:"
              horizontal
              :value.sync="chrisvenue.discountlevelbronze"
              :options="levelOptions"
            />
            <CSelect
              label="*Silver level discount: (must be higher than Bronze %)"
              horizontal
              :value.sync="chrisvenue.discountlevelsilver"
              :options="levelOptions"
              @click="validateValue('silver')"
            />
            <CSelect
              label="*Gold level discount: (must be higher than Silver %)"
              horizontal
              :value.sync="chrisvenue.discountlevelgold"
              :options="levelOptions"
              @click="validateValue('gold')"
            />
            <CSelect
              label="*Platinum level discount: (must be higher than Gold %)"
              horizontal
              :value.sync="chrisvenue.discountlevelplatinum"
              :options="levelOptions"
              @click="validateValue('platinum')"
            />
            <hr class="mt-1 mb-3">
            <CSelect
              label="Bonus 'Kicker' discount:"
              horizontal
              :value.sync="selStrings.discountlevelbonusonString"
              v-model="selStrings.discountlevelbonusonString"
              :options="bonusOptions"
            />
            <CSelect
              label="Bonus discount:"
              horizontal
              :value.sync="chrisvenue.discountlevelbonus"
              :options="bonusPercentOptions"
            />
          </CForm>
          <CRow>
            <CCol>
              <CAlert
                :show.sync="dismissCountDown"
                closeButton
                :color="alertColor"
              >
                {{this.alertText}}
              </CAlert>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>

export default {
  name: 'CDetailsDiscountLevels',
  props: {
    chrisvenue: Object,
    selStrings: Object,
  },
  data() {
    return {
      alertColor: "info",
      alertText: "",
      dismissSecs: 3,
      dismissCountDown: 0,
      levelOptions: [
        5.00, 7.50, 10.00, 12.50, 15.00, 17.50, 20.00, 22.50, 25.00, 27.50, 30.00, 32.50, 35.00, 37.50, 40.00, 42.50, 45.00, 47.50, 50.00, 52.50, 55.00, 57.50, 60.00
      ],
      bonusOptions: [
        "-", "ON - Bonus 'Kicker' discount ACTIVE", "OFF-NOT ACTIVE",
      ],
      bonusPercentOptions: [
        2.50, 5.00, 7.50, 10.00, 12.50, 15.00, 17.50, 20.00
      ],
    }
  },
  methods: {
    showAlert () {
      this.dismissCountDown = this.dismissSecs
    },
    validateValue(arg) {
      if (arg === "silver" && this.chrisvenue.discountlevelsilver <= this.chrisvenue.discountlevelbronze) {
        this.alertColor = "danger"
        this.alertText = "You have to select the big value than Bronze level"
        this.showAlert()
        return
      }

      if (arg === "gold" && this.chrisvenue.discountlevelgold <= this.chrisvenue.discountlevelsilver) {
        this.alertColor = "danger"
        this.alertText = "You have to select the big value than Silver level"
        this.showAlert()
        return
      }

      if (arg === "platinum" && this.chrisvenue.discountlevelplatinum <= this.chrisvenue.discountlevelgold) {
        this.alertColor = "danger"
        this.alertText = "You have to select the big value than Gold level"
        this.showAlert()
        return
      }

      return
    }
  }
}
</script>
