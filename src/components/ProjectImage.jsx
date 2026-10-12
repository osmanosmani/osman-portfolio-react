import { useState } from 'react'
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
  const [imageState, setImageState] = useState({ src, failed: false })
  if (imageState.src !== src) {
    setImageState({ src, failed: false })
  }
  const currentSrc = imageState.src === src && imageState.failed
    ? defaultProjectImage
    : src || defaultProjectImage

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
          setImageState({ src, failed: true })
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
