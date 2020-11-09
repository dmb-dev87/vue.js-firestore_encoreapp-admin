<template>
    <CRow>
        <CCol md="12">
            <CCard>
                <CCardHeader>
                    <CRow style="background-color: #555555; color: #ffffff;">
                        <CCol sm="12" class="col-form-label" tag="label">
                            Membership types
                        </CCol>
                    </CRow>
                    <CRow class="mt-3">
                        <CCol sm="6" class="col-form-label" tag="label">
                            Features
                        </CCol>
                        <CCol sm="3" class="col-form-label" tag="label">
                            Free plan
                        </CCol>
                        <CCol sm="3" class="col-form-label" tag="label">
                            Premium plan
                        </CCol>
                    </CRow>
                </CCardHeader>
                <CCardBody>
                    <CRow class="mb-2">
                        <CCol sm="6" class="col-form-label" tag="label">
                            Add your venue to the Encore iPhone and Android apps
                        </CCol>
                        <CCol sm="3">
                            <CInputCheckbox
                                :checked="true"
                            />
                        </CCol>
                        <CCol sm="3">
                            <CInputCheckbox
                                :checked="true"
                            />
                        </CCol>
                    </CRow>
                    <CRow class="mb-2">
                        <CCol sm="6" class="col-form-label" tag="label">
                            Add and edit all details and image gallery for your venue
                        </CCol>
                        <CCol sm="3">
                            <CInputCheckbox
                                :checked="true"
                            />
                        </CCol>
                        <CCol sm="3">
                            <CInputCheckbox
                                :checked="true"
                            />
                        </CCol>
                    </CRow>
                    <hr class="mt-1 mb-2">
                    <CRow class="mb-2">
                        <CCol sm="6" class="col-form-label" tag="label">
                            Specify all discounts and terms and use the online admin
                        </CCol>
                        <CCol sm="3">
                            <CInputCheckbox
                                :checked="true"
                            />
                        </CCol>
                        <CCol sm="3">
                            <CInputCheckbox
                                :checked="true"
                            />
                        </CCol>
                    </CRow>
                    <CRow class="mb-2">
                        <CCol sm="6" class="col-form-label" tag="label">
                            Ability to add branches under same group
                        </CCol>
                        <CCol sm="3">
                            <CInputCheckbox
                                :checked="true"
                            />
                        </CCol>
                        <CCol sm="3">
                            <CInputCheckbox
                                :checked="true"
                            />
                        </CCol>
                    </CRow>
                    <CRow class="mb-2">
                        <CCol sm="6" class="col-form-label" tag="label">
                            Run promo campaigns and send nitifications to members
                        </CCol>
                        <CCol sm="3">
                            -
                        </CCol>
                        <CCol sm="3">
                            <CInputCheckbox
                                :checked="true"
                            />
                        </CCol>
                    </CRow>
                    <hr class="mt-1 mb-2">
                    <CRow class="mb-2">
                        <CCol sm="6" class="col-form-label" tag="label">
                            Social media posts on Encore Social Feed promoting venue
                        </CCol>
                        <CCol sm="3">
                            -
                        </CCol>
                        <CCol sm="3">
                            <CInputCheckbox
                                :checked="true"
                            />
                        </CCol>
                    </CRow>
                    <CRow class="mb-2">
                        <CCol sm="6" class="col-form-label" tag="label">
                            Notifications when members mention veneue #hashtags
                        </CCol>
                        <CCol sm="3">
                            -
                        </CCol>
                        <CCol sm="3">
                            <CInputCheckbox
                                :checked="true"
                            />
                        </CCol>
                    </CRow>
                    <CRow class="mb-2">
                        <CCol sm="6" class="col-form-label" tag="label">
                            Detailed statistics and reports
                        </CCol>
                        <CCol sm="3">
                            -
                        </CCol>
                        <CCol sm="3">
                            <CInputCheckbox
                                :checked="true"
                            />
                        </CCol>
                    </CRow>
                    <hr class="mt-1 mb-2">
                    <CRow class="mb-2">
                        <CCol sm="6" class="col-form-label" tag="label">
                            Special offers and blogs in News and the "Discover Area"
                        </CCol>
                        <CCol sm="3">
                            -
                        </CCol>
                        <CCol sm="3">
                            <CInputCheckbox
                                :checked="true"
                            />
                        </CCol>
                    </CRow>
                    <CRow class="mb-2">
                        <CCol sm="6" class="col-form-label" tag="label">
                            Option to be listed a "Featured venue"(extra charge applies)
                        </CCol>
                        <CCol sm="3">
                            -
                        </CCol>
                        <CCol sm="3">
                            <CInputCheckbox
                                :checked="true"
                            />
                        </CCol>
                    </CRow>
                    <CRow class="mb-2">
                        <CCol sm="6" class="col-form-label" tag="label">
                            Price
                        </CCol>
                        <CCol sm="3">
                            $0
                        </CCol>
                        <CCol sm="3">
                            $59.99/mth
                        </CCol>
                    </CRow>
                    <hr class="mt-1 mb-2">
                    <CRow class="mb-2">
                        <CCol sm="6" class="col-form-label" tag="label">
                            Select membership
                        </CCol>
                        <CCol sm="3">
                            <CInputCheckbox
                                :checked="isFree"
                                @click="changePlan"
                            />
                        </CCol>
                        <CCol sm="3">
                            <CInputCheckbox
                                :checked="!isFree"
                                @click="changePlan"
                            />
                        </CCol>
                    </CRow>
                </CCardBody>
                <CCardFooter>
                    <CButton type="submit" color="danger" block @click="updateMembership"><CIcon name="cil-check-circle"/> Update Membership </CButton>
                </CCardFooter>
            </CCard>
        </CCol>
    </CRow>
</template>

<script>
    export default {
        name: 'MembershipPlan',
        data() {
            return {
                options: ['Option 1', 'Option 2'],
                isFree: true,
            }
        },
        methods: {
            changePlan() {
                this.isFree = !this.isFree
            },
            updateMembership() {

            }
        }
    }
</script>