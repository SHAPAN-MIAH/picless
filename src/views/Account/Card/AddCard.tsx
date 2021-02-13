import React, { FunctionComponent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CountryDropdown } from 'react-country-region-selector'
import { useHistory } from 'react-router-dom'

import PaymentService from '../../../services/PaymentService'

import LayoutMain from '../../LayoutMain/LayoutMain'
import FormRow from '../../../components/Common/Form/FormRow'
import FormItem from '../../../components/Common/Form/FormItem'
import TextInput from '../../../components/Common/TextInput'
import ButtonWithLoader from '../../../components/Common/ButtonWithLoader'
import Alert from '../../../components/Common/Alerts/Alerts'
import InputIconCardProvider from '../../../components/Common/InputIconCardProvider'

import { AddCardType, MonthNumbers } from '../../../types/PaymentTypes.d'

const AddCard: FunctionComponent<{}> = () => {
  const { t } = useTranslation()
  const history = useHistory()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const [street, setStreet] = useState('')
  const [email, setEmail] = useState('')
  const [state, setState] = useState('')
  const [nameCard, setNameCard] = useState('')
  const [city, setCity] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [expYear, setExpYear] = useState<string>('')
  const [expMonth, setExpMonth] = useState<string>('')
  const [ccv, setCCV] = useState<string>('')
  const [country, setCountry] = useState('')
  const [ageOfMajor, setAgeOfMajor] = useState(false)

  const handleAddCard = () => {
    if (street && email && state && nameCard && city && cardNumber && postalCode && expYear && expMonth && ccv && country) {
      if (ageOfMajor) {
        const cardData: AddCardType = {
          number: cardNumber,
          holderName: nameCard,
          expireMonth: parseInt(expMonth, 10) as MonthNumbers,
          expireYear: parseInt(expYear, 10),
          ccv: parseInt(ccv, 10),
          billingAddress: {
            street,
            city,
            state,
            postalCode,
            country,
          },
        }
        setIsLoading(true)

        PaymentService.addCard(cardData)
          .then((data: any) => {
            setIsLoading(false)

            if (data.code === 0) {
              history.push('/wallet/payments')
            } else if (data.message && data.code !== 0) {
              setErrorMessage(data.message)
            }
          })
          .catch((err) => {
            setIsLoading(false)
            console.error(err)
            setErrorMessage(JSON.stringify(err))
          })
      } else {
        setErrorMessage(
          'You need to confirm that you are at least 18 years old and the age of majority in your place of residence'
        )
      }
    } else {
      setErrorMessage('Please fill all required fields')
    }
  }

  return (
    <>
      <LayoutMain>
        <div className="content-grid">
          <div className="grid grid-2-8">
            <div className="grid-column"> </div>
            <div className="account-hub-content">
              <div className="section-header">
                <div className="section-header-info">
                  <p className="section-pretitle">{t('wallet.title')}</p>

                  <h2 className="section-title">{t('wallet.addCardTitle')}</h2>
                </div>

                <div className="section-header-actions">
                  <a className="section-header-action" href="/account/wallet">
                    {'< Back'}
                  </a>
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
                            required
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
                            required
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
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
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
                            required
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
                            required
                          />
                        </FormItem>
                        <FormItem>
                          <InputIconCardProvider
                            type="text"
                            id="card-number"
                            classNameFormInput="small"
                            name="card_number"
                            placeholder={t('wallet.addCard.cardNumberField')}
                            value={cardNumber}
                            required
                            onChange={(e) => {
                              setCardNumber(e.target.value)
                            }}
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
                            required
                          />
                        </FormItem>
                        <FormItem>
                          <FormRow classNameRow="split">
                            <FormItem>
                              <TextInput
                                type="text"
                                id="expiration-month"
                                classNameFormInput="small"
                                size={2}
                                minLength={2}
                                maxLength={2}
                                name="expiration_month"
                                placeholder={t('wallet.addCard.expirationMonthField')}
                                value={expMonth}
                                onChange={(e) => {
                                  setExpMonth(e.target.value)
                                }}
                                required
                              />
                            </FormItem>
                            <FormItem>
                              <TextInput
                                type="text"
                                id="expiration-year"
                                classNameFormInput="small"
                                size={4}
                                minLength={4}
                                maxLength={4}
                                name="expiration_year"
                                placeholder={t('wallet.addCard.expirationYearField')}
                                value={expYear || ''}
                                onChange={(e) => {
                                  setExpYear(e.target.value)
                                }}
                                onFocus={() => {
                                  if (expYear === '') setExpYear(new Date().getFullYear().toString().substring(0, 2))
                                }}
                                onBlur={() => {
                                  const splittedYear = new Date().getFullYear().toString().substring(0, 2)

                                  if (expYear === splittedYear) setExpYear('')
                                }}
                                required
                              />
                            </FormItem>
                            <FormItem>
                              <TextInput
                                type="password"
                                id="ccv"
                                classNameFormInput="small"
                                size={4}
                                minLength={3}
                                maxLength={4}
                                name="ccv"
                                placeholder={t('wallet.addCard.ccvField')}
                                value={ccv || ''}
                                onChange={(e) => {
                                  setCCV(e.target.value)
                                }}
                                required
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

                            <label className="" htmlFor="payment-method-payoneer">
                              <span style={{ color: 'red' }}>*</span> Tick here to confirm that you are at least 18 years old
                              and the age of majority in your place of residence
                            </label>

                            <div className="checkbox-info accordion-content-linked" style={{ display: 'none' }}>
                              <p className="checkbox-info-text"> </p>
                            </div>
                          </div>
                        </FormItem>
                      </FormRow>

                      <FormRow>
                        {errorMessage && <Alert alertType="DANGER" message={t(errorMessage)} style={{ width: '100%' }} />}
                        {/* {message && <Alert alertType="PRIMARY" message={t(message)} style={{ width: '100%' }} />} */}
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
