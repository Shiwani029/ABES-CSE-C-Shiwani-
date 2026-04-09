function Animal(name) {
    if(!new.target) {
        throw new Error("it shoud be called with new keyword")
    }
    this.name=name;

}
let dog=new Animal(bark);
let cat=Animal(meow)

