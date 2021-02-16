import React, { FunctionComponent, useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import useUser from '../../../hooks/useUser'

import PaymentService from '../../../services/PaymentService'

import LayoutMain from '../../LayoutMain/LayoutMain'
import FormRow from '../../../components/Common/Form/FormRow'
import FormItem from '../../../components/Common/Form/FormItem'
import TextInput from '../../../components/Common/TextInput'
import ButtonWithLoader from '../../../components/Common/ButtonWithLoader'
import Alert from '../../../components/Common/Alerts/Alerts'
import InputIconCardProvider from '../../../components/Common/InputIconCardProvider'

import { UserType } from '../../../types/UserType.d'
import { AddCardType, MonthNumbers } from '../../../types/PaymentTypes.d'
import SelectCountry from '../../../components/SelectCountry/SelectCountry'

type FormValues = {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
  email: string
  holderName: string
  cardNumber: string
  expMonth: number
  expYear: number
  ccv: number
  ageOfMajor: boolean
}

const AddCard: FunctionComponent<{}> = () => {
  const { t } = useTranslation()
  const history = useHistory()
  const { getUser } = useUser()

  const [errorMessage, setErrorMessage] = useState<string>('')

  const validationSchema = Yup.object().shape({
    street: Yup.string().required('Street field is required'),
    city: Yup.string().required('City field is required'),
    state: Yup.string().required('State field is required'),
    zipCode: Yup.string().required('Zip code / Postal code email field is required'),
    country: Yup.string().required('Country field is required'),
    email: Yup.string().email('Please enter an valid email').required('Email field is required'),
    holderName: Yup.string().required('Holder Name field is required'),
    expMonth: Yup.number().required('Expiration Month field is required').min(1).max(12),
    expYear: Yup.number().required('Expiration Year field is required').min(new Date().getFullYear()),
    ccv: Yup.number().required('CCV field is required'),
    cardNumber: Yup.string(),
    ageOfMajor: Yup.boolean(),
  })

  const { control, handleSubmit, setValue, errors, formState } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  })

  useEffect(() => {
    getUser().then((user: UserType) => {
      setValue('email', user.email)
      setValue('country', user.countryCode)
    })
  }, [getUser, setValue])

  const onSubmit = (values: FormValues) => {
    const cardData: AddCardType = {
      number: values.cardNumber,
      holderName: values.holderName,
      expireMonth: values.expMonth as MonthNumbers,
      expireYear: values.expYear,
      ccv: values.ccv,
      billingAddress: {
        street: values.street,
        city: values.city,
        state: values.state,
        postalCode: values.zipCode,
        country: values.country,
      },
    }

    const addCardPromise = PaymentService.addCard(cardData)

    return toast
      .promise(addCardPromise, {
        loading: 'Loading',
        success: 'Card Added Successfully',
        error: 'Error adding the card',
      })
      .then((data: any) => {
        if (data.code === 0) {
          history.push('/account/wallet')
        } else if (data.message && data.code !== 0) {
          setErrorMessage(data.message)
        }
      })
      .catch((err) => {
        console.error(err)
        setErrorMessage(JSON.stringify(err))
      })
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
                    <form className="form" onSubmit={handleSubmit(onSubmit)}>
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
                          <Controller
                            control={control}
                            as={TextInput}
                            type="text"
                            name="street"
                            defaultValue=""
                            placeholder={t('wallet.addCard.streetField')}
                            classNameFormInput="small active"
                            required
                            errorMessage={errors.street?.message}
                          />
                        </FormItem>
                        <FormItem>
                          <Controller
                            control={control}
                            as={TextInput}
                            type="text"
                            name="email"
                            defaultValue=""
                            placeholder={t('wallet.addCard.emailField')}
                            classNameFormInput="small active"
                            required
                            errorMessage={errors.email?.message}
                          />
                        </FormItem>
                      </FormRow>

                      <FormRow classNameRow="split">
                        <FormItem>
                          <Controller
                            control={control}
                            as={TextInput}
                            type="text"
                            name="city"
                            defaultValue=""
                            placeholder={t('wallet.addCard.cityField')}
                            classNameFormInput="small active"
                            required
                            errorMessage={errors.city?.message}
                          />
                        </FormItem>
                        <FormItem>
                          <Controller
                            control={control}
                            as={TextInput}
                            type="text"
                            name="holderName"
                            defaultValue=""
                            placeholder={t('wallet.addCard.nameCardField')}
                            classNameFormInput="small active"
                            required
                            errorMessage={errors.holderName?.message}
                          />
                        </FormItem>
                      </FormRow>

                      <FormRow classNameRow="split">
                        <FormItem>
                          <Controller
                            control={control}
                            as={TextInput}
                            type="text"
                            name="state"
                            defaultValue=""
                            placeholder={t('wallet.addCard.stateProvinceField')}
                            classNameFormInput="small active"
                            required
                            errorMessage={errors.state?.message}
                          />
                        </FormItem>
                        <FormItem>
                          <Controller
                            control={control}
                            name="cardNumber"
                            defaultValue=""
                            render={(propsController) => (
                              <InputIconCardProvider
                                type="text"
                                ref={propsController.ref}
                                classNameFormInput="small"
                                name={propsController.name}
                                placeholder={t('wallet.addCard.cardNumberField')}
                                value={propsController.value}
                                required
                                id="card-number"
                                onChange={(e) => {
                                  propsController.onChange(e.target.value)
                                }}
                              />
                            )}
                          />
                        </FormItem>
                      </FormRow>

                      <FormRow classNameRow="split">
                        <FormItem>
                          <Controller
                            control={control}
                            as={TextInput}
                            type="text"
                            name="zipCode"
                            defaultValue=""
                            placeholder={t('wallet.addCard.zipPostalCodeField')}
                            classNameFormInput="small active"
                            required
                            errorMessage={errors.zipCode?.message}
                          />
                        </FormItem>
                        <FormItem>
                          <FormRow classNameRow="split">
                            <FormItem>
                              <Controller
                                control={control}
                                as={TextInput}
                                type="text"
                                name="expMonth"
                                defaultValue=""
                                minLength={2}
                                maxLength={2}
                                placeholder={t('wallet.addCard.expirationMonthField')}
                                classNameFormInput="small active"
                                required
                                errorMessage={errors.expMonth?.message}
                              />
                            </FormItem>
                            <FormItem>
                              <Controller
                                control={control}
                                as={TextInput}
                                type="text"
                                name="expYear"
                                defaultValue=""
                                minLength={4}
                                maxLength={4}
                                placeholder={t('wallet.addCard.expirationYearField')}
                                classNameFormInput="small active"
                                required
                                errorMessage={errors.expYear?.message}
                              />
                            </FormItem>
                            <FormItem>
                              <Controller
                                control={control}
                                as={TextInput}
                                type="password"
                                name="ccv"
                                defaultValue=""
                                minLength={3}
                                maxLength={4}
                                placeholder={t('wallet.addCard.ccvField')}
                                classNameFormInput="small active"
                                required
                                errorMessage={errors.ccv?.message}
                              />
                            </FormItem>
                          </FormRow>
                        </FormItem>
                      </FormRow>

                      <FormRow classNameRow="split">
                        <FormItem>
                          <Controller
                            control={control}
                            name="country"
                            defaultValue=""
                            render={(propsController) => (
                              <SelectCountry
                                id="country-code"
                                name={propsController.name}
                                placeholder={t('profileInfo.countryField')}
                                value={propsController.value || ''}
                                onChange={(val: any) => {
                                  propsController.onChange(val.target.value)
                                }}
                              />
                            )}
                          />
                        </FormItem>
                        <FormItem>
                          <div className="checkbox-wrap selected">
                            <input type="checkbox" id="payment-method-payoneer" name="payment_method" />

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
                      </FormRow>

                      <FormRow classNameRow="split">
                        <FormItem>
                          <ButtonWithLoader type="submit" className="small primary" showLoader={formState.isSubmitting}>
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
