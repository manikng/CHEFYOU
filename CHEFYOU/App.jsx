import Header from "./components/myHeader";
// import form from "./components/form" // form❌ should be Form✅
import Form from "./components/userForm";
import Ingredients from "./components/ingredients";
import GetRecipe from "./components/Getrecipe";
import { useState, useRef, useEffect } from "react";
import { getRecipeFromT5, getRecipeFromMistral, RecipeImg } from "./ai";
import HuggingfaceRecipe from "./components/Huggingface";
import { getRecipeFromGemini } from "./ai";



export default function App() {
  const [ingredients, setIngredients] = useState([
    "salt",
    "sugar",
    "pepper",
    "chilli",
    "ginger",
  ]);
  const [response, setResponse] = useState("");
  const [recipeImg, setRecipeImg] = useState("");
  const [generating, setGenerating] = useState(false);
  const [imageGenerating, setimageGenerating] = useState(false);
  const [showSecondMessage, setShowSecondMessage] = useState(false);
  const [abortController, setAbortController] = useState(null);

  function handleSubmit(e) {
    console.log(" handlesubmit is click");
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newIngredient = formData.get("inputIngredient"); //input box ka name attribute se value get kiya

    if (newIngredient) {
      setIngredients([...ingredients, newIngredient]);
      console.log(ingredients);
      e.target.reset(); // Clear the form
    }
  }
  // auto scroll : IT IS AUTO SCROLL IS NOT WORKING 
  const recipeSection = useRef(null);
  useEffect(() => {
    if (response !== "" &&  recipeSection.current) {
      recipeSection.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [response, generating]);

  useEffect(() => {
    if (imageGenerating && !recipeImg) {
      const timer = setTimeout(() => {
        setShowSecondMessage(true);
      }, 2000); // Show second message after 2 seconds
      return () => clearTimeout(timer);
    } else {
      setShowSecondMessage(false);
    }
  }, [imageGenerating, recipeImg]);

  async function getRecipe() {
    if (abortController) {
      abortController.abort(); // Cancel any pending requests
    }

    const newAbortController = new AbortController();
    setAbortController(newAbortController);

    setResponse("");
    setRecipeImg("");
    setGenerating(true); // Set loading state
    try {
      const apiResponse = await getRecipeFromT5(ingredients, { signal: newAbortController.signal });
      console.log("t5 bali recipe :", apiResponse); // Log the full response for debugging
      
      if (apiResponse && apiResponse.length > 0) {
        // Access generated_text safely
        const recipeText = apiResponse[0].generated_text;
        console.log("this is recipe text :", recipeText); // Log the generated recipe text
        const mistralRecipe = await getRecipeFromMistral([recipeText], { signal: newAbortController.signal });
        console.log("the mistral neo recipe:", mistralRecipe);
        
        setResponse(mistralRecipe); // Store the recipe text in state
        
        setimageGenerating(true);
        // Extract the title of the recipe for image generation
        const title = recipeText.split('\n')[0];
        const imgUrl = await RecipeImg({ inputs: title }, { signal: newAbortController.signal });
        console.log(imgUrl);
        setRecipeImg(imgUrl);
        setimageGenerating(false);
      } else {
        console.error("No valid recipe generated.");
        setResponse("No recipe generated."); // Handle case where no recipe is returned
      }
    } catch (err) {
      if (err.name === 'AbortError') {
        console.log("Request was aborted");
      } else {
        console.log("Error fetching recipe:", err);
        setResponse("An error occurred while fetching the recipe."); // User-friendly error message
      }
    }
    setGenerating(false);
  }

  //getrecipefromgeminiapi

  async function getrecipefromgeminiapi() {
    setResponse("");
    setRecipeImg("");
    setGenerating(true);
    try {
      const apiResponse = await getRecipeFromGemini(ingredients);
      console.log("Gemini apiresponse :", apiResponse);
      if (apiResponse && apiResponse.length > 0) {
        const recipeText = apiResponse;//gemini ek string of markdown return kr rha hai so direct use nhi to err ya nul
        console.log("this is recipe text:", recipeText);
        setResponse(recipeText);
        //FOR IMAGE
        setimageGenerating(true);
        // Extract the title of the recipe for image generation
        const title = recipeText.split('\n')[0];
        const imgUrl = await RecipeImg({ inputs: title });
        console.log("IMAGES IS GENER...");
        console.log(imgUrl);
        setRecipeImg(imgUrl);
        setimageGenerating(false);

      } else {
        console.error("No valid recipe generated.");
        setResponse(
          "Oops! No recipe generated this time. But hey, even the best chefs have off days! Give it another shot, your culinary masterpiece awaits! 🍳👨‍🍳👩‍🍳"
        );
      }
      

    } catch (error) {
      console.log("Error fetching recipe:", error);
      setResponse("An error occurred while fetching the recipe.");
    }
    setGenerating(false);
  }
  // The filter() method creates a new array filled with elements that pass a test provided by a function
  function handleRemoveIngredient(ingredientToRemove) {
    setIngredients(ingredients.filter(ingredient => ingredient !== ingredientToRemove));
  }

  return (
    <>
      <Header />
      <Form handleSubmit={handleSubmit} />
      <Ingredients ingredientList={ingredients} onRemove={handleRemoveIngredient} />
      <GetRecipe
        ingredientList={ingredients}
        getRecipefxn={getRecipe}
        getRecipeFromGemini={getrecipefromgeminiapi}
      />
      <HuggingfaceRecipe Recipe={response} Ref={recipeSection} />

      {recipeImg && (
        <div className="flex justify-center my-5">
          <img
            className="rounded-3xl object-contain max-w-full max-h-96"
            src={recipeImg}
            alt="generated"
          />
        </div>
      )}
      <div>
        {generating && !response && (
          <div className="flex justify-center items-center my-5">
            {generating && !response && (
              <div className="bg-gray-100 p-5 rounded-lg shadow-md animate-pulse text-center" ref={recipeSection}>
                <p className="text-lg font-semibold">
                  Generating Recipe 🙄😮🤨🤩...
                </p>
                <p className="text-sm text-gray-500">
                  Please wait while we cook up something special for you! 🍳👨‍🍳👩‍🍳
                </p>
              </div>
            )}
          </div>
        )}
        {/* {generating && <p className="text-center text-2xl">Generating Recipe...</p>} */}
      </div>
      {/* for image THIS IS 🤦‍♂️🤦‍♂️ FIX THE LOGIC  */}
      <div>
        {imageGenerating && !recipeImg && (
          <div className="flex justify-center items-center my-5">
              <div className="bg-gray-100 p-5 rounded-lg shadow-md animate-pulse text-center" ref={recipeSection}>
                <p className="text-lg font-semibold">
                  Generating Recipe image...
                </p>
                {showSecondMessage && (
                  <p className="text-lg font-semibold">
                    Good things take time 🕰️🍳👨‍🍳👩‍🍳...
                  </p>
                )}
              </div>
          </div>
        )}
      </div>
    </>
  );
}
