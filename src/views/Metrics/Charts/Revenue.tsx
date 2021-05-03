import React, { FunctionComponent, useState } from 'react'


const data = [
  {
    title: 'MONTH',
    total: 20,
    subs_Amount: 20,
    subs_total: 20,
    content_Amount: 20,
    content_total: 20,
    tips_Amount: 20,
    tips_total: 20
  },
  {
    title: 'HISTORIC',
    total: 20,
    subs_Amount: 20,
    subs_total: 20,
    content_Amount: 20,
    content_total: 30,
    tips_Amount: 20,
    tips_total: 20
  },
  {
    title: 'TIME PERIOD COMPARISION',
    total: 20,
    subs_Amount: 20,
    subs_total: 20,
    content_Amount: 20,
    content_total: 20,
    tips_Amount: 20,
    tips_total: 40
  }
]

const Revenue: FunctionComponent<{}> = () => {

  return (
    <>
      <div className="widget-box" >
        <h3 className="section-title">Revenue table: Time period vs Amount</h3>
        <div className="grid grid-3-3-3-3 change-on-desktop centered">
        {data.map(element => (
            <div className="widget-box">
              <h3 className="tab-box-item-title">{element.title}</h3>
              <div className="widget-box-content">
                <p className="bold">{`Total: $${element.total}`}</p>
                <h6 style={{ margin: "5px 0 5px 0"}}>SUSCRIPTIONS</h6>
                <p className="bullet-item-text">{`Amount: $${element.subs_Amount}`}</p>
                <p>{`$/Total: $${element.subs_total}`}</p>
                <h6 style={{ margin: "5px 0 5px 0"}}>EXCLUSIVE CONTENT</h6>
                <p>{`Amount: $${element.content_Amount}`}</p>
                <p>{`$/Total: $${element.content_total}`}</p>
                <h6 style={{ margin: "5px 0 5px 0"}}>TIPS</h6>
                <p>{`Amount: $${element.tips_Amount}`}</p>
                <p>{`$/Total: $${element.tips_total}`}</p>
              </div>
            </div>
        ))}
        </div>
    </div>
    </>
  )
}

export default Revenue
