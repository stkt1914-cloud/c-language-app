// 章节：流程控制
window.CHAPTERS = window.CHAPTERS || {};
window.CHAPTERS['chapter-05'] = {
  id: 'chapter-05',
  order: 5,
  icon: '🔀',
  title: '流程控制',
  summary: '掌握 if/else、switch 选择语句与 while、do-while、for 循环语句，理解 break、continue、goto 的用法。',
  sections: [
    {
      type: 'text',
      html: '<h3>程序的三种基本流程结构</h3><p>程序的执行流程由三种基本结构组合而成：<b>顺序结构</b>（sequence structure，自上而下依次执行每条语句）、<b>选择结构</b>（selection structure，根据条件决定执行哪段代码）和<b>循环结构</b>（iteration structure，重复执行某段代码）。</p><p>本章介绍的选择语句（if/else、switch）与循环语句（while、do-while、for）是让程序"活起来"的关键——没有它们，程序只能线性地从第一行跑到最后一行。</p>',
    },
    {
      type: 'code',
      title: 'if/else 与 else if 阶梯',
      code: `#include <stdio.h>

int main(void)
{
    int score = 85;

    if (score >= 60)
        printf("及格\\n");
    else
        printf("不及格\\n");

    // else if 阶梯：从上到下依次匹配，命中后不再继续判断
    if (score >= 90)
        printf("优秀\\n");
    else if (score >= 80)
        printf("良好\\n");
    else if (score >= 70)
        printf("中等\\n");
    else
        printf("继续努力\\n");

    return 0;
}`,
      note: 'if 的条件表达式结果为非 0（真）时执行 if 分支，为 0（假）时执行 else 分支；分支内只有一条语句时可以省略大括号，多条语句则必须加。',
    },
    {
      type: 'text',
      html: '<h3>嵌套 if 与悬垂 else</h3><p>if 里面还可以再写 if，这叫<b>嵌套 if</b>（nested if），用于多条件组合判断，比如先判断是否及格、再细分成绩高低。</p><p><b>悬垂 else</b>（dangling else）是经典易错点：C 规定 <code>else</code> 总是与<b>最近</b>的、尚未配对的 <code>if</code> 结合。例如 <code>if (a) if (b) x; else y;</code> 中的 else 属于内层 <code>if (b)</code>，因此当 a 为假时 y 并不会执行——尽管缩进看起来好像属于外层 if。要避免歧义，请始终用大括号明确划分层级。</p><p>此外，<code>switch</code> 语句适合"多选一"的分支：根据一个整型或字符表达式的值，跳转到对应的 <code>case</code> 分支执行。</p>',
    },
    {
      type: 'code',
      title: 'switch-case 与 fall-through',
      code: `#include <stdio.h>

int main(void)
{
    int day = 3;

    switch (day) {
        case 1:
            printf("星期一\\n");
            break;              // break 结束整个 switch
        case 2:
            printf("星期二\\n");
            break;
        case 3:
            printf("星期三\\n");
            break;
        case 4:                 // 这里没有 break，会"穿透"到 case 5
        case 5:
            printf("周中\\n");
            break;
        default:                // 其他所有值都走这里
            printf("周末\\n");
    }

    return 0;
}`,
      note: '每个 case 语句组后面通常要写 break，否则发生"穿透"（fall-through）——继续执行下一个 case 的语句。case 4 与 case 5 之间故意不写 break，让两个值共享同一段代码，这是有意利用 fall-through 的合法写法。',
    },
    {
      type: 'tip',
      kind: 'tip',
      html: '<p><b>break：</b>立即结束<b>当前一层</b>的循环或 switch，程序跳到循环或 switch 之后的第一条语句继续执行。</p><p><b>continue：</b>跳过本次循环中 continue 之后的语句，直接进入<b>下一次迭代</b>（for 会先执行更新表达式再判断条件，while 直接重新判断条件）。</p><p><b>goto：</b>无条件跳转到程序中某个<b>标签</b>（label）处，例如 <code>goto end;</code> 配合 <code>end: ...</code> 使用。滥用 goto 会打乱程序结构、难以阅读维护，一般只在"从多层嵌套中一次性跳出"等少数场景使用，绝大多数情况下用 break、continue 和合理的循环嵌套就能解决。</p><p><b>死循环配合 break：</b><code>while (1) { ... if (条件) break; }</code> 是先写"永远循环"、再在循环体内按条件退出的常见写法，例如菜单程序。</p>',
    },
    {
      type: 'text',
      html: '<h3>while 与 do-while 循环</h3><p><code>while (条件) 循环体;</code>：<b>先判断、后执行</b>。条件一开始就为假时，循环体一次都不执行。</p><p><code>do 循环体; while (条件);</code>：<b>先执行、后判断</b>，循环体<b>至少执行一次</b>，末尾的分号不能丢。</p><p>循环体内部必须让条件逐渐"向假靠近"（例如让循环变量自增），否则会形成死循环（infinite loop）。条件表达式非 0 为真，0 为假。</p>',
    },
    {
      type: 'code',
      title: 'while 与 do-while 示例',
      code: `#include <stdio.h>

int main(void)
{
    int i = 1, sum = 0;

    while (i <= 100) {          // 先判断：i = 1 满足条件才进入
        sum += i;
        i++;                    // 让 i 逐渐靠近退出条件
    }
    printf("1+2+...+100 = %d\\n", sum);

    int n = 0;
    do {
        printf("n = %d\\n", n);  // 无条件先执行一次循环体
        n++;
    } while (n < 3);            // 末尾的分号必须写

    return 0;
}`,
      note: 'do-while 与 while 的唯一区别：do-while 会无条件先执行一次循环体，再判断是否继续，因此至少执行一次。',
    },
    {
      type: 'text',
      html: '<h3>for 循环、逗号表达式与嵌套循环</h3><p><code>for (初始化; 条件; 更新) 循环体;</code> 把循环的三个要素集中在一起：<b>初始化</b>只执行一次，通常是声明并给<b>循环变量</b>（loop variable）赋初值；<b>条件</b>在每次迭代前判断，为真才继续；<b>更新</b>在每次迭代结束后执行，通常是循环变量自增。</p><p>三个部分都可以省略：<code>for (;;)</code> 就是死循环。中间的<b>逗号表达式</b>（comma operator）允许一次写多个表达式，整体取最后一个的值，常用于同时初始化或更新多个变量，如 <code>for (i = 0, j = 10; i < j; i++, j--)</code>。</p><p><b>嵌套循环</b>（nested loop）：外层循环每执行一轮，内层循环就<b>完整</b>地从头跑一遍，总的执行次数等于各层次数之积。</p>',
    },
    {
      type: 'code',
      title: 'for 嵌套循环：打印九九乘法表',
      code: `#include <stdio.h>

int main(void)
{
    int i, j;

    for (i = 1; i <= 9; i++) {        // 外层循环：控制行
        for (j = 1; j <= i; j++) {    // 内层循环：控制列
            printf("%d*%d=%-3d ", j, i, i * j);
        }
        printf("\\n");
    }

    // 逗号表达式：一次初始化、更新两个循环变量
    int a, b;
    for (a = 1, b = 9; a < b; a++, b--)
        printf("(%d,%d) ", a, b);
    printf("\\n");

    return 0;
}`,
      note: '外层 i 从 1 到 9 共 9 轮，内层每轮从 1 到 i，所以第 i 行恰好有 i 个式子；%-3d 左对齐保证表格整齐。',
    },
    {
      type: 'list',
      ordered: false,
      items: [
        '顺序、选择、循环是程序的三种基本流程结构。',
        'if/else 与 else if 阶梯实现多分支；嵌套 if 要注意"悬垂 else"会与最近的 if 配对。',
        'switch 适合"多选一"；每个 case 后记得写 break，防止意外的 fall-through。',
        'while 先判断后执行，do-while 至少执行一次，for 把初始化、条件、更新集中在一起。',
        '逗号表达式可一次更新多个循环变量；嵌套循环的总次数等于各层次数之积。',
        'break 跳出当前循环，continue 跳到下一次迭代，goto 慎用。',
      ],
    },
  ],
  exercises: [
    {
      id: 'chapter-05-q1',
      type: 'choice',
      question: 'int x = 0; if (x) printf("A"); else printf("B"); 这段代码的输出是？',
      options: ['A', 'B', 'AB', '什么都不输出'],
      answer: 1,
      explanation: 'C 语言中 0 表示假、非 0 表示真。x 的值是 0，条件为假，因此执行 else 分支输出 B，if 分支不会执行。选项 A 只有在条件为真时才会输出；选项 C 不可能同时输出；选项 D 忽略了 else 分支的存在。',
    },
    {
      id: 'chapter-05-q2',
      type: 'code',
      question: '假设 score = 85，下面代码的输出是什么？',
      code: `if (score >= 90)
    printf("优秀");
else if (score >= 80)
    printf("良好");
else if (score >= 70)
    printf("中等");
else
    printf("继续努力");`,
      options: ['优秀', '良好', '中等', '继续努力'],
      answer: 1,
      explanation: 'else if 阶梯从上到下依次判断：85 >= 90 为假，继续判断 85 >= 80 为真，命中"良好"分支并输出；一旦命中某个分支，就不再向下判断后面的条件。选项 A 需要 score >= 90；选项 C 是在 80 > score >= 70 时输出；选项 D 是所有条件都不满足时兜底输出。',
    },
    {
      id: 'chapter-05-q3',
      type: 'choice',
      question: 'switch 语句中某个 case 后面忘了写 break，会发生什么？',
      options: ['编译错误', '程序直接退出', '发生"穿透"（fall-through），继续执行后续 case 的语句，直到遇到 break 或 switch 结束', '什么影响都没有，只执行该 case'],
      answer: 2,
      explanation: '忘写 break 不会导致编译错误（break 不是 case 的强制要求），而是执行完当前 case 的语句后继续向下执行后续 case 的语句，这种现象叫穿透（fall-through），直到遇到 break 或 switch 结束。选项 A 说编译错误不对；选项 B 与程序行为无关；选项 D 忽略了穿透效果——正因为容易踩坑，才要强调每个 case 末尾写 break。',
    },
    {
      id: 'chapter-05-q4',
      type: 'code',
      question: '下面 for 循环的循环体执行几次？',
      code: `int count = 0;
for (i = 0; i < 5; i++)
    count++;`,
      options: ['4 次', '5 次', '6 次', '无限次'],
      answer: 1,
      explanation: 'i 从 0 开始，条件 i < 5 在 i = 0、1、2、3、4 时均为真，循环体共执行 5 次，count 从 0 累加到 5；当 i 变成 5 时条件为假，循环退出。因此"i 从 0 开始、条件小于上限"的 for 循环执行次数恰好等于上限值。选项 A 少算了一次；选项 C 多算了一次；选项 D 错——i 每次自增，一定会到达 5 退出。',
    },
    {
      id: 'chapter-05-q5',
      type: 'code',
      question: '下面代码的输出是什么？',
      code: `int n = 10;
do {
    printf("x");
    n++;
} while (n < 3);`,
      options: ['什么都不输出', 'x', 'x 无限次输出', '编译错误'],
      answer: 1,
      explanation: 'do-while 与 while 的本质区别是先执行、后判断：循环体无条件先执行一次，输出 x 并把 n 变成 11；随后判断 n < 3 为假，循环结束。所以只输出一次 x。选项 A 是 while 版本的结果（条件一开始为假一次都不执行）；选项 C 需要条件始终为真；选项 D 错——do-while 语法完全合法。',
    },
    {
      id: 'chapter-05-q6',
      type: 'fill',
      question: '执行下面代码后，变量 count 的值是多少？（只填数字）',
      code: `int count = 0;
for (i = 0; i < 3; i++)
    for (j = 0; j < 3; j++)
        count++;`,
      accept: ['9', '9 '],
      explanation: '嵌套循环的总执行次数等于各层循环次数之积：外层执行 3 次，内层每次都完整执行 3 次，count 共自增 3 × 3 = 9 次。内层循环每轮都会重新从 j = 0 开始，这是理解嵌套循环的关键。',
    },
    {
      id: 'chapter-05-q7',
      type: 'choice',
      question: 'continue 语句在循环中的作用是？',
      options: ['结束整个循环，跳到循环后面的语句', '跳过本次循环剩余的语句，直接进入下一次迭代', '从函数中返回一个值', '终止整个程序的运行'],
      answer: 1,
      explanation: 'continue 只结束<b>本次迭代</b>：跳过 continue 之后循环体内的所有语句，然后 for 执行更新表达式并重新判断条件，while/do-while 直接重新判断条件，进入下一次迭代。结束整个循环要用 break；从函数返回用 return；终止整个程序用 exit()，因此其余三个选项均错误。',
    },
    {
      id: 'chapter-05-q8',
      type: 'multiple',
      question: '关于 goto 语句，下列说法正确的有？',
      options: ['使用 goto 必须配合标签（label）', '滥用 goto 会降低程序可读性', 'goto 可以跳进其他函数的内部', 'C 语言中 goto 是非法关键字'],
      answer: [0, 1],
      explanation: 'goto 必须跳到程序中某个标签处继续执行，因此选项 A 正确；大量使用 goto 会破坏结构化流程、让代码难以阅读和维护，选项 B 也正确。goto 不能跨函数跳转，跳进其他函数内部是非法的，选项 C 错误；goto 是 C 的合法关键字，正确使用时可以正常编译（例如从多层嵌套中一次性跳出），选项 D 错误。',
    },
  ],
};
