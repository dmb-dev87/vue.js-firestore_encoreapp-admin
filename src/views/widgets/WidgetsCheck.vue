<template>
    <CRow>
        <CCol col="6" sm="6" lg="6">
            <CWidgetSimple
                header="VENUE FEATURED"
            >
                <CSwitch
                    class="mt-3"
                    color="warning"
                    :checked="isFeatured"
                    variant="opposite"
                    shape="pill"
                />
                <p v-if="isFeatured">Active</p>
                <p v-else>Not Active</p>
                <p>CLICK HERE TO CHANGE</p>
            </CWidgetSimple>
        </CCol>
        <CCol col="6" sm="6" lg="6">
            <CWidgetSimple
                header="PROMO ACTIVE"
            >
                <CSwitch
                    class="mt-3"
                    color="warning"
                    :checked="isActive"
                    variant="opposite"
                    shape="pill"
                />
                <p v-if="isActive">Active</p>
                <p v-else>Not Active</p>
                <p>CLICK HERE TO CHANGE</p>
            </CWidgetSimple>
        </CCol>
    </CRow>
</template>
<script>
import {db, auth} from "./../../firebase.js"
export default {
    name: 'WidgetsCheck',
    data() {
        return {
            isFeatured: false,
            isActive: false,
            venueId: ""
        }
    },
    created () {
        let dbRef = db.collection('chrisvenues')
            .where('owner', '==', auth.currentUser.uid)

        dbRef.get().then(querySnapshot => {
            this.venueId = querySnapshot.docs[0] === undefined ? "" : querySnapshot.docs[0].id
            this.isFeatured = querySnapshot.docs[0] ? querySnapshot.docs[0].data().isFeatured : false
            this.isActive = querySnapshot.docs[0] ? querySnapshot.docs[0].data().isActive : false
        })

    }
}
</script>
<style>

</style>