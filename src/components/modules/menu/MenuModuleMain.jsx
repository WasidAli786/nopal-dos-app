"use client";

import { useEffect, useRef, useState } from "react";
import CategoriesTabs from "./CategoriesTabs";
import CategoryCard from "./CategoryCard";
import PopularItemsSection from "./PopularItemsSection";

const MenuModuleMain = ({
  categoriesList,
  popularItemsList,
  allCategoriesData,
}) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const sections = useRef([]);
  const swiperRef = useRef(null);

  // *Highlight category on select
  const handleScrollIntoCategory = (category) => {
    setSelectedCategory(category);
    const element = document.getElementById(category);

    if (element) {
      const margin = 150;
      const rect = element.getBoundingClientRect();
      const scrollTop = document.documentElement.scrollTop;

      window.scrollTo({
        top: rect.top + scrollTop - margin,
        behavior: "smooth",
      });
    }
  };

  // *Highlight category on scroll
  const handleScroll = () => {
    const pageYOffset = window.scrollY;
    const offsetFromTop = 150; // Set your desired offset from the top

    let newActiveSection = null;

    sections.current.forEach((section) => {
      const sectionOffsetTop = section.offsetTop - offsetFromTop;
      const sectionHeight = section.offsetHeight;

      // Consider the section as active when its top is within the viewport
      if (
        pageYOffset >= sectionOffsetTop &&
        pageYOffset < sectionOffsetTop + sectionHeight
      ) {
        newActiveSection = section.id;
      }
    });

    setSelectedCategory(newActiveSection);

    // Move the slider to the corresponding category
    const index = categoriesList.findIndex(
      (item) => item.name === newActiveSection
    );
    if (index !== -1 && swiperRef.current) {
      swiperRef.current.swiper.slideTo(index);
    }
  };

  useEffect(() => {
    sections.current = document.querySelectorAll("[data-section]");
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = "visible";
  }, []);

  return (
    <>
      <CategoriesTabs
        categoriesList={categoriesList}
        onClick={handleScrollIntoCategory}
        selectedCategory={selectedCategory}
        swiperRef={swiperRef}
      />
      <div className="py-10 border-b border_lightDark">
        <div className="container">
          <h1 className="primary_title">Popular Items</h1>
          <PopularItemsSection popularItemsList={popularItemsList} />
        </div>
      </div>
      <div className="container">
        {allCategoriesData?.map((item) => {
          return (
            <div key={item?.id} data-section id={item?.name} className="mt-10">
              <h2 className="text-xl font-bold">{item?.name}</h2>
              <div className="grid gap-6 mt-6 md:grid-cols-2 lg:gap-x-12">
                {item?.products?.map((items) => (
                  <CategoryCard key={items?.id} items={items} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MenuModuleMain;
