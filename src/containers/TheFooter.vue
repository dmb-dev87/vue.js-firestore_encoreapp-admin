<template>
  <CFooter :fixed="false">
    <div>
      <span class="mr-1">Copyright &copy; 2019-{{new Date().getFullYear()}} </span>
      <a href="https://encoreapp.net/" target="_blank">Encore Loyalty APP</a>
      <span>. All rights reserved.</span>
    </div>
    <div class="mfs-auto">
      <span class="mr-1" target="_blank">Powered by</span>
      <a href="https://encoreapp.net/">Encore Loyalty APP</a>
    </div>
  </CFooter>
</template>

<script>
export default {
  name: 'TheFooter'
}
</script>
