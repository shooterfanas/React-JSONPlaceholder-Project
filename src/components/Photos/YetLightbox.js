import React, { useEffect, useState } from "react";

import Lightbox from "yet-another-react-lightbox";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Captions from "yet-another-react-lightbox/plugins/captions";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/plugins/captions.css";

export const YetLightbox = ({isOpen,close,albumToPhotos,photoIndex}) => {
  const [open, setOpen] = useState(false);
  const [finite] = useState(true);
  const [fade] = useState(700);
  const [swipe] = useState(800);
  const [imageFit] = useState("contain");
  const [renderPrev] = useState(true);
  const [renderNext] = useState(true);
  const [closeOnPullDown] = useState(true);
  const [closeOnBackdropClick] = useState(true);
  const [index, setIndex] = useState(0);


  // Zoom Plugin
  const [animationDuration] = useState(500);
  const [maxZoomPixelRatio] = useState(10);
  const [zoomInMultiplier] = useState(2);
  const [doubleTapDelay] = useState(300);
  const [doubleClickDelay] = useState(300);
  const [doubleClickMaxStops] = useState(2);
  const [keyboardMoveDistance] = useState(50);
  const [wheelZoomDistanceFactor] =
    useState(100);
  const [pinchZoomDistanceFactor] =
    useState(100);
  const [scrollToZoom] = useState(true);

  useEffect(() => {
    setOpen(isOpen);
    setIndex(photoIndex);
  }, [isOpen,photoIndex])
  
  const photoSrcArray = albumToPhotos.map(({url,title}) => ({src: url,description: title}));

  return (
    <>

      <Lightbox
        open={open}
        close={close}
        index={index}
        on={{ view: ({ index: currentIndex }) => setIndex(currentIndex) }}
        slides={
          photoSrcArray
        }
        carousel={{
          imageFit,
          finite
        }}
        plugins={[Counter,Zoom, Captions]}
        counter={{ container: { style: { top: 0} } }}
        zoom={{
          maxZoomPixelRatio,
          zoomInMultiplier,
          doubleTapDelay,
          doubleClickDelay,
          doubleClickMaxStops,
          keyboardMoveDistance,
          wheelZoomDistanceFactor,
          pinchZoomDistanceFactor,
          scrollToZoom,
        }}
        captions={{ descriptionTextAlign: "center", descriptionMaxLines: 3 }}
        controller={{ closeOnPullDown, closeOnBackdropClick }}
        animation={{ fade, swipe, zoom: animationDuration}}
        render={{
          buttonPrev: renderPrev ? undefined : () => null,
          buttonNext: renderNext ? undefined : () => null,
        }}
      />

      
    </>
  );
}

export default YetLightbox;