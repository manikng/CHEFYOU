# ChefYou

Welcome to **ChefYou**, an AI-powered recipe generator that transforms your list of ingredients into exquisite recipes, complete with images. Whether you're a culinary novice or a seasoned chef, ChefYou is here to inspire your next meal.

![ChefYou](https://github.com/user-attachments/assets/6eb52e30-09d7-446f-ac34-c83d368383de)

## Features
- **Fantastic User Interface and Design**: Input and Remove ingredients with ease, and view the generated recipes in a clean and intuitive interface. 
- **AI-Generated Recipes**: Input your ingredients and let our AI create innovative and delightful recipes.
- **Beautiful Markdown Formatting**: Recipes are formatted in markdown for easy readability and rendering on web pages.
- **Recipe Images**: Get visually appealing images of the generated recipes.
- **Multiple AI Models**: Choose from different AI models like T5, Gemini, and Mistral for recipe generation and recipe image generation.
- **Quality AI Models**: They are trained on a large dataset of recipes and ingredients to provide accurate and relevant results and give quality recipes.
## Demo

Check out our demo video to see ChefYou in action:

[![ChefYou Demo](https://img.youtube.com/vi/oaC82F1fnpc/0.jpg)](https://youtu.be/oaC82F1fnpc)

Or watch the demo directly:

[ChefYou Demo](https://github.com/user-attachments/assets/ca0c54a4-c682-475b-922b-7fa0f4ecd4dc)

## Getting Started

### Prerequisites

- reactjs
- npm
- tailwindcss
- Api keys from Hugging Face and Gemini

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/chefyou.git
    cd chefyou
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a  file in the root directory and add your API keys:
    ```env
    VITE_HF_ACCESS_TOKEN=your_huggingface_access_token
    VITE_GEMINI_API_KEY=your_gemini_api_key
    ```

### Running the Application

To start the development server, run:
```sh
npm run dev
```

Open your browser and navigate to http://localhost:5173(by default by vite) to see ChefYou in action.

Usage
Add your ingredients using the input form.
Click on "Get Recipe" to generate a recipe using the T5 model.
Alternatively, click on "Get Recipe at flash speed... 🚀" to use the Gemini model for faster results.
View the generated recipe and its image.

Contributing
We welcome contributions! Please do whatever  contribution you want.


Acknowledgements
Hugging Face
Google Gemini
Mistral AI
Happy cooking with ChefYou! 🍳👨‍🍳👩‍🍳
