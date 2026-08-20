/**
 * Entry point — mounts rendered panels and wires up interactivity.
 */

import './style.css'
import {
  renderOverview,
  renderThreads,
  renderChapters,
  renderShocks,
  renderTerms,
  renderPlan,
} from './render.js'

// ── Mount panels ──

const panels = {
  overview: renderOverview,
  threads: renderThreads,
  chapters: renderChapters,
  shocks: renderShocks,
  terms: renderTerms,
  plan: renderPlan,
}

document.addEventListener('DOMContentLoaded', () => {
  // Render all panels
  for (const [id, renderFn] of Object.entries(panels)) {
    const el = document.getElementById(`panel-${id}`)
    if (el) el.innerHTML = renderFn()
  }

  // Tab switching
  document.querySelectorAll('.tab-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach((b) => b.classList.remove('active'))
      document.querySelectorAll('.panel').forEach((p) => p.classList.remove('active'))
      btn.classList.add('active')
      document.getElementById(`panel-${btn.dataset.tab}`).classList.add('active')
    })
  })

  // Accordion (event delegation)
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.accordion-btn')
    if (!btn) return
    const target = document.getElementById(btn.dataset.target)
    if (!target) return
    btn.classList.toggle('open')
    target.classList.toggle('open')
  })
})
