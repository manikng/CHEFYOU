import Markdown from "react-markdown";
export default function HuggingfaceRecipe(props) {
  return (
    <section
      ref={props.Ref}
      className="mx-auto my-5 p-6 bg-white rounded-lg shadow-md max-w-4xl"
    >
      <p className="text-center text-gray-500 mt-4">Bon Appétit! 🍽️</p>
      <h2 className="text-3xl font-bold text-center text-orange-800 mb-4">
        Your Delicious Recipe
      </h2>
      <div className="markdown prose lg:prose-xl">
        <Markdown>{props.Recipe}</Markdown>
      </div>
    </section>
  );
}
// <section ref={props.Ref}  className="mx-auto my-5 p-6 bg-white rounded-lg shadow-md max-w-4xl">
//     <Markdown>{props.Recipe}</Markdown>
// </section>
