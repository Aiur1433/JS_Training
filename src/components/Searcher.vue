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
//https://www.google.com/search?q=fsdaf
// newwindow=1
// sca_esv=a9443ba0489e3535
// sxsrf=ADLYWIKBGgrWIw7UbSZl0lv1FrcRb6-thw%3A1717948961802
// source=hp
// ei=IdJlZqPZLtDY1e8Pm6OpiA8
// iflsig=AL9hbdgAAAAAZmXgMb94RC6fNsnlM6TuLdAh0BOVfcju
// ved=0ahUKEwjj7e7M8s6GAxVQbPUHHZtRCvEQ4dUDCBY
// uact=5
// oq=fsdaf
// gs_lp=Egdnd3Mtd2l6IgVmc2RhZjIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgARIwQpQsQJYhAlwAXgAkAEAmAHmAaAB2QiqAQMyLTW4AQPIAQD4AQGYAgagAugIqAIKwgIHECMYJxjqAsICBBAjGCfCAgsQLhiABBjRAxjHAcICCBAuGIAEGNQCwgIFEC4YgATCAgoQABiABBhDGIoFwgIPEC4YgAQYQxjUAhiKBRgKwgILEC4YgAQYxwEYrwGYAwWSBwUxLjAuNaAH7y0
// sclient=gws-wiz
//https://www.google.com/search?q=xbox
// sca_esv=a9443ba0489e3535
// sca_upv=1
// source=hp
// ei=XNJlZueJN5u4vr0PgoOLsAo
// iflsig=AL9hbdgAAAAAZmXgbAh7ia4ekTAUDUh9zD55V6Qv_Qd6
// ved=0ahUKEwjnp4jp8s6GAxUbnK8BHYLBAqYQ4dUDCA4
// uact=5
// oq=xbox
// gs_lp=Egdnd3Mtd2l6IgR4Ym94MgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABEiaQlCmLVjaQHAEeACQAQCYAfkBoAGSCqoBBTAuMS41uAEDyAEA-AEBmAIIoAKlCqgCAMICCxAuGIAEGNEDGMcBwgIFEC4YgASYAwGSBwUyLjEuNaAHviQ
// sclient=gws-wiz
</script>
