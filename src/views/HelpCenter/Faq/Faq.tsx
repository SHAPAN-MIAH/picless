import React, { FunctionComponent } from 'react'
import Faq from 'react-faq-component'
// import { useTranslation } from 'react-i18next'
import dataFaq from '../../../constants/faq.json'

const data = {
  title: 'FAQ',
  rows: dataFaq,
}

const HelpSupport: FunctionComponent<{}> = () => {
  return (
    <>
      <div className="content-grid">
        <div className="grid">
          <div className="grid-column">
            <div className="grid grid-3-9 mobile-prefer-content">
              <div className="grid-column" />

              <div className="grid-column">
                <div className="widget-box">
                  <div className="widget-box-content">
                    <Faq
                      data={data}
                      styles={{
                        titleTextColor: '#3e3f5e',
                        rowTitleColor: '#3e3f5e',
                        rowContentColor: '#3e3f5e',
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HelpSupport
