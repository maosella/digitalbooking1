import React, { useState, useEffect, useRef } from "react";
import { SearchBar } from "../components/searchbar";
import { Categories } from "../components/categories";
import { Publications } from "../components/publications";
import { helpHttp, backendUrl } from "../helpers/helpHttp";
import Loader from "../utils/Loader";
import { useDates, useAuth } from "../context";

const Home = () => {
  let api = helpHttp();
  const [publications, setPublications] = useState([]);
  const [category, setCategory] = useState(null);
  const [city, setCity] = useState(null);
  const [isFiltered, setIsFiltered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const pubRef = useRef(null);
  const { currentUser } = useAuth();

  const { startDate, endDate, resetDates, formatDate, defaultDate } =
    useDates();
  //hacer find donde el parametro de busqueda (id), sea igual a publication.id

  const getPublications = async () => {
    const response = await api.get(
      `${backendUrl}/products/home?category=${encodeURIComponent(
        category
      )}&city=${city}&startDate=${
        startDate != null ? formatDate(startDate) : defaultDate()
      }&endDate=${endDate != null ? formatDate(endDate) : defaultDate()}&user=${
        currentUser?.id || 0
      }`
    );
    setPublications(await response.json());
    setIsLoading(false);
  };

  const filterCity = (city) => {
    setCity(city);
    setIsFiltered(true);
    scroll();
  };

  const filterCategory = (category) => {
    setCategory(category);
    setIsFiltered(true);
    scroll();
  };

  const cleanFilter = async () => {
    setCategory(null);
    setCity(null);
    resetDates();
    setIsFiltered(false);
    setSelected(false);
  };

  const changeSelected = (category) => {
    setSelected(category);
  };

  const scroll = () => {
    window.scrollTo({
      top: pubRef.current?.getBoundingClientRect().top - 120,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    getPublications();
    scroll();
  }, [isFiltered, currentUser, category]);

  return (
    <div className="bg-neutral min-h-[100vh]">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <SearchBar filterCity={filterCity} />
          <Categories
            filterCategory={filterCategory}
            changeSelected={changeSelected}
            selected={selected}
          />
          <Publications
            ref={pubRef}
            publications={publications}
            cleanFilter={cleanFilter}
            isFiltered={isFiltered}
            title={"Recomendaciones"}
            isHome={true}
          />
        </>
      )}
    </div>
  );
};
export default Home;
