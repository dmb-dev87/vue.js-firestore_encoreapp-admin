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
                :color="alertColor"
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
                  style="display: none"
                  @change="previewImage"
                  accept="image/*"
                  ref="input1"
                />
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
  import firebase from 'firebase'
  import { db } from './../../firebase.js'

  export default {
    name: 'CategoryDetail',
    data () {
      return {
        uploadValue: 0,
        alertText: "",
        alertColor: "info",
        dismissSecs: 5,
        dismissCountDown: 0,
        imageData: null,
        categoryData: {
        },
      }
    },
    created() {
      if (this.$route.params.id)
      {
        let dbRef = db.collection('category').doc(this.$route.params.id)
        dbRef.get().then((doc) => {
          this.categoryData = doc.data()
        }).catch((error) => {
        })
      } else {
        this.categoryData = {
          category_image: "",
          category_id: "",
          category_name: ""
        }
      }
    },
    methods: {
      showAlert () {
        this.dismissCountDown = this.dismissSecs
      },
      goBack() {
        this.$router.push({path: '/categories'})
      },
      updateCategoryData() {
        if (this.$route.params.id === undefined) {
          db.collection("category")
            .add(this.categoryData)
            .then(() => {
              this.alertText = "Category successfully written!"
              this.alertColor = "success"
              this.showAlert ()
            })
            .catch((error) => {
              this.alertText = "Error writing document"
              this.alertColor = "danger"
              this.showAlert ()
            });
        } else {
          let dbRef = db.collection('category').doc(this.$route.params.id)
          dbRef.update(this.categoryData).then(() => {
            this.alertText = "Category successfully updated!"
            this.alertColor = "success"
            this.showAlert ()
          }).catch((error) =>{
            this.alertText = "Error writing document"
            this.alertColor = "error"
            this.showAlert ()
          })
        }
      },
      choosePhoto() {
        this.$refs.input1.click()
      },
      previewImage(event) {
        this.uploadValue=0;
        this.categoryData.category_image=""
        this.imageData = event.target.files[0];
        this.onUpload()
      },
      onUpload(){
        const storageRef=firebase.storage().ref(`images/${this.imageData.name}`).put(this.imageData);
        storageRef.on(`state_changed`,snapshot=>{
            this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
          },
          error=>{

          },
          ()=>{this.uploadValue=100;
            storageRef.snapshot.ref.getDownloadURL().then((url)=>{
              this.categoryData.category_image=url
            });
          }
        );
      },
    }
  }
</script>
