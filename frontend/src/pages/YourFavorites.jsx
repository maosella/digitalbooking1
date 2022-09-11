import React, { useState, useEffect } from "react";
import { helpHttp, backendUrl } from "../helpers/helpHttp";
import { Loader, Topbar } from "../utils";
import { Publications } from "../components/publications";
import { useAuth } from "../context";
import { GiBrokenHeart } from "react-icons/gi";

const YourFavorites = () => {
  let api = helpHttp();
  const { currentUser } = useAuth();
  const [publications, setPublications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getPublications = async () => {
    const response = await api.get(
      `${backendUrl}/products/favourites/${currentUser?.id}`
    );
    setPublications(await response.json());
    setIsLoading(false);
  };

  useEffect(() => {
    if (currentUser) {
      getPublications();
    }
  }, [currentUser]);

  return (
    <div className="bg-neutral min-h-[85vh]">
      <Topbar title="Tus favoritos" />
      {!isLoading && publications.length === 0 && (
        <div className="flex-col-center mt-[30vh] gap-3">
          <GiBrokenHeart className="text-primary block text-7xl" />
          <p className="text-primary font-bold text-xl">
            No tienes favoritos por el momento!
          </p>
        </div>
      )}
      {isLoading ? (
        <Loader />
      ) : (
        <Publications
          publications={publications}
          isFiltered={false}
          favourite
          getPublications={getPublications}
          isHome={false}
        />
      )}
    </div>
  );
};

export default YourFavorites;
