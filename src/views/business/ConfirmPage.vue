<template>
    <CRow>
        <CCol>
            <CCard>
                <CCardHeader>
                    Welcome to the register venue.
                </CCardHeader>
                <CCardBody>
                    <p class="mb-3">Dear <strong>{{contact_name}}</strong></p>
                    <p class="mb-3">
                        Thank you for listing your business in the Encore APP. Someone from our team will be in touch with you in the following days, to assist you with the onboarding process.
                    </p>
                    <p class="mb-3">
                        If you have any questions in the meantime, please send us a message on <CLink>team@encoreapp.net</CLink> or on WhatsApp <strong>+971 55 677 9173</strong>.
                    </p>
                    <p class="mb-3">
                        With regards,
                    </p>
                    <p class="mb-3">
                        Team Encore
                    </p>
                </CCardBody>
            </CCard>
        </CCol>
    </CRow>
</template>

<script>
    export default {
        name: 'ConfirmPage',
        data () {
            return {
                contact_name: "",
            }
        },
        created() {
            this.contact_name = this.$route.params.contact_name
        }
    }
</script>
