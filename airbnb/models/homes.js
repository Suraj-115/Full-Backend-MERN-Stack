

const registeredHomes = [];

module.exports = class Home {
  constructor(houseName, price, location, image){
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.image = image;
  }
  save(){
    registeredHomes.push(this);
  }
  static fetchAll(){
    return registeredHomes;
  }
}