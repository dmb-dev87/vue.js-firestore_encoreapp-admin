<template>
  <CRow>
    <CCol col="9" lg="9">
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
            <CCol sm="3">
              <CRow class="mb-1">
                <CButton @click="choosePhoto" class="px-4 mr-2" color="success">Choose a photo</CButton>
                <input
                  type="file"
                  ref="input1"
                  style="display: none"
                  @change="previewImage"
                  accept="image/*"
                />
              </CRow>
              <CRow class="mb-1">
                <img :src="sliderData.slider_images" width="200px"/>
              </CRow>
            </CCol>
            <CCol sm="9">
              <CInput
                label="Slider Image URL:"
                horizontal
                :value="sliderData.slider_images"
                v-model="sliderData.slider_images"
                :disabled="true"
              />
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
      }
    },
    created() {
      if (this.$route.params.id)
      {
        let dbRef = db.collection('slider').doc(this.$route.params.id)
        dbRef.get().then((doc) => {
          this.sliderData = doc.data()
          console.log(this.sliderData)
        }).catch((error) => {

        })
      } else {
        this.sliderData = {
          slider_images: ""
        }
      }
    },
    methods: {
      showAlert () {
        this.dismissCountDown = this.dismissSecs
      },
      goBack() {
        this.$router.push({path: '/sliders'})
      },
      updateSliderData() {
        if (this.$route.params.id === undefined) {
          db.collection("slider")
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
          let dbRef = db.collection('slider').doc(this.$route.params.id)
          dbRef.update(this.sliderData).then(() => {
            this.alertText = "Slider successfully updated!"
            this.showAlert ()
          }).catch((error) =>{
            this.showAlert ()
            console.log(error)
          })
        }
      },
      choosePhoto() {
        this.$refs.input1.click()
      },
      previewImage(event) {
        this.uploadValue=0;
        this.sliderData.slider_images="";
        this.imageData = event.target.files[0];
        console.log("+++++++++", this.sliderData.slider_images)
        this.onUpload()
      },
      onUpload(){
        this.sliderData.slider_images=""
        console.log("+++++++++", this.sliderData.slider_images)
        const storageRef=firebase.storage().ref(`images/${this.imageData.name}`).put(this.imageData);
        storageRef.on(`state_changed`,snapshot=>{
            this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
          }, error=>{console.log(error.message)},
          ()=>{this.uploadValue=100;
            storageRef.snapshot.ref.getDownloadURL().then((url)=>{
              this.sliderData.slider_images=url
              console.log("+++++++++", this.sliderData.slider_images)
            });
          }
        );
      },
    }
  }
</script>
