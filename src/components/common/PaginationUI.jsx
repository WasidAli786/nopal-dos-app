import { Pagination } from "@nextui-org/pagination";

const PaginationUI = ({ total, onChange, className }) => {
  return (
    <>
      <Pagination
        total={total}
        initialPage={1}
        showControls
        className={className}
        onChange={onChange}
      />
    </>
  );
};

export default PaginationUI;
