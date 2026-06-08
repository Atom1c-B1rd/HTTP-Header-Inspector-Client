<template>
    <div v-if="result?.meta" class="flex flex-col gap-6">

        <!-- Meta -->
        <div class="flex items-center gap-3">
            <span class="font-mono text-2xl font-bold" :class="statusColor">
                {{ result.meta.status }}
            </span>
            <span class="text-zinc-500 text-sm">HTTP Status</span>
            <span v-if="result.meta.redirect" class="ml-auto text-xs text-zinc-400 font-mono truncate max-w-xs">
                → {{ result.meta.redirect }}
            </span>
        </div>

        <!-- Score de seguridad -->
        <div class="p-4 rounded-xl border border-zinc-700 bg-zinc-900/50">
            <div class="flex items-center justify-between mb-3">
                <span class="text-sm text-zinc-400 font-semibold">Security Score</span>
                <span class="text-xl font-bold font-mono" :class="scoreColor">
                    {{ score }}/{{ total }}
                </span>
            </div>
            <div class="w-full bg-zinc-800 rounded-full h-1.5">
                <div class="h-1.5 rounded-full transition-all duration-500" :class="scoreBarColor"
                    :style="{ width: `${(score / total) * 100}%` }" />
            </div>
        </div>

        <!-- Security headers -->
        <div>
            <h3 class="text-xs uppercase tracking-widest text-zinc-500 mb-3">
                Security Headers
            </h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <SecurityBadge v-for="(check, label) in result.security" :key="label" :label="label" :check="check" />
            </div>
        </div>

        <!-- Todas las headers -->
        <div>
            <h3 class="text-xs uppercase tracking-widest text-zinc-500 mb-3">
                All Headers
            </h3>
            <div class="rounded-xl border border-zinc-800 overflow-hidden">
                <div v-for="(value, key) in result.headers" :key="key" class="flex gap-4 px-4 py-2.5 border-b border-zinc-800/50 last:border-0
                 hover:bg-zinc-800/30 transition-colors">
                    <span class="text-xs font-mono text-zinc-400 w-48 shrink-0 truncate">
                        {{ key }}
                    </span>
                    <span class="text-xs font-mono text-zinc-300 break-all">
                        {{ Array.isArray(value) ? value.join(', ') : value }}
                    </span>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import type { AnalysisResult } from '~/composables/useAnalyzer'

const props = defineProps<{
    result: AnalysisResult
}>()

const score = computed(() =>
    Object.values(props.result.security).filter(c => c.present).length
)
const total = computed(() =>
    Object.keys(props.result.security).length
)

const statusColor = computed(() => {
    const s = props.result?.meta?.status
    if (!s) return 'text-zinc-400'
    if (s >= 200 && s < 300) return 'text-green-400'
    if (s >= 300 && s < 400) return 'text-yellow-400'
    return 'text-red-400'
})

const scoreColor = computed(() => {
    if (!props.result?.security) return 'text-zinc-400'
    const ratio = score.value / total.value
    if (ratio >= 0.75) return 'text-green-400'
    if (ratio >= 0.5) return 'text-yellow-400'
    return 'text-red-400'
})

const scoreBarColor = computed(() => {
    if (!props.result?.security) return 'bg-zinc-500'
    const ratio = score.value / total.value
    if (ratio >= 0.75) return 'bg-green-500'
    if (ratio >= 0.5) return 'bg-yellow-500'
    return 'bg-red-500'
})
</script>