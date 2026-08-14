// 章节：运算符与表达式
window.CHAPTERS = window.CHAPTERS || {};
window.CHAPTERS['chapter-03'] = {
  id: 'chapter-03',
  order: 3,
  icon: '🧮',
  title: '运算符与表达式',
  summary: '掌握 C 语言的各类运算符：算术、赋值、自增自减、关系、逻辑、位运算与条件运算符，以及优先级和结合性。',
  sections: [
    {
      type: 'text',
      html: '<h3>算术运算符（Arithmetic Operators）</h3><p>C 语言的算术运算符有五个：<code>+</code>（加）、<code>-</code>（减）、<code>*</code>（乘）、<code>/</code>（除）、<code>%</code>（取模/取余）。其中有两个要点最容易出错：</p><ul><li><b>整数除法会截断</b>：两个整数相除，结果仍是整数，小数部分直接丢弃，如 <code>7 / 2</code> 的结果是 3，而不是 3.5。想得到小数结果，至少要让一个操作数是浮点数，如 <code>7.0 / 2</code>；</li><li><b>% 只能用于整数</b>：<code>7 % 2</code> 的结果是 1（7 除以 2 的余数）。C99 规定取模结果的符号与<b>被除数</b>相同，如 <code>-7 % 2</code> 的结果是 -1。</li></ul><p><b>警告：</b>除数为 0 是<b>未定义行为（undefined behavior）</b>，程序可能崩溃或产生随机结果，务必避免。</p>',
    },
    {
      type: 'code',
      title: '算术运算符示例',
      code: `#include <stdio.h>
int main(void)
{
    int a = 7, b = 2;
    printf("%d / %d = %d\\n", a, b, a / b);          // 整数除法：3
    printf("%d %% %d = %d\\n", a, b, a % b);         // 取模：1
    printf("%d / %d = %f\\n", a, b, (double)a / b);  // 浮点除法：3.5
    printf("2.5 * 4 = %f\\n", 2.5 * 4);              // 10.0
    return 0;
}`,
      note: '在 printf 中想输出百分号 % 本身，需要写成 %% 。',
    },
    {
      type: 'text',
      html: '<h3>赋值与复合赋值运算符</h3><p><b>赋值运算符（assignment operator）</b>是 <code>=</code>，作用是把右侧的值存入左侧变量：<code>a = 5;</code>。左侧必须是可以修改的变量（称为<b>左值（lvalue）</b>），不能是常量或表达式，如 <code>5 = a;</code> 是非法的。</p><p><b>复合赋值运算符（compound assignment）</b>把运算与赋值合二为一：<code>+=</code>、<code>-=</code>、<code>*=</code>、<code>/=</code>、<code>%=</code> 等。<code>a += 3;</code> 等价于 <code>a = a + 3;</code>，其余类推。</p><p><b>关键注意：</b>复合赋值的右侧表达式是<b>整体</b>参与运算的。<code>a *= b + 2;</code> 等价于 <code>a = a * (b + 2);</code>，而不是 <code>a = a * b + 2;</code>。</p><p>赋值表达式本身也有值（就是赋给变量的值），因此可以连续赋值：<code>a = b = c = 0;</code> 从右往左执行，把 a、b、c 都置为 0。</p>',
    },
    {
      type: 'text',
      html: '<h3>自增与自减运算符（++ 和 --）</h3><p><code>++</code> 使变量加 1，<code>--</code> 使变量减 1，等价于 <code>i = i + 1</code>、<code>i = i - 1</code>。它们都有<b>前缀（prefix）</b>与<b>后缀（postfix）</b>两种写法，区别在于"先加还是先用"：</p><ul><li><b>前缀 <code>++i</code></b>：先把 i 加 1，再取新值参与运算（先加后用）；</li><li><b>后缀 <code>i++</code></b>：先取 i 的旧值参与运算，再把 i 加 1（先用后加）。</li></ul><p>例如：<code>int a = i++;</code> 若 i 原来为 5，则 a 得到 5，之后 i 变为 6；而 <code>int b = ++i;</code> 若 i 原来为 5，则 i 先变为 6，b 得到 6。</p><p>当 <code>i++;</code> 单独作为一条语句时，前缀与后缀没有区别。</p><p><b>警告：</b>不要在同一表达式里对同一个变量多次自增自减，如 <code>i++ + i++</code> 属于未定义行为，不同编译器给出的结果可能不同。</p>',
    },
    {
      type: 'code',
      title: '前缀与后缀的区别',
      code: `#include <stdio.h>
int main(void)
{
    int i = 5;
    int a = i++;      // 后缀：a 得旧值 5，随后 i 变为 6
    int b = ++i;      // 前缀：i 先变为 7，b 得新值 7

    printf("a = %d, b = %d, i = %d\\n", a, b, i);

    int j = 10;
    j--;              // 单独使用：j 变为 9
    printf("j = %d\\n", j);
    return 0;
}`,
      note: '输出为：a = 5, b = 7, i = 7；j = 9。请对比 a 与 b 的取值来理解"先加后用 / 先用后加"。',
    },
    {
      type: 'text',
      html: '<h3>关系运算符与逻辑运算符</h3><p><b>关系运算符（relational operators）</b>：<code>&gt;</code>、<code>&lt;</code>、<code>&gt;=</code>、<code>&lt;=</code>、<code>==</code>（等于）、<code>!=</code>（不等于），比较的结果是整数 1（真）或 0（假）。</p><p><b>逻辑运算符（logical operators）</b>：<code>&amp;&amp;</code>（逻辑与）、<code>||</code>（逻辑或）、<code>!</code>（逻辑非）。C 语言中 0 表示假，任何非 0 值都表示真。</p><p><b>短路求值（short-circuit evaluation）</b>是逻辑运算符的重要特性：</p><ul><li><code>A &amp;&amp; B</code>：若 A 为假，B 不再计算，整个表达式直接为假；</li><li><code>A || B</code>：若 A 为真，B 不再计算，整个表达式直接为真。</li></ul><p>利用短路可以写出安全的代码：<code>if (x != 0 &amp;&amp; 10 / x &gt; 1)</code> 中，x 为 0 时右边的除法根本不会执行，避免了除零错误。</p><p><b>最大易错点：</b><code>==</code> 是判断相等，<code>=</code> 是赋值。<code>if (a == 5)</code> 判断 a 是否等于 5；而 <code>if (a = 5)</code> 先把 5 赋给 a，条件恒为真，且 a 的值被改写。</p>',
    },
    {
      type: 'code',
      title: '短路求值示例',
      code: `#include <stdio.h>
int main(void)
{
    int x = 0, y = 1;

    // x 为假，&& 短路：右侧 y++ 不会执行
    if (x && y++)
        printf("A\\n");
    printf("y = %d\\n", y);   // 输出 y = 1

    // 条件运算符：取较大者
    int a = 5, b = 10;
    int bigger = (a > b) ? a : b;
    printf("bigger = %d\\n", bigger);   // 输出 bigger = 10
    return 0;
}`,
      note: '输出为：y = 1、bigger = 10。若把 x 改为非 0，y++ 才会执行。',
    },
    {
      type: 'text',
      html: '<h3>位运算符与条件运算符</h3><p><b>位运算符（bitwise operators）</b>直接对整数的二进制位进行操作，只能用于整型：</p><ul><li><code>&amp;</code> 按位与：<code>5 &amp; 3</code>，即 <code>101 &amp; 011</code> = <code>001</code> = 1；</li><li><code>|</code> 按位或：<code>5 | 3</code> = <code>111</code> = 7；</li><li><code>^</code> 按位异或：<code>5 ^ 3</code> = <code>110</code> = 6（相同为 0、不同为 1）；</li><li><code>~</code> 按位取反：<code>~5</code> 按补码表示结果为 -6；</li><li><code>&lt;&lt;</code> 左移：<code>5 &lt;&lt; 1</code> = 10，相当于乘 2；</li><li><code>&gt;&gt;</code> 右移：<code>5 &gt;&gt; 1</code> = 2，相当于除以 2 取整。</li></ul><p>位运算常用于权限位、掩码（mask）、压缩存储等底层场景。</p><p><b>条件运算符（conditional operator，又称三目运算符）</b><code>?:</code> 是 C 中唯一的三目运算符：<code>表达式1 ? 表达式2 : 表达式3</code>，先求表达式 1，为真则整个表达式的值是表达式 2 的值，否则是表达式 3 的值。例如 <code>int m = (a &gt; b) ? a : b;</code> 取 a、b 中的较大者。</p>',
    },
    {
      type: 'table',
      title: '运算符优先级（从上到下递减）与结合性',
      headers: ['类别', '运算符', '结合性'],
      rows: [
        ['后缀', '() [] -> . ++（后缀） --（后缀）', '左结合'],
        ['一元', '+ - ! ~ ++（前缀） --（前缀） (类型)', '右结合'],
        ['乘除取模', '* / %', '左结合'],
        ['加减', '+ -', '左结合'],
        ['移位', '<< >>', '左结合'],
        ['关系', '< <= > >=', '左结合'],
        ['相等', '== !=', '左结合'],
        ['按位与', '&', '左结合'],
        ['按位异或', '^', '左结合'],
        ['按位或', '|', '左结合'],
        ['逻辑与', '&&', '左结合'],
        ['逻辑或', '||', '左结合'],
        ['条件', '?:', '右结合'],
        ['赋值', '= += -= *= /= %= <<= >>= &= |= ^=', '右结合'],
        ['逗号', ',', '左结合'],
      ],
    },
    {
      type: 'tip',
      kind: 'warn',
      html: '<p><b>易错点与记忆口诀：</b></p><ul><li>区分 <code>==</code> 与 <code>=</code>：判断相等用 <code>==</code>，赋值用 <code>=</code>；</li><li>整数除法会截断：<code>7 / 2</code> 是 3 不是 3.5，<code>%</code> 只能用于整数；</li><li>短路求值会跳过右侧的副作用：<code>x != 0 &amp;&amp; 10 / x</code> 是防除零的经典写法；</li><li>不要在复杂表达式中对同一变量多次 <code>++</code> / <code>--</code>，那是未定义行为；</li><li>优先级记忆：括号 &gt; 一元 &gt; 乘除 &gt; 加减 &gt; 移位 &gt; 关系 &gt; 相等 &gt; 位运算 &gt; 逻辑与/或 &gt; 条件 &gt; 赋值 &gt; 逗号。</li></ul>',
    },
  ],
  exercises: [
    {
      id: 'chapter-03-q1',
      type: 'choice',
      question: '已知 int a = 7, b = 2; 表达式 a / b 的值是？',
      options: ['3.5', '3', '4', '编译错误'],
      answer: 1,
      explanation: '两个 int 相除执行整数除法，结果仍为 int，小数部分被截断，7 / 2 = 3。A 是浮点除法的结果，只有在至少一个操作数为浮点（如 7.0 / 2）时才出现；C 是四舍五入的结果，但整数除法只截断不舍入；D 错误，整数除法完全合法。',
    },
    {
      id: 'chapter-03-q2',
      type: 'choice',
      question: '语句 a *= b + 2; 等价于下面哪个？',
      options: ['a = a * b + 2;', 'a = a * (b + 2);', 'a = a + b * 2;', 'a *= b; a += 2;'],
      answer: 1,
      explanation: '复合赋值的右侧是一个整体，a *= b + 2 等价于 a = a * (b + 2)，先算 b + 2 再乘到 a 上。A 没有加括号，改变了运算顺序；C 是 a = a + b*2，完全是另一种运算；D 先做 a = a*b 再做 a = a+2，相当于 a*b+2，同样漏掉了括号带来的优先级。',
    },
    {
      id: 'chapter-03-q3',
      type: 'code',
      question: '运行下面的代码，输出是什么？',
      code: `#include <stdio.h>
int main(void)
{
    int i = 5;
    int a = i++;
    int b = ++i;
    printf("%d %d", a, b);
    return 0;
}`,
      options: ['5 6', '6 7', '5 7', '6 6'],
      answer: 2,
      explanation: 'i++ 是后缀：先用旧值，a = 5，之后 i 变为 6；++i 是前缀：先自增，i 变为 7，再把新值给 b，b = 7。因此输出 5 7。A 忽略了第二次自增；B 错在把 i++ 也当成"先加"；D 两个值都取了新值，忽略了后缀"先用旧值"的规则。',
    },
    {
      id: 'chapter-03-q4',
      type: 'code',
      question: '运行下面的代码，输出是什么？',
      code: `#include <stdio.h>
int main(void)
{
    int x = 0, y = 1;
    if (x && y++)
        printf("A");
    printf("%d", y);
    return 0;
}`,
      options: ['A1', '1', 'A2', '2'],
      answer: 1,
      explanation: 'x 为 0 即假，&& 触发短路求值，右侧 y++ 根本不会执行，所以 y 保持为 1，且 if 条件为假，不打印 A，最终输出 1。A 错在 if 分支根本不会进入；C、D 错在 y++ 被短路跳过，y 不会变成 2。',
    },
    {
      id: 'chapter-03-q5',
      type: 'multiple',
      question: '关于位运算，下列计算结果正确的有？',
      options: ['5 & 3 的结果是 1', '5 | 3 的结果是 7', '5 ^ 3 的结果是 6', '5 << 1 的结果是 11'],
      answer: [0, 1, 2],
      explanation: '5 的二进制是 101，3 是 011。按位与：101 & 011 = 001 = 1，A 正确；按位或：101 | 011 = 111 = 7，B 正确；按位异或：101 ^ 011 = 110 = 6，C 正确。D 错误：5 << 1 是左移一位，101 变成 1010，即 10，相当于乘以 2，而不是 11。',
    },
    {
      id: 'chapter-03-q6',
      type: 'choice',
      question: '已知 int a = 10, b = 20; 执行 int m = (a > b) ? a : b; 后，m 的值是？',
      options: ['10', '20', '30', '0'],
      answer: 1,
      explanation: '条件运算符先判断 a > b：10 > 20 为假，因此整个表达式的值取冒号后面的 b，即 20。A 是条件为真时才取的值；C 是把两个数相加的结果，与条件运算无关；D 是假分支为 0 的情形，与本题无关。',
    },
    {
      id: 'chapter-03-q7',
      type: 'code',
      question: '运行下面的代码，输出是什么？',
      code: `#include <stdio.h>
int main(void)
{
    int x = 2 + 3 * 4;
    int y = (2 + 3) * 4;
    printf("%d %d", x, y);
    return 0;
}`,
      options: ['20 20', '14 20', '14 14', '20 14'],
      answer: 1,
      explanation: '乘法的优先级高于加法，2 + 3 * 4 = 2 + 12 = 14，x 为 14；加了括号后 (2 + 3) * 4 = 5 * 4 = 20，y 为 20。A 错在把两处都当成先加后乘；C 忽略了括号的作用；D 把两项结果颠倒了。',
    },
    {
      id: 'chapter-03-q8',
      type: 'fill',
      question: '用复合赋值运算符写出"把变量 x 的值增加 3"的完整语句。（也可写出等价的赋值写法）',
      accept: ['x += 3;', 'x+=3;', 'x +=3;', 'x+= 3;', 'x = x + 3;', 'x=x+3;'],
      explanation: '复合赋值写法是 x += 3;，它等价于 x = x + 3;。注意复合赋值右侧是整体：若写成 x += 3 * 2 则等价于 x = x + 6。常见的错误写法 x =+ 3; 是把正 3 赋给 x（不是自增 3），漏写分号也会导致语法错误。',
    },
  ],
};
