"use client"
import Categories from "@/components/home/Categories";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import { getFoods } from "@/apis/foods";
import { Pagination } from "@nextui-org/react";
import FoodsCard from "@/components/cards/FoodsCard";

const limit = 2;

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPage, setTotalPage] = useState(false);

  const category = searchParams.get('category');
  const page = searchParams.get('page') || 1;  
  const search = searchParams.get('search');

  const fetchFoods = async () => {
    setLoading(true);
    try {
      const response = await getFoods(page, category, limit, search);  
      setFoods(response.data.foods);  
      setTotalPage(response.data.totalPages);
    } catch (err) {
      setError('Failed to fetch foods');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, [category, page, search]); 

  const handlePageChange = (newPage) => {
    const query = new URLSearchParams(searchParams.toString()); 
    query.set('page', newPage); 
    router.push(`/?${query.toString()}`); 
  };

  return (
    <div className="container mx-auto grid grid-cols-4 gap-4 mt-5">
      <div className="col-span-1">
        <Categories current={category} />
      </div>

      <div className="col-span-3">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div>
            {foods.length === 0 ? (
              <p>No foods found</p>
            ) : (
              <div className="grid grid-cols-3 gap-4">
                {foods.map((food) => (
                  <FoodsCard key={food.id} food={food} />
                ))}
              </div>
            )}
          </div>
        )}
        {totalPage > 1 && (
          <div className="flex justify-center mt-3">
            <Pagination
              total={totalPage}
              initialPage={parseInt(page)}
              onChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}
