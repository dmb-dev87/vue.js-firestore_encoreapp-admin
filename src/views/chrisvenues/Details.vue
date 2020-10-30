<template>
  <div>
    <CCol xs="12" lg="12">
      <CCard>
        <CCardBody>
          <CTabs variant="pills">
            <CTab title="Name and address" active>
              <CDetailsNameAddress :chrisvenue="Chrisvenue" />
            </CTab>
            <CTab title="About">
              <CDetailsAbout :chrisvenue="Chrisvenue" :categories="categories" :location="location" @update-isBranch="updateIsBranch" />
            </CTab>
            <CTab title="Internet">
              <CDetailsInternet :chrisvenue="Chrisvenue" />
            </CTab>
            <CTab title="Gallery">
              <CDetailsGallery :chrisvenue="Chrisvenue" />
            </CTab>
            <CTab title="Discount levels">
              <CDetailsDiscountLevels :chrisvenue="Chrisvenue" :selStrings="selStrings" />
            </CTab>
            <CTab title="ID and Company License">
              <IDCardDetail :chrisvenue="Chrisvenue" @update-features="updateFeatures" />
            </CTab>
            <CTab title="Settings">
              <MainSettings :chrisvenue="Chrisvenue" @update-features="updateFeatures" :selStrings="selStrings" />
            </CTab>
          </CTabs>
        </CCardBody>
        <CCardFooter>
          <CRow class="mb-3">
            <CCol sm="3">
            </CCol>
            <CCol sm="9">
              <input
                type="checkbox"
                :checked="termsAndCond"
                @click="updateTermsAndCond"
              />
              <strong class="ml-4">
                I agree to the
                <CLink href="https://www.encoreapp.net/terms.html">
                  terms and conditions
                </CLink>
              </strong>
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="3" />
            <CCol sm="3">
              <CButton class="px-4" type="submit" color="danger" @click="updateChrisvenueData"><CIcon name="cil-check-circle"/> Save Venue</CButton>
            </CCol>
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
        </CCardFooter>
      </CCard>
    </CCol>
  </div>
</template>

<script>
import * as Details from './index.js'
import { db, auth } from '../../firebase.js'
import firebase from 'firebase'

export default {
  name: 'Details',
  components: {
    ...Details
  },
  data() {
    return {
      alertColor: "info",
      alertText: "",
      dismissSecs: 5,
      dismissCountDown: 0,
      termsAndCond: false,
      Chrisvenue: {

      },
      selStrings: {
        discountlevelbonusonString: "",
        isFeaturedString: "",
        isActive_encore_pointsString: ""
      },
      categories: [],
      location: {
        latitude: 0.0,
        longitude: 0.0
      }
    }
  },
  created() {
    if (this.$route.params.id) {
      this.termsAndCond = true

      let dbRef = db.collection('chrisvenues').doc(this.$route.params.id);
      dbRef.get().then((doc) => {
        this.Chrisvenue = {
          ...doc.data(),
          logoimage: doc.data().logoimage ? doc.data().logoimage : "",
          mainimage: doc.data().mainimage ? doc.data().mainimage : "",
          image: doc.data().image ? doc.data().image : [],
          IDnationalfront: doc.data().IDnationalfront ? doc.data().IDnationalfront : "",
          IDnationalback: doc.data().IDnationalback ? doc.data().IDnationalback : "",
          IDtradelicense: doc.data().IDtradelicense ? doc.data().IDtradelicense : "",
        }
        this.selStrings.discountlevelbonusonString = this.Chrisvenue.discountlevelbonuson ? "ON - Bonus 'Kicker' discount ACTIVE" : "OFF-NOT ACTIVE"
        this.selStrings.isFeaturedString = this.Chrisvenue.isFeatured ? "ON - Your venue will be FEATURED (add-on charge applies)" : "OFF - NOT FEATURED"
        this.selStrings.isActive_encore_pointsString = this.Chrisvenue.isActive_encore_points ? "YES - Encore points are ACTIVE" : "NO - Encore points not ACTIVE"
        this.location = this.Chrisvenue.geolocation ? this.Chrisvenue.geolocation : {latitude: 0.0, longitude: 0.0}
      }).catch((error) => {

      })
    } else {
      this.termsAndCond = false

      this.Chrisvenue = {
        mainimage: "",
        logoimage: "",
        image: [],
        IDnationalfront: "",
        IDnationalback: "",
        IDtradelicense: "",
        discountlevelbronze: 5,
        discountlevelsilver: 7.5,
        discountlevelgold: 10,
        discountlevelplatinum: 12.5
      }

      this.selStrings.discountlevelbonusonString = "-"
      this.selStrings.isFeaturedString = ""
      this.selStrings.isActive_encore_pointsString = ""
    }

    db.collection('category').onSnapshot((snapshotChange) => {
      this.categories = []
      snapshotChange.forEach((doc) => {
        this.categories.push(
          doc.data().category_name
        )
      })
    })
  },
  methods: {
    showAlert () {
      this.dismissCountDown = this.dismissSecs
    },
    async validateFields() {
      if (this.Chrisvenue.name === undefined || this.Chrisvenue.name === "") {
        this.alertText = "Please input Venue name!"
        this.alertColor = "danger"
        this.showAlert()
        return false
      }

      if (this.Chrisvenue.contactperson === undefined || this.Chrisvenue.contactperson === "") {
        this.alertText = "Please input Contact name!"
        this.alertColor = "danger"
        this.showAlert()
        return false
      }

      if (this.Chrisvenue.contactpersonphone === undefined || this.Chrisvenue.contactpersonphone === "") {
        this.alertText = "Please input Contact phone number"
        this.alertColor = "danger"
        this.showAlert()
        return false
      }

      if (this.Chrisvenue.country === undefined || this.Chrisvenue.country === "") {
        this.alertText = "Please input country"
        this.alertColor = "danger"
        this.showAlert()
        return false
      }

      if (this.Chrisvenue.city === undefined || this.Chrisvenue.city === "") {
        this.alertText = "Please input city"
        this.alertColor = "danger"
        this.showAlert()
        return false
      }

      if (this.Chrisvenue.about === undefined || this.Chrisvenue.about === "") {
        this.alertText = "Please input about text"
        this.alertColor = "danger"
        this.showAlert()
        return false
      }

      if (this.Chrisvenue.teaserline === undefined || this.Chrisvenue.teaserline === "") {
        this.alertText = "Please input teaserline text"
        this.alertColor = "danger"
        this.showAlert()
        return false
      }

      if (this.Chrisvenue.email === undefined || this.Chrisvenue.email === "") {
        this.alertText = "Please input Email"
        this.alertColor = "danger"
        this.showAlert()
        return false
      }

      if (this.Chrisvenue.phonelandline === undefined || this.Chrisvenue.phonelandline === "") {
        this.alertText = "Please input the Phone Number!"
        this.alertColor = "danger"
        this.showAlert()
        return false
      }

      if (this.Chrisvenue.geolocation === undefined) {
        this.alertText = "Please select the location!"
        this.alertColor = "danger"
        this.showAlert()
        return false
      }

      if (this.Chrisvenue.category_name === undefined || this.Chrisvenue.category_name === "") {
        this.alertText = "Please select the category!"
        this.alertColor = "danger"
        this.showAlert()
        return false
      }

      if (this.Chrisvenue.pincode === undefined || this.Chrisvenue.pincode === "") {
        this.alertText = "Please input the pin code!"
        this.alertColor = "danger"
        this.showAlert()
        return false
      }

      if (this.Chrisvenue.mainimage === undefined || this.Chrisvenue.mainimage === "") {
        this.alertText = "Please upload the main image!"
        this.alertColor = "danger"
        return false
      }

      if (this.termsAndCond === false) {
        this.alertText = "Please agree terms and conditions!"
        this.alertColor = "danger"
        this.showAlert()
        return false
      }

      if (this.Chrisvenue.discountlevelsilver <= this.Chrisvenue.discountlevelbronze) {
        this.alertColor = "danger"
        this.alertText = "You have to select the big value than Bronze level"
        this.showAlert()
        return
      }

      if (this.Chrisvenue.discountlevelgold <= this.Chrisvenue.discountlevelsilver) {
        this.alertColor = "danger"
        this.alertText = "You have to select the big value than Silver level"
        this.showAlert()
        return
      }

      if (this.Chrisvenue.discountlevelplatinum <= this.Chrisvenue.discountlevelgold) {
        this.alertColor = "danger"
        this.alertText = "You have to select the big value than Gold level"
        this.showAlert()
        return
      }
    },
    async validatePincode() {
      let len = 0
      const dbRef = db.collection('chrisvenues')
          .where('pincode', '==', this.Chrisvenue.pincode)

      await dbRef.get()
          .then(res => {
            len = res.size
          })

      return len === 0;
    },
    async updateChrisvenueData() {
      this.Chrisvenue.discountlevelbonuson = this.selStrings.discountlevelbonusonString === "ON - Bonus 'Kicker' discount ACTIVE"  ? true : false
      this.Chrisvenue.isFeatured = this.selStrings.isFeaturedString === "ON - Your venue will be FEATURED (add-on charge applies)" ? true : false
      this.Chrisvenue.isActive_encore_points = this.selStrings.isActive_encore_pointsString === "YES - Encore points are ACTIVE" ? true: false
      this.Chrisvenue.geolocation = new firebase.firestore.GeoPoint(parseFloat(this.location.latitude), parseFloat(this.location.longitude))

      let val = this.validateFields()

      if (val === false)
        return

      if (this.$route.params.id === undefined) {
        val = await this.validatePincode()

        if (val === false) {
          this.alertColor = "danger"
          this.alertText = "The pincode is aleady exist. Please input another pincode."
          this.showAlert()
          return
        }

        this.Chrisvenue.owner = auth.currentUser.uid
        db.collection("chrisvenues")
          .add(this.Chrisvenue)
          .then(() => {
            this.alertText = "Venue successfully written!"
            this.alertColor = "success"
            this.showAlert ()
            this.$router.push({path: '/chrisvenues'})
          })
          .catch((error) => {
            this.alertColor = "danger"
            this.alertText = "Error writing document"
            this.showAlert ()
          });
      } else {
        let dbRef = db.collection('chrisvenues').doc(this.$route.params.id)
        dbRef.update(this.Chrisvenue).then(() => {
          this.alertText = "Venue successfully updated!"
          this.alertColor = "success"
          this.showAlert ()
        }).catch((error) => {
          this.alertText = "Error writing document"
          this.alertColor = "danger"
          this.showAlert ()
        })
      }
    },
    updateIsBranch(checked) {
      this.chrisvenue.isBranch=checked
    },
    updateFeatures(item) {
      switch (item.type) {
        case 'featurealcoholserved':
          this.Chrisvenue.featurealcoholserved=item.checked
          break
        case 'featurefamilyfriendly':
          this.Chrisvenue.featurefamilyfriendly=item.checked
          break
        case 'featurehandicapfriendly':
          this.Chrisvenue.featurehandicapfriendly=item.checked
          break
        case 'featurewifi':
          this.Chrisvenue.featurewifi=item.checked
          break
        case 'featurevegan':
          this.Chrisvenue.featurevegan=item.checked
          break
        default:
          break
      }
    },
    updateTermsAndCond(event) {
      this.termsAndCond = event.target.checked
    }
  }
}
</script>
