import React, { FunctionComponent, useState } from 'react'
import _ from 'lodash'
import { useTranslation } from 'react-i18next'
import { CountryDropdown } from 'react-country-region-selector'

import useWallet from '../../../hooks/useWallet'

import LayoutMain from '../../LayoutMain/LayoutMain'
import AccountSidebar from '../AccountSidebar/AccountSidebar'
import FormRow from '../../../components/Common/Form/FormRow'
import FormItem from '../../../components/Common/Form/FormItem'
import TextInput from '../../../components/Common/TextInput'
import ButtonWithLoader from '../../../components/Common/ButtonWithLoader'

import { AddCardType, MonthNumbers } from '../../../types/PaymentTypes.d'

const AddCard: FunctionComponent<{}> = () => {
  const { t } = useTranslation()

  const { addCard, isLoading } = useWallet()

  const [street, setStreet] = useState('')
  const [email, setEmail] = useState('')
  const [state, setState] = useState('')
  const [nameCard, setNameCard] = useState('')
  const [city, setCity] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [expYear, setExpYear] = useState<number | null>(null)
  const [expMonth, setExpMonth] = useState<MonthNumbers | null>(null)
  const [ccv, setCCV] = useState<number | null>(null)
  const [country, setCountry] = useState('')
  const [ageOfMajor, setAgeOfMajor] = useState(false)

  const handleAddCard = () => {
    const cardData: AddCardType = {
      number: cardNumber,
      holderName: nameCard,
      expireMonth: expMonth,
      expireYear: expYear,
      ccv,
      billingAddress: {
        street,
        city,
        state,
        postalCode,
        country,
      },
    }

    addCard(cardData)
  }

  return (
    <>
      <LayoutMain>
        <div className="content-grid">
          <div className="grid grid-3-9">
            <AccountSidebar />

            <div className="account-hub-content">
              <div className="section-header">
                <div className="section-header-info">
                  <p className="section-pretitle">{t('wallet.title')}</p>

                  <h2 className="section-title">{t('wallet.addCardTitle')}</h2>
                </div>
              </div>
              <div className="grid-column">
                <div className="widget-box">
                  <div className="widget-box-content">
                    <form className="form">
                      <FormRow classNameRow="split">
                        <FormItem>
                          <p className="widget-box-title">{t('wallet.addCard.billingInfoTitle')}</p>
                        </FormItem>
                        <FormItem>
                          <p className="widget-box-title">{t('wallet.addCard.cardDetailsTitle')}</p>
                        </FormItem>
                      </FormRow>
                      <FormRow classNameRow="split">
                        <FormItem>
                          <TextInput
                            type="text"
                            id="street"
                            classNameFormInput="small"
                            name="street"
                            placeholder={t('wallet.addCard.streetField')}
                            value={street}
                            onChange={(e) => setStreet(e.target.value)}
                          />
                        </FormItem>
                        <FormItem>
                          <TextInput
                            type="text"
                            id="account-email"
                            classNameFormInput="small "
                            name="account_email"
                            placeholder={t('wallet.addCard.emailField')}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </FormItem>
                      </FormRow>

                      <FormRow classNameRow="split">
                        <FormItem>
                          <TextInput
                            type="text"
                            id="city"
                            classNameFormInput="small"
                            name="city"
                            placeholder={t('wallet.addCard.cityField')}
                            defaultValue={city}
                            onChange={(e) => setCity(e.target.value)}
                          />
                        </FormItem>
                        <FormItem>
                          <TextInput
                            type="text"
                            id="name-card"
                            classNameFormInput="small "
                            name="name_card"
                            placeholder={t('wallet.addCard.nameCardField')}
                            value={nameCard}
                            onChange={(e) => setNameCard(e.target.value)}
                          />
                        </FormItem>
                      </FormRow>

                      <FormRow classNameRow="split">
                        <FormItem>
                          <TextInput
                            type="text"
                            id="state-province"
                            classNameFormInput="small"
                            name="state_province"
                            placeholder={t('wallet.addCard.stateProvinceField')}
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                          />
                        </FormItem>
                        <FormItem>
                          <TextInput
                            type="text"
                            id="card-number"
                            classNameFormInput="small"
                            name="card_number"
                            placeholder={t('wallet.addCard.cardNumberField')}
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                          />
                        </FormItem>
                      </FormRow>

                      <FormRow classNameRow="split">
                        <FormItem>
                          <TextInput
                            type="text"
                            id="zip-postal-code"
                            classNameFormInput="small"
                            name="zip_postal_code"
                            placeholder={t('wallet.addCard.zipPostalCodeField')}
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                          />
                        </FormItem>
                        <FormItem>
                          <FormRow classNameRow="split">
                            <FormItem>
                              <TextInput
                                type="text"
                                id="expiration-month"
                                classNameFormInput="small"
                                name="expiration_month"
                                placeholder={t('wallet.addCard.expirationMonthField')}
                                value={expMonth || ''}
                                onChange={(e) => {
                                  if (_.isNumber(e.target.value)) {
                                    setExpMonth(e.target.value)
                                  }
                                }}
                              />
                            </FormItem>
                            <FormItem>
                              <TextInput
                                type="text"
                                id="expiration-year"
                                classNameFormInput="small"
                                name="expiration_year"
                                placeholder={t('wallet.addCard.expirationYearField')}
                                value={expYear || ''}
                                onChange={(e) => {
                                  if (_.isNumber(e.target.value)) {
                                    setExpYear(e.target.value)
                                  }
                                }}
                              />
                            </FormItem>
                            <FormItem>
                              <TextInput
                                type="text"
                                id="ccv"
                                classNameFormInput="small"
                                name="ccv"
                                placeholder={t('wallet.addCard.ccvField')}
                                value={ccv || ''}
                                onChange={(e) => {
                                  if (_.isNumber(e.target.value)) {
                                    setCCV(e.target.value)
                                  }
                                }}
                              />
                            </FormItem>
                          </FormRow>
                        </FormItem>
                      </FormRow>

                      <FormRow classNameRow="split">
                        <FormItem>
                          <div className="form-select">
                            <label htmlFor="account-country">{t('profileInfo.countryField')}</label>
                            <CountryDropdown
                              id="account-country"
                              name="account_country"
                              value={country}
                              onChange={(val) => {
                                setCountry(val)
                              }}
                            />
                          </div>
                        </FormItem>
                        <FormItem>
                          <div className="checkbox-wrap selected">
                            <input
                              type="checkbox"
                              id="payment-method-payoneer"
                              name="payment_method"
                              checked={ageOfMajor}
                              onChange={() => {
                                setAgeOfMajor(!ageOfMajor)
                              }}
                            />

                            <div className="checkbox-box round" />

                            <label className="accordion-trigger-linked" htmlFor="payment-method-payoneer">
                              Tick here to confirm that you are at least 18 years old and the age of majority in your place
                              of residence
                            </label>

                            <div className="checkbox-info accordion-content-linked" style={{ display: 'none' }}>
                              <p className="checkbox-info-text"> </p>
                            </div>
                          </div>
                        </FormItem>
                      </FormRow>

                      <FormRow>
                        {/* {error && <Alert alertType="DANGER" message={t(error)} style={{ width: '100%' }} />}
                      {message && <Alert alertType="PRIMARY" message={t(message)} style={{ width: '100%' }} />} */}
                      </FormRow>

                      <FormRow classNameRow="split">
                        <FormItem>
                          <ButtonWithLoader
                            type="button"
                            className="small primary"
                            onClick={handleAddCard}
                            showLoader={isLoading}
                          >
                            {t('wallet.addCard.addCardButton')}
                          </ButtonWithLoader>
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
    </>
  )
}

export default AddCard
