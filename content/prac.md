### Pick

```ts
interface Person {
  name: string;
  age: number;
  address: string;
}

type PersonNameAndAge = MyPick<Person, 'name' | 'age'>; // Берет поля name и age из Person
// Результат: { name: string; age: number }

// TODO
type MyPick ...
```

<details><summary>Реализация</summary>

<br />

> 1 native ts

```ts
type Pick<T, K extends keyof T> = {
  [Key in K]: T[Key];
};
```

- `type Pick<T, K extends keyof T>`: Здесь мы определяем обобщенный тип `Pick`, который принимает два параметра. `T` представляет исходный тип, из которого мы хотим выбрать свойства, а `K` представляет набор ключей, которые мы хотим выбрать из `T`. Ограничение `K extends keyof T` гарантирует, что ключи `K` являются действительными ключами для типа `T`.

- `{ [P in K]: T[P] }`: Это выражение определяет новый тип, который будет содержать только выбранные свойства. Мы используем цикл `in` для итерации по каждому ключу `P` из набора ключей `K`. Затем мы указываем тип значения для каждого ключа `P` как `T[P]`, что означает, что тип значения будет таким же, как тип значения для соответствующего ключа в исходном типе `T`.

</details>

<br />
<hr />
<br />

### Exlude

```ts
type SomeType = string | number | boolean;

type MyExcludedType = MyExclude<SomeType, boolean>; // Исключает boolean из SomeType
// Результат: type MyExcludedType = string | number
```

<details><summary>Реализация</summary>

<br />

> 1 native ts

```ts
type MyExclude<T, U> = T extends U ? never : T;
```

В этом примере мы используем условный тип `T extends U ? never : T`, чтобы проверить, является ли тип `T` подтипом `U`. Если это так, то тип `never` возвращается, что означает, что `T` должен быть исключен из результирующего типа. Если `T` не является подтипом `U`, то `T` возвращается без изменений.

</details>

<br />
<hr />
<br />

### Omit

```ts
interface User {
  id: string;
  username: string;
  password: string;
}

type UserWithoutId = MyOmit<User, 'id'>; // Исключает поле id из User
// Результат: { password: string; username: string }

// TODO
type MyOmit ...
```

<details><summary>Реализация</summary>

<br />

> 1 native ts

```ts
type MyOmit<T, K extends keyof T> = {
  [Key in keyof T as key extends K ? never : Key]: T[Key];
};
```

- `type MyOmit<T, K extends keyof T>`: Здесь мы объявляем обобщенный тип `MyOmit`, который принимает два параметра: `T` и `K`. `T` представляет исходный тип, из которого мы будем исключать свойства, а `K` представляет тип ключей, которые мы хотим исключить.

- `[key in keyof T as key extends K ? never : key]: T[K]`: Это объявление нового типа, который будет содержать исключенные свойства. Здесь мы используем синтаксис `key in keyof T` для перебора всех ключей исходного типа `T`. Затем мы используем условное выражение `key extends K ? never : key`, чтобы определить, должны ли мы исключить текущий ключ `key`. Если ключ `key` является подтипом `K`, то мы используем тип `never`, чтобы исключить его из нового типа. В противном случае, мы оставляем ключ без изменений. Значение типа для каждого ключа `key` в новом типе будет `T[K]`, что означает, что свойство с ключом `key` будет иметь тип значения, соответствующего ключу `K` в исходном типе `T`.

<br />

> 2 with Pick and Exclude

```ts
type MyOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
```

Внутри определения типа `MyOmit` мы используем два встроенных типа TypeScript: `Pick` и `Exclude`.

`keyof T` возвращает объединение всех ключей (свойств) типа `T`. Это означает, что `keyof T` будет содержать все возможные свойства типа `T`.

`Exclude<keyof T, K>` создает новый тип, исключая из `keyof T` все ключи, которые присутствуют в типе `K`. То есть, мы исключаем из объединения всех ключей типа `T` те ключи, которые указаны в типе `K`.

Наконец, `Pick<T, Exclude<keyof T, K>>` используется для создания нового типа, который содержит только те свойства из типа `T`, которые не были исключены с помощью типа `K`. То есть, мы выбираем только те свойства из исходного типа `T`, которые не указаны в типе `K`.

<br />

> 3 with only Exclude

```ts
type MyOmit<T, K extends keyof T> = {
  [Key in Exclude<keyof T, K>]: T[Key];
};
```

</details>

<br />
<hr />
<br />

### KebabToPascalCase

```ts
type KebabCaseString = 'my-example-string';
type PascalCaseString = KebabToPascalCase<KebabCaseString>;
// Результат: 'MyExampleString'
```

<details><summary>Реализация</summary>

<br />

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

<br />
<hr />
<br />

### KebabToCamel

```ts
type KebabCase = 'my-example-string';
type CamelCase = KebabToCamel<KebabCase>;
// Результат: myExampleString
```

<details><summary>Реализация</summary>

<br />

> 1

```ts
type KebabToCamel<T> = T extends `${infer A}-${infer B}${infer C}`
  ? `${A}${Uppercase<B>}${KebabToCamel<C>}`
  : T;
```

1. `T extends ${infer A}-${infer B}${infer C}`
   Эта часть кода использует условный тип в TypeScript для проверки, соответствует ли тип `T` шаблону `${infer A}-${infer B}${infer C}`. Шаблон `${infer A}-${infer B}${infer C}` представляет собой строку, состоящую из трех частей, разделенных дефисом.

2. `? ${A}${Uppercase<B>}${KebabToCamel<C>} : T;`
   Если тип `T` соответствует шаблону `${infer A}-${infer B}${infer C}`, то выполняется следующая часть кода. Здесь происходит преобразование строки из kebab-case в camelCase.

   - `${A}` представляет собой первую часть строки до первого дефиса и остается без изменений.
   - `Uppercase<B>` преобразует вторую часть строки в верхний регистр. Например, если вторая часть строки была "foo", то она будет преобразована в "FOO".
   - `KebabToCamel<C>` рекурсивно вызывает тип `KebabToCamel` для оставшейся части строки после первого дефиса. Это позволяет преобразовывать все остальные части строки из kebab-case в camelCase.

   Если тип `T` не соответствует шаблону `${infer A}-${infer B}${infer C}`, то возвращается исходный тип `T` без изменений.

</details>

<br />
<hr />
<br />

### ScreamSnakeCaseString

```ts
type MyString = 'hello_world_example';
type ScreamSnakeCase = ScreamSnakeCaseString<MyString>;
// Результат: 'HELLO_WORLD_EXAMPLE'
```

<details><summary>Реализация</summary>

<br />

> 1

```ts
type ScreamSnakeCaseString<T extends string> = T extends `${infer A}_${infer B}`
  ? `${Uppercase<A>}_${ScreamSnakeCaseString<B>}`
  : Uppercase<T>;
```

1. `type ScreamSnakeCaseString<T extends string> = ...`: Здесь мы объявляем тип `ScreamSnakeCaseString`, который принимает обобщенный параметр `T`, ограниченный типом `string`. Это означает, что `T` должен быть строковым типом.

2. `T extends ${infer A}_${infer B} ? ... : ...`: Это условное выражение, которое проверяет, соответствует ли `T` шаблону `${infer A}_${infer B}`. Шаблон `${infer A}_${infer B}` означает, что `T` должен быть в формате "что-то*еще*что-то". Если `T` соответствует этому шаблону, выполняется код после `?`, иначе выполняется код после `:`.

3. `${Uppercase<A>}_${ScreamSnakeCaseString<B>}`: Если `T` соответствует шаблону `${infer A}_${infer B}`, то мы преобразуем `A` в верхний регистр с помощью встроенного TypeScript-оператора `Uppercase`. Затем мы рекурсивно вызываем тип `ScreamSnakeCaseString` для `B` и объединяем результат с преобразованным `A` с помощью символа `_`. Это позволяет обрабатывать строки с несколькими частями, разделенными символом `_`.

4. `Uppercase<T>`: Если `T` не соответствует шаблону `${infer A}_${infer B}`, то мы просто преобразуем `T` в верхний регистр с помощью `Uppercase`. Это применяется к частям строки, которые не содержат символ `_`.

</details>

<br />
<hr />
<br />
