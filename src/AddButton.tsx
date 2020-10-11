import React, { useEffect, useState } from 'react'
import IProduct from './Interfaces';

interface AddButtonProps {
    products: IProduct[],
}

const AddButton: React.FC<AddButtonProps> = ( { products } ) => {
    const [ productList, setProductList ] = useState<IProduct[]>([])
    const [ update, setUpdate ] = useState(false)
    const [ isTotal, setIsTotal ] = useState(false)

    // Keeps track of the total component
    useEffect(() => {
        if (total === 0 && totalItems === 0) {
            setIsTotal(false)
        }
        console.log(productList)
      }, [ productList ]);

    // Keeps track of the total and total amount of items
    let total = 0 
    for ( const i of productList ){
        total = total + i['count']*i['price']
    }

    let totalItems = 0
    for ( const i of productList ){
        totalItems = totalItems + i['count']
    }
  
    return (
    <>
        { products.map( (p) => {
        return(
        <button className="addbutton" type="button" onClick={
            ( e: React.MouseEvent<HTMLElement> ) => {
                e.preventDefault();
                setIsTotal(true)                            
                if (productList.map(i => i.id).includes(p.id)){
                        const item = productList.find(i => i.id === p.id) 
                        if ( item !== undefined) {
                            item['count'] = item['count']+1
                            setUpdate(!update)                            
                        }
                } else {
                        const n = [...productList, p]
                        setProductList(n);
                };}
        }          
            key={p.id}>Click to add your {p.fruit} for ${p.price}</button>
        )
        })}

        {
        productList.map( p => {
         return (
        <>
         <ul>
            <li>Fruit: {p.fruit} Price: ${p.price} Amount: {p.count} Total: ${p.price*p.count}
                
                
            </li>
            <button type="button" onClick={ 
                ( e: React.MouseEvent<HTMLElement> ) => {
                    console.log(e)
                    const n = productList.filter(i => i.id !== p.id);
                    console.log(n)
                    setProductList(n);
                    console.log(productList)
                    if ( productList.length == 0) {
                        setIsTotal(false)
                        console.log("Setting False")}
                }
            }  >Delete</button>
            
        </ul>

        </>
         )})}

        { isTotal && <h5>You have {totalItems} item/s. Your total is: ${total}</h5> }
        

    </>
    )
};

export default AddButton;
