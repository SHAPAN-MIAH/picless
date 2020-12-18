import React, { FunctionComponent } from 'react'

const HeaderFilter: FunctionComponent<{}> = () => {
  return (
    <>
      <div className="section-filters-bar v1">
        <div className="section-filters-bar-actions">
          <form className="form">
            <div className="form-input small with-button">
              <label htmlFor="friends-search">Search Friends</label>
              <input type="text" id="friends-search" name="friends_search" />

              <button type="button" className="button primary">
                <svg className="icon-magnifying-glass">
                  <use xlinkHref="#svg-magnifying-glass" />
                </svg>
              </button>
            </div>

            <div className="form-select">
              <label htmlFor="friends-filter-category">Filter By</label>
              <select id="friends-filter-category" name="friends_filter_category">
                <option value="0">Recently Active</option>
                <option value="1">Newest Friends</option>
                <option value="2">Alphabetical</option>
              </select>

              <svg className="form-select-icon icon-small-arrow">
                <use xlinkHref="#svg-small-arrow"></use>
              </svg>
            </div>
          </form>

          {/* <div className="filter-tabs">
            <div className="filter-tab active">
              <p className="filter-tab-text">Recently Active</p>
            </div>

            <div className="filter-tab">
              <p className="filter-tab-text">Newest Friends</p>
            </div>

            <div className="filter-tab">
              <p className="filter-tab-text">Alphabetical</p>
            </div>
          </div> */}
        </div>

        <div className="section-filters-bar-actions">
          <div className="view-actions">
            <a className="view-action text-tooltip-tft-medium" href="profile-friends.html" data-title="Big Grid">
              <svg className="view-action-icon icon-big-grid-view">
                <use xlinkHref="#svg-big-grid-view"></use>
              </svg>
            </a>

            <a
              className="view-action text-tooltip-tft-medium"
              href="profile-friends-small-grid.html"
              data-title="Small Grid"
            >
              <svg className="view-action-icon icon-small-grid-view">
                <use xlinkHref="#svg-small-grid-view"></use>
              </svg>
            </a>

            <a className="view-action text-tooltip-tft-medium active" href="profile-friends-list.html" data-title="List">
              <svg className="view-action-icon icon-list-grid-view">
                <use xlinkHref="#svg-list-grid-view"></use>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default HeaderFilter
