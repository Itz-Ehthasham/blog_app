import SearchAndFilter from './SearchAndFilter';

interface SearchSectionProps {
  onSearch: (term: string) => void;
  onFilter: (category: string) => void;
  currentCategory: string;
}

export default function SearchSection({ onSearch, onFilter, currentCategory }: SearchSectionProps) {
  return (
    <section className="py-20 bg-white border-b-4 border-black">
      <div className="max-w-7xl mx-auto px-5 md:px-12 lg:px-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black text-black mb-6 uppercase tracking-wider">FIND WHAT INTERESTS YOU</h2>
          <p className="text-xl text-gray-800 uppercase tracking-wide font-bold">SEARCH THROUGH OUR ARTICLES OR BROWSE BY CATEGORY</p>
        </div>
        
        <SearchAndFilter
          onSearch={onSearch}
          onFilter={onFilter}
          currentCategory={currentCategory}
        />
      </div>
    </section>
  );
}