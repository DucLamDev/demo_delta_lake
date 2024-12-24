import React, { useEffect, useState } from 'react';
import { BarChart, PieChart, ConversionRateChart } from '../components/chart';

export default function Home() {
  const [userActions, setUserActions] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const [popularProductsRate, setPopularProductsRate] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [userActionsRes, popularProductsRes, popularProductsRateRes] = await Promise.all([
          fetch('http://localhost:5000/api/user-actions'),
          fetch('http://localhost:5000/api/popular-products'),
          fetch('http://localhost:5000/api/conversion-rate')
        ]);
        
        if (!userActionsRes.ok || !popularProductsRes.ok || !popularProductsRateRes.ok) {
          throw new Error(`Failed to fetch data: ${userActionsRes.status} ${popularProductsRes.status}`);
        }

        const userActionsData = await userActionsRes.json();
        const popularProductsData = await popularProductsRes.json();
        const popularProductsRateData = await popularProductsRateRes.json();
        setUserActions(userActionsData);
        setPopularProducts(popularProductsData);
        setPopularProductsRate(popularProductsRateData);
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(`Failed to load data: ${err.message}. Please check if the backend service is running and accessible.`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const userLabels = userActions.map((item) => `User ${item.UserID}`);
  const userData = userActions.map((item) => item.ActionCount);

  const productLabels = popularProducts.map((item) => `Product ${item.ProductID}`);
  const productData = popularProducts.map((item) => item.ActionCount);
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">User Behavior Analysis</h1>

      <div className="grid gap-8">
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">User Actions</h2>
          <div className="h-[400px]">
            <BarChart data={userData} labels={userLabels} />
          </div>
        </div>

        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Popular Products</h2>
          <div className="h-[400px]">
            <PieChart data={productData} labels={productLabels} />
          </div>
        </div>

        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Conversion Rate</h2>
          <div className="h-[400px]">
            <ConversionRateChart data={popularProductsRate} />
          </div>
        </div>
      </div>
    </div>
  );
}

