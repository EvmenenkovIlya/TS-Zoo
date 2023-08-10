var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Biome;
(function (Biome) {
    Biome["Desert"] = "Desert";
    Biome["Forest"] = "Forest";
    Biome["Lake"] = "Lake";
    Biome["Ocean"] = "Ocean";
    Biome["Tundra"] = "Tundra";
    Biome["Taiga"] = "Taiga";
    Biome["Jungle"] = "Jungle";
    Biome["Mountain"] = "Mountain";
})(Biome || (Biome = {}));
var FoodType;
(function (FoodType) {
    FoodType[FoodType["Grass"] = 0] = "Grass";
    FoodType[FoodType["Meat"] = 1] = "Meat";
    FoodType[FoodType["GrassAndMeat"] = 2] = "GrassAndMeat";
})(FoodType || (FoodType = {}));
var Animal = /** @class */ (function () {
    function Animal(name, neededArea, neededCountOfFood) {
        this.name = name;
        this.neededArea = neededArea;
        this.neededCountOfFood = neededCountOfFood;
    }
    //Описание вида (“Жираф, медведь и тд”):
    Animal.prototype.returnInfo = function () {
        var info = "My name: ".concat(this.name, ", I am predator: ").concat(this.isPredator, ", I live in ").concat(this.biome, ", I need water ").concat(this.needWater);
        return info;
    };
    return Animal;
}());
var Voice = /** @class */ (function () {
    function Voice(sound) {
        this.voice = sound;
    }
    Voice.prototype.makeSound = function () {
        console.log("I make sound like: ".concat(this.voice));
    };
    return Voice;
}());
var Lama = /** @class */ (function (_super) {
    __extends(Lama, _super);
    function Lama() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.biome = Biome.Mountain;
        _this.isPredator = false;
        _this.needWater = false;
        _this.voice = new Voice('Beeee');
        return _this;
    }
    return Lama;
}(Animal));
var Bear = /** @class */ (function (_super) {
    __extends(Bear, _super);
    function Bear() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.biome = Biome.Forest;
        _this.isPredator = true;
        _this.needWater = true;
        _this.voice = new Voice('RRRRRAR');
        return _this;
    }
    return Bear;
}(Animal));
var Lion = /** @class */ (function (_super) {
    __extends(Lion, _super);
    function Lion() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.biome = Biome.Jungle;
        _this.isPredator = true;
        _this.needWater = true;
        _this.voice = new Voice('I am the king');
        return _this;
    }
    return Lion;
}(Animal));
var Monkey = /** @class */ (function (_super) {
    __extends(Monkey, _super);
    function Monkey() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.biome = Biome.Jungle;
        _this.isPredator = false;
        _this.needWater = true;
        _this.voice = new Voice('YA-YA-YA');
        return _this;
    }
    return Monkey;
}(Animal));
var Salmon = /** @class */ (function (_super) {
    __extends(Salmon, _super);
    function Salmon() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.biome = Biome.Lake;
        _this.isPredator = false;
        _this.needWater = true;
        return _this;
    }
    return Salmon;
}(Animal));
var Volyer = /** @class */ (function () {
    function Volyer(id, area, biome, hasWater) {
        this.animalsInVolyer = [];
        this.id = id;
        this.area = area;
        this.biome = biome;
        this.hasWater = hasWater;
    }
    Volyer.prototype.addAnimal = function (animal) {
        if (!this.checkBiom(animal)) {
            console.log("Only for animals from: ".concat(this.biome));
        }
        else if (!this.checkWater(animal)) {
            console.log("".concat(animal.name, " need water, but volyer doesn't have it"));
        }
        else if (!this.checkPredators(animal)) {
            console.log("There are some predators in volyer");
        }
        else if (!this.checkEnoughSpace(animal)) {
            console.log(("There is not enough space in volyer for animals"));
        }
        else {
            this.animalsInVolyer.push(animal);
        }
    };
    Volyer.prototype.checkBiom = function (animal) {
        return this.biome == animal.biome;
    };
    Volyer.prototype.checkWater = function (animal) {
        return this.hasWater && animal.needWater;
    };
    Volyer.prototype.checkEnoughSpace = function (animal) {
        return this.freeArea() >= animal.neededArea;
    };
    // TODO
    Volyer.prototype.checkPredators = function (animal) {
        return true;
    };
    Volyer.prototype.freeArea = function () {
        var areaForAnimals = 0;
        if (this.animalsInVolyer.length != 0) {
            areaForAnimals = this.animalsInVolyer.map(function (x) { return x.neededArea; }).reduce(function (sum, curr) { return sum + curr; });
        }
        var freeArea = this.area - areaForAnimals;
        return freeArea;
    };
    Volyer.prototype.returnInfo = function () {
        var info = "Volyer with id: ".concat(this.id, ", biome: ").concat(this.biome, ", nominal area: ").concat(this.area, ", free area: ").concat(this.freeArea(), ", water: ").concat(this.hasWater, ", animals: ").concat(this.animalsInVolyer);
        return info;
    };
    return Volyer;
}());
var firstVolyer = new Volyer(1, 10, Biome.Jungle, true);
var lion1 = new Lion('Lev', 5, 5);
var lion2 = new Lion('Lev', 5, 5);
var firstMonkey = new Monkey('Lala', 1, 1);
console.log(firstVolyer.returnInfo());
console.log(firstVolyer.freeArea());
console.log(firstMonkey.returnInfo());
firstVolyer.addAnimal(lion1);
firstVolyer.addAnimal(lion2);
firstVolyer.addAnimal(firstMonkey);
console.log(firstVolyer.returnInfo());
console.log(firstVolyer.freeArea());
