"use client";

import ButtonUI from "@/components/common/ButtonUI";
import GoogleMapUI from "@/components/common/GoogleMapUI";
import { useStore } from "@/store/store";
import { Mail, MapPin, Phone } from "lucide-react";
import { useRouter } from "next/navigation";

const HomeLocations = ({ items, coordinates }) => {
  const router = useRouter();
  const { currentBranch, setCurrentBranch, setRemoveCurrentBranch } =
    useStore();

  const handleSetCurrentBranch = (branch) => {
    setCurrentBranch(branch);
  };
  return (
    <>
      <div className="bgLight_lightDark">
        <div className="container pb-10 md:pb-20">
          <div className="w-full rounded-2xl h-80 md:h-[360px]">
            <GoogleMapUI
              lat={coordinates?.latitude}
              lng={coordinates?.longitude}
              loadingHeight="h-80 md:h-[360px]"
            />
          </div>
          <div className="grid gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-3">
            {items?.map((items) => (
              <div
                className={`p-6 rounded-lg shadow-lg ${
                  currentBranch?.id === items?.id && "border border-primary"
                }`}
                key={items?.id}
              >
                <h3 className="text-xl font-bold">{items?.name}</h3>
                <div className="mt-6 space-y-3 textSecondary_lightDark">
                  {items?.phone && (
                    <div className="flex items-center gap-3">
                      <Phone size={18} />
                      <a href={`tel:${items.phone}`}>{items.phone}</a>
                    </div>
                  )}
                  {items?.email && (
                    <div className="flex items-center gap-3">
                      <Mail size={18} />
                      <a href={`mailto:${items.email}`}>{items.email}</a>
                    </div>
                  )}
                  {items?.address && (
                    <div className="flex items-start gap-3">
                      <div>
                        <MapPin size={20} />
                      </div>
                      <a
                        href={`https://www.google.com/maps?q=${items?.latitude},${items?.longitude}`}
                        target="_blank"
                      >
                        {items.address}
                      </a>
                    </div>
                  )}
                </div>
                <div className="mt-10 space-y-4">
                  <ButtonUI
                    fullWidth
                    size="xl"
                    onClick={() => router.push("/menu")}
                  >
                    Order Now
                  </ButtonUI>
                  <ButtonUI
                    fullWidth
                    variant="bordered"
                    size="xl"
                    onClick={() => handleSetCurrentBranch(items)}
                  >
                    {currentBranch?.id === items?.id
                      ? "Current selected location"
                      : "Make this your location"}
                  </ButtonUI>
                  {/* {currentBranch?.id === items?.id ? (
                    <ButtonUI
                      fullWidth
                      variant="bordered"
                      size="xl"
                      onClick={() => setRemoveCurrentBranch()}
                    >
                      Clear your favorite location
                    </ButtonUI>
                  ) : (
                    <ButtonUI
                      fullWidth
                      variant="bordered"
                      size="xl"
                      onClick={() => handleSetCurrentBranch(items)}
                    >
                      Make this your location
                    </ButtonUI>
                  )} */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeLocations;
