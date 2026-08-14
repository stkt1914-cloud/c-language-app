// 章节：动态内存管理
window.CHAPTERS = window.CHAPTERS || {};
window.CHAPTERS['chapter-10'] = {
  id: 'chapter-10',
  order: 10,
  icon: '📦',
  title: '动态内存管理',
  summary: '理解栈与堆的区别，掌握 malloc、calloc、realloc、free 的正确用法，学会避开内存泄漏与悬垂指针。',
  sections: [
    {
      type: 'text',
      html: '<h3>栈（stack）与堆（heap）</h3><p>C 程序运行时，内存主要分为两大区域：<b>栈（stack）</b>和<b>堆（heap）</b>。</p><p><b>栈</b>由编译器自动管理：局部变量、函数参数、返回地址都存在栈上。函数调用时压栈（push），返回时自动弹栈（pop），无需程序员操心。但栈的大小有限，递归过深或定义过大的局部数组会导致<b>栈溢出（stack overflow）</b>。</p><p><b>堆</b>是程序中另一大片内存区域，由程序员通过函数手动申请和释放。堆的特点是：大小灵活、生命周期可控——只要不释放，数据就一直存在，可以跨函数使用。缺点是必须自己管理，用不好就会出现各种内存错误。</p>',
    },
    {
      type: 'table',
      title: '栈与堆的对比',
      headers: ['对比项', '栈（stack）', '堆（heap）'],
      rows: [
        ['分配方式', '自动分配/释放（编译器管理）', '手动分配/释放（malloc / free）'],
        ['大小', '较小（默认约 1~8 MB），过大会栈溢出', '很大（可达数 GB），受物理内存限制'],
        ['速度', '极快（只需移动栈指针）', '较慢（需要查找合适的空闲块）'],
        ['生命周期', '随函数调用结束自动回收', '一直存在，直到程序员 free 或程序结束'],
        ['典型使用', '局部变量、函数参数', '大小未知、或需要跨函数使用的数据'],
      ],
    },
    {
      type: 'text',
      html: '<h3>动态内存分配函数总览</h3><p>C 语言用四个函数管理堆内存，它们的原型都声明在头文件 <code>stdlib.h</code> 中，使用时必须 <code>#include &lt;stdlib.h&gt;</code>：</p><p><b>malloc</b>：分配指定字节数的内存，<b>不初始化</b>，内容为随机值。<br><b>calloc</b>：按"个数 × 单个大小"分配内存，并把所有字节<b>初始化为 0</b>。<br><b>realloc</b>：调整<b>已有</b>内存块的大小，可能移动数据并返回新地址。<br><b>free</b>：释放 malloc/calloc/realloc 分配的内存，归还给系统。</p><p>牢记：<b>分配的内存用完必须 free</b>，并且只能释放"由这些函数分配"的指针，不能释放栈上变量的地址。</p>',
    },
    {
      type: 'code',
      title: 'malloc 与 free 的基本用法',
      code: `#include <stdio.h>
#include <stdlib.h>   // malloc / free 的声明所在

int main(void)
{
    int n = 5;

    // 分配 5 个 int 的空间（int 按 4 字节计，共 20 字节）
    int *arr = (int *)malloc(n * sizeof(int));

    // 重要：检查分配是否成功
    if (arr == NULL) {
        printf("内存分配失败！\\n");
        return 1;
    }

    // 像普通数组一样使用
    for (int i = 0; i < n; i++) {
        arr[i] = i * i;
        printf("%d ", arr[i]);
    }
    printf("\\n");

    free(arr);   // 用完后释放，归还给系统
    return 0;
}`,
      note: 'malloc 的参数是字节数，用 sizeof 计算大小最稳妥；它不初始化内存，里面是随机值，使用前应先赋值。C 语言中 (int *) 强制转换可以省略，写上更利于阅读（C++ 中必须写）。',
    },
    {
      type: 'code',
      title: 'calloc 与 realloc 的用法',
      code: `#include <stdio.h>
#include <stdlib.h>

int main(void)
{
    // calloc：分配 4 个 int，并把所有字节清零
    int *a = (int *)calloc(4, sizeof(int));
    if (a == NULL) return 1;
    for (int i = 0; i < 4; i++) {
        printf("%d ", a[i]);   // 全部是 0
    }
    printf("\\n");

    // realloc：把 a 指向的内存扩大到 8 个 int
    int *b = (int *)realloc(a, 8 * sizeof(int));
    if (b == NULL) {           // 扩大失败时 a 仍然有效
        free(a);               // 释放原来的内存
        return 1;
    }
    a = b;                     // 成功后才让 a 指向新地址

    b[4] = 99;                 // 新扩展的部分可正常使用
    printf("b[4] = %d\\n", b[4]);

    free(a);                   // 只需要释放一次
    return 0;
}`,
      note: 'realloc 可能把数据搬到新地址并返回新指针；失败时返回 NULL 且原指针仍然有效。因此不要写成 a = realloc(a, ...) 直接覆盖，否则失败时会丢失原指针造成泄漏。',
    },
    {
      type: 'text',
      html: '<h3>常见内存错误</h3><p>动态内存使用中，有四类经典错误需要特别警惕：</p><p><b>1. 内存泄漏（memory leak）：</b>分配了内存却忘记 free。程序长期运行时，堆内存只增不减，最终耗尽导致崩溃。<br><b>2. 悬垂指针（dangling pointer）：</b>free 之后指针仍指向那块已释放的内存，此时再解引用或写入属于未定义行为（undefined behavior），可能崩溃或产生莫名结果。<br><b>3. 重复 free：</b>对同一个指针连续调用两次 free，属于未定义行为，很可能直接崩溃。<br><b>4. 越界写：</b>访问超出分配范围的地址，如写入 arr[n]（分配的是 n 个元素），会破坏相邻的堆内存或堆管理信息。</p><p>这些错误往往不会立刻报错，而是埋下隐患，养成"分配检查、用完即释放、释放置空"的习惯可以大大减少问题。</p>',
    },
    {
      type: 'tip',
      kind: 'tip',
      html: '<p><b>free 之后的置空习惯：</b>执行 <code>free(p)</code> 后，指针 p 仍然保存着那块已释放内存的地址，此时 p 就变成了悬垂指针（dangling pointer），误用非常危险。养成习惯：<code>free(p); p = NULL;</code>。对 NULL 调用 free 是安全的（什么都不做），所以置空之后再重复 free 也不会崩溃，还能让程序在出错时更快暴露问题。</p>',
    },
    {
      type: 'code',
      title: '完整示例：分配、使用、释放、置空',
      code: `#include <stdio.h>
#include <stdlib.h>

// 在函数内分配，调用者负责释放（约定：谁分配谁释放）
int *make_array(int n)
{
    int *p = (int *)malloc(n * sizeof(int));
    if (p == NULL) {
        printf("分配失败\\n");
        return NULL;
    }
    for (int i = 0; i < n; i++) {
        p[i] = i + 1;
    }
    return p;
}

int main(void)
{
    int *arr = make_array(5);
    if (arr == NULL) return 1;   // 收到 NULL 就不要再使用

    for (int i = 0; i < 5; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");

    free(arr);    // 释放
    arr = NULL;   // 置空：避免悬垂指针，重复 free 也安全
    return 0;
}`,
      note: '"谁分配、谁释放"是常见的工程约定；若函数返回动态分配的内存，必须在文档中明确告诉调用者需要 free。',
    },
    {
      type: 'tip',
      kind: 'warn',
      html: '<p><b>警惕越界写（buffer overflow）：</b>malloc 了 n 个元素，就只能访问下标 <code>[0, n-1]</code>。写入 <code>arr[n]</code> 或更远的位置，会破坏相邻的堆内存，程序可能当场崩溃，也可能运行很久之后才出错，极难排查。<b>自查习惯：</b>每次写完 malloc 后先补上对应的 free，再填充中间代码；释放后立刻把指针置 NULL。</p>',
    },
    {
      type: 'list',
      ordered: false,
      items: [
        '栈由编译器自动管理，堆需要程序员用 malloc/free 手动管理。',
        '动态内存函数都声明在 <code>stdlib.h</code> 中。',
        'malloc 不初始化，calloc 分配并清零，realloc 调整大小，free 释放。',
        '每次分配后都要检查返回值是否为 NULL。',
        '忘记 free 造成内存泄漏；重复 free、free 后使用、越界写都是未定义行为。',
        '释放后把指针置 NULL，是避免悬垂指针的好习惯。',
      ],
    },
  ],
  exercises: [
    {
      id: 'chapter-10-q1',
      type: 'choice',
      question: 'malloc、calloc、realloc、free 这些动态内存管理函数的声明位于哪个头文件？',
      options: ['stdio.h', 'stdlib.h', 'string.h', 'math.h'],
      answer: 1,
      explanation: '动态内存管理函数的原型都声明在 stdlib.h 中，使用前必须 #include <stdlib.h>。stdio.h 是输入输出函数（如 printf、scanf）；string.h 是字符串函数（如 strcpy、strlen）；math.h 是数学函数（如 sqrt），它们都不包含动态内存函数。',
    },
    {
      id: 'chapter-10-q2',
      type: 'choice',
      question: '需要分配一块内存，并要求所有字节初始化为 0，应使用哪个函数？',
      options: ['malloc', 'calloc', 'realloc', 'free'],
      answer: 1,
      explanation: 'calloc(count, size) 会分配 count * size 字节，并把所有字节初始化为 0，最适合需要清零的场景。malloc 只分配不初始化，内存中是随机值；realloc 用于调整已有内存块的大小；free 用于释放内存，三者都不具备"分配并清零"的功能。',
    },
    {
      id: 'chapter-10-q3',
      type: 'choice',
      question: '要调整一块已经分配的内存的大小，应使用哪个函数？',
      options: ['malloc', 'calloc', 'realloc', 'free'],
      answer: 2,
      explanation: 'realloc(ptr, new_size) 专门用于调整已分配内存块的大小，它可能把数据搬到新地址并返回新指针。malloc 和 calloc 是首次分配内存；free 是释放内存，都不具备调整大小的功能。',
    },
    {
      id: 'chapter-10-q4',
      type: 'code',
      question: '分析下面代码，它存在什么问题？',
      code: `void func(void)
{
    int *p = (int *)malloc(100 * sizeof(int));
    if (p == NULL) return;
    p[0] = 42;
    printf("%d", p[0]);
    // 没有调用 free(p)
}`,
      options: ['编译错误', '内存泄漏', '悬垂指针', '越界写'],
      answer: 1,
      explanation: '函数结束时 p 是局部变量，指针本身会被销毁，但它指向的堆内存从未被释放，程序再也无法访问到这块内存，这就是内存泄漏（memory leak），多次调用 func 会不断消耗堆内存。代码语法正确、p[0] 下标合法，不会编译错误；悬垂指针是"free 之后继续使用"；越界写是"访问超出分配范围"。',
    },
    {
      id: 'chapter-10-q5',
      type: 'code',
      question: '下面代码的行为是？',
      code: `int *p = (int *)malloc(sizeof(int));
*p = 10;
free(p);
printf("%d", *p);`,
      options: ['输出 10', '输出 0', '未定义行为（悬垂指针）', '编译错误'],
      answer: 2,
      explanation: 'free(p) 之后 p 成为悬垂指针（dangling pointer），指向已被系统回收的内存。此时解引用 *p 属于未定义行为（undefined behavior）：可能仍输出 10，可能输出垃圾值，也可能程序崩溃，结果不可依赖。选项 A、B 都把未定义行为当成了确定结果；代码本身能通过编译，D 错误。',
    },
    {
      id: 'chapter-10-q6',
      type: 'multiple',
      question: '下面哪些属于动态内存使用的常见错误？',
      options: ['忘记 free，造成内存泄漏', 'free 后继续使用该指针（悬垂指针）', '对同一指针连续调用两次 free', '写入超过分配范围的位置（越界写）'],
      answer: [0, 1, 2, 3],
      explanation: '四项都属于动态内存管理的典型错误：忘记 free 会造成内存泄漏，长期运行内存耗尽；free 后继续使用是悬垂指针，属于未定义行为；重复 free 同样是未定义行为，可能崩溃；越界写会破坏相邻的堆内存或堆管理信息，产生隐蔽 bug。正确做法是：分配后检查 NULL、用完即 free、free 后置 NULL。',
    },
    {
      id: 'chapter-10-q7',
      type: 'choice',
      question: '当堆空间不足、分配失败时，malloc 会返回什么？',
      options: ['0', 'NULL', '-1', '程序直接崩溃'],
      answer: 1,
      explanation: '当堆空间不足时，malloc/calloc/realloc 会返回 NULL 表示分配失败，所以使用前应检查返回值是否为 NULL。0 与 -1 是迷惑项，分配失败不会返回这些值；分配失败也不会让程序直接崩溃，而是由程序员决定如何处理（如提示错误并退出）。',
    },
    {
      id: 'chapter-10-q8',
      type: 'fill',
      question: '释放动态分配的内存应调用哪个函数？（写出函数名）',
      accept: ['free'],
      explanation: '释放动态分配的内存使用 free 函数，原型为 void free(void *ptr)，与 malloc/calloc/realloc 一样声明在 stdlib.h 中。释放后建议把指针置为 NULL，避免形成悬垂指针。',
    },
  ],
};
