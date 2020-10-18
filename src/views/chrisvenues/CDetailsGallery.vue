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
                  @change="prepareUpload"
                />
              </CCol>
              <CCol sm="2">
                <CButton color="success" @click="uploadImage">Upload</CButton>
              </CCol>
            </CRow>
            <CRow class="mb-2">
              <CCol sm="3" />
              <CCol sm="9">
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
                />
              </CCol>
              <CCol sm="2">
                <CButton color="success">Upload</CButton>
              </CCol>
            </CRow>
            <CRow class="mb-2">
              <CCol sm="3" />
              <CCol sm="9">
                <CLink :href="chrisvenue.mainimage">{{chrisvenue.mainimage}}</CLink>
              </CCol>
            </CRow>
            <hr class="mt-1 mb-3">
            <CRow class="mb-2">
              <CCol sm="3" class="col-form-label" tag="label">
                Gallery Image 1:
              </CCol>
              <CCol sm="7">
                <input
                  type="file"
                  placeholder="Choose file"
                  horizontal
                />
              </CCol>
              <CCol sm="2">
                <CButton color="success">Upload</CButton>
              </CCol>
            </CRow>
            <CRow class="mb-2">
              <CCol sm="3" />
              <CCol sm="9">
                <CLink :href="chrisvenue.image[0]">{{chrisvenue.image[0]}}</CLink>
              </CCol>
            </CRow>
            <CRow class="mb-2">
              <CCol sm="3" class="col-form-label" tag="label">
                Gallery Image 2:
              </CCol>
              <CCol sm="7">
                <input
                  type="file"
                  placeholder="Choose file"
                  horizontal
                  @change="prepareUpload"
                />
              </CCol>
              <CCol sm="2">
                <CButton color="success">Upload</CButton>
              </CCol>
            </CRow>
            <CRow class="mb-2">
              <CCol sm="3" />
              <CCol sm="9">
                <CLink :href="chrisvenue.image[1]">{{chrisvenue.image[1]}}</CLink>
              </CCol>
            </CRow>
            <CRow class="mb-2">
              <CCol sm="3" class="col-form-label" tag="label">
                Gallery Image 3:
              </CCol>
              <CCol sm="7">
                <input
                  type="file"
                  placeholder="Choose file"
                  horizontal
                />
              </CCol>
              <CCol sm="2">
                <CButton color="success">Upload</CButton>
              </CCol>
            </CRow>
            <CRow class="mb-2">
              <CCol sm="3" />
              <CCol sm="9">
                <CLink :href="chrisvenue.image[2]">{{chrisvenue.image[2]}}</CLink>
              </CCol>
            </CRow>
            <CRow class="mb-2">
              <CCol sm="3" class="col-form-label" tag="label">
                Gallery Image 4:
              </CCol>
              <CCol sm="7">
                <input
                  type="file"
                  placeholder="Choose file"
                  horizontal
                />
              </CCol>
              <CCol sm="2">
                <CButton color="success">Upload</CButton>
              </CCol>
            </CRow>
            <CRow class="mb-2">
              <CCol sm="3" />
              <CCol sm="9">
                <CLink :href="chrisvenue.image[3]">{{chrisvenue.image[3]}}</CLink>
              </CCol>
            </CRow>
            <CRow class="mb-2">
              <CCol sm="3" class="col-form-label" tag="label">
                Gallery Image 5:
              </CCol>
              <CCol sm="7">
                <input
                  type="file"
                  placeholder="Choose file"
                  horizontal
                />
              </CCol>
              <CCol sm="2">
                <CButton color="success">Upload</CButton>
              </CCol>
            </CRow>
            <CRow class="mb-2">
              <CCol sm="3" />
              <CCol sm="9">
                <CLink :href="chrisvenue.image[4]">{{chrisvenue.image[4]}}</CLink>
              </CCol>
            </CRow>
            <CRow class="mb-2">
              <CCol sm="3" class="col-form-label" tag="label">
                Gallery Image 6:
              </CCol>
              <CCol sm="7">
                <input
                  type="file"
                  placeholder="Choose file"
                  horizontal
                />
              </CCol>
              <CCol sm="2">
                <CButton color="success">Upload</CButton>
              </CCol>
            </CRow>
            <CRow class="mb-2">
              <CCol sm="3" />
              <CCol sm="9">
                <CLink :href="chrisvenue.image[5]">{{chrisvenue.image[5]}}</CLink>
              </CCol>
            </CRow>
            <CRow class="mb-2">
              <CCol sm="3" class="col-form-label" tag="label">
                Gallery Image 7:
              </CCol>
              <CCol sm="7">
                <input
                  type="file"
                  placeholder="Choose file"
                  horizontal
                />
              </CCol>
              <CCol sm="2">
                <CButton color="success">Upload</CButton>
              </CCol>
            </CRow>
            <CRow class="mb-2">
              <CCol sm="3" />
              <CCol sm="9">
                <CLink :href="chrisvenue.image[6]">{{chrisvenue.image[6]}}</CLink>
              </CCol>
            </CRow>
            <CRow class="mb-2">
              <CCol sm="3" class="col-form-label" tag="label">
                Gallery Image 8:
              </CCol>
              <CCol sm="7">
                <input
                  type="file"
                  placeholder="Choose file"
                  horizontal
                />
              </CCol>
              <CCol sm="2">
                <CButton color="success">Upload</CButton>
              </CCol>
            </CRow>
            <CRow class="mb-2">
              <CCol sm="3" />
              <CCol sm="9">
                <CLink :href="chrisvenue.image[7]">{{chrisvenue.image[7]}}</CLink>
              </CCol>
            </CRow>
            <CRow class="mb-2">
              <CCol sm="3" class="col-form-label" tag="label">
                Gallery Image 9:
              </CCol>
              <CCol sm="7">
                <input
                  type="file"
                  placeholder="Choose file"
                  horizontal
                />
              </CCol>
              <CCol sm="2">
                <CButton color="success">Upload</CButton>
              </CCol>
            </CRow>
            <CRow class="mb-2">
              <CCol sm="3" />
              <CCol sm="9">
                <CLink :href="chrisvenue.image[8]">{{chrisvenue.image[8]}}</CLink>
              </CCol>
            </CRow>
            <CRow class="mb-2">
              <CCol sm="3" class="col-form-label" tag="label">
                Gallery Image 10:
              </CCol>
              <CCol sm="7">
                <input
                  type="file"
                  placeholder="Choose file"
                  horizontal
                />
              </CCol>
              <CCol sm="2">
                <CButton color="success">Upload</CButton>
              </CCol>
            </CRow>
            <CRow class="mb-2">
              <CCol sm="3" />
              <CCol sm="9">
                <CLink :href="chrisvenue.image[9]">{{chrisvenue.image[9]}}</CLink>
              </CCol>
            </CRow>
          </CForm>
          <CRow>
            <CCol sm="3" />
            <CCol sm="9">
              <CButton class="px-4" type="submit" color="danger"><CIcon name="cil-check-circle"/> Save and go to next</CButton>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
  import firebase from "./../../firebase"

  export default {
    name: 'CDetailsGallery',
    props: {
      chrisvenue: Object
    },
    data () {
      return {
        uploadValue: 0,
        img1: '',
        imageData: null
      }
    },
    methods: {
      prepareUpload(event) {
        console.log('++++++++++')
        this.imageData = event.target.files[0]
        console.log('++++++++++', event.target.files[0])
      },
      async uploadImage() {
        console.log('++++++++++')
        this.img1=null

        let storageRef = firebase.storage().ref()
        let imageRef = storageRef.child(`images/${this.imageData.name}`);

        await imageRef.put(file);

        let downloadURL = await imageRef.getDownloadURL();

        //this.images.push({ src: downloadURL });
        console.log('++++++++', downloadURL)
      },
    }
  }
</script>
