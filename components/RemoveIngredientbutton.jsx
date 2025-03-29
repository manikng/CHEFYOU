export default function RemoveIngredientbutton({ ingredient, onRemove }) {
  return (
    
      <button
        onClick={() => onRemove(ingredient)}
        className="text-red-500 hover:text-red-700 transition-colors"
      >
        ✖
      </button>
  );
}
