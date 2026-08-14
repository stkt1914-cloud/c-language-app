// 章节：变量与数据类型
window.CHAPTERS = window.CHAPTERS || {};
window.CHAPTERS['chapter-02'] = {
  id: 'chapter-02',
  order: 2,
  icon: '🔢',
  title: '变量与数据类型',
  summary: '学会用标识符给数据起名字，掌握 C 语言的基本数据类型、变量的声明与初始化、常量与类型转换。',
  sections: [
    {
      type: 'text',
      html: '<h3>标识符与关键字</h3><p><b>标识符（identifier）</b>是程序中给变量、函数、常量等起的名字。C 语言对标识符的命名有严格规则：</p><ul><li>只能由<b>字母</b>、<b>数字</b>和<b>下划线（_）</b>组成；</li><li><b>不能以数字开头</b>，如 <code>2age</code> 是非法标识符；</li><li><b>不能与关键字重名</b>，如不能把变量命名为 <code>int</code>；</li><li><b>区分大小写</b>，<code>Age</code> 和 <code>age</code> 是两个完全不同的变量。</li></ul><p><b>关键字（keyword）</b>是 C 语言预先保留、具有特殊含义的单词，如 <code>int</code>、<code>char</code>、<code>if</code>、<code>return</code> 等，用户不能把它们当作标识符使用。</p><p>命名建议：<b>见名知意</b>，用有意义的英文单词组合，如 <code>total_score</code>、<code>student_count</code>，不要用 <code>a1</code>、<code>b2</code> 这类无意义的名字。</p>',
    },
    {
      type: 'text',
      html: '<h3>基本数据类型（Basic Data Types）</h3><p>C 语言是<b>强类型</b>语言，每个变量在使用前都必须声明其类型。C 提供了四种基本类型：</p><ul><li><b>int（整型，integer）</b>：存放整数，如 <code>100</code>、<code>-5</code>；</li><li><b>float（单精度浮点型，single-precision floating-point）</b>：存放小数，约 6~7 位有效数字，字面量常带 <code>f</code> 后缀，如 <code>3.14f</code>；</li><li><b>double（双精度浮点型，double-precision）</b>：存放小数，约 15~16 位有效数字，精度更高，默认的小数字面量就是 double 类型；</li><li><b>char（字符型，character）</b>：存放单个字符（用单引号括起来，如 <code>\'A\'</code>），本质上是小范围的整数，也可存放 ASCII 码。</li></ul><p>此外，整数类型还可以用 <code>short</code>、<code>long</code>、<code>unsigned</code>、<code>signed</code> 修饰，如 <code>unsigned int</code>（无符号整型，只能表示非负数）。</p><p>用 <b>sizeof 运算符（operator）</b>可以求出类型或变量占用的字节数：<code>sizeof(int)</code>、<code>sizeof x</code>。注意 sizeof 是<b>运算符</b>而不是函数，它在编译期就能算出结果。</p>',
    },
    {
      type: 'table',
      title: '常见类型的字节数与取值范围（以常见 32/64 位平台为准）',
      headers: ['类型', '字节数', '取值范围'],
      rows: [
        ['char', '1', '通常 -128 ~ 127（或 0 ~ 255）'],
        ['short', '2', '-32768 ~ 32767'],
        ['int', '4', '-2147483648 ~ 2147483647'],
        ['unsigned int', '4', '0 ~ 4294967295'],
        ['long', '4 或 8', 'Windows 上为 4 字节，Linux 64 位为 8 字节'],
        ['float', '4', '约 ±3.4e-38 ~ 3.4e38，约 7 位有效数字'],
        ['double', '8', '约 ±1.7e-308 ~ 1.7e308，约 15 位有效数字'],
      ],
    },
    {
      type: 'text',
      html: '<h3>变量的声明与初始化</h3><p><b>声明（declaration）</b>就是告诉编译器变量的名字和类型，语法为 <code>类型 变量名;</code>。例如：<code>int age;</code> 声明一个整型变量 <code>age</code>，<code>double price;</code> 声明一个双精度变量 <code>price</code>。</p><p><b>初始化（initialization）</b>指在声明的同时赋初值：<code>int age = 18;</code>；也可以先声明后赋值：<code>int age; age = 18;</code>。</p><p>一条语句可以声明多个同类型变量：<code>int a, b, c;</code>，也可以混用初始化和非初始化：<code>int a = 1, b;</code>。</p><p><b>警告：</b>局部变量若不初始化，其值是<b>不确定的垃圾值（garbage value）</b>，直接使用会得到随机结果，因此使用前一定要先赋值。</p>',
    },
    {
      type: 'code',
      title: '声明、初始化、打印与 sizeof',
      code: `#include <stdio.h>

int main(void)
{
    // 声明并初始化四种基本类型变量
    int n = 10;              // 整型
    float f = 3.14f;         // 单精度浮点，f 后缀
    double d = 3.14159;      // 双精度浮点（默认 double）
    char c = 'A';            // 字符

    // 打印变量的值：%d 整数、%f 浮点、%c 字符
    printf("n = %d, c = %c\\n", n, c);
    printf("f = %f, d = %f\\n", f, d);

    // sizeof 求变量占用的字节数
    printf("sizeof(n) = %lu 字节\\n", (unsigned long)sizeof(n));
    printf("sizeof(d) = %lu 字节\\n", (unsigned long)sizeof(d));
    return 0;
}`,
      note: 'printf 打印 float 与 double 都用 %f；sizeof 返回 size_t 类型，这里强转为 unsigned long 并用 %lu 打印，以保证可移植性。',
    },
    {
      type: 'tip',
      kind: 'warn',
      html: '<p><b>易错点提醒：</b></p><ul><li>未初始化的局部变量值是随机的"垃圾值"，一定要先赋值再使用；</li><li>变量名不能以数字开头、不能与关键字重名、不能包含减号等符号；</li><li>字符常量用<b>单引号</b>（<code>\'A\'</code>），字符串常量用<b>双引号</b>（<code>"A"</code>），两者类型完全不同；</li><li>给 <code>int</code> 赋值小数（如 <code>int x = 3.9;</code>）会<b>截断</b>为 3，编译器通常会给出警告。</li></ul>',
    },
    {
      type: 'text',
      html: '<h3>常量（Constant）</h3><p><b>字面常量（literal）</b>是直接写在代码中的值，如 <code>100</code>、<code>3.14</code>、<code>\'A\'</code>、<code>"Hello"</code>。C 还提供了两种"给常量起名字"的方式：</p><ul><li><b>const 限定符</b>：<code>const int DAYS = 7;</code> 把 <code>DAYS</code> 声明为只读变量，任何对它的赋值都会导致编译错误。const 常量<b>有类型</b>，能参与编译器的类型检查，更安全；</li><li><b>#define 宏（macro）</b>：<code>#define PI 3.14159</code> 是预处理指令，编译器在正式编译前把代码中所有 <code>PI</code> 替换为 <code>3.14159</code>（文本替换），它<b>没有类型</b>，也不做类型检查。</li></ul><p>字面常量还可以带后缀：<code>3.14f</code> 是 float 类型，<code>3.14</code> 默认是 double，<code>100L</code> 是 long 类型。</p><p>现代 C 编程更推荐用 <code>const</code>：它类型安全、可调试；而宏容易引发意想不到的替换问题（例如 <code>#define N 1+2</code> 与表达式结合时可能出错）。</p>',
    },
    {
      type: 'code',
      title: 'const 常量与 #define 宏',
      code: `#include <stdio.h>

#define PI 3.14159      // 宏常量：编译前文本替换

int main(void)
{
    const int DAYS = 7; // const 常量：只读变量
    printf("PI = %f\\n", PI);
    printf("DAYS = %d\\n", DAYS);

    // DAYS = 8;        // 错误！const 变量不能修改
    // PI = 3.14;       // 错误！宏不能被赋值
    return 0;
}`,
      note: '被注释掉的两行都是非法写法：const 变量不可修改，宏常量没有可存储的"变量"可言。',
    },
    {
      type: 'text',
      html: '<h3>类型转换（Type Conversion）</h3><p><b>隐式转换（implicit conversion）</b>：当不同类型的数据混合运算时，编译器会自动把"较低精度"的类型提升为"较高精度"的类型再计算。例如 <code>int</code> 与 <code>double</code> 运算时，<code>int</code> 会先被转为 <code>double</code>，结果是 <code>double</code>。整数类型之间还有<b>整型提升（integer promotion）</b>规则：char、short 参与运算时先提升为 int。</p><p>隐式转换的方向：char/short → int → unsigned int → long → float → double，总体趋势是<b>向取值范围更大、精度更高的方向</b>转换。要注意：把 double 赋给 int（如 <code>int x = 3.99;</code>）时小数部分被<b>截断</b>，得到 3，可能丢失精度。</p><p><b>显式转换 / 强制类型转换（cast）</b>：由程序员手动指定类型，语法为 <code>(目标类型)表达式</code>，例如 <code>(int)x</code>、<code>(double)a / b</code>。强制转换只是<b>截断小数部分</b>，并不会四舍五入。</p>',
    },
    {
      type: 'code',
      title: '隐式转换与显式强制转换',
      code: `#include <stdio.h>

int main(void)
{
    int a = 7, b = 2;

    double r1 = a / b;         // 先做整数除法：7/2 = 3，再转 double
    double r2 = (double)a / b; // 强转后：7.0 / 2 = 3.5

    double x = 7.9;
    int y = (int)x;            // 强制转换：截断为 7，不是四舍五入

    printf("r1 = %f\\n", r1);  // 输出 3.000000
    printf("r2 = %f\\n", r2);  // 输出 3.500000
    printf("y = %d\\n", y);    // 输出 7
    return 0;
}`,
      note: '想在整数除法中得到小数结果，必须先把其中一个操作数显式转换为浮点类型。',
    },
  ],
  exercises: [
    {
      id: 'chapter-02-q1',
      type: 'choice',
      question: '下列哪个是合法的 C 标识符？',
      options: ['2abc', 'my_name', 'int', 'a-b'],
      answer: 1,
      explanation: 'my_name 由字母、下划线组成且不以数字开头，是合法标识符。2abc 以数字开头，非法；int 是关键字，不能用作标识符；a-b 含减号，不属于标识符允许的字符，非法。',
    },
    {
      id: 'chapter-02-q2',
      type: 'choice',
      question: '下列哪条语句能正确声明一个单精度浮点变量并初始化为 3.14？',
      options: ['float f = 3.14f;', 'double f = 3.14;', 'int f = 3.14;', 'char f = 3.14;'],
      answer: 0,
      explanation: '单精度浮点类型是 float，float f = 3.14f; 正确，且 f 后缀避免了 double 到 float 的隐式转换。B 声明的是 double（双精度）；C 是 int（整型）；D 是 char（字符型），都不是单精度浮点，而且后两者把小数赋给整数/字符还会截断数据。',
    },
    {
      id: 'chapter-02-q3',
      type: 'multiple',
      question: '下列哪些是 C 语言的关键字（keyword）？',
      options: ['int', 'if', 'printf', 'return'],
      answer: [0, 1, 3],
      explanation: 'int 是整型关键字，if 是条件分支关键字，return 是函数返回关键字，三者都是 C 语言保留的关键字。printf 是标准库（stdio.h）提供的函数名，属于标识符而非关键字，因此原则上可以被用户重新定义（虽然不建议）。',
    },
    {
      id: 'chapter-02-q4',
      type: 'code',
      question: '运行下面的代码，输出是什么？',
      code: `#include <stdio.h>
int main(void)
{
    char c = 'A';
    printf("%lu", (unsigned long)sizeof(c));
    return 0;
}`,
      options: ['1', '2', '4', '取决于操作系统'],
      answer: 0,
      explanation: 'C 标准规定 sizeof(char) 恒等于 1，即 char 类型占 1 个字节，与操作系统无关，因此输出 1。2 是 short 的常见大小，4 是 int 的常见大小，都是与 char 混淆的错误答案；选项 D 忽视了标准对 char 大小的明确规定。',
    },
    {
      id: 'chapter-02-q5',
      type: 'fill',
      question: '用一条语句声明一个名为 pi 的 double 类型变量，并初始化为 3.14159。（写出完整语句）',
      accept: ['double pi = 3.14159;', 'double pi=3.14159;', 'double pi =3.14159;', 'double pi= 3.14159;'],
      explanation: '声明语句的格式是"类型 变量名 = 初始值;"，因此正确写法为 double pi = 3.14159;。类型必须是 double，初始值 3.14159 默认就是 double 字面量；若写成 int pi = 3.14159; 会因类型不符而截断为 3，若少了分号则语句不完整。',
    },
    {
      id: 'chapter-02-q6',
      type: 'choice',
      question: '已知 int a = 5; double b = 2.0; 那么表达式 a / b 的结果是？',
      options: ['int 类型，值为 2', 'double 类型，值为 2.5', 'int 类型，值为 2.5', '编译错误，类型不匹配'],
      answer: 1,
      explanation: 'int 与 double 混合运算时发生隐式转换，int 被提升为 double，所以 a / b 相当于 5.0 / 2.0，结果是 double 类型的 2.5。A 错在忽略了隐式转换；C 错在结果类型是 double 而非 int，且 int 不可能表示 2.5；D 错在 C 允许不同类型混合运算并自动转换。',
    },
    {
      id: 'chapter-02-q7',
      type: 'code',
      question: '运行下面的代码，输出是什么？',
      code: `#include <stdio.h>
int main(void)
{
    double x = 7.9;
    int y = (int)x;
    printf("%d %d", y, (int)(x + 0.5));
    return 0;
}`,
      options: ['7 8', '8 8', '7 7', '8 7'],
      answer: 0,
      explanation: '(int)x 直接把 7.9 的小数部分截断，得到 7，因此 y = 7；(int)(x + 0.5) 先算 7.9 + 0.5 = 8.4，再截断为 8。先加 0.5 再取整是常用的"四舍五入"技巧。B 错在 (int)x 不会四舍五入；C 忽略了 x + 0.5 的作用；D 两项结果颠倒了。',
    },
    {
      id: 'chapter-02-q8',
      type: 'multiple',
      question: '关于 const 常量与 #define 宏，下列说法正确的有？',
      options: [
        'const int N = 10; 定义了一个运行中不能被修改的变量 N',
        '#define N 10 是预处理指令，在编译前完成文本替换',
        'const 常量通常会占用内存空间，而 #define 宏在预处理后不占用运行时内存',
        '#define 定义的宏常量带有明确的类型，可以参与编译器的类型检查',
      ],
      answer: [0, 1, 2],
      explanation: 'const 变量是只读的，任何修改都会报编译错误，A 正确；#define 由预处理器在编译前做纯文本替换，B 正确；const 变量通常有存储空间，而宏在预处理阶段已被替换为字面量，不占用运行时内存，C 正确。D 错误：宏是纯文本替换，没有类型，也不参与类型检查，这正是它不如 const 安全的原因。',
    },
  ],
};
