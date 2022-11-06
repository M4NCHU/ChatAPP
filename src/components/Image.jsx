import React from 'react'

const Image = ({src, alt, size}) => {
  return (
    <>
        <img className={`h-${size} w-${size} bg-gray-200 border rounded-full`} src={src} alt={alt} />
    </>
  )
}

export default Image