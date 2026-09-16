import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(async ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), ['VITE_', 'NEXT_PUBLIC_'])
  const defines: Record<string,string> = {}
  for (const [k,v] of Object.entries(env)) defines[`process.env.${k}`] = JSON.stringify(v)
  const plugins: any[] = [react(), tailwindcss()]
  try {
    // @ts-ignore
    const m = await import('./.vite-source-tags.js')
    plugins.push(m.sourceTags())
  } catch {}
  return {
    plugins,
    envPrefix: ['VITE_', 'NEXT_PUBLIC_'],
    define: defines,
  } as any
})
