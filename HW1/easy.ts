export type MyPick<T, K extends keyof T> = {
    [P in K]: T[P]; 
  }; // итерируемся по каждому ключу К и для каждого P берем тип из Т

export type NOfArray<ArrayObj extends any[], N extends number> = ArrayObj[N];  // обращаемся к элементу массива с индексом N и возвращаем его тип

export type Unshift<ArrayType extends unknown[], Element> = [Element, ...ArrayType]; // добавляем новый элемент Elem в начало массива ArrayType, при этом создавая новый тип массива.

export type MyExclude<T, U> = T extends U ? never : T; // для каждого T проверяем, можно ли его присвоить типу U.
// Если да -> меняем на never 
// Если нет -> возвращаем T 


// test MyPick
interface Dog {
  name: string;
  breed: string;
  weighgt: number;
}

type DogInfo = MyPick<Dog, 'name' | 'breed'>; 

// test NOArray
type MyArray = [string, number, boolean];
type MyElement = NOfArray<MyArray, 2>; 

// test Unshift
type Unshifted = [number, string];
type Shifted = Unshift<MyArray, boolean>; 

// test MyExclude 
type MyUnion = string | number | boolean;
type ExcludeString = MyExclude<MyUnion, string>; 
