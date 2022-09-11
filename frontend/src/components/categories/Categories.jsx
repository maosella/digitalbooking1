import React from "react";
import { useState, useEffect } from "react";
import { helpHttp, backendUrl } from "../../helpers/helpHttp";
import CategoriesItem from "./CategoriesItem";

const Categories = ({ filterCategory, changeSelected, selected }) => {
  let api = helpHttp();
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    const response = await api.get(`${backendUrl}/categories`);
    setCategories(await response.json());
  };

  useEffect(() => {
    getCategories();
  }, []);

  const categoriesList = categories.map((category, idx) => {

    return (
      <CategoriesItem
        key={idx}
        img={category.imageUrl}
        title={category.title}
        ammount={category.ammount}
        filterCategory={filterCategory}
        selected={selected}
        changeSelected={changeSelected}
      />
    );
  });
  return (
    <div className="container mx-auto">
      <h1 className="px-5 py-8 text-2xl font-bold leading-7 text-secondary">
        Buscar por tipo de alojamiento
      </h1>
      <div className="flex-col-center md:flex-row md:flex-wrap lg:flex-nowrap gap-3 md:px-5 lg:px-8 w-full">
        {categoriesList}
      </div>
    </div>
  );
};

export default Categories;
