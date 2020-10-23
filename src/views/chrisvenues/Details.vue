<template>
  <div>
    <CCol xs="12" lg="12">
      <CCard>
        <CCardHeader>
          <CRow>
            <CCol sm="6">
              Chrisvenue id:  {{ $route.params.id }}
            </CCol>
          </CRow>
        </CCardHeader>
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
              <CDetailsDiscountLevels :chrisvenue="Chrisvenue" />
            </CTab>
            <CTab title="Settings">
              <MainSettings :chrisvenue="Chrisvenue" @update-features="updateFeatures" />
            </CTab>
          </CTabs>
          <CRow>
            <CCol sm="3" />
            <CCol sm="3">
              <CButton class="px-4" type="submit" color="danger" @click="updateChrisvenueData"><CIcon name="cil-check-circle"/> Save and go to next</CButton>
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
        </CCardBody>
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
      Chrisvenue: {

      },
      categories: [],
      location: {
        latitude: 0.0,
        longitude: 0.0
      }
    }
  },
  created() {
    let dbRef = db.collection('chrisvenues').doc(this.$route.params.id);
    dbRef.get().then((doc) => {
      this.Chrisvenue = {
        ...doc.data(),
        discountlevelbonuson: "-",
        isFeatured: "-",
        isActive_encore_points: "-",
        image: doc.data().image ? doc.data().image : []
      }
      this.location = this.Chrisvenue.geolocation ? this.Chrisvenue.geolocation : {latitude: 0.0, longitude: 0.0}
    }).catch((error) => {
    })
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
    validateFields() {
      if (this.Chrisvenue.name === undefined || this.Chrisvenue.name === "") {
        this.alertText = "Please input Venue name!"
        this.alertColor = "info"
        this.showAlert()
        return false;
      }

      if (this.Chrisvenue.contactperson === undefined || this.Chrisvenue.contactperson === "") {
        this.alertText = "Please type Contact name!"
        this.alertColor = "info"
        this.showAlert()
        return false;
      }

      if (this.Chrisvenue.contactpersonphone === undefined || this.Chrisvenue.contactpersonphone === "") {
        this.alertText = "Please type Contact phone number"
        this.alertColor = "info"
        return false;
      }

      if (this.Chrisvenue.country === undefined || this.Chrisvenue.country === "") {
        this.alertText = "Please type country"
        this.alertColor = "info"
        return false;
      }

      if (this.Chrisvenue.city === undefined || this.Chrisvenue.city === "") {
        this.alertText = "Please type city"
        this.alertColor = "info"
        return false;
      }

      if (this.Chrisvenue.about === undefined || this.Chrisvenue.about === "") {
        this.alertText = "Please type about text"
        this.alertColor = "info"
        return false;
      }

      if (this.Chrisvenue.email === undefined || this.Chrisvenue.email === "") {
        this.alertText = "Please type Email"
        this.alertColor = "info"
        return false;
      }

      if (this.Chrisvenue.phonelandline === undefined || this.Chrisvenue.phonelandline === "") {
        this.alertText = "Please input the Phone Number!"
        this.alertColor = "info"
        return false;
      }

      if (this.Chrisvenue.geolocation === undefined) {
        this.alertText = "Please select the location!"
        this.alertColor = "info"
        return false;
      }

      if (this.Chrisvenue.category_name === undefined || this.Chrisvenue.category_name === "") {
        this.alertText = "Please select the category!"
        this.alertColor = "info"
        return false;
      }

      if (this.Chrisvenue.pincode === undefined || this.Chrisvenue.pincode === "") {
        this.alertText = "Please input the pin code!"
        this.alertColor = "info"
        return false;
      }

      if (this.Chrisvenue.mainimage === undefined || this.Chrisvenue.mainimage === "") {
        this.alertText = "Please upload the main image!"
        this.alertColor = "info"
        return false;
      }
    },
    updateChrisvenueData() {

      this.Chrisvenue.discountlevelbonuson = this.Chrisvenue.discountlevelbonuson === "ON - Bonus 'Kicker' discount ACTIVE"  ? true : false
      this.Chrisvenue.isFeatured = this.Chrisvenue.isFeatured === "ON - Your venue will be FEATURED (add-on charge applies)" ? true : false
      this.Chrisvenue.isActive_encore_points = this.Chrisvenue.isActive_encore_points === "YES - Encore points are ACTIVE" ? true: false

      validation fields
      const val = this.validateFields()

      if (val === false)
        return

      this.Chrisvenue.geolocation = new firebase.firestore.GeoPoint(parseFloat(this.location.latitude), parseFloat(this.location.longitude))

      if (this.$route.params.id === undefined) {
        this.Chrisvenue.owner = auth.currentUser.uid
        db.collection("chrisvenues")
          .add(this.Chrisvenue)
          .then(() => {
            this.alertText = "Chrisvenue successfully written!"
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
          this.alertText = "Chrisvenue successfully updated!"
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
    }
  }
}
</script>
