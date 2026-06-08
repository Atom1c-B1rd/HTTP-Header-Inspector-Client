<template>
    <div class="flex flex-col gap-3">
        <div class="flex gap-2">
            <input v-model="input" type="url" placeholder="https://example.com" :disabled="loading"
                @keydown.enter="submit" class="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2.5
               text-sm text-zinc-100 placeholder-zinc-500 font-mono
               focus:outline-none focus:border-zinc-500 transition-colors
               disabled:opacity-50" />
            <button @click="submit" :disabled="loading || !input" class="px-5 py-2.5 rounded-lg text-sm font-semibold transition-all
               bg-zinc-100 text-zinc-900 hover:bg-white
               disabled:opacity-40 disabled:cursor-not-allowed">
                <span v-if="loading" class="flex items-center gap-2">
                    <svg class="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Analizando
                </span>
                <span v-else>Analizar</span>
            </button>
        </div>
        <p v-if="error" class="text-red-400 text-xs font-mono px-1">{{ error }}</p>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    loading: boolean
    error: string | null
}>()

const emit = defineEmits<{
    analyze: [url: string]
}>()

const input = ref('')

const submit = () => {
    if (!input.value || props.loading) return
    emit('analyze', input.value)
}
</script>