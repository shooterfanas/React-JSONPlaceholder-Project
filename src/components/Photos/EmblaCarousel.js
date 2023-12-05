import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { flushSync } from 'react-dom'
import YetLightbox from './YetLightbox'
import { Link } from 'react-router-dom'


const TWEEN_FACTOR = 1.2

const EmblaCarousel = ({slides, options, albumToPhotos,allAlbumPhotos}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const [tweenValues, setTweenValues] = useState([])
  const [isOpen, setIsOpen] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const imagesArray = albumToPhotos.map((item) => item.url);
  const onScroll = useCallback(() => {
    if (!emblaApi) return

    const engine = emblaApi.internalEngine()
    const scrollProgress = emblaApi.scrollProgress()

    const styles = emblaApi.scrollSnapList().map((scrollSnap, index) => {
      let diffToTarget = scrollSnap - scrollProgress

      if (engine.options.loop) {
        engine.slideLooper.loopPoints.forEach((loopItem) => {
          const target = loopItem.target()
          if (index === loopItem.index && target !== 0) {
            const sign = Math.sign(target)
            if (sign === -1) diffToTarget = scrollSnap - (1 + scrollProgress)
            if (sign === 1) diffToTarget = scrollSnap + (1 - scrollProgress)
          }
        })
      }
      return diffToTarget * (-1 / TWEEN_FACTOR) * 100
    })
    setTweenValues(styles)
  }, [emblaApi, setTweenValues])

  useEffect(() => {
    if (!emblaApi) return
    onScroll()
    emblaApi.on('scroll', () => {
      flushSync(() => onScroll())
    })
    emblaApi.on('reInit', onScroll)
  }, [emblaApi, onScroll])

  const images = imagesArray;

  const imageByIndex = (index) => images[index % images.length]

  const handleOpenLightBox = (index) => {
    setIsOpen(true);
    setCarouselIndex(index);
  }
  return (
    <>
    {
      isOpen && <YetLightbox isOpen={isOpen} close={() => setIsOpen(false)} albumToPhotos={allAlbumPhotos} photoIndex={carouselIndex}/>
    }
    <div className="embla theme-light">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((index) => (
            <div className="embla__slide" key={index}>
              {/* <div className="embla__slide__number">
                <span>{index + 1}</span>
              </div> */}
              <div className="embla__parallax">
                <div
                  className="embla__parallax__layer"
                  style={{
                    ...(tweenValues.length && {
                      transform: `translateX(${tweenValues[index]}%)`
                    })
                  }}
                >
                  <Link>
                    <img
                      className="embla__slide__img embla__parallax__img"
                      src={imageByIndex(index)}
                      alt=""
                      onClick={() => handleOpenLightBox(index)}
                    />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  )
}

export default EmblaCarousel
