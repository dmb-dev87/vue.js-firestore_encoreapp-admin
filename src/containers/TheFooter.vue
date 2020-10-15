<template>
  <CFooter :fixed="false">
    <div>
      <a href="https://encoreapp.net/" target="_blank">EncoreApp</a>
      <span class="ml-1">&copy; {{new Date().getFullYear()}} creativeLabs.</span>
    </div>
    <div class="mfs-auto">
      <span class="mr-1" target="_blank">Powered by</span>
      <a href="https://encoreapp.net/">EncoreApp</a>
    </div>
  </CFooter>
</template>

<script>
export default {
  name: 'TheFooter'
}
</script>
