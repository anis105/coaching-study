/**
 * DOM rendering functions — one per learning stage.
 * Content remains in src/data; this file only shapes the reading experience.
 */

import { stats, threads, shocks, actionItems } from './data/stats.js'
import { chapters, bookParts } from './data/chapters.js'
import { terms, translationIssues } from './data/terms.js'
import { questions } from './data/questions.js'
import { timeline } from './data/timeline.js'

function sectionHeader(step, label, title, desc) {
  return `
    <header class="section-heading">
      <div class="section-step" aria-hidden="true">${step}</div>
      <div>
        <p class="section-label">${label}</p>
        <h2 class="section-title">${title}</h2>
        <p class="section-desc">${desc}</p>
      </div>
    </header>`
}

function renderBookMap() {
  return bookParts
    .map(
      (part, index) => `
        <div class="book-part">
          <div class="part-label">
            <span>${String(index + 1).padStart(2, '0')}</span>
            <strong>${part.label}</strong>
          </div>
          <div class="chapter-track" aria-label="${part.label}章节">
            ${part.chapters
              .map((chapter) => {
                const label = `Ch${chapter.n}`
                return chapter.deep
                  ? `<button class="chapter-node is-deep" type="button" data-open-chapter="ch${chapter.n}-content" aria-label="打开精读章节 ${label}">${label}<small>精读</small></button>`
                  : `<span class="chapter-node">${label}</span>`
              })
              .join('')}
          </div>
        </div>`
    )
    .join('')
}

export function renderOverview() {
  const statsHTML = stats
    .map(
      (item, index) => `
        <article class="stat-card">
          <span class="stat-index">0${index + 1}</span>
          <strong class="stat-num">${item.num}</strong>
          <span class="stat-label">${item.label}</span>
        </article>`
    )
    .join('')

  return `
    ${sectionHeader('01', '建立全景 · 约 8 分钟', '先知道自己站在哪里', '这本书不是一组彼此孤立的章节。先看学科的成熟度、全书结构，以及六章精读在四个视角中的位置。')}

    <div class="narrative-intro">
      <div class="intro-statement">
        <p class="micro-label">阅读起点</p>
        <h3>一个有 50 年历史、却仍在快速定义自己的年轻学科</h3>
        <p>研究数量在增长，但“什么是执教”仍没有被一张通用清单回答。理解这组张力，是进入后续六章的钥匙。</p>
      </div>
      <ol class="journey-steps" aria-label="推荐学习顺序">
        <li><span>1</span><div><strong>看见结构</strong><small>25 章如何分成四个视角</small></div></li>
        <li><span>2</span><div><strong>寻找张力</strong><small>数据、关系与情境如何冲突</small></div></li>
        <li><span>3</span><div><strong>形成判断</strong><small>把观点转化为研究问题</small></div></li>
      </ol>
    </div>

    <div class="subsection-heading">
      <div><p class="micro-label">证据快照</p><h3>六个数字，一眼建立尺度感</h3></div>
      <p>详细出处见各精读章节与检查笔记</p>
    </div>
    <div class="stats-row">${statsHTML}</div>

    <div class="subsection-heading book-map-heading">
      <div><p class="micro-label">全书地图</p><h3>六章精读，散布在四个知识区域</h3></div>
      <div class="map-legend"><span></span>可进入的精读章节</div>
    </div>
    <div class="book-map">${renderBookMap()}</div>

    <aside class="takeaway-card">
      <span class="takeaway-mark" aria-hidden="true">“</span>
      <div>
        <p class="micro-label">这一页只带走一句话</p>
        <p>执教是复杂的、情境性的、关系性的实践，不能被还原为脱离场景的通用模板。</p>
        <small>跨章综合判断；书中观点与个人启发将在精读页分开呈现。</small>
      </div>
      <button class="text-link" type="button" data-jump-tab="threads">沿三条主线继续 <span aria-hidden="true">→</span></button>
    </aside>`
}

export function renderThreads() {
  const cards = threads
    .map(
      (thread, index) => `
        <article class="thread-card ${thread.variant === 'default' ? '' : thread.variant}">
          <div class="route-number">${String(index + 1).padStart(2, '0')}</div>
          <div class="route-main">
            <p class="micro-label">研究路线</p>
            <h3>${thread.name.replace(/线索[一二三]：/, '')}</h3>
            <div class="thread-chapters">
              ${thread.chapters.map((chapter) => `<span class="ch-chip">${chapter}</span>`).join('')}
            </div>
            <p class="route-finding">${thread.finding}</p>
          </div>
          <dl class="route-details">
            <div><dt>可以借用的框架</dt><dd>${thread.frameworks}</dd></div>
            <div><dt>值得进入的空白</dt><dd>${thread.gap}</dd></div>
          </dl>
        </article>`
    )
    .join('')

  return `
    ${sectionHeader('02', '串起主线 · 约 12 分钟', '不要按章节记忆，要沿问题穿行', '六章可以重组为三条研究路线。每条路线都从一个事实出发，经过可用框架，最终抵达一个可研究的空白。')}
    <div class="route-stack">${cards}</div>
    <aside class="convergence-card">
      <div>
        <p class="micro-label">三线会合</p>
        <h3>技术能看见模式，但意义仍发生在关系与情境里</h3>
      </div>
      <p>对 CS 研究者而言，机会不是把执教“自动化”，而是设计能支持反思、理解关系并尊重隐性判断的工具。</p>
      <button class="primary-action" type="button" data-jump-tab="chapters">进入六章证据 <span aria-hidden="true">→</span></button>
    </aside>`
}

export function renderChapters() {
  const items = chapters
    .map(
      (chapter, index) => `
        <article class="chapter-card">
          <button class="accordion-btn chapter-trigger" type="button" data-target="${chapter.id}-content" aria-expanded="false" aria-controls="${chapter.id}-content">
            <span class="chapter-order">${String(index + 1).padStart(2, '0')}</span>
            <span class="chapter-heading-copy">
              <span class="chapter-meta">${chapter.num} · ${chapter.author}</span>
              <strong>${chapter.title}</strong>
            </span>
            <span class="chapter-state" data-chapter-status="${chapter.id}">待精读</span>
            <span class="disclosure-icon" aria-hidden="true"></span>
          </button>
          <div class="accordion-body chapter-body" id="${chapter.id}-content" hidden>
            <section class="core-question">
              <p class="micro-label">带着这个问题读</p>
              <h3>${chapter.coreQuestion}</h3>
            </section>
            <div class="reading-layers">
              <section class="book-layer">
                <div class="layer-heading"><span>A</span><div><p class="micro-label">书中观点</p><h4>关键论点与证据位置</h4></div></div>
                <div class="evidence-list">
                  ${chapter.arguments
                    .map(
                      (argument) => `
                        <article class="evidence-item">
                          <strong>${argument.label}</strong>
                          <p>${argument.text}</p>
                          <cite>${argument.cite}</cite>
                        </article>`
                    )
                    .join('')}
                </div>
              </section>
              <section class="insight-layer">
                <div class="layer-heading"><span>B</span><div><p class="micro-label">对我们的启发</p><h4>可以如何转化</h4></div></div>
                <ol>
                  ${chapter.inspiration.map((insight) => `<li>${insight}</li>`).join('')}
                </ol>
              </section>
            </div>
            <div class="chapter-actions">
              <span>完成阅读后，让进度留在这台设备上。</span>
              <button class="mark-read" type="button" data-progress-chapter="${chapter.id}" aria-pressed="false">
                <span class="checkmark" aria-hidden="true">✓</span><span class="mark-label">标记为已精读</span>
              </button>
            </div>
          </div>
        </article>`
    )
    .join('')

  return `
    ${sectionHeader('03', '逐章精读 · 六个阅读单元', '每一章，都从一个真正的问题开始', '展开后先看“书中观点”，再看“对我们的启发”。两层明确分开，避免把原作者观点与个人推论混在一起。')}
    <div class="reading-key">
      <span><i class="key-book">A</i> 书中观点：保留出处</span>
      <span><i class="key-insight">B</i> 个人启发：面向研究</span>
    </div>
    <div class="chapter-list">${items}</div>
    <div class="next-step-card">
      <span>读完之后</span>
      <p>先别急着背诵。去看哪些原有判断被这些证据改变了。</p>
      <button class="text-link" type="button" data-jump-tab="shocks">进入认知校准 <span aria-hidden="true">→</span></button>
    </div>`
}

export function renderShocks() {
  const cards = shocks
    .map(
      (shock, index) => `
        <article class="shock-card">
          <div class="shock-number">0${index + 1}</div>
          <div class="shock-content">
            <span class="shock-symbol" aria-hidden="true">${shock.icon}</span>
            <p class="micro-label">认知转变</p>
            <h3>${shock.title}</h3>
            <p>${shock.body}</p>
            <aside class="shock-evidence"><span>证据锚点</span>${shock.evidence}</aside>
          </div>
        </article>`
    )
    .join('')

  return `
    ${sectionHeader('04', '校准认知 · 约 10 分钟', '真正的学习，发生在旧模型失效时', '这里呈现的不是对全书的复述，而是一位 CS 研究者在进入教练学后，需要主动修正的三个默认假设。')}
    <div class="perspective-shift" aria-label="认知转变路径">
      <div><span>原有直觉</span><strong>测量 → 优化 → 推广</strong></div>
      <i aria-hidden="true">→</i>
      <div><span>新的判断</span><strong>理解情境 → 解释关系 → 谨慎介入</strong></div>
    </div>
    <div class="shock-grid">${cards}</div>
    <aside class="action-card">
      <div><p class="micro-label">把冲击转化为行动</p><h3>下一项研究，从三个自检问题开始</h3></div>
      <ol>
        ${actionItems.map((item) => `<li><span>${item.label}</span><p>${item.text}</p></li>`).join('')}
      </ol>
    </aside>`
}

export function renderTerms() {
  const rows = terms
    .map(
      (term) => `
        <tr>
          <td data-label="优先级"><span class="rank">${String(term.rank).padStart(2, '0')}</span></td>
          <td data-label="英文术语" class="term-en">${term.en}</td>
          <td data-label="当前译法">${term.distribution}</td>
          <td data-label="建议译法" class="term-rec">${term.recommendation}</td>
          <td data-label="判断理由">${term.reason}</td>
        </tr>`
    )
    .join('')

  return `
    ${sectionHeader('05', '统一语言 · 术语审计', '先统一概念，才可能比较观点', '30 个核心术语中有 16 个出现不一致译法。这里先呈现优先级最高的十项，帮助后续精读保持概念边界稳定。')}
    <div class="audit-summary">
      <div><strong>16 / 30</strong><span>核心术语存在多种译法</span></div>
      <p>建议不是简单采用最高频译法，而是结合理论传统、语境与中文学术惯例判断。</p>
    </div>
    <div class="terms-wrap">
      <table class="terms-table">
        <caption>核心术语一致性审计：当前分布、建议译法与判断理由</caption>
        <thead><tr><th>优先级</th><th>英文术语</th><th>当前译法分布</th><th>建议译法</th><th>判断理由</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
    <aside class="issues-card">
      <div><p class="micro-label">需要人工复核</p><h3>疑似翻译问题</h3></div>
      <ul>
        ${translationIssues.map((issue) => `<li><strong>${issue.term}</strong><span>${issue.detail}</span></li>`).join('')}
      </ul>
    </aside>`
}

function renderTimelinePhase(label, title, items) {
  return `
    <section class="plan-phase">
      <header><span>${label}</span><h3>${title}</h3></header>
      <div class="timeline">
        ${items
          .map(
            (item) => `
              <article class="tl-item${item.highlight ? ' highlight' : ''}">
                <div class="tl-marker" aria-hidden="true"></div>
                <div class="tl-day">${item.day}</div>
                <div class="tl-copy"><strong>${item.content}</strong><p>${item.detail}</p></div>
                <span class="tl-hours">${item.hours}</span>
              </article>`
          )
          .join('')}
      </div>
    </section>`
}

export function renderPlan() {
  const grouped = { A: [], B: [], C: [] }
  questions.forEach((question) => grouped[question.type].push(question))

  const qaMeta = [
    { key: 'A', label: 'A 类', title: '书讲了什么', className: 'qa-type-a' },
    { key: 'B', label: 'B 类', title: '怎么理解', className: 'qa-type-b' },
    { key: 'C', label: 'C 类', title: '对工作有什么用', className: 'qa-type-c' },
  ]

  const qaSections = qaMeta
    .map(
      ({ key, label, title, className }) => `
        <section class="qa-group ${className}">
          <header><span>${label}</span><h3>${title}</h3></header>
          ${grouped[key]
            .map(
              (question, index) => `
                <div class="qa-item">
                  <button class="accordion-btn qa-trigger" type="button" data-target="${question.id}" aria-expanded="false" aria-controls="${question.id}">
                    <span>${String(index + 1).padStart(2, '0')}</span><strong>${question.question}</strong><i class="disclosure-icon" aria-hidden="true"></i>
                  </button>
                  <div class="accordion-body qa-answer" id="${question.id}" hidden>
                    <ul>${question.answer.map((answer) => `<li>${answer}</li>`).join('')}</ul>
                  </div>
                </div>`
            )
            .join('')}
        </section>`
    )
    .join('')

  return `
    ${sectionHeader('06', '形成行动 · 两周路线图', '把“我理解了”变成可执行的下一步', '总预计 28–36 小时。路线从建立地图开始，经过关键章节和概念校准，最后以研究计划书与口头表达收束。')}
    <div class="plan-overview">
      <div><span>14</span><small>天</small><p>完整学习周期</p></div>
      <div><span>28–36</span><small>小时</small><p>建议总投入</p></div>
      <div><span>3</span><small>阶段</small><p>输入、连接、输出</p></div>
    </div>
    <div class="plan-phases">
      ${renderTimelinePhase('阶段一', '建立地图与工具感', timeline.slice(0, 4))}
      ${renderTimelinePhase('阶段二', '挑战假设与连接概念', timeline.slice(4, 7))}
      ${renderTimelinePhase('阶段三', '从输入走向研究输出', timeline.slice(7))}
    </div>
    <div class="qa-heading">
      <p class="micro-label">备考问答</p>
      <h2>十五个问题，检验三层理解</h2>
      <p>先复述，再解释，最后迁移。点击问题展开回答提示。</p>
    </div>
    <div class="qa-grid">${qaSections}</div>`
}
