export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="text-center">
        <div className="bg-white border-4 border-black shadow-custom p-12">
          <div className="animate-spin inline-block w-16 h-16 border-4 border-current border-t-transparent text-black rounded-full mb-6" role="status" aria-label="loading">
            <span className="sr-only">Loading...</span>
          </div>
          <h2 className="text-2xl font-black text-black uppercase tracking-wider mb-2">LOADING POSTS</h2>
          <p className="text-black font-bold uppercase tracking-wide">PLEASE WAIT...</p>
        </div>
      </div>
    </div>
  );
}