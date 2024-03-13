import CrossSectionCard from "./CrossSectionCard";

const CrossSection = ({ configData }) => {
  const playStoreLink = configData?.play_store_config?.link;
  const appStoreLink = configData?.play_store_config?.link;

  return (
    <>
      <div className="container py-10 md:py-20">
        <CrossSectionCard
          items={{
            image: "/images/crossSection2.png",
            title: "Loaded Nachos",
            description:
              "(3 Tacos) Button and portabello mushrooms sautéed with onions, garlic, thyme, and rosemary. Topped with a black bean salsa, pico, fried onions, salsa verde, and cilantro.",
            buttonText: "Order Now",
            link: "/menu",
          }}
          index={0}
        />
        <CrossSectionCard
          items={{
            image: "/images/crossSection1.png",
            title: "Less Talkin' More Tacos!",
            description:
              "Starting your own restaurant from scratch is quite a challenging feat and the restaurant industry has one of the highest failure rates for doing so. With a Talkin’ Tacos franchise we have already laid the groundwork, have best of class technology and systems in place, a proven concept and track record of success, and all the support you will need from our team with many years of experience in the industry.",
            buttonText: "Learn More About Franchise Opportunities",
            link: "/contact-us",
          }}
          index={1}
        />
        {(playStoreLink || appStoreLink) && (
          <CrossSectionCard
            items={{
              image: "/images/appsImage.png",
              title: "Order just a Click Away!",
              description:
                "Ordering food has never been easier! With our mobile app, simply browse through our extensive menu, select your favorite dishes, customize your order to your liking, and proceed to checkout with just a few taps. Enjoy t he convenience of tracking your order in real-time and receiving timely updates on its preparation and delivery status.",
              playStoreImage: "/images/playStore.png",
              appStoreImage: "/images/appStore.png",
              playStoreLink: playStoreLink,
              appStoreLink: appStoreLink,
            }}
            index={2}
          />
        )}
      </div>
    </>
  );
};

export default CrossSection;
