<template>
  <div>
    <WidgetsDropdown/>
    <h1 class="mt-xl-5 mb-xl-5 text-center">WELCOME TO YOUR ENCORE DASHBOARD</h1>
    <WidgetsFeature/>
    <WidgetsCheck/>
    <WidgetsProgress/>
  </div>
</template>

<script>
import WidgetsDropdown from './widgets/WidgetsDropdown'
import WidgetsProgress from './widgets/WidgetsProgress'
import WidgetsFeature from './widgets/WidgetsFeature'
import WidgetsCheck from './widgets/WidgetsCheck'

export default {
  name: 'Dashboard',
  components: {
    WidgetsCheck,
    WidgetsProgress,
    WidgetsDropdown,
    WidgetsFeature
  },
}
</script>
