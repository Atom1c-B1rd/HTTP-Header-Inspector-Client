export interface SecurityCheck {
    present: boolean
    value: string | null
}

export interface AnalysisResult {
    meta: {
        status: number
        redirect: string | null
    }
    headers: Record<string, string[]>
    security: Record<string, SecurityCheck>
}

export const useAnalyzer = () => {
    const result = ref<AnalysisResult | null>(null)
    const error = ref<string | null>(null)
    const loading = ref(false)

    const analyze = async (url: string) => {
        result.value = null
        error.value = null
        loading.value = true

        try {
            const data = await $fetch<AnalysisResult>('/api/analyze', {
                baseURL: useRuntimeConfig().public.apiBase as string,
                method: 'POST',
                body: { url },
            })
            await nextTick()
            result.value = data
        } catch (e: any) {
            error.value = e?.data?.error ?? 'Error al analizar la URL.'
        } finally {
            loading.value = false
        }
    }

    return { result, error, loading, analyze }
}