<template>
    <CRow>
        <CCol md="4" sm="4">
            <CWidgetBrand
                color="info"
            >
                <CIcon
                    name="cil-media-play"
                    height="52"
                    class="my-4 mr-4"
                />
                <p class="my-4 text-left">
                    CLICK TO WATCH <br/>
                    ONBOARDING VIDEO
                </p>
            </CWidgetBrand>
        </CCol>
        <CCol md="4" sm="4">
            <CWidgetBrand
                color="primary"
            >
                <CIcon
                    name="cil-envelope-closed"
                    height="52"
                    class="my-4 mr-4"
                />
                <p class="my-4 text-left">
                    CLICK TO SEND <br/>
                    EMAIL TO SUPPORT
                </p>
            </CWidgetBrand>
        </CCol>
        <CCol md="4" sm="4">
            <CWidgetBrand
                color="warning"
            >
                <CIcon
                    name="cil-calculator"
                    height="52"
                    class="my-4 mr-4"
                />
                <p class="my-4 text-left">
                    CLICK TO SEE <br/>
                    YOUR BILLING PLAN
                </p>
            </CWidgetBrand>
        </CCol>
    </CRow>
</template>

<script>
    export default {
        name: 'WidgetsFeature',
        components: {
        },
        props: {
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
