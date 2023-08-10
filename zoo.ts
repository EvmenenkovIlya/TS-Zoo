enum Biome {
    Desert = 'Desert',
    Forest = 'Forest',
    Lake = 'Lake',
    Ocean = 'Ocean',
    Tundra = 'Tundra',
    Taiga = 'Taiga',
    Jungle = 'Jungle',
    Mountain = 'Mountain'
  }
  
  enum FoodType {
    Grass,
    Meat,
    GrassAndMeat
  }

class Animal {
    name: string;
    readonly biome: Biome;
    readonly isPredator: boolean;
    readonly needWater: boolean;
    readonly food: FoodType;
    neededArea: number;
    neededCountOfFood: number;

    constructor(name:string, neededArea: number, neededCountOfFood: number) {
        this.name = name;
        this.neededArea = neededArea;
        this.neededCountOfFood = neededCountOfFood
    }

    //Описание вида (“Жираф, медведь и тд”):
    returnInfo(): string {
        let info = `My name: ${this.name}, I am predator: ${this.isPredator}, I live in ${this.biome}, I need water ${this.needWater}`
        return info;
    }
}

interface IMakeSound{
    voice: Voice;
}

class Voice{
    voice: string;

    constructor(sound:string) {
        this.voice = sound;
    }

    makeSound(){
        console.log(`I make sound like: ${this.voice}`);
    }
}

class Lama extends Animal implements IMakeSound{
    biome = Biome.Mountain;
    isPredator = false;
    needWater = false;
    voice: Voice = new Voice('Beeee');
}

class Bear extends Animal implements IMakeSound{
    biome = Biome.Forest;
    isPredator = true;
    needWater = true;
    voice: Voice = new Voice('RRRRRAR');
}

class Lion extends Animal implements IMakeSound{
    biome = Biome.Jungle;
    isPredator = true;
    needWater = true;
    voice: Voice = new Voice('I am the king');
}

class Monkey extends Animal implements IMakeSound{
    biome = Biome.Jungle;
    isPredator = false;
    needWater = true;
    voice: Voice = new Voice('YA-YA-YA');
}

class Salmon extends Animal{
    biome = Biome.Lake;
    isPredator = false;
    needWater = true;
}

class Volyer {
    readonly id: number;
    readonly area: number;
    readonly biome: Biome;
    readonly hasWater: boolean;
    animalsInVolyer: Array<Animal> = [];

    constructor(id: number, area: number, biome: Biome, hasWater: boolean) {
        this.id = id;
        this.area = area;
        this.biome = biome;
        this.hasWater = hasWater; 
    }

    addAnimal(animal: Animal): void {
        if(!this.checkBiom(animal)) {
            console.log(`Only for animals from: ${this.biome}`);
        } else if(!this.checkWater(animal)) {
            console.log(`${animal.name} need water, but volyer doesn't have it`);
        } else if(!this.checkPredators(animal)) {
            console.log(`There are some predators in volyer`);
        } else if (!this.checkEnoughSpace(animal)) {
            console.log((`There is not enough space in volyer for animals`));
        } else {
            this.animalsInVolyer.push(animal);
        }
    }

    private checkBiom(animal: Animal) {
        return this.biome == animal.biome;
    }

    private checkWater(animal: Animal) {
        return this.hasWater && animal.needWater;
    }

    private checkEnoughSpace(animal: Animal) {
        return this.freeArea() >= animal.neededArea;
    }

    // TODO
    private checkPredators(animal: Animal){       
        return true;
    }


    freeArea():number {
        let areaForAnimals = 0;
        if (this.animalsInVolyer.length != 0){
            areaForAnimals = this.animalsInVolyer.map(x => x.neededArea).reduce((sum, curr) => sum + curr);
        } 
        let freeArea = this.area - areaForAnimals;
        return freeArea;
    }

    returnInfo(): string {
        let info = `Volyer with id: ${this.id}, biome: ${this.biome}, nominal area: ${this.area}, free area: ${this.freeArea()}, water: ${this.hasWater}, animals: ${this.animalsInVolyer}`;
        return info;
    } 
}



let firstVolyer = new Volyer(1, 10, Biome.Jungle, true);
let lion1 = new Lion('Lev', 5, 5);
let lion2 = new Lion('Lev', 5, 5);
let firstMonkey = new Monkey('Lala', 1, 1);
console.log(firstVolyer.returnInfo());
console.log(firstVolyer.freeArea());
console.log(firstMonkey.returnInfo());
firstVolyer.addAnimal(lion1);
firstVolyer.addAnimal(lion2);
firstVolyer.addAnimal(firstMonkey);

console.log(firstVolyer.returnInfo());
console.log(firstVolyer.freeArea());
