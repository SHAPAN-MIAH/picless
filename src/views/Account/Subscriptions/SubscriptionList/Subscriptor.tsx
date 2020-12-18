import React, { FunctionComponent } from 'react'

const Subscriptor: FunctionComponent<{}> = () => {
  return (
    <>
      <div className="user-preview landscape">
        <figure className="user-preview-cover liquid">
          <img src={`${process.env.PUBLIC_URL}/assets/img/cover/05.jpg`} alt="cover-05" />
        </figure>

        <div className="user-preview-info">
          <div className="user-short-description landscape tiny">
            <a className="user-short-description-avatar user-avatar small" href="profile-timeline.html">
              <div className="user-avatar-border">
                <div className="hexagon-50-56" />
              </div>

              <div className="user-avatar-content">
                <div className="hexagon-image-30-32" data-src={`${process.env.PUBLIC_URL}/assets/img/avatar/07.jpg`} />
              </div>

              <div className="user-avatar-progress">
                <div className="hexagon-progress-40-44" />
              </div>

              <div className="user-avatar-progress-border">
                <div className="hexagon-border-40-44" />
              </div>
            </a>

            <p className="user-short-description-title">
              <a href="profile-timeline.html">Sarah Diamond</a>
            </p>

            <p className="user-short-description-text">
              <a href="#">www.diamondart.com</a>
            </p>
          </div>

          <div className="user-preview-actions">
            <p className="button secondary">
              <svg className="button-icon icon-add-friend">
                <use xlinkHref="#svg-add-friend" />
              </svg>
            </p>

            <p className="button primary">
              <svg className="button-icon icon-comment">
                <use xlinkHref="#svg-comment" />
              </svg>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Subscriptor
