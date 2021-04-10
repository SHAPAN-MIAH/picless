import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useRouter from 'hooks/useRouter'
import React, { FunctionComponent, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const UnorderedList = styled.ul`
  list-style: initial;
  margin-left: 40px;
`
const UnorderedListEmpty = styled.ul`
  list-style: none;
  font-family: Rajdhani, sans-serif;
  margin-left: 40px;
`

const Address = styled.address`
  font-family: Rajdhani, sans-serif;
`

const PrivacyPolicy: FunctionComponent<{}> = () => {
  useEffect(() => {
    window.tpl.load(['sidebar'])
  }, [])

  return (
    <>
      <div className="content-grid" style={{ maxWidth: '800px', paddingTop: '0px' }}>
        <div className="grid grid-2-7-2">
          <div className="account-hub-content">
            <div className="section-header">
              <div className="section-header-info">
                <Link to="/#login" style={{ color: '#00c7d9' }}>
                  <FontAwesomeIcon icon="arrow-left" size="1x" />
                  {'  '}
                  Back
                </Link>
                <h1 className="section-title">
                  <svg className="reaction-count-icon icon-private">
                    <use xlinkHref="#svg-private" fill="#3e3f5e" />
                  </svg>
                  &nbsp;&nbsp;Privacy Policy
                </h1>
              </div>
            </div>
            <div className="grid-column" />
            <div className="grid-column">
              <hr />

              <p>
                Confidentiality and security are PICLESS core values, and for this, we are committed to ensuring the privacy
                of the User at all times and do not collect information that is not relevant.
                <br />
                Below, we provide you with all the necessary information about our Privacy Policy in relation to personal
                data we collect, explaining:
              </p>

              <UnorderedList>
                <li>
                  <p>Who is responsible for the processing of your data.</p>
                </li>
                <li>
                  <p>What are the purposes for which the data is collected.</p>
                </li>
                <li>
                  <p>What are the legal basis that justify such processing.</p>
                </li>
                <li>
                  <p>For how long we store your data.</p>
                </li>
                <li>
                  <p>Who are the recipients of your data.</p>
                </li>
                <li>
                  <p>What your rights are.</p>
                </li>
              </UnorderedList>

              <h5>1. Responsible:</h5>
              <Address>
                ZOEGA LTD (HE415522).
                <br />
                136 Tseriou Street, floor 2, Strovolos 2045
                <br />
                Nicosia, Cyprus
                <br />
                <a href="mailto:info@picless.com">info@picless.com</a>
              </Address>

              <h5>2. Purposes, Legitimacy and Storage of data processing sent through:</h5>
              <UnorderedList>
                <li>
                  <strong>CONTACT FORM</strong>
                </li>
              </UnorderedList>
              <p>
                <strong>Purpose: </strong>To provide you with means to contact us, and to answer your request for
                information, as well as to send you information about our products, services and activities, also via
                electronic means, if you check the acceptance box.
                <br />
                <strong>Legitimacy: </strong>The User&apos;s consent when requesting information from us through our contact
                form and when checking the acceptance box about sending information .<br />
                <strong>Storage: </strong>Until your request has been answered by e-mail or via our form, if it has not
                generated a new processing. In case you have accepted to receive commercial mailings: until you request to
                unsubscribe.
              </p>
              <UnorderedList>
                <li>
                  <strong>REGISTRATION FORM</strong>
                </li>
              </UnorderedList>
              <p>
                <strong>Purpose: </strong>To register you as a User and allow you to access the services reserved for
                registered Users of our website and inform you of our activities, products and services, as well as to send
                you commercial information of our products and services (including via electronic means).
                <br />
                <strong>Legitimacy: </strong>Registration agreement for registration on the platform (Conditions of Use).
                Legitimate interest of the data collector in keeping all registered Users informed about products and
                services.
                <br />
                <strong>Storage: </strong>Until the registered User requests his/her unsubscription, and thereafter, within
                the time period specified by current law. Commercial mailings: until the User requests to unsubscribe.
              </p>
              <UnorderedList>
                <li>
                  <strong>SENDING OF E-MAILS</strong>
                </li>
              </UnorderedList>
              <p>
                <strong>Purpose: </strong>To answer your requests for information, attend to your requests and answer your
                queries or doubts.
                <br />
                <strong>Legitimacy: </strong>The User&apos;s consent when requesting information from us via e-mail address.
                <br />
                <strong>Storage: </strong>Until your query has been answered by e-mail, if it has not generated a new
                processing.
              </p>
              <UnorderedList>
                <li>
                  <strong>VERIFICATION SYSTEM OF LEGAL AGE</strong>
                </li>
              </UnorderedList>
              <p>
                <strong>Purpose: </strong>Verify the age of the User to avoid minors hiring these services, and to be able to
                verify that he/she is the person he/she claims to be, and to avoid identity theft and the use of third party
                content.
                <br />
                <strong>Legitimacy: </strong>Compliance with a legal obligation, applicable to the data controller and
                legitimate interest in verifying the age of Users.
                <br />
                <strong>Storage: </strong>During the age verification procedures and legal terms of Storage, in order to be
                able to answer for eventual responsibilities.
              </p>
              <h6>Obligation to provide us with your personal data, and consequences for failure to do so:</h6>
              <p>PICLESS’s data processing requires a minimum age of 18 years.</p>
              <p>
                The requested personal details are necessary to manage your requests and/or to offer you those services you
                may register for, so if you do not provide them, we will not be able to help you correctly or provide you
                with the service you have requested.
              </p>

              <h5>3. Recipients of your data</h5>
              <p>
                Your data are confidential and will not be transferred to third parties, unless there is a legal obligation
                to do so.
              </p>
              <p>
                The identification data and any other personal data, voluntarily provided in the social network may be public
                for the rest of the registered Users.
              </p>
              <p>
                PICLESS may deliver your personal data to external providers, who are in charge of verifying your legal age,
                allowing you to register and access the website.
              </p>
              <p>
                PICLESS may hire external providers for the management of the platform or for administrative, fiscal and
                economic procedures that may involve access to your personal data. These providers will be considered data
                processors, and will only access your data following our instructions and after signing a data processing
                agreement in accordance with the guidelines of the European Data Protection Regulation.
              </p>

              <h5>4. Rights in relation to your personal data</h5>
              <p>
                Any person may withdraw his/her consent at any time, when such consent has been given for his/her data
                processing. In no case, the withdrawal of this consent, conditions the execution of the subscription contract
                or any previously established agreement.
              </p>
              <p>Likewise, you may exercise the following rights:</p>
              <UnorderedListEmpty>
                <li>
                  <p>- Request access to your personal data or their correction when they are inaccurate.</p>
                </li>
                <li>
                  <p>
                    - Request their deletion when, among other reasons, the data are no longer relevant for the purposes for
                    which they were collected.
                  </p>
                </li>
                <li>
                  <p>- Request the limitation of their processing in certain circumstances.</p>
                </li>
                <li>
                  <p>
                    - Request opposition to the processing of your data for reasons related to your particular situation.
                  </p>
                </li>
                <li>
                  <p>- Request data portability in the cases provided for by the regulations.</p>
                </li>
                <li>
                  <p>- Other rights recognized in the applicable regulations.</p>
                </li>
              </UnorderedListEmpty>
              <p>
                Where and how to request your rights: writing to the responsible data collector at his/her mailing address or
                e-mail address (indicated in section 1), with the reference: "Personal Data", specifying the right you wish
                to exercise and to what personal data you are referring to.
              </p>
              <p>
                In case of disagreement with the company in relation to the processing of your data, you may submit a
                complaint with the Office of the Commissioner for Personal Data Protection in Chipre
                (http://www.dataprotection.gov.cy/).
              </p>

              <h5>5. Cookies</h5>
              <p>
                This website uses technical, personalization, analytical and advertising cookies, of our own or of third
                parties, which in no case process personal data, but measure browsing habits for statistical and advertising
                purposes.
              </p>
              <p>
                Therefore, when accessing our website, in compliance with the Law 156 (l)/2004 of Services of the Information
                Society, to treat analytical and advertising cookies, we have requested your consent of use, and we have
                provided information about them, which in any case will be installed after a reasonable period of time so
                that the Users may decide whether to give their consent or not.
              </p>

              <h5>6. Security of your personal data</h5>
              <p>
                In order to protect the security of your personal data, we inform you that we have adopted all necessary
                technical and organizational measures to ensure the security of received personal data, from alteration,
                loss, and unauthorized processing or access.
              </p>

              <h5>7. Updating your data</h5>
              <p>
                In order to keep your personal data updated, it is important that you inform us if any changes occur,
                otherwise, we are not responsible for the accuracy of them.
              </p>
              <p>
                We are not responsible for the privacy policy regarding the personal data you may provide to third parties
                through links available on our website.
              </p>
              <p>
                This Privacy Policy may be modified to adapt to changes occurring on our website, as well as new legislative
                or jurisprudential changes on personal data as they become available. So it requires reading, each time you
                provide us with your data through this Web.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PrivacyPolicy
