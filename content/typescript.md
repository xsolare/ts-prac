### Pick

Реализуйте тип `MyPick<T, K>`, который выбирает только те свойства из объекта `T`, которые находятся в типе `K`.

```ts
interface ExampleObject {
  name: string;
  age: number;
  address: string;
}

type PersonNameAndAge = MyPick<ExampleObject, 'name' | 'age'>; // Берет поля name и age из ExampleObject
// Результат: { name: string; age: number }
```

<details><summary>Реализация</summary>

```ts
type Pick<T, K extends keyof T> = {
  [Key in K]: T[Key];
};
```

- `type Pick<T, K extends keyof T>`: Здесь мы определяем обобщенный тип `Pick`, который принимает два параметра. `T` представляет исходный тип, из которого мы хотим выбрать свойства, а `K` представляет набор ключей, которые мы хотим выбрать из `T`. Ограничение `K extends keyof T` гарантирует, что ключи `K` являются действительными ключами для типа `T`.

- `{ [P in K]: T[P] }`: Это выражение определяет новый тип, который будет содержать только выбранные свойства. Мы используем цикл `in` для итерации по каждому ключу `P` из набора ключей `K`. Затем мы указываем тип значения для каждого ключа `P` как `T[P]`, что означает, что тип значения будет таким же, как тип значения для соответствующего ключа в исходном типе `T`.

</details>

<hr />

### Exlude

Реализуйте тип `MyExclude<T, U>`, который исключает из `T` все типы, которые являются подтипами `U`.

```ts
type SomeType = string | number | boolean;

type MyExcludedType = MyExclude<SomeType, boolean>; // Исключает boolean из SomeType
// Результат: type MyExcludedType = string | number
```

<details><summary>Реализация</summary>

```ts
type MyExclude<T, U> = T extends U ? never : T;
```

В этом примере мы используем условный тип `T extends U ? never : T`, чтобы проверить, является ли тип `T` подтипом `U`. Если это так, то тип `never` возвращается, что означает, что `T` должен быть исключен из результирующего типа. Если `T` не является подтипом `U`, то `T` возвращается без изменений.

</details>

<hr />

### Omit

Реализуйте тип `MyOmit<T, K>`, который удаляет из объекта `T` все свойства, перечисленные в `K`.

```ts
interface ExampleObject {
  id: string;
  username: string;
  password: string;
}

type UserWithoutId = MyOmit<ExampleObject, 'id'>; // Исключает поле id из ExampleObject
// Результат: { password: string; username: string }
```

<details><summary>Реализация</summary>

> 1 native ts

```ts
type MyOmit<T, K extends keyof T> = {
  [Key in keyof T as Key extends K ? never : Key]: T[Key];
};
```

- `type MyOmit<T, K extends keyof T>`: Здесь мы объявляем обобщенный тип `MyOmit`, который принимает два параметра: `T` и `K`. `T` представляет исходный тип, из которого мы будем исключать свойства, а `K` представляет тип ключей, которые мы хотим исключить.

- `[Key in keyof T as Key extends K ? never : Key]: T[K]`: Это объявление нового типа, который будет содержать исключенные свойства. Здесь мы используем синтаксис `key in keyof T` для перебора всех ключей исходного типа `T`. Затем мы используем условное выражение `key extends K ? never : key`, чтобы определить, должны ли мы исключить текущий ключ `key`. Если ключ `key` является подтипом `K`, то мы используем тип `never`, чтобы исключить его из нового типа. В противном случае, мы оставляем ключ без изменений. Значение типа для каждого ключа `key` в новом типе будет `T[K]`, что означает, что свойство с ключом `key` будет иметь тип значения, соответствующего ключу `K` в исходном типе `T`.

> 2 with Pick and Exclude

```ts
type MyOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
```

- Внутри определения типа `MyOmit` мы используем два встроенных типа TypeScript: `Pick` и `Exclude`.

- `keyof T` возвращает объединение всех ключей (свойств) типа `T`. Это означает, что `keyof T` будет содержать все возможные свойства типа `T`.

- `Exclude<keyof T, K>` создает новый тип, исключая из `keyof T` все ключи, которые присутствуют в типе `K`. То есть, мы исключаем из объединения всех ключей типа `T` те ключи, которые указаны в типе `K`.

- Наконец, `Pick<T, Exclude<keyof T, K>>` используется для создания нового типа, который содержит только те свойства из типа `T`, которые не были исключены с помощью типа `K`. То есть, мы выбираем только те свойства из исходного типа `T`, которые не указаны в типе `K`.

> 3 with only Exclude

```ts
type MyOmit<T, K extends keyof T> = {
  [Key in Exclude<keyof T, K>]: T[Key];
};
```

</details>

<hr />

### KebabToPascalCase

Реализуйте тип `CamelToKebabCase<T>`, который преобразует строку в `CamelCase` в строку в `Kebab-Case`.

```ts
type KebabCaseString = 'my-example-string';
type PascalCaseString = KebabToPascalCase<KebabCaseString>;
// Результат: 'MyExampleString'
```

<details><summary>Реализация</summary>

> 1

```ts
type KebabToPascalCase<T> = T extends `${infer A}-${infer B}${infer C}`
  ? `${Capitalize<A>}${Uppercase<B>}${KebabToPascalCase<C>}`
  : T;
```

- `T` - это обобщенный тип, который принимает входную строку в формате kebab-case.

- `T extends ${infer A}-${infer B}${infer C}` - это условие проверки типа, которое разбивает входную строку на три части: `A`, `B` и `C`. Они представляют собой части строки до первого дефиса, между первым и вторым дефисами и после второго дефиса соответственно.

- `? ${Capitalize<A>}${Uppercase<B>}${KebabToPascalCase<C>}` - это тернарный оператор, который определяет, что происходит, если условие `T extends ${infer A}-${infer B}${infer C}` истинно. В этом случае происходит рекурсивный вызов типа `KebabToPascalCase<C>`, чтобы преобразовать оставшуюся часть строки `C`. Затем используются функции `Capitalize` и `Uppercase` для преобразования `A` и `B` соответственно. Результатом является объединение этих трех частей в формате PascalCase.

- `: T` - это ветка альтернативы тернарного оператора, которая указывает, что происходит, если условие `T extends ${infer A}-${infer B}${infer C}` ложно. В этом случае возвращается исходная строка без изменений.

</details>

<hr />

### KebabToCamel

Реализуйте тип `KebabToCamel<T>`, который преобразует строку в формате `kebab-case` в формат `CamelCase`.

```ts
type KebabCase = 'my-example-string';
type CamelCase = KebabToCamel<KebabCase>;
// Результат: myExampleString
```

<details><summary>Реализация</summary>

> 1

```ts
type KebabToCamel<T> = T extends `${infer A}-${infer B}${infer C}`
  ? `${A}${Uppercase<B>}${KebabToCamel<C>}`
  : T;
```

- `T extends ${infer A}-${infer B}${infer C}`
  Эта часть кода использует условный тип в TypeScript для проверки, соответствует ли тип `T` шаблону `${infer A}-${infer B}${infer C}`. Шаблон `${infer A}-${infer B}${infer C}` представляет собой строку, состоящую из трех частей, разделенных дефисом.

- `? ${A}${Uppercase<B>}${KebabToCamel<C>} : T;`
  Если тип `T` соответствует шаблону `${infer A}-${infer B}${infer C}`, то выполняется следующая часть кода. Здесь происходит преобразование строки из kebab-case в camelCase.

  - `${A}` представляет собой первую часть строки до первого дефиса и остается без изменений.
  - `Uppercase<B>` преобразует вторую часть строки в верхний регистр. Например, если вторая часть строки была "foo", то она будет преобразована в "FOO".
  - `KebabToCamel<C>` рекурсивно вызывает тип `KebabToCamel` для оставшейся части строки после первого дефиса. Это позволяет преобразовывать все остальные части строки из kebab-case в camelCase.

  Если тип `T` не соответствует шаблону `${infer A}-${infer B}${infer C}`, то возвращается исходный тип `T` без изменений.

</details>

<hr />

### ScreamSnakeCase

Реализуйте тип `ScreamSnakeCaseKeys<T>`, который делает все ключи объекта `T` в верхнем регистре и преобразует их в формат `SCREAM_SNAKE_CASE`.

```ts
type MyString = 'hello_world_example';
type ScreamSnakeCase = ScreamSnakeCase<MyString>;
// Результат: 'HELLO_WORLD_EXAMPLE'
```

<details><summary>Реализация</summary>

> 1

```ts
type ScreamSnakeCase<T extends string> = T extends `${infer A}_${infer B}`
  ? `${Uppercase<A>}_${ScreamSnakeCase<B>}`
  : Uppercase<T>;
```

- `type ScreamSnakeCase<T extends string> = ...`: Здесь мы объявляем тип `ScreamSnakeCase`, который принимает обобщенный параметр `T`, ограниченный типом `string`. Это означает, что `T` должен быть строковым типом.

- `T extends ${infer A}_${infer B} ? ... : ...`: Это условное выражение, которое проверяет, соответствует ли `T` шаблону `${infer A}_${infer B}`. Шаблон `${infer A}_${infer B}` означает, что `T` должен быть в формате "что-то*еще*что-то". Если `T` соответствует этому шаблону, выполняется код после `?`, иначе выполняется код после `:`.

- `${Uppercase<A>}_${ScreamSnakeCase<B>}`: Если `T` соответствует шаблону `${infer A}_${infer B}`, то мы преобразуем `A` в верхний регистр с помощью встроенного TypeScript-оператора `Uppercase`. Затем мы рекурсивно вызываем тип `ScreamSnakeCase` для `B` и объединяем результат с преобразованным `A` с помощью символа `_`. Это позволяет обрабатывать строки с несколькими частями, разделенными символом `_`.

- `Uppercase<T>`: Если `T` не соответствует шаблону `${infer A}_${infer B}`, то мы просто преобразуем `T` в верхний регистр с помощью `Uppercase`. Это применяется к частям строки, которые не содержат символ `_`.

</details>

<hr />

### Last

Реализуйте тип `Last<T>`, который извлекает последний элемент из массива `T`.

```ts
type ExampleArray = [1, 2, 3];

type LastElement = Last<ExampleArray>;
// Результат: 3
```

<details><summary>Реализация</summary>

```ts
type Last<T extends any[]> = T extends [...infer _, infer LastElement] ? LastElement : never;
```

- `T extends any[]`: Это ограничение типа, которое гарантирует, что `T` является массивом типов. Это означает, что `T` должен быть кортежем или массивом в TypeScript.

- `T extends [...infer _, infer LastElement] ? LastElement : never`: Это условный тип, который проверяет, можно ли разложить `T` в массив с помощью оператора расширения (`...`). Если это возможно, то тип `T` будет разложен в массив `infer _` (любые элементы, которые мы не интересуемся) и `infer LastElement` (последний элемент, который нас интересует). Затем условный тип возвращает `LastElement` в качестве результата. Если разложение невозможно (например, если `T` не является массивом), то возвращается тип `never`.

</details>

<hr />

### Flatten

Реализуйте тип `Flatten<T>`, который "разворачивает" вложенные массивы в массиве `T` до одного уровня глубины.

```ts
type ExampleArray = [1, [2, 3], [[4]], [[[5]]]];

type FlattenedArray = Flatten<ExampleArray>;
// Результат: [1, 2, 3, [4], [[5]]]
```

<details><summary>Реализация</summary>

```ts
type Flatten<T extends any[]> = T extends [infer First, ...infer Rest]
  ? First extends any[]
    ? [...Flatten<First>, ...Flatten<Rest>]
    : [First, ...Flatten<Rest>]
  : T;
```

1. `type Flatten<T extends any[]>`: Это объявление типа `Flatten`, который принимает обобщенный параметр `T`, ограниченный типом `any[]`. Это означает, что `T` должен быть массивом любого типа.

2. `T extends [infer First, ...infer Rest] ? ... : ...`: Это условное выражение, которое проверяет, является ли `T` массивом с хотя бы одним элементом. Если это так, то выполняется первая часть условия, иначе выполняется вторая часть.

3. `First extends any[] ? ... : ...`: Это еще одно условное выражение, которое проверяет, является ли `First` элементом массива. Если это так, то выполняется первая часть условия, иначе выполняется вторая часть.

4. `...Flatten<First>, ...Flatten<Rest>`: Если `First` является массивом, то рекурсивно вызывается тип `Flatten` для `First` и `Rest`, а затем объединяются результаты с помощью оператора `...`. Это позволяет "разглаживать" вложенные массивы.

5. `[First, ...Flatten<Rest>]`: Если `First` не является массивом, то он добавляется в результат как отдельный элемент, а затем рекурсивно вызывается тип `Flatten` для `Rest`. Это позволяет сохранить не-массивные элементы в одномерном массиве.

6. `: T;`: Если `T` не является массивом с хотя бы одним элементом, то возвращается исходный тип `T` без изменений.

</details>

<hr />

### Trim

Реализуйте тип `Trim<S>`, который удаляет пробелы в начале и конце строки `S`.

```ts
type ExampleString = '   Hello, TypeScript!   ';

type TrimmedString = Trim<ExampleString>;
// Результат: 'Hello, TypeScript!'
```

<details><summary>Реализация</summary>

```ts
type Trim<S extends string> = S extends ` ${infer Rest}` | `${infer Rest} ` ? Trim<Rest> : S;
```

1. `S extends ` ${infer Rest}` | `${infer Rest} ` ? Trim<Rest> : S;`
   Эта строка является условным выражением типа. Она проверяет, соответствует ли тип `S` шаблону, состоящему из пробела и переменной `Rest`, или шаблону, состоящему из переменной `Rest` и пробела. Если условие выполняется, то вызывается рекурсивный вызов `Trim<Rest>`, иначе возвращается исходный тип `S`.

2. `S extends ` ${infer Rest}` | `${infer Rest} ` ? Trim<Rest> : S;`
   Здесь используется шаблон строк `${infer Rest}` для извлечения остатка строки после пробела. Если строка `S` начинается с пробела, то `Rest` будет содержать остаток строки после пробела. Аналогично, если строка `S` заканчивается пробелом, то `Rest` будет содержать остаток строки до пробела.

3. `Trim<Rest>`
   Если условие выполняется, то вызывается рекурсивный вызов `Trim<Rest>`. Это означает, что функция `Trim` будет вызываться рекурсивно до тех пор, пока не будет достигнута строка без пробелов.

4. `: S;`
   Если условие не выполняется, то возвращается исходный тип `S` без изменений.

</details>

<hr />

### ObjectKeys

Реализуйте тип `ObjectKeys<T>`, который извлекает все ключи из объекта `T` в виде объединения строковых литералов.

```ts
interface ExampleObject {
  name: string;
  age: number;
  address: string;
}

type ObjectKeysExample = ObjectKeys<ExampleObject>;
// Результат: 'name' | 'age' | 'address'
```

<details><summary>Реализация</summary>

```ts
type ObjectKeys<T> = T extends object ? keyof T : never;
```

1. `type ObjectKeys<T>` - это объявление нового типа с именем `ObjectKeys`, который принимает один параметр типа `T`.

2. `T extends object ? keyof T : never` - это условное выражение, которое проверяет, является ли тип `T` объектом. Если `T` является объектом, то возвращается тип `keyof T`, который представляет объединение всех ключей объекта `T`. Если `T` не является объектом, то возвращается тип `never`.

</details>

<hr />

### StringToUnion

Реализуйте тип `StringToUnion<S>`, который преобразует строку `S` в объединение символов строки.

```ts
type ExampleString = 'hello';

type ExampleUnion = StringToUnion<ExampleString>;
// Результат: 'h' | 'e' | 'l' | 'o'
```

<details><summary>Реализация</summary>

```ts
type StringToUnion<S extends string> = S extends `${infer First}${infer Rest}`
  ? First | StringToUnion<Rest>
  : never;
```

1. `type StringToUnion<S extends string> = ...`
   Здесь мы объявляем тип `StringToUnion`, который принимает обобщенный параметр `S`, ограниченный типом `string`. Это означает, что `S` должен быть строковым типом.

2. `S extends `${infer First}${infer Rest}` ? ... : never;`
   Здесь мы используем условный оператор `extends` для проверки, можно ли разделить строку `S` на две части: первый символ `First` и оставшуюся часть `Rest`. Мы используем шаблонную строку с помощью обратных кавычек и двух обобщенных параметров `${infer First}` и `${infer Rest}`.

3. `First | StringToUnion<Rest>`
   Если строка `S` может быть разделена на `First` и `Rest`, то мы возвращаем объединение типов `First | StringToUnion<Rest>`. Это означает, что тип `StringToUnion<S>` будет состоять из `First` и всех остальных типов, полученных рекурсивным вызовом `StringToUnion` для `Rest`.

4. `: never;`
   Если строка `S` не может быть разделена на `First` и `Rest`, то мы возвращаем тип `never`. Это означает, что тип `StringToUnion<S>` будет пустым типом.

</details>

<hr />

### UnionToDifference

Реализуйте тип `UnionToDifference<U>`, который извлекает только те члены `U`, которые находятся в одном типе объединения и не принадлежат другим типам.

```ts
type ExampleUnion = 'a' | 'b' | 'c' | 'b' | 'd';

type ExampleDifference = UnionToDifference<ExampleUnion>;
// Результат: 'a' | 'c' | 'd'
```

<details><summary>Реализация</summary>

```ts
type UnionToDifference<U> = (U extends any ? (arg: U) => void : never) extends (
  arg: infer I
) => void
  ? Exclude<U, I>
  : never;
```

1. `U` - это обобщенный тип, который представляет объединение нескольких типов.

2. `(U extends any ? (arg: U) => void : never)` - это условный тип, который проверяет, можно ли присвоить аргумент типа `U` функции `(arg: U) => void`. Если это возможно для любого типа `U`, то возвращается функция `(arg: U) => void`, иначе возвращается тип `never`.

3. `(arg: infer I) => void` - это тип функции, который принимает аргумент типа `I` и не возвращает ничего (`void`). Здесь `infer I` используется для вывода типа `I` из аргумента функции.

4. `Exclude<U, I>` - это встроенный TypeScript-тип, который создает новое объединение типов, исключая из типа `U` все типы, которые являются подтипами `I`. Это означает, что `Exclude<U, I>` содержит только те типы из `U`, которые не могут быть присвоены типу `I`.

5. `Exclude<U, I>` возвращается, если `(U extends any ? (arg: U) => void : never)` действительно является типом `(arg: infer I) => void`. В противном случае возвращается тип `never`.

</details>

<hr />

### CapitalizeKeys

Реализуйте тип `CapitalizeKeys<T>`, который делает все ключи объекта `T` в верхнем регистре.

```ts
interface ExampleObject {
  name: string;
  age: number;
  address: string;
}

type CapitalizedKeysObject = CapitalizeKeys<ExampleObject>;
/*
Результат:
{
  NAME: string;
  AGE: number;
  ADDRESS: string;
}
*/
```

<details><summary>Реализация</summary>

```ts
type CapitalizeKeys<T> = {
  [K in keyof T as Capitalize<string & K>]: T[K];
};
```

1. `type CapitalizeKeys<T> = { ... };`: Здесь мы объявляем новый тип `CapitalizeKeys<T>`, который будет преобразовывать ключи объекта `T`.

2. `[K in keyof T as Capitalize<string & K>]: T[K];`: Это часть кода, где мы определяем новые ключи для объекта `CapitalizeKeys<T>`. Здесь используется конструкция `keyof T`, которая получает все ключи типа `T`. Затем мы используем оператор `as` для определения нового ключа, который будет результатом применения функции `Capitalize` к каждому ключу `K`. Функция `Capitalize` преобразует первую букву строки в верхний регистр.

   - `Capitalize<string & K>`: Здесь мы применяем функцию `Capitalize` к типу `string & K`. Тип `string & K` представляет собой пересечение типа `string` и типа `K`. В результате получается строковый тип, который будет преобразован в верхний регистр.

   - `: T[K];`: Здесь мы указываем, что значение нового ключа будет соответствовать значению исходного ключа `K` в объекте `T`.

</details>

<hr />

### DeepReadonly

Реализуйте тип `DeepReadonly<T>`, который делает все свойства вложенных объектов в `T` только для чтения (т.е. неизменяемыми).

```ts
interface ExampleObject {
  name: string;
  age: number;
  address: {
    street: string;
    city: string;
  };
}

type ReadonlyObject = DeepReadonly<ExampleObject>;
/*
Результат:
{
  readonly name: string;
  readonly age: number;
  readonly address: {
    readonly street: string;
    readonly city: string;
  };
}
*/
```

<details><summary>Реализация</summary>

```ts
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};
```

1. `DeepReadonly<T>` - это обобщенный тип, который принимает тип `T` в качестве параметра. Он будет использоваться для преобразования типа `T` в его неизменяемую версию.

2. `[K in keyof T]` - это цикл по всем ключам `K` типа `T`. `keyof T` возвращает объединение всех ключей типа `T`, а `[K in keyof T]` означает, что мы выполняем итерацию по каждому ключу типа `T`.

3. `T[K] extends object ? DeepReadonly<T[K]> : T[K]` - это условное выражение, которое проверяет, является ли тип значения `T[K]` объектом. Если `T[K]` является объектом, то мы рекурсивно применяем `DeepReadonly` к типу `T[K]`, чтобы преобразовать его свойства в неизменяемые. В противном случае, если `T[K]` не является объектом, мы оставляем его без изменений.

4. `readonly [K in keyof T]` - это синтаксис TypeScript для создания неизменяемых (только для чтения) свойств объекта. Он указывает, что все свойства типа `T` должны быть только для чтения.

</details>

<hr />

### Diff

Реализуйте тип `Diff<T, U>`, который вычисляет разницу между типами `T` и `U`, т.е. возвращает те члены `T`, которые не принадлежат типу `U`.

```ts
type T = 'a' | 'b' | 'c';
type U = 'b' | 'c' | 'd';

type Difference = Diff<T, U>;
// Результат: 'a'
```

<details><summary>Реализация</summary>

```ts
type Diff<T, U> = T extends U ? never : T;
```

Предположим, у нас есть два типа: `T` и `U`. Когда мы используем `Diff<T, U>`, происходит проверка, является ли тип `T` подтипом или эквивалентным типом `U`. Если это так, то условие `T extends U` будет истинным, и результатом будет тип `never`. Тип `never` представляет невозможность наличия значений и используется, когда функция или выражение никогда не завершается или не возвращает значение.

Если же тип `T` не является подтипом или эквивалентным типом `U`, то условие `T extends U` будет ложным, и результатом будет сам тип `T`. Это означает, что если `T` и `U` различаются, то `Diff<T, U>` будет представлять тип `T`.

Таким образом, обобщенный тип `Diff<T, U>` позволяет нам получить разницу между двумя типами `T` и `U`, представляя только те части `T`, которые не являются подтипами или эквивалентными типу `U`.

</details>

<hr />

### FunctionParams

Реализуйте тип `FunctionParams<T>`, который извлекает тип параметров функции `T`.

```ts
type ExampleFunction = (a: number, b: string) => void;

type Params = FunctionParams<ExampleFunction>;
// Результат: [number, string]
```

<details><summary>Реализация</summary>

```ts
type FunctionParams<T> = T extends (...args: infer Params) => any ? Params : never;
```

1. `type FunctionParams<T> = ...` - Здесь мы объявляем обобщенный тип `FunctionParams`, который принимает тип `T` в качестве параметра.

2. `T extends (...args: infer Params) => any ? Params : never` - Это условное выражение, которое проверяет, является ли тип `T` функцией. Если `T` является функцией, то мы извлекаем типы ее аргументов и присваиваем их переменной `Params`. Если `T` не является функцией, то тип `never` возвращается.

3. `(...args: infer Params) => any` - Это тип функции, который описывает функцию с аргументами типа `Params` и возвращающую значение типа `any`. Здесь `...args` представляет собой синтаксис rest-параметра, который позволяет функции принимать переменное количество аргументов.

4. `? Params : never` - Это условный оператор, который возвращает тип `Params`, если `T` является функцией, иначе возвращает тип `never`. Тип `never` представляет собой тип, который никогда не может возникнуть, и обычно используется для обозначения недостижимого кода или ошибок компиляции.

</details>

<hr />

### ReplaceKeys

Реализуйте тип `ReplaceKeys<T, U>`, который заменяет все ключи типа `T` на соответствующие ключи типа `U`.

```ts
interface ExampleObject {
  name: string;
  age: number;
}

type ReplacedObject = ReplaceKeys<ExampleObject, 'username' | 'years'>;
/*
Результат:
{
  username: string;
  years: number;
}
*/
```

<details><summary>Реализация</summary>

```ts
type ReplaceKeys<T, U extends keyof T, NewKey = string> = {
  [K in keyof T as K extends U ? NewKey : K]: T[K];
};
```

- `ReplaceKeys<T, U extends keyof T, NewKey = string>` - это объявление шаблона типа `ReplaceKeys`. Он принимает три параметра:

  - `T` - тип объекта, ключи которого будут заменены.
  - `U` - тип ключа, который будет заменен.
  - `NewKey` - тип нового ключа, на который будет заменен ключ `U`. По умолчанию установлен тип `string`.

- `{ [K in keyof T as K extends U ? NewKey : K]: T[K] }` - это выражение, которое определяет новый тип, полученный путем замены ключей в объекте типа `T`.

  - `K in keyof T` - это цикл по всем ключам `K` в объекте типа `T`.
  - `K extends U ? NewKey : K` - это условное выражение, которое проверяет, является ли текущий ключ `K` равным `U`. Если это так, то ключ `K` заменяется на `NewKey`, иначе ключ остается без изменений.
  - `: T[K]` - это тип значения, соответствующего ключу `K` в объекте типа `T`. Он остается неизменным.

</details>

<hr />

### Promisify

Реализуйте тип `Promisify<T>`, который преобразует тип функции в тип функции, возвращающей промис.

```ts
type ExampleFunction = (a: number, b: string) => void;

type PromisifiedFunction = Promisify<ExampleFunction>;
// Результат: (a: number, b: string) => Promise<void>
```

<details><summary>Реализация</summary>

```ts
type Promisify<T> = T extends (...args: infer Params) => infer Result
  ? (...args: Params) => Promise<Result>
  : never;
```

1. `T` - это обобщенный тип, который будет передан в `Promisify<T>`. Он может быть любым типом, но в данном случае ожидается, что `T` будет функцией.

2. `T extends (...args: infer Params) => infer Result` - это условие, которое проверяет, является ли тип `T` функцией. Если это так, то условие выполняется, и мы переходим к следующей части.

3. `(...args: Params) => Promise<Result>` - это тип, который будет возвращен, если условие в пункте 2 истинно. Он представляет собой функцию, которая принимает аргументы типа `Params` и возвращает `Promise<Result>`. Здесь `Params` - это кортеж типов аргументов функции `T`, а `Result` - это тип возвращаемого значения функции `T`.

4. `: never` - это тип, который будет возвращен, если условие в пункте 2 ложно. В данном случае, если `T` не является функцией, то тип `never` будет возвращен.

</details>

<hr />

### NonNullableKeys

Реализуйте тип `NonNullableKeys<T>`, который извлекает ключи объекта `T`, значения которых не могут быть `null` или `undefined`.

```ts
interface ExampleObject {
  name: string | null;
  age: number | undefined;
  address: string;
}

type NonNullableKeysObject = NonNullableKeys<ExampleObject>;
// Результат: 'address'
```

<details><summary>Реализация</summary>

```ts
type NonNullableKeys<T> = {
  [K in keyof T]: T[K] extends null | undefined ? never : K;
}[keyof T];
```

1. `type NonNullableKeys<T> = ...` - Здесь мы объявляем новый тип `NonNullableKeys<T>`, который будет принимать параметр типа `T`.

2. `[K in keyof T]: ...` - Это цикл по всем ключам `K` объекта `T`. `keyof T` возвращает объединение всех ключей объекта `T`.

3. `T[K] extends null | undefined ? never : K` - Здесь мы проверяем, является ли тип значения `T[K]` `null` или `undefined`. Если это так, то возвращаем тип `never`, который представляет недостижимый тип. В противном случае, возвращаем сам ключ `K`.

4. `{...}[keyof T]` - После цикла мы получаем тип, который содержит все значения, возвращенные на предыдущем шаге. Затем мы используем индексный доступ `[keyof T]`, чтобы получить объединение всех значений типа.

</details>

<hr />

### DeepPartialArray

Реализуйте тип `DeepPartialArray<T>`, который делает все элементы вложенных массивов в `T` необязательными (делает их тип `undefined | T`).

```ts
type ExampleArray = [string, [number, boolean]];

type PartialArray = DeepPartialArray<ExampleArray>;
// Результат: [string?, [number?, boolean?]]
```

<details><summary>Реализация</summary>

```ts
type DeepPartialArray<T> = T extends (infer Element)[]
  ? DeepPartial<Element>[]
  : T extends readonly (infer Element)[]
  ? readonly DeepPartial<Element>[]
  : never;
```

1. `T extends (infer Element)[] ? DeepPartial<Element>[] : ...`
   В этой части кода мы проверяем, является ли тип `T` массивом. Если это так, то мы продолжаем с `DeepPartial<Element>[]`, где `Element` - это тип элемента массива `T`. `infer` используется для вывода типа элемента массива.

2. `DeepPartial<Element>[]`
   Здесь мы применяем рекурсивное определение типа `DeepPartial` к каждому элементу массива `T`. `DeepPartial` - это другой тип, который глубоко копирует каждый элемент массива.

3. `T extends readonly (infer Element)[] ? readonly DeepPartial<Element>[] : ...`
   Эта часть кода аналогична предыдущей, но проверяет, является ли тип `T` неизменяемым (readonly) массивом. Если это так, то возвращается `readonly DeepPartial<Element>[]`.

4. `never`
   Если тип `T` не является массивом или неизменяемым массивом, то возвращается тип `never`. `never` представляет собой тип, который никогда не может быть достигнут, и обычно используется для обработки непредвиденных ситуаций или ошибок.

</details>

<hr />

### JoinStrings

Реализуйте тип `JoinStrings<T>` для объединения всех строковых литералов из типа `T` в единую строку.

```ts
type ExampleType = 'Hello' | ' ' | 'World' | '!';

type JoinedString = JoinStrings<ExampleType>;
// Результат: 'Hello World!'
```

<details><summary>Реализация</summary>

```ts
type JoinStrings<T> = T extends string ? `${T}` : never;
```

1. `type JoinStrings<T>`: Это объявление условного типа с именем `JoinStrings`, который принимает один параметр типа `T`.

2. `T extends string ? `${T}` : never;`: Это условное выражение, которое проверяет, является ли тип `T` подтипом `string`. Если это так, то тип `JoinStrings<T>` будет равен шаблонной строке `${T}`. В противном случае, тип `JoinStrings<T>`будет равен`never`.

3. `${T}`: Это шаблонная строка, которая используется для объединения типа `T` со строкой. В результате, если `T` является строковым типом, то `JoinStrings<T>` будет равен типу, представленному шаблонной строкой `${T}`. Например, если `T` равно `"hello"`, то `JoinStrings<T>` будет равен типу `"hello"`.

4. `never`: Это тип `never`, который представляет недостижимое значение. Если `T` не является подтипом `string`, то `JoinStrings<T>` будет равен `never`. Это означает, что для неподходящих типов `T` нельзя создать экземпляр типа `JoinStrings<T>`.

</details>

<hr />

### Prop

Реализуйте тип `Prop<T, K>`, который извлекает тип значения свойства `K` из типа `T`.

```ts
interface ExampleObject {
  name: string;
  age: number;
  address: {
    street: string;
    city: string;
  };
}

type AddressStreet = Prop<ExampleObject, 'address.street'>;
// Результат: string
```

<details><summary>Реализация</summary>

```ts
type Prop<T, K extends keyof any> = K extends keyof T ? T[K] : never;
```

1. `T` - это обобщенный параметр, который представляет тип объекта, для которого мы хотим получить свойство.
2. `K extends keyof any` - это обобщенный параметр, который представляет ключ свойства, которое мы хотим получить из объекта `T`. Ограничение `keyof any` означает, что `K` может быть любым ключом, который может существовать в любом типе.

Теперь давайте рассмотрим тело типа `Prop<T, K extends keyof any>`:

1. `K extends keyof T` - это условие проверки, которое проверяет, является ли `K` ключом в типе `T`. Если это так, то тип `T[K]` будет возвращен.
2. `T[K]` - это обращение к свойству `K` в типе `T`. Если `K` является ключом в типе `T`, то тип `T[K]` будет возвращен. Это означает, что тип `Prop<T, K>` будет равен типу значения свойства `K` в объекте `T`.
3. `never` - это альтернативное значение, которое будет возвращено, если `K` не является ключом в типе `T`. Если `K` не является ключом в типе `T`, то тип `Prop<T, K>` будет равен `never`.

Таким образом, тип `Prop<T, K>` позволяет получить тип значения свойства `K` из объекта `T`. Если `K` не является ключом в типе `T`, то тип `never` будет возвращен. Это полезно, когда мы хотим получить тип конкретного свойства из объекта, но не знаем, существует ли такое свойство в типе.

</details>

<hr />

### Length

Реализуйте тип `Length<T>`, который определяет длину (количество элементов) типа `T`, подразумевая, что `T` может быть массивом или строкой.

```ts
type ExampleArray = [1, 2, 3, 4];

type ArrayLength = Length<ExampleArray>;
// Результат: 4

type ExampleString = 'Hello, TypeScript!';

type StringLength = Length<ExampleString>;
// Результат: 18
```

<details><summary>Реализация</summary>

```ts
type Length<T extends any[]> = T['length'];

type Length<T extends string> = T['length'];
```

1. `Length<T extends any[]>`:
   Этот тип принимает параметр `T`, который должен быть массивом (`T extends any[]`). Затем мы используем индексный доступ к свойству `length` массива `T`, чтобы получить его длину. Таким образом, тип `Length<T>` будет равен длине массива `T`.

   Например, если у нас есть тип `type MyArray = [number, string, boolean]`, мы можем использовать `Length<MyArray>` для получения типа, представляющего длину массива `MyArray`. В этом случае `Length<MyArray>` будет равен типу `3`, так как массив `MyArray` содержит три элемента.

2. `Length<T extends string>`:
   Этот тип принимает параметр `T`, который должен быть строкой (`T extends string`). Затем мы используем индексный доступ к свойству `length` строки `T`, чтобы получить ее длину. Таким образом, тип `Length<T>` будет равен длине строки `T`.

   Например, если у нас есть тип `type MyString = 'Hello'`, мы можем использовать `Length<MyString>` для получения типа, представляющего длину строки `MyString`. В этом случае `Length<MyString>` будет равен типу `5`, так как строка `MyString` содержит пять символов.

</details>

<hr />

### OptionalKeys

Реализуйте тип `OptionalKeys<T>`, который извлекает ключи с необязательными свойствами из типа `T`.

```ts
interface ExampleObject {
  name: string;
  age?: number;
  address?: string;
}

type OptionalObjectKeys = OptionalKeys<ExampleObject>;
// Результат: 'age' | 'address'
```

<details><summary>Реализация</summary>

```ts
type OptionalKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never;
}[keyof T];
```

1. `type OptionalKeys<T> = { ... }` - Здесь мы начинаем определение типа `OptionalKeys<T>`, который будет принимать обобщенный тип `T` в качестве параметра.

2. `[K in keyof T]-?: {} extends Pick<T, K> ? K : never;` - Это выражение является индексной манипуляцией типов, которая проходит через все ключи `K` типа `T`.

3. `keyof T` - `keyof T` возвращает объединение всех ключей типа `T`. Это означает, что `K` будет принимать каждый ключ типа `T` по очереди.

4. `-?: {} extends Pick<T, K> ? K : never;` - Здесь мы используем отрицательный модификатор `-?`, чтобы указать, что свойство является необязательным. Это означает, что свойство может быть пропущено или иметь значение `undefined`.

5. `Pick<T, K>` - `Pick<T, K>` создает новый тип, выбирая только свойство `K` из типа `T`. Это позволяет нам проверить, является ли свойство `K` определенным в типе `T`.

6. `{}` - Пустой объект используется для сравнения с `Pick<T, K>`. Если `Pick<T, K>` является подтипом пустого объекта, это означает, что свойство `K` является необязательным.

7. `{} extends Pick<T, K> ? K : never;` - Если `Pick<T, K>` является подтипом пустого объекта, то возвращается `K`, иначе возвращается тип `never`. Тип `never` указывает на недостижимость и означает, что свойство `K` является обязательным.

8. `[keyof T]` - В конце выражения мы обращаемся к типу, полученному после индексной манипуляции типов, используя `[keyof T]`. Это приводит к объединению всех типов `K`, которые были возвращены на предыдущем шаге.

Таким образом, тип `OptionalKeys<T>` возвращает объединение имен всех необязательных свойств типа `T`. Это полезно, когда вам нужно работать только с необязательными свойствами в обобщенном типе.

</details>

<hr />

### Filter

Реализуйте тип `Filter<T, U>`, который фильтрует тип `T`, оставляя только те свойства, значения которых присваиваемы типу `U`.

```ts
interface ExampleObject {
  name: string;
  age: number;
  enabled: boolean;
}

type FilteredObject = Filter<ExampleObject, string | boolean>;
/*
Результат:
{
  name: string;
  enabled: boolean;
}
*/
```

<details><summary>Реализация</summary>

```ts
type Filter<T, U> = {
  [K in keyof T as T[K] extends U ? K : never]: T[K];
};
```

- Тип `Filter<T, U>` использует конструкцию `keyof T` для получения всех ключей типа `T`. Затем, с помощью оператора `as`, мы проходимся по каждому ключу `K` в `keyof T` и проверяем, удовлетворяет ли тип значения `T[K]` условию `T[K] extends U`. Если это условие выполняется, то ключ `K` сохраняется в типе результата, иначе ключ `K` заменяется на тип `never`.

- Тип `never` представляет недостижимое значение и используется для указания, что никакие значения не могут иметь этот тип. В данном случае, если тип значения `T[K]` не удовлетворяет условию `T[K] extends U`, то ключ `K` заменяется на тип `never`, что приводит к исключению этого ключа из результирующего типа.

Таким образом, тип `Filter<T, U>` возвращает новый тип, который содержит только те ключи из типа `T`, значения которых удовлетворяют условию `T[K] extends U`. Все остальные ключи исключаются из результирующего типа.

</details>
