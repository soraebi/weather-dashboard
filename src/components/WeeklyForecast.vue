<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
    <div class="flex items-center space-x-2 mb-6">
      <span class="text-xl">📅</span>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">週間予報</h3>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4">
      <div v-for="day in weeklyForecast" :key="day.date" 
           class="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200">
        <div class="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">{{ day.date }}</div>
        <div class="text-3xl mb-2">{{ day.weatherInfo.icon }}</div>
        <div class="text-xs text-gray-500 dark:text-gray-400 mb-2">{{ day.weatherInfo.description }}</div>
        <div class="flex justify-between text-sm">
          <span class="font-semibold text-gray-900 dark:text-white">{{ day.maxTemp }}°</span>
          <span class="text-gray-500 dark:text-gray-400">{{ day.minTemp }}°</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WeeklyForecast',
  props: {
    weeklyForecast: {
      type: Array,
      default: () => []
    }
  }
}
</script>