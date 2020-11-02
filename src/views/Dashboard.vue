<template>
  <div>
    <CRow>
      <CCol sm="6" lg="3">
        <CWidgetDropdown color="primary" :header="visitsOnMonth" text="Visits on this Month">
        </CWidgetDropdown>
      </CCol>
      <CCol sm="6" lg="3">
        <CWidgetDropdown color="info" :header="salesOnMonth" text="Sales on this Month">
        </CWidgetDropdown>
      </CCol>
      <CCol sm="6" lg="3">
        <CWidgetDropdown color="warning" :header="visitsOnMonth" text="Views on this Month">
        </CWidgetDropdown>
      </CCol>
      <CCol sm="6" lg="3">
        <CWidgetDropdown color="danger" :header="visitsOnMonth" text="Detail Views on this Month">
        </CWidgetDropdown>
      </CCol>
    </CRow>
    <CCard>
      <CCardBody>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
import MainChartExample from './charts/MainChartExample'
import WidgetsDropdown from './widgets/WidgetsDropdown'
import WidgetsBrand from './widgets/WidgetsBrand'
import { auth, db } from './../firebase.js'

export default {
  name: 'Dashboard',
  components: {
    MainChartExample,
    WidgetsDropdown,
    WidgetsBrand
  },
  data () {
    return {
      userId: "",
      venues: [],
      currentUser: Object,
      visitsOnMonth: '',
      salesOnMonth: '',
    }
  },
  async created() {
    this.userId = auth.currentUser.uid

    await this.getCurrentUser()

    this.venues = []

    let dbRef
    if (this.currentUser.userrole == "admin") {
      dbRef = db.collection('chrisvenues')
    } else {
      dbRef = db.collection('chrisvenues')
        .where('owner', '==', auth.currentUser.uid)
    }

    let querySnapshot = await dbRef.get()
    querySnapshot.docs.map((doc) => {
      this.venues.push({
        key: doc.id,
      })
    })

    //calc visitsOnMonth
    let d = new Date();
    let curMonth = new Date(d.getFullYear(), d.getMonth()-1)

    let visitCount = 0
    let salesAmount = 0
    for(let id=0; id < this.venues.length; id++) {
        let venue_id = this.venues[id].key
        let dbRef = db.collection('user_visit_log')
          .where('venue_id', '==', venue_id)
          .where('visit_time', '>', curMonth)

        let snap = await dbRef.get()
        visitCount += snap.size

        snap.docs.map((doc) => {
          salesAmount += doc.data().bill_amount
        })
    }
    this.visitsOnMonth = visitCount.toString()
    this.salesOnMonth = salesAmount.toString()
  },
  methods: {
    async getCurrentUser() {
        const query = db.collection('users').doc(auth.currentUser.uid)
        await query.get()
            .then((doc) => {
                this.currentUser = doc.data()
            })
    },
    color (value) {
      let $color
      if (value <= 25) {
        $color = 'info'
      } else if (value > 25 && value <= 50) {
        $color = 'success'
      } else if (value > 50 && value <= 75) {
        $color = 'warning'
      } else if (value > 75 && value <= 100) {
        $color = 'danger'
      }
      return $color
    }
  }
}
</script>
