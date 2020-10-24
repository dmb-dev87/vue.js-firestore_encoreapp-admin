<template>
  <CRow>
    <CCol col="12" lg="12">
      <CCard>
        <CCardHeader>
          <CRow>
            <CCol sm="6">
              ID National Card and Trade License
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
        </CCardHeader>
        <CCardBody>
          <CProgress class="mb-3" :value="uploadValue" :max="max" show-percentage animated></CProgress>
          <CRow>
            <CCol sm="4">
              <CRow class="mb-2" style="justify-content: center;">
                <CButton @click="chooseFront" class="px-4" color="success">Front of National ID</CButton>
                <input
                  type="file"
                  ref="input_front"
                  style="display: none"
                  @change="previewImage($event, 0)"
                  accept="image/*"
                />
              </CRow>
              <CRow class="mb-2" style="justify-content: center;">
                <img :src="idNationalFront" width="200px"/>
              </CRow>
            </CCol>
            <CCol sm="4">
              <CRow class="mb-2" style="justify-content: center;">
                <CButton @click="chooseBack" class="px-4" color="success">Back of National ID</CButton>
                <input
                  type="file"
                  ref="input_back"
                  style="display: none"
                  @change="previewImage($event, 1)"
                  accept="image/*"
                />
              </CRow>
              <CRow class="mb-2" style="justify-content: center;">
                <img :src="idNationalBack" width="200px"/>
              </CRow>
            </CCol>
            <CCol sm="4" class="text-center">
              <CRow class="mb-2" style="justify-content: center;">
                <CButton @click="chooseTrade" class="px-4" color="success">Trade/business license</CButton>
                <input
                  type="file"
                  ref="input_trade"
                  style="display: none"
                  @change="previewImage($event, 2)"
                  accept="image/*"
                />
              </CRow>
              <CRow class="mb-2" style="justify-content: center;">
                <img :src="idTradeLicense" width="200px"/>
              </CRow>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
  import firebase from 'firebase'
  import { db, auth } from '../../firebase.js'

  export default {
    name: 'IDCardDetail',
    props: {
      chrisvenue: Object,
    },
    data () {
      return {
        alertText: "",
        alertColor: "info",
        dismissSecs: 5,
        dismissCountDown: 0,
        imageData: Array(3),
        uploadValue: 0,
        max: 100,
      }
    },
    computed: {
      idNationalFront: {
        get() {
          return this.chrisvenue.IDnationalfront
        },
      },
      idNationalBack: {
        get() {
          return this.chrisvenue.IDnationalback
        },
      },
      idTradeLicense: {
        get() {
          return this.chrisvenue.IDtradelicense
        },
      }
    },
    methods: {
      showAlert () {
        this.dismissCountDown = this.dismissSecs
      },
      chooseFront() {
        this.$refs.input_front.click()
      },
      chooseBack() {
        this.$refs.input_back.click()
      },
      chooseTrade() {
        this.$refs.input_trade.click()
      },
      previewImage(event, arg) {
        switch (arg) {
          case 0:
            this.idNationalFront=""
            break
          case 1:
            this.idNationalBack=""
            break
          case 2:
            this.idTradeLicense=""
            break
          default:
            break
        }

        this.uploadValue=0;
        this.imageData[arg]=event.target.files[0];
        this.onUpload(arg)
      },
      onUpload(arg){
        const storageRef=firebase.storage().ref(`images/${this.imageData[arg].name}`).put(this.imageData[arg])
        storageRef.on(`state_changed`,snapshot=>{
            this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100
          },
          error=>{
          },
          ()=>{this.uploadValue=100
            storageRef.snapshot.ref.getDownloadURL().then((url)=>{
              switch (arg) {
                case 0:
                  this.chrisvenue.IDnationalfront=url
                  break
                case 1:
                  this.chrisvenue.IDnationalback=url
                  break
                case 2:
                  this.chrisvenue.IDtradelicense=url
                  break
                default:
                  break
              }
              this.uploadValue=0
            });
          }
        );
      },
    }
  }
</script>
