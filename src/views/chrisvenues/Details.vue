<template>
  <div>
    <CCol xs="12" lg="12">
      <CCard>
        <CCardHeader>
          <CRow>
            <CCol sm="6">
              Chrisvenue id:  {{ $route.params.id }}
            </CCol>
            <CCol>
              <CAlert
                :show.sync="dismissCountDown"
                closeButton
                color="info"
              >
                {{this.alertText}}
              </CAlert>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CTabs variant="pills">
            <CTab title="Name and address" active>
              <CDetailsNameAddress :chrisvenue="Chrisvenue" />
            </CTab>
            <CTab title="About">
              <CDetailsAbout :chrisvenue="Chrisvenue" :categories="categories" @update-isBranch="updateIsBranch" />
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
              <MainSettings v-bind:chrisvenue="Chrisvenue" @update-features="updateFeatures" />
            </CTab>
          </CTabs>
          <CRow>
            <CCol sm="3" />
            <CCol sm="9">
              <CButton class="px-4" type="submit" color="danger" @click="updateChrisvenueData"><CIcon name="cil-check-circle"/> Save and go to next</CButton>
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

export default {
  name: 'Details',
  components: {
    ...Details
  },
  data() {
    return {
      alertText: "",
      dismissSecs: 5,
      dismissCountDown: 0,
      Chrisvenue: {

      },
      categories: []
    }
  },
  created() {
    console.log(this.$route.params.id);
    let dbRef = db.collection('chrisvenues').doc(this.$route.params.id);
    dbRef.get().then((doc) => {
      this.Chrisvenue = doc.data();
      this.Chrisvenue.discountlevelbonuson = "-"
      this.Chrisvenue.isFeatured = "-"
      this.Chrisvenue.isActive_encore_points = "-"

      console.log(doc.data());
    }).catch((error) => {
      console.log(error);
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
    updateChrisvenueData() {
      this.Chrisvenue.discountlevelbonuson = this.Chrisvenue.discountlevelbonuson === "ON - Bonus 'Kicker' discount ACTIVE"  ? true : false
      this.Chrisvenue.isFeatured = this.Chrisvenue.isFeatured === "ON - Your venue will be FEATURED (add-on charge applies)" ? true : false
      this.Chrisvenue.isActive_encore_points = this.Chrisvenue.isActive_encore_points === "YES - Encore points are ACTIVE" ? true: false
      console.log("++++++++++", this.$route.params.id)
      if (this.$route.params.id === undefined) {
        this.Chrisvenue.owner = auth.currentUser.uid
        db.collection("chrisvenues")
          .add(this.Chrisvenue)
          .then(() => {
            this.alertText = "Chrisvenue successfully written!"
            this.showAlert ()
            console.log("++++++++", "Chrisvenue successfully written!");
            this.$router.push({path: '/chrisvenues'})
          })
          .catch((error) => {
            this.alertText = "Error writing document"
            this.showAlert ()
            console.error("++++++++", "Error writing document: ", error);
          });
      } else {
        let dbRef = db.collection('chrisvenues').doc(this.$route.params.id)
        dbRef.update(this.Chrisvenue).then(() => {
          this.alertText = "Chrisvenue successfully updated!"
          this.showAlert ()
          console.log("++++++++", "Chrisvenue successfully updated!")
        }).catch((error) => {
          this.alertText = "Error writing document"
          this.showAlert ()
          console.log(error)
        })
      }
    },
    updateIsBranch(checked) {
      this.chrisvenue.isBranch=checked
    },
    updateFeatures(item) {
      console.log("+++++++++++++++", item.type)
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
