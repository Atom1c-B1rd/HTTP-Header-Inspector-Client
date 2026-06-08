<template>
    <div class="flex items-start gap-3 p-3 rounded-lg border transition-colors" :class="check.present
        ? 'border-green-500/30 bg-green-500/5'
        : 'border-red-500/30 bg-red-500/5'">
        <span class="mt-0.5 text-lg">{{ check.present ? '✅' : '❌' }}</span>
        <div class="flex flex-col gap-0.5 min-w-0">
            <span class="text-sm font-semibold tracking-wide"
                :class="check.present ? 'text-green-400' : 'text-red-400'">
                {{ label }}
            </span>
            <span v-if="check.present && check.value" class="text-xs text-zinc-400 font-mono break-all">
                {{ check.value }}
            </span>
            <span v-else-if="!check.present" class="text-xs text-zinc-500">
                Header no presente
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { SecurityCheck } from '~/composables/useAnalyzer'

defineProps<{
    label: string
    check: SecurityCheck
}>()
</script>