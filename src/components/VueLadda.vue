<template>
  <button class="button" @click="handleClick">
    <span class="submit-button-label ladda-button"
        data-style="expand-right"><slot>Submit</slot></span>
  </button>
</template>
<script>
  import * as Ladda from 'ladda'
  export default {
    name: 'VueLadda',
    props: {
      loading: {
        type: Boolean,
        required: true
      },
    },
    watch: {
      loading: function(loading) {
        loading ? this.ladda.start() : this.ladda.stop();
      }
    },
    methods: {
      handleClick: function(e) {
        this.$emit('click', e);
      }
    },
    mounted: function() {
      this.ladda = Ladda.create(document.querySelector('.submit-button-label'))
      this.loading ? this.ladda.start() : this.ladda.stop();
    },
    beforeDestroy: function() {
      this.ladda.remove();
      delete this.ladda;
    }
  };
</script>
<style lang="sass">
.button
  background: #3964df
  padding: 10px 20px
  color: white
  cursor: pointer
  border-radius: 7px
  user-select: none
  transition: all .15s ease
  display: inline-block
  font-size: +ms(0)
  font-weight: 600

  &:focus
    outline: none

  &[disabled]
    pointer-events: none
    opacity: 0.8

  &:hover
    transform: translateY(-1px)
    box-shadow: 0 4px 25px rgba(0,0,0,.25)

  &:active
    transform: translateY(1px)
    color: white
    background: #3964df
    box-shadow: 0 4px 25px rgba(0,0,0,.25)
</style>
