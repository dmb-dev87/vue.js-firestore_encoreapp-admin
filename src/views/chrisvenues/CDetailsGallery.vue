<template>
  <CRow>
    <CCol md="12">
      <CCard>
        <CCardBody>
          <CForm>
            <CRow class="mb-1">
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
            <CRow class="mb-3">
              <CCol sm="3" />
              <CCol sm="7">
                <CLink href="chrisvenue.logoimage">{{chrisvenue.logoimage}}</CLink>
              </CCol>
              <CCol sm="2" class="mt-2 text-left">
                <p>{{logo_state}}</p>
              </CCol>
            </CRow>
            <CRow class="mb-1">
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
            <CRow class="mb-3">
              <CCol sm="3" />
              <CCol sm="7">
                <CLink href="chrisvenue.mainimage">{{chrisvenue.mainimage}}</CLink>
              </CCol>
              <CCol sm="2" class="mt-2 text-left">
                <p>{{main_state}}</p>
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
                  <CLink href="chrisvenue.image[index]">{{chrisvenue.image[index]}}</CLink>
                </CCol>
                <CCol sm="2" class="mt-2 text-left">
                  <p>{{gallery_state[index]}}</p>
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

  export default {
    name: 'CDetailsGallery',
    props: {
      chrisvenue: Object
    },
    data () {
      return {
        uploadValue: 0,
        logoImageData: null,
        mainImageData: null,
        imageData: null,
        imagesData: Array(10),
        logo_state: "",
        main_state: "",
        gallery_state: [
          "", "", "", "", "", "", "", "", "", "",
        ]
      }
    },
    mounted () {
      this.chrisvenue.image.length = 10
    },
    methods: {
      prepareUpload(event, arg) {
        switch (arg) {
          case 'logo':
            this.logo_state = ""
            this.logoImageData = event.target.files[0]
            break
          case 'main':
            this.main_state = ""
            this.mainImageData = event.target.files[0]
            break
          case 'gallery1':
            this.gallery_state[0] = ""
            this.imagesData[0] = event.target.files[0]
            break
          case 'gallery2':
            this.gallery_state[1] = ""
            this.imagesData[1] = event.target.files[0]
            break
          case 'gallery3':
            this.gallery_state[2] = ""
            this.imagesData[2] = event.target.files[0]
            break
          case 'gallery4':
            this.gallery_state[3] = ""
            this.imagesData[3] = event.target.files[0]
            break
          case 'gallery5':
            this.gallery_state[4] = ""
            this.imagesData[4] = event.target.files[0]
            break
          case 'gallery6':
            this.gallery_state[5] = ""
            this.imagesData[5] = event.target.files[0]
            break
          case 'gallery7':
            this.gallery_state[6] = ""
            this.imagesData[6] = event.target.files[0]
            break
          case 'gallery8':
            this.gallery_state[7] = ""
            this.imagesData[7] = event.target.files[0]
            break
          case 'gallery9':
            this.gallery_state[8] = ""
            this.imagesData[8] = event.target.files[0]
            break
          case 'gallery10':
            this.gallery_state[9] = ""
            this.imagesData[9] = event.target.files[0]
            break
          default:
            break
        }
      },
      async uploadImage(arg) {
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
            switch (arg) {
              case 'logo':
                this.logo_state = this.uploadValue + " %"
                break
              case 'main':
                this.main_state = this.uploadValue + " %"
                break
              case 'gallery1':
                this.gallery_state[0] = this.uploadValue + " %"
                break
              case 'gallery2':
                this.gallery_state[1] = this.uploadValue + " %"
                break
              case 'gallery3':
                this.gallery_state[2] = this.uploadValue + " %"
                break
              case 'gallery4':
                this.gallery_state[3] = this.uploadValue + " %"
                break
              case 'gallery5':
                this.gallery_state[4] = this.uploadValue + " %"
                break
              case 'gallery6':
                this.gallery_state[5] = this.uploadValue + " %"
                break
              case 'gallery7':
                this.gallery_state[6] = this.uploadValue + " %"
                break
              case 'gallery8':
                this.gallery_state[7] = this.uploadValue + " %"
                break
              case 'gallery9':
                this.gallery_state[8] = this.uploadValue + " %"
                break
              case 'gallery10':
                this.gallery_state[9] = this.uploadValue + " %"
                break
              default:
                break
            }
          }, error=>{
            
          },
          ()=>{this.uploadValue=100;
            storageRef.snapshot.ref.getDownloadURL().then((url)=>{
              image_url=url
              switch (arg) {
                case 'logo':
                  this.logo_state = "Done"
                  this.chrisvenue.logoimage=image_url
                  break
                case 'main':
                  this.main_state = "Done"
                  this.chrisvenue.mainimage=image_url
                  break
                case 'gallery1':
                  this.gallery_state[0] = "Done"
                  this.chrisvenue.image[0] = image_url
                  break
                case 'gallery2':
                  this.gallery_state[1] = "Done"
                  this.chrisvenue.image[1] = image_url
                  break
                case 'gallery3':
                  this.gallery_state[2] = "Done"
                  this.chrisvenue.image[2] = image_url
                  break
                case 'gallery4':
                  this.gallery_state[3] = "Done"
                  this.chrisvenue.image[3] = image_url
                  break
                case 'gallery5':
                  this.gallery_state[4] = "Done"
                  this.chrisvenue.image[4] = image_url
                  break
                case 'gallery6':
                  this.gallery_state[5] = "Done"
                  this.chrisvenue.image[5] = image_url
                  break
                case 'gallery7':
                  this.gallery_state[6] = "Done"
                  this.chrisvenue.image[6] = image_url
                  break
                case 'gallery8':
                  this.gallery_state[7] = "Done"
                  this.chrisvenue.image[7] = image_url
                  break
                case 'gallery9':
                  this.gallery_state[8] = "Done"
                  this.chrisvenue.image[8] = image_url
                  break
                case 'gallery10':
                  this.gallery_state[9] = "Done"
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
