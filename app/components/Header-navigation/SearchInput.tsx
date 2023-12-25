"use client"
import { HiOutlineSearch } from 'react-icons/hi';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';
import SearchProducts from './SearchProducts';


const SearchInput: React.FC<{ placeholder: string, product: any }> = ({ placeholder, product }) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');


  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(`/search?query=${searchQuery}`);
  };

  if (!router) {
    <>Something was wrong !</>
    return null;
  }

  const filtered = product.filter((item: any) =>
    item.name.toLocaleLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <input
        onChange={handleSearch}
        value={searchQuery}
        className="w-full h-full px-2 placeholder:text-sm text-base
         border-[3px] border-transparent outline-none
         focus-visible:border-[#febd69]"
        type="text"
        name="sarch"
        placeholder="Search products"
      />
      <span className="w-12 h-full bg-[#febd69] text-black 
      text-2xl flex items-center justify-center right-0 rounded-tr-md rounded-br-md">
        <HiOutlineSearch />
      </span>

      {searchQuery && (
        <div className="absolute left-0 top-12 w-full mx-auto max-h-96 z-30
         bg-gray-200 rounded-lg overflow-y-scroll cursor-pointer text-black">
          {filtered.length > 0 ? (
            <>
              {searchQuery &&
                filtered.map((item: any) => (
                  <Link
                    key={item._id}
                    className="w-full border-b-[1px] border-white
                                flex items-center gap-4"
                    href={`/products/${item.slug}`}
                    onClick={() => setSearchQuery("")}
                  >
                    <SearchProducts item={item} />
                  </Link>
                ))}
            </>
          ) : (
            <div className="bg-gray-50 flex items-center justify-center
                py-10 rounded-lg shadow-lg">
              <p className="text-xl font-semibold animate-bounce">
                Nothing is matches with your search keywords. Please try
                again!
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SearchInput;
