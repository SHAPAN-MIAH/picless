import React, { FunctionComponent, useCallback, Suspense } from 'react'

import useSearch from './SearchBarHook'

const SearchBarItem = React.lazy(() => import('./SearchBarItem/SearchBarItem'))

const SearchBar: FunctionComponent<{}> = () => {
  const { keyword, items, changeKeyword } = useSearch({ initialKeyword: '' })

  const onChangeSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      changeKeyword(e.target.value)
    },
    [changeKeyword]
  )

  return (
    <>
      <div className="header-actions search-bar">
        <div className="interactive-input dark">
          <input
            type="text"
            id="search-main"
            name="search_main"
            placeholder="Search here for people or groups"
            value={keyword}
            onChange={onChangeSearch}
          />

          <div className="interactive-input-icon-wrap">
            <svg className="interactive-input-icon icon-magnifying-glass">
              <use xlinkHref="#svg-magnifying-glass" />
            </svg>
          </div>

          <div className="interactive-input-action">
            <svg className="interactive-input-action-icon icon-cross-thin">
              <use xlinkHref="#svg-cross-thin" />
            </svg>
          </div>
        </div>

        <div className="dropdown-box padding-bottom-small header-search-dropdown">
          <div className="dropdown-box-category">
            <p className="dropdown-box-category-title">Providers</p>
          </div>

          <div className="dropdown-box-list small no-scroll">
            <Suspense fallback="Loading...">
              {items.map((item: any) => (
                <SearchBarItem data={item} />
              ))}
            </Suspense>
          </div>
        </div>
      </div>
    </>
  )
}
export default SearchBar
