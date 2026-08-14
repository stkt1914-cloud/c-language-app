// 章节：C 语言入门（范例章节）
window.CHAPTERS = window.CHAPTERS || {};
window.CHAPTERS['chapter-01'] = {
  id: 'chapter-01',
  order: 1,
  icon: '🚀',
  title: 'C 语言入门',
  summary: '了解 C 语言是什么、程序如何编译运行，写出并理解你的第一个 C 程序。',
  sections: [
    {
      type: 'text',
      html: '<h3>什么是 C 语言</h3><p>C 语言是一种<strong>通用的、面向过程的编程语言</strong>，由丹尼斯·里奇（Dennis Ritchie）于 1972 年在贝尔实验室开发，最初用于重写 Unix 操作系统。它贴近硬件、运行效率高，至今仍是操作系统、嵌入式设备、数据库等底层软件的主流语言，也是学习计算机原理的绝佳起点。</p><p>C 语言的特点：语法简洁、执行速度快、可直接操作内存（通过指针（pointer））、可移植性好——同一份代码经过不同编译器即可在多种平台上运行。</p>',
    },
    {
      type: 'list',
      ordered: true,
      items: [
        '学习 C 语言能让你理解程序"背后"发生了什么：内存、栈、指针。',
        '很多现代语言（C++、Java、Python 的底层实现）都受 C 影响。',
        'C 是嵌入式与系统编程的事实标准，就业面广。',
      ],
    },
    {
      type: 'code',
      title: '第一个 C 程序：Hello World',
      code: `#include <stdio.h>   // 引入标准输入输出库

int main(void)          // main 是程序入口函数
{
    printf("Hello, World!\\n");   // 打印一行文字
    return 0;           // 返回 0 表示程序正常结束
}`,
      note: '程序从 main 函数的第一条语句开始执行，到 return 0 结束。',
    },
    {
      type: 'text',
      html: '<h3>程序的编译过程</h3><p>源代码（.c 文件）是人写的文本，计算机只能执行机器码，中间需要<strong>编译器（compiler）</strong>转换。以 GCC 为例，整个过程分四步：</p>',
    },
    {
      type: 'list',
      ordered: true,
      items: [
        '<b>预处理（Preprocessing）</b>：处理 <code>#include</code>、<code>#define</code> 等以 # 开头的指令。',
        '<b>编译（Compilation）</b>：把预处理后的 C 代码翻译成汇编代码。',
        '<b>汇编（Assembly）</b>：把汇编代码转成机器指令，生成目标文件（.o）。',
        '<b>链接（Linking）</b>：把目标文件与库文件合并，生成可执行文件。',
      ],
    },
    {
      type: 'code',
      title: '在命令行中用 GCC 编译并运行',
      code: `# 编译：hello.c -> hello（可执行文件）
gcc hello.c -o hello

# 运行
./hello
# 输出：Hello, World!`,
      note: 'Windows 上可用 MinGW 或 WSL；macOS 自带 clang，用法与 gcc 类似。',
    },
    {
      type: 'tip',
      kind: 'tip',
      html: '<p><b>编程环境选择：</b>手机端可用 CppDroid（Android）或 OnlineGDB 网页版；电脑上推荐 VS Code + GCC，或用 Dev-C++、CLion。初学阶段"能编译、能看到输出"比工具本身更重要。</p>',
    },
    {
      type: 'text',
      html: '<h3>程序的基本结构</h3><p>一个 C 程序由<strong>函数</strong>组成，其中必须有且只有一个 <code>main</code> 函数作为入口。常见的组成部分：</p>',
    },
    {
      type: 'table',
      title: 'C 程序常见组成部分',
      headers: ['组成部分', '作用', '示例'],
      rows: [
        ['头文件引用', '引入库函数声明', '#include <stdio.h>'],
        ['主函数', '程序入口', 'int main(void) { ... }'],
        ['变量声明', '声明要用的数据', 'int age = 18;'],
        ['语句与表达式', '完成具体操作', 'printf("hi");'],
        ['返回值', '向系统报告结束状态', 'return 0;'],
      ],
    },
    {
      type: 'code',
      title: '带变量与注释的完整示例',
      code: `#include <stdio.h>

int main(void)
{
    // 声明并初始化一个整型变量
    int age = 18;

    /* 块注释：可以跨行
       用于说明大段逻辑 */
    printf("今年我 %d 岁了。\\n", age);

    return 0;
}`,
      note: 'C 支持两种注释：// 单行注释 和 /* ... */ 块注释。',
    },
    {
      type: 'tip',
      kind: 'warn',
      html: '<p><b>易错点：</b>每条语句末尾必须有分号 <code>;</code>；<code>main</code> 函数名不能拼错（不是 <code>mian</code>）；字符串要写在双引号里，字符常量写在单引号里。</p>',
    },
    {
      type: 'list',
      ordered: false,
      items: [
        'C 是面向过程的语言，程序由函数组成。',
        'main 是唯一入口，return 0 表示正常结束。',
        '编译四步：预处理 → 编译 → 汇编 → 链接。',
        '注释有两种：// 与 /* */，好的注释是给未来的自己看的。',
      ],
    },
  ],
  exercises: [
    {
      id: 'chapter-01-q1',
      type: 'choice',
      question: 'C 语言最初是由谁、为了什么目的开发的？',
      options: ['Bjarne Stroustrup，为了扩展 C 语言', 'Dennis Ritchie，为了重写 Unix 操作系统', 'Ken Thompson，为了开发 C++', 'Linus Torvalds，为了开发 Linux'],
      answer: 1,
      explanation: 'C 语言由贝尔实验室的 Dennis Ritchie（丹尼斯·里奇）于 1972 年前后开发，最初用于重写 Unix。Bjarne Stroustrup 是 C++ 的发明者，Linus Torvalds 是 Linux 内核的作者，都不符合题意。',
    },
    {
      id: 'chapter-01-q2',
      type: 'choice',
      question: '一个 C 程序的执行入口是？',
      options: ['printf 函数', '第一个被定义的函数', 'main 函数', '编译器指定的任意函数'],
      answer: 2,
      explanation: 'C 程序必须有且只有一个 main 函数，操作系统加载程序后从 main 开始执行。printf 只是库函数；编译器并不会把第一个定义的函数当作入口。',
    },
    {
      id: 'chapter-01-q3',
      type: 'multiple',
      question: '下面哪些属于 C 语言源文件到可执行文件之间的处理阶段？',
      options: ['预处理（Preprocessing）', '编译（Compilation）', '解释执行（Interpretation）', '链接（Linking）'],
      answer: [0, 1, 3],
      explanation: 'C 是编译型语言，处理流程为：预处理 → 编译 → 汇编 → 链接，不包括"解释执行"。解释执行是 Python、JavaScript 等解释型语言的运行方式。',
    },
    {
      id: 'chapter-01-q4',
      type: 'code',
      question: '下面代码的输出是什么？',
      code: `#include <stdio.h>
int main(void)
{
    printf("Hello\\nWorld");
    return 0;
}`,
      options: ['Hello\\nWorld', 'Hello World', 'Hello 换行 World', '编译错误'],
      answer: 2,
      explanation: '代码中的 \\n 是换行转义字符，printf 会把它解释为换行，因此输出两行：第一行 Hello，第二行 World。选项 A 是原样写法，选项 B 少了换行，选项 D 错误——\\n 是合法的转义序列，不会导致编译错误。',
    },
    {
      id: 'chapter-01-q5',
      type: 'choice',
      question: '关于 C 语言注释，下列说法正确的是？',
      options: ['// 是块注释，可以跨多行', '/* */ 注释中不能再包含 /* */', '注释会被编译器翻译成机器码', '// 注释可以跨越多行'],
      answer: 1,
      explanation: '/* */ 是块注释，C 标准规定块注释不允许嵌套，即 /* /* */ */ 是非法的。// 是单行注释，不能跨行。注释在预处理阶段就被删除，不会生成任何机器码。',
    },
    {
      id: 'chapter-01-q6',
      type: 'fill',
      question: '为了让 printf 能正常工作，程序开头通常需要哪一行预处理指令？（写出完整指令，如 #include <xxx.h>）',
      accept: ['#include <stdio.h>', '#include<stdio.h>', '#include <stdio.h>', '#include<stdio.h>'],
      explanation: 'printf 的声明位于标准输入输出头文件 stdio.h 中，因此需要 #include <stdio.h>。include 与尖括号之间有无空格均可。',
    },
    {
      id: 'chapter-01-q7',
      type: 'choice',
      question: 'main 函数返回 0 表示什么？',
      options: ['程序发生错误', '程序正常结束', '程序没有输出', '程序被强制终止'],
      answer: 1,
      explanation: '按照惯例，main 返回 0 表示程序正常结束；返回非 0 值（如 1）通常表示发生了错误。这与程序有没有输出无关。',
    },
    {
      id: 'chapter-01-q8',
      type: 'choice',
      question: '下面哪条语句写法正确（假设已包含 stdio.h）？',
      options: ['printf("hi")', 'printf("hi");', 'print("hi");', 'printf hi;'],
      answer: 1,
      explanation: 'C 的语句必须以分号结尾，因此 printf("hi"); 正确。A 缺少分号；C 中输出函数名是 printf 而非 print；D 缺少括号且函数调用必须有括号。',
    },
  ],
};
