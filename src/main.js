/**
 * Entry point — mounts rendered panels and wires up navigation, disclosure,
 * theme, and device-local reading progress.
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
import { chapters } from './data/chapters.js'

const panels = {
  overview: renderOverview,
  threads: renderThreads,
  chapters: renderChapters,
  shocks: renderShocks,
  terms: renderTerms,
  plan: renderPlan,
}

const STORAGE_KEYS = {
  chapters: 'coaching-study:completed-chapters',
  theme: 'coaching-study:theme',
}

function readCompletedChapters() {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEYS.chapters) || '[]')
    return new Set(Array.isArray(value) ? value : [])
  } catch {
    return new Set()
  }
}

function updateReadingProgress(completed) {
  const count = completed.size
  const fraction = document.getElementById('progress-fraction')
  const bar = document.getElementById('chapter-progress-bar')
  const message = document.getElementById('progress-message')

  if (fraction) fraction.textContent = `${count} / ${chapters.length}`
  if (bar) bar.style.width = `${(count / chapters.length) * 100}%`

  if (message) {
    const next = chapters.find((chapter) => !completed.has(chapter.id))
    message.textContent = next
      ? `下一站：${next.num}，${next.title}`
      : '六章精读完成。现在可以回到三条主线，重新连接观点。'
  }

  document.querySelectorAll('[data-progress-chapter]').forEach((button) => {
    const isComplete = completed.has(button.dataset.progressChapter)
    button.classList.toggle('is-complete', isComplete)
    button.setAttribute('aria-pressed', String(isComplete))
    button.querySelector('.mark-label').textContent = isComplete ? '已完成精读' : '标记为已精读'
  })

  document.querySelectorAll('[data-chapter-status]').forEach((status) => {
    const isComplete = completed.has(status.dataset.chapterStatus)
    status.classList.toggle('is-complete', isComplete)
    status.textContent = isComplete ? '已完成' : '待精读'
  })
}

function activateTab(tabId, options = {}) {
  const targetButton = document.querySelector(`.tab-btn[data-tab="${tabId}"]`)
  const targetPanel = document.getElementById(`panel-${tabId}`)
  if (!targetButton || !targetPanel) return

  document.querySelectorAll('.tab-btn').forEach((button) => {
    const isActive = button === targetButton
    button.classList.toggle('active', isActive)
    button.setAttribute('aria-selected', String(isActive))
    button.tabIndex = isActive ? 0 : -1
  })

  document.querySelectorAll('.panel').forEach((panel) => {
    const isActive = panel === targetPanel
    panel.classList.toggle('active', isActive)
    panel.hidden = !isActive
  })

  if (options.updateHash !== false) history.replaceState(null, '', `#${tabId}`)
  if (options.focus) targetButton.focus()
  if (options.scroll) document.querySelector('.tab-bar').scrollIntoView({ behavior: 'smooth' })
}

function setAccordion(button, shouldOpen) {
  const target = document.getElementById(button.dataset.target)
  if (!target) return
  button.classList.toggle('open', shouldOpen)
  button.setAttribute('aria-expanded', String(shouldOpen))
  target.classList.toggle('open', shouldOpen)
  target.hidden = !shouldOpen
}

function applyTheme(theme) {
  if (theme === 'system') document.documentElement.removeAttribute('data-theme')
  else document.documentElement.dataset.theme = theme

  const labels = { system: '跟随系统', light: '浅色', dark: '深色' }
  const toggle = document.getElementById('theme-toggle')
  if (toggle) {
    toggle.dataset.theme = theme
    toggle.querySelector('.theme-label').textContent = labels[theme]
    toggle.setAttribute('aria-label', `当前为${labels[theme]}主题，点击切换`)
  }
}

document.addEventListener('DOMContentLoaded', () => {
  for (const [id, renderFn] of Object.entries(panels)) {
    const panel = document.getElementById(`panel-${id}`)
    if (panel) panel.innerHTML = renderFn()
  }

  const completed = readCompletedChapters()
  updateReadingProgress(completed)

  const savedTheme = localStorage.getItem(STORAGE_KEYS.theme) || 'system'
  applyTheme(['system', 'light', 'dark'].includes(savedTheme) ? savedTheme : 'system')

  const initialTab = window.location.hash.slice(1)
  activateTab(Object.hasOwn(panels, initialTab) ? initialTab : 'overview', { updateHash: false })

  document.addEventListener('click', (event) => {
    const tab = event.target.closest('.tab-btn')
    if (tab) {
      activateTab(tab.dataset.tab)
      return
    }

    const jump = event.target.closest('[data-jump-tab]')
    if (jump) {
      activateTab(jump.dataset.jumpTab, { scroll: true })
      return
    }

    const chapterJump = event.target.closest('[data-open-chapter]')
    if (chapterJump) {
      activateTab('chapters')
      const accordion = document.querySelector(`[data-target="${chapterJump.dataset.openChapter}"]`)
      if (accordion) {
        setAccordion(accordion, true)
        accordion.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
      return
    }

    const accordion = event.target.closest('.accordion-btn')
    if (accordion) {
      setAccordion(accordion, accordion.getAttribute('aria-expanded') !== 'true')
      return
    }

    const progressButton = event.target.closest('[data-progress-chapter]')
    if (progressButton) {
      const chapterId = progressButton.dataset.progressChapter
      if (completed.has(chapterId)) completed.delete(chapterId)
      else completed.add(chapterId)
      localStorage.setItem(STORAGE_KEYS.chapters, JSON.stringify([...completed]))
      updateReadingProgress(completed)
      return
    }

    const themeToggle = event.target.closest('#theme-toggle')
    if (themeToggle) {
      const themes = ['system', 'light', 'dark']
      const nextTheme = themes[(themes.indexOf(themeToggle.dataset.theme) + 1) % themes.length]
      localStorage.setItem(STORAGE_KEYS.theme, nextTheme)
      applyTheme(nextTheme)
    }
  })

  document.querySelector('.tab-bar-inner').addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return
    const tabs = [...document.querySelectorAll('.tab-btn')]
    const currentIndex = tabs.indexOf(document.activeElement)
    if (currentIndex < 0) return

    event.preventDefault()
    let nextIndex = currentIndex
    if (event.key === 'ArrowRight') nextIndex = (currentIndex + 1) % tabs.length
    if (event.key === 'ArrowLeft') nextIndex = (currentIndex - 1 + tabs.length) % tabs.length
    if (event.key === 'Home') nextIndex = 0
    if (event.key === 'End') nextIndex = tabs.length - 1
    activateTab(tabs[nextIndex].dataset.tab, { focus: true })
  })

  const progressBar = document.getElementById('page-progress-bar')
  const updatePageProgress = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight
    progressBar.style.width = `${scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0}%`
  }
  updatePageProgress()
  window.addEventListener('scroll', updatePageProgress, { passive: true })
})
