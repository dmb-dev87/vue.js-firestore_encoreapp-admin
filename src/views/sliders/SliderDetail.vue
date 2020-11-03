<template>
  <CRow>
    <CCol col="12" lg="12">
      <CCard>
        <CCardHeader>
          <CRow>
            <CCol sm="6">
              Slider id:  {{ $route.params.id }}
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
            <CCol sm="3" class="col-form-label" tag="label">
              Select Venue Name
            </CCol>
            <CCol sm="6">
              <CSelect
                horizontal
                :value.sync="sliderData.venue_id"
                :options="venue_names"
              />
            </CCol>
            <CCol sm="3">
              <CSwitch
                type="checkbox"
                class="mr-1"
                color="success"
                shape="pill"
                variant="opposite"
                :checked="sliderData.isActive"
                :checked.sync="sliderData.isActive"
              />
              <strong>
                Click if this is Active
              </strong>
            </CCol>
          </CRow>
          <CInput
            label="Slider Image URL:"
            horizontal
            :value="sliderData.promo_image"
            v-model="sliderData.promo_image"
            :disabled="true"
          />
          <CRow>
            <CCol sm="3">
              <CButton @click="choosePhoto" class="px-4 mr-2" color="success">Choose a photo</CButton>
              <input
                type="file"
                ref="input1"
                style="display: none"
                @change="previewImage"
                accept="image/*"
              />
            </CCol>
            <CCol sm="3">
              <img :src="sliderData.promo_image" width="200px"/>
            </CCol>
          </CRow>
        </CCardBody>
        <CCardFooter>
          <CRow>
            <CCol col="3" />
            <CCol>
              <CButton class="px-4 mr-2" color="primary" @click="goBack">Back</CButton>
              <CButton class="px-4" type="submit" color="danger" @click="updateSliderData">Save</CButton>
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

  export default {
    name: 'SliderDetail',
    data () {
      return {
        alertText: "",
        dismissSecs: 5,
        dismissCountDown: 0,
        imageData: null,
        uploadValue: 0,
        sliderData: {
        },
        venue_names: [],
      }
    },
    created() {
      if (this.$route.params.id)
      {
        let dbRef = db.collection('promo_venue').doc(this.$route.params.id)
        dbRef.get().then((doc) => {
          this.sliderData = doc.data()
          console.log("++++++++++++++", this.venue_data)
        }).catch((error) => {

        })
      } else {
        this.sliderData = {
          promo_image: ""
        }
      }

      db.collection('chrisvenues').get()
        .then(querySnapshot => {
          this.venue_names = []
          querySnapshot.docs.map((doc) => {
            this.venue_names.push({
              value: doc.id,
              label: doc.data().name
            })
          })
          console.log("++++++++++++++++++", this.venue_names)
        })
    },
    methods: {
      showAlert () {
        this.dismissCountDown = this.dismissSecs
      },
      goBack() {
        this.$router.push({path: '/sliders'})
      },
      getVenueName(id) {
        for(let val = 0; val < this.venue_names.length; val++) {
          if (this.venue_names[val].value === id)
            return this.venue_names[val].label
        }
      },
      updateSliderData() {
        this.sliderData.venue_name = this.getVenueName(this.sliderData.venue_id)
        console.log("+++++++++++++++++++++++", this.sliderData)
        if (this.$route.params.id === undefined) {
          db.collection("promo_venue")
            .add(this.sliderData)
            .then(() => {
              this.alertText = "Slider successfully written!"
              this.showAlert ()
            })
            .catch((error) => {
              this.alertText = "Error writing document!"
              this.showAlert ()
            })
        } else {
          let dbRef = db.collection('promo_venue').doc(this.$route.params.id)
          dbRef.update(this.sliderData).then(() => {
            this.alertText = "Slider successfully updated!"
            this.showAlert ()
          }).catch((error) =>{
            this.showAlert ()
          })
        }
      },
      choosePhoto() {
        this.$refs.input1.click()
      },
      previewImage(event) {
        this.uploadValue=0;
        this.sliderData.promo_image="";
        this.imageData = event.target.files[0];
        this.onUpload()
      },
      onUpload(){
        this.sliderData.promo_image=""
        const storageRef=firebase.storage().ref(`images/${this.imageData.name}`).put(this.imageData);
        storageRef.on(`state_changed`,snapshot=>{
            this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
          }, error=>{
            
          },
          ()=>{this.uploadValue=100;
            storageRef.snapshot.ref.getDownloadURL().then((url)=>{
              this.sliderData.promo_image=url
            });
          }
        );
      },
    }
  }
</script>
