import React, { useState } from 'react';
import AddButton from './AddButton';
import './App.css';
import IProduct from './Interfaces'

const App: React.FC = ( ) =>  {
  const [ value, setValue ] = useState("")
  const [ firstObject, setFirstObject ] = useState<Array<string|number>>([])
  const [ products, setProducts ] = useState<IProduct[]>([])


  const handleProducts = (e: React.ChangeEvent<HTMLInputElement>) => {

    // Receiving input 
    setValue(e.target.value)

    // Creating array of fruits and prices 

    const value2 = value.split(',')
    const fruits:Array<string> = []
    const prices:Array<string> = []

    console.log(fruits)

    value2.forEach ( e => {
      if (parseFloat(e)){
        prices.push(e)
        console.log(e)
      }
      else {
        fruits.push(e)
      }
    })

    // Eliminating blank spaces

    const fruitsStr:Array<string> = []
    fruits.forEach( e => 
      fruitsStr.push(e.trim()))
      
    // Parsing while keeping decimals

    const pricesNum:Array<number> = []
    prices.forEach ( e => {
      const n:number = parseFloat(e)
      pricesNum.push(n)
    console.log(n)})

    // Creating Object
 
    const firstObj = Object.assign(fruitsStr.map((f, i) => ({[f]: pricesNum[i]})))
    console.log(firstObj)
    setFirstObject(firstObj)

    // Creating Array of Objects

    var defProducts = firstObject.map( (p, index) => ({ id: index, fruit: Object.keys(p).toString(), price: parseFloat(Object.values(p)[0]), count:1 }));
    console.log(defProducts)
    setProducts(defProducts)
    }  
  
    
  return (
    <div className="App">

        {/* Form */ }
    <form>
          <h4>Please write your list! Make sure to write it this way: "fruit, price,"</h4>
          <input value={value} placeholder="Enter your list" onChange={handleProducts}/>
          <AddButton products={products} />
    </form>

    </div>

  );
}

export default App;
