import { Item, GildedRose } from "../app/gilded-rose";

var assert = require('assert');

describe('GildedRose', function () {
  describe('basics', function () {

    it('UpdateQuality degrades sellIn 1',function(){
      const item = {name:"random name", sellIn:3, quality:4} as Item;
      const gildedRose = new GildedRose([item]);
      gildedRose.updateQuality();
      assert.equal(gildedRose.items[0].sellIn,2);
    });

    it('Once the sell by date has passed, Quality degrades twice as fast',function(){
      const item = {name:"random name", sellIn:1, quality:4} as Item;
      const gildedRose = new GildedRose([item]);
      gildedRose.updateQuality();
      assert.equal(gildedRose.items[0].sellIn,0,'no disminuyo en 1 la 1ra vez');
      assert.equal(gildedRose.items[0].quality,3, 'no disminuyo en 1');
      
      gildedRose.updateQuality();
      assert.equal(gildedRose.items[0].sellIn,-1,'no disminuyo en 1 la 2da vez');
      assert.equal(gildedRose.items[0].quality,1,'no disminuyo en 2');
    });

    it('The Quality of an item is never negative', function () {
      const item = {name:"random name", sellIn:1, quality:0} as Item;
      const gildedRose = new GildedRose([ item ]);
      gildedRose.updateQuality();
      gildedRose.updateQuality();
      assert.ok(gildedRose.items[0].quality>=0);
    });

    it('The Quality of an item is never negative, extreme case Zero SellIn and One Quality', function () {
      const item = {name:"random name", sellIn:0, quality:1} as Item;
      const gildedRose = new GildedRose([ item ]);
      gildedRose.updateQuality();
      gildedRose.updateQuality();
      assert.ok(gildedRose.items[0].quality>=0);
    });
    

    it('"Aged Brie" actually increases in Quality the older it gets', function () {
      const item = {name:"Aged Brie", sellIn:3, quality:2} as Item;
      const gildedRose = new GildedRose([ item ]);
      gildedRose.updateQuality();
      assert.equal(gildedRose.items[0].quality,3);
    })

    it('"Aged Brie" actually increases in Quality the older it gets, twice fast', function () {
      const item = {name:"Aged Brie", sellIn:0, quality:2} as Item;
      const gildedRose = new GildedRose([ item ]);
      gildedRose.updateQuality();
      assert.equal(gildedRose.items[0].quality,4);
    })

    it('The Quality of an item is never more than 50 ( ex Aged Brie )', function () {
      const item = {name:"Aged Brie", sellIn:0, quality:50} as Item;
      const gildedRose = new GildedRose([ item ]);
      gildedRose.updateQuality();
      assert.equal(gildedRose.items[0].quality,50);
    })
    
    it('The Quality of an item is never more than 50 ( ex Aged Brie whit negative sellIn )', function () {
      const item = {name:"Aged Brie", sellIn:-2, quality:49} as Item;
      const gildedRose = new GildedRose([ item ]);
      gildedRose.updateQuality();
      assert.equal(gildedRose.items[0].quality,50);
    })

    it('"Sulfuras"( failed, changed of code: \'Sulfuras, Hand of Ragnaros\' ), being a legendary item, never has to be sold or decreases in Quality', function () {
      //aqui el test fallo, segun el codigo el nombre es 'Sulfuras, Hand of Ragnaros'
      const item = {name:"Sulfuras, Hand of Ragnaros", sellIn:1, quality:80} as Item;
      const gildedRose = new GildedRose([ item ]);
      gildedRose.updateQuality();
      assert.equal(gildedRose.items[0].quality,80,'1st attempt');
      gildedRose.updateQuality();
      assert.equal(gildedRose.items[0].quality,80,'2nd attempt');
    })

    describe('"Backstage passes", like aged brie, increases in Quality as its SellIn value approaches',function(){
      //aqui el test fallo, segun el codigo el nombre es
      const nameBackstage = 'Backstage passes to a TAFKAL80ETC concert';

      it('Quality increases by 2 when there are beetwen 10 and 5 days (not included) ', function () {
        const item = {name:nameBackstage, sellIn:10, quality:10} as Item;
        const gildedRose = new GildedRose([ item ]);
        gildedRose.updateQuality();
        assert.equal(gildedRose.items[0].quality,12);
        gildedRose.updateQuality();
        assert.equal(gildedRose.items[0].quality,14);
      })

      it('Quality increases by 3 when there are beetwen 5 and 0 days (included)', function () {
        const item = {name:nameBackstage, sellIn:5, quality:20} as Item;
        const gildedRose = new GildedRose([ item ]);
        gildedRose.updateQuality();
        assert.equal(gildedRose.items[0].quality,23,'1st attempt');
        gildedRose.updateQuality();
        assert.equal(gildedRose.items[0].quality,26,'2nd attempt');
      })

      it('Quality drops to 0 after the concert', function () {
        const item = {name:nameBackstage, sellIn:1, quality:20} as Item;
        const gildedRose = new GildedRose([ item ]);
        gildedRose.updateQuality();
        assert.ok(gildedRose.items[0].quality>0,'1st attempt');
        gildedRose.updateQuality();
        assert.equal(gildedRose.items[0].quality,0,'2nd attempt');
      })
    });

  });
});