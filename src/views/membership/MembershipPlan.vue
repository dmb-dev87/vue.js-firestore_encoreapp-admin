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
                                text="Basic (6 months free voucher used)"
                                color="gradient-primary"
                                :icon-padding="false"
                            >
                                <CIcon name="cil-clipboard" width="24"/>
                            </CWidgetIcon>
                        </CCol>
                        <CCol col="12" sm="6" lg="6">
                            <CWidgetIcon
                                header="Current plan ends:"
                                text="16. May, 2021"
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
                                >
                                    <template #append>
                                        <CButton type="submit" color="warning">Apply voucher</CButton>
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
                            custom={true}
                            :checked="venue_value"
                            inline={true}
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
                            custom={true}
                            :checked="billtype_value"
                            inline={true}
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
                                :custom="true"
                                :checked="isBasic"
                                @click="changePlan"
                            />
                        </CCol>
                        <CCol sm="3">
                            <CInputCheckbox
                                label="Premium Plan"
                                :custom="true"
                                :checked="!isBasic"
                                @click="changePlan"
                            />
                        </CCol>
                    </CRow>
                </CCardBody>
                <CCardFooter>
                    <CButton type="submit" color="danger" block @click="updateMembership">Choose membership and go to checkout</CButton>
                </CCardFooter>
            </CCard>
        </CCol>
    </CRow>
</template>

<script>
    import CTableWrapper from './../chrisvenues/Table.vue'
    import planData from '../data/PlanData'
    export default {
        name: 'MembershipPlan',
        component: {
            CTableWrapper
        },
        data() {
            return {
                venue_options: ['1 venue', '2-5 venues', '6-10 venues'],
                venue_value: '1 venue',
                billtype_options: ['Monthly', 'Yearly'],
                billtype_value: 'Monthly',
                plan_options: ['Basic Plan', 'Premium Plan'],
                plan_value: 'Basic plan',
                isBasic: true,
            }
        },
        methods: {
            changePlan() {
                this.isBasic = !this.isBasic
            },
            updateMembership() {

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
                // return this.shuffleArray(planData.slice(0))
            }
        }
    }
</script>