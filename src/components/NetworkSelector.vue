<template>
  <div class="network-selector">
    <h3>Connected to...</h3>
    <div @click="showDropdown = !showDropdown"
        class="network active">
      <p class="network-title">{{networks[name] || network.url}}</p>
      <div class="dropdown-button"><i class="fas fa-chevron-down"/></div>
    </div>
    <div class="dropdown"
        v-if="showDropdown">
      <div>
        <a class="action"
            href="javascript:void(0)"
            @click="setNetwork(n)"
            v-for="(n, i) in Object.keys(networks)">
          {{ networks[n] }}
        </a>
      </div>
    </div>
    <div v-if="showCustom" class="custom-rpc">
      <div class="input">
        <label>RPC URL</label>
        <input v-model="url"/>
      </div>
      <div class="input">
        <label>Chain ID</label>
        <input v-model="chainId"/>
      </div>
    </div>
    <ladda :disabled="!changed"
        :loading="loading"
        @click="confirmNetwork"
        class="button">Confirm Network
    </ladda>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import supportedNetworks from '@/constants/networks'

export default {
  name: 'NetworkSelector',
  computed: {
    ...mapGetters({
      network: 'network',
    }),
    changed() {
      if (this.name !== this.network.name) return true
      if (this.name === 'private') {
        if (
          this.chainId !== this.network.chainId
          || this.url !== this.network.url
        ) return true
      }
      return false
    }
  },
  data() {
    return {
      url: 'https://localhost:8545',
      chainId: '1',
      name: 'mainnet',
      showCustom: false,
      showDropdown: false,
      loading: false,
      error: '',
      networks: {
        ...supportedNetworks,
        private: 'Private RPC',
      },
    }
  },
  mounted() {
    this.loadNetwork()
  },
  methods: {
    loadNetwork() {
      const { name, chainId, url } = this.network
      console.log(name, chainId, url)
      if (!name) {
        this.showCustom = true
        this.chainId = chainId
        this.url = url
        this.name = 'private'
      } else {
        this.name = name
        this.showCustom = false
      }
      this.name = this.$store.getters.network.name
    },
    setNetwork(n) {
      this.name = n
      if (this.name === 'private') this.showCustom = true
      else this.showCustom = false
      this.showDropdown = false
    },
    confirmNetwork() {
      const { name, chainId, url } = this
      var network
      if (this.name === 'private') {
        if (!url || !chainId) {
          this.$toasted.error('You must provide a url and chain ID')
          return
        }
        if (isNaN(parseInt(chainId))) {
          this.$toasted.error('The Chain ID must be a number')
          return
        }
        network = { url, chainId: parseInt(chainId) }
      }
      else network = { name }
      this.loading = true
      this.$store.dispatch('SET_NETWORK', { network }).then(() => {
        this.loadNetwork()
        this.$toasted.success('Network changed')
      }).catch(err => {
        this.$toasted.error(err.message || err)
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>
<style lang="sass">
.network-selector
  // z-index: 10
  display: flex
  width: 80%
  flex-wrap: wrap
  justify-content: center
  margin-top: -10px
  margin: 0 10%

  .custom-rpc
    margin-bottom: 10px
    text-align: left
    width: 100%

    input
      background: #fbfbfb
      border: none
      outline: none
      padding: 10px 20px
      font-size: +ms(1)
      border-radius: 3px
      color: #444444
      width: 85%
      transition: background .15s
      display: block

      &:focus
        background: #ededed

      &[disabled]
        background: none
        padding: 5px 0

      &:not(last-child)
        margin-bottom: 1em

    label
  		display: block
  		font-weight: 600
  		font-size: +ms(0)
  		margin-bottom: .25em


  .network
    cursor: pointer
    color: white
    text-align: center
    border-radius: 7px
    background: #4A5168
    box-shadow: 0 4px 15px rgba(0,0,0,.15)
    transition: .15s all
    position: relative
    height: 35px
    min-width: 100%
    z-index: 0
    margin: -10px 25px 10px
    transform: translateY(1)
    transition: all .15s
    box-shadow: 0 4px 15px rgba(0,0,0,.15)

    &:hover
      background: #3e4458

    .network-title
      margin-top: 7px
      font-weight: 600
      font-size: 15px

    &::after
      position: absolute
      top: 0
      left: 0
      bottom: 0
      right: 0
      z-index: -1
      content: ""
      border-radius: 7px
      background-repeat: no-repeat
      background-position: 20px
      background-size: 50px 50px
      transition: all .15s

      @media(max-width: 450px)
        background-position: 10px
        background-size: 40px 40px

    &.active::after
      transition: all .15s
      opacity: 0.3

  .dropdown-button
    position: absolute
    color: white
    right: 15px
    top: 10px
    i
      text-shadow: 0 0 5px #4b4b4b

  .dropdown
    cursor: default
    position: absolute
    margin-top: 86px
    width: 300px
    background: white
    background: #3c3f61
    z-index: 15
    min-width: 200px
    box-shadow: 0 4px 25px rgba(0,0,0,.25)
    border-radius: 7px
    display: inline-block

    &:after, &:before
      bottom: 100%
      border: solid transparent
      content: " "
      height: 0
      width: 0
      position: absolute
      pointer-events: none

    &:after
      border-color: rgba(255, 255, 255, 0)
      border-bottom-color: #3c3f61
      border-width: 15px
      right: 25px
      margin-left: -19px

    .action
      border-top: solid 1px #9c9c9c
      display: block
      width: 100%
      font-weight: 700
      padding: 5px 0
      color: white
      transition: all .1s

      &:first-child
        border-top: none
        border-radius: 7px 7px 0 0

      &:last-child
        border-radius: 0 0 7px 7px

      &.-bold
        font-weight: 700
        font-size: 1.1em
        text-align: center
        margin: 0

      &:hover
        background: rgba(0,0,0,.25)
        cursor: pointer

</style>
