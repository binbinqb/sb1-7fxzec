<script setup lang="ts">
import { ref } from 'vue'

const currentTime = ref(new Date().toLocaleTimeString())
const currentDate = ref(new Date().toLocaleDateString())
const selectedModel = ref('Model A')
const testMode = ref('标准测试')
const isTestRunning = ref(false)
const logs = ref<string[]>([])

// 测试统计
const statistics = ref({
  ok: 0,
  ng: 0,
  total: 0,
  okRate: '0.00'
})

// 更新时间
setInterval(() => {
  currentTime.value = new Date().toLocaleTimeString()
  currentDate.value = new Date().toLocaleDateString()
}, 1000)

const models = ['Model A', 'Model B', 'Model C', 'Model D']
const testModes = ['标准测试', '快速测试', '完整测试', '自定义测试']

const startTest = () => {
  isTestRunning.value = true
  addLog(`开始${testMode.value}: ${selectedModel.value}`)
}

const addLog = (message: string) => {
  logs.value.unshift(`[${new Date().toLocaleTimeString()}] ${message}`)
  // 限制日志条数，避免内存占用过多
  if (logs.value.length > 1000) {
    logs.value = logs.value.slice(0, 1000)
  }
}

// 模拟添加测试结果
const addTestResult = (result: 'OK' | 'NG') => {
  statistics.value[result.toLowerCase() as 'ok' | 'ng']++
  statistics.value.total++
  statistics.value.okRate = ((statistics.value.ok / statistics.value.total) * 100).toFixed(2)
  addLog(`测试结果: ${result}`)
}

// 模拟实时数据
const realTimeData = ref(Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  timestamp: new Date(Date.now() - (i * 60000)).toLocaleTimeString(),
  value: Math.random() * 100,
  status: Math.random() > 0.5 ? 'normal' : 'warning'
})))

// 每秒更新一次实时数据
setInterval(() => {
  const newData = {
    id: realTimeData.value[0].id + 1,
    timestamp: new Date().toLocaleTimeString(),
    value: Math.random() * 100,
    status: Math.random() > 0.5 ? 'normal' : 'warning'
  }
  realTimeData.value.unshift(newData)
  realTimeData.value.pop()
}, 1000)
</script>

<template>
  <div class="home-container">
    <!-- 左侧面板 -->
    <div class="left-panel">
      <!-- 状态区域 -->
      <div class="status-section">
        <div class="time-date">
          <div class="time">{{ currentTime }}</div>
          <div class="date">{{ currentDate }}</div>
        </div>
        <div class="statistics">
          <div class="stat-item ok">
            <div class="stat-label">OK</div>
            <div class="stat-value">{{ statistics.ok }}</div>
          </div>
          <div class="stat-item ng">
            <div class="stat-label">NG</div>
            <div class="stat-value">{{ statistics.ng }}</div>
          </div>
          <div class="stat-item total">
            <div class="stat-label">总计</div>
            <div class="stat-value">{{ statistics.total }}</div>
          </div>
          <div class="stat-item rate">
            <div class="stat-label">良率</div>
            <div class="stat-value">{{ statistics.okRate }}%</div>
          </div>
        </div>
        <div class="controls">
          <div class="control-group">
            <label>型号选择：</label>
            <select v-model="selectedModel">
              <option v-for="model in models" :key="model" :value="model">
                {{ model }}
              </option>
            </select>
          </div>
          <div class="control-group">
            <label>测试模式：</label>
            <select v-model="testMode">
              <option v-for="mode in testModes" :key="mode" :value="mode">
                {{ mode }}
              </option>
            </select>
          </div>
          <div class="button-group">
            <button 
              class="start-button" 
              :class="{ running: isTestRunning }"
              @click="startTest"
            >
              {{ isTestRunning ? '测试进行中...' : '开始测试' }}
            </button>
            <div class="result-buttons">
              <button 
                class="result-button ok-button" 
                @click="addTestResult('OK')"
                :disabled="!isTestRunning"
              >
                OK
              </button>
              <button 
                class="result-button ng-button" 
                @click="addTestResult('NG')"
                :disabled="!isTestRunning"
              >
                NG
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- 日志区域 -->
      <div class="log-section">
        <div class="section-header">
          <h3>测试日志</h3>
          <span class="log-count">{{ logs.length }} 条记录</span>
        </div>
        <div class="log-container custom-scrollbar">
          <div v-for="(log, index) in logs" :key="index" class="log-entry">
            {{ log }}
          </div>
        </div>
      </div>
    </div>
    <!-- 右侧面板 -->
    <div class="right-panel">
      <div class="section-header">
        <h2>实时数据</h2>
        <span class="data-count">{{ realTimeData.length }} 条记录</span>
      </div>
      <div class="data-container custom-scrollbar">
        <table class="data-table">
          <thead>
            <tr>
              <th>时间</th>
              <th>数值</th>
              <th>状态</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="data in realTimeData" 
              :key="data.id"
              :class="{ warning: data.status === 'warning' }"
            >
              <td>{{ data.timestamp }}</td>
              <td>{{ data.value.toFixed(2) }}</td>
              <td>
                <span class="status-indicator" :class="data.status"></span>
                {{ data.status === 'normal' ? '正常' : '警告' }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 自定义滚动条样式 */
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: var(--sidebar-active) #f0f0f0;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f0f0f0;
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: var(--sidebar-active);
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #006cbd;
}

.home-container {
  display: flex;
  gap: 1rem;
  height: calc(100vh - 4rem);
  padding: 1rem;
}

.left-panel {
  flex: 3;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-height: 100%;
}

.right-panel {
  flex: 2;
  background: #ffffff;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  max-height: 100%;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding: 0 0.5rem;
}

.log-count, .data-count {
  font-size: 0.9rem;
  color: var(--text-secondary);
  background: #f0f0f0;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
}

.status-section {
  padding: 1rem;
  border-bottom: 1px solid #e0e0e0;
}

/* ... 其他样式保持不变 ... */

.log-section {
  flex: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  min-height: 0; /* 重要：允许内容收缩 */
}

.log-container {
  flex: 1;
  overflow-y: auto;
  background: #f8f9fa;
  border-radius: 4px;
  padding: 0.5rem;
  min-height: 0; /* 重要：允许内容收缩 */
}

.log-entry {
  padding: 0.5rem;
  font-family: monospace;
  font-size: 0.9rem;
  border-bottom: 1px solid #e9ecef;
  line-height: 1.4;
}

.log-entry:first-child {
  color: var(--sidebar-active);
  font-weight: bold;
}

.data-container {
  flex: 1;
  overflow-y: auto;
  background: #f8f9fa;
  border-radius: 4px;
  padding: 0.5rem;
  min-height: 0; /* 重要：允许内容收缩 */
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

.data-table th {
  background: #f0f0f0;
  padding: 0.75rem;
  text-align: left;
  position: sticky;
  top: 0;
  z-index: 1;
}

.data-table td {
  padding: 0.75rem;
  border-bottom: 1px solid #e9ecef;
}

.data-table tr:hover {
  background: #f8f9fa;
}

.data-table tr.warning {
  background: #fff3cd;
}

.status-indicator {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 0.5rem;
}

.status-indicator.normal {
  background: #28a745;
}

.status-indicator.warning {
  background: #ffc107;
}

/* 保持其他现有样式不变 */
</style>