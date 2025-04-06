import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "./cropUtils";

const CropModal = ({ image, onClose, onCrop }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCrop = async () => {
    const croppedImage = await getCroppedImg(image, croppedAreaPixels);
    onCrop(croppedImage);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Crop Profile Photo</h2>
        <div className="relative w-80 h-80">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1} // Square aspect ratio
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>
        <div className="flex justify-end gap-2 mt-3">
          <button onClick={onClose} className="px-4 py-2 bg-gray-400 rounded">Cancel</button>
          <button onClick={handleCrop} className="px-4 py-2 bg-red-500 text-white rounded">Upload</button>
        </div>
      </div>
    </div>
  );
};

export default CropModal;
