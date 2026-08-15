const Spinner = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="h-14 w-14 animate-spin rounded-full border-4 border-gray-700 border-t-white"></div>
    </div>
  );
};

export default Spinner;
