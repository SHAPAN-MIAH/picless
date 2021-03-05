import React, { FunctionComponent, useEffect, useState } from 'react'
import useProfile from '../../../../hooks/useProfile'
import { MediaType } from '../../../../types/PostType.d'

const PhotoGallery: FunctionComponent<{}> = () => {
  const { getPhotos } = useProfile({ disableMount: true })

  const [photos, setPhotos] = useState<MediaType[]>()

  useEffect(() => {
    getPhotos().then((medias: MediaType[]) => {
      setPhotos(medias)
    })
  }, [])

  return (
    <>
      <div className="grid">
        <div className="grid-column">
          <div className="widget-box">{photos && photos.map((item) => <h6>{item.name}</h6>)}</div>
        </div>
      </div>
    </>
  )
}

export default PhotoGallery
