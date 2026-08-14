// 章节：预处理与进阶主题
window.CHAPTERS = window.CHAPTERS || {};
window.CHAPTERS['chapter-12'] = {
  id: 'chapter-12',
  order: 12,
  icon: '🧩',
  title: '预处理与进阶主题',
  summary: '深入理解预处理指令（#define、#include、条件编译）与预定义宏，并掌握函数指针回调、单链表与可变参数等进阶技巧。',
  sections: [
    {
      type: 'text',
      html: '<h3>预处理与 #define</h3><p>C 源文件在编译之前会先经过<code>预处理</code>（preprocessing）阶段：所有以 <code>#</code> 开头的指令（directive）都由预处理器做纯文本层面的处理，比如用 <code>gcc -E main.c</code> 就能查看预处理后的结果。</p><p><b>对象宏（object-like macro）：</b><code>#define 名字 替换文本</code> 定义一个不接收参数的宏，此后代码中出现的"名字"会被<code>原样替换</code>成"替换文本"。例如 <code>#define PI 3.14159</code> 之后，代码里的 PI 在预处理阶段都会变成 3.14159。宏名习惯用全大写以区别于变量。</p><p><b>函数宏（function-like macro）：</b>宏也可以带参数，如 <code>#define MAX(a, b) ((a) > (b) ? (a) : (b))</code>，调用 <code>MAX(3, 7)</code> 时展开为 <code>((3) > (7) ? (3) : (7))</code>。它看起来像函数，本质仍是文本替换。</p><p><b>括号陷阱：</b>若写成 <code>#define SQUARE(x) x * x</code>，那么 <code>SQUARE(2 + 3)</code> 会展开为 <code>2 + 3 * 2 + 3</code>，结果是 11 而不是 25。正确的函数宏要把<i>每个参数</i>和<i>整个表达式</i>都加括号：<code>#define SQUARE(x) ((x) * (x))</code>。</p><p><b>#undef：</b>用于撤销宏定义，<code>#undef PI</code> 之后 PI 不再被替换，之后还可以重新定义。宏没有类型、不占内存、不做类型检查，只是编译前的文本替换。</p>',
    },
    {
      type: 'code',
      title: '对象宏与函数宏示例',
      code: `#include <stdio.h>

#define PI 3.14159               // 对象宏：替换为字面量
#define SQUARE(x) ((x) * (x))    // 函数宏：参数与整体都要加括号
#define MAX(a, b) ((a) > (b) ? (a) : (b))
#define LIMIT 100

#undef LIMIT                      // 撤销宏定义
#define LIMIT 200                 // 重新定义

int main(void)
{
    printf("PI = %.5f\\n", PI);
    printf("SQUARE(2 + 3) = %d\\n", SQUARE(2 + 3));   // ((2+3)*(2+3)) = 25
    printf("MAX(3, 7) = %d\\n", MAX(3, 7));
    printf("LIMIT = %d\\n", LIMIT);
    return 0;
}`,
      note: '函数宏的每个参数和整个表达式都必须加括号；#undef 之后可以重新定义同名宏，最终生效的是最后一次定义。',
    },
    {
      type: 'tip',
      kind: 'warn',
      html: '<p><b>不要向函数宏传入带副作用的表达式：</b>设 <code>#define MAX(a, b) ((a) > (b) ? (a) : (b))</code>，调用 <code>MAX(++x, y)</code> 时，<code>++x</code> 会被展开到两处，自增执行两次，结果与调用普通函数完全不同。</p><p><b>宏与函数的选择：</b></p><ul><li>简单常量：优先用 <code>const</code> 或 <code>enum</code>；确需编译期替换时才用宏。</li><li>简单表达式运算：优先用 <code>static inline</code> 函数，既有类型检查又不损失性能。</li><li>需要泛型、字符串化 <code>#</code>、记号粘贴 <code>##</code> 等编译期能力时，才必须使用宏。</li></ul><p><b>调试提示：</b>宏展开后，编译错误信息往往指向展开后的代码，很难定位；可以用 <code>gcc -E main.c</code> 查看预处理结果来排查。</p>',
    },
    {
      type: 'text',
      html: '<h3>#include 与防重复包含</h3><p><code>#include</code> 指令的作用是<code>文件包含</code>：把指定文件的内容原样"插入"到本文件中该指令所在的位置。<code>#include &lt;stdio.h&gt;</code> 用尖括号，编译器只在系统头文件目录中查找；<code>#include \"myheader.h\"</code> 用双引号，优先在当前源文件所在目录查找，找不到再去系统目录。</p><p>当一个头文件被多个源文件包含、或头文件之间互相包含时，它可能被重复插入，造成重复声明/重复定义错误。解决办法是<code>防重复包含</code>（include guard）：</p><p><code>#ifndef MY_HEADER_H</code>：若宏 MY_HEADER_H 尚未定义；<code>#define MY_HEADER_H</code>：立即定义它；头文件内容写在中间；最后以 <code>#endif</code> 结束。第一次包含时宏未定义，内容被插入；第二次包含时宏已定义，#ifndef 为假，整个文件体被跳过。</p><p>另一种写法是在头文件第一行写 <code>#pragma once</code>，GCC、Clang、MSVC 等主流编译器都支持，更简洁，但它不是 C 标准规定的指令。</p>',
    },
    {
      type: 'text',
      html: '<h3>条件编译与预定义宏</h3><p><code>条件编译</code>（conditional compilation）让同一份源码在不同条件下编译出不同的代码：</p><ul><li><code>#if 表达式</code>：表达式为真（非 0）时编译其后的代码，可配合 <code>#elif</code>、<code>#else</code>、<code>#endif</code> 构成多分支。</li><li><code>#ifdef 宏名</code>：仅当该宏<i>已被定义</i>（无论值是多少）时编译；<code>#ifndef</code> 恰好相反。它们只判断"是否定义"，不看值。</li></ul><p>典型用途：调试开关（<code>#ifdef DEBUG</code>）、平台差异（<code>#if defined(_WIN32)</code>）、按版本裁剪功能。</p><p>编译器还自动提供若干<code>预定义宏</code>（predefined macro），无需 #define 即可使用：</p><ul><li><code>__FILE__</code>：当前源文件名（字符串）。</li><li><code>__LINE__</code>：当前行号（整数）。</li><li><code>__DATE__</code>：编译日期，形如 "Jan 01 2025"。</li><li><code>__TIME__</code>：编译时间。</li></ul><p>它们常被用来打印日志，快速定位出错的文件与行号。</p>',
    },
    {
      type: 'code',
      title: '条件编译与预定义宏综合示例',
      code: `#include <stdio.h>

#define DEBUG 1       // 改为 0 可关闭调试输出
#define VERSION 3

int main(void)
{
#if DEBUG             // 表达式为 0 时，下面这段代码不会被编译
    printf("[调试] 版本 %d 正在运行。\\n", VERSION);
#endif

#ifdef VERSION         // 只判断"是否定义"，不判断值
    printf("VERSION 已定义。\\n");
#else
    printf("VERSION 未定义。\\n");
#endif

    // 预定义宏：由编译器提供，可直接使用
    printf("所在文件：%s\\n", __FILE__);
    printf("所在行号：%d\\n", __LINE__);
    printf("编译日期：%s\\n", __DATE__);
    printf("编译时间：%s\\n", __TIME__);
    return 0;
}`,
      note: '条件编译发生在编译之前；#ifdef 与 #if 的区别是高频考点：#ifdef 只判断宏是否被定义，与宏的值无关；#if 则根据表达式的值（0 为假）决定。',
    },
    {
      type: 'text',
      html: '<h3>函数指针、回调与可变参数简介</h3><p><code>函数指针</code>（function pointer）是指向函数的指针，声明语法是"返回类型 (*指针名)(参数列表)"，例如：<code>int (*p)(int, int);</code> 声明 p 可以指向"接收两个 int、返回 int"的函数。函数名本身就是函数的地址，所以可以直接 <code>p = add;</code>，然后 <code>p(3, 4)</code> 调用。</p><p><b>小心区分：</b><code>int *p(int, int);</code> 声明的是"返回 int* 的普通函数"，不是函数指针——星号要和指针名一起加括号。</p><p>函数指针最典型的应用是<code>回调</code>（callback）：把函数作为参数传给另一个函数，由它来决定何时调用。排序、事件处理、信号机制都大量使用回调。</p><p><code>可变参数</code>（variadic arguments）让函数可以接收不定数量的参数（printf 就是典型）。需要 <code>stdarg.h</code> 中的四个要素配合：<code>va_list</code> 保存参数列表；<code>va_start(ap, last)</code> 从最后一个固定参数开始初始化；<code>va_arg(ap, 类型)</code> 依次取出一个参数；<code>va_end(ap)</code> 清理。va_start 与 va_end 必须成对调用。</p>',
    },
    {
      type: 'code',
      title: '综合示例：函数指针回调与可变参数',
      code: `#include <stdio.h>
#include <stdarg.h>

// 可变参数：计算 n 个 int 之和，... 表示可变参数部分
int sum(int n, ...)
{
    va_list ap;
    int total = 0;

    va_start(ap, n);            // 从最后一个固定参数 n 开始初始化
    for (int i = 0; i < n; i++) {
        total += va_arg(ap, int);   // 依次取出一个 int
    }
    va_end(ap);                 // 必须与 va_start 成对使用
    return total;
}

// 回调：比较函数决定排序规则
int cmp_asc(int a, int b) { return a - b; }
int cmp_desc(int a, int b) { return b - a; }

// 冒泡排序：排序规则由函数指针 cmp 决定
void sort(int arr[], int n, int (*cmp)(int, int))
{
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - 1 - i; j++) {
            if (cmp(arr[j], arr[j + 1]) > 0) {
                int t = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = t;
            }
        }
    }
}

int main(void)
{
    int arr[] = {5, 2, 8, 1, 9};
    sort(arr, 5, cmp_asc);          // 函数名本身就是函数指针
    for (int i = 0; i < 5; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
    printf("1+2+3+4 = %d\\n", sum(4, 1, 2, 3, 4));
    return 0;
}`,
      note: '函数指针作为参数传入 sort，调用方决定排序规则，这就是回调的典型用法；sum 用 va_list 处理不定个数的参数，va_start 与 va_end 必须成对出现。',
    },
    {
      type: 'text',
      html: '<h3>单链表入门</h3><p>数组长度固定，中间插入或删除元素要移动大量数据；当元素个数不确定时，可以用<code>链表</code>（linked list）。链表由若干<code>节点</code>（node）组成，每个节点包含<code>数据域</code>和<code>指针域</code>，指针域指向下一个节点，最后一个节点指向 NULL。</p><p>节点用<code>结构体</code>（struct）描述：<code>struct Node { int data; struct Node *next; };</code>——结构体内部引用自身，必须写成 <code>struct Node *next</code>，并可用 <code>typedef struct Node Node;</code> 起别名。</p><p>节点在堆上通过 <code>malloc</code> <code>动态分配</code>（dynamic memory allocation），用完必须 <code>free</code>，否则造成<code>内存泄漏</code>（memory leak）；每次 malloc 后都要检查返回值是否为 NULL。</p><p>基本操作：<b>头插法</b>插入节点（新节点成为头，O(1)）；<b>遍历</b>从 head 出发沿 next 逐个访问；<b>释放</b>整条链表时逐个 free 节点，注意先保存 next 再 free 当前节点，避免访问已释放的内存（悬垂指针，dangling pointer）。</p>',
    },
    {
      type: 'code',
      title: '单链表完整示例：插入、遍历与释放',
      code: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;              // 数据域
    struct Node *next;     // 指针域：指向下一个节点
} Node;

// 头插法：在链表头部插入一个新节点
Node *insert_head(Node *head, int value)
{
    Node *p = (Node *)malloc(sizeof(Node));   // 在堆上动态分配节点
    if (p == NULL) {                          // 必须检查分配是否成功
        printf("内存分配失败！\\n");
        exit(1);
    }
    p->data = value;
    p->next = head;        // 新节点指向原来的头节点
    return p;              // 新节点成为新的头
}

// 遍历链表并打印
void print_list(Node *head)
{
    Node *p;
    for (p = head; p != NULL; p = p->next) {
        printf("%d -> ", p->data);
    }
    printf("NULL\\n");
}

// 释放整条链表，防止内存泄漏
void free_list(Node *head)
{
    Node *p = head;
    while (p != NULL) {
        Node *tmp = p;     // 先保存当前节点
        p = p->next;       // 再移动到下一个节点
        free(tmp);         // 最后释放当前节点
    }
}

int main(void)
{
    Node *head = NULL;

    head = insert_head(head, 30);
    head = insert_head(head, 20);
    head = insert_head(head, 10);

    print_list(head);      // 输出：10 -> 20 -> 30 -> NULL
    free_list(head);       // 释放全部节点
    return 0;
}`,
      note: '释放链表时先保存 next 再 free 当前节点，否则会访问已释放的内存；malloc 与 free 必须成对出现，防止内存泄漏。',
    },
  ],
  exercises: [
    {
      id: 'chapter-12-q1',
      type: 'choice',
      question: '关于 #define 定义的对象宏（object-like macro），下列说法正确的是？',
      options: ['它在程序运行时创建一个不占内存的常量', '它在预处理阶段把宏名原样替换为指定的文本', '它声明了一个带类型检查的变量', '它与 const 常量完全等价，可以做类型检查'],
      answer: 1,
      explanation: '#define 是预处理指令，在编译之前进行纯文本替换：代码中出现的宏名会被替换为后面的文本，替换完成后再交给编译器。宏不是运行时的对象（A 错），不是变量（C 错）；它没有类型、不做类型检查，与 const 常量并不等价（D 错）——const 有类型，宏只是文本。',
    },
    {
      id: 'chapter-12-q2',
      type: 'code',
      question: '已知 #define SQUARE(x) x * x，下面程序输出的结果是？',
      code: `#include <stdio.h>

#define SQUARE(x) x * x

int main(void)
{
    printf("%d\\n", SQUARE(2 + 3));
    return 0;
}`,
      options: ['25', '11', '13', '编译错误'],
      answer: 1,
      explanation: '宏是纯文本替换：SQUARE(2 + 3) 展开为 2 + 3 * 2 + 3，根据运算符优先级先算乘法，得到 2 + 6 + 3 = 11。只有把宏定义为 #define SQUARE(x) ((x) * (x))，即每个参数和整个表达式都加括号，SQUARE(2 + 3) 才会展开为 ((2 + 3) * (2 + 3)) = 25（A 错）；13 是错误推算，没有任何依据（C 错）；展开后的代码 2 + 3 * 2 + 3 完全合法，不会编译错误（D 错）。',
    },
    {
      id: 'chapter-12-q3',
      type: 'code',
      question: '下面程序运行后会输出什么？',
      code: `#include <stdio.h>

#define DEBUG 0

int main(void)
{
#ifdef DEBUG
    printf("A");
#else
    printf("B");
#endif
    return 0;
}`,
      options: ['A', 'B', 'AB', '编译错误'],
      answer: 0,
      explanation: '#ifdef 只判断宏是否被定义，与宏的值无关。DEBUG 已被 #define 定义（值为 0 也算"已定义"），所以 #ifdef 为真，只有 printf("A") 被编译，输出 A。若把 #ifdef 换成 #if DEBUG，则因为 DEBUG 的值是 0（假），才会走 #else 输出 B——这是 #ifdef 与 #if 最经典的区别考点。',
    },
    {
      id: 'chapter-12-q4',
      type: 'multiple',
      question: '下列关于条件编译与宏的说法，正确的有哪些？',
      options: ['#if 根据后面表达式是否为 0 决定是否编译该段代码', '#ifdef 只判断宏是否已被定义，不关心宏的值', '#ifndef 与 #define、#endif 配合可以实现头文件的防重复包含', '宏定义在程序运行期间仍然有效，可以在运行时用 #undef 撤销'],
      answer: [0, 1, 2],
      explanation: 'A 正确：#if 的表达式为 0（假）时，其后的代码直到 #else/#endif 都不会被编译；B 正确：#ifdef 宏名 只判断"是否定义过"，值为 0 也算已定义；C 正确：#ifndef 守卫是头文件防重复包含的标准写法；D 错误——预处理发生在编译之前，宏只存在于编译期，运行期根本没有宏，#undef 也只能写在源码中作为预处理指令，不可能"在运行时撤销"。',
    },
    {
      id: 'chapter-12-q5',
      type: 'fill',
      question: '头文件防重复包含（include guard）需要三条预处理指令配合。请按顺序写出这三条指令，用逗号分隔（如 #ifndef X, #define X, #endif）：',
      accept: ['#ifndef, #define, #endif', '#ifndef , #define , #endif', '#ifndef #define #endif', '#ifndef 宏名, #define 宏名, #endif', '#ifndef HEADER_H, #define HEADER_H, #endif', '#ifndef _H, #define _H, #endif'],
      explanation: '经典写法是：第一行 #ifndef 唯一宏名（判断该宏是否未定义），第二行 #define 唯一宏名（定义它），头文件内容写在中间，最后一行 #endif 结束。第一次包含头文件时宏未定义，内容被正常插入并定义宏；第二次再包含时 #ifndef 为假，整个文件内容被跳过，从而避免重复声明和重复定义。',
    },
    {
      id: 'chapter-12-q6',
      type: 'choice',
      question: '下列哪一个是"指向接收两个 int、返回 int 的函数"的函数指针声明？',
      options: ['int *fp(int, int);', 'int (*fp)(int, int);', 'int (fp*)(int, int);', '(*fp)(int, int) int;'],
      answer: 1,
      explanation: '函数指针的声明语法是"返回类型 (*指针名)(参数列表)"，因此 int (*fp)(int, int); 正确。A 中星号与函数名直接结合，声明的是"返回 int* 的普通函数"，不是函数指针；C 的 (fp*) 写法不符合语法；D 把返回类型放在最后，不是合法声明。为便于使用，可用 typedef int (*Cmp)(int, int); 给函数指针类型起别名。',
    },
    {
      id: 'chapter-12-q7',
      type: 'choice',
      question: '关于单链表节点的动态分配与释放，下列说法正确的是？',
      options: ['节点可以用普通局部变量创建，链表用完不需要 free', '释放链表时必须从尾节点开始，从头节点开始会出错', '释放某个节点前先保存它的 next 指针，再 free 它，避免访问已释放的内存', 'malloc 分配节点失败时返回 NULL，这种情况可以忽略不检查'],
      answer: 2,
      explanation: '链表节点必须在堆上用 malloc 动态分配，函数返回后栈上的局部变量会失效，因此不能把链表节点建立在局部变量上，且 malloc 分配的内存必须用 free 释放（A 错）；释放顺序本身没有"必须从尾部开始"的规定，从头到尾逐个 free 即可，关键是先保存 next 再 free 当前节点，防止释放后仍访问它形成悬垂指针（B 错、C 对）；malloc 失败返回 NULL，若不检查就解引用会造成空指针崩溃，必须检查（D 错）。',
    },
    {
      id: 'chapter-12-q8',
      type: 'fill',
      question: '使用可变参数时，va_start(ap, last) 初始化参数列表、va_arg(ap, 类型) 取出参数之后，必须调用哪个函数完成清理？（写出函数名，如 va_xxx(ap)）',
      accept: ['va_end(ap)', 'va_end', 'va_end (ap)', 'va_end(ap);'],
      explanation: '可变参数（variadic arguments）的使用必须遵守"va_start → va_arg（可多次）→ va_end"的顺序：va_end(ap) 负责清理参数列表，与 va_start 成对出现，缺失 va_end 属于未定义行为（undefined behavior）。ap 是 va_list 类型的变量。',
    },
  ],
};
