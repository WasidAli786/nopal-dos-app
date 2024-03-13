import { errorToast } from "@/utils/toaster";
import { useState } from "react";

const useImageUploadAndPreview = () => {
  const [imageUrl, setImageUrl] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file?.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImageUrl(reader.result);
      };

      reader.readAsDataURL(file);
    } else {
      errorToast("Invalid file type, Please select an image file");
      setImageUrl(null);
    }
  };
  return { handleFileChange, imageUrl, setImageUrl };
};

export default useImageUploadAndPreview;
