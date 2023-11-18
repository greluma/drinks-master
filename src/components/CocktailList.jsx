import Wrapper from "../assets/wrappers/CocktailList";
import CocktailCard from "./CocktailCard";

const CocktailList = ({ drinks }) => {
  if (!drinks) {
    return <h4 style={{ textAlign: 'center' }}>No matching cocktails found...</h4>
  }

  const formattedDrinks = drinks.map(item => {
    const { idDrink: id, strDrink: name, strDrinkThumb: image, strAlcoholic: info, strGlass: glass } = item
    return { id, name, image, info, glass }
  })

  return <Wrapper>{formattedDrinks.map(drink => {
    return <CocktailCard {...drink} key={drink.id}></CocktailCard>
  })}</Wrapper>

}
export default CocktailList