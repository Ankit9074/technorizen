export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="mb-4 text-gray-400">
        <div className="text-6xl mb-2">📄</div>
      </div>
      <h3 className="text-4xl font-medium text-gray-700 mb-2">Your canvas is empty</h3>
      <p className="text-2xl text-gray-500">Drag and drop elements from the sidebar to get started</p>
    </div>
  );
}
