<template>
  <CRow>
    <CCol md="12">
      <CCard>
        <CCardBody>
          <CForm>
            <CRow class="mb-2">
              <CCol sm="3" class="col-form-label" tag="label">
                Logo Image:
              </CCol>
              <CCol sm="7">
                <input
                  type="file"
                  label="Logo Image:"
                  placeholder="Choose file"
                  horizontal
                  ref="logo_image"
                  @change="prepareUpload($event, 'logo')"
                />
              </CCol>
              <CCol sm="2">
                <CButton color="success" @click="uploadImage('logo')">Upload</CButton>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="3" />
              <CCol sm="7">
                <CLink :href="chrisvenue.logoimage">{{chrisvenue.logoimage}}</CLink>
              </CCol>
            </CRow>
            <CRow class="mb-2">
              <CCol sm="3" class="col-form-label" tag="label">
                Main Image:
              </CCol>
              <CCol sm="7">
                <input
                  type="file"
                  label="Main Image:"
                  placeholder="Choose file"
                  horizontal
                  ref="main_image"
                  @change="prepareUpload($event, 'main')"
                />
              </CCol>
              <CCol sm="2">
                <CButton color="success" @click="uploadImage('main')">Upload</CButton>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="3" />
              <CCol sm="7">
                <CLink :href="chrisvenue.mainimage">{{chrisvenue.mainimage}}</CLink>
              </CCol>
            </CRow>
            <hr class="mt-1 mb-3">
            <div class="mb-3" v-for="(image, index) in imagesData">
              <CRow class="mb-1">
                <CCol sm="3" class="col-form-label" tag="label">
                  {{`Gallery Image ${index+1}`}}:
                </CCol>
                <CCol sm="7">
                  <input
                    type="file"
                    placeholder="Choose file"
                    horizontal
                    ref="`gallery_image${index+1}`"
                    @change="prepareUpload($event, `gallery${index+1}`)"
                  />
                </CCol>
                <CCol sm="2">
                  <CButton color="success" @click="uploadImage(`gallery${index+1}`)">Upload</CButton>
                </CCol>
              </CRow>
              <CRow>
                <CCol sm="3" />
                <CCol sm="7">
                  <CLink :href="chrisvenue.image[index]">{{chrisvenue.image[index]}}</CLink>
                </CCol>
              </CRow>
            </div>
          </CForm>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
  import firebase from "firebase"
  import { db } from "./../../firebase.js"

  export default {
    name: 'CDetailsGallery',
    props: {
      chrisvenue: Object
    },
    data () {
      return {
        uploadValue: 0,
        img1: '',
        logoImageData: null,
        mainImageData: null,
        imageData: null,
        imagesData: Array(10)
      }
    },
    mounted () {
      this.chrisvenue.image.length = 10
    },
    methods: {
      prepareUpload(event, arg) {
        console.log('++++++++++', arg)
        switch (arg) {
          case 'logo':
            this.logoImageData = event.target.files[0]
            break
          case 'main':
            this.mainImageData = event.target.files[0]
            break
          case 'gallery1':
            this.imagesData[0] = event.target.files[0]
            break
          case 'gallery2':
            this.imagesData[1] = event.target.files[0]
            break
          case 'gallery3':
            this.imagesData[2] = event.target.files[0]
            break
          case 'gallery4':
            this.imagesData[3] = event.target.files[0]
            break
          case 'gallery5':
            this.imagesData[4] = event.target.files[0]
            break
          case 'gallery6':
            this.imagesData[5] = event.target.files[0]
            break
          case 'gallery7':
            this.imagesData[6] = event.target.files[0]
            break
          case 'gallery8':
            this.imagesData[9] = event.target.files[0]
            break
          case 'gallery9':
            this.imagesData[10] = event.target.files[0]
            break
          case 'gallery1':
            this.imagesData[0] = event.target.files[0]
            break
          default:
            break
        }
      },
      async uploadImage(arg) {
        console.log('++++++++++')
        switch (arg) {
          case 'logo':
            this.imageData=this.logoImageData
            break
          case 'main':
            this.imageData=this.mainImageData
            break
          case 'gallery1':
            this.imageData=this.imagesData[0]
            break
          case 'gallery2':
            this.imageData=this.imagesData[1]
            break
          case 'gallery3':
            this.imageData=this.imagesData[2]
            break
          case 'gallery4':
            this.imageData=this.imagesData[3]
            break
          case 'gallery5':
            this.imageData=this.imagesData[4]
            break
          case 'gallery6':
            this.imageData=this.imagesData[5]
            break
          case 'gallery7':
            this.imageData=this.imagesData[6]
            break
          case 'gallery8':
            this.imageData=this.imagesData[7]
            break
          case 'gallery9':
            this.imageData=this.imagesData[8]
            break
          case 'gallery10':
            this.imageData=this.imagesData[9]
            break
          default:
            break
        }
        let image_url=null
        const storageRef=firebase.storage().ref(`images/${this.imageData.name}`).put(this.imageData);
        storageRef.on(`state_changed`,snapshot=>{
            this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
          }, error=>{console.log(error.message)},
          ()=>{this.uploadValue=100;
            storageRef.snapshot.ref.getDownloadURL().then((url)=>{
              image_url=url
              console.log(image_url)
              switch (arg) {
                case 'logo':
                  this.chrisvenue.logoimage=image_url
                  break
                case 'main':
                  this.chrisvenue.mainimage=image_url
                  break
                case 'gallery1':
                  this.chrisvenue.image[0] = image_url
                  break
                case 'gallery2':
                  this.chrisvenue.image[1] = image_url
                  break
                case 'gallery3':
                  this.chrisvenue.image[2] = image_url
                  break
                case 'gallery4':
                  this.chrisvenue.image[3] = image_url
                  break
                case 'gallery5':
                  this.chrisvenue.image[4] = image_url
                  break
                case 'gallery6':
                  this.chrisvenue.image[5] = image_url
                  break
                case 'gallery7':
                  this.chrisvenue.image[6] = image_url
                  break
                case 'gallery8':
                  this.chrisvenue.image[7] = image_url
                  break
                case 'gallery9':
                  this.chrisvenue.image[8] = image_url
                  break
                case 'gallery10':
                  this.chrisvenue.image[9] = image_url
                  break
                default:
                  break
              }
            });
          }
        );
      },
    }
  }
</script>
