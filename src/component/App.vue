<template>
    <div>
        <router-link to="/songs">Songs</router-link>
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class App extends Vue {
}
</script>
