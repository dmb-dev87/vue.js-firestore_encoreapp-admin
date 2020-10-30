<template>
  <div class="wrapper">
    <div>
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
                    <CLink :href="chrisvenue.logoimage">{{chrisvenue.logoimage}}</CLink>
                  </CCol>
                  <CCol sm="2">
                    <CButton color="success" @click="showUploadModal('logo')">Upload</CButton>
                  </CCol>
                </CRow>
                <!--<CProgress v-show="this.argtype=='logo'" class="mb-1" :value="uploadValue" :max="max" show-percentage animated></CProgress>-->
                <CRow class="mb-2">
                  <CCol sm="3" class="col-form-label" tag="label">
                    *Main Image:
                  </CCol>
                  <CCol sm="7">
                    <CLink :href="chrisvenue.mainimage">{{chrisvenue.mainimage}}</CLink>
                  </CCol>
                  <CCol sm="2">
                    <CButton color="success" @click="showUploadModal('main')">Upload</CButton>
                  </CCol>
                </CRow>
                <!--<CProgress v-show="this.argtype==='main'" class="mb-1" :value="uploadValue" :max="max" show-percentage animated></CProgress>-->
                <hr class="mt-1 mb-2">
                <template class="mb-2" v-for="(image, index) in imagesData">
                  <CRow class="mb-2">
                    <CCol sm="3" class="col-form-label" tag="label">
                      {{`Gallery Image ${index+1}`}}:
                    </CCol>
                    <CCol sm="7">
                      <CLink
                        :href="chrisvenue.image && chrisvenue.image.length > index ? chrisvenue.image[index] : image"
                      >
                        {{chrisvenue.image && chrisvenue.image.length > index ? chrisvenue.image[index] : image}}
                      </CLink>
                    </CCol>
                    <CCol sm="2">
                      <CButton color="success" @click="showUploadModal(index)">Upload</CButton>
                    </CCol>
                  </CRow>
                  <!--<CProgress v-show="this.argtype==index" class="mb-1" :value="gallery_st" :max="max" show-percentage animated></CProgress>-->
                </template>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
    <CModal
      title="Modal title"
      :show.sync="cropperModal"
      size="xl"
    >
      <cropper
        class="upload-example-cropper"
        ref="cropper"
        :src="imageData"
        :size-restrictions-algorithm="pixelsRestriction"
        :stencil-props="{handlers: {}, movable: true, scalable: true, aspectRatio: 1, }"
      />
      <div class="button-wrapper">
        <span class="button" @click="$refs.file.click()">
          <input type="file" ref="file" @change="loadImage($event)" accept="image/*">
          Select Image
        </span>
      </div>
      <template #footer>
        <CButton @click="cropperModal = false" color="danger">Discard</CButton>
        <CButton @click="uploadImage" color="success">Upload</CButton>
      </template>
    </CModal>
  </div>
</template>

<script>
  import firebase from "firebase"
  import { Cropper } from 'vue-advanced-cropper'

  export default {
    name: 'CDetailsGallery',
    components: {
        Cropper,
    },
    props: {
      chrisvenue: Object
    },
    data () {
      return {
        uploadValue: 0,
        imageData: null,
        logo_state: 0,
        main_state: 0,
        gallery_st: 0,
        imageIndex: 0,
        cropperModal: false,
        argtype: "",
        imagesData: Array(10),
      }
    },
    methods: {
      pixelsRestriction({ minWidth, minHeight, maxWidth, maxHeight, imageWidth, imageHeight }) {
        return {
          minWidth: 300,
          minHeight: 300,
          maxWidth: 1000,
          maxHeight: 1000,
        };
      },
      showUploadModal(arg) {
        // this.imageData = null
        this.argtype = arg
        this.cropperModal = true
      },
      loadImage(event) {
        var input = event.target;
        if (input.files && input.files[0]) {
          var reader = new FileReader();
          reader.onload = (e) => {
            this.imageData = e.target.result;
          };
          reader.readAsDataURL(input.files[0]);
        }
      },
      uploadImage() {
        const { canvas } = this.$refs.cropper.getResult();
        if (canvas) {
          canvas.toBlob(blob => {
            const storageRef=firebase.storage().ref(`images/`).put(blob)
            storageRef.on(`state_changed`, snapshot=>{
              this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100
            }, error => {
              this.uploadValue = 0
              this.cropperModal = false
            },
            () => {
              storageRef.snapshot.ref.getDownloadURL().then((url) => {
                this.uploadValue = 0
                switch (this.argtype) {
                  case 'logo':
                    this.chrisvenue.logoimage = url
                    break
                  case 'main':
                    this.chrisvenue.mainimage = url
                    break
                  default:
                    this.chrisvenue.image[this.argtype] = url
                    break
                }
                this.cropperModal = false
              })
            })
          })
        }
      },
    }
  }
</script>
<style>
  .upload-example-cropper {
    border: solid 1px #EEE;
  }

  .button-wrapper {
    display: flex;
    justify-content: center;
    margin-top: 17px;
  }

  .button {
    color: white;
    font-size: 16px;
    padding: 10px 20px;
    background: #3fb37f;
    cursor: pointer;
    transition: background 0.5s;
  }

  .button:hover {
    background: #38d890;
  }

  .button input {
    display: none;
  }
</style>