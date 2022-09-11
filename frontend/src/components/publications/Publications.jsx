import React from "react";
import PublicationItem from "./PublicationItem";
import { getDistance } from "geolib";
import { nanoid } from "nanoid";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { forwardRef } from "react";
import { TbMoodEmpty } from "react-icons/tb";

const Publication = forwardRef(
  (
    {
      publications,
      cleanFilter,
      isFiltered,
      title,
      favourite,
      getPublications,
      isHome,
    },
    ref
  ) => {
    const publicationList = publications?.map((publication) => {
      return (
        <PublicationItem
          key={nanoid()}
          id={publication.id}
          img={publication.images.name}
          title={publication.title}
          description={publication.description}
          distance={(
            getDistance(
              {
                latitude: publication.latitude,
                longitude: publication.longitude,
              },
              {
                latitude: publication.city.latitude,
                longitude: publication.city.longitude,
              }
            ) / 1000
          ).toFixed(2)}
          latitude={publication.latitude}
          longitude={publication.longitude}
          category={publication.category.title}
          caracteristics={publication.characteristics}
          score={publication.scores}
          favourite={favourite || publication.favourite}
          getPublications={getPublications}
        />
      );
    });

    const handleClick = (e) => {
      e.preventDefault();
      cleanFilter();
    };

    return (
      <div className="mt-10 mb-10 container mx-auto" ref={ref}>
        <h1 className="ml-5 mb-5 text-2xl font-bold text-secondary flex justify-between items-center">
          {title}{" "}
          {isFiltered ? (
            <span className="cursor-pointer pr-8" onClick={handleClick}>
              <AiOutlineCloseSquare className="text-primary" />
            </span>
          ) : (
            ""
          )}
        </h1>
        {publications.length === 0 && isHome && (
          <div className="flex-col-center mt-[18vh] gap-3">
            <TbMoodEmpty className="text-primary block text-7xl" />
            <p className="text-primary font-bold text-xl">
              No se han encontrado productos.
            </p>
          </div>
        )}
        <div className="flex-col-center gap-5 md:flex-row flex-wrap pb-10">
          {publicationList}
        </div>
      </div>
    );
  }
);

export default Publication;
