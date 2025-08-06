<script setup lang="ts">
interface Props {
  title?: string
  userName?: string
  userEmail?: string
  avatarSrc?: string
}

withDefaults(defineProps<Props>(), {
  title: '💎 facetta',
  userName: 'Alen Gao',
  userEmail: 'Alen.Gao482@gmail.com',
  avatarSrc: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alen'
})
</script>

<template>
  <el-header class="header">
    <div class="header-left">
      <h1 class="app-title">{{ title }}</h1>
    </div>
    <div class="header-right">
      <el-avatar :size="32" :src="avatarSrc" />
      <span class="user-name">{{ userName }}</span>
      <span class="user-email">{{ userEmail }}</span>
    </div>
  </el-header>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #004D40;
  color: white;
  padding: 0 20px;
}

.header-left {
  display: flex;
  align-items: center;
}

.app-title {
  margin: 0;
  font-size: 24px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-name {
  font-weight: 500;
}

.user-email {
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
}

@media screen and (max-width: 768px) {
  .header-right .user-email {
    display: none;
  }
}
</style> 