<template>
    <CRow>
        <CCol md="12">
            <CCard>
                <CCardHeader>
                    <h1>
                        Easy and transparent pricing plans
                    </h1>
                </CCardHeader>
                <CCardBody>
                    <CRow>
                        <CCol col="12" sm="6" lg="6">
                            <CWidgetIcon
                                header="Your current membership plan:"
                                :text="currentPlan"
                                color="gradient-primary"
                                :icon-padding="false"
                            >
                                <CIcon name="cil-clipboard" width="24"/>
                            </CWidgetIcon>
                        </CCol>
                        <CCol col="12" sm="6" lg="6">
                            <CWidgetIcon
                                header="Current plan ends:"
                                :text="billingplanend"
                                color="gradient-danger"
                                :icon-padding="false"
                            >
                                <CIcon name="cil-av-timer" width="24"/>
                            </CWidgetIcon>
                        </CCol>
                    </CRow>
                    <CRow style="background-color: #555555; color: #ffffff;">
                        <CCol sm="12" class="col-form-label" tag="label">
                            Membership types
                        </CCol>
                    </CRow>
                    <CRow class="mb-2">
                        <CCol md="12">
                            <CDataTable
                                hover
                                striped
                                :items="getShuffledPlansData()"
                                :items-per-page="20"
                                clickable-rows
                                :pagination="{ doubleArrows: false, align: 'center'}"
                            >
                                <template #features="data">
                                    <td width="50%">
                                        {{data.item.features}}
                                    </td>
                                </template>
                                <template #basicPlan="data">
                                    <td width="25%">
                                        <CInputCheckbox
                                            v-if="data.item.basicPlan"
                                            :checked="true"
                                            :disabled="data.item.basicPlan"
                                        />
                                        <span v-else>-</span>
                                    </td>
                                </template>
                                <template #premiumPlan="data">
                                    <td width="25%">
                                        <CInputCheckbox
                                            v-if="data.item.premiumPlan"
                                            :checked="true"
                                            :disabled="data.item.premiumPlan"
                                        />
                                    </td>
                                </template>
                            </CDataTable>
                        </CCol>
                    </CRow>
                    <CJumbotron
                        color="info"
                        text-color="white"
                        border-color="dark"
                    >
                        <CRow>
                            <CCol sm="6">
                                <p class="lead">Do you have a voucher code?</p>
                            </CCol>
                            <CCol sm="6">
                                <CInput
                                    :value="vouchername"
                                    v-model="vouchername"
                                >
                                    <template #append>
                                        <CButton type="submit" color="warning" @click="applyVoucher">Apply voucher</CButton>
                                    </template>
                                </CInput>
                            </CCol>
                        </CRow>
                    </CJumbotron>
                    <CRow class="mt-4 mb-4">
                        <CCol sm="6" class="col-form-label" tag="label">
                            How many venues:
                        </CCol>
                        <CInputRadioGroup
                            class="col-sm-6"
                            :options="venue_options"
                            :custom=true
                            :checked.sync="venue_value"
                            :inline=true
                        />
                    </CRow>
                    <hr class="mt-1 mb-3">
                    <CRow class="mt-4 mb-4">
                        <CCol sm="6" class="col-form-label" tag="label">
                            Billed monthly / billed yearly (get 2 months free)
                        </CCol>
                        <CInputRadioGroup
                            class="col-sm-6"
                            :options="billtype_options"
                            :custom=true
                            :checked.sync="billtype_value"
                            :inline=true
                        />
                    </CRow>
                    <CJumbotron
                        color="warning"
                        text-color="black"
                        border-color="dark"
                    >
                        <CRow>
                            <CCol sm="6">
                                <p class="lead">Price</p>
                            </CCol>
                            <CCol sm="3">
                                <p class="lead">$24 per month</p>
                                <p class="lead">Free Basic plan for {{billingvoucherdays}} days</p>
                            </CCol>
                            <CCol sm="3">
                                <p class="lead">$49 per month</p>
                            </CCol>
                        </CRow>
                    </CJumbotron>
                    <CRow class="mt-4 mb-4">
                        <CCol sm="6" class="col-form-label" tag="label">
                            Select Basic or Premium membership
                        </CCol>
                        <CCol sm="3">
                            <CInputCheckbox
                                label="Basic Plan"
                                :custom=true
                                :checked="isBasic"
                                @click="changePlan"
                            />
                        </CCol>
                        <CCol sm="3">
                            <CInputCheckbox
                                label="Premium Plan"
                                :custom=true
                                :checked="!isBasic"
                                @click="changePlan"
                            />
                        </CCol>
                    </CRow>
                </CCardBody>
                <CCardFooter>
                    <CRow class="mb-1">
                        <CCol col="12">
                            <CAlert
                                :show.sync="dismissCountDown"
                                closeButton
                                :color="alertColor"
                            >
                                {{this.alertText}}
                            </CAlert>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CButton type="submit" color="danger" block @click="updateMembership">Choose membership and go to checkout</CButton>
                    </CRow>
                </CCardFooter>
            </CCard>
        </CCol>
    </CRow>
</template>

<script>
    import CTableWrapper from './../chrisvenues/Table.vue'
    import planData from '../data/PlanData'
    import { db, auth } from './../../firebase.js'
    export default {
        name: 'MembershipPlan',
        components: {},

        component: {
            CTableWrapper
        },
        data() {
            return {
                alertColor: "info",
                alertText: "",
                dismissSecs: 5,
                dismissCountDown: 0,
                venue_id: "",
                venue_options: ['1 venue', '2-5 venues', '6-10 venues'],
                venue_value: '1 venue',
                billtype_options: ['Monthly', 'Yearly'],
                billtype_value: 'Monthly',
                plan_options: ['Basic Plan', 'Premium Plan'],
                isBasic: true,
                billingplanend: "",
                billingplantype: "",
                billingvoucherdays: 0,
                billingvoucheridused: "",
                currentPlan: "",
                vouchername: "",
            }
        },
        created() {
            let dbRef = db.collection('chrisvenues')
                .where('owner', '==', auth.currentUser.uid)

            dbRef.get()
                .then(querySnapshot => {
                    this.venue_id = querySnapshot.docs[0].id
                    this.currentPlan = ""

                    this.billingvoucheridused = querySnapshot.docs[0].data().billingvoucheridused

                    this.billingvoucherdays = querySnapshot.docs[0].data().billingvoucherdays

                    let myDate = new Date(querySnapshot.docs[0].data().billingplanend.seconds * 1000) // date object
                    this.billingplanend = myDate.toDateString()

                    this.billingplantype = querySnapshot.docs[0].data().billingplantype

                    if (this.billingplantype.includes("1")) {
                        this.venue_value = "1 venue"
                    }
                    if (this.billingplantype.includes("2-5")) {
                        this.venue_value = "2-5 venues"
                    }
                    if (this.billingplantype.includes("6-10")) {
                        this.venue_value = "6-10 venues"
                    }

                    if (this.billingplantype.includes("monthly")) {
                        this.billtype_value = "Monthly"
                    }
                    if (this.billingplantype.includes("yearly")) {
                        this.billtype_value = "Yearly"
                    }

                    if (this.billingplantype.includes("basic")) {
                        this.currentPlan += "Basic"
                        this.isBasic = true
                    }
                    if (this.billingplantype.includes("premium")) {
                        this.currentPlan += "Preminum"
                        this.isBasic = false
                    }

                    this.currentPlan += " (" + this.billingvoucherdays/30 + " Months"

                    if (this.billingvoucheridused === "") {
                        this.currentPlan += ")"
                    } else {
                        this.currentPlan += " FREE VOUCHER USED)"
                    }
                })
        },
        methods: {
            changePlan() {
                this.isBasic = !this.isBasic
            },
            showAlert () {
                this.dismissCountDown = this.dismissSecs
            },
            updateMembership() {
                this.billingplantype = ""
                if (this.venue_value === "1 venue") {
                    this.billingplantype += "1"
                } else if (this.venue_value === "2-5 venues") {
                    this.billingplantype += "2-5"
                } else if (this.venue_value === "6-10 venues") {
                    this.billingplantype += "6-10"
                }

                if (this.isBasic) {
                    this.billingplantype += "basic"
                } else {
                    this.billingplantype += "premium"
                }

                if (this.billtype_value === "Monthly") {
                    this.billingplantype += "monthly"
                } else if (this.billtype_value === "Yearly") {
                    this.billingplantype += "yearly"
                }

                let dbRef = db.collection('chrisvenues').doc(this.venue_id)
                    .update({
                        billingplantype: this.billingplantype
                    })
                    .then(() => {
                        this.alertText = "Membership plan updated successfully"
                        this.alertColor = "info"
                        this.showAlert()
                    })
            },
            shuffleArray (array) {
                for (let i = array.length - 1; i > 0; i--) {
                    let j = Math.floor(Math.random() * (i + 1))
                    let temp = array[i]
                    array[i] = array[j]
                    array[j] = temp
                }
                return array
            },
            getShuffledPlansData () {
                return planData.slice(0)
            },
            applyVoucher() {
                db.collection('vouchercodes')
                    .where('name', '==', this.vouchername)
                    .get()
                    .then(querySnapshot => {
                        let vouchercodes = querySnapshot.docs[0].data()
                        if (vouchercodes.multipleuse === false) {
                            db.collection('vouchecodesused')
                                .where('vouchername', '===', this.vouchername)
                                .get()
                                .then(snapshot => {
                                    this.alertText = "Sorry, but this voucher has already been redeemed."
                                    this.alertColor = 'danger'
                                    this.showAlert()
                                    return
                                })
                        }

                        this.billingvoucherdays = vouchercodes.daysfree
                        let myDate = new Date(vouchercodes.expiry.seconds * 1000) // date object
                        this.billingplanend = myDate.toDateString()
                        this.billingplantype = "1basicmonthly"
                        this.isBasic = true
                        this.venue_value = '1 venue'
                        this.billtype_value = 'Monthly'
                    })
                    .catch((error) => {
                        this.alertText = "Sorry, but this voucher name is not correct."
                        this.alertColor = "danger"
                        this.showAlert()
                    })
            }
        }
    }
</script>