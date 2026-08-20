/** Top-10 terms to unify from the terminology audit (152 candidates → 30 core → top 10) */

export const terms = [
  {
    rank: 1,
    en: 'sport coaching',
    distribution: '体育执教(270) / 体育教练(196)',
    recommendation: '体育执教',
    reason: '"执教"强调动态过程，与 coaching 动词性质一致',
  },
  {
    rank: 2,
    en: 'coaching studies',
    distribution: '教练研究(142) / 执教研究(106) / 教练学(17)',
    recommendation: '教练学（学科名）',
    reason: 'ISCJ 中文名已用此译',
  },
  {
    rank: 3,
    en: 'competence',
    distribution: '能力(118) / 胜任力(15)',
    recommendation: '按语境区分',
    reason: 'SDT 理论中应译"胜任力"',
  },
  {
    rank: 4,
    en: 'burnout',
    distribution: '倦怠(122) / 职业倦怠(8)',
    recommendation: '倦怠',
    reason: '心理学文献通行译法',
  },
  {
    rank: 5,
    en: 'mentoring',
    distribution: '指导(192) / 导师指导(4)',
    recommendation: '指导',
    reason: '简洁且被广泛接受',
  },
  {
    rank: 6,
    en: 'power',
    distribution: '权力(131) / 力量(33)',
    recommendation: '按语境区分',
    reason: '社会文化讨论中一律译"权力"',
  },
  {
    rank: 7,
    en: 'pedagogy',
    distribution: '教学法(79) / 教育学(24)',
    recommendation: '教学法',
    reason: '本书更多指具体教学方法',
  },
  {
    rank: 8,
    en: 'discourse',
    distribution: '话语(66) / 论述(10)',
    recommendation: '话语',
    reason: 'Foucault 传统通行译法',
  },
  {
    rank: 9,
    en: 'qualitative',
    distribution: '质性(20) / 定性(17)',
    recommendation: '质性',
    reason: '国内社科方法论使用趋势上升',
  },
  {
    rank: 10,
    en: 'coaching science',
    distribution: '教练科学(22) / 执教科学(4)',
    recommendation: '教练科学',
    reason: '与固定搭配一致',
  },
]

export const translationIssues = [
  {
    term: 'CLAS 与 CLAS-GRS 混淆',
    detail: 'Ch3 中两个工具名有时混用',
  },
  {
    term: 'competence 多重含义',
    detail:
      'SDT 中指"胜任力"（基本心理需求），一般语境中指"能力"——译稿未做区分',
  },
  {
    term: 'safeguarding',
    detail:
      '三种译法共现（保护28 / 安全防护37 / 保障5），建议统一为"安全防护"',
  },
  {
    term: 'effectiveness vs efficacy',
    detail: '前者指客观有效性，后者指主观效能感——偶有混淆',
  },
]
