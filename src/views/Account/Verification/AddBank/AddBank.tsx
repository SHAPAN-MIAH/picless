import { yupResolver } from '@hookform/resolvers/yup'
import React, { FunctionComponent } from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'
import ButtonWithLoader from '../../../../components/Common/ButtonWithLoader'
import DatePickerForm from '../../../../components/Common/DatePickerForm/DatePickerForm'
import FormItem from '../../../../components/Common/Form/FormItem'
import FormRow from '../../../../components/Common/Form/FormRow'
import SelectForm from '../../../../components/Common/SelectForm'
import TextInput from '../../../../components/Common/TextInput'
import SelectCountry from '../../../../components/SelectCountry/SelectCountry'
import UserService from '../../../../services/UserService'
import { AddBankType, DocumentsType } from '../../../../types/PaymentTypes.d'

type FormValues = {
  adultContent: boolean
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  fullAddress: string
  countryCode: string
  state: string
  city: string
  zipCode: string
  dateofbirth: string
  documentType: DocumentsType
}

const documentType = [
  { value: 'PASSPORT', name: 'Passport' },
  { value: 'DRIVING_LICENCE', name: 'Driving licence' },
  { value: 'OTHER', name: 'Other' },
]

const AddBank: FunctionComponent<{}> = () => {
  const { t } = useTranslation()

  // Validations Fields
  const validationSchema = Yup.object().shape({
    adultContent: Yup.boolean(),
    firstName: Yup.string().required('First name field is required'),
    lastName: Yup.string().required('Last name field is required'),
    email: Yup.string().email('Please enter an email valid').required('Email field is required'),
    phoneNumber: Yup.string().required('Phone number field is required'),
    fullAddress: Yup.string().required('Full address field is required'),
    countryCode: Yup.string().required('Contry field is required'),
    state: Yup.string().required('State field is required'),
    city: Yup.string().required('City field is required'),
    zipCode: Yup.string().required('Zip/Postal code field is required'),
    dateofbirth: Yup.string().required('DOB field is required'),
    documentType: Yup.string().required('Document type field is required'),
  })

  const { control, handleSubmit, errors, formState } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  })

  const onSubmit = (values: FormValues) => {
    const bankData: AddBankType = {
      adultContent: values.adultContent,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phoneNumber: values.phoneNumber,
      fullAddress: values.fullAddress,
      country: values.countryCode,
      state: values.state,
      city: values.city,
      street: '',
      postalCode: values.zipCode,
      dateOfBirth: values.dateofbirth,
      documentType: values.documentType,
    }

    const addCardPromise = UserService.addBank(bankData)

    return toast
      .promise(addCardPromise, {
        loading: 'Loading',
        success: 'Bank Added Successfully',
        error: 'Error adding bank',
      })
      .then((data: any) => {
        if (data.code === 0) {
          // history.push('/account/wallet')
        } else if (data.message && data.code !== 0) {
          // setErrorMessage(data.message)
        }
      })
      .catch((err) => {
        console.error(err)
        // setErrorMessage(JSON.stringify(err))
      })
  }
  return (
    <>
      <div className="content-grid">
        <div className="section-banner">
          <img
            className="section-banner-icon"
            src={`${process.env.PUBLIC_URL}/assets/img/banner/marketplace-icon.png`}
            alt="marketplace-icon"
          />

          <p className="section-banner-title">Add a bank and start to earn $$$</p>

          <p className="section-banner-text">
            {process.env.REACT_APP_WEBSITE_NAME} is the best place to buy and sell online content!
          </p>
        </div>
        <div className="grid grid-2-8-2">
          <div className="grid-column">
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
              <div className="widget-box">
                <p className="widget-box-title">Confirm your legal residence</p>

                <div className="widget-box-content">
                  <FormRow classNameRow="split">
                    <FormItem>
                      <Controller
                        control={control}
                        as={TextInput}
                        type="text"
                        name="firstName"
                        defaultValue=""
                        required
                        classNameFormInput="small full"
                        placeholder={t('addBank.firstName')}
                        errorMessage={errors.firstName?.message}
                      />
                    </FormItem>

                    <FormItem>
                      <Controller
                        control={control}
                        as={TextInput}
                        type="text"
                        name="lastName"
                        defaultValue=""
                        required
                        classNameFormInput="small full"
                        placeholder={t('addBank.lastName')}
                        errorMessage={errors.lastName?.message}
                      />
                    </FormItem>
                  </FormRow>

                  <FormRow classNameRow="split">
                    <FormItem>
                      <Controller
                        control={control}
                        as={TextInput}
                        type="text"
                        name="email"
                        defaultValue=""
                        required
                        classNameFormInput="small full"
                        placeholder={t('addBank.email')}
                        errorMessage={errors.email?.message}
                      />
                    </FormItem>

                    <FormItem>
                      <Controller
                        control={control}
                        as={TextInput}
                        type="text"
                        name="phoneNumber"
                        defaultValue=""
                        required
                        classNameFormInput="small full"
                        placeholder={t('addBank.phoneNumber')}
                        errorMessage={errors.phoneNumber?.message}
                      />
                    </FormItem>
                  </FormRow>

                  <FormRow>
                    <FormItem>
                      <Controller
                        control={control}
                        as={TextInput}
                        name="fullAddress"
                        type="text"
                        defaultValue=""
                        required
                        classNameFormInput="small full"
                        placeholder={t('addBank.fullAddress')}
                        errorMessage={errors.fullAddress?.message}
                      />
                    </FormItem>
                  </FormRow>

                  <FormRow classNameRow="split">
                    <FormItem>
                      <Controller
                        control={control}
                        name="countryCode"
                        defaultValue=""
                        render={(propsController) => (
                          <SelectCountry
                            id="country-code"
                            name={propsController.name}
                            placeholder={t('addBank.countryField')}
                            value={propsController.value || ''}
                            required
                            onChange={(val: any) => {
                              propsController.onChange(val.target.value)
                            }}
                          />
                        )}
                      />
                    </FormItem>

                    <FormItem>
                      <Controller
                        control={control}
                        as={TextInput}
                        name="state"
                        type="text"
                        defaultValue=""
                        required
                        classNameFormInput="small full"
                        placeholder={t('addBank.state')}
                        errorMessage={errors.state?.message}
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
                        required
                        classNameFormInput="small full"
                        placeholder={t('addBank.city')}
                        errorMessage={errors.city?.message}
                      />
                    </FormItem>

                    <FormItem>
                      <Controller
                        control={control}
                        as={TextInput}
                        type="text"
                        name="zipCode"
                        defaultValue=""
                        required
                        classNameFormInput="small full"
                        placeholder={t('addBank.zipPostalCodeField')}
                        errorMessage={errors.zipCode?.message}
                      />
                    </FormItem>
                  </FormRow>

                  <FormRow classNameRow="split">
                    <FormItem>
                      <div className="form-input-decorated">
                        <Controller
                          control={control}
                          name="dateofbirth"
                          defaultValue=""
                          render={(propsController) => (
                            <DatePickerForm
                              name={propsController.name}
                              ref={propsController.ref}
                              customInputRef="birthdayRef"
                              classNameFormInput="small"
                              placeholderText={t('addBank.dateofbirth')}
                              selected={propsController.value}
                              onChange={(date: any) => propsController.onChange(date)}
                              iconName="events"
                              peekNextMonth
                              showMonthDropdown
                              showYearDropdown
                              dropdownMode="select"
                            />
                          )}
                        />
                      </div>
                    </FormItem>

                    <FormItem>
                      <Controller
                        control={control}
                        as={SelectForm}
                        defaultValue=""
                        name="documentType"
                        placeholder={t('addBank.documentType')}
                        options={documentType}
                        errorMessage={errors.documentType?.message}
                      />
                    </FormItem>
                  </FormRow>
                </div>
              </div>

              <div className="widget-box" style={{ marginTop: '15px' }}>
                <div className="widget-box-content">
                  <FormRow>
                    <FormItem>
                      <div className="checkbox-wrap selected">
                        <input type="checkbox" id="adultContent" name="payment_method" />

                        <div className="checkbox-box round" />

                        <label className="" htmlFor="adultContent">
                          Tick here if your posts display adult content as nude, fetish or other kind of censored (+18)
                        </label>

                        <div className="checkbox-info accordion-content-linked" style={{ display: 'none' }}>
                          <p className="checkbox-info-text"> </p>
                        </div>
                      </div>
                    </FormItem>
                  </FormRow>
                </div>
              </div>

              <FormRow classNameRow="split" style={{ marginTop: '15px' }}>
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
    </>
  )
}

export default AddBank
