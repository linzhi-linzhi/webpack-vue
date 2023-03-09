<template>
    <img alt="Vue logo" src="./icon.png">
    <div>hello {{ text }}</div>
</template>

<script setup>
    import {
        onMounted,
        ref
    } from 'vue'

    let text = ref('reftext')

    onMounted(() => {
        console.log('onMounted')
    })
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
    }
</style>