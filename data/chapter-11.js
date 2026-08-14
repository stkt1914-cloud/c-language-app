// 章节：文件操作
window.CHAPTERS = window.CHAPTERS || {};
window.CHAPTERS['chapter-11'] = {
  id: 'chapter-11',
  order: 11,
  icon: '📁',
  title: '文件操作',
  summary: '学习如何用 C 语言读写磁盘文件：fopen/fclose、字符级与格式化读写、二进制读写与文件定位，以及 feof/ferror 错误处理。',
  sections: [
    {
      type: 'text',
      html: '<h3>文件流与 FILE* 指针</h3><p>程序运行时数据存在内存里，程序一结束就会丢失。要想长期保存数据，就要用到<code>文件</code>（file）——把数据存到磁盘上。C 语言把"程序与文件之间的数据通道"抽象为<code>文件流</code>（file stream）：文件可以打开、读写、关闭，数据像水流一样按顺序流动。</p><p>所有文件操作函数都声明在头文件 <code>stdio.h</code> 中。文件在 C 程序里用一个 <code>FILE</code> 结构体表示，我们通过<code>FILE*</code>指针（FILE pointer）来操作它：<code>fopen</code> 打开文件后返回 FILE*，之后的读写、定位、关闭函数都以它为第一个参数。</p><p>三个<code>标准流</code>（standard streams）<code>stdin</code>（标准输入）、<code>stdout</code>（标准输出）、<code>stderr</code>（标准错误）在程序启动时已被系统打开，分别对应键盘、屏幕和错误信息输出，无需也不能用 fopen 打开。</p><p>按数据组织形式，文件分为<code>文本文件</code>（text file，以字符序列存储，如 .txt）与<code>二进制文件</code>（binary file，按内存中的字节原样存储，如图片、可执行文件）。</p>',
    },
    {
      type: 'table',
      title: 'fopen 的打开模式',
      headers: ['模式', '含义', '要点'],
      rows: [
        ['r', '只读（read）', '文件必须存在，否则 fopen 返回 NULL；从文件头开始读。'],
        ['w', '只写（write）', '文件存在则清空内容，不存在则创建；从文件头开始写。'],
        ['a', '追加（append）', '文件存在则从末尾追加，不存在则创建；只能写。'],
        ['r+', '读写（更新）', '文件必须存在；不清空，可读可写，初始位置在文件头。'],
        ['w+', '读写（更新）', '先清空（或创建）文件，再可读可写。'],
        ['a+', '读写追加', '读从文件头开始，写始终追加到文件末尾。'],
        ['加 b，如 rb/wb/ab/r+b', '二进制模式（binary）', '按字节原样读写，不做换行符转换；适合图片、结构体等非文本数据。'],
      ],
    },
    {
      type: 'code',
      title: 'fopen 打开失败检查与 fclose',
      code: `#include <stdio.h>

int main(void)
{
    FILE *fp;    // r：只读模式；返回的 FILE* 代表文件流

    fp = fopen("data.txt", "r");
    if (fp == NULL) {          // 打开失败时返回 NULL
        printf("文件打开失败，请检查文件是否存在。\\n");
        return 1;
    }

    printf("文件打开成功！\\n");

    // 使用完毕必须关闭文件，释放资源
    if (fclose(fp) == EOF) {   // 关闭失败返回 EOF
        printf("文件关闭时出错。\\n");
        return 1;
    }
    return 0;
}`,
      note: 'fopen 的第一个参数是文件路径，第二个参数是打开模式；打开失败返回 NULL，必须检查后再使用。fclose 成功返回 0，失败返回 EOF。',
    },
    {
      type: 'text',
      html: '<h3>字符级读写：fgetc 与 fputc</h3><p><code>fgetc(fp)</code> 从文件流中读取一个字符，返回该字符的码值（int 类型）；读到文件末尾或发生错误时返回 <code>EOF</code>。返回值类型必须是 <code>int</code>：EOF 通常定义为 -1，用 <code>char</code> 无法区分它和正常的字节。</p><p><code>fputc(ch, fp)</code> 把一个字符写入文件流，成功返回写入的字符，失败返回 EOF。</p><p>流参数也可以是标准流，例如 <code>fputc(\'a\', stdout)</code> 等价于 <code>putchar(\'a\')</code>，<code>fgetc(stdin)</code> 等价于 <code>getchar()</code>。</p><p><b>常见错误：</b>用 char 变量接收 fgetc 的返回值。当文件中出现码值为 0xFF 的字节时，它会被当作 -1 而误判为 EOF，导致读取提前结束。务必用 <code>int</code> 接收。</p>',
    },
    {
      type: 'code',
      title: '用 fgetc/fputc 复制文件',
      code: `#include <stdio.h>

int main(void)
{
    FILE *src;
    FILE *dst;
    int ch;   // 必须用 int 接收：EOF 无法用 char 表示

    src = fopen("in.txt", "r");
    dst = fopen("out.txt", "w");
    if (src == NULL || dst == NULL) {
        printf("打开文件失败！\\n");
        if (src != NULL) fclose(src);
        if (dst != NULL) fclose(dst);
        return 1;
    }

    while ((ch = fgetc(src)) != EOF) {
        fputc(ch, dst);        // 逐字符写入目标文件
    }

    if (ferror(src)) {         // 区分"正常读完"与"中途出错"
        printf("读取过程中发生错误。\\n");
    } else {
        printf("文件复制完成。\\n");
    }

    fclose(src);
    fclose(dst);
    return 0;
}`,
      note: '用 fgetc 的返回值判断结束是标准做法；循环结束后再用 feof/ferror 区分"正常读完"还是"出错"。',
    },
    {
      type: 'text',
      html: '<h3>格式化与行级读写</h3><p><code>fprintf(fp, "格式串", ...)</code> 与 <code>fscanf(fp, "格式串", ...)</code> 是 printf/scanf 的文件版本，只多了一个文件流参数。例如 <code>fprintf(fp, \"姓名：%s，年龄：%d\\n\", name, age)</code> 把数据按格式写入文件；<code>fscanf(fp, \"%s %d\", name, &amp;age)</code> 按格式读取，返回成功赋值的变量个数（读不到数据返回 EOF）。</p><p>逐行读写则用 <code>fgets</code> 与 <code>fputs</code>：</p><ul><li><code>fgets(buf, size, fp)</code>：读取一行，最多 size - 1 个字符，遇到换行符会一并读入，并在末尾自动补 <code>\\0</code>；读到末尾或出错返回 NULL。</li><li><code>fputs(str, fp)</code>：把字符串写入文件，<i>不会</i>自动添加换行符，成功返回非负值。</li></ul><p>相比不安全的 <code>gets</code>，<code>fgets</code> 必须指定缓冲区大小，能防止缓冲区溢出，是行级读取的首选。</p>',
    },
    {
      type: 'code',
      title: '用 fgets 逐行读取并统计行数',
      code: `#include <stdio.h>
#include <string.h>

int main(void)
{
    FILE *fp;
    char line[128];                    // 行缓冲区
    int count = 0;

    fp = fopen("log.txt", "r");
    if (fp == NULL) {
        printf("无法打开 log.txt。\\n");
        return 1;
    }

    while (fgets(line, sizeof(line), fp) != NULL) {   // 读到末尾返回 NULL
        line[strcspn(line, "\\n")] = '\\0';   // 去掉行尾的换行符
        count++;
        printf("第 %d 行：%s\\n", count, line);
    }

    fclose(fp);
    return 0;
}`,
      note: 'fgets 会把换行符一并读入，用 strcspn 找到并替换为 \\0 即可去掉行尾换行。',
    },
    {
      type: 'text',
      html: '<h3>二进制读写与文件定位</h3><p>文本模式适合人可读的数据；结构体、数组等内存中的二进制数据，用 <code>fread</code>/<code>fwrite</code> 读写最直接：</p><ul><li><code>size_t fread(void *ptr, size_t size, size_t count, FILE *fp)</code>：从文件读取 count 个大小为 size 的元素存入 ptr，返回成功读取的<code>完整元素个数</code>。</li><li><code>size_t fwrite(const void *ptr, size_t size, size_t count, FILE *fp)</code>：把 ptr 指向的 count 个元素写入文件，返回成功写入的元素个数。</li></ul><p>把内存数据原样写入磁盘的文件是<code>二进制文件</code>，打开时要加 b 后缀（如 \"wb\"、\"rb\"），避免文本模式对换行符的转换破坏数据。注意：直接写结构体虽然简单高效，但不同编译器的结构体内存布局可能不同，跨平台交换数据时建议用文本格式或自定义固定格式。</p><p>配合 <code>fseek</code>/<code>ftell</code>/<code>rewind</code> 可以随机访问（random access）文件：</p><ul><li><code>fseek(fp, offset, origin)</code>：把文件位置指针移到"距 origin 偏移 offset 字节"处。origin 取 <code>SEEK_SET</code>（文件开头）、<code>SEEK_CUR</code>（当前位置）或 <code>SEEK_END</code>（文件末尾），成功返回 0。</li><li><code>ftell(fp)</code>：返回当前位置相对文件开头的偏移量（long 类型）。</li><li><code>rewind(fp)</code>：把位置重置到文件开头，等价于 fseek(fp, 0, SEEK_SET)。</li></ul>',
    },
    {
      type: 'code',
      title: '二进制读写与文件定位综合示例',
      code: `#include <stdio.h>

#define COUNT 3

typedef struct {
    char name[20];
    int score;
} Student;

int main(void)
{
    Student arr[COUNT] = {
        {"Alice", 95},
        {"Bob", 88},
        {"Cindy", 76}
    };
    Student one;
    FILE *fp;

    // wb：以二进制写模式打开（不存在则创建）
    fp = fopen("stu.dat", "wb");
    if (fp == NULL) {
        printf("创建文件失败。\\n");
        return 1;
    }

    // fwrite 把整个数组写入文件，返回成功写入的元素个数
    if (fwrite(arr, sizeof(Student), COUNT, fp) != COUNT) {
        printf("写入文件失败。\\n");
    }
    fclose(fp);

    // rb：以二进制读模式重新打开
    fp = fopen("stu.dat", "rb");
    if (fp == NULL) {
        printf("打开文件失败。\\n");
        return 1;
    }

    // fseek 定位到 1 号元素（下标从 0 开始）
    if (fseek(fp, (long)sizeof(Student) * 1, SEEK_SET) != 0) {
        printf("定位失败。\\n");
    }
    printf("当前偏移：%ld\\n", ftell(fp));

    // fread 读取 1 个元素，返回值 1 表示读满
    if (fread(&one, sizeof(Student), 1, fp) == 1) {
        printf("第 2 个学生：%s，%d 分\\n", one.name, one.score);
    }

    rewind(fp);   // 回到文件开头
    fclose(fp);
    return 0;
}`,
      note: 'fread/fwrite 的返回值是"成功读写的完整元素个数"；fseek 用 SEEK_SET/SEEK_CUR/SEEK_END 三个基准定位，ftell 返回当前偏移，rewind 等价于 fseek(fp, 0, SEEK_SET)。',
    },
    {
      type: 'tip',
      kind: 'warn',
      html: '<p><b>判断文件末尾：</b><code>feof(fp)</code> 只在<i>尝试读取越过文件末尾之后</i>才返回非 0——它检查的是"文件结束标志"（end-of-file indicator），所以读取之前调用 feof 一定为假，包括空文件。</p><p><b>推荐写法：</b>用读取函数的返回值控制循环（fgetc 返回 EOF、fgets 返回 NULL、fread 返回 0），循环结束后再用 <code>feof</code>/<code>ferror</code> 区分"正常读到末尾"还是"读写出错"。</p><p><b>易错点清单：</b></p><ul><li>不要用 <code>while (!feof(fp))</code> 控制读取循环，否则最后一次读取失败后循环体仍会多执行一次。</li><li><code>ferror(fp)</code> 返回非 0 表示发生了读写错误；错误标志可用 <code>clearerr(fp)</code> 清除。</li><li>忘记 <code>fclose</code> 会导致资源泄漏，缓冲的数据也可能没有真正落盘。</li><li>以 \"w\" 打开会清空原文件；读写之间切换时，必要时用 <code>fflush</code> 或 <code>fseek</code> 调整位置。</li></ul>',
    },
  ],
  exercises: [
    {
      id: 'chapter-11-q1',
      type: 'choice',
      question: '要向文件末尾追加内容且不破坏原有数据，fopen 的第二个参数（打开模式）应该用哪个？',
      options: ['"r"', '"w"', '"a"', '"r+"'],
      answer: 2,
      explanation: '模式 "a"（append，追加）会把写入位置固定在文件末尾，原有内容全部保留；"r" 是只读模式，不能写入；"w" 会先清空文件再写，原有数据全部丢失；"r+" 可读可写但不追加，写入从当前文件位置开始，容易覆盖原有内容。',
    },
    {
      id: 'chapter-11-q2',
      type: 'choice',
      question: '用 fopen 以 "r" 模式打开一个不存在的文件，返回值是？',
      options: ['0', 'NULL', 'EOF', '一个非空的 FILE* 指针'],
      answer: 1,
      explanation: 'fopen 打开失败时返回空指针 NULL，因此必须用 if (fp == NULL) 检查后再使用。EOF 是 fgetc、fclose 等函数表示"结束/出错"的返回值，与 fopen 无关；0 是整数零而非空指针；打开失败不可能返回有效的 FILE* 指针。',
    },
    {
      id: 'chapter-11-q3',
      type: 'code',
      question: '下面的代码用 fgetc 逐字符读文件。为什么接收返回值的变量必须是 int 而不是 char？',
      code: `#include <stdio.h>

int main(void)
{
    FILE *fp;
    int ch;

    fp = fopen("a.txt", "r");
    if (fp == NULL) return 1;

    while ((ch = fgetc(fp)) != EOF) {
        putchar(ch);
    }
    fclose(fp);
    return 0;
}`,
      options: ['因为 char 无法表示汉字', '因为 fgetc 返回 int，EOF（通常为 -1）不能用 char 表示，用 int 才能区分正常字节与文件末尾', '因为 int 比 char 的读写速度快', '因为 fgetc 一次返回整个字符串'],
      answer: 1,
      explanation: 'fgetc 的返回值类型是 int：正常时返回所读字符的码值，读到末尾或出错时返回 EOF（stdio.h 中通常定义为 -1）。若用 char 接收，当文件中出现码值为 0xFF（十进制 255）的字节时，它会被当作 -1 而误判为 EOF，导致读取提前结束；A 错误——汉字由多个字节组成，与用 char 还是 int 接收无关；C 错误——性能不是原因；D 错误——fgetc 一次只返回一个字符的码值，不是字符串。',
    },
    {
      id: 'chapter-11-q4',
      type: 'multiple',
      question: '下列函数中，哪些用于"行级"（一次读写一行/一个字符串）的文件操作？',
      options: ['fgets', 'fputs', 'fgetc', 'fprintf'],
      answer: [0, 1],
      explanation: 'fgets 从文件读取一行（含换行符，最多 size-1 个字符并自动补 \\0），fputs 把字符串写入文件，二者是行级读写。fgetc 是字符级读取，一次只读一个字符；fprintf 是格式化输出，输出的是按格式串转换后的数据，不是原样的一行字符串，因此 C、D 不选。',
    },
    {
      id: 'chapter-11-q5',
      type: 'choice',
      question: '关于 feof(fp)，下列说法正确的是？',
      options: ['刚打开文件、还没读取时 feof 就返回真（只要文件非空）', '只有当程序尝试读取越过文件末尾（即已读到 EOF）之后，feof 才返回非 0', '只要文件为空，打开后 feof 立即返回非 0', '文件路径不存在时 feof 返回非 0'],
      answer: 1,
      explanation: 'feof 检查的是"文件结束标志"（end-of-file indicator），该标志只有在读取操作尝试越过文件末尾（读到 EOF）之后才会被置位。因此读取之前 feof 恒为 0——即使文件为空，也要先尝试读取才会置位（C 错）；文件路径不存在时 fopen 已经返回 NULL，根本轮不到 feof（D 错）；这也解释了为什么 while (!feof(fp)) 会在读完后再多执行一次循环体（A 错），正确做法是用读取函数的返回值（如 fgetc 返回 EOF）控制循环。',
    },
    {
      id: 'chapter-11-q6',
      type: 'choice',
      question: 'fread(buf, size, count, fp) 的返回值表示什么？',
      options: ['读入的字节总数', '成功读入的"完整元素"个数', '当前文件位置偏移量', '0 或 1，表示成功与否'],
      answer: 1,
      explanation: 'fread 返回成功读入的完整元素个数，最多不超过 count；若文件在读完 count 个元素之前就到达末尾或出错，返回值会小于 count，因此常用它判断是否读满。读入的字节总数等于 返回值 × size（A 错）；文件位置要用 ftell 查询（C 错）；返回值不是简单的 0/1（D 错）。',
    },
    {
      id: 'chapter-11-q7',
      type: 'fill',
      question: '除了 rewind(fp) 之外，还可以调用哪个函数把文件位置指针移到文件开头？（写出完整调用，如 fseek(fp, 0, SEEK_SET)）',
      accept: ['fseek(fp, 0, SEEK_SET)', 'fseek(fp,0,SEEK_SET)', 'fseek(fp, 0L, SEEK_SET)', 'fseek(fp, 0, 0)', 'fseek(fp,0,0)'],
      explanation: 'fseek 的原型是 int fseek(FILE *fp, long offset, int origin)，origin 取 SEEK_SET（文件开头）、SEEK_CUR（当前位置）或 SEEK_END（文件末尾）。fseek(fp, 0, SEEK_SET) 把位置设为"距文件开头 0 字节"，效果与 rewind(fp) 完全等价；由于 SEEK_SET 的值就是 0，写作 fseek(fp, 0, 0) 也能编译通过。',
    },
    {
      id: 'chapter-11-q8',
      type: 'choice',
      question: '以 "w" 模式 fopen 一个已经存在的文件，会发生什么？',
      options: ['打开失败并返回 NULL', '保留原有内容，新数据从文件头开始覆盖', '清空文件原有内容，从文件头开始写入', '打开文件并把新内容追加到文件末尾'],
      answer: 2,
      explanation: '"w"（write）模式在打开时会先截断（truncate）文件——把原有内容全部清空，再从头开始写入，这是文件操作中最容易造成数据丢失的陷阱。想保留原内容就地修改应该用 "r+"（可读写、不清空）；想追加用 "a"；"w" 对不存在的文件会创建它，一般不会打开失败（除非路径或权限问题），所以 A 错。',
    },
  ],
};
