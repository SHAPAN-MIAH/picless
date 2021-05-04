import React, { FunctionComponent, useState } from 'react'

import video from '../../../assets/img/badge/verifieds-b.png'
import picture from '../../../assets/img/badge/prophoto-b.png'
import multiple from '../../../assets/img/badge/peoplesp-b.png'
import live from '../../../assets/img/badge/forumsf-b.png'
import no_image from '../../../assets/img/banner/banner-reaction.jpg'


const data = [
  {
    title: 'la Picture Gato',
    url: 'https://estaticos.muyinteresante.es/uploads/images/gallery/594a1ced5bafe85dfd3c9869/gato-romano-redes.jpg',
    type: 'PICTURE',
    date: '21/12/21',
    privacy: 'Public',
    visualizaciones: 20,
    start: 20,
    coments: 20,
    tips_q: 20,
    tips_revenue: 20,
    tips_average: 20,
  },
  {
    title: 'El video del Gato',
    url: 'https://cuarteldelmetal.com/wp-content/uploads/2020/09/Babymetal.jpg',
    type: 'VIDEO',
    date: '21/12/21',
    privacy: 'Public',
    visualizaciones: 20,
    start: 20,
    coments: 20,
    tips_q: 20,
    tips_revenue: 20,
    tips_average: 20,
  },
  {
    title: 'EL multiple del Gato',
    url: 'https://i.ytimg.com/vi/nsapNssgqVo/maxresdefault.jpg',
    type: 'MULTIPLE',
    date: '21/12/21',
    privacy: 'Public',
    visualizaciones: 20,
    start: 20,
    coments: 20,
    tips_q: 20,
    tips_revenue: 20,
    tips_average: 20,
  },
  {
    title: 'El Live del gato',
    url: 'https://www.youtube.com/watch?v=5qap5aO4i9A&ab_channel=LofiGirl',
    type: 'LIVE',
    date: '21/12/21',
    privacy: 'Public',
    visualizaciones: 20,
    start: 20,
    coments: 20,
    tips_q: 20,
    tips_revenue: 20,
    tips_average: 20,
  },
]

const PostTable: FunctionComponent<{}> = () => {
  const handleImage = (type: string) => {
    switch (type) {
      case 'PICTURE':
        return picture
      case 'VIDEO':
        return video
      case 'MULTIPLE':
        return multiple
      case 'LIVE':
        return live
    }
  }

  return (
    <>
      <div className="widget-box" style={{ margin: '10px 0 5px 0' }}>
        <h3 className="section-title">Post table</h3>
        <div className="grid grid-3-3-3-3 change-on-desktop centered">
          {data.map((element) => (
            <div className="account-stat-box account-stat-active-users" >
                <div style={{ 
                    backgroundImage: `url(${element.url}), url(${no_image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'top',
                    backgroundRepeat: 'no-repeat',
                    height: '130px',
                    margin: '-32px -28px -12px -28px',
                    borderRadius: '12px 12px 0 0'
                    }}/>
                <div className="grid grid-9-3" style={{ alignItems: 'center'}}>
                    <h4 className="tab-box-item-title">{element.title}</h4>
                    <img src={handleImage(element.type)} width={60} />
                </div>
                <div className="widget-box-content" style={{ marginTop: '5px'}}>
                    <p className="bold">{`Type: ${element.type}`}</p>
                    <p className="bold">{`Date: ${element.date}`}</p>
                    <p className="bullet-item-text">{`Privacy: ${element.privacy}`}</p>
                    <p>{`Visualizaciones: ${element.visualizaciones}`}</p>
                    <p>{`Stars: ${element.start}`}</p>
                    <p>{`Coments: ${element.coments}`}</p>
                    <h6 style={{ margin: '5px 0 5px 0' }}>TIPS</h6>
                    <p>{`Q: $${element.tips_q}`}</p>
                    <p>{`Revenue: $${element.tips_revenue}`}</p>
                    <p>{`Average: $${element.tips_average}`}</p>
                </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default PostTable
