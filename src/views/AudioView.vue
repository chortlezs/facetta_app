<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { House, Headset, Document, VideoPlay, VideoPause, HomeFilled, Setting, ChatDotRound, DArrowLeft, DArrowRight } from '@element-plus/icons-vue'
import AppHeader from '../components/AppHeader.vue'

const activeIndex = ref('2')
const audioRef = ref<HTMLAudioElement>()
const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const subtitles = ref<Array<{id: number, start: number, end: number, text: string}>>([])
const currentSubtitle = ref('')
const contextSubtitles = ref<string[]>([])

// 解析SRT时间格式
function parseTime(timeStr: string): number {
  const [time, ms] = timeStr.split(',')
  const [hours, minutes, seconds] = time.split(':').map(Number)
  return hours * 3600 + minutes * 60 + seconds + Number(ms) / 1000
}

// 加载SRT字幕文件
async function loadSubtitles() {
  try {
    const response = await fetch('/papers/audio/lecture-1.srt')
    const text = await response.text()
    const blocks = text.trim().split('\n\n')
    
    subtitles.value = blocks.map(block => {
      const lines = block.split('\n')
      const id = parseInt(lines[0])
      const [startTime, endTime] = lines[1].split(' --> ')
      const text = lines.slice(2).join(' ')
      
      return {
        id,
        start: parseTime(startTime),
        end: parseTime(endTime),
        text
      }
    })
  } catch (error) {
    console.error('加载字幕失败:', error)
  }
}

// 更新当前字幕
function updateSubtitle() {
  const time = currentTime.value
  const current = subtitles.value.find(sub => time >= sub.start && time <= sub.end)
  
  if (current) {
    currentSubtitle.value = current.text
    
    // 获取前后两句话
    const currentIndex = subtitles.value.findIndex(sub => sub.id === current.id)
    const prevSub = currentIndex > 0 ? subtitles.value[currentIndex - 1] : null
    const nextSub = currentIndex < subtitles.value.length - 1 ? subtitles.value[currentIndex + 1] : null
    
    contextSubtitles.value = [
      prevSub?.text || '',
      current.text,
      nextSub?.text || ''
    ].filter(text => text)
  } else {
    currentSubtitle.value = ''
    contextSubtitles.value = []
  }
}

// 播放/暂停
function togglePlay() {
  if (!audioRef.value) return
  
  if (isPlaying.value) {
    audioRef.value.pause()
  } else {
    audioRef.value.play()
  }
}

// 向前15秒
function skipForward() {
  if (!audioRef.value) return
  audioRef.value.currentTime = Math.min(audioRef.value.currentTime + 15, duration.value)
}

// 向后15秒
function skipBackward() {
  if (!audioRef.value) return
  audioRef.value.currentTime = Math.max(audioRef.value.currentTime - 15, 0)
}

// 音频事件处理
function onTimeUpdate() {
  if (audioRef.value) {
    currentTime.value = audioRef.value.currentTime
  }
}

function onLoadedMetadata() {
  if (audioRef.value) {
    duration.value = audioRef.value.duration
  }
}

function onPlay() {
  isPlaying.value = true
}

function onPause() {
  isPlaying.value = false
}

// 进度条拖拽
function onProgressChange(value: number) {
  if (audioRef.value) {
    audioRef.value.currentTime = value
    currentTime.value = value
  }
}

// 格式化时间显示
function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

// 监听时间变化更新字幕
watch(currentTime, updateSubtitle)

onMounted(() => {
  loadSubtitles()
})
</script>

<template>
  <div class="app-wrapper">
    <div class="app-container">
      <!-- 顶部栏 -->
      <AppHeader />

      <!-- 主要内容区 -->
      <div class="main-content">
        <div class="audio-container">
          <h1>音频播放器</h1>
          
          <!-- 字幕显示区域 -->
          <div class="subtitle-area">
            <!-- 上下文字幕 -->
            <div class="context-subtitles" v-if="contextSubtitles.length > 0">
              <div 
                v-for="(subtitle, index) in contextSubtitles" 
                :key="index"
                :class="['context-line', { 'current': index === 1 }]"
              >
                {{ subtitle }}
              </div>
            </div>
          </div>
          
          <!-- 音频播放器 -->
          <div class="audio-player">
            <audio 
              ref="audioRef"
              @timeupdate="onTimeUpdate"
              @loadedmetadata="onLoadedMetadata"
              @play="onPlay"
              @pause="onPause"
              preload="metadata"
            >
              <source src="/papers/audio/lecture-1.mp3" type="audio/mpeg">
              您的浏览器不支持音频播放。
            </audio>
            
            <!-- 播放控制 -->
            <div class="player-controls">
              <!-- 向后15秒按钮 -->
              <el-button 
                type="primary" 
                circle 
                size="large"
                @click="skipBackward"
                class="control-button"
              >
                <el-icon size="20">
                  <DArrowLeft />
                </el-icon>
              </el-button>
              
              <!-- 播放/暂停按钮 -->
              <el-button 
                type="primary" 
                circle 
                size="large"
                @click="togglePlay"
                class="play-button"
              >
                <el-icon size="24">
                  <VideoPlay v-if="!isPlaying" />
                  <VideoPause v-else />
                </el-icon>
              </el-button>
              
              <!-- 向前15秒按钮 -->
              <el-button 
                type="primary" 
                circle 
                size="large"
                @click="skipForward"
                class="control-button"
              >
                <el-icon size="20">
                  <DArrowRight />
                </el-icon>
              </el-button>
            </div>
            
            <!-- 进度条区域 -->
            <div class="progress-area">
              <span class="time-display">{{ formatTime(currentTime) }}</span>
              <el-slider 
                v-model="currentTime"
                :max="duration"
                :step="0.1"
                @change="onProgressChange"
                class="progress-slider"
              />
              <span class="time-display">{{ formatTime(duration) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 底部导航栏 -->
      <el-footer class="footer">
        <el-menu mode="horizontal" class="footer-menu" default-active="2">
          <el-menu-item index="1" @click="$router.push('/')">
            <el-icon>
              <HomeFilled />
            </el-icon>
          </el-menu-item>
          <el-menu-item index="2">
            <el-icon>
              <Headset />
            </el-icon>
          </el-menu-item>
          <el-menu-item index="3" @click="$router.push('/paper/1')">
            <el-icon>
              <Document />
            </el-icon>
          </el-menu-item>
          <el-menu-item index="4">
            <el-icon>
              <Setting />
            </el-icon>
          </el-menu-item>
        </el-menu>
      </el-footer>

      <!-- 悬浮按钮组 -->
      <div class="floating-buttons">
        <div class="floating-button">
          <el-icon>
            <Headset />
          </el-icon>
        </div>
        <div class="floating-button">
          <el-icon>
            <ChatDotRound />
          </el-icon>
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

.main-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.audio-container {
  background: white;
  height: calc(100vh - 160px);
  display: flex;
  flex-direction: column;
  text-align: center;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.audio-container h1 {
  color: #004D40;
  margin: 0;
  padding: 20px;
  flex-shrink: 0;
}

.audio-player {
  padding: 20px;
  flex-shrink: 0;
}

.player-controls {
   display: flex;
   align-items: center;
   justify-content: center;
   gap: 20px;
   margin-bottom: 20px;
 }
 
 .play-button {
   background-color: #004D40 !important;
   border-color: #004D40 !important;
   width: 60px;
   height: 60px;
   min-width: 60px;
   min-height: 60px;
   border-radius: 50% !important;
   flex-shrink: 0;
 }
 
 .control-button {
   background-color: #00695C !important;
   border-color: #00695C !important;
   width: 50px;
   height: 50px;
   min-width: 50px;
   min-height: 50px;
   border-radius: 50% !important;
   flex-shrink: 0;
 }
 
 .progress-area {
   display: flex;
   align-items: center;
   gap: 15px;
   width: 100%;
 }

.time-display {
  color: #666;
  font-size: 14px;
  min-width: 45px;
}

.progress-slider {
  flex: 1;
}

.progress-slider :deep(.el-slider__runway) {
  background-color: #e4e7ed;
}

.progress-slider :deep(.el-slider__bar) {
  background-color: #004D40;
}

.progress-slider :deep(.el-slider__button) {
  border-color: #004D40;
}

.subtitle-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow-y: auto;
  padding: 20px;
}

.context-subtitles {
  text-align: center;
  padding: 20px;
  margin: auto 0;
  min-height: 200px;
}

.context-line {
  padding: 10px 15px;
  margin: 5px 0;
  border-radius: 4px;
  line-height: 1.5;
  color: #666;
  background-color: #f5f5f5;
}

.context-line.current {
  background-color: #e8f5e8;
  color: #004D40;
  font-weight: 500;
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
</style>