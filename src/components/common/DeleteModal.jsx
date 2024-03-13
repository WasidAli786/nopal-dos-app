"use client";

import ButtonUI from "@/components/common/ButtonUI";
import ModalUI from "@/components/common/ModalUI";

const DeleteModal = ({ isOpen, onOpenChange, onClose, onClick, loading }) => {
  return (
    <>
      <ModalUI
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        size="sm"
      >
        <div className="flex flex-col items-center py-5 space-y-4 text-center">
          <h2 className="text-xl font-bold">
            Are you sure you want to Delete?
          </h2>
          <div className="flex items-center w-full gap-5">
            <ButtonUI
              fullWidth
              color="danger"
              onClick={onClick}
              isLoading={loading}
            >
              Yes
            </ButtonUI>
            <ButtonUI
              fullWidth
              variant="bordered"
              className="text-white"
              disabled={loading}
              onClick={() => onClose()}
            >
              No
            </ButtonUI>
          </div>
        </div>
      </ModalUI>
    </>
  );
};

export default DeleteModal;
