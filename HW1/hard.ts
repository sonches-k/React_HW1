export type Camelize<ObjectType> = {
    [K in keyof ObjectType as K extends `${infer First}_${infer Rest}` // проверяем, есть ли в ключе подчеркивание
      ? `${Lowercase<First>}${CamelizeString<Rest>}` // преобразуем ключ в camelCase
      : K]: ObjectType[K] extends object // если значение - объект, рекурсивно применяем Camelize к его значениям
      ? Camelize<ObjectType[K]>
      : ObjectType[K]; // если не объект, возвращаем значение без изменений
  };
  
  // Тип helper для преобразования строки с несколькими подчеркиваниями
  type CamelizeString<S extends string> = S extends `${infer First}_${infer Rest}`
    ? `${Capitalize<First>}${CamelizeString<Rest>}` // рекурсивно преобразуем каждое подчеркивание в camelCase
    : Capitalize<S>; // преобразуем последнюю часть строки
  
  
    export type DeepPick<T, Paths extends string> = 
    Paths extends `${infer Key}.${infer Rest}` // проверяем, есть ли вложенность в пути
      ? Key extends keyof T // проверяем, существует ли первый ключ в объекте T
        ? { [K in Key]: DeepPick<T[K], Rest> } // если существует, рекурсивно погружаемся в объект
        : never // если ключа нет, возвращаем never
      : Paths extends keyof T // если вложенности нет, проверяем путь напрямую
        ? { [K in Paths]: T[K] } // возвращаем ключ, если он существует
        : never; // если ключ не найден, возвращаем never
  

  // camelize test
type Car = {
    brand_name: string,
    is_electric: boolean,
    engine_capacity: number,
    has_air_conditioning: boolean,
    max_speed: number
  }
  

  type CamelCar = Camelize<Car>;
  
  let tesla: CamelCar = {
    brandName: "Toyota",
    isElectric: true,
    engineCapacity: 0, 
    hasAirConditioning: true,
    maxSpeed: 500
  }
  
  console.log(tesla);
  

  // deeppick test
type Computer = {
    brand: string,
    memory: {
        cpu: string,
        ram: string,
        storage: {
            type: string,
            size: string
        }
    },
    isGamingPC: boolean
};
type PickedComputer = DeepPick<Computer, 'isGamingPC' | 'memory.storage.size'>;

let gamingPC: PickedComputer = {
    isGamingPC: true,
    memory: {
        storage: {
            size: "2TB", 
        }
    }
};

console.log(gamingPC);
