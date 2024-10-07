
export type DeepPartial<T> = {
    // если Т объеки и не массив
    [K in keyof T]?: T[K] extends object // проверяем, является ли тип свойств объектом
      ? DeepPartial<T[K]> // рекурсивно применяем DeepPartial к вложенному объекту
      : T[K]; // если свойство не объект, просто возвращаем тпи
  };
  

export type MyCapitalize<T extends string> = T extends `${infer First}${infer Rest}` // используем шаблонные литералы, чтобы проверить, является ли Т строкой.
  ? `${Uppercase<First>}${Rest}` // / Если строка - делим на First (первую букву) и Rest(оставшуюся часть). С помощью Uppercase переводим первую букву в верхний регистр
  : T;  
  

  export type DeepMutable<T> = {
    // убираем модификатор `readonly` с каждого свойства
    -readonly [P in keyof T]: T[P] extends object
      // Если свойство - объект, применяем DeepMutable рекурсивно, убирая readonly на всех уровнях 
      ? DeepMutable<T[P]>
      // в противном случае не трогаем
      : T[P];
  };

 
export type ParseURLParams<StringElem extends string> = 
StringElem extends `${infer _Prefix}:${infer Param}/${infer Rest}` // проверяем наличие сегментов типа ":param"
  ? Param | ParseURLParams<Rest> // если находим параметр, добавляем его и продолжаем рекурсию для оставшейся строки
  : StringElem extends `${infer _Prefix}:${infer Param}` // если последний сегмент
  ? Param // возвращаем последний параметр
  : never; // если нет параметров, возвращаем never



  // deep partial
type House = {
    livingRoom: {
        sofa: {
            seats: number;
            hasArmrest: boolean;
        };
        tv: {
            screenSize: number;
            isSmartTV: boolean;
        };
    };
    kitchen: {
        hasDishwasher: boolean;
        fridge: {
            capacity: number;
            hasFreezer: boolean;
        };
    };
};

let partialHouse: DeepPartial<House> = {
    livingRoom: {
        tv: {
            screenSize: 55
        }
    },
    kitchen: {
        fridge: {
            hasFreezer: true
        }
    }
};

console.log(partialHouse);

  
  // MyCapitalize
  type TestMyCapitalize = MyCapitalize<'hello world'>; 

  // deep mutable
type ReadonlyCar = {
    readonly brand: string;
    readonly model: string;
    readonly characteristics: {
        readonly engine: string;
        readonly horsepower: number;
        readonly features: {
            readonly hasSunroof: boolean;
            readonly hasNavigation: boolean;
        };
    };
};

type MutableCar = DeepMutable<ReadonlyCar>;

let myCar: MutableCar = {
    brand: "Toyota",
    model: "Corolla",
    characteristics: {
        engine: "V4",
        horsepower: 130,
        features: {
            hasSunroof: false,
            hasNavigation: true
        }
    }
};

myCar.characteristics.horsepower = 150;
myCar.characteristics.features.hasSunroof = true;

console.log(myCar);


  // parseURLParams
  type CarParams = ParseURLParams<'cars/:brand/:model/:year'>; 
  let carModel: CarParams = "model"; 
  console.log(carModel); 
  