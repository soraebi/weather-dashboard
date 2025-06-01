<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
    <div class="flex items-center space-x-2 mb-4">
      <span class="text-xl">⚠️</span>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">気象警報</h3>
    </div>
    <div v-if="alerts.length > 0" class="space-y-3">
      <div v-for="alert in alerts" :key="alert.type" 
           class="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg">
        <div class="flex items-center space-x-2">
          <span class="text-lg">{{ alert.icon }}</span>
          <span class="font-semibold text-red-800 dark:text-red-200">{{ alert.title }}</span>
        </div>
        <p class="text-sm text-red-600 dark:text-red-300 mt-1">{{ alert.message }}</p>
      </div>
    </div>
    <div v-else class="text-center py-8">
      <div class="text-4xl mb-2">✅</div>
      <p class="text-gray-500 dark:text-gray-400">現在、警報はありません</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WeatherAlertsCard',
  props: {
    alerts: {
      type: Array,
      default: () => []
    }
  }
}
</script>