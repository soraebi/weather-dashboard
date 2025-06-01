<template>
  <div class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
    <div class="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center shadow-2xl max-w-md mx-4">
      <div class="text-red-500 text-6xl mb-4">⚠️</div>
      <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">エラーが発生しました</h3>
      <p class="text-gray-600 dark:text-gray-300 mb-6">{{ error }}</p>
      <button @click="$emit('clear')" class="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200">
        再試行
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ErrorOverlay',
  props: {
    error: {
      type: String,
      required: true
    }
  },
  emits: ['clear']
}
</script>