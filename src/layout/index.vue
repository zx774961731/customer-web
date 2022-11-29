<template>
  <div class="header">
    <Avatar />
  </div>
  <n-layout has-sider class="app-layout">
    <n-layout-sider
      bordered
      collapse-mode="width"
      :collapsed-width="64"
      :width="220"
      :native-scrollbar="false"
      :collapsed="appStore.collapsed"
    >
      <SideBar />
    </n-layout-sider>
    <article flex-1 flex-col overflow-y-scroll class="app-article">
      <!-- <header bg-white px-15 border-b bc-eee flex items-center :style="`height: ${header.height}px`">
        <AppHeader />
      </header> -->
      <!-- <section v-if="tags.visible" border-b bc-eee>
        <AppTags :style="{ height: `${tags.height}px` }" />
      </section> -->
      <section class="p20 article-section" flex-1>
        <AppMain />
      </section>
    </article>
  </n-layout>
</template>

<script setup>
import SideBar from './components/sidebar/index.vue'
import AppMain from './components/AppMain.vue'
// import AppTags from './components/tags/index.vue'
import Avatar from './UserAvatar.vue'
import { useAppStore } from '@/store'
import { header, tags } from '~/settings'

const appStore = useAppStore()
</script>

<style lang="less" scoped>
.header {
  padding: 0 40px;
  height: 60px;
  line-height: 60px;
  background-color: #fff;
  display: flex;
  flex-direction: row-reverse;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.06);
  // & > div {
  //   margin-right: 40px;
  // }
}
.app-layout {
  margin-top: 2px;
  height: calc(100% - 62px);
}
.app-article {
  background-color: #f2f3f5;
  padding: 20px;
  .article-section {
    background-color: #fff;
  }
}
</style>
