import React, { FunctionComponent, useEffect } from 'react'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import _ from 'lodash'
import toast from 'react-hot-toast'

import FormItem from '../../components/Common/Form/FormItem'
import TextInput from '../../components/Common/TextInput'
import FormRow from '../../components/Common/Form/FormRow'
import AccountHubMain from './AccountHub/AccountHubMain'
import TextArea from '../../components/Common/TextArea'
import DatePickerForm from '../../components/Common/DatePickerForm/DatePickerForm'
import ButtonWithLoader from '../../components/Common/ButtonWithLoader'
import InterestList from './Interest/InterestList'
import TimeLineList from './TimeLine/TimeLineList'
import SelectForm, { SelectOptionsType } from '../../components/Common/SelectForm'
import { UserType } from '../../types/UserType.d'

import professions from '../../constants/professions.json'
import useUser from '../../hooks/useUser'
import SelectCountry from '../../components/SelectCountry/SelectCountry'

type FormValues = {
  userName: string
  profileDescription: string
  countryCode: string
  cityName: string
  occupationId: string
  birthDate: Date
}

type formFieldsNames = keyof FormValues
const formFields: formFieldsNames[] = [
  'userName',
  'profileDescription',
  'countryCode',
  'cityName',
  'occupationId',
  'birthDate',
]

const ProfileInfo: FunctionComponent<{}> = () => {
  const { t } = useTranslation()

  // Validations Fields
  const validationSchema = Yup.object().shape({
    userName: Yup.string().required('User name field is required'),
    profileDescription: Yup.string(),
  })

  const { getUser, updateUser } = useUser()
  const { control, handleSubmit, setValue, errors, formState } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  })

  const professionList: SelectOptionsType[] = professions

  useEffect(() => {
    getUser()
      .then((user) => {
        formFields.forEach((field: string) => {
          const value = _.get(user, field)

          if (field === 'birthDate') setValue(field, new Date(value))
          else setValue(field as formFieldsNames, value || '')
        })
      })
      .catch((err) => {
        toast.error(err.message)
      })
  }, [getUser, setValue])

  const onSubmit = (data: FormValues) => {
    const formData: any[] = []
    formFields.forEach((field: string) => {
      const dataAttr = _.get(data, field)

      formData.push(dataAttr)
    })

    const dataToSubmit: Partial<UserType> = _.zipObject(formFields, formData)

    const toastOptions = {
      loading: 'Saving account information ...',
      success: 'The account information has been successfully saved',
      error: 'Error Saving the account information',
    }

    return updateUser(dataToSubmit, toastOptions)
  }

  return (
    <div className="content-grid">
      <div className="grid grid-2-7-2">
        <div className="account-hub-content">
          <div className="section-header">
            <div className="section-header-info">
              <p className="section-pretitle">{t('profileInfo.myProfileTitle')}</p>

              <h2 className="section-title">{t('profileInfo.profileInfo')}</h2>
            </div>
          </div>

          <div className="grid-column">
            <AccountHubMain />

            <form className="form" onSubmit={handleSubmit(onSubmit)}>
              <div className="widget-box">
                <p className="widget-box-title">{t('profileInfo.aboutYourProfile')}</p>

                <div className="widget-box-content">
                  <FormRow classNameRow="split">
                    <FormItem>
                      <Controller
                        control={control}
                        as={TextInput}
                        type="text"
                        name="userName"
                        defaultValue=""
                        required
                        classNameFormInput="small"
                        placeholder={t('profileInfo.profileNameField')}
                        errorMessage={errors.userName?.message}
                      />
                    </FormItem>
                    <FormItem>
                      <div className="form-input-decorated">
                        <Controller
                          control={control}
                          name="birthDate"
                          defaultValue=""
                          render={(propsController) => (
                            <DatePickerForm
                              name={propsController.name}
                              ref={propsController.ref}
                              customInputRef="birthdayRef"
                              classNameFormInput="small"
                              placeholderText={t('profileInfo.birthdayField')}
                              selected={propsController.value}
                              onChange={(date: any) => propsController.onChange(date)}
                              iconName="events"
                            />
                          )}
                        />
                      </div>
                    </FormItem>
                  </FormRow>

                  <FormRow classNameRow="split">
                    <FormItem>
                      <Controller
                        control={control}
                        as={TextArea}
                        name="profileDescription"
                        defaultValue=""
                        classNameFormInput="small full"
                        placeholder={t('profileInfo.writeDescriptionField')}
                        errorMessage={errors.profileDescription?.message}
                      />
                    </FormItem>

                    <FormItem>
                      <Controller
                        control={control}
                        name="countryCode"
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

                      <Controller
                        control={control}
                        type="text"
                        as={TextInput}
                        name="cityName"
                        defaultValue=""
                        classNameFormInput="small"
                        placeholder={t('profileInfo.cityField')}
                        errorMessage={errors.cityName?.message}
                      />
                    </FormItem>
                  </FormRow>

                  <FormRow>
                    <FormItem> </FormItem>
                    <FormItem>
                      <Controller
                        control={control}
                        name="occupationId"
                        defaultValue=""
                        render={(propsController) => (
                          <SelectForm
                            id="occupation"
                            name={propsController.name}
                            placeholder={t('accountInfo.occupationField')}
                            options={professionList}
                            value={propsController.value || ''}
                            onChange={(val) => {
                              propsController.onChange(val)
                            }}
                          />
                        )}
                      />
                    </FormItem>
                  </FormRow>

                  <FormRow>
                    <FormItem>
                      <ButtonWithLoader type="submit" className="small primary" showLoader={formState.isSubmitting}>
                        {t('accountSidebar.saveButtonText')}
                      </ButtonWithLoader>
                    </FormItem>
                  </FormRow>
                </div>
              </div>
            </form>

            <div className="widget-box" style={{ marginTop: '20px' }}>
              <p className="widget-box-title">{t('profileInfo.interestTitle')}</p>

              <div className="widget-box-content">
                {/* Interests */}
                <InterestList />
              </div>
            </div>

            <div className="widget-box" style={{ marginTop: '20px' }}>
              <p className="widget-box-title">{t('profileInfo.timelineTitle')}</p>

              <div className="widget-box-content">
                {/* TimeLine */}
                <TimeLineList />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileInfo
