import { GildedRose } from "../app/gilded-rose-new";
import * as Models from "../app/gilded-rose-new";

var assert = require('assert');

describe('GildedRose NEW', function () {

    it('UpdateQuality degrades sellIn 1',function(){
      const item = new Models.NormalItem("random name",3,4);
    
      const gildedRose = new GildedRose([item]);
      gildedRose.updateQuality();
      assert.equal(gildedRose.items[0].sellIn,2);
    });

    
    it('Once the sell by date has passed, Quality degrades twice as fast',function(){
      const item = new Models.NormalItem("random name",1, 4)
      const gildedRose = new GildedRose([item]);
      gildedRose.updateQuality();
      assert.equal(gildedRose.items[0].sellIn,0,'no disminuyo en 1 la 1ra vez');
      assert.equal(gildedRose.items[0].quality,3, 'no disminuyo en 1');
      
      gildedRose.updateQuality();
      assert.equal(gildedRose.items[0].sellIn,-1,'no disminuyo en 1 la 2da vez');
      assert.equal(gildedRose.items[0].quality,1,'no disminuyo en 2');
    });

    
    it('The Quality of an item is never negative', function () {
      const item = new Models.NormalItem("random name",1, 0);
      const gildedRose = new GildedRose([ item ]);
      gildedRose.updateQuality();
      gildedRose.updateQuality();
      assert.ok(gildedRose.items[0].quality>=0);
    });
  
    it('The Quality of an item is never negative, extreme case Zero SellIn and One Quality', function () {
      const item = new Models.NormalItem("random name",0, 1);
      const gildedRose = new GildedRose([ item ]);
      gildedRose.updateQuality();
      gildedRose.updateQuality();
      assert.ok(gildedRose.items[0].quality>=0);
    });

    it('The Quality of an item is never negative, case Conjure', function () {
      const item = new Models.Conjured("random name",0, 1);
      const gildedRose = new GildedRose([ item ]);
      gildedRose.updateQuality();
      gildedRose.updateQuality();
      assert.ok(gildedRose.items[0].quality>=0);
    });

    it('"Aged Brie" actually increases in Quality the older it gets', function () {
      const item = new Models.AgedBrieItem("Aged Brie",3, 2);
      const gildedRose = new GildedRose([ item ]);
      gildedRose.updateQuality();
      assert.equal(gildedRose.items[0].quality,3);
    })

    it('"Aged Brie" actually increases in Quality the older it gets, twice fast', function () {
      const item = new Models.AgedBrieItem("Aged Brie",0, 2);
      const gildedRose = new GildedRose([ item ]);
      gildedRose.updateQuality();
      assert.equal(gildedRose.items[0].quality,4);
    })

    it('The Quality of an item is never more than 50 ( ex Aged Brie )', function () {
      const item = new Models.AgedBrieItem("Aged Brie",0, 50);
      const gildedRose = new GildedRose([ item ]);
      gildedRose.updateQuality();
      assert.equal(gildedRose.items[0].quality,50);
    })
    
    it('The Quality of an item is never more than 50 ( ex Aged Brie whit negative sellIn )', function () {
      const item = new Models.AgedBrieItem("Aged Brie",-2, 49);
      const gildedRose = new GildedRose([ item ]);
      gildedRose.updateQuality();
      assert.equal(gildedRose.items[0].quality,50);
    })

    it('The Quality of an item is never more than 50 ( ex BackstagePasses case limit quality 49 )', function () {
      const item = new Models.BackstagePasses("Backstage passes to a TAFKAL80ETC concert",10, 49);
      const gildedRose = new GildedRose([ item ]);
      gildedRose.updateQuality();
      gildedRose.updateQuality();
      assert.equal(gildedRose.items[0].quality,50);
    })

    

    it('"Sulfuras"( failed, changed of code: \'Sulfuras, Hand of Ragnaros\' ), being a legendary item, never has to be sold or decreases in Quality', function () {
      //aqui el test fallo, segun el codigo el nombre es 'Sulfuras, Hand of Ragnaros'
      const item = new Models.Sulfuras("Sulfuras, Hand of Ragnaros",1,80);
      const gildedRose = new GildedRose([ item ]);
      gildedRose.updateQuality();
      assert.equal(gildedRose.items[0].quality,80,'1st attempt');
      gildedRose.updateQuality();
      assert.equal(gildedRose.items[0].quality,80,'2nd attempt');
    })

    it('"Sulfuras" is ever Quality 80', function () {
      //aqui el test fallo, segun el codigo el nombre es 'Sulfuras, Hand of Ragnaros'
      const item = new Models.Sulfuras("Sulfuras, Hand of Ragnaros",1,0);
      assert.equal(item.quality,80);
    })

    describe('"Backstage passes", like aged brie, increases in Quality as its SellIn value approaches',function(){
      //aqui el test fallo, segun el codigo el nombre es
      const nameBackstage = 'Backstage passes to a TAFKAL80ETC concert';

      it('Quality increases by 2 when there are beetwen 10 and 5 days (not included) ', function () {
        const item = new Models.BackstagePasses(nameBackstage,10, 10);
        const gildedRose = new GildedRose([ item ]);
        gildedRose.updateQuality();
        assert.equal(gildedRose.items[0].quality,12);
        gildedRose.updateQuality();
        assert.equal(gildedRose.items[0].quality,14);
      })

      it('Quality increases by 3 when there are beetwen 5 and 0 days (included)', function () {
        const item = new Models.BackstagePasses(nameBackstage,5, 20);
        const gildedRose = new GildedRose([ item ]);
        gildedRose.updateQuality();
        assert.equal(gildedRose.items[0].quality,23,'1st attempt');
        gildedRose.updateQuality();
        assert.equal(gildedRose.items[0].quality,26,'2nd attempt');
      })

      it('Quality drops to 0 after the concert', function () {
        const item = new Models.BackstagePasses(nameBackstage,1, 20);
        
        const gildedRose = new GildedRose([ item ]);
        gildedRose.updateQuality();
        assert.ok(gildedRose.items[0].quality>0,'1st attempt');
        gildedRose.updateQuality();
        assert.equal(gildedRose.items[0].quality,0,'2nd attempt');
      })
    });
    

});