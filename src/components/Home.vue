<template>
  <div class="home">
    <NetworkSelector/>
  </div>
</template>
<script>
import { NetworkSelector } from '@/components'

export default {
  name: 'HomePage',
  components: { NetworkSelector }
}
</script>
<style lang="sass">
.home
  width: 100%
  text-align: center
  min-height: 250px
</style>
