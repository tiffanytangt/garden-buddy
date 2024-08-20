import React from 'react';
import Lightbox, { SlideImage } from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

interface LightboxWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  images: SlideImage[];
  initialIndex?: number;
}

const LightboxWrapper: React.FC<LightboxWrapperProps> = ({
  isOpen,
  onClose,
  images,
  initialIndex = 0,
}) => {
  return (
    <Lightbox
      open={isOpen}
      close={onClose}
      slides={images}
      index={initialIndex}
      controller={{
        closeOnBackdropClick: true,
      }}
    />
  );
};

export default LightboxWrapper;
