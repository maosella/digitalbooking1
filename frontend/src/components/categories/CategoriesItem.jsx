import React from "react";

const CategoriesItem = ({
  img,
  title,
  ammount,
  filterCategory,
  selected,
  changeSelected,
}) => {
  const handleClick = (e) => {
    e.preventDefault();
    filterCategory(title);
    changeSelected(title);
  };

  return (
    <div
      className={`w-11/12 h-fit md:h-88 md:w-[49%] bg-white rounded-lg shadow-first  ${
        title == selected
          ? "border-primary border-2"
          : "cursor-pointer hover:scale-[1.01] ease-in-out transition-all"
      }`}
      onClick={handleClick}
    >
      <div className="h-80 md:h-72 w-full ">
        <img
          src={img}
          alt="categoryCard"
          className="rounded-tr-trlg rounded-tl-trlg h-80 md:h-72 w-full object-cover"
        />
      </div>
      <div className="px-3 py-2">
        <h2 className="font-bold text-xl text-secondary">{title}</h2>
        <p className="font-bold text-sm text-secondary opacity-70">
          {ammount} {title}
        </p>
      </div>
    </div>
  );
};

export default CategoriesItem;
