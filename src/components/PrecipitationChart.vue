<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
    <div class="flex items-center space-x-2 mb-4">
      <span class="text-xl">🌧️</span>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">降水量予報</h3>
    </div>
    <div class="relative h-64">
      <canvas id="precipitationChart" class="w-full h-full"></canvas>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PrecipitationChart'
}
</script>