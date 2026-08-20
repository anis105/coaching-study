/**
 * DOM rendering functions — one per tab panel.
 * Each function returns an HTML string built from data modules.
 * No side effects; pure string → string transforms.
 */

import { stats, threads, shocks, actionItems } from './data/stats.js'
import { chapters, bookParts } from './data/chapters.js'
import { terms, translationIssues } from './data/terms.js'
import { questions } from './data/questions.js'
import { timeline } from './data/timeline.js'

// ── Helpers ──

function sectionHeader(label, title, desc) {
  return `
    <div class="section-label">${label}</div>
    <div class="section-title">${title}</div>
    <div class="section-desc">${desc}</div>`
}

// ── Overview panel ──

export function renderOverview() {
  const statsHTML = stats
    .map(
      (s) => `
    <div class="stat-card">
      <div class="stat-num">${s.num}</div>
      <div class="stat-label">${s.label}</div>
    </div>`
    )
    .join('')

  const bookMap = renderBookMapSVG()

  return `
    ${sectionHeader('全书画像', '一个 50 年历史的年轻学科', '76% 的论文发表于 2010 年以后，概念发展仍相对薄弱。四个视角、四位主编、25 章。')}
    <div class="stats-row">${statsHTML}</div>
    ${sectionHeader('全书结构', '', '深色章节为精读目标。')}
    <figure class="book-map-wrap">
      ${bookMap}
      <figcaption>全书 25 章的四部分结构。★ 标记精读的 6 章，散布在四个部分中。</figcaption>
    </figure>
    <div class="card card-highlight">
      <div style="font-weight:700;font-size:14px;color:var(--accent);margin-bottom:6px;">核心张力</div>
      <div style="font-size:14px;color:var(--text-secondary);">全书的隐含共识：执教是复杂的、情境性的、关系性的实践，不可还原为通用模板。心理学部分最成熟，社会文化部分最具批判性，未来方向部分充满了"我们还不知道什么"的坦诚。</div>
    </div>`
}

function renderBookMapSVG() {
  const ROW_H = 42
  const CHIP_W = 70
  const CHIP_H = 28
  const GAP = 8
  const LEFT = 100
  const LABEL_X = 16
  let rows = []

  bookParts.forEach((part, pi) => {
    const y = 14 + pi * (CHIP_H + ROW_H - 14)
    // Part label
    rows.push(
      `<text x="${LABEL_X}" y="${y + 19}" fill="currentColor" font-family="DM Sans, sans-serif" font-size="11" font-weight="700" letter-spacing="0.06em" opacity="0.5">${part.label}</text>`
    )
    // Chapter chips
    part.chapters.forEach((ch, ci) => {
      const cx = LEFT + ci * (CHIP_W + GAP)
      if (ch.deep) {
        rows.push(
          `<rect x="${cx}" y="${y}" width="${CHIP_W}" height="${CHIP_H}" rx="4" fill="var(--accent)" opacity="0.9"/>`
        )
        rows.push(
          `<text x="${cx + CHIP_W / 2}" y="${y + 19}" fill="#fff" font-family="DM Sans, sans-serif" font-size="12" font-weight="700" text-anchor="middle">Ch${ch.n} ★</text>`
        )
      } else {
        rows.push(
          `<rect x="${cx}" y="${y}" width="${CHIP_W}" height="${CHIP_H}" rx="4" fill="currentColor" opacity="0.08" stroke="currentColor" stroke-opacity="0.15"/>`
        )
        rows.push(
          `<text x="${cx + CHIP_W / 2}" y="${y + 19}" fill="currentColor" font-family="DM Sans, sans-serif" font-size="12" text-anchor="middle" opacity="0.5">Ch${ch.n}</text>`
        )
      }
    })
  })

  const totalH = 14 + bookParts.length * (CHIP_H + ROW_H - 14) + 10
  const legendY = 86

  rows.push(
    `<rect x="700" y="${legendY}" width="14" height="14" rx="3" fill="var(--accent)" opacity="0.9"/>`,
    `<text x="720" y="${legendY + 11}" fill="currentColor" font-family="DM Sans, sans-serif" font-size="12" opacity="0.7">精读章节</text>`,
    `<rect x="700" y="${legendY + 22}" width="14" height="14" rx="3" fill="currentColor" opacity="0.08" stroke="currentColor" stroke-opacity="0.15"/>`,
    `<text x="720" y="${legendY + 33}" fill="currentColor" font-family="DM Sans, sans-serif" font-size="12" opacity="0.7">浏览章节</text>`
  )

  return `<svg viewBox="0 0 880 ${totalH}" role="img" aria-label="全书 25 章分布在四个部分中，6 章被标记为精读目标">${rows.join('')}</svg>`
}

// ── Threads panel ──

export function renderThreads() {
  const cards = threads
    .map(
      (t) => `
    <div class="thread-card ${t.variant === 'default' ? '' : t.variant}">
      <div class="thread-name">${t.name}</div>
      <div class="thread-chapters">
        ${t.chapters.map((c) => `<span class="ch-chip">${c}</span>`).join('')}
      </div>
      <div class="thread-insight">
        <strong>关键发现：</strong>${t.finding}<br>
        <strong>可用框架：</strong>${t.frameworks}<br>
        <strong>研究空白：</strong>${t.gap}
      </div>
    </div>`
    )
    .join('')

  return `
    ${sectionHeader('研究主线', '三条线索穿过六个章节', '精读章节覆盖三条与实验室研究方向对应的主线，每条线连接两个章节。')}
    ${cards}`
}

// ── Chapters panel ──

export function renderChapters() {
  const items = chapters
    .map(
      (ch) => `
    <button class="accordion-btn" data-target="${ch.id}">
      <span class="ch-num">${ch.num}</span>
      <span class="ch-title">${ch.title}</span>
      <span class="ch-author">${ch.author}</span>
      <span class="arrow">▼</span>
    </button>
    <div class="accordion-body" id="${ch.id}">
      <h4>核心问题</h4>
      <ul><li>${ch.coreQuestion}</li></ul>
      <h4>关键论点</h4>
      <ul>
        ${ch.arguments.map((a) => `<li><strong>${a.label}</strong>：${a.text} <span class="cite">${a.cite}</span></li>`).join('')}
      </ul>
      <h4>对我们的启发</h4>
      <ul>
        ${ch.inspiration.map((i) => `<li>${i}</li>`).join('')}
      </ul>
    </div>`
    )
    .join('')

  return `
    ${sectionHeader('逐章精读', '六章深读笔记', '每章按统一结构展开：核心问题 → 论点 → 概念 → 启发 → 可引用点。')}
    ${items}`
}

// ── Shocks panel ──

export function renderShocks() {
  const cards = shocks
    .map(
      (s) => `
    <div class="shock-card">
      <div class="shock-icon">${s.icon}</div>
      <div>
        <h3>${s.title}</h3>
        <p>${s.body}</p>
        <div class="shock-evidence">${s.evidence}</div>
      </div>
    </div>`
    )
    .join('')

  const actions = actionItems
    .map((a) => `<strong>${a.label}：</strong>${a.text}`)
    .join('<br>')

  return `
    ${sectionHeader('认知转变', '作为 CS 研究者的三个冲击', '这些不是"书里说了什么"，而是"读完后我的思维模式在哪里被打破了"。')}
    <div class="shock-grid">${cards}</div>
    <div class="card action-card">
      <div class="action-title">转化为行动</div>
      <div class="action-body">${actions}</div>
    </div>`
}

// ── Terms panel ──

export function renderTerms() {
  const rows = terms
    .map(
      (t) => `
    <tr>
      <td>${t.rank}</td>
      <td class="term-en">${t.en}</td>
      <td>${t.distribution}</td>
      <td class="term-rec">${t.recommendation}</td>
      <td>${t.reason}</td>
    </tr>`
    )
    .join('')

  const issues = translationIssues
    .map((i) => `<li><strong>${i.term}</strong>：${i.detail}</li>`)
    .join('')

  return `
    ${sectionHeader('术语审计', '十个最该统一的术语', '152 个术语候选中，30 个核心术语在全书 34 万字中做了粗扫。16 个存在不一致译法（53%）。')}
    <div class="terms-wrap">
      <table class="terms-table">
        <thead>
          <tr><th>#</th><th>英文</th><th>当前译法分布</th><th>建议</th><th>理由</th></tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
    <div class="card issues-card">
      <div class="issues-title">⚠ 疑似翻译问题</div>
      <ul>${issues}</ul>
    </div>`
}

// ── Plan & Q&A panel ──

export function renderPlan() {
  const tl = timeline
    .map(
      (t) => `
    <div class="tl-item${t.highlight ? ' highlight' : ''}">
      <div class="tl-day">${t.day}</div>
      <div class="tl-content">${t.content}</div>
      <div class="tl-detail">${t.detail}</div>
      <div class="tl-hours">${t.hours}</div>
    </div>`
    )
    .join('')

  const grouped = { A: [], B: [], C: [] }
  questions.forEach((q) => grouped[q.type].push(q))

  const qaSections = [
    { key: 'A', label: 'A 类 · 书讲了什么', cssClass: 'qa-type-a' },
    { key: 'B', label: 'B 类 · 怎么理解', cssClass: 'qa-type-b' },
    { key: 'C', label: 'C 类 · 对工作有什么用', cssClass: 'qa-type-c' },
  ]
    .map(
      ({ key, label, cssClass }) => `
    <div style="margin-top:16px;">
      <span class="qa-type-label ${cssClass}">${label}</span>
      ${grouped[key]
        .map(
          (q) => `
        <button class="accordion-btn" data-target="${q.id}">
          <span class="ch-title">${q.question}</span>
          <span class="arrow">▼</span>
        </button>
        <div class="accordion-body" id="${q.id}">
          <ul>${q.answer.map((a) => `<li>${a}</li>`).join('')}</ul>
        </div>`
        )
        .join('')}
    </div>`
    )
    .join('')

  return `
    ${sectionHeader('学习计划', '两周精读路线图', '总预计 28–36 小时，每天约 2–2.5 小时。先建全景，再按"工具→关系→网络→批判→技术"逐步深入。')}
    <div class="timeline">${tl}</div>
    <div style="margin-top:32px;">
      ${sectionHeader('备考问答', '十五个问题速览', '分三类：书讲了什么（A）、你怎么理解（B）、对工作有什么用（C）。点击展开回答。')}
    </div>
    ${qaSections}`
}
