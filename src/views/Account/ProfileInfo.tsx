import _ from 'lodash'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import ButtonWithLoader from '../../components/Common/ButtonWithLoader'
import DatePickerForm from '../../components/Common/DatePickerForm/DatePickerForm'
import FormItem from '../../components/Common/Form/FormItem'
import FormRow from '../../components/Common/Form/FormRow'
import SelectForm, { SelectOptionsType } from '../../components/Common/SelectForm'
import TextArea from '../../components/Common/TextArea'
import TextInput from '../../components/Common/TextInput'
import SelectCountry from '../../components/SelectCountry/SelectCountry'
import professions from '../../constants/professions.json'
import useUser from '../../hooks/useUser'
import { UserType } from '../../types/UserType'
import AccountHubMain from './AccountHub/AccountHubMain'
import InterestList from './Interest/InterestList'
import TimeLineList from './TimeLine/TimeLineList'
import TagsInputs from './HashTag/TagsInputs'

type FormValues = {
  userName: string
  profileDescription: string
  countryCode: string
  cityName: string
  birthDate: Date
  tagLine: string
  id: number
  name: string
  placeholder: string
  error: string | ''
}

type formFieldsNames = keyof FormValues
const formFields: formFieldsNames[] = ['profileDescription', 'countryCode', 'cityName', 'birthDate', 'tagLine']

const ProfileInfo: FunctionComponent<{}> = () => {
  interface errorType {
    tags?: string
  }

  const { t } = useTranslation()
  // Validations Fields
  const validationSchema = Yup.object().shape({
    profileDescription: Yup.string(),
  })

  const { user, updateUser } = useUser()
  const { control, handleSubmit, setValue, errors, formState } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  })

  useEffect(() => {
    formFields.forEach((field: string) => {
      const value = _.get(user, field)

      if (field === 'birthDate') setValue(field, new Date(value))
      else setValue(field as formFieldsNames, value || '')
    })
  }, [user, setValue])

  const onSubmit = (data: FormValues) => {
    let tagCount = 0

    for (let i = 0; i < data.tagLine.length; i++) {
      if (data.tagLine[i] === ',') {
        tagCount++
      }
    }

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

    if (tagCount < 5) {
      return updateUser(dataToSubmit, toastOptions)
    } else {
      alert('Please enter upto 5 tags')
    }
  }

  return (
    <div className="content-grid" style={{ maxWidth: '800px' }}>
      <div className="grid grid-2-7-2">
        <div className="account-hub-content">
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

                  <FormRow classNameRow="split">
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
                        name="tagLine"
                        defaultValue=""
                        render={(propsController) => (
                          <TagsInputs
                            ref={propsController.ref}
                            name={propsController.name}
                            placeholder="Add tag"
                            onChangeTags={(value: string) => {
                              propsController.onChange(value)
                            }}
                            defaultTags={propsController.value}
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
