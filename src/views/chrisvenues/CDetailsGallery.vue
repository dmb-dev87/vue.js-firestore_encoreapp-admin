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
            <CRow class="mb-1">
              <CCol sm="3" />
              <CCol sm="7">
                <CLink :href="chrisvenue.logoimage">{{chrisvenue.logoimage}}</CLink>
              </CCol>
            </CRow>
            <CProgress class="mb-1" :value="logo_state" :max="max" show-percentage animated></CProgress>
            <CRow class="mb-2">
              <CCol sm="3" class="col-form-label" tag="label">
                *Main Image:
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
            <CRow class="mb-1">
              <CCol sm="3" />
              <CCol sm="7">
                <CLink :href="chrisvenue.mainimage">{{chrisvenue.mainimage}}</CLink>
              </CCol>
            </CRow>
            <CProgress class="mb-1" :value="main_state" :max="max" show-percentage animated></CProgress>
            <hr class="mt-1 mb-2">
            <template class="mb-2" v-for="(image, index) in imagesData">
              <CRow class="mb-2">
                <CCol sm="3" class="col-form-label" tag="label">
                  {{`Gallery Image ${index+1}`}}:
                </CCol>
                <CCol sm="7">
                  <input
                    type="file"
                    placeholder="Choose file"
                    horizontal
                    ref="`gallery_image${index+1}`"
                    @change="prepareUpload($event, index)"
                  />
                </CCol>
                <CCol sm="2">
                  <CButton color="success" @click="uploadImage(index)">Upload</CButton>
                </CCol>
              </CRow>
              <CRow class="mb-1">
                <CCol sm="3" />
                <CCol sm="7">
                  <CLink :href="chrisvenue.image[index]">{{chrisvenue.image[index]}}</CLink>
                </CCol>
              </CRow>
              <CProgress v-show="index==imageIndex" class="mb-1" :value="gallery_st" :max="max" show-percentage animated></CProgress>
            </template>
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
        logoImageData: null,
        mainImageData: null,
        imageData: null,
        imagesData: Array(10),
        logo_state: 0,
        main_state: 0,
        gallery_st: 0,
        imageIndex: 0,
        max: 100,
      }
    },
    methods: {
      prepareUpload(event, arg) {
        console.log("++++++++++", arg)
        switch (arg) {
          case 'logo':
            this.logo_state = 0
            this.logoImageData = event.target.files[0]
            break
          case 'main':
            this.main_state = 0
            this.mainImageData = event.target.files[0]
            break
          default:
            this.imageIndex = arg;
            this.gallery_st = 0
            this.imagesData[arg] = event.target.files[0]
            break
        }
      },
      uploadImage(arg) {
        console.log("++++++++++", arg)
        switch (arg) {
          case 'logo':
            this.imageData = this.logoImageData
            break
          case 'main':
            this.imageData = this.mainImageData
            break
          default:
            this.imageData = this.imagesData[arg]
            break
        }
        const storageRef=firebase.storage().ref(`images/${this.imageData.name}`).put(this.imageData)
        storageRef.on(`state_changed`,snapshot=>{
          switch (arg) {
            case 'logo':
              this.logo_state = (snapshot.bytesTransferred/snapshot.totalBytes)*100
              break
            case 'main':
              this.main_state = (snapshot.bytesTransferred/snapshot.totalBytes)*100
              break
            default:
              this.imageIndex = arg;
              this.gallery_st = (snapshot.bytesTransferred/snapshot.totalBytes)*100
              console.log("++++++++++", this.gallery_state[arg])
              break
          }
        }, error=>{
            
        },
        ()=>{
          storageRef.snapshot.ref.getDownloadURL().then((url)=>{
            switch (arg) {
              case 'logo':
                this.logo_state = 0
                this.chrisvenue.logoimage=url
                break
              case 'main':
                this.main_state = 0
                this.chrisvenue.mainimage=url
                break
              default:
                this.gallery_st = 0
                this.imageIndex = arg
                this.chrisvenue.image[arg]=url
                break
            }
          });
        });
      },
    }
  }
</script>
