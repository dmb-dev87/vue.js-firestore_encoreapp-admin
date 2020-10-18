<template>
  <CRow>
    <CCol col="9" lg="9">
      <CCard>
        <CCardHeader>
          <CRow>
            <CCol sm="6">
              Category id:  {{ $route.params.id }}
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
                <img :src="categoryData.category_image" width="200px"/>
              </CRow>
            </CCol>
            <CCol sm="9">
              <CInput
                label="Id:"
                placeholder="Type category id"
                horizontal
                :value="categoryData.category_id"
                v-model="categoryData.category_id"
              />
              <CInput
                label="Name:"
                placeholder="Type category name"
                horizontal
                :value="categoryData.category_name"
                v-model="categoryData.category_name"
              />
            </CCol>
          </CRow>
        </CCardBody>
        <CCardFooter>
          <CRow>
            <CCol col="3" />
            <CCol>
              <CButton class="px-4 mr-2" color="primary" @click="goBack">Back</CButton>
              <CButton class="px-4" type="submit" color="danger" @click="updateCategoryData">Save</CButton>
            </CCol>
          </CRow>
        </CCardFooter>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
  import firebase from './../../firebase.js'
  import { db } from './../../firebase.js'

  export default {
    name: 'CategoryDetail',
    data () {
      return {
        alertText: "",
        dismissSecs: 5,
        dismissCountDown: 0,
        imageData: null,
        categoryData: {

        },
      }
    },
    created() {
      let dbRef = db.collection('category').doc(this.$route.params.id)
      dbRef.get().then((doc) => {
        this.categoryData = doc.data()
        console.log(this.categoryData)
      }).catch((error) => {
        console.log(error)
      })
    },
    methods: {
      showAlert () {
        this.dismissCountDown = this.dismissSecs
      },
      goBack() {
        this.$router.push({path: '/categories'})
      },
      updateCategoryData() {
        console.log("++++++++++++", this.categoryData)
        console.log("++++++++++++", this.$route.params.id)

        if (this.$route.params.id === undefined) {
          db.collection("category")
            .add(this.categoryData)
            .then(() => {
              this.alertText = "Category successfully written!"
              this.showAlert ()
            })
            .catch((error) => {
              this.alertText = "Error writing document"
              this.showAlert ()
              console.error("Error writing document: ", error);
            });
        } else {
          let dbRef = db.collection('category').doc(this.$route.params.id)
          dbRef.update(this.categoryData).then(() => {
            this.alertText = "Category successfully updated!"
            this.showAlert ()
            console.log("Category successfully updated!")
          }).catch((error) =>{
            this.alertText = "Error writing document"
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
        this.categoryData.category_image=null;
        this.imageData = event.target.files[0];
        this.onUpload()
      },
      onUpload(){
        this.categoryData.category_image=null
        const storageRef=firebase.storage().ref(`${this.imageData.name}`).put(this.imageData);
        storageRef.on(`state_changed`,snapshot=>{
            this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
          }, error=>{console.log(error.message)},
          ()=>{this.uploadValue=100;
            storageRef.snapshot.ref.getDownloadURL().then((url)=>{
              this.categoryData.category_image=url
              console.log(this.img1)
            });
          }
        );
      },
    }
  }
</script>
