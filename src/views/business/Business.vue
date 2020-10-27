<template>
    <CRow>
        <CCol md="12">
            <CCard>
                <CCardBody>
                    <CForm>
                        <CInput
                            label="*Business name:"
                            placeholder="Business name"
                            horizontal
                            :value="chrisvenue.name"
                            v-model="chrisvenue.name"
                        />
                        <CInput
                            label="*Contact name:"
                            placeholder="Contact name"
                            horizontal
                            :value="chrisvenue.contactperson"
                            v-model="chrisvenue.contactperson"
                        />
                        <CInput
                            label="*Contact person phone:"
                            placeholder="Contact person phone"
                            horizontal
                            autocomplete="number"
                            :value="chrisvenue.contactpersonphone"
                            v-model="chrisvenue.contactpersonphone"
                        />
                        <CInput
                            label="*City:"
                            placeholder="City"
                            horizontal
                            :value="chrisvenue.city"
                            v-model="chrisvenue.city"
                        />
                        <CSelect
                            label="*Country:"
                            horizontal
                            :value.sync="chrisvenue.country"
                            v-model="chrisvenue.country"
                            :options="countries"
                            placeholder="Click to select country"
                        />
                        <CTextarea
                            label="*About the business:"
                            placeholder="Tell us a little bit about your business"
                            horizontal
                            rows="2"
                            :value="chrisvenue.about"
                            v-model="chrisvenue.about"
                        />
                        <CInput
                            label="*Email:"
                            placeholder="Email"
                            horizontal
                            :value="chrisvenue.email"
                            v-model="chrisvenue.email"
                        />
                        <CInput
                            label="*Phone, landline:"
                            placeholder="Phone, landline"
                            horizontal
                            :value="chrisvenue.phonelandline"
                            v-model="chrisvenue.phonelandline"
                        />
                        <CRow>
                            <CCol sm="3" class="col-form-label" tag="label">
                                *Location:
                            </CCol>
                            <CCol sm="4">
                                <CInput
                                    label="Latitude:"
                                    placeholder="Latitude"
                                    horizontal
                                    type="number"
                                    :value="chrisvenue.geolocation.latitude"
                                    v-model="chrisvenue.geolocation.latitude"
                                />
                            </CCol>
                            <CCol sm="4">
                                <CInput
                                    label="Longitude:"
                                    placeholder="Longitude"
                                    horizontal
                                    type="number"
                                    :value="chrisvenue.geolocation.longitude"
                                    v-model="chrisvenue.geolocation.longitude"
                                />
                            </CCol>
                        </CRow>
                        <CSelect
                            label="*Category:"
                            horizontal
                            :value.sync="chrisvenue.category_name"
                            :options="categories"
                        />
                        <CSelect
                            label="*Bronze level discount:"
                            horizontal
                            :value.sync="chrisvenue.discountlevelbronze"
                            :options="levelOptions"
                        />
                        <CSelect
                            label="*Silver level discount: (must be higher than Bronze %)"
                            horizontal
                            :value.sync="chrisvenue.discountlevelsilver"
                            :options="levelOptions"
                            @click="validateValue('silver')"
                        />
                        <CSelect
                            label="*Gold level discount: (must be higher than Silver %)"
                            horizontal
                            :value.sync="chrisvenue.discountlevelgold"
                            :options="levelOptions"
                            @click="validateValue('gold')"
                        />
                        <CSelect
                            label="*Platinum level discount: (must be higher than Gold %)"
                            horizontal
                            :value.sync="chrisvenue.discountlevelplatinum"
                            :options="levelOptions"
                            @click="validateValue('platinum')"
                        />
                        <CInput
                            label="*PIN code:"
                            placeholder="Input PIN code"
                            horizontal
                            :value="chrisvenue.pincode"
                            v-model="chrisvenue.pincode"
                        />
                        <CSelect
                            label="*Minimum purchase:"
                            horizontal
                            :value.sync="chrisvenue.minimumpurchase"
                            :options="purchaseOptions"
                            placeholder="-"
                        />
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
                                    @change="prepareUpload"
                                />
                            </CCol>
                            <CCol sm="2">
                                <CButton color="success" @click="uploadImage">Upload</CButton>
                            </CCol>
                        </CRow>
                        <CRow class="mb-1">
                            <CCol sm="3" />
                            <CCol sm="7">
                                <CLink :href="chrisvenue.mainimage">{{chrisvenue.mainimage}}</CLink>
                            </CCol>
                        </CRow>
                        <CProgress class="mb-1" :value="main_state" :max="max" show-percentage animated></CProgress>
                    </CForm>
                </CCardBody>
                <CCardFooter>
                    <CRow class="mb-3">
                        <CCol sm="3">
                        </CCol>
                        <CCol sm="9">
                            <input
                                    type="checkbox"
                                    :checked="termsAndCond"
                                    @click="updateTermsAndCond"
                            />
                            <strong class="ml-4">
                                I agree to the
                                <CLink href="https://www.encoreapp.net/terms.html">
                                    terms and conditions
                                </CLink>
                            </strong>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol sm="3" />
                        <CCol sm="3">
                            <CButton class="px-4" type="submit" color="danger" @click="saveVenueData"><CIcon name="cil-check-circle"/> Save and Add the Venue</CButton>
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
                </CCardFooter>
            </CCard>
        </CCol>
    </CRow>
</template>

<script>
    import firebase from "firebase"
    import { db, auth } from "./../../firebase.js"
    import countryData from "./../data/CountryData"

    export default {
        name: 'Business',
        data () {
            return {
                countries: countryData,
                levelOptions: [5.00, 7.50, 10.00, 12.50, 15.00, 17.50, 20.00, 22.50, 25.00, 27.50, 30.00, 32.50, 35.00, 37.50, 40.00, 42.50, 45.00, 47.50, 50.00, 52.50, 55.00, 57.50, 60.00],
                purchaseOptions: ["No minimum(recommended)", 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 125, 150, 175, 200],
                alertColor: "info",
                alertText: "",
                dismissSecs: 5,
                dismissCountDown: 0,
                termsAndCond: false,
                mainImageData: null,
                main_state: 0,
                max: 100,
                categories: [],
                chrisvenue: {
                    name: "",
                    contactperson: "",
                    contactpersonphone: "",
                    city: "",
                    country: "",
                    about: "",
                    email: "",
                    phonelandline: "",
                    phonemobile: "",
                    category_name: "",
                    geolocation: {
                        latitude: 0.0,
                        longitude: 0.0
                    },
                    discountlevelbronze: 5,
                    discountlevelsilver: 5,
                    discountlevelgold: 5,
                    discountlevelplatinum: 5,
                    pincode: "",
                    minimumpurchase: "No minimum(recommended)",
                    owner: "",
                    mainimage: ""
                },
            }
        },
        created() {
            db.collection('category').onSnapshot((snapshotChange) => {
                this.categories = []
                snapshotChange.forEach((doc) => {
                    this.categories.push(
                        doc.data().category_name
                    )
                })
            })
        },
        mounted() {
        },
        methods: {
            showAlert () {
                this.dismissCountDown = this.dismissSecs
            },
            validateFields() {
                if (this.chrisvenue.name === undefined || this.chrisvenue.name === "") {
                    this.alertText = "Please input Venue name!"
                    this.alertColor = "danger"
                    this.showAlert()
                    return false
                }

                if (this.chrisvenue.contactperson === undefined || this.chrisvenue.contactperson === "") {
                    this.alertText = "Please type Contact name!"
                    this.alertColor = "danger"
                    this.showAlert()
                    return false
                }

                if (this.chrisvenue.contactpersonphone === undefined || this.chrisvenue.contactpersonphone === "") {
                    this.alertText = "Please type Contact phone number"
                    this.alertColor = "danger"
                    this.showAlert()
                    return false
                }

                if (this.chrisvenue.country === undefined || this.chrisvenue.country === "") {
                    this.alertText = "Please type country"
                    this.alertColor = "danger"
                    this.showAlert()
                    return false
                }

                if (this.chrisvenue.city === undefined || this.chrisvenue.city === "") {
                    this.alertText = "Please type city"
                    this.alertColor = "danger"
                    this.showAlert()
                    return false
                }

                if (this.chrisvenue.about === undefined || this.chrisvenue.about === "") {
                    this.alertText = "Please type about text"
                    this.alertColor = "danger"
                    this.showAlert()
                    return false
                }

                if (this.chrisvenue.email === undefined || this.chrisvenue.email === "") {
                    this.alertText = "Please type Email"
                    this.alertColor = "danger"
                    this.showAlert()
                    return false
                }

                if (this.chrisvenue.phonelandline === undefined || this.chrisvenue.phonelandline === "") {
                    this.alertText = "Please input the Phone Number!"
                    this.alertColor = "danger"
                    this.showAlert()
                    return false
                }

                if (this.chrisvenue.geolocation === undefined) {
                    this.alertText = "Please select the location!"
                    this.alertColor = "danger"
                    this.showAlert()
                    return false
                }

                if (this.chrisvenue.category_name === undefined || this.chrisvenue.category_name === "") {
                    this.alertText = "Please select the category!"
                    this.alertColor = "danger"
                    this.showAlert()
                    return false
                }

                if (this.chrisvenue.pincode === undefined || this.chrisvenue.pincode === "") {
                    this.alertText = "Please input the pin code!"
                    this.alertColor = "danger"
                    this.showAlert()
                    return false
                }

                if (this.chrisvenue.mainimage === undefined || this.chrisvenue.mainimage === "") {
                    this.alertText = "Please upload the main image!"
                    this.alertColor = "danger"
                    this.showAlert()
                    return false
                }

                if (this.termsAndCond === false) {
                    this.alertText = "Please confirm terms and conditions!"
                    this.alertColor = "danger"
                    this.showAlert()
                    return false
                }

                if (this.chrisvenue.discountlevelsilver <= this.chrisvenue.discountlevelbronze) {
                    this.alertColor = "danger"
                    this.alertText = "You have to select the big value than Bronze level."
                    this.showAlert()
                    return
                }

                if (this.chrisvenue.discountlevelgold <= this.chrisvenue.discountlevelsilver) {
                    this.alertColor = "danger"
                    this.alertText = "You have to select the big value than Silver level."
                    this.showAlert()
                    return
                }

                if (this.chrisvenue.discountlevelplatinum <= this.chrisvenue.discountlevelgold) {
                    this.alertColor = "danger"
                    this.alertText = "You have to select the big value than Gold level."
                    this.showAlert()
                    return
                }

                if (typeof(this.chrisvenue.minimumpurchase) !== "number") {
                    this.alertColor = "danger"
                    this.alertText = "Select the min purchase number."
                    this.showAlert()
                    return
                }
            },
            async validatePincode() {
                let len = 0
                console.log("+++++++++++", this.chrisvenue.pincode)
                const dbRef = db.collection('chrisvenues')
                    .where('pincode', '==', this.chrisvenue.pincode)

                await dbRef.get()
                    .then(res => {
                        len = res.size
                        console.log("+++++++++++",len)
                    })

                console.log("+++++++++++",len)

                return len === 0;
            },
            async saveVenueData() {
                this.chrisvenue.geolocation = new firebase.firestore.GeoPoint(parseFloat(this.chrisvenue.geolocation.latitude), parseFloat(this.chrisvenue.geolocation.longitude))

                if (this.validateFields() === false)
                    return

                let val = await this.validatePincode()

                if (val === false) {
                    this.alertColor = "danger"
                    this.alertText = "The pincode is aleady exist. Please input another pincode."
                    this.showAlert()
                    return
                }

                this.chrisvenue.owner = auth.currentUser.uid
                db.collection("chrisvenues")
                    .add(this.chrisvenue)
                    .then(() => {
                        this.alertText = "Venue successfully written!"
                        this.alertColor = "success"
                        this.showAlert ()
                    })
                    .catch((error) => {
                        this.alertColor = "danger"
                        this.alertText = "Error writing document"
                        this.showAlert ()
                    });
            },
            updateTermsAndCond(event) {
                this.termsAndCond = event.target.checked
            },
            validateValue(arg) {
                if (arg === "silver" && this.chrisvenue.discountlevelsilver <= this.chrisvenue.discountlevelbronze) {
                    this.alertColor = "danger"
                    this.alertText = "You have to select the big value than Bronze level"
                    this.showAlert()
                    return
                }

                if (arg === "gold" && this.chrisvenue.discountlevelgold <= this.chrisvenue.discountlevelsilver) {
                    this.alertColor = "danger"
                    this.alertText = "You have to select the big value than Silver level"
                    this.showAlert()
                    return
                }

                if (arg === "platinum" && this.chrisvenue.discountlevelplatinum <= this.chrisvenue.discountlevelgold) {
                    this.alertColor = "danger"
                    this.alertText = "You have to select the big value than Gold level"
                    this.showAlert()
                    return
                }

                return
            },
            prepareUpload() {
                this.main_state = 0
                this.mainImageData = event.target.files[0]
            },
            uploadImage(arg) {
                const storageRef=firebase.storage().ref(`images/${this.mainImageData.name}`).put(this.mainImageData)
                storageRef.on(`state_changed`,snapshot=>{
                    this.main_state = (snapshot.bytesTransferred/snapshot.totalBytes)*100
                }, error=>{

                },
                ()=>{
                    storageRef.snapshot.ref.getDownloadURL().then((url)=>{
                        this.main_state = 0
                        this.chrisvenue.mainimage=url
                    });
                });
            },
        }
    }
</script>
