import RemoveIngredientbutton from './RemoveIngredientbutton.jsx';

export default function Ingredients(props){
    return (
        <>
             <ul className="p-5 flex flex-wrap-reverse justify-center space-y-2">
        {props.ingredientList.map((ingredient) => (
          <li
            key={ingredient}
            className="bg-white p-3 rounded-lg shadow-md border border-gray-200 
                     hover:shadow-lg transition-all duration-200 
                     flex items-center space-x-2 text-gray-700
                     hover:scale-102 hover:bg-gray-50"
          >
            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
            <span className="font-medium capitalize">{ingredient}</span>
            <RemoveIngredientbutton ingredient={ingredient} onRemove={props.onRemove} />
          </li>
        ))}
      </ul>
        </>
    )
}