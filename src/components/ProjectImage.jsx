import { useEffect, useState } from 'react'
import { defaultProjectImage, defaultProjectImageAlt } from '../data/projects'

function ProjectImage({
  src,
  alt,
  position = 'center center',
  className = 'portfolio-image',
  loading = 'lazy',
  decoding = 'async',
  fetchPriority = 'auto',
  fit = 'cover',
}) {
  const [currentSrc, setCurrentSrc] = useState(src || defaultProjectImage)

  useEffect(() => {
    setCurrentSrc(src || defaultProjectImage)
  }, [src])

  const isFallbackImage = currentSrc === defaultProjectImage

  return (
    <img
      src={currentSrc}
      alt={alt || defaultProjectImageAlt}
      className={className}
      loading={loading}
      decoding={decoding}
      fetchPriority={fetchPriority}
      onError={() => {
        if (currentSrc !== defaultProjectImage) {
          setCurrentSrc(defaultProjectImage)
        }
      }}
      style={{
        objectFit: isFallbackImage ? 'contain' : fit,
        objectPosition: isFallbackImage ? 'center center' : position,
      }}
    />
  )
}

export default ProjectImage
