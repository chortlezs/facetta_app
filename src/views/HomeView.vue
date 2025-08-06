<script setup lang="ts">
import { ref } from 'vue'
import { Document, Folder, Setting, HomeFilled, Headset, ChatDotRound } from '@element-plus/icons-vue'

// 当前选中的日期
const currentDate = ref(new Date())

// 最近文档数据
const recentDocuments = ref([
  {
    id: 1,
    name: 'Downloads',
    size: '103MB',
    date: '06/15/2025',
    type: 'folder'
  },
  {
    id: 2,
    name: 'Documents',
    size: '5G',
    date: '06/15/2025',
    type: 'folder'
  },
  {
    id: 3,
    name: 'Pictures',
    size: '2.5G',
    date: '06/14/2025',
    type: 'folder'
  },
  {
    id: 4,
    name: 'Videos',
    size: '8.1G',
    date: '06/13/2025',
    type: 'folder'
  },
  {
    id: 5,
    name: 'Music',
    size: '1.8G',
    date: '06/12/2025',
    type: 'folder'
  },
  {
    id: 6,
    name: 'Projects',
    size: '756MB',
    date: '06/11/2025',
    type: 'folder'
  }
])

// 最近笔记数据
const recentNotes = ref([
  {
    id: 1,
    name: '02-project-description',
    size: '1MB',
    date: '03/12/2025',
    type: 'pdf'
  },
  {
    id: 2,
    name: '03-technical-specs',
    size: '2.5MB',
    date: '03/13/2025',
    type: 'pdf'
  },
  {
    id: 3,
    name: '04-user-research',
    size: '3.8MB',
    date: '03/14/2025',
    type: 'pdf'
  },
  {
    id: 4,
    name: '05-design-guidelines',
    size: '5.2MB',
    date: '03/15/2025',
    type: 'pdf'
  },
  {
    id: 5,
    name: '06-implementation',
    size: '1.7MB',
    date: '03/16/2025',
    type: 'pdf'
  }
])
</script>

<template>
  <div class="app-wrapper">
    <div class="app-container">
      <!-- 顶部栏 -->
      <el-header class="header">
        <div class="header-left">
          <h1 class="app-title">💎 facetta</h1>
        </div>
        <div class="header-right">
          <el-avatar :size="32" src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alen" />
          <span class="user-name">Alen Gao</span>
          <span class="user-email">Alen.Gao482@gmail.com</span>
        </div>
      </el-header>

      <!-- 主要内容区 -->
      <div class="main-content">
        <!-- 日期选择 -->
        <!--
        <div class="date-section">
          <div class="date-picker-container">
            <div class="date-icon">
              <el-icon size="24"><Folder /></el-icon>
            </div>
            <el-date-picker
              v-model="currentDate"
              type="date"
              format="MM/DD/YYYY"
              placeholder="选择日期"
              class="custom-date-picker"
            />
          </div>
        </div>
        -->

        <!-- 最近文档区域 -->
        <section class="content-section documents-section">
          <h2>Recent Documents Section</h2>
          <div class="scroll-container">
            <div class="cards-container">
              <div class="document-card" v-for="doc in recentDocuments" :key="doc.id" @click="$router.push(`/paper/${doc.id}`)">
                <div class="card-content">
                  <div class="card-main">
                    <div class="card-icon folder-icon">
                      <el-icon size="32"><Folder /></el-icon>
                    </div>
                    <h3>{{ doc.name }}</h3>
                  </div>
                  <div class="card-footer">
                    <span class="size">{{ doc.size }}</span>
                    <span class="date">{{ doc.date }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 最近笔记区域 -->
        <section class="content-section notes-section">
          <h2>Recent Notes Section</h2>
          <div class="scroll-container">
            <div class="cards-container">
              <div class="note-card" v-for="note in recentNotes" :key="note.id" @click="$router.push(`/paper/${note.id}`)">
                <div class="card-content">
                  <div class="card-main">
                    <div class="card-icon document-icon">
                      <el-icon size="32"><Document /></el-icon>
                    </div>
                    <h3>{{ note.name }}</h3>
                  </div>
                  <div class="card-footer">
                    <span class="size">{{ note.size }}</span>
                    <span class="date">{{ note.date }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- 底部导航栏 -->
      <el-footer class="footer">
        <el-menu mode="horizontal" class="footer-menu" default-active="1">
          <el-menu-item index="1">
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

.date-section {
  position: relative;
  z-index: 1;
  padding: 0;
  width: 100%;
  margin: 20px 0;
}

.date-picker-container {
  display: flex;
  align-items: center;
  gap: 15px;
  width: 100%;
  background-color: white;
  padding: 15px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

@media screen and (min-width: 768px) {
  .date-section {
    padding: 0 20px;
  }
}

.content-section {
  margin: 30px 0;
}

.cards-container {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding: 10px 0;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

.cards-container::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

/* 悬浮按钮样式 */
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

.document-card,
.note-card {
  flex: 0 0 calc(20% - 16px); /* 5个卡片，减去间距 */
  min-width: 200px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  cursor: pointer;
}

.document-card:hover,
.note-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.card-content {
  text-align: center;
  padding: 20px;
}

.card-content h3 {
  margin: 10px 0;
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.card-info {
  display: flex;
  justify-content: space-between;
  color: #666;
  font-size: 14px;
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
}

@media screen and (max-width: 1200px) {
  .document-card,
  .note-card {
    flex: 0 0 calc(25% - 15px); /* 4个卡片 */
  }
}

@media screen and (max-width: 992px) {
  .document-card,
  .note-card {
    flex: 0 0 calc(33.333% - 14px); /* 3个卡片 */
  }
}

@media screen and (max-width: 768px) {
  .document-card,
  .note-card {
    flex: 0 0 calc(50% - 10px); /* 2个卡片 */
  }
}

@media screen and (max-width: 480px) {
  .document-card,
  .note-card {
    flex: 0 0 100%; /* 1个卡片 */
  }
}

.card-main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.card-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}
.footer-menu .el-menu-item.is-active {
  color: white !important;
  background-color: rgba(255, 255, 255, 0.1) !important;
  border-bottom-color: white !important;
}
</style>