import React, { FunctionComponent, useState } from 'react'

import month from '../../../assets/img/badge/level-badge.png'
import time from '../../../assets/img/badge/splanner-b.png'
import historic from '../../../assets/img/badge/rulerm-b.png'

const data = [
  {
    title: 'MONTH',
    content_photos: 20,
    content_videos: 20,
    visitors_total: 20,
    subs_total: 20,
    suscribers_total: 20,
    suscribers_new: 20,
    interactions_stars: 20,
    interactions_coments: 20,
    interactions_messages: 20,
  },
  {
    title: 'HISTORIC',
    content_photos: 20,
    content_videos: 20,
    visitors_total: 20,
    subs_total: 20,
    suscribers_total: 20,
    suscribers_new: 20,
    interactions_stars: 20,
    interactions_coments: 20,
    interactions_messages: 20,
  },
  {
    title: 'TIME PERIOD COMPARISION',
    content_photos: 20,
    content_videos: 20,
    visitors_total: 20,
    subs_total: 20,
    suscribers_total: 20,
    suscribers_new: 20,
    interactions_stars: 20,
    interactions_coments: 20,
    interactions_messages: 20,
  },
]

const ContentAndInteractios: FunctionComponent<{}> = () => {
  const handleImage = (title: string) => {
    switch (title) {
      case 'MONTH':
        return month
      case 'HISTORIC':
        return historic
      case 'TIME PERIOD COMPARISION':
        return time
    }
  }

  return (
    <>
      <div className="widget-box" style={{ margin: '10px 0 5px 0' }}>
        <h3 className="section-title">Content and interactions table</h3>
        <div className="grid grid-3-3-3-3 change-on-desktop centered">
          {data.map((element) => (
            <div className="account-stat-box account-stat-session-duration">
              <div className="grid grid-9-3">
                <h3 className="tab-box-item-title">{element.title}</h3>
                <img src={handleImage(element.title)} width={60} />
              </div>
              <div className="widget-box-content">
                <h6 style={{ margin: '5px 0 5px 0' }}>CONTENT</h6>
                <p className="bold">{`PHOTOS: ${element.content_photos}`}</p>
                <p className="bold">{`VIDEOS: ${element.content_videos}`}</p>
                <h6 style={{ margin: '5px 0 5px 0' }}>VISITORS</h6>
                <p className="bullet-item-text">{`Total: ${element.visitors_total}`}</p>
                <h6 style={{ margin: '5px 0 5px 0' }}>SUSCRIBERS</h6>
                <p>{`Total: ${element.suscribers_total}`}</p>
                <p>{`New: ${element.suscribers_new}`}</p>
                <h6 style={{ margin: '5px 0 5px 0' }}>INTERACTIONS</h6>
                <p>{`Stars: ${element.interactions_stars}`}</p>
                <p>{`Coments: ${element.interactions_coments}`}</p>
                <p>{`messages: ${element.interactions_messages}`}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default ContentAndInteractios
