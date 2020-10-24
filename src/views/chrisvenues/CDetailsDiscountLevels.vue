<template>
  <CRow>
    <CCol md="12">
      <CCard>
        <CCardBody>
          <CForm>
            <CSelect
              label="*Bronze level discount:"
              size="md"
              horizontal
              :value.sync="chrisvenue.discountlevelbronze"
              :options="levelOptions"
            />
            <CSelect
              label="*Silver level discount: (must be higher than Bronze %)"
              size="md"
              horizontal
              :value.sync="chrisvenue.discountlevelsilver"
              :options="levelOptions"
            />
            <CSelect
              label="*Gold level discount: (must be higher than Silver %)"
              size="md"
              horizontal
              :value.sync="chrisvenue.discountlevelgold"
              :options="levelOptions"
            />
            <CSelect
              label="*Platinum level discount: (must be higher than Gold %)"
              size="md"
              horizontal
              :value.sync="chrisvenue.discountlevelplatinum"
              :options="levelOptions"
            />
            <hr class="mt-1 mb-3">
            <CSelect
              label="Bonus 'Kicker' discount:"
              size="md"
              horizontal
              :value.sync="chrisvenue.discountlevelbonuson"
              :options="bonusOptions"
            />
            <CSelect
              label="Bonus discount:"
              size="md"
              horizontal
              :value.sync="chrisvenue.discountlevelbonus"
              :options="bonusPercentOptions"
            />
          </CForm>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import { db } from "./../../firebase.js"

export default {
  name: 'CDetailsDiscountLevels',
  props: {
    chrisvenue: Object
  },
  data() {
    return {
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
}
</script>
