import React, { FunctionComponent, useCallback, Suspense } from 'react'
import Loader from 'react-loader-spinner'
import classNames from 'classnames'

import useSearch from '../../../../hooks/useSearch'

import style from './SearchBar.module.css'

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
            return <SearchBarItem key={`search-${item.userId}`} data={item} />
          })}
        </>
      )
    }

    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h5>No results</h5>
      </div>
    )
  }, [items])

  return (
    <>
      <div className={classNames('header-actions search-bar', style.headerActionImportant)}>
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
          {loading && (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Loader type="TailSpin" color="#615dfa" height={50} width={50} visible />
            </div>
          )}
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
