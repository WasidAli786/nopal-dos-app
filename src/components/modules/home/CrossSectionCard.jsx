"use client";

import ButtonUI from "@/components/common/ButtonUI";
import NextImage from "@/components/common/NextImage";
import Link from "next/link";
import { useRouter } from "next/navigation";

const CrossSectionCard = ({ items, index }) => {
  const router = useRouter();
  return (
    <>
      <div
        className={`flex ${
          index % 2 === 0
            ? "flex-col lg:flex-row"
            : "flex-col lg:flex-row-reverse"
        } gap-8 lg:gap-16 ${index > 0 ? "mt-10 lg:mt-28" : ""}`}
        key={index}
      >
        {items?.playStoreImage || items?.appStoreImage ? (
          <div className="min-w-[50%] p-10 apps_linearBg center rounded-md">
            <div className="relative w-96 h-80 md:h-96">
              <NextImage
                src={items.image}
                alt={items.title}
                className="object-contain rounded-md"
              />
            </div>
          </div>
        ) : (
          <div className="relative min-w-[50%] h-64 sm:h-80 md:h-96 lg:h-[500px]">
            <NextImage
              src={items.image}
              alt={items.title}
              className={`rounded-md ${
                items.buttonText ? "object-cover" : "object-contain"
              }`}
            />
          </div>
        )}
        <div>
          <h2 className="primary_title">{items.title}</h2>
          <p className="mt-6 text-xl lg:text-2xl textSecondary_lightDark">
            {items.description}
          </p>
          {items.buttonText && (
            <ButtonUI
              fullWidth
              size="xl"
              variant="bordered"
              className="max-w-full mt-10 dark:text-white md:max-w-sm"
              onClick={() => router.push(items.link)}
            >
              {items.buttonText}
            </ButtonUI>
          )}
          {(items?.playStoreLink || items?.appStoreLink) && (
            <div className="flex flex-col items-center gap-5 mt-5 sm:flex-row">
              <Link href={items?.playStoreLink} target="_blank">
                <div className="relative w-56 h-16">
                  <NextImage
                    src={items.playStoreImage}
                    alt="googlePlay"
                    className="rounded-md"
                  />
                </div>
              </Link>
              <Link href={items?.appStoreLink} target="_blank">
                <div className="relative w-56 h-16">
                  <NextImage
                    src={items.appStoreImage}
                    alt="appleStore"
                    className="rounded-md"
                  />
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CrossSectionCard;
