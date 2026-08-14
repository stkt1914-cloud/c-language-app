// 章节：输入与输出
window.CHAPTERS = window.CHAPTERS || {};
window.CHAPTERS['chapter-04'] = {
  id: 'chapter-04',
  order: 4,
  icon: '🖥️',
  title: '输入与输出',
  summary: '掌握 printf 的格式控制与 scanf 的输入陷阱，学会用 getchar、putchar、puts、fgets 等函数读写数据。',
  sections: [
    {
      type: 'text',
      html: '<h3>认识 printf 与格式说明符</h3><p><code>printf</code>（print formatted，格式化输出）是头文件 <code>stdio.h</code> 中最常用的输出函数，用于把数据打印到屏幕上。它的第一个参数是<b>格式字符串</b>（format string），其中以 <code>%</code> 开头的部分叫<b>格式说明符</b>（format specifier），告诉 printf 后面的参数按什么类型、什么形式输出。</p><p>调用形式为 <code>printf(格式字符串, 参数1, 参数2, ...)</code>。格式说明符与参数必须<b>一一对应</b>：说明符的数量、顺序、类型都不能错，否则输出结果混乱，甚至触发未定义行为（undefined behavior）。</p>',
    },
    {
      type: 'code',
      title: 'printf 基本用法',
      code: `#include <stdio.h>

int main(void)
{
    int age = 18;
    double score = 95.5;
    char grade = 'A';
    char name[] = "小明";

    printf("年龄：%d 岁\\n", age);
    printf("分数：%.1f 分\\n", score);
    printf("等级：%c\\n", grade);
    printf("姓名：%s\\n", name);

    return 0;
}`,
      note: '%d 对应整型（int）、%f 对应浮点型（double/float）、%c 对应单个字符（char）、%s 对应字符串（以 \\0 结尾的字符数组）。',
    },
    {
      type: 'table',
      title: '常用格式说明符对照表',
      headers: ['格式说明符', '参数类型', '作用', '示例'],
      rows: [
        ['%d', 'int', '有符号十进制整数', 'printf("%d", 42) 输出 42'],
        ['%f', 'float', '十进制浮点数，默认 6 位小数', 'printf("%f", 3.14) 输出 3.140000'],
        ['%lf', 'double', 'double 型浮点数', 'printf("%lf", 3.14)'],
        ['%c', 'char', '单个字符', 'printf("%c", 65) 输出 A'],
        ['%s', 'char 数组', '字符串，遇 \\0 结束', 'printf("%s", "hi") 输出 hi'],
        ['%x / %X', 'int', '十六进制（小写/大写）', 'printf("%x", 255) 输出 ff'],
        ['%o', 'int', '八进制', 'printf("%o", 8) 输出 10'],
        ['%p', '指针（pointer）', '以十六进制打印内存地址', 'printf("%p", &age)'],
      ],
    },
    {
      type: 'text',
      html: '<h3>宽度、精度与对齐</h3><p>在 <code>%</code> 和格式字符之间可以插入<b>宽度</b>（width）与<b>精度</b>（precision），精细控制输出的外观：</p><ul><li><code>%5d</code>：占 5 个字符宽度，<b>右对齐</b>（right-aligned），不足时左边补空格；超过宽度则照常输出、不会截断。</li><li><code>%-5d</code>：负号表示<b>左对齐</b>（left-aligned），不足时右边补空格。</li><li><code>%.2f</code>：浮点数保留 2 位小数（四舍五入）。</li><li><code>%8.3f</code>：总宽度 8 位、小数部分 3 位，组合使用。</li><li><code>%05d</code>：宽度不足时用数字 0 填充，常用于编号。</li></ul><p>注意：对齐与补位只影响显示效果，不会改变变量的真实值。</p>',
    },
    {
      type: 'code',
      title: '宽度、精度与对齐示例',
      code: `#include <stdio.h>

int main(void)
{
    int n = 42;
    double pi = 3.1415926;

    printf("[%5d]\\n", n);     // [   42] 右对齐，占 5 位
    printf("[%-5d]\\n", n);    // [42   ] 左对齐
    printf("[%05d]\\n", n);    // [00042] 用 0 填充
    printf("[%.2f]\\n", pi);   // [3.14] 保留两位小数
    printf("[%8.3f]\\n", pi);  // [   3.142] 总宽 8、小数 3 位
    return 0;
}`,
      note: '宽度是"最小宽度"：实际位数超过宽度时不会截断，会完整输出。',
    },
    {
      type: 'text',
      html: '<h3>转义字符</h3><p>以反斜杠 <code>\\</code> 开头的特殊字符序列称为<b>转义字符</b>（escape sequence），用来表示键盘上难以直接输入的字符，如换行、制表符、引号本身。</p><ul><li><code>\\n</code> 换行（newline），光标移到下一行行首</li><li><code>\\t</code> 水平制表符（tab），相当于按一次 Tab</li><li><code>\\"</code> 双引号</li><li><code>\\\\</code> 一个反斜杠</li><li><code>\\0</code> 空字符，字符串的结束标志</li><li><code>\\\'</code> 单引号</li></ul><p>注意：<code>\\n</code> 在字符串里是<b>一个</b>字符，而不是"反斜杠加 n"两个字符；编译器会把它们翻译成真正的换行符。</p>',
    },
    {
      type: 'code',
      title: '转义字符示例',
      code: `#include <stdio.h>

int main(void)
{
    printf("第一行\\n第二行\\n");
    printf("列1\\t列2\\t列3\\n");
    printf("他说：\\"你好\\"\\n");
    printf("反斜杠：\\\\\\n");
    return 0;
}`,
      note: '\\" 用于输出一个双引号，\\\\ 用于输出一个反斜杠——因为反斜杠本身是转义字符的开头，所以要写两遍。',
    },
    {
      type: 'text',
      html: '<h3>scanf 的用法与三大陷阱</h3><p><code>scanf</code>（scan formatted，格式化输入）从键盘读取数据，用法与 printf 类似，但参数上有一处关键区别。</p><p><b>陷阱一：必须取地址。</b>scanf 要把读到的值写进变量所在的内存单元，因此除了字符串数组，其余参数都要写成 <code>&变量名</code>。<code>&</code> 是<b>取地址运算符</b>（address-of operator），得到变量的内存地址。漏写 <code>&</code> 是最常见的初学者错误，轻则数据错乱，重则程序崩溃。</p><p><b>陷阱二：缓冲区残留。</b>输入数字后按下的回车键会以换行符 <code>\\n</code> 的形式残留在输入缓冲区（input buffer）中，被下一次 <code>%c</code> 或 getchar 意外读走。</p><p><b>陷阱三：<code>%s</code> 读不了空格。</b>用 <code>%s</code> 读取字符串时，遇到空格、制表符或换行就停止读取，因此无法一次读入带空格的整句话。</p>',
    },
    {
      type: 'code',
      title: 'scanf 与字符输入函数综合示例',
      code: `#include <stdio.h>

int main(void)
{
    int age;
    char ch;

    printf("请输入年龄：");
    scanf("%d", &age);            // 必须加 &，取 age 的地址
    printf("你今年 %d 岁。\\n", age);

    // 清空输入缓冲区中残留的回车（换行符）
    while (getchar() != '\\n')
        ;

    printf("请输入一个字符：");
    ch = getchar();               // 读取单个字符
    printf("你输入的是：%c\\n", ch);

    putchar('!');                 // 输出单个字符
    putchar('\\n');

    return 0;
}`,
      note: 'getchar() 读取一个字符，putchar(c) 输出一个字符，都来自 stdio.h。清空缓冲的 while 循环会一直读取直到吃掉换行符，是处理"残留回车"的常用技巧。',
    },
    {
      type: 'tip',
      kind: 'warn',
      html: '<p><b>gets 已被移除：</b>老代码里的 <code>gets</code>（get string）没有长度限制，输入稍长就会越界写内存，造成<b>缓冲区溢出</b>（buffer overflow），因此 C11 标准已经把它移除了。需要读取整行文本时，请改用 <code>fgets(数组名, 数组大小, stdin)</code>。</p><p><b>puts 更省事：</b><code>puts(字符串)</code> 输出字符串后自动补一个换行，比 <code>printf(\\"%s\\\\n\\", s)</code> 更简洁，但只能输出字符串、不能带格式说明符。</p><p><b>跳过空白小技巧：</b>在格式字符串开头加一个空格，如 <code>scanf(\\" %c\\", &ch)</code>，会让 scanf 先跳过所有空白字符（包括残留的换行），再读取真正的字符。</p>',
    },
  ],
  exercises: [
    {
      id: 'chapter-04-q1',
      type: 'choice',
      question: 'printf("%d", 42) 中的 %d 用于输出哪种类型的值？',
      options: ['浮点数', '单个字符', '有符号十进制整数', '字符串'],
      answer: 2,
      explanation: '%d 对应有符号十进制整数（int），42 是 int 类型，输出 42。浮点数要用 %f/%lf，单个字符用 %c，字符串用 %s。',
    },
    {
      id: 'chapter-04-q2',
      type: 'code',
      question: '下面代码的输出是什么？',
      code: `#include <stdio.h>
int main(void)
{
    printf("[%5.2f]", 3.14159);
    return 0;
}`,
      options: ['[3.14]', '[ 3.14]', '[3.14159]', '[003.14]'],
      answer: 1,
      explanation: '%5.2f 表示总宽度 5、保留 2 位小数。3.14159 四舍五入为 3.14（占 4 个字符），宽度不足 5，右对齐后在左边补 1 个空格，因此输出 [ 3.14]。选项 A 少了前导空格（那是没有宽度限制的 %.2f 的结果）；选项 C 没有按精度舍入；选项 D 是 %05.2f 用 0 填充的结果。',
    },
    {
      id: 'chapter-04-q3',
      type: 'multiple',
      question: '下面哪些是合法的转义字符写法？',
      options: ['\\n 表示换行', '\\t 表示制表符', '\\q 表示换页', '\\\\ 表示一个反斜杠'],
      answer: [0, 1, 3],
      explanation: '\\n 是换行、\\t 是水平制表符、\\\\ 表示一个反斜杠，都是 C 标准认可的转义序列。\\q 不是合法的转义字符，编译器会报"未知转义序列"（unknown escape sequence）错误，因此不能选。转义字符必须以反斜杠开头，且后面必须跟 C 认可的字符。',
    },
    {
      id: 'chapter-04-q4',
      type: 'choice',
      question: 'scanf("%d", &num) 中的 & 起什么作用？',
      options: ['把 num 的值复制给 scanf', '取 num 的地址，让 scanf 把输入写入该内存地址', '把 num 的值加一', '语法错误，scanf 根本不需要 &'],
      answer: 1,
      explanation: 'scanf 需要把读到的数据写进变量，必须知道变量在内存中的位置，& 是取地址运算符（address-of operator），&num 就是 num 的内存地址。若写成 scanf("%d", num)，scanf 会把 num 的当前值当作地址去写，轻则数据错乱，重则段错误（segmentation fault）导致程序崩溃。选项 A、C 与 & 的实际含义无关，选项 D 说反了——& 恰恰是 scanf 必须的。',
    },
    {
      id: 'chapter-04-q5',
      type: 'code',
      question: '假设用户先输入 5 并按回车，再输入 a 并按回车，下面代码的输出是？',
      code: `int n;
char c;
scanf("%d", &n);
scanf("%c", &c);
printf("%d %c", n, c);`,
      options: ['5 a', '5 后跟一个换行', 'a 5', '编译错误'],
      answer: 1,
      explanation: '输入 5 后按下的回车键会以换行符 \\n 的形式残留在输入缓冲区中，第二个 scanf("%c") 读到的正是这个残留的换行符，而不是用户后输入的 a。因此程序打印 5 和一个空格后直接换行，a 仍留在缓冲区未被读取。选项 A 错在以为读到了字符 a；选项 C 把顺序搞反了；选项 D 错——代码语法完全合法，只是踩了缓冲残留的坑。修复方法：读 %c 前先清空缓冲区，或把 %c 写成 " %c" 跳过空白。',
    },
    {
      id: 'chapter-04-q6',
      type: 'choice',
      question: '用 scanf("%s", str) 读取输入 "hello world"（含空格）时，str 中保存的内容是？',
      options: ['hello world', 'hello', 'world', '程序崩溃'],
      answer: 1,
      explanation: '%s 读取字符串时遇到空白字符（空格、制表符、换行）就停止，因此只把 hello 存进 str，剩下的 world 留在输入缓冲区。若想读取带空格的整行，应改用 fgets(str, 大小, stdin)。注意 str 是数组名，本身就是地址，这里不需要也不能加 &。选项 A 是误以为能读入整句；选项 C 是第二次读取的结果而非第一次；选项 D 与事实不符，代码可以正常编译运行。',
    },
    {
      id: 'chapter-04-q7',
      type: 'fill',
      question: 'gets 因无法限制输入长度、容易造成缓冲区溢出，已在 C11 标准中移除。请写出推荐的替代函数名（可带括号形式）。',
      accept: ['fgets', 'fgets()', 'fgets(str, n, stdin)', 'fgets(str,size,stdin)'],
      explanation: '标准推荐用 fgets 替代 gets：fgets(str, sizeof(str), stdin) 可以限制最多读取的字符数，从而避免缓冲区溢出。gets 没有任何长度参数，输入一旦超过数组大小就会越界写内存，这是它被移除的根本原因。',
    },
    {
      id: 'chapter-04-q8',
      type: 'code',
      question: '下面代码的输出是什么？',
      code: `#include <stdio.h>
int main(void)
{
    printf("[%-5d][%05d]", 12, 34);
    return 0;
}`,
      options: ['[12   ][00034]', '[   12][   34]', '[12   ][34   ]', '[00012][00034]'],
      answer: 0,
      explanation: '%-5d 表示宽度 5、左对齐，12 只占 2 位，右边补 3 个空格，得到 12 加三个空格；%05d 表示宽度 5、用 0 填充，34 变成 00034。因此输出为 [12   ][00034]。选项 B 把两段都当成右对齐补空格；选项 C 第二段错用了左对齐；选项 D 第一段错用了 0 填充。',
    },
  ],
};
