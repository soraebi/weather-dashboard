<template>
  <div class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
    <div class="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center shadow-2xl">
      <div class="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
      <p class="text-gray-600 dark:text-gray-300 font-medium">天気データを読み込み中...</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoadingOverlay'
}
</script>