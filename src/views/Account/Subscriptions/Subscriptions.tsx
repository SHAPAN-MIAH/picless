import React, { FunctionComponent } from 'react'

import LayoutMain from '../../LayoutMain/LayoutMain'
import HeaderFilter from './HeaderFilter/HeaderFilter'
import SubscriptionList from './SubscriptionList/SubscriptionList'

const Subscriptions: FunctionComponent<{}> = () => {
  return (
    <>
      <LayoutMain>
        <div className="content-grid">
          <section className="section">
            <div className="section-header">
              <div className="section-header-info">
                <p className="section-pretitle">Subscriptions</p>

                <h2 className="section-title">My Subscriptions</h2>
              </div>
            </div>

            <HeaderFilter />

            <div className="grid">
              <SubscriptionList />
            </div>

            <div className="section-pager-bar">
              <div className="section-pager">
                <div className="section-pager-item active">
                  <p className="section-pager-item-text">01</p>
                </div>

                <div className="section-pager-item">
                  <p className="section-pager-item-text">02</p>
                </div>

                <div className="section-pager-item">
                  <p className="section-pager-item-text">03</p>
                </div>

                <div className="section-pager-item">
                  <p className="section-pager-item-text">04</p>
                </div>

                <div className="section-pager-item">
                  <p className="section-pager-item-text">05</p>
                </div>

                <div className="section-pager-item">
                  <p className="section-pager-item-text">06</p>
                </div>
              </div>

              <div className="section-pager-controls">
                <div className="slider-control left disabled">
                  <svg className="slider-control-icon icon-small-arrow">
                    <use xlinkHref="#svg-small-arrow"> </use>
                  </svg>
                </div>

                <div className="slider-control right">
                  <svg className="slider-control-icon icon-small-arrow">
                    <use xlinkHref="#svg-small-arrow"> </use>
                  </svg>
                </div>
              </div>
            </div>
          </section>
        </div>
      </LayoutMain>
    </>
  )
}

export default Subscriptions
