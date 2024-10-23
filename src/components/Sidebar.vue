<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const isCollapsed = ref(false)

const navItems = [
  { 
    icon: '🏠', 
    text: '主页',
    path: '/'
  },
  { 
    icon: '📱', 
    text: '应用',
    path: '/apps'
  },
  { 
    icon: '🎥', 
    text: '视频',
    path: '/videos'
  },
  { 
    icon: '📚', 
    text: '文库',
    path: '/library'
  },
  { 
    icon: '❓', 
    text: '帮助',
    path: '/help'
  }
]

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
  // 添加一个小延迟来触发重排，使动画更流畅
  requestAnimationFrame(() => {
    document.body.style.transform = 'translateZ(0)'
    setTimeout(() => {
      document.body.style.transform = ''
    }, 0)
  })
}
</script>

<template>
  <nav 
    class="sidebar" 
    :class="{ collapsed: isCollapsed }"
    @mouseenter="isCollapsed ? toggleSidebar() : null"
    @mouseleave="!isCollapsed ? toggleSidebar() : null"
  >
    <button 
      class="toggle-button" 
      @click="toggleSidebar"
      :title="isCollapsed ? '展开侧边栏' : '收起侧边栏'"
    >
      ◀
    </button>
    <router-link
      v-for="item in navItems"
      :key="item.path"
      :to="item.path"
      class="nav-item"
      :class="{ active: route.path === item.path }"
    >
      <span class="nav-icon">{{ item.icon }}</span>
      <span class="nav-text">{{ item.text }}</span>
    </router-link>
  </nav>
</template>