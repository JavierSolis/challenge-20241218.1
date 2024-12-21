function getPair(m,n, groupSize = 2){
    /*
   Se recorre cada item, se retorna el primero que coincida con la suma
   Se dejo una variable groupSize en caso se requiera no un grupo de 2, sino un grupo N, en ese caso
  se debería plantear hacerlo recursivo
    */
    for (let i1 = 0; i1 < m.length; i1++) {
      const val1 = m[i1];
      for (let i2 = i1+1; i2 < m.length; i2++) {
        const val2 = m[i2];
        if(val1+val2==n){
            return [val1,val2];
        }
      }
    }
    return [];
  }
  
  describe('Test Suite', async () => {    
    //casos basicos
    await it('unico resultado posible', async () => {   
      expect(getPair([1,2],3)).to.equal([1,2]); 
    });
    await it('primer resultado posible', async () => {  
      expect(getPair([1,2,3,4,5,6],7)).to.equal([1,6]);  
    });
    //vacios
    await it('dado un conjunto se espera solución vacía', async () => { 
      expect(getPair([1,100,10],3)).to.equal([]); 
    });
    await it('dado un conjunto vacío se espera solución vacía', async () => { 
      expect(getPair([],3)).to.equal([]);  
    });
    //casos negativos
    await it('dado un conjunto y N cero, se espera solución de positivo y negativo', async () => { 
      expect(getPair([-1,-3,5,1,100,-3,10],0)).to.equal([-1,1]); 
    });
    
  });