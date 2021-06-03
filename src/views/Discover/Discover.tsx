import React, { FunctionComponent } from 'react'
import SearchBar from 'views/LayoutMain/Header/SearchBar/SearchBar'

import './Discover.css'

const Discover: FunctionComponent<{}> = () => {
  return (
    <>
      <div className="content-grid" style={{ maxWidth: '800px' }}>
        <div className="grid mobile-prefer-content">
          <div className="section-header-discovery">
            <SearchBar />
          </div>
          <div className='container-discovery'>
            <div className="grid grid-3-3-3-3 centered grid-photos" style={{ overflow: 'hidden' }}>
            <div className="album-preview"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Discover
