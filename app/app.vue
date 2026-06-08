<template>
  <main class="min-h-screen bg-zinc-950 text-zinc-100 px-4 py-16">
    <div class="max-w-2xl mx-auto flex flex-col gap-8">

      <!-- Header -->
      <div class="flex flex-col gap-1">
        <h1 class="text-2xl font-bold tracking-tight">
          HTTP Header Inspector
        </h1>
        <p class="text-zinc-500 text-sm">
          Analizá los headers HTTP y la seguridad de cualquier sitio.
        </p>
      </div>

      <!-- Form -->
      <UrlForm :loading="loading" :error="error" @analyze="analyze" />

      <!-- Resultados -->
      <ResultPanel v-if="result" :result="result" />

    </div>
  </main>
</template>

<script setup lang="ts">
const { result, error, loading, analyze } = useAnalyzer()
</script>