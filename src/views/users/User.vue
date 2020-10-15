<template>
  <CRow>
    <CCol col="12" lg="12">
      <CCard>
        <CCardHeader>
          User id:  {{ $route.params.id }}
        </CCardHeader>
        <CCardBody>
          <CForm>
            <CInput
              label="User Name:"
              placeholder="Type user name"
              horizontal
              :value="userData.username"
              v-model="userData.username"
            />
            <CInput
              label="Email:"
              placeholder="Type user email"
              horizontal
              :value="userData.email"
              v-model="userData.email"
            />
            <CInput
              label="Gender:"
              placeholder="Type user gender"
              horizontal
              :value="userData.gender"
              v-model="userData.gender"
            />
            <CInput
              label="Birthday:"
              placeholder="Type user birthday"
              horizontal
              :value="userData.dob"
              v-model="userData.dob"
            />
            <CInput
              label="Country:"
              placeholder="Type user country"
              horizontal
              :value="userData.country"
              v-model="userData.country"
            />
            <CInput
              label="PhoneNumber:"
              placeholder="Type user phone number"
              horizontal
              :value="userData.mobilenumber"
              v-model="userData.mobilenumber"
            />
            <CInput
              label="Registered:"
              horizontal
              :disabled="true"
              :value="userData.createAt"
              v-model="userData.createAt"
            />
            <CInput
              label="ProfileImage:"
              horizontal
              :value="userData.profileImage"
              v-model="userData.profileImage"
            />
          </CForm>
        </CCardBody>
        <CCardFooter>
          <CRow>
            <CCol col="3" />
            <CCol>
              <CButton class="px-4 mr-2" color="primary" @click="goBack">Back</CButton>
              <CButton class="px-4" type="submit" color="danger" @click="updateUserData">Save</CButton>
            </CCol>
          </CRow>
        </CCardFooter>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import { db } from './../../firebase.js'
export default {
  name: 'User',
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.usersOpened = from.fullPath.includes('users')
    })
  },
  data () {
    return {
      userData: {
      },
      usersOpened: null
    }
  },
  created() {
    let dbRef = db.collection('users').doc(this.$route.params.id)
    dbRef.get().then((doc) => {
      this.userData = doc.data()
      console.log(this.userData)
    }).catch((error) => {
      console.log(error)
    })
  },
  methods: {
    goBack() {
      this.usersOpened ? this.$router.go(-1) : this.$router.push({path: '/users'})
    },
    updateUserData() {
      console.log(this.userData);
      let dbRef = db.collection('users').doc(this.$route.params.id)
      dbRef.update(this.userData).then(() => {
        console.log("User successfully updated!")
      }).catch((error) =>{
        console.log(error)
      })
    }
  }
}
</script>
