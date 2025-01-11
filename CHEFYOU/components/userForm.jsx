// import { useState } from "react";
// import Ingredients from "./ingredients";

export default function Form(props) {
  // const [ingredients, setIngredients] = useState([
  //   "salt",
  //   "sugar",
  //   "pepper",
  //   "chilli",
  //   "ginger",
  // ]);
//form se data lene FormData(event.currentTarget) bo element mil and
//then uska name se value get karke set kar diya If inputbox hai to name attribute se value get karenge
 //se uspe jo data hai submit hone pr mil jayega
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const formData = new FormData(e.currentTarget);
  //   const newIngredient = formData.get("inputIngredient");//input box ka name attribute se value get kiya

  //   if (newIngredient) {
  //     setIngredients([...ingredients, newIngredient]);
  //     console.log(ingredients);
  //     e.target.reset(); // Clear the form
  //   }
  // };
  return (
    <div>
      <div className="mt-10 flex justify-center">
        <form
          onSubmit={props.handleSubmit}
          className="form p-6 rounded-lg shadow-md w-full mx-20 border-2 border-gray-300"
        >
          <h2 className="addbutton text-2xl font-semibold text-center text-black mb-4">
            Add Ingredients
          </h2>
          <div className="flex space-x-1">
            <input
              type="text"
              name="inputIngredient"
              id="input"
              placeholder="e.g. oregano"
              aria-label="Add ingredients"
              className="flex-grow p-4 border border-black rounded-l-lg focus:outline-none focus:ring-2 focus:ring-red-900"
            />
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded-r-lg hover:bg-red-900 transition duration-200"
            >
              + Add Ingredients
            </button>
          </div>
        </form>
      </div>
      {/* <h2 className="text-2xl font-semibold text-center text-black mt-10 mb-4">
        Ingredients On Hand : </h2> */}
        {/* <Ingredients /> */}
      {/* <ul className="p-5 flex flex-wrap-reverse justify-center space-y-2">
        {ingredients.map((ingredient) => (
          <li
            key={ingredient}
            className="bg-white p-3 rounded-lg shadow-md border border-gray-200 
                     hover:shadow-lg transition-all duration-200 
                     flex items-center space-x-2 text-gray-700
                     hover:scale-102 hover:bg-gray-50"
          >
            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
            <span className="font-medium capitalize">{ingredient}</span>
          </li>
        ))}
      </ul> */}
     
    </div>
  );
}

