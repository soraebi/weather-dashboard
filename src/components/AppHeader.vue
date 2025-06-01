<template>
  <header class="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-sm border-b border-gray-200/50 dark:border-gray-700/50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 lg:h-20">
        <!-- ロゴ -->
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white text-xl">
            🌤️
          </div>
          <h1 @click="$emit('scroll-to-top')" class="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
            お天気ダッシュボード
          </h1>
        </div>

        <!-- コントロール -->
        <div class="flex items-center space-x-2 lg:space-x-4">
          <!-- ボタングループ -->
          <div class="flex items-center space-x-2">
            <button
              @click="$emit('add-favorite')"
              v-if="currentLocation"
              class="p-2 lg:p-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
              title="お気に入りに追加"
            >
              ⭐
            </button>
            <button
              @click="$emit('load-current-location')"
              class="p-2 lg:p-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
              title="現在地"
            >
              📍
            </button>
            <button
              @click="$emit('refresh')"
              class="p-2 lg:p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
              title="更新"
            >
              🔄
            </button>
            <button
              @click="$emit('toggle-dark-mode')"
              class="p-2 lg:p-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
              title="ダークモード切替"
            >
              {{ isDarkMode ? '☀️' : '🌙' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
  props: {
    currentLocation: {
      type: Object,
      default: null
    },
    isDarkMode: {
      type: Boolean,
      default: false
    }
  },
  emits: ['scroll-to-top', 'add-favorite', 'load-current-location', 'refresh', 'toggle-dark-mode']
}
</script>