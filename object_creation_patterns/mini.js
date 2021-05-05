'use strict';

/*
ItemCreator
  ensure all items are valid

ItemManager
  creating items,
    updating info
    deleting
    query info

ReportManager
  generate reports for:
    specific or All items

Report objects
*/

var ItemCreator = (function () {
  const removeSpace = (text) => text.replace(/\s+/g, '');
  const generateSkuCode = (name, category) => (
    removeSpace(name).slice(0, 3).toUpperCase() +
    removeSpace(category).slice(0, 2).toUpperCase()
  );
  const has5PlusChars = (name) => removeSpace(name).length >= 5;
  const isValidItemName = (name) => has5PlusChars(name);
  const isValidCategory = (categ) => (
    has5PlusChars(categ) && categ.split(/\s+/).length === 1
  );
  const isQuantityProvided = (num) => num === Number(num);

  return function (itemName, category, quantity) {
    if (
      isValidItemName(itemName)
      && isValidCategory(category)
      && isQuantityProvided(quantity)
    ) {
      this.skuCode = generateSkuCode(itemName, category);
      this.itemName = itemName;
      this.category = category;
      this.quantity = quantity;
    } else {
      return { notValid: true };
    }
  };
})();

var ItemManager = (function () {
  return {
    items: [],

    create(itemName, category, quantity) {
      let item = new ItemCreator(itemName, category, quantity);
      if (item.notValid) return false;

      this.items.push(item);
    },

    find(skuCode) {
      return this.items.find(item => item.skuCode === skuCode);
    },

    update(skuCode, properties) {
      Object.assign(this.find(skuCode), properties);
    },

    delete(skuCode) {
      let index = this.items.findIndex(item => item.skuCode === skuCode);
      this.items.splice(index, 1);
    },

    inStock() {
      return this.items.filter(item => item.quantity >= 0);
    },

    itemsInCategory(category) {
      return this.items.filter(item => item.category === category);
    },
  };
})();

var ReportManager = (function () {
  return {
    init(itemManager) {
      this.items = ItemManager;
    },

    createReporter(skuCode) {
      let item = this.items.find(skuCode);
      return {
        itemInfo() {
          for(let [key, val] of Object.entries(item)) {
            console.log(key + ':' + val);
          };
        },
      };
    },

    reportInStock() {
      let report = this.items.items.map(item => item.itemName).join(', ');
      console.log(report);
    },
  };
})();

console.log(new ItemCreator('basdfadaaaaaa', 'aaaaa', 0));
console.log(new ItemCreator('basdfadaaaaaa', 'aaaaa'));
console.log(new ItemCreator('basdfadaaaaaa', 'aaaa', 0));
console.log(new ItemCreator('bs ds', 'aaaaa', 0));

console.log('.................................');

console.log(ItemManager.create('basket ball', 'sports', 0));           // valid item
console.log(ItemManager.create('asd', 'sports', 0));
console.log(ItemManager.create('soccer ball', 'sports', 5));           // valid item
console.log(ItemManager.create('football', 'sports'));
console.log(ItemManager.create('football', 'sports', 3));              // valid item
console.log(ItemManager.create('kitchen pot', 'cooking items', 0));
console.log(ItemManager.create('kitchen pot', 'cooking', 3));          // valid item
console.log(ItemManager.items);
// returns list with the 4 valid items

console.log('.................................');

//*
ReportManager.init(ItemManager);
ReportManager.reportInStock();
// logs soccer ball,football,kitchen pot

ItemManager.update('SOCSP', { quantity: 0 });
ItemManager.inStock();
// returns list with the item objects for football and kitchen pot
ReportManager.reportInStock();
// logs football,kitchen pot
ItemManager.itemsInCategory('sports');
// returns list with the item objects for basket ball, soccer ball, and football
ItemManager.delete('SOCSP');
ItemManager.items;
// returns list with the remaining 3 valid items (soccer ball is removed from the list)

var kitchenPotReporter = ReportManager.createReporter('KITCO');
kitchenPotReporter.itemInfo();
// logs
// skuCode: KITCO
// itemName: kitchen pot
// category: cooking
// quantity: 3

ItemManager.update('KITCO', { quantity: 10 });
kitchenPotReporter.itemInfo();
// logs
// skuCode: KITCO
// itemName: kitchen pot
// category: cooking
// quantity: 10

var bar = {};
var qux = Object.create(bar);
var foo = Object.create(qux)


/*
*/
