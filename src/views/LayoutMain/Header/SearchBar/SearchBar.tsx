import classNames from 'classnames'
import React, { FunctionComponent, Suspense, useCallback, useState } from 'react'
import { isMobile } from 'react-device-detect'
import Loader from 'react-loader-spinner'
import styled from 'styled-components'
import useSearch from '../../../../hooks/useSearch'
import { UserSearchType } from '../../../../types/UserType.d'
import style from './SearchBar.module.css'




const SearchBarItem = React.lazy(() => import('./SearchBarItem/SearchBarItem'))

const MobileDropDown = styled.div`
  top: 65px;
  left: 0;
  width: 100%;
  position: absolute !important;
`

const SearchBar: FunctionComponent<{}> = () => {
  const { loading, keyword, items, changeKeyword, clear } = useSearch({ initialKeyword: '' })

  const [showDropdown, setShowDropDown] = useState<boolean>(false)

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value

    if (!query) {
      clear()
      setShowDropDown(false)
    } else {
      setShowDropDown(true)
      changeKeyword(query)
    }
  }

  const renderSearchResults = useCallback(() => {
    if (items && Object.keys(items).length && items.length) {
      return (
        <>
          {items.slice(0, 5).map((item: UserSearchType) => {
            return <SearchBarItem key={`search-${item.userId}`} data={item} onClick={onClickElement} />
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

  const onClickElement = () => {
    const closeDropDownButton = document.getElementsByClassName('interactive-input-action')[0] as any

    if (closeDropDownButton) closeDropDownButton.click()
  }

  const onCleanSearch = useCallback(() => {
    clear()
    setShowDropDown(false)
  }, [setShowDropDown, clear])

  return (
    <>
      <div className={classNames('header-actions search-bar', style.headerActionImportant)}>
        <div className="interactive-input dark">
          <input
            type="text"
            id="search-main"
            name="search_main"
            placeholder="Search"
            autoComplete="false"
            value={keyword}
            onChange={onChangeSearch}
          />

          <div className="interactive-input-icon-wrap">
            <svg className="interactive-input-icon icon-magnifying-glass">
              <use xlinkHref="#svg-magnifying-glass" />
            </svg>
          </div>

          <div
            className="interactive-input-action"
            onClick={() => {
              onCleanSearch()
            }}
          >
            <svg className="interactive-input-action-icon icon-cross-thin">
              <use xlinkHref="#svg-cross-thin" />
            </svg>
          </div>
        </div>

        {!isMobile && (
          <div className="dropdown-box padding-bottom-small header-search-dropdown">
            {loading && (
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                <Loader type="TailSpin" color="#615dfa" height={25} width={25} visible />
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
        )}

        {isMobile && showDropdown && (
          <MobileDropDown className="dropdown-box padding-bottom-small">
            {loading && (
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                <Loader type="TailSpin" color="#615dfa" height={25} width={25} visible />
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
          </MobileDropDown>
        )}
      </div>
    </>
  )
}
export default SearchBar
