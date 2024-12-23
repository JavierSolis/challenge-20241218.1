# Table of Contents  

[Solution](#solution)  
[Problem](#problem)  



<a name="solution"/>

# Solution

- Se creó un contenedor para poder ejecutar o poder replicarlo independientemento.
- Se separó las responsabilidades en clases hijo de item.
- Se refactorizó aplicando cada caso especial encontrado en ambas clases para asegurar que funcionen igual.


## Comandos utiles

*estando en la carpeta game-02

```

docker compose up --build -d
docker exec -it game-02-app-1 bash
#correr las pruebas dentro del contenedor
npx mocha

```

## Referencias:

Tutorial de docker
https://www.youtube.com/watch?v=AquOM-ISsnA&list=PLQhxXeq1oc2n7YnjRhq7qVMzZWtDY7Zz0

Tips de refactoring
https://www.linkedin.com/in/xurxodev/

Basico de ts
https://www.typescriptlang.org/docs/handbook/basic-types.html
https://www.typescriptlang.org/docs/handbook/2/classes.html

Test con mocha
https://mochajs.org/

Assert para las pruebas
https://nodejs.org/api/assert.html


<a name="problem"/>

# Problem

# Gilded Rose Requirements Specification

## What we need?

- Refactor the terrible code: `app/gilded-rose.ts`

## Rules and new requirement

Hi and welcome to team Gilded Rose. As you know, we are a small inn with a prime location in a
prominent city ran by a friendly innkeeper named Allison. We also buy and sell only the finest goods.
Unfortunately, our goods are constantly degrading in quality as they approach their sell by date. We
have a system in place that updates our inventory for us. It was developed by a no-nonsense type named
Leeroy, who has moved on to new adventures. Your task is to add the new feature to our system so that
we can begin selling a new category of items. First an introduction to our system:

- All items have a SellIn value which denotes the number of days we have to sell the item
- All items have a Quality value which denotes how valuable the item is
- At the end of each day our system lowers both values for every item

Pretty simple, right? Well this is where it gets interesting:
- Once the sell by date has passed, Quality degrades twice as fast
- The Quality of an item is never negative
- "Aged Brie" actually increases in Quality the older it gets
- The Quality of an item is never more than 50
- "Sulfuras", being a legendary item, never has to be sold or decreases in Quality
- "Backstage passes", like aged brie, increases in Quality as its SellIn value approaches;
	
    Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but
	Quality drops to 0 after the concert

We have recently signed a supplier of conjured items. This requires an update to our system:

- "Conjured" items degrade in Quality twice as fast as normal items

Feel free to make any changes to the UpdateQuality method and add any new code as long as everything
still works correctly. However, do not alter the Item class or Items property as those belong to the
goblin in the corner who will insta-rage and one-shot you as he doesn't believe in shared code
ownership (you can make the UpdateQuality method and Items property static if you like, we'll cover
for you).

Just for clarification, an item can never have its Quality increase above 50, however "Sulfuras" is a
legendary item and as such its Quality is 80 and it never alters.
