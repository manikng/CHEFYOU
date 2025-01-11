import { HfInference } from '@huggingface/inference';
import axios from 'axios';
const SYSTEM_PROMPT = `
You are a world-class culinary expert and designer. When given a list of ingredients, your task is to create an exquisite recipe that the user can make using some or all of those ingredients. You don't need to use every ingredient they mention, but the recipe should be innovative and delightful. You may include additional ingredients not mentioned by the user, but keep them minimal and essential. Format the response beautifully in markdown, ensuring it is visually appealing and easy to render on a web page. Highlight key steps and ingredients to enhance readability and user experience.
`;

const hf = new HfInference(import.meta.env.VITE_HF_ACCESS_TOKEN);

export async function getRecipeFromT5(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ");
    console.log("ingre string which in input ai is:",ingredientsString);
    const data = {
        inputs:ingredientsString
        // inputs: "serrano peppers, garlic, celery, oregano, canola oil, vinegar, water, kosher salt, salt, black pepper"
        // inputs: `${SYSTEM_PROMPT}\nI have ${ingredientsString}. Please give me a recipe you'd recommend I make!`
    };

    try {
        const response = await fetch("https://api-inference.huggingface.co/models/flax-community/t5-recipe-generation", {
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_HF_ACCESS_TOKEN}`,
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        return result; // Return the entire result for further processing
    } catch (err) {
        console.log("Error fetching recipe:", err.message);
        return null; // Return null or handle error as needed
    }
}

export async function getRecipeFromGemini(ingredientsArr) {
    //send post req to that gemini api using axios  to response aanemai time
   try {
    const geminiResponse =  await axios({
        method: "post",
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${
            import.meta.env.VITE_GEMINI_API_KEY
        }`,
        data: {
            contents: [{ parts: [{ text: `I have ${ingredientsArr.join(", ")} You are a world-class culinary expert and designer. When given a list of ingredients, your task is to create an exquisite recipe that the user can make using some or all of those ingredients. You don't need to use every ingredient they mention, but the recipe should be innovative and delightful. You may include additional ingredients not mentioned by the user, but keep them minimal and essential. Format the response beautifully in markdown must add a great professional name for that recipe like top chefs gave in h1 or h2 and other parts like Ingredients and instruction all must align with great design principles and heading subheading well formatting, ensuring it is visually appealing and easy to render on a web page. Highlight key steps and ingredients to enhance readability and user experience ` }] }],
          },
        })
    const gemAiResponse = geminiResponse["data"]["candidates"][0]["content"]["parts"][0]["text"];
    console.log("Gemini Recipe checking gemAI rjson :", gemAiResponse);
    return gemAiResponse;

   } catch (error) {
    console.log("Error fetching recipe:", error.message);
    return null; // Return null or handle
   }

}

// Example usage:
// getRecipeFromT5(["salt", "sugar", "pepper", "chilli", "ginger", "paneer", "curd", "black pepper", "banana"])
//     .then((response) => {
//         console.log("Generated Recipe:", JSON.stringify(response));
//     });

// // The error `Uncaught ReferenceError: process is not defined` occurs because `process.env` is not available in the browser environment. 
// // To fix this, you need to use a bundler like Webpack or Vite to inject environment variables into your frontend code. 
// // 2. **Create a `.env` file** in the root of your project and add your environment variables:
// //    ```
// //    HF_ACCESS_TOKEN=your_huggingface_access_token
// //    ```

// use vite to fix error :
// const hf = new HfInference(import.meta.env.VITE_HF_ACCESS_TOKEN);
// // 4. **Access the environment variable in your code**:

export async function getRecipeFromMistral(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ");
    try {
        const response = await hf.chatCompletion({ // Use gemini instance
             model: "mistralai/Mistral-Nemo-Instruct-2407",
             messages: [
                 { role: "system", content: SYSTEM_PROMPT },
                 { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
             ],
             max_tokens: 1024,
        });
        return response.choices[0].message.content;
    } catch (err) {
        console.error(err.message);
    }
}

export async function RecipeImg(data) {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev",
        {
            headers: {
                Authorization:`Bearer ${import.meta.env.VITE_HF_ACCESS_TOKEN}`, // Replace with your actual token
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(data),
        }
    );

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.blob(); // Get the response as a blob
    return URL.createObjectURL(result); // Create a URL for the blob
}
