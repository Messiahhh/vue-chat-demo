<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
import sidebar from './components/sidebar'
import container from './components/container'
export default {
  name: 'app',
  components: {
      sidebar,
      container,
  }
}
</script>

<style lang='stylus'>

*,
*::before,
*::after
    box-sizing border-box
::-webkit-scrollbar
    width 3px
    height 3px
::-webkit-scrollbar-thumb
    background #ccc
::-webkit-scrollbar-track
    background none

body
    margin 0
input
button
    border none
    background transparent
    outline none

</style>
