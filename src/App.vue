<template>
    <router-view></router-view>
</template>

<script>
export default {
    name: 'app',
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
