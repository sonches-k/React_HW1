"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let partialHouse = {
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
let myCar = {
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
let carModel = "model";
console.log(carModel);
