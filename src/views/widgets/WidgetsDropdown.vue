<template>
  <CRow>
    <CCol col="12" sm="6" lg="3">
      <CWidgetIcon
        :header="`${visitsOnMonth}`"
        text="VISITS THIS MONTH"
        color="gradient-primary"
        :icon-padding="false"
      >
        <CIcon name="cil-smile" width="24"/>
      </CWidgetIcon>
    </CCol>
    <CCol col="12" sm="6" lg="3">
      <CWidgetIcon
        :header="`${salesOnMonth}`"
        text="SALES THIS MONTH"
        color="gradient-info"
        :icon-padding="false"
      >
        <CIcon name="cil-money" width="24"/>
      </CWidgetIcon>
    </CCol>
    <CCol col="12" sm="6" lg="3">
      <CWidgetIcon
        :header="`${visitsOnMonth}`"
        text="PAGE VISITS THIS MONTH"
        color="gradient-warning"
        :icon-padding="false"
      >
        <CIcon name="cil-find-in-page" width="24"/>
      </CWidgetIcon>
    </CCol>
    <CCol col="12" sm="6" lg="3">
      <CWidgetIcon
        :header="`${visitsOnMonth}`"
        text="RECOMMENDATIONS THIS MONTH"
        color="gradient-danger"
        :icon-padding="false"
      >
        <CIcon name="cil-thumb-up" width="24"/>
      </CWidgetIcon>
    </CCol>
  </CRow>
</template>

<script>
import { auth, db } from './../../firebase.js'

export default {
  name: 'WidgetsDropdown',
  data () {
    return {
      userId: "",
      venues: [],
      currentUser: Object,
      visitsOnMonth: '0',
      salesOnMonth: '0',
    }
  },
  async created() {
    this.venues = []

    db.collection('chrisvenues')
        .where('owner', '==', auth.currentUser.uid)
        .get()
        .then(querySnapshot => {
            querySnapshot.docs.map((doc) => {
                this.venues.push({
                    key: doc.id
                })
            })
            //calc visitsOnMonth
            let d = new Date();
            let curMonth = new Date(d.getFullYear(), d.getMonth()-1)

            this.visitsOnMonth = 0
            this.salesOnMonth = 0
            for(let id=0; id < this.venues.length; id++) {
                let venue_id = this.venues[id].key
                db.collection('user_visit_log')
                    .where('venue_id', '==', venue_id)
                    .where('visit_time', '>', curMonth)
                    .get()
                    .then(snap => {
                        this.visitsOnMonth += snap.size
                        snap.docs.map((doc) => {
                            this.salesOnMonth += doc.data().bill_amount
                        })
                    })
            }
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
