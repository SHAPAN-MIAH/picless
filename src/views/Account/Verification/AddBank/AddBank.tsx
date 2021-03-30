import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { FunctionComponent } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'
import ButtonWithLoader from '../../../../components/Common/ButtonWithLoader'
import FormItem from '../../../../components/Common/Form/FormItem'
import FormRow from '../../../../components/Common/Form/FormRow'
import SelectForm from '../../../../components/Common/SelectForm'
import TextInput from '../../../../components/Common/TextInput'
import SelectCountry from '../../../../components/SelectCountry/SelectCountry'

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
  postalCode: string
  dateofbirth: string
  documentType: string
  photoID: string
  photoHoldingId: string
}

const documentType = [
  { value: 'PASSPORT', name: 'Passport' },
  { value: 'DRIVING_LICENCE', name: 'Driving licence' },
  { value: 'OTHER', name: 'Other' },
]

const fileTypes = ['image/png', 'image/jpeg']

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
    postalCode: Yup.string().required('Zip/Postal code field is required'),
    dateofbirth: Yup.string().required('DOB field is required'),
    documentType: Yup.string().required('Document type field is required'),
    photoID: Yup.mixed()
      .required('A photo ID is required')
      .test('fileFormat', 'Images only', (value) => {
        return value[0] && fileTypes.includes(value[0].type)
      }),
    photoHoldingId: Yup.mixed()
      .required('A photo holding your ID is required')
      .test('fileFormat', 'Images only', (value) => {
        return value[0] && fileTypes.includes(value[0].type)
      }),
  })

  const { control, handleSubmit, register, errors, formState } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  })

  const onSubmit = (data: FormValues) => {
    console.log(data)
  }

  let photoIdFile: HTMLInputElement | null
  let photoHoldingIdFile: HTMLInputElement | null

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
                        name="postalCode"
                        defaultValue=""
                        required
                        classNameFormInput="small full"
                        placeholder={t('addBank.zipPostalCodeField')}
                        errorMessage={errors.postalCode?.message}
                      />
                    </FormItem>
                  </FormRow>

                  <FormRow classNameRow="split">
                    <FormItem>
                      <Controller
                        control={control}
                        as={TextInput}
                        type="text"
                        name="dateofbirth"
                        defaultValue=""
                        required
                        classNameFormInput="small full"
                        placeholder={t('addBank.dateofbirth')}
                        errorMessage={errors.dateofbirth?.message}
                      />
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

              <div className="widget-box" style={{ marginTop: '15px' }}>
                <div className="widget-box-content">
                  <FormRow classNameRow="split">
                    <FormItem>
                      <p className="widget-box-title">Photo of your ID</p>
                      <p>Please upload a photo of your picture ID Document (i,e, Passport or Driving License)</p>
                      <ButtonWithLoader
                        type="button"
                        className="small white"
                        onClick={() => photoIdFile?.click()}
                        showLoader={false}
                      >
                        {`${t('addBank.selectPhotoID')}`}
                      </ButtonWithLoader>

                      {errors.photoID?.message && (
                        <p className="inputErrorFieldText">
                          <FontAwesomeIcon icon="exclamation-triangle" /> {errors.photoHoldingId?.message}
                        </p>
                      )}

                      <input
                        style={{ display: 'none' }}
                        type="file"
                        name="photoID"
                        accept="image/png, image/jpeg"
                        ref={(input) => {
                          photoIdFile = input
                          register(input)
                        }}
                      />
                    </FormItem>

                    <FormItem>
                      <p className="widget-box-title">Photo of holding your ID</p>
                      <p>Please upload a photo holding ID (i,e, a selfie, ensuring your face is clearly visible)</p>
                      <ButtonWithLoader
                        type="button"
                        className="small white"
                        onClick={() => photoHoldingIdFile?.click()}
                        showLoader={false}
                      >
                        {`${t('addBank.selectPhotoHoldingID')}`}
                      </ButtonWithLoader>

                      {errors.photoHoldingId?.message && (
                        <p className="inputErrorFieldText">
                          <FontAwesomeIcon icon="exclamation-triangle" /> {errors.photoHoldingId?.message}
                        </p>
                      )}

                      <input
                        style={{ display: 'none' }}
                        type="file"
                        name="photoHoldingId"
                        accept="image/png, image/jpeg"
                        ref={(input) => {
                          photoHoldingIdFile = input
                          register(input)
                        }}
                      />
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
