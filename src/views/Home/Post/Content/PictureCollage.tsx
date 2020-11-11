/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { FunctionComponent, Fragment, useState } from 'react'
import Popup from 'reactjs-popup'
import _ from 'lodash'

import { imageUrl } from '../../../../utils/ResourceHelpers'

import { SourceType } from '../../../../types/PostType.d'

import 'reactjs-popup/dist/index.css'

const PictureModal: FunctionComponent<{ source: SourceType; showMore?: number }> = (props) => {
  const { source, showMore } = props
  const pathName = source.pathName as any

  const [showPopup, setShowPopup] = useState(false)
  return (
    <div className="picture-collage-item">
      {showMore && (
        <a className="picture-collage-item-overlay" href="profile-photos.html">
          <p className="picture-collage-item-overlay-text">+{showMore}</p>
        </a>
      )}
      <div className="photo-preview">
        <figure className="photo-preview-image">
          <img src={imageUrl(pathName)} alt={source.name} style={{ objectFit: 'cover' }} />
        </figure>

        <div className="photo-preview-info" onClick={() => setShowPopup(true)}>
          <div className="reaction-count-list">
            <div className="reaction-count negative">
              <svg className="reaction-count-icon icon-thumbs-up">
                <use xlinkHref="#svg-thumbs-up" />
              </svg>

              <p className="reaction-count-text">2</p>
            </div>

            <div className="reaction-count negative">
              <svg className="reaction-count-icon icon-comment">
                <use xlinkHref="#svg-comment" />
              </svg>

              <p className="reaction-count-text">5</p>
            </div>
          </div>
        </div>

        <Popup
          open={showPopup}
          closeOnDocumentClick
          onClose={() => {
            setShowPopup(false)
          }}
          modal
        >
          <img src={imageUrl(pathName)} alt={source.name} style={{ width: 800, height: 600, objectFit: 'contain' }} />
        </Popup>
      </div>
    </div>
  )
}

const PictureCollage: FunctionComponent<{ sources: SourceType[] }> = (props) => {
  const { sources } = props

  const qtyImageSmall = sources.length - 2 > 0 ? sources.length - 2 : 0
  const showMore = qtyImageSmall - 2 > 0 ? qtyImageSmall - 2 : 0
  return (
    <>
      <div className="picture-collage">
        <div className="picture-collage-row medium" style={{ justifyContent: 'center' }}>
          {_.take(sources, 2).map((image: any) => (
            <PictureModal key={image.id} source={image} />
          ))}
        </div>

        {/* { IMAGES SMALL } */}
        {qtyImageSmall > 0 && (
          <div className="picture-collage-row" style={{ justifyContent: 'center' }}>
            {_.takeRight(sources, qtyImageSmall).map((image: any, index: number) => {
              return (
                <Fragment key={image.id}>
                  {index <= 1 && <PictureModal source={image} />}
                  {index === 2 && (
                    <>
                      {showMore > 1 && <PictureModal source={image} showMore={showMore} />}
                      {showMore === 1 && <PictureModal source={image} />}
                    </>
                  )}
                </Fragment>
              )
            })}
          </div>
        )}
      </div>
    </>
  )
}

export default PictureCollage
