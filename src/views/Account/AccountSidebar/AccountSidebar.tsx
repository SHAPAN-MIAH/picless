import React, { FunctionComponent } from 'react'
import ButtonWithLoader from '../../../components/Common/ButtonWithLoader'

const AccountSidebar: FunctionComponent<{}> = () => {
  return (
    <div>
      <div className="account-hub-sidebar">
        <div className="sidebar-box no-padding">
          <div className="sidebar-menu">
            <div className="sidebar-menu-item">
              <div className="sidebar-menu-header accordion-trigger-linked">
                <svg className="sidebar-menu-header-icon icon-settings">
                  <use xlinkHref="#svg-settings" />
                </svg>

                <div className="sidebar-menu-header-control-icon">
                  <svg className="sidebar-menu-header-control-icon-open icon-minus-small">
                    <use xlinkHref="#svg-minus-small" />
                  </svg>

                  <svg className="sidebar-menu-header-control-icon-closed icon-plus-small">
                    <use xlinkHref="#svg-plus-small" />
                  </svg>
                </div>

                <p className="sidebar-menu-header-title">Account</p>

                <p className="sidebar-menu-header-text">Change your avatar and cover, update information email and more</p>
              </div>

              <div className="sidebar-menu-body accordion-content-linked accordion-open">
                <a className="sidebar-menu-link active" href="hub-account-info.html">
                  Profile Info
                </a>

                <a className="sidebar-menu-link" href="hub-account-password.html">
                  Overview
                </a>

                <a className="sidebar-menu-link" href="hub-account-settings.html">
                  Change Password
                </a>

                <a className="sidebar-menu-link" href="hub-account-settings.html">
                  Logout
                </a>
              </div>
            </div>
          </div>

          <div className="sidebar-box-footer">
            <ButtonWithLoader type="submit" className="button medium primary" showLoader={false}>
              Save Changes!
            </ButtonWithLoader>

            <ButtonWithLoader type="reset" className="button medium white" showLoader={false}>
              Discard All
            </ButtonWithLoader>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountSidebar
