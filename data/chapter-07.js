// 章节：函数 — 作者：教材编写组
window.CHAPTERS = window.CHAPTERS || {};
window.CHAPTERS['chapter-07'] = {
  id: 'chapter-07',
  order: 7,
  icon: '🧩',
  title: '函数',
  summary: '把程序拆成可复用的函数：掌握定义与调用、原型声明、值传递、返回值、作用域与生命周期，以及递归与迭代的取舍。',
  sections: [
    {
      type: 'text',
      html: '<h3>函数的定义与调用</h3><p>函数（function）是一段完成特定任务、可以被反复调用的代码块。一个函数定义由四部分组成：<b>返回类型（return type）</b>、<b>函数名</b>、<b>形参列表（parameter list）</b>和<b>函数体</b>。</p><p>定义语法：<code>返回类型 函数名(形参类型 形参名, ...) { 语句; return 返回值; }</code>。调用（call）语法：<code>函数名(实参);</code>。程序从 <code>main</code> 开始执行，遇到函数调用就跳转到被调函数，执行完毕后回到调用处继续。</p><p><code>return</code> 语句有两个作用：一是立即结束当前函数，二是把计算结果返回给调用者。返回类型为 <code>void</code> 的函数不需要返回值，可以写 <code>return;</code> 或直接省略。</p>',
    },
    {
      type: 'code',
      title: '第一个自定义函数：求两个数的较大值',
      code: `#include <stdio.h>

// 函数定义：返回类型 int，两个形参 a、b
int max(int a, int b)
{
    if (a > b)
        return a;      // 返回较大值并结束函数
    else
        return b;
}

int main(void)
{
    int x = 10, y = 20;
    int m = max(x, y);       // 调用函数，x、y 是实参
    printf("较大值是 %d\\n", m);
    return 0;
}`,
      note: 'main 调用 max 时，实参 x、y 的值被复制给形参 a、b；max 执行完 return 后，控制权交回 main。',
    },
    {
      type: 'text',
      html: '<h3>函数声明（原型）与形参、实参</h3><p>如果函数的<b>定义出现在调用之后</b>，编译器在调用点还不知道它的样子，会报"隐式声明"错误。解决办法是给出<b>函数原型（function prototype）</b>：只写函数头并以分号结尾，例如 <code>int max(int a, int b);</code>，通常放在文件开头，作用是提前告诉编译器返回类型与参数类型。</p><p><b>形参（parameter）</b>是函数定义中声明的占位变量，<b>实参（argument）</b>是调用时传入的具体值。调用 <code>max(x, y)</code> 时，实参 x、y 的值被依次赋给形参 a、b，二者的个数和类型必须匹配。</p>',
    },
    {
      type: 'code',
      title: '值传递：为什么交换两个数会失败',
      code: `#include <stdio.h>

// 错误示范：交换的是形参副本，实参不受影响
void swap(int x, int y)
{
    int t = x;
    x = y;
    y = t;
}

int main(void)
{
    int a = 3, b = 5;
    swap(a, b);          // 实参 a、b 的值被复制给形参
    printf("a = %d, b = %d\\n", a, b);   // 输出仍是 3 5
    return 0;
}`,
      note: '这是"交换失败"的错误示范：值传递下 swap 只交换了形参副本。要真正交换两个变量，需要学完指针后通过传地址实现。',
    },
    {
      type: 'tip',
      kind: 'warn',
      html: '<p><b>值传递（pass by value）的本质：</b>C 函数的参数传递一律是"把实参的值复制一份给形参"。形参在函数内怎么改，都影响不到实参——这正是 swap 交换失败的根本原因。若希望函数修改调用方的变量，必须传递变量的<b>地址（指针）</b>。另外，实参与形参的类型应匹配（或可隐式转换），个数必须一致。</p>',
    },
    {
      type: 'text',
      html: '<h3>变量的作用域与生命周期</h3><p><b>作用域（scope）</b>是名字可见的范围，<b>生命周期（lifetime）</b>是变量在内存中存活的时间。</p><ul><li><b>局部变量（local variable）</b>：定义在函数或块 <code>{ }</code> 内，块结束即失效；每次进入函数都会重新创建，默认初值不确定。</li><li><b>全局变量（global variable）</b>：定义在所有函数之外，从定义处到文件末尾可见，程序启动时创建、结束时销毁，未初始化时默认值为 0。</li><li><b>static 局部变量</b>：加 <code>static</code> 后初始化只执行一次，变量跨函数调用保留，但作用域仍只在函数内。</li><li><b>extern</b>：用于声明"该变量或函数定义在其他文件中"，支持多文件（multi-file）程序共享。</li></ul>',
    },
    {
      type: 'code',
      title: 'static 局部变量：跨调用保持计数',
      code: `#include <stdio.h>

int counter(void)
{
    static int count = 0;   // 只初始化一次，调用结束后不销毁
    count++;
    return count;
}

int main(void)
{
    printf("%d ", counter());   // 1
    printf("%d ", counter());   // 2
    printf("%d\\n", counter());  // 3
    return 0;
}`,
      note: '如果去掉 static，count 每次进入 counter 都会重新初始化为 0，三次输出将是 1 1 1。',
    },
    {
      type: 'text',
      html: '<h3>递归：阶乘与斐波那契</h3><p><b>递归（recursion）</b>是函数直接或间接调用自身的编程技巧。一个正确的递归必须满足三要素：</p><ol><li><b>基准情形（base case）</b>：最小的、无需再递归的输入，直接给出答案；</li><li><b>递归关系</b>：把大问题分解为规模更小的同类问题，例如 <code>n! = n × (n-1)!</code>；</li><li><b>规模递减</b>：每次递归调用都向基准情形靠近，否则永远无法终止。</li></ol><p><b>递归深度风险：</b>每次调用都会在栈（stack）上分配一块栈帧（stack frame），递归过深（如数万层）会耗尽栈空间，导致<b>栈溢出（stack overflow）</b>，程序崩溃。此外，朴素递归求斐波那契数会指数级重复计算，fib(40) 已经明显变慢，实际应改用循环或记忆化（memoization）。</p>',
    },
    {
      type: 'code',
      title: '递归实现：阶乘与斐波那契',
      code: `#include <stdio.h>

// 阶乘：n! = n * (n-1)!
long long factorial(int n)
{
    if (n <= 1)                // 基准情形
        return 1;
    return n * factorial(n - 1);   // 递归调用
}

// 斐波那契：f(0)=0, f(1)=1
long long fib(int n)
{
    if (n <= 1)
        return n;
    return fib(n - 1) + fib(n - 2);
}

int main(void)
{
    printf("5! = %lld\\n", factorial(5));   // 120
    printf("fib(10) = %lld\\n", fib(10));   // 55
    return 0;
}`,
      note: 'factorial(5) 展开为 5 × 4 × 3 × 2 × 1；fib 的朴素递归有大量重复计算，n 大时性能急剧下降。',
    },
    {
      type: 'list',
      ordered: false,
      items: [
        '<b>递归与迭代（iteration）对比：</b>迭代用循环实现，没有调用与压栈开销，效率高；递归代码更贴近数学定义、结构清晰，但每层调用都有额外成本，深度过大还会栈溢出。',
        '选择建议：问题天然具有分治结构（如树的遍历、快速排序）用递归；简单累加（如求和、求平均）用迭代。',
        '本章要点：函数定义 / 原型 / 调用、值传递副本、return 返回值、局部 / 全局 / static / extern 变量、递归三要素与栈溢出风险。',
      ],
    },
  ],
  exercises: [
    {
      id: 'chapter-07-q1',
      type: 'choice',
      question: '下面哪个是合法的函数定义？',
      options: ['int add(int x, int y) { return x + y; }', 'int add(int x, y) { return x + y; }', 'add(int x, int y) { return x + y; }', 'int add(x, y) { return x + y; }'],
      answer: 0,
      explanation: '函数定义的完整形式是"返回类型 函数名(形参列表) { 函数体 }"，且每个形参都必须单独带类型。A 完全符合。B 中第二个形参 y 缺少类型声明；C 缺少返回类型（C99 起不允许省略）；D 中两个形参都缺少类型，属于早已废弃的旧式写法。',
    },
    {
      id: 'chapter-07-q2',
      type: 'choice',
      question: '关于函数原型（函数声明），下列说法正确的是？',
      options: ['函数原型必须写在函数定义之前', '原型让编译器在调用点知道返回类型与参数类型，从而正确检查实参并生成调用代码', '原型中的形参必须写出参数名', '没有函数原型，程序一定无法运行'],
      answer: 1,
      explanation: '函数原型的作用是：当函数定义在调用之后时，提前把函数的返回类型和参数类型告诉编译器，B 正确。A 错误：若定义在调用之前，则不需要单独的原型；原型放在定义前或定义后（调用前）均可。C 错误：int max(int, int); 省略参数名完全合法。D 错误：定义位于调用之前时，不需要原型程序也能正常运行。',
    },
    {
      id: 'chapter-07-q3',
      type: 'code',
      question: '运行下面的程序，输出是什么？',
      code: `#include <stdio.h>

void swap(int x, int y)
{
    int t = x;
    x = y;
    y = t;
}

int main(void)
{
    int a = 3, b = 5;
    swap(a, b);
    printf("%d %d\\n", a, b);
    return 0;
}`,
      options: ['5 3', '3 5', '3 3', '5 5'],
      answer: 1,
      explanation: 'C 的参数传递是值传递（pass by value）：调用 swap(a, b) 时，实参 a、b 的值被复制给形参 x、y，函数内部交换的是副本，对 main 中的 a、b 没有任何影响，因此输出仍是 3 5。选项 A 是"交换成功"才会出现的结果；选项 C、D 是把形参副本的变化错误地映射回实参。想真正交换两个变量，必须传递指针（指针章节讲解）。',
    },
    {
      id: 'chapter-07-q4',
      type: 'code',
      question: '连续三次调用 f()，程序输出是什么？',
      code: `#include <stdio.h>

int f(void)
{
    static int n = 0;
    n++;
    return n;
}

int main(void)
{
    printf("%d ", f());
    printf("%d ", f());
    printf("%d\\n", f());
    return 0;
}`,
      options: ['1 1 1', '3 3 3', '1 2 3', '0 1 2'],
      answer: 2,
      explanation: 'static 局部变量只在第一次进入函数时初始化一次，函数结束后变量不销毁、跨调用保留。第一次调用 n 由 0 变为 1 并返回 1；第二次返回 2；第三次返回 3，输出 1 2 3。选项 A 是把 n 当成普通局部变量（每次都重新初始化为 0）；选项 B 是误以为输出最终值；选项 D 对应"先返回再自增"（return n++）才会出现的结果，而代码是先 n++ 再 return。',
    },
    {
      id: 'chapter-07-q5',
      type: 'code',
      question: '按照代码中的定义，fib(4) 的结果是？',
      code: `#include <stdio.h>

long long fib(int n)
{
    if (n <= 1)
        return n;
    return fib(n - 1) + fib(n - 2);
}

int main(void)
{
    printf("%lld\\n", fib(4));
    return 0;
}`,
      options: ['2', '3', '4', '5'],
      answer: 1,
      explanation: '按定义 f(0)=0、f(1)=1，逐步递推：f(2) = f(1)+f(0) = 1，f(3) = f(2)+f(1) = 2，f(4) = f(3)+f(2) = 3。选项 A 的 2 是 f(3) 的值；选项 C 把下标 4 当成了结果；选项 D 的 5 是 f(5) 的值。注意本定义中数列从 f(0)=0 开始。',
    },
    {
      id: 'chapter-07-q6',
      type: 'multiple',
      question: '关于递归，下列说法正确的有哪些？',
      options: ['递归函数必须包含基准情形（终止条件），否则会无限调用', '递归调用过深可能导致栈溢出（stack overflow）', '理论上，任何递归程序都可以改写成迭代版本', '递归版本的运行效率一定高于迭代版本'],
      answer: [0, 1, 2],
      explanation: 'A 正确：没有终止条件的递归会无限压栈，最终栈溢出，永远不会正常返回。B 正确：每次调用占用一块栈帧，深度过大（如数万层）会耗尽栈空间导致崩溃。C 正确：递归与迭代表达能力等价，递归都可以用"显式栈 + 循环"改写成迭代。D 错误：递归有函数调用与压栈开销，朴素斐波那契还会指数级重复计算，通常比迭代慢。',
    },
    {
      id: 'chapter-07-q7',
      type: 'choice',
      question: '若函数内部定义了与某个全局变量同名的局部变量，函数内访问该名字时得到的是？',
      options: ['全局变量', '局部变量', '两者都会被更新', '编译错误'],
      answer: 1,
      explanation: '局部变量会遮蔽（shadow）同名的全局变量：在函数内部，该名字指向局部变量，B 正确。A 错误：被遮蔽的全局变量在函数内无法直接访问（C 没有 C++ 的 :: 作用域运算符）。C 错误：同一作用域内一个名字只对应一个变量，不存在"两者都更新"。D 错误：这是合法代码，编译器通常只给出遮蔽警告，不会报错。',
    },
    {
      id: 'chapter-07-q8',
      type: 'fill',
      question: '阶乘函数满足 factorial(n) = n * factorial(n - 1)，基准情形 factorial(0) = 1，那么 factorial(5) 的值是？（填数字）',
      accept: ['120'],
      explanation: 'factorial(5) = 5 × 4 × 3 × 2 × 1 = 120。递归展开为 5 × factorial(4)，factorial(4) = 4 × factorial(3)，依次递归到 factorial(0) = 1 后逐层回代，最终得到 120。',
    },
  ],
};
