<template>
  <n-dropdown :options="options" @select="handleSelect">
    <div flex items-center cursor-pointer>
      <!-- <img :src="userStore.avatar" mr10 w-35 h-35 rounded-full /> -->
      <!-- <span>{{ userStore.name }}</span> -->
      <span class="name">{{ name || '未知用户' }}</span>
    </div>
  </n-dropdown>
</template>

<script setup>
import { useUserStore } from '@/store'
import { renderIcon } from '@/utils'
import { lStorage } from '@/utils'

const name = lStorage.getItem('userName').value
const userStore = useUserStore()

const options = [
  {
    label: '退出登录',
    key: 'logout',
    icon: renderIcon('mdi:exit-to-app', { size: '14px' }),
  },
]

function handleSelect(key) {
  if (key === 'logout') {
    $dialog.confirm({
      title: '提示',
      type: 'info',
      content: '确认退出？',
      confirm() {
        userStore.logout()
        $message.success('已退出登录')
      },
    })
  }
}
</script>

<style lang="less" scoped>
.name {
  width: 42px;
  font-size: 12px;
  height: 42px;
  background-color: #4080ff;
  line-height: 42px;
  border-radius: 42px;
  text-align: center;
  color: #fff;
}
</style>
