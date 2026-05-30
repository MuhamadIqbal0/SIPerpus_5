import { ref } from 'vue'

/**
 * Composable generik untuk menangani state API call
 */
export function useApi() {
  const isLoading = ref(false)
  const error = ref(null)

  /**
   * Jalankan API call dengan state otomatis
   * @param {Function} apiFn - fungsi API (misalnya dari service)
   * @param  {...any} args - parameter untuk apiFn
   */
  async function execute(apiFn, ...args) {
    isLoading.value = true
    error.value = null

    try {
      const result = await apiFn(...args)
      return result
    } catch (e) {
      // Ambil pesan error dari berbagai kemungkinan struktur Axios
      error.value =
        e.response?.data?.message ||
        e.response?.data?.errors?.[0]?.message ||
        e.message ||
        'Terjadi kesalahan yang tidak diketahui'

      throw e // tetap dilempar supaya bisa ditangani di komponen
    } finally {
      isLoading.value = false
    }
  }

  function clearError() {
    error.value = null
  }

  return {
    isLoading,
    error,
    execute,
    clearError
  }
}
