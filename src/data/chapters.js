/**
 * Deep-read chapter data.
 * Each entry follows the structure: core question → arguments → inspiration.
 * All content paraphrased from the user's own study notes; citations reference
 * DOCX paragraph numbers for traceability.
 */

export const chapters = [
  {
    id: 'ch2',
    num: 'Ch2',
    title: '从过去到现在——体育教练研究简史',
    author: 'Gilbert',
    coreQuestion:
      '体育教练研究如何从 1976 年一次偶然的行为观察走向制度化？',
    arguments: [
      {
        label: '奠基研究',
        text: '1976 年 Tharp & Gallimore 用仅含 10 个条目的编码工具观察 John Wooden 的 15 次训练课',
        cite: 'DOCX para 164',
      },
      {
        label: '汇聚成形',
        text: '1996 年后渥太华大学成为研究孵化器，专门期刊 ISCJ 建立',
        cite: 'para 170',
      },
      {
        label: '全球扩展',
        text: '2010 年后 76% 的论文涌现，但样本以英语国家男性教练为主',
        cite: 'para 175, 183',
      },
    ],
    inspiration: [
      '从 10 项手工编码到计算化视频分析——核心逻辑是行为操作化',
      '教练员发展工作者被重新定义为"学习顾问"，工具应支持反思性学习而非单向推送',
    ],
  },
  {
    id: 'ch3',
    num: 'Ch3',
    title: '促进变革型执教行为的反思工具',
    author: 'KurtzFavero, Lefebvre, Turnnidge, Côté',
    coreQuestion: '如何设计结构化反思工具，帮助教练审视人际领导行为？',
    arguments: [
      {
        label: 'FRLM 五层连续体',
        text: '从有害型 → 中性型 → 交易型 → 变革型 → 理想化领导',
        cite: 'para 247-248',
      },
      {
        label: '反思工具缺口',
        text: '现有工具关注"教什么"，忽视"如何互动"',
        cite: 'para 254',
      },
      {
        label: 'CLR 闭环',
        text: '简报 → 观察（CLAS-GRS）→ 反思卡 → 复盘谈话',
        cite: 'para 263',
      },
    ],
    inspiration: [
      'CLAS-GRS 的"效力评分"综合频次 + 心理意义 + 潜在影响，行为质量 > 行为计数',
      'CLR 用 Google Forms 发放反思卡——数字化需在"低压力"与"持续参与"间平衡',
    ],
  },
  {
    id: 'ch5',
    num: 'Ch5',
    title: '将技术融入执教与教练员—运动员关系',
    author: 'Stewart, Jowett',
    coreQuestion:
      '体育技术提升表现的同时，如何影响教练—运动员关系质量？',
    arguments: [
      {
        label: '19,043 vs 2',
        text: 'Scopus 检索近两万篇体育技术文献，仅 2 篇含"coach-athlete relationship"',
        cite: 'para 442-443',
      },
      {
        label: '3+1Cs 模型',
        text: '亲近性、承诺、互补性、共同定向四维度衡量关系质量',
        cite: 'para 424-425',
      },
      {
        label: '双刃风险',
        text: '通信技术可增进关系也带来"永远在线"和去人性化',
        cite: 'para 447, 453-454',
      },
    ],
    inspiration: [
      '每项技术开发都应同时回答"提升了什么指标"和"如何影响了关系质量"',
      'COMPASS 七项策略为工具设计提供需求锚点：冲突管理、开放性、激励、预防、保证、支持、社交网络',
    ],
  },
  {
    id: 'ch8',
    num: 'Ch8',
    title: '指导关系与发展网络',
    author: 'Lefebvre, Alexander-Urquhart, Koh, Bloom',
    coreQuestion:
      '教练员如何通过指导关系和更广泛的发展网络实现成长？',
    arguments: [
      {
        label: '22 个发展主体',
        text: '精英教练员平均拥有 22 个发展主体，远超一对一模型',
        cite: 'para 824',
      },
      {
        label: '网络四维度',
        text: '规模、纽带强度、多样性、可达性',
        cite: 'para 818-821',
      },
      {
        label: '虚拟指导的障碍',
        text: '参与者对平台操作常感吃力，需事先培训',
        cite: 'para 801',
      },
    ],
    inspiration: [
      '网络四维度可转化为社会网络分析的可计算指标',
      '工具设计必须优先考虑易用性——教练员不是"数字原住民"',
    ],
  },
  {
    id: 'ch20',
    num: 'Ch20',
    title: '开展批判性执教研究——问题与机遇',
    author: 'Cushion',
    coreQuestion:
      '为何执教研究长期概念积弱？社会批判视角（Bourdieu）如何帮助重新思考？',
    arguments: [
      {
        label: '概念空洞性',
        text: '"执教"标记差异但不说明差异何在——是"识别工具"而非"认知工具"',
        cite: 'para 2263-2267',
      },
      {
        label: '惯习与场域',
        text: 'Bourdieu 的"比赛感觉"（le sens du jeu）替代理性选择模型',
        cite: 'para 2284-2291',
      },
      {
        label: '隐性判断',
        text: '最关键的执教判断发生在"不引人注目的行动"中',
        cite: 'para 2298-2307',
      },
    ],
    inspiration: [
      '不能只记录可见行为频率——需从频率统计转向时序分析和情境建模',
      '工具应具备情境敏感性，帮助教练反思权力动态，而非提供行为对标',
    ],
  },
  {
    id: 'ch23',
    num: 'Ch23',
    title: '教练员学习与发展中的数字技术',
    author: "O'Brien, Kennedy",
    coreQuestion:
      '数字技术以何种方式促进教练员学习，有哪些机会与局限？',
    arguments: [
      {
        label: 'TEL 四维框架',
        text: '执教知识、反思实践、实践共同体、健康生活',
        cite: 'para 2629',
      },
      {
        label: '知识转型',
        text: '从"存储在教练头脑中"到"随时可访问的知识中心"',
        cite: 'para 2631-2634',
      },
      {
        label: '数字胜任力缺口',
        text: '概念定义模糊，现有 TEL 系统未照顾用户差异',
        cite: 'para 2657',
      },
    ],
    inspiration: [
      '教练员数字胜任力的系统调查是我们可以直接贡献的研究空白',
      '"垃圾进垃圾出"——数据质量管理流程与分析算法同等重要',
    ],
  },
]

/**
 * Book structure for the chapter map visualization.
 * `deep` marks chapters selected for deep reading.
 */
export const bookParts = [
  { label: '总论', chapters: [{ n: 1 }, { n: 2, deep: true }] },
  {
    label: 'I 心理学视角',
    chapters: [
      { n: 3, deep: true },
      { n: 4 },
      { n: 5, deep: true },
      { n: 6 },
      { n: 7 },
      { n: 8, deep: true },
      { n: 9 },
    ],
  },
  {
    label: 'II 教学论视角',
    chapters: [{ n: 10 }, { n: 11 }, { n: 12 }, { n: 13 }, { n: 14 }, { n: 15 }],
  },
  {
    label: 'III 社会文化视角',
    chapters: [{ n: 16 }, { n: 17 }, { n: 18 }, { n: 19 }, { n: 20, deep: true }],
  },
  {
    label: 'IV 未来方向',
    chapters: [{ n: 21 }, { n: 22 }, { n: 23, deep: true }, { n: 24 }, { n: 25 }],
  },
]
