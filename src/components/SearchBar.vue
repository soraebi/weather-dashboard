<template>
  <div class="mt-16 lg:mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
    <div class="flex justify-end">
      <div class="relative w-full sm:w-auto">
        <input
          :value="searchQuery"
          @input="$emit('update:search-query', $event.target.value)"
          @keypress.enter="$emit('search')"
          type="text"
          placeholder="都市名を検索..."
          class="w-full sm:w-64 px-4 py-2 pl-10 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white shadow-sm"
        />
        <div class="absolute inset-y-0 left-0 flex items-center pl-3">
          <span class="text-gray-400">🔍</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  props: {
    searchQuery: {
      type: String,
      default: ''
    }
  },
  emits: ['update:search-query', 'search']
}
</script>