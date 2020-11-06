<template>
    <div>
        <CRow>
            <CCol md="4" sm="4">
                <div data-v-8850d83e="" class="card">
                    <div class="card-header content-center text-white p-0 bg-info">
                        <CIcon
                            name="cil-media-play"
                            height="52"
                            class="my-4 mr-4"
                        />
                        <p class="my-4 text-left">
                            CLICK TO WATCH <br/>
                            ONBOARDING VIDEO
                        </p>
                    </div>
                </div>
            </CCol>
            <CCol md="4" sm="4">
                <div data-v-8850d83e="" class="card">
                    <div class="card-header content-center text-white p-0 bg-primary">
                        <CIcon
                            name="cil-envelope-closed"
                            height="52"
                            class="my-4 mr-4"
                        />
                        <CLink class="my-4 text-left" style="color: white;" @click="showModal">
                            CLICK TO SEND <br/>
                            EMAIL TO SUPPORT
                        </CLink>
                    </div>
                </div>
            </CCol>
            <CCol md="4" sm="4">
                <div data-v-8850d83e="" class="card">
                    <div class="card-header content-center text-white p-0 bg-warning">
                        <CIcon
                            name="cil-calculator"
                            height="52"
                            class="my-4 mr-4"
                        />
                        <p class="my-4 text-left">
                            CLICK TO SEE <br/>
                            YOUR BILLING PLAN
                        </p>
                    </div>
                </div>
            </CCol>
        </CRow>
        <CRow>
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
        <CModal
            title="Send Mail to Support"
            :show.sync="myModal"
            size="lg"
            color="primary"
            :hide-footer="true"
        >
            <CRow>
                <CCol col="12">
                    <CForm>
                        <CTextarea
                            label="Mail Content"
                            placeholder="Content..."
                            horizontal
                            rows="5"
                            :value="mailContent"
                            v-model="mailContent"
                        />
                    </CForm>
                </CCol>
            </CRow>
            <template #footer>
                <CButton @click="myModal = false" color="danger">Discard</CButton>
                <CButton @click="sendMail" color="success">Accept</CButton>
            </template>
        </CModal>
    </div>
</template>

<script>
    import {db, auth} from './../../firebase.js'
    import firebase from 'firebase'
    export default {
        name: 'WidgetsFeature',
        components: {
        },
        props: {
        },
        data() {
            return {
                alertColor: "info",
                alertText: "",
                dismissSecs: 5,
                dismissCountDown: 0,
                myModal: false,
                mailContent: "",
            }
        },
        methods: {
            showModal() {
                this.myModal = true
            },
            showAlert () {
                this.dismissCountDown = this.dismissSecs
            },
            sendMail() {
                console.log("+++++++++++++++++++", this.mailContent)
                let helpSupport = {
                    "messaeg": this.mailContent,
                    "user_id": auth.currentUser.uid,
                    "time": firebase.firestore.Timestamp.fromDate(new Date())
                }
                db.collection("help&support")
                    .add(helpSupport)
                    .then(() => {
                        this.alertText = "The mail successfully sent to support!"
                        this.alertColor = "success"
                        this.showAlert ()
                    })
                    .catch((error) => {
                        this.alertColor = "danger"
                        this.alertText = "The mail send failed."
                        this.showAlert ()
                    });
                this.myModal = false
            }
        }
    }
</script>

<style scoped>
    .c-chart-brand {
        position: absolute;
        width: 100%;
        height: 100px;
    }
</style>
