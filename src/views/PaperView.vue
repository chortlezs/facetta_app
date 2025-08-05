<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { Document, Folder, Setting, HomeFilled, Headset, ChatDotRound, CaretBottom } from '@element-plus/icons-vue'
import VuePdfEmbed from 'vue-pdf-embed'
const route = useRoute()
const pdfUrl = ref('')
const currentMode = ref('Deep Read')
const isDropdownVisible = ref(false)

onMounted(() => {
  // 这里后续会根据route.params.id获取具体的PDF文件URL
  pdfUrl.value = '/papers/sample.pdf'
})
</script>

<template>
  <div class="app-wrapper">
    <div class="app-container">
      <!-- 顶部栏 -->
      <el-header class="header">
        <div class="header-left">
          <h1 class="app-title">Handoff</h1>
        </div>
        <div class="header-right">
          <el-avatar :size="32" src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alen" />
          <span class="user-name">Alen Gao</span>
          <span class="user-email">Alen.Gao482@gmail.com</span>
        </div>
      </el-header>

      <!-- PDF内容区域 -->
      <div class="main-content">
        <div class="pdf-container">
          <!-- 阅读模式选择器 -->
          <el-dropdown trigger="click" class="mode-switch" @visible-change="visible => isDropdownVisible = visible">
            <div class="switch-button">
              <span>{{ currentMode }}</span>
              <el-icon class="el-icon--right" :class="{ 'is-reverse': isDropdownVisible }"><CaretBottom /></el-icon>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="currentMode = 'Deep Read'">Deep Read</el-dropdown-item>
                <el-dropdown-item @click="currentMode = 'Summary'">Summary</el-dropdown-item>
                <el-dropdown-item @click="currentMode = 'Visual Cards'">Visual Cards</el-dropdown-item>
                <el-dropdown-item @click="currentMode = 'Podcast'">Podcast</el-dropdown-item>
                <el-dropdown-item @click="currentMode = 'AI Assistant'">AI Assistant</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <VuePdfEmbed :source="pdfUrl" />
        </div>
      </div>

      <!-- 底部导航栏 -->
      <el-footer class="footer">
        <el-menu mode="horizontal" class="footer-menu" default-active="3">
          <el-menu-item index="1" @click="$router.push('/')">
            <el-icon><HomeFilled /></el-icon>
          </el-menu-item>
          <el-menu-item index="2">
            <el-icon><Folder /></el-icon>
          </el-menu-item>
          <el-menu-item index="3">
            <el-icon><Document /></el-icon>
          </el-menu-item>
          <el-menu-item index="4">
            <el-icon><Setting /></el-icon>
          </el-menu-item>
        </el-menu>
      </el-footer>

      <!-- 悬浮按钮组 -->
      <div class="floating-buttons">
        <div class="floating-button">
          <el-icon><Headset /></el-icon>
        </div>
        <div class="floating-button">
          <el-icon><ChatDotRound /></el-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.el-dropdown-menu {
  background-color: #004D40 !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  border-radius: 12px !important;
}

.el-dropdown-menu__item {
  color: white !important;
  padding: 12px 20px !important;
  background-color: transparent !important;
}

.el-dropdown-menu__item:not(.is-disabled):hover {
  color: white !important;
  background-color: #006D5B !important;
}

.el-dropdown-menu__item.is-disabled {
  color: rgba(255, 255, 255, 0.5) !important;
}

.el-popper.is-light {
  border: none !important;
  background: transparent !important;
}

.el-popper__arrow {
  display: none !important;
}
</style>

<style scoped>
.app-container {
  min-height: 100vh;
  background-color: #f5f5f5;
}

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

.main-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.pdf-container {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  min-height: calc(100vh - 180px);
  position: relative;
}

.mode-switch {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 100;
}

.switch-button {
  background-color: #004D40;
  color: white;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.switch-button:hover {
  background-color: rgba(0, 77, 64 ) !important;
  color: white !important;
}

.is-reverse {
  transform: rotate(180deg);
  transition: transform 0.3s ease;
}

.el-icon--right {
  transition: transform 0.3s ease;
}

.floating-buttons {
  position: fixed;
  right: 20px;
  bottom: 90px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  z-index: 100;
}

.floating-button {
  width: 48px;
  height: 48px;
  background-color: #004D40 !important;
  border: none;
  box-shadow: 0 4px 12px rgba(0, 77, 64, 0.2);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
}

.floating-button:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 16px rgba(0, 77, 64, 0.3);
}

.floating-button .el-icon {
  font-size: 20px;
  color: white;
}

.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #004D40;
  padding: 0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
}

.footer-menu {
  display: flex;
  justify-content: space-around;
  background-color: #004D40;
  border: none;
}

.el-menu-item {
  display: flex;
  justify-content: center;
  color: white !important;
}

.el-menu-item:hover,
.el-menu-item.is-active {
  color: white !important;
  background-color: rgba(255, 255, 255, 0.1) !important;
  border-bottom-color: white !important;
}

@media screen and (max-width: 768px) {
  .header-right .user-email {
    display: none;
  }

  .main-content {
    padding: 10px;
  }

  .pdf-container {
    padding: 10px;
  }
}

.switch-dropdown {
  margin-right: 20px;
}

.switch-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background-color: #004D40;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.switch-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
