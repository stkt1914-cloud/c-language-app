// 章节：数组与字符串 — 作者：教材编写组
window.CHAPTERS = window.CHAPTERS || {};
window.CHAPTERS['chapter-06'] = {
  id: 'chapter-06',
  order: 6,
  icon: '🧮',
  title: '数组与字符串',
  summary: '认识数组（array）与字符串（string）：一维、二维数组的定义与初始化，越界风险，字符串函数，以及数组作函数参数时的退化规则。',
  sections: [
    {
      type: 'text',
      html: '<h3>一维数组的定义与初始化</h3><p>数组（array）是<b>同类型元素</b>的集合，这些元素在内存中<b>连续存放</b>，通过<b>下标（index）</b>访问。定义一维数组（one-dimensional array）的语法是 <code>类型 数组名[长度];</code>，例如 <code>int scores[5];</code> 表示定义 5 个 <code>int</code> 变量，下标从 <code>0</code> 到 <code>4</code>。</p><p>常见的初始化（initialization）方式：</p><ul><li>完全初始化：<code>int a[5] = {1, 2, 3, 4, 5};</code></li><li>部分初始化：<code>int b[5] = {1, 2};</code>，未列出的元素自动补 <code>0</code></li><li>省略长度：<code>int c[] = {1, 2, 3};</code>，由初始化列表推出长度为 3</li><li>不初始化：<code>int d[5];</code>，局部数组的元素值是随机的，使用前必须先赋值</li></ul><p>访问元素写作 <code>数组名[下标]</code>，例如 <code>scores[0]</code> 取第一个元素；遍历数组通常配合 <code>for</code> 循环。</p>',
    },
    {
      type: 'code',
      title: '一维数组：定义、初始化与遍历',
      code: `#include <stdio.h>

int main(void)
{
    // 定义长度为 5 的整型数组并初始化
    int scores[5] = {88, 92, 76, 85, 90};

    // 用 for 循环逐个输出数组元素
    for (int i = 0; i < 5; i++)
    {
        printf("scores[%d] = %d\\n", i, scores[i]);
    }
    return 0;
}`,
      note: '数组下标从 0 开始，长度为 5 的数组最后一个合法下标是 4；循环条件 i < 5 保证不会越界。',
    },
    {
      type: 'tip',
      kind: 'warn',
      html: '<p><b>越界风险：</b>C 语言<b>不会检查数组下标是否越界</b>（out-of-bounds）。访问长度为 5 的 <code>int a[5]</code> 中的 <code>a[5]</code> 甚至 <code>a[100]</code>，程序不会报错，而是直接读写数组之外的内存——这属于<b>未定义行为（undefined behavior）</b>，可能得到垃圾数据、悄悄破坏相邻变量，甚至导致程序崩溃或安全漏洞。请始终保证下标在 <code>0 ~ 长度-1</code> 之间。</p>',
    },
    {
      type: 'text',
      html: '<h3>二维数组：行主序与初始化方式</h3><p>二维数组（two-dimensional array）可以理解为"数组的数组"：<code>int matrix[2][3];</code> 表示 2 行 3 列、共 6 个元素。C 语言按<b>行主序（row-major order）</b>存储：先把第一行的 3 个元素连续排完，再排第二行，因此 <code>matrix[i][j]</code> 在内存中是第 <code>i * 3 + j</code> 个元素。</p><p>初始化方式：</p><ul><li>按行初始化：<code>int m[2][3] = {{1, 2, 3}, {4, 5, 6}};</code></li><li>连续初始化：<code>int m[2][3] = {1, 2, 3, 4, 5, 6};</code>，编译器按行依次填充</li><li>省略第一维：<code>int m[][3] = {1, 2, 3, 4, 5, 6};</code>，编译器推算出有 2 行；<b>只能省略第一维</b>，列数必须给出</li></ul><p>遍历二维数组通常用嵌套循环：外层循环管行，内层循环管列。</p>',
    },
    {
      type: 'code',
      title: '二维数组：初始化与双重循环输出',
      code: `#include <stdio.h>

int main(void)
{
    // 2 行 3 列，按行主序连续存放
    int matrix[2][3] = {
        {1, 2, 3},
        {4, 5, 6}
    };

    for (int i = 0; i < 2; i++)       // 外层：行
    {
        for (int j = 0; j < 3; j++)   // 内层：列
        {
            printf("%d ", matrix[i][j]);
        }
        printf("\\n");                // 每行结束换行
    }
    return 0;
}`,
      note: '外层循环 i 控制行、内层循环 j 控制列；输出完一行后打印换行，形成 2 行 3 列的矩阵形状。',
    },
    {
      type: 'text',
      html: '<h3>字符数组与字符串</h3><p>在 C 语言中，<b>字符串（string）是以空字符（null character）<code>\'\\0\'</code> 结尾的字符数组</b>。空字符的值是 0，写成转义序列 <code>\'\\0\'</code>，它是字符串结束的标志：<code>printf</code>、<code>strlen</code> 等函数都靠它确定字符串在哪里结束。</p><p>字符数组的两种初始化方式：</p><ul><li>逐个字符初始化：<code>char s1[6] = {\'h\', \'e\', \'l\', \'l\', \'o\', \'\\0\'};</code>，必须手动留出 <code>\'\\0\'</code> 的位置</li><li>用字符串字面量（string literal）初始化：<code>char s2[] = "hello";</code>，编译器自动在末尾补 <code>\'\\0\'</code>，因此 s2 实际占 6 个字节</li></ul><p><code>sizeof(s2)</code> 得到整个数组的字节数（含 <code>\'\\0\'</code>），而 <code>strlen(s2)</code> 只统计到 <code>\'\\0\'</code> 之前的字符个数。</p>',
    },
    {
      type: 'table',
      title: '常用字符串处理函数（需包含 string.h 头文件）',
      headers: ['函数', '作用', '示例', '安全注意'],
      rows: [
        ['strlen(s)', '求字符串长度（不含结尾的 \\0）', 'strlen("hello") 得到 5', '返回 size_t 类型，建议用 %zu 输出'],
        ['strcpy(dest, src)', '把 src（含 \\0）整体拷贝到 dest', 'strcpy(name, "Tom")', '不检查 dest 空间是否足够，目标太小会缓冲区溢出（buffer overflow）'],
        ['strncpy(dest, src, n)', '最多拷贝 n 个字符', 'strncpy(buf, s, 7)', '若前 n 个字符中没有 \\0，不会自动补 \\0，需手动处理'],
        ['strcat(dest, src)', '把 src 追加到 dest 末尾', 'strcat(msg, "!")', '不检查 dest 剩余空间，极易溢出，慎用'],
        ['strncat(dest, src, n)', '最多追加 n 个字符并补 \\0', 'strncat(msg, s, 3)', '较安全，但仍需保证 dest 有足够剩余空间'],
        ['strcmp(s1, s2)', '按字典序比较，返回负 / 0 / 正', 'strcmp("abc", "abd") 为负数', '逐字符比较 ASCII 码，两串完全相等才返回 0'],
        ['strncmp(s1, s2, n)', '只比较前 n 个字符', 'strncmp(s1, s2, 3)', '适合比较定长内容或字符串前缀'],
      ],
    },
    {
      type: 'code',
      title: '字符串函数综合示例',
      code: `#include <stdio.h>
#include <string.h>

int main(void)
{
    char msg[64] = "Hello";

    // strlen：求长度，不含结尾的 '\\0'
    printf("strlen(msg) = %zu\\n", strlen(msg));      // 5

    // strcpy：整体拷贝（目标数组必须足够大）
    char name[32];
    strcpy(name, "World");
    printf("name = %s\\n", name);

    // strcat：追加到末尾（目标必须有剩余空间）
    strcat(msg, ", World");
    printf("msg = %s\\n", msg);                       // Hello, World

    // strcmp：按 ASCII 逐字符比较，返回负 / 0 / 正
    int r = strcmp("abc", "abd");
    printf("strcmp(abc, abd) = %d\\n", r);            // 负数

    // strncpy：最多拷贝 sizeof(buf)-1 个字符
    char buf[8];
    strncpy(buf, "Hello", sizeof(buf) - 1);
    buf[sizeof(buf) - 1] = '\\0';   // 手动保证字符串以 '\\0' 结尾
    printf("buf = %s\\n", buf);

    return 0;
}`,
      note: '安全提醒：strcpy / strcat 不检查目标空间，很容易造成缓冲区溢出；工程中优先使用 strncpy / strncat / strncmp，并手动保证字符串以 \'\\0\' 结尾。',
    },
    {
      type: 'text',
      html: '<h3>数组作为函数参数：退化为指针</h3><p>把数组传给函数时，传递的是<b>数组名</b>，也就是<b>首元素的地址</b>。函数形参中写的 <code>int arr[]</code> 会<b>退化为指针（decay to pointer）</b>，等价于 <code>int *arr</code>。由此引出三个重要结论：</p><ul><li>在函数内部用 <code>sizeof(arr)</code> 得到的是<b>指针的大小</b>（如 8 字节），而不是数组的长度；</li><li>函数内修改 <code>arr[i]</code> 会<b>直接作用到调用方的数组</b>（传的是地址，不会拷贝整个数组）；</li><li>所以必须把<b>数组长度作为另一个参数</b>传入，函数才能安全地遍历。</li></ul>',
    },
    {
      type: 'code',
      title: '数组作函数参数：必须同时传长度',
      code: `#include <stdio.h>

// 形参 int arr[] 等价于 int *arr，是首元素地址
double average(int arr[], int n)
{
    int sum = 0;
    for (int i = 0; i < n; i++)
    {
        sum += arr[i];
    }
    return (double)sum / n;
}

int main(void)
{
    int scores[5] = {88, 92, 76, 85, 90};

    // 传入数组名与长度，函数内可安全遍历
    double avg = average(scores, 5);
    printf("平均分 = %.1f\\n", avg);   // 平均分 = 86.2
    return 0;
}`,
      note: 'main 中 sizeof(scores) 是整个数组的大小，而函数内 sizeof(arr) 只是指针大小，二者不同，因此长度 n 必须显式传入。',
    },
  ],
  exercises: [
    {
      id: 'chapter-06-q1',
      type: 'choice',
      question: '定义 int scores[5]; 之后，合法的下标范围是？',
      options: ['0 ~ 4', '1 ~ 5', '0 ~ 5', '1 ~ 4'],
      answer: 0,
      explanation: '数组长度为 5 时，下标从 0 到 4，共 5 个元素，这是数组下标从 0 开始的基本规则。选项 B 起点错误（下标不是从 1 开始）；选项 C 有 6 个下标，访问 scores[5] 已经越界；选项 D 只有 4 个下标，漏掉了 scores[0]。',
    },
    {
      id: 'chapter-06-q2',
      type: 'choice',
      question: '下面哪个数组定义是正确的？',
      options: ['int a[5] = {1, 2, 3, 4, 5};', 'int a[];', 'int a[3] = {1, 2, 3, 4};', 'int 5a[5];'],
      answer: 0,
      explanation: 'A 定义长度 5 并用 5 个初值初始化，完全正确。B 既没有给出长度，也没有初始化列表，编译器无法确定数组大小，编译错误。C 初始化列表有 4 个值但数组只有 3 个元素，初始化项过多，同样编译错误。D 的标识符 5a 以数字开头，不是合法的变量名。',
    },
    {
      id: 'chapter-06-q3',
      type: 'code',
      question: '下面程序的输出是什么？',
      code: `#include <stdio.h>

int main(void)
{
    int a[5] = {10, 20, 30, 40, 50};
    printf("%d\\n", a[1] + a[3]);
    return 0;
}`,
      options: ['30', '50', '60', '70'],
      answer: 2,
      explanation: '下标从 0 开始：a[0]=10、a[1]=20、a[2]=30、a[3]=40、a[4]=50。a[1] + a[3] = 20 + 40 = 60。选项 A 的 30 是把 a[1] 误当成 10（a[0]）再加 20；选项 B 的 50 是 a[4] 的值；选项 D 的 70 是把 20 与 50 相加（a[1] + a[4]），下标算错了。',
    },
    {
      id: 'chapter-06-q4',
      type: 'choice',
      question: '执行 int b[4] = {1, 2}; 之后，b[2] 和 b[3] 的值分别是？',
      options: ['都是 0', '都是不确定的随机值', 'b[2] = 0，b[3] = 1', '无法确定，属于未定义行为'],
      answer: 0,
      explanation: 'C 标准规定：部分初始化时，初始化列表中未显式列出的元素自动初始化为 0，这是确定行为，因此 b[2] 和 b[3] 都是 0。选项 B、D 混淆了"完全不初始化"与"部分初始化"：完全没有初始化的局部数组元素才是随机值，部分初始化会补 0。选项 C 把 b[3] 当成 1，实际上只有 b[0]=1、b[1]=2。',
    },
    {
      id: 'chapter-06-q5',
      type: 'code',
      question: '执行下面程序后，输出是什么？（%zu 用于输出 size_t 类型）',
      code: `#include <stdio.h>
#include <string.h>

int main(void)
{
    char s[] = "hello";
    printf("%zu %zu\\n", sizeof(s), strlen(s));
    return 0;
}`,
      options: ['6 5', '5 6', '5 5', '6 6'],
      answer: 0,
      explanation: '字符串字面量 "hello" 有 5 个字符，编译器自动在末尾补一个 \'\\0\'，因此 s 的类型是 char[6]。sizeof 在编译期得到整个数组的字节数 6；strlen 在运行期数到第一个 \'\\0\' 为止，返回 5（不含 \'\\0\'）。选项 B 把两者弄反了；选项 C 忽略了结尾的 \'\\0\'；选项 D 误以为 strlen 也把 \'\\0\' 算进去。',
    },
    {
      id: 'chapter-06-q6',
      type: 'multiple',
      question: '关于 C 语言字符串，下列说法正确的有哪些？',
      options: ['字符串是以空字符 \\0 结尾的字符数组', '字符串字面量 "hi" 实际占用 3 个字节', 'strcpy 不会检查目标数组空间是否足够', 'strlen 返回的长度包含结尾的 \\0'],
      answer: [0, 1, 2],
      explanation: 'A 正确：C 字符串的结束标志就是空字符 \\0。B 正确：\'h\'、\'i\' 两个字符加上自动补的 \\0 共 3 字节。C 正确：strcpy 只负责拷贝，不检查目标空间，这正是缓冲区溢出风险的来源。D 错误：strlen 统计到第一个 \\0 为止，长度不包含 \\0。',
    },
    {
      id: 'chapter-06-q7',
      type: 'code',
      question: '下面程序的输出是？',
      code: `#include <stdio.h>
#include <string.h>

int main(void)
{
    printf("%d\\n", strcmp("abc", "abd"));
    return 0;
}`,
      options: ['大于 0', '等于 0', '小于 0', '无法确定'],
      answer: 2,
      explanation: 'strcmp 从第一个字符开始按 ASCII 码逐个比较："abc" 与 "abd" 前两个字符相同，第三个字符 \'c\'（ASCII 99）小于 \'d\'（ASCII 100），因此返回负数（具体数值由实现决定，符号确定）。选项 A 是把两个字符串反过来比较（"abd" 对 "abc"）才会出现的结果；选项 B 要求两个字符串完全相同；选项 D 错误，两个字符串不同时比较结果的符号是确定的。',
    },
    {
      id: 'chapter-06-q8',
      type: 'fill',
      question: '执行 int m[2][3]; 之后，m 中共有多少个元素？（填数字）',
      accept: ['6', '6个', '六个'],
      explanation: '二维数组的元素总数 = 行数 × 列数 = 2 × 3 = 6。C 中二维数组按行主序连续存放，这 6 个元素在内存上等价于一个长度为 6 的一维数组，只是逻辑上分成 2 行 3 列来理解。',
    },
  ],
};
