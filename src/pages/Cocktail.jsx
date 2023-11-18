import axios from "axios"
import { useLoaderData, Link, Navigate } from "react-router-dom"
import Wrapper from "../assets/wrappers/CocktailPage"

const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='

export const loader = async ({ params }) => {
    const { id } = params
    let drink;
    const response = await axios(`${url}${id}`)
    if (!response?.data?.drinks) {
        return { id, drink }
    }
    drink = response.data.drinks[0]
    return { id, drink }
}

const Cocktail = () => {
    const { id, drink } = useLoaderData()
    if (!drink) {
        return <Navigate to='/'></Navigate>
    }
    const { strDrink: name, strDrinkThumb: image, strAlcoholic: info, strCategory: category, strGlass: glass, strInstructions: instructions } = drink


    const ingredients = () => {
        let list = []
        for (let index = 1; index != 11; index++) {
            let ing = drink[`strIngredient${index}`]
            ing ? list.push(ing) : null
        }
        return list
    }

    return (
        <Wrapper>
            <header>
                <Link to='/' className="btn">back home</Link>
                <h3>{name}</h3>
            </header>
            <div className="drink">
                <img src={image} alt={name} className="img" />
                <div className="drink-info">
                    <p>
                        <span className="drink-data">name :</span>
                        {name}
                    </p>
                    <p>
                        <span className="drink-data">category :</span>
                        {category}
                    </p>
                    <p>
                        <span className="drink-data">info :</span>
                        {info}
                    </p>
                    <p>
                        <span className="drink-data">glass :</span>
                        {glass}
                    </p>
                    <p>
                        <span className="drink-data">instructions :</span>
                        {instructions}
                    </p>
                    <div className="ingredients">
                        <span className="drink-data">ingredients :</span>
                        <ul>
                            {ingredients().length > 0 ? ingredients().map((item, index) => {
                                return <li key={index}>
                                    {`${index + 1}: ${item} `}
                                </li>
                            }) : <li>Sorry, No ingredients available...</li>}
                        </ul>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}
export default Cocktail