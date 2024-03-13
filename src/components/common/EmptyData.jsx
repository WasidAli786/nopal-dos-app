import NextImage from "./NextImage";

const EmptyData = ({ className, title }) => {
  return (
    <>
      <div
        className={`w-full flex items-center justify-center py-10 ${
          className ?? "min-h-[50vh]"
        }`}
      >
        <div className="flex flex-col items-center">
          <div className="relative w-40 h-40 md:w-48 md:h-48">
            <NextImage src="/images/emptyData.svg" alt="empty-data" />
          </div>
          <h2 className="mt-5 text-2xl text-center text-gray-500">
            {title ?? "No Data Found!"}
          </h2>
        </div>
      </div>
    </>
  );
};

export default EmptyData;
