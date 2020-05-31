import React, {useState} from 'react'
import './FoodCard.css'

const FoodCard = ({title, qty, exp, name, contact, isYours, category}) => {

    const [isDespensa, setIsDespensa] =  useState(false)
    const [isVegetales, setIsVegetales] =  useState(false)
    const [isFrescos, setIsFrescos] =  useState(false)
    const [isCarnes, setIsCarnes] =  useState(false)
    const [isOtros, setIsOtros] =  useState(false)


    React.useEffect(() => {
        const catergoryImg = () => {
            switch(category) {
                case 'Despensa':
                  return setIsDespensa(true);
                case 'Frutas y Vegetales':
                  return setIsVegetales(true);
                case 'Frescos y Lácteos':
                    return setIsFrescos(true);
                case 'Carnes':
                    return setIsCarnes(true);
                default:
                  return setIsOtros(true);
            }
        }
        catergoryImg()
        }, [])

    return (
        <div className='foodCard'>
            {isYours && <span className='closeCard'>&times;</span>}
            <div className='contentCard'>
                {isDespensa && <img className='imgCard' src={require('../../img/canned-food.png')} alt="Categoría Despensa"/> }
                {isVegetales && <img className='imgCard' src={require('../../img/vegetable.png')} alt=" Categoría Frutas y vegetales"/> }
                {isFrescos && <img className='imgCard' src={require('../../img/milk.png')} alt=" Categoría Frescos y Lácteos"/> }
                {isCarnes && <img className='imgCard' src={require('../../img/meat.png')} alt=" Categoría Carnes"/> }
                {isOtros && <img className='imgCard' src={require('../../img/cake-pop.png')} alt=" Categoría Otros"/> }
                <div className='textCard'>
                    <h2>{title}</h2>
                    <div className='detailsFood'>
                        <span><b>Cant:</b> {qty}</span>
                        <span><b>Vence:</b> {exp}</span>
                    </div>
                    <span className='subTextCard'><b>Donado por:</b> {name}</span>
                    <span className='subTextCard'><b>Contacto:</b> {contact}</span>
                    <span className='subTextCard'><b>Categoría:</b> {category}</span>       
                </div>
            </div>
        </div>
    )
}

export default FoodCard