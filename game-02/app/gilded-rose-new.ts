export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }

    updateQuality(){
        throw Error("Debe usar las clases hija")
    }
}

export class NormalItem extends Item{
    updateQuality(){
        //update sellIn
        this.sellIn= this.sellIn -1;
        
        //update quality
        if(this.quality==0){
            return;
        }
        else if(this.sellIn<0){
            this.quality=this.quality-2;
        }
        else{
            this.quality=this.quality-1;
        }

        if(this.quality<0){
            this.quality = 0;
        }

    }
}

export class AgedBrieItem extends Item{
    updateQuality(){
        this.sellIn= this.sellIn -1;
        
        if(this.quality>=50){
            return;
        }
        if(this.sellIn<0){
            this.quality=this.quality+2;
        }
        else{
            this.quality=this.quality+1;
        }

        if(this.quality>50){
            this.quality = 50;
        }
    }
}

export class Sulfuras extends Item{
    constructor(name, sellIn, quality) {
        super(name,sellIn,quality);
        //quality ever is 80
        this.quality = 80
    }

    updateQuality(){
        this.sellIn= this.sellIn -1;
        //quality ever is 80
    }
}

export class BackstagePasses extends Item{
    updateQuality(){
        this.sellIn= this.sellIn -1;
        
        if(this.sellIn>10){
            this.quality = this.quality + 1
        }else if(this.sellIn <= 10 && this.sellIn>5){
            this.quality = this.quality + 2
        }else if(this.sellIn <=5 && this.sellIn>=0){
            this.quality = this.quality + 3
        }else{
            this.quality = 0;
        }

        if(this.quality>50){
            this.quality = 50;
        }
    }
}

export class Conjured extends Item{
    updateQuality(){
        //update sellIn
        this.sellIn= this.sellIn -1;
        
        //update quality
        if(this.quality==0){
            return;
        }
        else if(this.sellIn<0){
            this.quality=this.quality-4;
        }
        else{
            this.quality=this.quality-2;
        }

        if(this.quality<0){
            this.quality = 0
        }
    }
}



export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    updateQuality() {
        for (let i = 0; i < this.items.length; i++) {
            this.items[i].updateQuality()
        }
        return this.items;
    }
}
