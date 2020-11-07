<template>
    <CRow>
        <CCol md="6" sm="6">
            <CWidgetProgressIcon
                :header="`${venueRating}/5`"
                text="VENUE RATING"
                color="gradient-danger"
                :value="venuePercent"
                inverse
            >
                <span class="progress-info">CLICK HERE TO SEE ALL</span>
                <CIcon name="cil-star" height="36"/>
            </CWidgetProgressIcon>
        </CCol>
        <CCol md="6" sm="6">
            <CWidgetProgressIcon
                :header="profilePercentStr"
                text="PROFILE COMPLETENESS"
                color="gradient-info"
                :value="profilePercent"
                inverse
            >
                <CLink :to="{name: 'ChrisvenueDetail', params: { id: venue_id }}">
                    <span class="progress-info">CLICK HERE TO UPDATE</span>
                </CLink>
                <CIcon name="cil-battery-3" height="36"/>
            </CWidgetProgressIcon>
        </CCol>
    </CRow>
</template>

<script>
import {db, auth} from "./../../firebase.js"
export default {
    name: 'WidgetsProgress',
    components: {
    },
    data() {
        return {
            venueRating: 0,
            venuePercent: 0,
            profileCompleteness: 0,
            profilePercent: 0,
            profilePercentStr: "",
            venue_id: "",
        }
    },
    created() {
        this.venue_id = ""

        let dbRef = db.collection('chrisvenues')
            .where('owner', '==', auth.currentUser.uid)

        dbRef.get().then(querySnapshot => {
            this.venue_id = querySnapshot.docs[0].id

            let review_cnt = 0
            let rating_val = 0
            db.collection('chrisvenues').doc(this.venue_id).collection("venue_review").get()
                .then(querySnapshot => {
                    review_cnt = querySnapshot.docs.length
                    querySnapshot.docs.forEach(doc => {
                        rating_val += doc.data().ratings_val
                    })
                    this.venueRating = review_cnt === 0 ? 0:rating_val / review_cnt
                    this.venueRating = Number(this.venueRating).toFixed(2)
                    this.venuePercent = this.venueRating / 5 * 100
                })

            let venue =  querySnapshot.docs[0].data()
            for(let key in venue){
                if (venue[key] !== ""){
                    this.profileCompleteness++
                }
            }
            this.profilePercent = this.profileCompleteness / 52 * 100
            this.profilePercentStr = Number(this.profilePercent).toFixed(2) + " %"
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
    }
}
</script>
<style scoped>

</style>