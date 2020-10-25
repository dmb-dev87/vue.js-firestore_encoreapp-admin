<template>
  <CRow>
    <CCol col="9" lg="9">
      <CCard>
        <CCardHeader>
          <CRow>
            <CCol sm="6">
              User id:  {{ $route.params.id }}
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
          <CRow>
            <CCol sm="3">
              <CRow class="mb-1">
                <CButton @click="choosePhoto" class="px-4 mr-2" color="success">Choose a photo</CButton>
                <input
                  type="file" ref="input1"
                  style="display: none"
                  @change="previewImage" accept="image/*" >
              </CRow>
              <CRow class="mb-1">
                <img :src="userData.profileImage" width="200px"/>
              </CRow>
            </CCol>
            <CCol sm="9">
              <CInput
                label="Name:"
                placeholder="Type user name"
                horizontal
                :value="userData.username"
                v-model="userData.username"
              />
              <CInput
                label="Email:"
                placeholder="Type user email"
                horizontal
                :value="userData.email"
                v-model="userData.email"
              />
              <CInput
                label="First Name:"
                placeholder="Type first name"
                horizontal
                :value="userData.firstname"
                v-model="userData.firstname"
              />
              <CInput
                label="Last Name:"
                placeholder="Type last name"
                horizontal
                :value="userData.lastname"
                v-model="userData.lastname"
              />
              <CSelect
                label="Gender:"
                horizontal
                :value.sync="userData.gender"
                v-model="userData.gender"
                :options="genders"
                placeholder="Click to select gender"
              />
              <CSelect
                label="Country:"
                horizontal
                :value.sync="userData.country"
                v-model="userData.country"
                :options="countries"
                placeholder="Click to select country"
              />
              <CInput
                label="Birthday:"
                placeholder="Type user birthday"
                horizontal
                :value="userData.dob"
                v-model="userData.dob"
              />
              <CInput
                label="Phone Number:"
                placeholder="Type user phone number"
                horizontal
                :value="userData.phone"
                v-model="userData.phone"
              />
              <CInput
                label="Mobile Number:"
                placeholder="Type user mobile number"
                horizontal
                :value="userData.mobilenumber"
                v-model="userData.mobilenumber"
              />
            </CCol>
          </CRow>
        </CCardBody>
        <CCardFooter>
          <CRow>
            <CCol col="3" />
            <CCol>
              <CButton class="px-4 mr-2" color="primary" @click="goBack">Back</CButton>
              <CButton class="px-4" type="submit" color="danger" @click="updateUserData">Save</CButton>
            </CCol>
          </CRow>
        </CCardFooter>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import firebase from 'firebase'
import { db } from './../../firebase.js'
import countryData from "./../data/CountryData"

export default {
  name: 'User',
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.usersOpened = from.fullPath.includes('users')
    })
  },
  data () {
    return {
      alertText: "",
      uploadValue: 0,
      dismissSecs: 5,
      dismissCountDown: 0,
      imageData: null,
      countries: countryData,
      genders: ["-", "Male", "Female"],
      userData: {
      },
      usersOpened: null
    }
  },
  created() {
    if (this.$route.params.id) {
      let dbRef = db.collection('users').doc(this.$route.params.id)
      dbRef.get().then((doc) => {
        this.userData = doc.data()
      }).catch((error) => {
      })
    } else {
      this.userData = {
        country: "",
        createAt: "",
        dob: "",
        email: "",
        firstname: "",
        gender: "-",
        lastname: "",
        mobilenumber: "",
        name: "",
        phone: "",
        profileImage: "",
        username: ""
      }
    }

  },
  methods: {
    showAlert () {
      this.dismissCountDown = this.dismissSecs
    },
    goBack() {
      this.usersOpened ? this.$router.go(-1) : this.$router.push({path: '/users'})
    },
    updateUserData() {
      if (this.$route.params.id === undefined) {
        db.collection("users")
          .add(this.userData)
          .then(() => {
            this.alertText = "User successfully written!"
            this.showAlert ()
          })
          .catch((error) => {
            this.alertText = "Error writing document!"
            this.showAlert ()
            console.error("Error writing document: ", error);
          });
      } else {
        let dbRef = db.collection('users').doc(this.$route.params.id)
        dbRef.update(this.userData).then(() => {
          this.alertText = "User successfully updated!"
          this.showAlert ()
        }).catch((error) =>{
          this.alertText = "Error writing document!"
          this.showAlert ()
        })
      }
    },
    choosePhoto() {
      this.$refs.input1.click()
    },
    previewImage(event) {
      this.uploadValue=0;
      this.userData.profileImage="";
      this.imageData = event.target.files[0];
      this.onUpload()
    },
    onUpload(){
      const storageRef=firebase.storage().ref(`images/${this.imageData.name}`).put(this.imageData);
      storageRef.on(`state_changed`,snapshot=>{
          this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
        }, error=>{

        },
        ()=>{this.uploadValue=100;
          storageRef.snapshot.ref.getDownloadURL().then((url)=>{
            this.userData.profileImage=url
          });
        }
      );
    },
  }
}
</script>
