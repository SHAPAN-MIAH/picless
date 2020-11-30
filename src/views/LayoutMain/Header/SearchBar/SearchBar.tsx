import React, { FunctionComponent, useCallback, Suspense } from 'react'

import useSearch from './SearchBarHook'
import { UserSearchType } from '../../../../types/UserType.d'

const SearchBarItem = React.lazy(() => import('./SearchBarItem/SearchBarItem'))

const SearchBar: FunctionComponent<{}> = () => {
  const { loading, keyword, items, changeKeyword, clear } = useSearch({ initialKeyword: '' })

  const onChangeSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const query = e.target.value
      if (!query) {
        clear()
      } else {
        changeKeyword(query)
      }
    },
    [changeKeyword, clear]
  )

  const renderSearchResults = useCallback(() => {
    if (items && Object.keys(items).length && items.length) {
      return (
        <>
          {items.slice(0, 5).map((item: UserSearchType) => {
            console.log(item)
            return <SearchBarItem key={`search-${item.userId}`} data={item} />
          })}
        </>
      )
    }

    return <h5>No results</h5>
  }, [items])

  return (
    <>
      <div className="header-actions search-bar">
        <div className="interactive-input dark">
          <input
            type="text"
            id="search-main"
            name="search_main"
            placeholder="Search here for people or groups"
            autoComplete="false"
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
          {loading && <h1>Loading ...</h1>}
          {!loading && (
            <>
              <div className="dropdown-box-category">
                <p className="dropdown-box-category-title">Providers</p>
              </div>

              <div className="dropdown-box-list small no-scroll">
                <Suspense fallback="Loading...">{!loading && renderSearchResults()}</Suspense>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
export default SearchBar
