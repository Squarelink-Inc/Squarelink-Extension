<template>
  <div class="content">
    <Header/>
    <Home/>
    <Footer/>
  </div>
</template>
<script>
import { Footer, Header, Home } from '@/components'

export default {
  name: 'Home View',
  components: { Header, Footer, Home },
}
</script>
<style lang="sass" scoped>
.content
  width: 350px

</style>
