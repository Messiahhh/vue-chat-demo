<template lang="html">
    <div class="">
        {{test}}
        <button type="button" @click='click'>点击</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            obj: {
                a: 'a',
                b: 'b',
            }
        }
    },
    computed: {
        test() {
            return this.obj
        }
    },
    methods: {
        click() {
            this.obj.c = 'xxx'
        }
    }
}
</script>

<style lang="css">
</style>
