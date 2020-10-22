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
          <CRow>
            <CCol sm="4">
              <CRow class="mb-1">
                <CButton @click="chooseFront" class="px-4" color="success">Choose a front photo</CButton>
                <input
                  type="file"
                  ref="input_front"
                  style="display: none"
                  @change="previewImage($event, 0)"
                  accept="image/*"
                />
              </CRow>
              <CRow class="mb-1">
                <img :src="userdata.IDnationalfront" width="200px"/>
              </CRow>
            </CCol>
            <CCol sm="4">
              <CRow class="mb-1">
                <CButton @click="chooseBack" class="px-4" color="success">Choose a back photo</CButton>
                <input
                  type="file"
                  ref="input_back"
                  style="display: none"
                  @change="previewImage($event, 1)"
                  accept="image/*"
                />
              </CRow>
              <CRow class="mb-1">
                <img :src="userdata.IDnationalback" width="200px"/>
              </CRow>
            </CCol>
            <CCol sm="4">
              <CRow class="mb-1">
                <CButton @click="chooseTrade" class="px-4" color="success">Choose a trade license</CButton>
                <input
                  type="file"
                  ref="input_trade"
                  style="display: none"
                  @change="previewImage($event, 2)"
                  accept="image/*"
                />
              </CRow>
              <CRow class="mb-1">
                <img :src="userdata.IDtradelicense" width="200px"/>
              </CRow>
            </CCol>
          </CRow>
        </CCardBody>
        <CCardFooter>
          <CRow>
            <CCol col="4" />
            <CCol>
              <CButton class="px-4" type="submit" color="danger" @click="updateUserData">Save</CButton>
            </CCol>
          </CRow>
        </CCardFooter>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
  import firebase from 'firebase'
  import { db, auth } from './../../firebase.js'

  export default {
    name: 'IDCardDetail',
    data () {
      return {
        alertText: "",
        alertColor: "info",
        dismissSecs: 5,
        dismissCountDown: 0,
        imageData: Array(3),
        uploadValue: 0,
        userdata: {
          IDnationalfront: "",
          IDnationalback: "",
          IDtradelicense: "",
        },
      }
    },
    async created() {
      await this.getCurrentUser()

      await db.collection('users')
        .doc(this.currentUser.uid)
        .get()
        .then((doc) => {
          this.userdata= {
            ...doc.data(),
            IDnationalfront: doc.data().IDnationalfront ? doc.data().IDnationalfront : "",
            IDnationalback: doc.data().IDnationalback ? doc.data().IDnationalback : "",
            IDtradelicense: doc.data().IDtradelicense ? doc.data().IDtradelicense : ""
          }
        })
        .catch((error) => {
          this.alertText = "Read user data error!"
          this.alertColor = "danger"
          this.showAlert ()
        })
    },
    methods: {
      async getCurrentUser() {
        const query = db.collection('users').doc(auth.currentUser.uid)
        await query.get()
          .then((doc) => {
            this.currentUser = doc.data()
          })
      },
      showAlert () {
        this.dismissCountDown = this.dismissSecs
      },
      updateUserData() {
        let dbRef = db.collection('users').doc(this.currentUser.uid)
        dbRef.update(this.userdata).then(() => {
          this.alertText = "ID card and trade license successfully updated!"
          this.alertColor = "success"
          this.showAlert ()
        }).catch((error) =>{
          this.alertText = "ID card and trade license update failed!"
          this.alertColor = "danger"
          this.showAlert ()
          console.log(error)
        })
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
            this.userdata.IDnationalfront=""
            this.imageData[0]=event.target.files[0];
            break
          case 1:
            this.userdata.IDnationalback=""
            this.imageData[1]=event.target.files[0];
            break
          case 2:
            this.userdata.IDtradelicense=""
            this.imageData[2]=event.target.files[0];
            break
          default:
            break
        }

        this.uploadValue=0;
        this.onUpload(arg)
      },
      onUpload(arg){
        const storageRef=firebase.storage().ref(`images/${this.imageData[arg].name}`).put(this.imageData[arg]);
        storageRef.on(`state_changed`,snapshot=>{
            this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
          }, error=>{console.log(error.message)},
          ()=>{this.uploadValue=100;
            storageRef.snapshot.ref.getDownloadURL().then((url)=>{
              switch (arg) {
                case 0:
                  this.userdata.IDnationalfront=url
                  break
                case 1:
                  this.userdata.IDnationalback=url
                  break
                case 2:
                  this.userdata.IDtradelicense=url
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
