"use client";

import React from "react";
import Link from "next/link";
import ButtonUI from "../common/ButtonUI";
import { FbIcon, InstIcon } from "@/config/data/Icons";
import { usePathname, useRouter } from "next/navigation";
import WebLogo from "../common/WebLogo";
import { useStore } from "@/store/store";
import PrivacyLinks from "./PrivacyLinks";
import { footerPagesData } from "@/config/data";

const Footer = () => {
  const currentPathname = usePathname();
  const router = useRouter();
  const { currentBranch } = useStore();

  return (
    <>
      <div className="container">
        <div className="flex items-center justify-between py-8 border-b border_lightDark">
          <WebLogo />
          <ButtonUI size="lg" onClick={() => router.push("/menu")}>
            Order Now
          </ButtonUI>
        </div>
        <div className="grid gap-5 py-8 border-b md:grid-cols-12 border_lightDark">
          <div className="col-span-4 lg:col-span-5">
            <h3 className="text-xl font-bold">Social</h3>
            <div className="mt-5">
              <ButtonUI isIconOnly variant="light" size="sm" color="default">
                <FbIcon />
              </ButtonUI>
              <ButtonUI isIconOnly variant="light" size="sm" color="default">
                <InstIcon />
              </ButtonUI>
            </div>
          </div>
          <div className="col-span-6 lg:col-span-5">
            {currentBranch?.id && (
              <>
                <h3 className="text-xl font-bold">Get in touch</h3>
                <ul className="mt-5 space-y-2">
                  <li className="flex flex-col items-start md:flex-row md:items-center">
                    <div className="font-semibold md:min-w-24">Call:</div>
                    <div className="textSecondary_lightDark">
                      <a href={`tel:${currentBranch.phone}`}>
                        {currentBranch.phone}
                      </a>
                    </div>
                  </li>
                  <li className="flex flex-col items-start md:flex-row md:items-center">
                    <div className="font-semibold md:min-w-24">Email:</div>
                    <div className="textSecondary_lightDark">
                      <a href={`mailto:${currentBranch.email}`}>
                        {currentBranch.email}
                      </a>
                    </div>
                  </li>
                  <li className="flex flex-col items-start md:flex-row">
                    <div className="font-semibold md:min-w-24">Address:</div>
                    <div className="textSecondary_lightDark max-w-60">
                      <a
                        href={`https://www.google.com/maps?q=${currentBranch?.latitude},${currentBranch?.longitude}`}
                        target="_blank"
                      >
                        {currentBranch.address}
                      </a>
                    </div>
                  </li>
                </ul>
              </>
            )}
          </div>
          <div className="col-span-2">
            <h3 className="text-xl font-bold">Pages</h3>
            <ul className="mt-5 space-y-2">
              {footerPagesData.map((items) => (
                <li
                  className="font-semibold textSecondary_lightDark hover:underline w-fit"
                  key={items.label}
                >
                  <Link href={items.link}>{items.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-col justify-between py-8 md:items-center md:flex-row">
          <ul className="flex flex-col gap-2 md:gap-6 md:flex-row">
            <PrivacyLinks />
          </ul>
          <span className="mt-5 font-semibold text-primary md:mt-0">
            <Link href="https://cafescale.com" target="_blank">
              Made with Cafescale.com
            </Link>
          </span>
        </div>
      </div>
      {currentPathname === "/menu" && <div className="block h-28 md:hidden" />}
    </>
  );
};

export default Footer;
