// 章节：结构体、联合体与枚举
window.CHAPTERS = window.CHAPTERS || {};
window.CHAPTERS['chapter-09'] = {
  id: 'chapter-09',
  order: 9,
  icon: '🧩',
  title: '结构体、联合体与枚举',
  summary: '用 struct 把不同类型的数据组合成整体，用 union 让多个成员共享内存，用 enum 定义有名字的整型常量。',
  sections: [
    {
      type: 'text',
      html: '<h3>结构体（struct）的定义与声明</h3><p>数组（array）要求所有元素类型相同，而现实中的数据往往由多种类型组成：一个学生的学号是整数、姓名是字符串、成绩是浮点数。C 语言用<b>结构体（struct）</b>把不同类型的数据组合成一个整体，它是一种用户自定义的复合类型（composite data type）。</p><p>定义结构体使用关键字 <code>struct</code>：<br><code>struct 标签 { 类型 成员名; 类型 成员名; ... };</code><br>注意大括号结尾必须加分号。定义结构体只是创建了一种"类型"，此时并不占用内存；只有声明了结构体<b>变量</b>（如 <code>struct Student stu;</code>）后才会分配内存，成员按声明顺序依次存放。</p>',
    },
    {
      type: 'code',
      title: '结构体的初始化与成员访问（. 运算符）',
      code: `#include <stdio.h>
#include <string.h>

// 定义结构体：描述一个学生
struct Student {
    int id;           // 学号
    char name[20];    // 姓名
    double score;     // 成绩
};

int main(void)
{
    // 方式一：声明的同时按成员顺序初始化
    struct Student stu1 = {1001, "张三", 89.5};

    // 方式二：先声明，再逐个给成员赋值
    struct Student stu2;
    stu2.id = 1002;
    strcpy(stu2.name, "李四");   // 字符串不能直接整体 = 赋值
    stu2.score = 95.0;

    // 用 . 运算符访问成员
    printf("学号：%d 姓名：%s 成绩：%.1f\\n",
           stu1.id, stu1.name, stu1.score);
    printf("学号：%d 姓名：%s 成绩：%.1f\\n",
           stu2.id, stu2.name, stu2.score);

    return 0;
}`,
      note: '结构体变量之间可以直接整体赋值（如 stu2 = stu1，数组成员会整体拷贝）；但不能对数组成员整体用 = 赋值，如 stu2.name = "李四" 是非法的，必须用 strcpy。',
    },
    {
      type: 'text',
      html: '<h3>结构体数组与结构体指针</h3><p><b>结构体数组</b>的每个元素都是一个结构体，声明方式与普通数组相同，如 <code>struct Student clazz[50];</code>，访问第 i 个学生的学号写作 <code>clazz[i].id</code>。</p><p><b>结构体指针</b>：可以声明指向结构体的指针 <code>struct Student *p = &stu;</code>。指针不能直接用点运算符，必须先解引用：<code>(*p).id</code>。C 语言为此提供了更简洁的<b>箭头运算符（-&gt;）</b>：<code>p->id</code> 与 <code>(*p).id</code> 完全等价。注意：箭头运算符只能用于指针，点运算符只能用于变量本身。</p>',
    },
    {
      type: 'code',
      title: '结构体数组与结构体指针的综合示例',
      code: `#include <stdio.h>

struct Student {
    int id;
    char name[20];
    double score;
};

int main(void)
{
    // 结构体数组：初始化时依次给出每个元素的值
    struct Student clazz[3] = {
        {1, "张三", 88.0},
        {2, "李四", 91.5},
        {3, "王五", 76.0}
    };

    // 用下标访问数组元素的成员
    for (int i = 0; i < 3; i++) {
        printf("%s：%.1f 分\\n", clazz[i].name, clazz[i].score);
    }

    // 用指针遍历：数组名就是首元素的地址
    struct Student *p = clazz;
    for (int i = 0; i < 3; i++) {
        printf("第 %d 名同学：%s\\n", i + 1, p->name);
        p++;   // 每次跳过一个完整的 struct Student
    }

    return 0;
}`,
      note: '数组名 clazz 等价于 &clazz[0]；指针 p 每自增一次，就跳过一整个 struct Student 的大小，这正是"指针 + 1 是按所指类型大小步进"的体现。',
    },
    {
      type: 'text',
      html: '<h3>结构体作为函数参数：值传递与指针传递</h3><p>把结构体传给函数有两种方式：</p><p><b>值传递（pass by value）：</b>实参被整体拷贝一份给形参，函数内对成员的修改不会影响调用者；当结构体很大时，整份拷贝会带来明显的性能开销。</p><p><b>指针传递（pass by address）：</b>只把结构体的地址传给函数，函数通过指针直接操作原结构体，既能修改数据又高效。如果函数只读不写，可以加 <code>const</code> 修饰，如 <code>const struct Student *p</code>，防止误修改。</p>',
    },
    {
      type: 'code',
      title: '值传递与指针传递的对比',
      code: `#include <stdio.h>

struct Point { int x; int y; };

// 值传递：拿到的是副本，修改不影响调用者
void move1(struct Point p)
{
    p.x += 10;
}

// 指针传递：可以直接修改调用者的变量
void move2(struct Point *p)
{
    p->x += 10;
}

// 指针传递 + const：只读访问，防止误修改
void show(const struct Point *p)
{
    printf("(%d, %d)\\n", p->x, p->y);
}

int main(void)
{
    struct Point pt = {1, 2};

    move1(pt);   // pt.x 不变，仍是 1
    printf("move1 之后：");
    show(&pt);

    move2(&pt);  // pt.x 变为 11
    printf("move2 之后：");
    show(&pt);

    return 0;
}`,
      note: '结构体较大时传参建议用指针，避免整份拷贝的开销；只读的函数记得加 const，让编译器帮你把关。',
    },
    {
      type: 'tip',
      kind: 'tip',
      html: '<p><b>用 typedef 简化类型名：</b>每次都写 <code>struct Student stu;</code> 略显繁琐，可以用 <code>typedef</code> 给结构体类型起一个简短的名字：<br><code>typedef struct { int id; char name[20]; } Student;</code><br>之后直接写 <code>Student stu;</code> 即可，使用上与内置类型无异。注意：用了 typedef 后，结构体标签（struct 后面的名字）可以省略。</p><p><b>位域（bit-field）入门：</b>当成员只需要几个二进制位时，可以在成员名后加冒号和位数：<br><code>struct Flags { unsigned int a : 1; unsigned int b : 3; };</code><br>冒号后的数字表示该成员占用的比特数，访问方式与普通成员相同（如 <code>f.a</code>）。位域常用于状态标志、网络协议头等对内存斤斤计较的场景。</p>',
    },
    {
      type: 'table',
      title: 'struct 与 union 对比',
      headers: ['对比项', 'struct 结构体', 'union 联合体'],
      rows: [
        ['内存布局', '每个成员各占独立的内存', '所有成员共享同一块内存'],
        ['内存大小', '约等于各成员大小之和（可能有对齐填充）', '等于最大成员的大小'],
        ['成员取值', '各成员可同时保存有效值', '同一时刻只有一个成员有效，后赋值覆盖先赋值'],
        ['典型用途', '组合不同类型的数据（如学生信息）', '节省内存、对同一内存做不同解释'],
      ],
    },
    {
      type: 'text',
      html: '<h3>联合体（union）与枚举（enum）</h3><p><b>联合体（union）</b>的语法与结构体相似，但所有成员共享同一块内存，大小由最大的成员决定。给其中一个成员赋值，会覆盖其他成员的值，因此同一时刻只有一个成员的值有意义。联合体常用于节省内存，或对同一块内存做不同解释（例如把 4 字节整数按 4 个 char 逐个读取）。</p><p><b>枚举（enum）</b>用于定义一组有名字的整型常量：<br><code>enum Color { RED, GREEN, BLUE };</code><br>默认情况下成员从 0 开始依次递增（RED=0、GREEN=1、BLUE=2）。也可以显式赋值，赋值后其后的成员在上一值的基础上继续递增。枚举能让程序意图更清晰，也便于编译器检查。</p>',
    },
    {
      type: 'code',
      title: '联合使用 union 与 enum：标签联合体',
      code: `#include <stdio.h>
#include <string.h>

// 枚举：给数据的"种类"起名字，默认值为 0、1、2
enum Kind { KIND_INT, KIND_DOUBLE, KIND_STR };

// 联合体：不同种类的数据共用一块内存
union Value {
    int i;
    double d;
    char s[32];
};

// 结构体：把"种类"和"值"组合在一起（标签联合体）
struct Data {
    enum Kind kind;      // 记录当前存的是哪种数据
    union Value value;   // 具体的数据内容
};

void print_data(const struct Data *d)
{
    switch (d->kind) {
    case KIND_INT:    printf("整数：%d\\n", d->value.i); break;
    case KIND_DOUBLE: printf("浮点：%.1f\\n", d->value.d); break;
    case KIND_STR:    printf("字符串：%s\\n", d->value.s); break;
    }
}

int main(void)
{
    struct Data a;
    a.kind = KIND_INT;
    a.value.i = 42;
    print_data(&a);

    struct Data b;
    b.kind = KIND_STR;
    strcpy(b.value.s, "hello");
    print_data(&b);

    // 枚举成员本质是整型常量，可以参与运算和赋值
    enum Kind k = KIND_DOUBLE;   // k 的值是 1
    printf("KIND_DOUBLE 的值是 %d\\n", k);

    return 0;
}`,
      note: '联合体的大小等于最大成员的大小（此处为 char[32]，即 32 字节）。"枚举 + 联合体 + 结构体"组合出的标签联合体（tagged union）是 C 中模拟"可变类型"的经典手法。',
    },
  ],
  exercises: [
    {
      id: 'chapter-09-q1',
      type: 'choice',
      question: '通过结构体变量直接访问成员，应使用哪个运算符？',
      options: ['->', '.', '::', '&'],
      answer: 1,
      explanation: '通过结构体变量访问成员使用点运算符（.），例如 stu.id。箭头运算符 -> 用于通过结构体指针访问成员；:: 是 C++ 的作用域运算符，C 语言中没有；& 是取地址运算符，用于取变量地址，都不能用来访问结构体变量的成员。',
    },
    {
      id: 'chapter-09-q2',
      type: 'code',
      question: '下面代码的输出是什么？',
      code: `struct Point { int x; int y; };
int main(void)
{
    struct Point p = {3, 7};
    struct Point *q = &p;
    q->y = 10;
    printf("%d", p.x + p.y);
    return 0;
}`,
      options: ['13', '10', '7', '3'],
      answer: 0,
      explanation: 'q 是指向 p 的指针，q->y = 10 等价于 (*q).y = 10，即通过指针把 p.y 从 7 修改为 10，而 p.x 仍为 3，所以输出 3 + 10 = 13。10 只算了 p.y；7 是初始的 p.y；3 只算了 p.x，均不正确。',
    },
    {
      id: 'chapter-09-q3',
      type: 'choice',
      question: '在常见的 64 位平台上（int 占 4 字节、默认 4 字节对齐），下面结构体的大小 sizeof(struct S) 是多少？',
      code: `struct S {
    char c;
    int i;
};`,
      options: ['5', '9', '8', '12'],
      answer: 2,
      explanation: '结构体成员按对齐规则存放：char c 占 1 字节，int i 需要按 4 字节对齐，因此 c 之后会填充（padding）3 个字节，再存放 int，总大小为 1 + 3 + 4 = 8 字节。5 忽略了对齐填充；9 是错误地把填充算成了 4 个字节；12 假设了 8 字节对齐。注意 C 标准不保证固定值，实际大小取决于编译器与平台的对齐规则。',
    },
    {
      id: 'chapter-09-q4',
      type: 'choice',
      question: '下面联合体的大小 sizeof(union U) 是多少？',
      code: `union U {
    char c;
    int i;
    double d;
};`,
      options: ['13', '16', '4', '8'],
      answer: 3,
      explanation: 'union 的所有成员共享同一块内存，大小等于最大成员的大小。这里最大的成员是 double（8 字节），所以 sizeof(union U) 为 8。13 是三个成员大小之和，那是 struct 的计算方式；16 错误地假设了 16 字节对齐；4 只按 int 的大小计算，都忽略了 double 才是最大成员。',
    },
    {
      id: 'chapter-09-q5',
      type: 'code',
      question: '下面代码的输出是什么？',
      code: `union U { int x; int y; };
int main(void)
{
    union U u;
    u.x = 3;
    u.y = 5;
    printf("%d", u.x);
    return 0;
}`,
      options: ['3', '8', '5', '编译错误'],
      answer: 2,
      explanation: 'x 和 y 共享同一块内存，后写入的 u.y = 5 覆盖了之前 u.x = 3 的内容，因此读取 u.x 得到的是 5。3 是覆盖前的值；8 是把两次赋值相加，union 不会发生"相加"；该写法语法完全合法，不会编译错误。这也说明 union 同一时刻只有一个成员的值是有意义的。',
    },
    {
      id: 'chapter-09-q6',
      type: 'code',
      question: '下面代码的输出是什么？',
      code: `struct Point { int x; int y; };
void set(struct Point p) { p.x = 100; }
int main(void)
{
    struct Point p = {1, 2};
    set(p);
    printf("%d", p.x);
    return 0;
}`,
      options: ['100', '2', '1', '不确定'],
      answer: 2,
      explanation: '结构体按值传递时，函数拿到的是实参的一份拷贝，set 内部修改的是副本，不会影响 main 中的 p，所以 p.x 仍是 1。100 是副本中被修改的值；2 是 p.y 的值，与输出无关；结果完全确定，不存在"不确定"。若想修改原结构体，应传入指针，如 set(&p)。',
    },
    {
      id: 'chapter-09-q7',
      type: 'choice',
      question: '有如下枚举定义，GREEN 的值是多少？',
      code: `enum Color { RED = 5, GREEN, BLUE };`,
      options: ['1', '6', '2', '5'],
      answer: 1,
      explanation: '枚举成员是整型常量，默认从 0 开始依次递增；一旦某个成员被显式赋值，其后的成员就从该值继续递增。这里 RED 被赋为 5，因此 GREEN = 6、BLUE = 7。1 和 2 忽略了显式赋值，仍按从 0 开始推算；5 是 RED 自己的值，不是 GREEN 的。',
    },
    {
      id: 'chapter-09-q8',
      type: 'fill',
      question: '通过结构体指针访问成员时使用的运算符是什么？（填两个字符，如 p__id）',
      accept: ['->'],
      explanation: '通过结构体指针访问成员使用箭头运算符 ->，如 p->id，它等价于 (*p).id。点运算符 . 只能用于结构体变量本身，不能用于指针。',
    },
  ],
};
