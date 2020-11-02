import React, { FunctionComponent } from 'react'
import Reactions from './Reactions'

const FooterPost: FunctionComponent<{}> = () => {
  return (
    <>
      <div className="post-options">
        <div className="post-option-wrap">
          <div className="post-option reaction-options-dropdown-trigger">
            <svg className="post-option-icon icon-thumbs-up">
              <use xlinkHref="#svg-thumbs-up" />
            </svg>

            <p className="post-option-text">React!</p>
          </div>

          <Reactions />
        </div>

        <div className="post-option">
          <svg className="post-option-icon icon-comment">
            <use xlinkHref="#svg-comment" />
          </svg>

          <p className="post-option-text">Comment</p>
        </div>

        <div className="post-option">
          <svg className="post-option-icon icon-share">
            <use xlinkHref="#svg-share" />
          </svg>

          <p className="post-option-text">Share</p>
        </div>
      </div>
    </>
  )
}

export default FooterPost
