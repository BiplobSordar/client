import React from 'react'
import { useState } from 'react';
const categories = [
  { id: "nextjs", label: "Next JS" },
  { id: "data science", label: "Data Science" },
  { id: "frontend development", label: "Frontend Development" },
  { id: "fullstack development", label: "Fullstack Development" },
  { id: "mern stack development", label: "MERN Stack Development" },
  { id: "backend development", label: "Backend Development" },
  { id: "javascript", label: "Javascript" },
  { id: "python", label: "Python" },
  { id: "docker", label: "Docker" },
  { id: "mongodb", label: "MongoDB" },
  { id: "html", label: "HTML" },
];
const Filter = ({handleFilterChange}) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("");

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prevCategories) => {
      const newCategories = prevCategories.includes(categoryId)
        ? prevCategories.filter((id) => id !== categoryId)
        : [...prevCategories, categoryId];

        handleFilterChange(newCategories, sortByPrice);
        return newCategories;
    });
  };

  const selectByPriceHandler = (selectedValue) => {
    setSortByPrice(selectedValue);
    handleFilterChange(selectedCategories, selectedValue);
  }
  return (
    <div className="w-full md:w-[20%]">
  <div className="flex items-center justify-between">
    <h1 className="font-semibold text-lg md:text-xl">Filter Options</h1>
    <div className="relative">
      <select
        onChange={selectByPriceHandler}
        className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="" disabled selected>
          Sort by
        </option>
        <optgroup label="Sort by price">
          <option value="low">Low to High</option>
          <option value="high">High to Low</option>
        </optgroup>
      </select>
    </div>
  </div>
  <hr className="my-4 border-gray-300" />
  <div>
    <h1 className="font-semibold mb-2">CATEGORY</h1>
    {categories.map((category) => (
      <div key={category.id} className="flex items-center space-x-2 my-2">
        <input
          type="checkbox"
          id={category.id}
          onChange={() => handleCategoryChange(category.id)}
          className="w-4 h-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500"
        />
        <label
          htmlFor={category.id}
          className="text-sm font-medium leading-none text-gray-700"
        >
          {category.label}
        </label>
      </div>
    ))}
  </div>
</div>

  )
}

export default Filter