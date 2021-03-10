import { yupResolver } from '@hookform/resolvers/yup'
import SelectCountry from 'components/SelectCountry/SelectCountry'
import React, { FunctionComponent } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'
import FormItem from '../../../../components/Common/Form/FormItem'
import FormRow from '../../../../components/Common/Form/FormRow'
import TextInput from '../../../../components/Common/TextInput'

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

const AddBank: FunctionComponent<{}> = () => {
  const { t } = useTranslation()

  // Validations Fields
  const validationSchema = Yup.object().shape({
    userName: Yup.string().required('User name field is required'),
    profileDescription: Yup.string(),
  })

  const { control, handleSubmit, setValue, errors, formState } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  })

  const onSubmit = (data: FormValues) => {
    console.log(data)
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
                <p className="widget-box-title">Confirm the country of your legal residence</p>

                <div className="widget-box-content">
                  <FormRow classNameRow="split">
                    <FormItem>
                      <Controller
                        control={control}
                        as={TextInput}
                        type="text"
                        name="firstName"
                        defaultValue=""
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
                        classNameFormInput="small full"
                        placeholder={t('addBank.lastName')}
                        errorMessage={errors.lastName?.message}
                      />
                    </FormItem>

                    {/* <FormItem>
                    

                    <Controller
                      control={control}
                      type="text"
                      as={TextInput}
                      name="cityName"
                      defaultValue=""
                      classNameFormInput="small"
                      placeholder={t('profileInfo.cityField')}
                      errorMessage={errors.cityName?.message}
                    /> */}
                  </FormRow>

                  <FormRow classNameRow="split">
                    <FormItem>
                      <Controller
                        control={control}
                        as={TextInput}
                        type="text"
                        name="email"
                        defaultValue=""
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
                        classNameFormInput="small full"
                        placeholder={t('addBank.dateofbirth')}
                        errorMessage={errors.dateofbirth?.message}
                      />
                    </FormItem>

                    <FormItem>
                      <Controller
                        control={control}
                        as={TextInput}
                        type="text"
                        name="documentType"
                        defaultValue=""
                        classNameFormInput="small full"
                        placeholder={t('addBank.documentType')}
                        errorMessage={errors.documentType?.message}
                      />
                    </FormItem>
                  </FormRow>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddBank
