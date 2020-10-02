import React, { FunctionComponent } from 'react'

import LayoutMain from '../LayoutMain/LayoutMain'
import FormItem from '../../components/Common/Form/FormItem'
import TextInput from '../../components/Common/TextInput'
import AccountSidebar from './AccountSidebar/AccountSidebar'
import FormRow from '../../components/Common/Form/FormRow'

const AccountInfo: FunctionComponent<{}> = () => {
  return (
    <LayoutMain>
      <div className="content-grid">
        <div className="grid grid-3-9">
          <AccountSidebar />

          <div className="account-hub-content">
            <div className="section-header">
              <div className="section-header-info">
                <p className="section-pretitle">Account</p>

                <h2 className="section-title">Account Info</h2>
              </div>
            </div>

            <div className="grid-column">
              <div className="widget-box">
                <p className="widget-box-title">Personal Info</p>

                <div className="widget-box-content">
                  <form className="form">
                    <FormRow classNameRow="split">
                      <FormItem>
                        <TextInput
                          type="text"
                          id="account-full-name"
                          classNameFormInput="small active"
                          name="account_full_name"
                          placeholder="Full Name"
                          defaultValue="Marina Valentine"
                        />
                      </FormItem>
                      <FormItem>
                        <TextInput
                          type="text"
                          id="account-email"
                          classNameFormInput="small active"
                          name="account_email"
                          placeholder="Account Email"
                          defaultValue="ghuntress@yourmail.com"
                        />
                      </FormItem>
                    </FormRow>

                    <FormRow classNameRow="split">
                      <FormItem>
                        <TextInput
                          type="text"
                          id="account-url-username"
                          classNameFormInput="small active"
                          name="account_url_username"
                          placeholder="URL Username"
                          defaultValue="www.thefanspage.com/marinavalentine"
                        />
                      </FormItem>
                      <FormItem>
                        <TextInput
                          type="text"
                          id="account-recovery-email"
                          classNameFormInput="small active"
                          name="account_recovery_email"
                          placeholder="Recovery Email"
                          defaultValue="pepe@yourmail.com"
                        />
                      </FormItem>
                    </FormRow>

                    <FormRow classNameRow="split">
                      <FormItem>
                        <div className="form-select">
                          <label htmlFor="account-country">Country</label>
                          <select id="account-country" name="account_country">
                            <option value="0">Select your Country</option>
                            <option value="1" selected>
                              United States
                            </option>
                          </select>

                          <svg className="form-select-icon icon-small-arrow">
                            <use xlinkHref="#svg-small-arrow" />
                          </svg>
                        </div>
                      </FormItem>
                      <FormItem>
                        <TextInput
                          type="text"
                          id="phone-number"
                          classNameFormInput="small active"
                          name="phone_number"
                          placeholder="Phone Number"
                          defaultValue="+66995511354"
                        />
                      </FormItem>
                    </FormRow>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutMain>
  )
}

export default AccountInfo
