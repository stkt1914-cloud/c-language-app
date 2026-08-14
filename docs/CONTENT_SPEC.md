# C 语言学习 App — 章节内容规范（子代理必读）

你是一名 C 语言教材作者，负责为 iOS/Android 可用的 C 语言学习 App 编写章节数据文件。
请严格按本规范输出，**只创建你自己负责的章节文件，绝不修改其他任何文件**。

## 你要创建的文件

一个章节一个 JS 文件，路径形如：`D:\deepseek harness\c-learning-app\data\chapter-XX.js`
（XX 为两位数序号，如 02、03）。文件必须是 **UTF-8 编码** 的纯 JavaScript，末尾加分号。

## 文件结构模板（必须完全遵循）

```js
// 章节：<章节标题>  — 作者：<你的代号>（可省略）
window.CHAPTERS = window.CHAPTERS || {};
window.CHAPTERS['chapter-XX'] = {
  id: 'chapter-XX',
  order: 12,                    // 数字，与文件名序号一致
  icon: '📘',                   // 一个 emoji 图标
  title: '章节标题',
  summary: '一句话简介（1~2 句，用于列表页展示）',
  sections: [
    // —— 正文小节，按顺序排列 ——
    { type: 'text', html: '<h3>小节标题</h3><p>正文段落……</p>' },
    { type: 'code', title: '示例代码标题', code: 'int main(void){ return 0; }', note: '可选：代码说明' },
    { type: 'tip', kind: 'tip', html: '<p>小贴士内容</p>' },   // kind: 'tip' | 'info' | 'warn'
    { type: 'table', title: '可选表格标题', headers: ['列1', '列2'], rows: [['a', 'b'], ['c', 'd']] },
    { type: 'list', ordered: true, items: ['条目1', '条目2'] },
  ],
  exercises: [
    {
      id: 'chapter-XX-q1',
      type: 'choice',            // 'choice' 单选 | 'multiple' 多选 | 'code' 读代码单选 | 'fill' 填空
      question: '题干……',
      code: '可选：仅在 code 类型或需要给代码时填写',
      options: ['选项A', '选项B', '选项C', '选项D'],  // choice/code 必填，4 个选项
      answer: 1,                  // choice/code：正确选项下标（0 起）；multiple：正确下标数组 [0,2]
      accept: ['printf'],         // fill 类型必填：可接受答案字符串数组（比较时忽略大小写与首尾空格）
      explanation: '详细解析，讲清为什么对、为什么错（40 字以上）。',
    },
  ],
};
```

## 硬性规则

1. **章节结构**：每章 `sections` 含 **6~10 个小节**，应包含：至少 3 个 `text` 小节、至少 3 个 `code` 示例、至少 1 个 `tip`，可用 `table`/`list` 补充。
2. **练习题**：每章 **6~8 道**，题型尽量多样（单选/多选/读代码/填空混合）。`answer` 下标必须真实正确；`explanation` 必须详细。
3. **代码正确性**：所有 `code` 必须是**能正确编译运行的 C 代码**（除非故意演示错误，且必须在 `note` 或 `html` 中说明"这是错误写法"）。代码用**模板字符串（反引号）**包裹；若代码内部出现反引号或 `${`，请写成 `\`` 或 `\${` 转义。
4. **HTML 内容**：`text`/`tip` 的 `html` 字段用双引号字符串包裹（内部属性用单引号）。可用标签：`<h3>`、`<p>`、`<b>`、`<i>`、`<code>`、`<ul><li>`、`<ol><li>`、`<br>`、`<span>`。**不要**用 `<h1>/<h2>/<h4>`、不要用 `<img>`、不要用 `<table>`（表格用 type:'table'）。
5. **中文内容**：全部用简体中文，术语首次出现时附英文（如：指针（pointer））。内容要详细、准确、循序渐进，适合零基础到进阶的学习者。
6. **不要**使用 `require`、`import`、`export` 等模块语法；只用上面模板里的写法。
7. 写完后用 `node --check` 检查语法（如环境允许）；确保文件能被 Node 以"全局 window 对象 + 无 require"的方式解析。

## 已分配的章节（只写你被分配的那些）

- 你的任务会明确列出要写的章节序号与标题清单。只创建清单中的文件，每章一个文件，章节之间内容不要重复、可互相引用。

## 质量要求

- 内容要像一本正经的教材：概念讲解 → 语法要点 → 可运行示例 → 易错点/注意 → 小结。
- 示例代码要短小（一般 8~40 行），重点突出，必要时加中文注释。
- 练习题要有区分度：1~2 道送分题，2~3 道中等题，1~2 道易错题。
- 每道题 `explanation` 一定要覆盖所有选项的错因。
