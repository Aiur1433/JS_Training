<template>
  <v-card>
    <v-card-item>
      <v-autocomplete
        :items="types"
        class="mx-auto"
        density="comfortable"
        placeholder="输入搜索内容"
        prepend-inner-icon="mdi-magnify"
        style="max-width: 50%"
        theme="light"
        variant="solo"
        auto-select-first
        item-props


      ></v-autocomplete>
    </v-card-item>
  </v-card>
</template>
<script setup lang="ts">
const types = [{title: 'Bing', url: 'bing.com'}]

</script>
