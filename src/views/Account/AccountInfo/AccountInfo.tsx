import { yupResolver } from '@hookform/resolvers/yup'
import _ from 'lodash'
import React, { FunctionComponent, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'
import ButtonWithLoader from '../../../components/Common/ButtonWithLoader'
import FormItem from '../../../components/Common/Form/FormItem'
import FormRow from '../../../components/Common/Form/FormRow'
import SelectForm, { SelectOptionsType } from '../../../components/Common/SelectForm'
import TextInput from '../../../components/Common/TextInput'
import plans from '../../../constants/plans.json'
import useUser from '../../../hooks/useUser'
import { UserType } from '../../../types/UserType'
import gender from '../../../constants/gender.json'

type FormValues = {
  fullName: string
  email: string
  userName: string
  emailRecovery: string
  phoneNumber: string
  planId: string
  gender: string
}
type formFieldsNames = keyof FormValues
const formFields: formFieldsNames[] = ['fullName', 'email', 'userName', 'emailRecovery', 'phoneNumber', 'planId', 'gender']

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const AccountInfo: FunctionComponent<{}> = () => {
  const { t } = useTranslation()

  const { getUser, updateUser } = useUser()

  // Validations Fields
  const validationSchema = Yup.object().shape({
    fullName: Yup.string(),
    email: Yup.string().email('Please enter an valid email').required('Account email field is required'),
    userName: Yup.string().required('User name field is required'),
    emailRecovery: Yup.string().email('Please enter an valid email').nullable(),
    phoneNumber: Yup.string().matches(phoneRegExp, { message: 'Phone number is not valid', excludeEmptyString: true }),
    planId: Yup.string(),
    // genderId: Yup.number(),
  })

  const { control, handleSubmit, setValue, errors, formState } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  })

  const plansList = (): SelectOptionsType[] => {
    return plans.map((data: any) => {
      if (data.amount === 0) return { value: data.name, name: `FREE` }

      return { value: data.name, name: `${data.amount} $ (${data.currency})`.toUpperCase() }
    })
  }

  const genderList = (): SelectOptionsType[] => {
   return gender.map((data: any) => {
     return { value: data.name, name: `${data.name}`}
   })
  }

  useEffect(() => {
    getUser()
      .then((user) => {
        formFields.forEach((field: string) => {
          const value = _.get(user, field)

          setValue(field as formFieldsNames, value || '')
        })
      })
      .catch((err) => {
        toast.error(err.message)
      })
  }, [getUser, setValue])

  const saveData = (data: FormValues) => {
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
    <>
      <div className="account-hub-content account-info-section">
        <div className="grid-column">
          <div className="widget-box">
            <p className="widget-box-title">{t('accountInfo.personalInfo')}</p>

            <div className="widget-box-content">
              <form className="form" onSubmit={handleSubmit(saveData)}>
                <FormRow classNameRow="split">
                  <FormItem>
                    <Controller
                      control={control}
                      as={TextInput}
                      type="text"
                      name="fullName"
                      defaultValue=""
                      placeholder={t('accountInfo.fullNameField')}
                      classNameFormInput="small active"
                      errorMessage={errors.fullName?.message}
                    />
                  </FormItem>
                  <FormItem>
                    <Controller
                      control={control}
                      as={TextInput}
                      type="text"
                      name="email"
                      defaultValue=""
                      required
                      placeholder={t('accountInfo.accountEmailField')}
                      classNameFormInput="small active"
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
                      name="userName"
                      defaultValue=""
                      required
                      placeholder={t('accountInfo.urlUserNameField')}
                      classNameFormInput="small active"
                      errorMessage={errors.userName?.message}
                    />
                  </FormItem>
                  <FormItem>
                    <Controller
                      control={control}
                      as={SelectForm}
                      id="genderId"
                      name="gender"
                      placeholder={t('accountInfo.GenderField')}
                      options={genderList()}
                    /> 
                  </FormItem>
                </FormRow>

                <FormRow classNameRow="split">
                  <FormItem>
                    <Controller
                      control={control}
                      as={TextInput}
                      type="text"
                      name="phoneNumber"
                      defaultValue=""
                      placeholder={t('accountInfo.phoneNumberField')}
                      classNameFormInput="small active"
                      errorMessage={errors.phoneNumber?.message}
                    />
                  </FormItem>

                  <FormItem>
                    <Controller
                      control={control}
                      as={SelectForm}
                      id="subscription-price"
                      name="planId"
                      placeholder={t('accountInfo.subscriptionPriceField')}
                      options={plansList()}
                    />
                  </FormItem>
                </FormRow>

                <FormRow classNameRow="split">
                  <FormItem>
                    <ButtonWithLoader type="submit" className="button small secondary" showLoader={formState.isSubmitting}>
                      {t('accountSidebar.saveButtonText')}
                    </ButtonWithLoader>
                  </FormItem>
                </FormRow>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AccountInfo
