// 章节：指针（Pointer）
window.CHAPTERS = window.CHAPTERS || {};
window.CHAPTERS['chapter-08'] = {
  id: 'chapter-08',
  order: 8,
  icon: '🎯',
  title: '指针',
  summary: '理解内存地址与指针的概念，学会用指针操作数组、字符串与函数，掌握 const 指针、多级指针与函数指针。',
  sections: [
    {
      type: 'text',
      html: "<h3>内存地址与指针的概念</h3><p>程序运行时，每个变量都存放在<b>内存（memory）</b>里。可以把内存想象成一排排编号的储物柜：每个柜子（字节）都有唯一的编号，这个编号就是它的<b>内存地址（address）</b>。一个 <code>int</code> 变量通常占 4 个字节，它占据一片连续的内存，其首字节的地址就是它的\"门牌号\"。</p><p><b>指针（pointer）</b>就是用来存放地址的变量。有了地址，程序就能找到并操作那块内存。与地址相关的两个运算符是本章的灵魂：</p><ul><li><code>&</code>（取地址运算符，address-of）：<code>&a</code> 得到变量 a 的内存地址。</li><li><code>*</code>（解引用运算符，dereference）：<code>*p</code> 表示\"p 中保存的地址所指向的那个变量\"，即顺着指针找到目标。</li></ul><p>直观记忆：<code>&</code> 是\"问它住在哪\"，<code>*</code> 是\"按地址找过去\"。二者互为逆运算：<code>*&a</code> 就是 a，<code>&*p</code> 就是 p 中保存的地址。</p>",
    },
    {
      type: 'code',
      title: '用 & 取地址、用 * 解引用',
      code: `#include <stdio.h>

int main(void)
{
    int a = 100;
    int *p = &a;              // p 中保存变量 a 的地址

    printf("a 的值：%d\\n", a);
    printf("a 的地址：%p\\n", (void *)&a);
    printf("p 中保存的地址：%p\\n", (void *)p);
    printf("解引用 *p 的值：%d\\n", *p);

    return 0;
}`,
      note: '%p 用于打印地址；(void *) 是打印地址的标准写法。*p 与 a 指向同一块内存，所以 *p 输出 100。',
    },
    {
      type: 'text',
      html: "<h3>指针的声明与初始化</h3><p>声明指针时，在类型后面加一个 <code>*</code>：<code>int *p;</code> 表示\"p 是指向 int 类型数据的指针\"（pointer to int）。同理，<code>double *q;</code> 指向 double，<code>char *s;</code> 指向 char。<b>指针的类型必须与目标变量匹配</b>：<code>int *p = &a;</code> 中的 a 必须是 int，不能把 double 变量的地址赋给 int 指针。</p><p>推荐在声明时立即初始化，避免产生野指针：</p><p><code>int a = 10;</code><br><code>int *p = &a;    // p 保存 a 的地址</code></p><p>初始化后，<code>*p</code> 与 <code>a</code> 是<b>同一块内存</b>：修改 <code>*p</code> 就是修改 a，反之亦然。指针可以\"改指向\"：执行 <code>p = &b;</code> 之后 p 就指向 b 了。如果暂时没有目标，先赋值为 <code>NULL</code>。</p>",
    },
    {
      type: 'code',
      title: '声明并初始化不同类型的指针',
      code: `#include <stdio.h>

int main(void)
{
    int a = 10;
    double b = 3.14;
    int c = 20;

    int *p = &a;      // p 指向 int 变量 a
    double *q = &b;   // q 指向 double 变量 b

    printf("*p = %d\\n", *p);
    printf("*q = %.2f\\n", *q);

    p = &c;           // 指针可以重新指向别的变量
    printf("现在 *p = %d\\n", *p);

    return 0;
}`,
      note: '指针的类型决定了"读多大、怎么读"：*p 按 int 读取 4 字节，*q 按 double 读取 8 字节。',
    },
    {
      type: 'tip',
      kind: 'warn',
      html: "<p><b>空指针与野指针（易错点）：</b><code>NULL</code> 是空指针常量（值为 0），表示\"不指向任何有效内存\"，使用前应检查：<code>if (p != NULL)</code>。<b>野指针（wild pointer）</b>指指向\"未知地址\"的指针，常见来源：①声明后未初始化；②所指向的变量已超出作用域或内存已释放（此时也叫悬空指针，dangling pointer）；③对已释放的内存继续使用。解引用野指针是<b>未定义行为（undefined behavior）</b>，可能得到随机值、破坏其他数据，甚至让程序崩溃。规则：声明即初始化，没有目标就赋 NULL；用之前先判空。</p>",
    },
    {
      type: 'text',
      html: "<h3>指针与数组：数组名即首地址</h3><p>C 语言中，<b>数组名就是数组首元素的地址</b>：<code>a</code> 与 <code>&a[0]</code> 的值相同。因此可以直接把数组名赋给指针：</p><p><code>int a[5];</code><br><code>int *p = a;      // 等价于 int *p = &a[0];</code></p><p>指针支持<b>指针算术（pointer arithmetic）</b>：</p><ul><li><code>p + i</code> 指向数组中下标为 i 的元素。偏移量是 <code>i * sizeof(int)</code> 个字节，<b>不是</b> i 个字节。</li><li><code>*(p + i)</code> 得到第 i 个元素的值。</li><li>下标本质就是地址运算：<b><code>a[i]</code> 与 <code>*(a + i)</code> 完全等价</b>，所以 <code>p[i]</code> 的写法也合法。</li><li>指针可以自增自减（<code>p++</code>）在数组内移动；但<b>数组名 a 是常量地址</b>，不能写 <code>a++</code>。</li></ul>",
    },
    {
      type: 'code',
      title: '三种方式遍历数组：下标、指针算术、指针自增',
      code: `#include <stdio.h>

int main(void)
{
    int a[5] = {10, 20, 30, 40, 50};
    int *p = a;               // 数组名即首元素地址
    int i;

    // 方式一：下标访问
    for (i = 0; i < 5; i++) {
        printf("a[%d] = %d\\n", i, a[i]);
    }

    // 方式二：指针算术
    for (i = 0; i < 5; i++) {
        printf("*(p + %d) = %d\\n", i, *(p + i));
    }

    // 方式三：让指针自己移动
    for (p = a; p < a + 5; p++) {
        printf("%d ", *p);
    }
    printf("\\n");

    return 0;
}`,
      note: '三种方式输出完全相同。方式三中 p 从 a 走到 a+4，循环条件 p < a + 5 保证不会越界。',
    },
    {
      type: 'text',
      html: "<h3>指针与字符串</h3><p>字符串本质是 <code>char</code> 数组，以空字符 <code>'\\0'</code> 结尾。字符串字面量 <code>\"hello\"</code> 被编译器存放在内存中，可以用字符指针直接指向它，然后逐个访问字符，直到遇到 <code>'\\0'</code>。</p><p>注意 <code>char s[]</code> 与 <code>char *s</code> 的区别：</p><ul><li><code>char s[] = \"hello\";</code>：s 是数组，字符存在<b>可修改</b>的内存中，可以修改 <code>s[0]</code>。</li><li><code>char *s = \"hello\";</code>：s 是指针，指向字符串<b>字面量</b>（很多平台存放在只读区），修改 <code>s[0]</code> 是未定义行为，可能崩溃。</li></ul><p>用指针遍历字符串的经典写法：<code>while (*s != '\\0') { putchar(*s); s++; }</code>，这正是 <code>strlen</code>、<code>strcpy</code> 等库函数的内部实现思路。</p>",
    },
    {
      type: 'code',
      title: '指针作为函数参数：实现交换两个数',
      code: `#include <stdio.h>

// 形参用指针，才能修改调用者的变量
void swap(int *x, int *y)
{
    int temp = *x;   // 取出 x 指向的值
    *x = *y;         // 把 y 指向的值写入 x 指向的内存
    *y = temp;
}

int main(void)
{
    int a = 5, b = 9;

    printf("交换前：a = %d, b = %d\\n", a, b);

    swap(&a, &b);    // 传地址，而不是传值

    printf("交换后：a = %d, b = %d\\n", a, b);
    return 0;
}`,
      note: '函数形参 int *x 接收 &a，函数内的 *x 就是 main 中的 a。若形参写成 int x，函数只能交换副本，main 中的 a、b 不会变——这是初学者最经典的错误。',
    },
    {
      type: 'table',
      title: 'const 与指针的三种写法',
      headers: ['写法', '名称与含义', '能否改指向', '能否改指向的值'],
      rows: [
        ['const int *p;', '指向常量的指针（pointer to const）：所指对象不能通过 p 修改', '可以', '不可以'],
        ['int *const p;', '常量指针（const pointer）：p 本身不能改', '不可以', '可以'],
        ['const int *const p;', '指向常量的常量指针：p 本身与所指对象都不能改', '不可以', '不可以'],
      ],
    },
    {
      type: 'text',
      html: "<h3>进阶一：指针数组与数组指针</h3><p>两者极易混淆，区别只在括号，因为 <code>[]</code> 的优先级高于 <code>*</code>：</p><ul><li><code>int *p[3];</code> 先结合 <code>[3]</code>，所以 p 是<b>含 3 个 int 指针的数组</b>，称<b>指针数组（array of pointers）</b>，常用于存放多个字符串，如 <code>char *names[3];</code>。</li><li><code>int (*p)[3];</code> 加括号后先结合 <code>*</code>，所以 p 是<b>指向\"含 3 个 int 的数组\"的指针</b>，称<b>数组指针（pointer to array）</b>，常用于二维数组传参。</li></ul><p>记忆口诀：<b>先看括号，括号里是 <code>*</code> 就是指针。</b></p><h3>进阶二：多级指针</h3><p>指针也是变量，也有地址。<code>int **pp;</code> 是<b>指向指针的指针（pointer to pointer）</b>：<code>pp</code> 保存 p 的地址，<code>*pp</code> 得到 p 里保存的地址，<code>**pp</code> 才是最终的 int 值。写成 <code>int **pp = &p;</code> 后，有 <code>**pp == *p == a</code>。多级指针常用于\"需要修改指针本身\"的函数，例如动态链表中修改头节点。</p>",
    },
    {
      type: 'code',
      title: '函数指针入门',
      code: `#include <stdio.h>

int add(int x, int y) { return x + y; }
int mul(int x, int y) { return x * y; }

int main(void)
{
    // 声明函数指针：指向"返回 int、接收两个 int 参数"的函数
    int (*fp)(int, int);

    fp = add;        // 函数名就是函数的地址
    printf("add(3, 4) = %d\\n", fp(3, 4));

    fp = mul;        // 换一个函数
    printf("mul(3, 4) = %d\\n", fp(3, 4));

    return 0;
}`,
      note: '函数指针的声明语法为"返回值类型 (*名字)(参数列表)"。函数指针可以作为参数传给另一个函数（回调），是 C 语言实现"行为复用"的重要手段。',
    },
    {
      type: 'tip',
      kind: 'info',
      html: "<p><b>本章心法：</b>指针只有两件事——<code>&</code> 取地址、<code>*</code> 解引用。学习时多画\"箭头图\"：指针变量是一个小框，里面存着箭头（地址），<code>*p</code> 就是沿箭头找到的目标。背熟四个易错点：①指针必须先初始化再使用；②数组名是常量地址，不能自增；③<code>[]</code> 优先级高于 <code>*</code>，注意区分 <code>int *p[3]</code> 与 <code>int (*p)[3]</code>；④const 修饰谁，谁就不能变。把这一章练透，后续的链表、动态内存、文件操作都会水到渠成。</p>",
    },
  ],
  exercises: [
    {
      id: 'chapter-08-q1',
      type: 'fill',
      question: '已知 int a = 10;，请写出一条完整的语句：声明一个指针变量 p，并让它指向变量 a（注意语句末尾的分号）。',
      accept: ['int *p = &a;', 'int*p = &a;', 'int *p=&a;', 'int*p=&a;', 'int* p = &a;', 'int* p=&a;'],
      explanation: '声明指向 int 的指针写作 int *p;，再用取地址运算符 & 取 a 的地址完成初始化：int *p = &a;。星号 * 的位置（紧贴类型或紧贴变量名）不影响含义。常见的错误：漏写分号、漏写 *、或把初始化写成 *p = &a（那是给 p 指向的变量赋值，而它还没有指向任何地方）。声明之后，*p 与 a 指向同一块内存。',
    },
    {
      id: 'chapter-08-q2',
      type: 'choice',
      question: 'int a[5] = {10, 20, 30, 40, 50}; int *p = a;，则表达式 *(p + 2) 的值是？',
      options: ['10', '20', '30', '40'],
      answer: 2,
      explanation: 'p 指向 a[0]（值为 10）。p + 2 表示向后移动 2 个元素（不是 2 个字节），因此指向 a[2]，*(p + 2) 的值是 30。选 10 是把它当成了 *p；选 20 是只移动了 1 个元素；选 40 是移动了 3 个元素。指针算术按元素大小（sizeof(int)）缩放步长，这是它与普通整数加法的本质区别。',
    },
    {
      id: 'chapter-08-q3',
      type: 'code',
      question: '下面代码的输出是什么？',
      code: `#include <stdio.h>
int main(void)
{
    int a = 10, b = 20;
    int *p = &a;
    *p = 30;        // 通过指针把 a 改成 30
    p = &b;         // p 改指向 b
    *p = 40;        // 通过指针把 b 改成 40
    printf("%d %d\\n", a, b);
    return 0;
}`,
      options: ['10 20', '30 20', '30 40', '40 30'],
      answer: 2,
      explanation: '第一个 *p = 30 作用于 p 当时的指向（a），a 变为 30；随后 p = &b 改变 p 的指向；第二个 *p = 40 作用于 b，b 变为 40。最终输出 "30 40"。选 "10 20" 忽略了两次解引用赋值；选 "30 20" 忽略了 p 改指向后的赋值；选 "40 30" 把 a 与 b 的新值弄反了。关键点：*p 总是指向 p 当前所指的变量，解引用赋值会永久改变目标变量。',
    },
    {
      id: 'chapter-08-q4',
      type: 'choice',
      question: '已知 int a[5];，&a[0] 的值为 0x1000，int 占 4 字节，则 &a[3] 的值是？',
      options: ['0x1003', '0x100C', '0x1030', '0x3000'],
      answer: 1,
      explanation: '&a[3] 等价于 a + 3，指针加 3 意味着偏移 3 个元素，即 3 × 4 = 12 字节 = 0xC，所以 0x1000 + 0xC = 0x100C。0x1003 是按"1 个元素占 1 字节"的错误算法；0x1030 把偏移算成了 0x30（48 字节，即 12 个元素）；0x3000 是凭空多加了 3 个元素。牢记：指针算术的步长是元素大小，不是 1 字节。',
    },
    {
      id: 'chapter-08-q5',
      type: 'choice',
      question: 'int a[5]; int *p = a;，下列哪个说法正确？',
      options: ['a[i] 与 *(a + i) 等价，但与 *(p + i) 不等价', 'a[i]、*(a + i)、p[i]、*(p + i) 全都等价', 'p[i] 是非法的，因为 p 不是数组', '*(a + i) 表示 a 向后移动 i 个字节后取内容'],
      answer: 1,
      explanation: '下标运算的本质是地址运算：a[i] 等价于 *(a + i)；p 与 a 指向同一地址，所以 p[i] 与 *(p + i) 同样等价，四个表达式完全等价，故选 B。A 的前半句对、后半句错；C 错——指针可以带下标使用，p[i] 就是 *(p + i)；D 错——偏移单位是元素大小（sizeof(int)），不是字节。',
    },
    {
      id: 'chapter-08-q6',
      type: 'multiple',
      question: '已知 int b = 5; const int *p = &b;，下列哪些说法正确？',
      options: ['通过 *p = 10; 可以修改 b 的值', 'p 可以重新指向其他变量，如 p = &c;', '用 printf("%d", *p) 读取 b 的值是合法的', 'p 本身是 const 的，不能自增 p++'],
      answer: [1, 2],
      explanation: 'const int *p 是"指向常量的指针"（pointer to const）：通过 p 不能修改所指对象，所以 *p = 10 非法（A 错）；但 p 本身不是常量，可以重新指向别的变量、可以 p++（B 对、D 错）；读取 *p 只是取值，合法（C 对）。判断口诀：const 在 * 左边，修饰的是"指向的值"；const 在 * 右边（int *const p），修饰的才是"指针本身"。',
    },
    {
      id: 'chapter-08-q7',
      type: 'choice',
      question: '关于 int *p[3]; 与 int (*p)[3];，下列说法正确的是？',
      options: ['两种写法含义完全相同，只是书写风格不同', 'int *p[3] 是"含 3 个 int 指针的数组"（指针数组）；int (*p)[3] 是"指向含 3 个 int 的数组的指针"（数组指针）', 'int *p[3] 中 p 是常量指针（int *const），不能改变', 'int (*p)[3] 中 p 是一个含 3 个 int 元素的数组'],
      answer: 1,
      explanation: '由于 [] 的优先级高于 *，int *p[3] 先结合 [3]，p 是含 3 个指针的数组（指针数组）；加括号后 int (*p)[3] 中 p 先与 * 结合，是指向"含 3 个 int 的数组"的指针（数组指针），二者含义完全不同，A 错。C 错：指针数组里的 p 是数组名（不能赋值），但"数组名不可赋值"与"常量指针 int *const p"是两回事。D 错：(*p)[3] 中 p 是指针，它所指的"含 3 个 int 的数组"才是数组。记忆：先看括号，括号里有 * 就是指针。',
    },
    {
      id: 'chapter-08-q8',
      type: 'choice',
      question: '若要在 swap 函数中真正交换 main 函数里 a 和 b 的值，正确的函数声明与调用方式是？',
      options: ['void swap(int x, int y); 调用 swap(a, b);', 'void swap(int *x, int *y); 调用 swap(&a, &b);', 'void swap(int *x, int *y); 调用 swap(a, b);', 'void swap(int x, int y); 调用 swap(&a, &b);'],
      answer: 1,
      explanation: 'C 的参数传递是值传递：形参 int x 只是 a 的副本，函数内交换副本不会影响 main 中的 a、b（A 错）。想修改调用者的变量，必须传地址 &a、&b，并用指针形参 int *x 接收（B 对）。C 错在把 int 变量 a 当作指针传入，类型不匹配；D 错在形参是 int 却收到了地址。函数内通过 *x、*y 读写的就是 main 中的 a、b，交换才会真正生效。',
    },
  ],
};
