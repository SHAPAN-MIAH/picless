import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { FunctionComponent, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const UnorderedList = styled.ul`
  list-style: initial;
  margin-left: 40px;
`
const OrderedListNumbers = styled.ol`
  list-style: decimal;
  margin-left: 40px;
  font-family: Rajdhani, sans-serif;
`
const OrderedListLetters = styled.ol`
  margin-left: 40px;
  font-family: Rajdhani, sans-serif;
`

const OrderedListLettersParentheses = styled.ol`
  & {
    font-family: Rajdhani, sans-serif;
    margin-left: 40px;
    counter-reset: alpha;
  }

  & li {
    list-style: none;
    position: relative;
    margin-top: 12px;
  }

  & > li:before {
    display: inline-block;
    width: 7px;
    position: absolute;
    left: -22px;
    text-align: center;
    counter-increment: alpha;
    content: counter(alpha, lower-alpha) ') ';
  }
`

const TermsAndConditions: FunctionComponent<{}> = () => {
  useEffect(() => {
    window.tpl.load(['sidebar'])
  }, [])

  return (
    <>
      <div className="content-grid" style={{ maxWidth: '800px' }}>
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
                  <svg className="reaction-count-icon icon-info">
                    <use xlinkHref="#svg-info" fill="#3e3f5e" />
                  </svg>
                  &nbsp;&nbsp;Conditions of use
                </h1>
              </div>
            </div>
            <div className="grid-column" />
            <div className="grid-column">
              <p>
                The website <strong>https://picless.com</strong> is a platform or social network that provides an application
                service which allows Users to create a profile, through which they share photos, videos, and make Live TV.
                There is a monthly subscription fee for those Users who want to view these contents. This platform enables
                Creators to generate income from their Followers. <br />
                <strong>This website is only offered and available to Users over 18 years of age.</strong> By accessing the
                website, you express and warrant that you are over 18 years of age. The Privacy Policy describes in detail
                the social network use of third parties to verify your eligibility.
              </p>
              <p>
                Access to this social network (hereinafter &quot;PICLESS&quot;) by the User, is subject to prior reading and
                full, express and unreserved acceptance of these <strong>Conditions of use</strong> in force at the time of
                access, which we ask you to read carefully. The User when making use of PICLESS, its contents and/or
                services,
                <strong> accepts and expressly agrees to submit to these general Conditions of use.</strong>
              </p>
              <p>
                These Conditions of use may be modified to adapt to given services, changes in configuration of the social
                network as well as legislative changes. We encourage you to check their validity when you access the
                Platform.
              </p>

              <h5>A. Definitions</h5>
              <p>The terms detailed below have the following meanings:</p>

              <UnorderedList>
                <li>
                  <p>
                    <strong>PICLESS:</strong> virtual platform of social network-type content, designed to share creators’
                    own material/content. Creator’s Followers are allowed to have access to these contents. According to fees
                    and functionalities, they are able to interact with the content and/or the Creator.
                  </p>
                </li>
                <li>
                  <p>
                    <strong>User: </strong>any User of the website, be it a Creator or a Follower.
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Creator: </strong>a User who uploads Content to PICLESS, for other Users to view.
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Follower: </strong>User who follows another Creator and who views the Creator&apos;s User
                    Content.
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Commission: </strong>the amount calculated as a percentage of the revenue paid by Followers to
                    view the User Content of a Creator, or to use the Follower Interaction. This is the amount that PICLESS
                    receives from payments made by Followers, as Creator’s intermediary.
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Interaction with Followers: </strong>any functionality offered by a Creator as part of that
                    Creator&apos;s User Content that is hosted by PICLESS and that allows a Follower to interact with that
                    User Content or with the Creator.
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Payment method: </strong>any means of payment accepted to pay for services, be it through bank
                    transfers, credit or debit card payments or through a payment provider.
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Payment provider: </strong>any third party approved by PICLESS which allows Users to manage their
                    payments.
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Refund: </strong>the return of money to a Follower after a dispute in good faith.
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Payment: </strong>money paid by a Follower to a Creator to view his/her User Content or to tip.
                  </p>
                </li>
                <li>
                  <p>
                    <strong>User account:</strong> the website section that can only be accessed by PICLESS or by the User
                    who, among other things, details the payment provider and payment options.
                  </p>
                </li>
                <li>
                  <p>
                    <strong>User content: </strong>Any and all photos, videos, and other material (including Follower
                    interaction functionality) uploaded to the website by a Creator.
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Tips: </strong>payment made by the Follower to a Creator whose purpose is not intended to access
                    User Content nor Interaction with Followers.
                  </p>
                </li>
              </UnorderedList>

              <h5>B. Access and Use Conditions</h5>
              <p>
                Access to PICLESS is restricted to UserS of legal age, whose registration has been approved. Access is made
                via the account email address and through a password generated independently by the User.
              </p>
              <p>Access with passwords of other UserS is not allowed.</p>
              <p>
                PICLESS is available at the following link: <a href="https://picless.com">https://picless.com</a>.
              </p>
              <p>
                The processing of your personal data is carried out in accordance with the Privacy Policy available at
                https://picless.com and which is accessible from any PICLESS section..
              </p>
              <p>
                The User must access PICLESS in accordance with good faith, the rules of public order and these Conditions of
                use. Access to PICLESS is made under the sole and exclusive responsibility of the User, who will be liable in
                any case for damages that may be caused to third parties or ourselves.
              </p>
              <p>You as User, when registering in PICLESS, confirm that:</p>

              <OrderedListNumbers>
                <li>
                  <p>You are at least 18 years old.</p>
                </li>
                <li>
                  <p>You have read, understand and will fully comply with these Conditions of use.</p>
                </li>
                <li>
                  <p>
                    You have read and accepted our legal terms and Privacy Policy regarding the processing of your personal
                    data.
                  </p>
                </li>
                <li>
                  <p>You accept full responsibility for the use of PICLESS on any device, whether owned or not.</p>
                </li>
                <li>
                  <p>
                    You accept full responsibility for any User Content created or provided, shared as a User or Follower.
                  </p>
                </li>
                <li>
                  <p>
                    You are aware that the commercial transaction is carried out between Creator and Follower, being PICLESS
                    a mere intermediary who makes available to the User an interconnection platform between the parties and,
                    it provides the means so that all payment for services can be made.
                  </p>
                </li>
                <li>
                  <p>
                    If you are using PICLESS on behalf of a company or other entity, you guarantee that you are authorized to
                    do so and to bind the company or other entity to these Conditions. This use on behalf of a company must
                    be explicitly and previously authorized by PICLESS.
                  </p>
                </li>
                <li>
                  <p>
                    All User Account registration and profile information is true and accurate and any User Content you
                    provide is yours, and does not infringe the intellectual property rights or any other property right of
                    third parties.
                  </p>
                </li>
                <li>
                  <p>
                    If you previously had a User account in PICLESS, your old User account was not canceled or suspended by
                    PICLESS for violation of these Conditions.
                  </p>
                </li>
                <li>
                  <p>
                    You register with PICLESS for your personal use and will not sell, rent or transfer your User Account to
                    any third party.
                  </p>
                </li>
                <li>
                  <p>
                    Do not falsify account registration information or make unauthorized use of someone else&apos;s
                    information or content.
                  </p>
                </li>
                <li>
                  <p>
                    You are fully responsible for each and every activity that occurs on your account and you are responsible
                    for maintaining the confidentiality and security of your login details. You agree not to disclose these
                    details to any other person or entity and to immediately notify PICLESS at
                    <a href="mailto:support@picless.com"> support@picless.com</a> if you believe someone has used or is using
                    your account without your permission, or if your account has been subject to any other breach of
                    security. You also agree to ensure that you log out of your account at the end of each session. You must
                    take special care when accessing your account from a public or shared device so that others cannot access
                    it.
                  </p>
                </li>
                <li>
                  <p>
                    The Creators are committed to post content frequently, being PICLESS empowered to disable their account,
                    in the event of detecting that there is no activity or active subscriptions or that it is not generating
                    any type of interaction for a long period of time.
                  </p>
                </li>
              </OrderedListNumbers>
              <p>
                PICLESS reserves the right, at any time, to verify the information you provide to PICLESS, as well as your
                compliance with the Conditions of use. If PICLESS cannot verify this information, PICLESS reserves the right
                to suspend your account. PICLESS reserves the right to disable any Username, password or other identifier,
                whether chosen by you or provided by PICLESS, at any time and at PICLESS&apos;s sole discretion for any or no
                reason, even if, regarding PICLESS consideration, it has violated any terms on these Conditions.
              </p>
              <p>
                If the Follower wants to view the User Content, he will need to provide a payment card details to a Payment
                Provider. If he chooses to enter two or more payment 3 cards in his/her User account, and if the payment of
                the first card is declined, the other payment cards will be used to collect the full payment of the income.
              </p>
              <p>
                If a Creator wants to receive payments, he must include the payment Options of his/her User account and
                upload a valid form of identification. He may also need to submit additional legal information, such as a
                W-9, if he resides in the United States of America. The exact information required will depend on his country
                of residence. Payments to Creators will be received by direct bank transfer. Payments will be made within the
                first 30 days from the provision of the service.
              </p>
              <p>
                From total payments made to Creators by Followers who pay per view content or interact with the Creator,
                PICLESS will receive 20% Commission as an administration fee, to provide, maintain and operate the website,
                and enable the economic interaction between Creator and Follower.
              </p>
              <p>
                To view content or interact with Creators, you must first add a payment card to your account and then click
                the &quot;Subscribe&quot; button on the corresponding Creator profile. In addition to the subscription,
                individual payments may also be given for ad hoc purchases as there is premium content that is not included
                in the subscription plan.
              </p>
              <p>
                It will also be possible to give tips through individual payments. The purpose of these tips will be none
                other than to send money to the Creator, without the intention of buying content or accessing it.
              </p>
              <p>
                The Follower may cancel the monthly payments at any time by deactivating the &quot;Automatic Renewal&quot;
                option, located under the corresponding Creator profile or by contacting support@picless.com. In the event of
                cancellation of monthly payments, Followers will be able to view the corresponding Creator User Content,
                until the end of the corresponding billing period.
              </p>
              <p>
                All payments to view User Content or to interact with Followers are final and non-refundable. If PICLESS
                detects that a Follower requested and received a Refund or Chargeback, PICLESS may take additional measures
                such as immediate and permanent removal from PICLESS.
              </p>
              <p>
                Follower and Creator are solely responsible for the payment of taxes derived from the transactions between
                them, being PICLESS exonerated of any responsibility by not being part of the transaction, limiting itself to
                being a mere intermediary between the parties. PICLESS shall be made available to the competent authorities
                on demand, providing all the information in its possession, of all the transactions that have been made, for
                tax investigations or prevention of money laundering and terrorist financing.
              </p>
              <p>
                In order to facilitate transactions, PICLESS defines subscription plans, from which the Creator can choose
                when offering his/her services, based on the following price listing:
              </p>
              <UnorderedList>
                <li>
                  <p>Plan A - USD 5.00 + Tax</p>
                </li>
                <li>
                  <p>Plan B - USD 10.00 + Tax</p>
                </li>
                <li>
                  <p>Plan C - USD 15.00 + Tax</p>
                </li>
                <li>
                  <p>Plan D - USD 20.00 + Tax</p>
                </li>
                <li>
                  <p>Plan E - USD 35.00 + Tax</p>
                </li>
                <li>
                  <p>Plan F - USD 50.00 + Tax</p>
                </li>
                <li>
                  <p>Plan G - USD 100.00 + Tax</p>
                </li>
              </UnorderedList>
              <p>
                Prices for premium content outside the plan, can also be set by the Creator, starting at USD 5 and without
                limit.
                <br />
                The User can deactivate his/her PICLESS account and membership in his/her User Account section.
                <br />
                If the deactivation is carried out by a Follower, it will be managed as soon as possible. No additional
                charges will be charged for content or subscriptions, and all current subscriptions will be deleted without
                the option to renew them later. However, once the Follower’s account has been closed, the money from the
                remaining subscription days cannot be refunded, and the Follower will not be able to consume or to have a
                content interaction on the website. If deactivation is carried out by a Creator, it can only be done when the
                last Follower’s subscription has expired and the account balance has been withdrawn.
                <br />
                If the User is a Creator and a Follower, the account will be deactivated in two stages: deactivation stage as
                Creator, and later deactivation stage as Follower.
              </p>
              <p>
                PICLESS reserves the unilateral right and without notice, to remove any User when considering that they have
                violated the conditions that govern the use of the social network, and the User will have no right to make a
                claim of any nature for this type of action. Likewise, PICLESS reserves the right to exercise the appropriate
                legal actions against those who violate these general Conditions of use, and the User accepts that the
                non-initiation of these actions does not constitute a formal waiver of them, and these will remain in force
                until the legal prescription deadlines of the breaches.
              </p>

              <h6>Rules for PICLESS use and internal systems of communication and interaction</h6>
              <p>
                PICLESS offers Users access to a virtual space where information and interaction between Creators and
                Followers can be shared through different tools and functionalities.
              </p>
              <p>When using PICLESS, the UserS must respect the following rules and conditions:</p>
              <OrderedListLettersParentheses>
                <li>Approve expressly and without reserves these Conditions of use.</li>
                <li>
                  <p>
                    Accept that your Username and avatar image is posted in PICLESS, and can be viewed by registered Users.
                  </p>
                </li>
                <li>
                  <p>
                    Likewise, you accept that all data entered in PICLESS, messages and other interactive functionalities are
                    public and therefore can be viewed by registered Users.
                  </p>
                </li>
                <li>
                  <p>
                    Likewise, you accept that, according to the interactive features nature, the data entered in PICLESS may
                    be viewed by us.
                  </p>
                </li>
                <li>
                  <p>
                    Do not introduce or spread any false, ambiguous or inaccurate information and/or content, in a way that
                    results misleading to the recipients of the information.
                  </p>
                </li>
                <li>
                  <p>Post only comments that, in good faith, can be considered useful, constructive, and appropriate.</p>
                </li>
                <li>
                  <p>
                    Do not use PICLESS, post comments, attach files or introduce commercial or advertising links or anything
                    that pursue a lucrative purpose or those contrary to PICLESS’s purpose.
                  </p>
                </li>
                <li>
                  <p>
                    Use PICLESS, only post comments and use communication systems in a way that do not infringe any law or do
                    not violate the rights of third parties, especially those of Intellectual and Industrial Property.
                  </p>
                </li>
                <li>
                  <p>
                    Use correct language and do not include swearing or offensive words that may be considered inappropriate
                    by other Users.
                  </p>
                </li>
                <li>
                  <p>
                    Do not impersonate PICLESS, one of its employees, another User or any other person or entity or declare,
                    suggest or misrepresent any affiliation, support or sponsorship between you and PICLESS and/or any other
                    person or entity.
                  </p>
                </li>
                <li>
                  <p>
                    Do not use third party payment processors to accept payments for subscriptions or any other service
                    through PICLESS.
                  </p>
                </li>
                <li>
                  <p>
                    Do not use PICLESS for the purpose of exploitation, damage or attempt to exploit or harm minors in any
                    way, by exposing them to inappropriate content, requesting personal identification information, or in any
                    other way.
                  </p>
                </li>
                <li>
                  <p>Do not create, upload, post, display, link or distribute User Content if it is:</p>
                  <OrderedListLetters>
                    <li style={{ listStyle: 'lower-alpha' }}>
                      <p>
                        obscene, unlawful, fraudulent, defamatory, libelous, hateful, discriminatory, threatening or
                        harassing, or in any way that incites violence or violates any of the aforementioned prohibitions.
                      </p>
                    </li>
                    <li style={{ listStyle: 'lower-alpha' }}>
                      <p>
                        violates the copyright, trademark, privacy right, publicity right or other property or personal right
                        of another person (for example, using the name, likeness, image or other identity of another person
                        without the appropriate consent).
                      </p>
                    </li>
                    <li style={{ listStyle: 'lower-alpha' }}>
                      <p>promotes or advertises escort services.</p>
                    </li>
                    <li style={{ listStyle: 'lower-alpha' }}>
                      <p>promotes or advertises prostitution services or similar services.</p>
                    </li>
                    <li style={{ listStyle: 'lower-alpha' }}>
                      <p>promotes or advertises firearms or other weapons, drugs or drug paraphernalia.</p>
                    </li>
                    <li style={{ listStyle: 'lower-alpha' }}>
                      <p>promotes any illegal activity, or defends, promotes or aids any illegal act.</p>
                    </li>
                    <li style={{ listStyle: 'lower-alpha' }}>
                      <p>
                        causes unnecessary distress, inconvenience or anxiety or is likely to disturb, embarrass, alarm or
                        bullying any other person.
                      </p>
                    </li>
                    <li style={{ listStyle: 'lower-alpha' }}>
                      <p>
                        involves third-party sales or commercial activities, such as contests, sweepstake, and other sales
                        promotions, bartering or advertising.
                      </p>
                    </li>
                    <li style={{ listStyle: 'lower-alpha' }}>
                      <p>
                        gives the impression that it emanates from or is endorsed by PICLESS or any other person or entity,
                        if this is not the case.
                      </p>
                    </li>
                    <li style={{ listStyle: 'lower-alpha' }}>
                      <p>
                        not owned by the Creator and does not have a valid license or controls all rights over the User
                        Content.
                      </p>
                    </li>
                    <li style={{ listStyle: 'lower-alpha' }}>
                      <p>depicts people under the age of 18.</p>
                    </li>
                  </OrderedListLetters>
                </li>
                <li>
                  <p>
                    Do not remove, erase, modify or alter any copyright, trademark or other property rights included in any
                    User Content that is not owned by you.
                  </p>
                </li>
                <li>
                  <p>
                    Do not use the website in any way that could disable, overload, damage or deteriorate the website or
                    interfere with third party’s use of the website, including their ability to engage in real-time
                    activities through the website.
                  </p>
                </li>
                <li>
                  <p>
                    Do not decompile, disassemble, reverse engineer or attempt to discover or derive PICLESS source code.
                  </p>
                </li>
                <li>
                  <p>
                    Do not interfere in any way with PICLESS operation or any server, network or system associated with the
                    social network, including but not limited to: hacking, e-mail bombing, flooding, overloading, or
                    &quot;denial of service&quot; attacks; probe, scan or test the vulnerability of the site or any server,
                    network or system associated with the site; violate or circumvent firewall, encryption, security or
                    authentication routines; access information not intended for you, or access the account of another User
                    that you are not expressly authorized to access.
                  </p>
                </li>
                <li>
                  <p>
                    Do not use any program, tool, or automated process (including, but not limited to, web crawlers, robots,
                    spider bots, and automated scripts) to access PICLESS or any server, network or system associated with
                    PICLESS, or to extract, gather, harvest, or gather content or PICLESS information.
                  </p>
                </li>
                <li>
                  <p>
                    Do not engage in any conduct that restricts or inhibits the website use or enjoyment of any person, or
                    that, as determined by PICLESS, may harm you or the website’s Users, or expose them to liability.
                  </p>
                </li>
                <li>
                  <p>
                    It is forbidden to use the platform to gain external access and contact between Creator and Follower in
                    order to avoid paying via the platform, therefore making direct payments between them.
                  </p>
                </li>
                <li>
                  <p>
                    To sum up, do not make any other use of PICLESS that violates these Conditions or any applicable law.
                  </p>
                </li>
              </OrderedListLettersParentheses>

              <p>
                The User assumes exclusive responsibility for the content posted, linked or attached. <br />
                PICLESS does not supervise or pre approve the content of the forum or other communication systems or the
                links or attached files of the UserS, but it reserves the right to eliminate those comments or content that
                violate these Conditions of use. PICLESS is exempt from any liability that may arise from the improper use of
                PICLESS interactive tools and communication systems, for the dissemination of content by interlocutors, and
                when irrelevant data has been provided, according to PICLESS’s purpose.
                <br />
                PICLESS does not guarantee the assiduous activity of the content Creator or the type of content that he/she
                produces. In the event that the Follower is not satisfied with the frequency or content that a content
                Creator produces or posts, he should come into direct contact with the content Creator via the private chat
                channel.
              </p>

              <h5>C. Intellectual Property</h5>
              <p>
                All content, texts, images, and source codes are PICLESS or third parties’ properties from which the right of
                use has been obtained, and are protected by Intellectual and Industrial Property rights.
                <br />
                The User only has the right of private, non-profit use of them, and he needs express authorization to modify,
                reproduce, exploit, distribute or exercise any right belonging to its owners. PICLESS is a registered
                trademark, and its reproduction, imitation, use or insertion is prohibited without the proper authorization
                of its owners.
                <br />
                PICLESS is exempted from responsibility for any claim regarding the intellectual property rights of the
                content and images posted by third parties on the social network, being the responsibility of whoever posts
                them.
              </p>
              <p>
                External links to PICLESS does not confer any rights over it. Likewise, the simple act of establishing a link
                to PICLESS does not give the right to grant the category of collaborator.
                <br />
                The User may establish links in accordance with the law and without damaging the reputation of PICLESS or
                taking advantage of it. The User may not:
              </p>
              <OrderedListNumbers>
                <li>
                  <p>Establish a link from any website that is not owned or authorized to do so.</p>
                </li>
                <li>
                  <p>
                    Have the website or parts of it displayed on, or appear to be displayed on any other site, for example
                    iframes, deep links, or in-line links.
                  </p>
                </li>
                <li>
                  <p>Link to any part of the website other than the home page or the specific profile of the Creator.</p>
                </li>
              </OrderedListNumbers>

              <p>
                PICLESS grants Users a license subject to these Conditions of use, conditionally granted, revocable,
                non-transferable, non-sublicensable, without exclusivity and limited to the use and purpose of PICLESS. At
                any time the license may be revoked and terminated by PICLESS, provided that these Conditions of use or any
                applicable regulations have been violated.
              </p>

              <h5>D. Responsibilities</h5>
              <p>
                By making this social network available to the Users, we want to offer them a quality service and virtual
                space, using the utmost diligence in providing it, as well as in the technological means used. However, we
                will not be liable for the presence of viruses and other elements that may damage, in any way, the
                User&apos;s computer system or the organization to which it belongs.
              </p>
              <p>
                PICLESS does not guarantee that the availability of the social network will be continuous and uninterrupted,
                due to circumstances caused by force majeure, problems in the Internet network, technological failures or
                breakdowns, of our own or others, derived from the current state of technology and other unpredictable
                circumstances, so that the User agrees to bear these circumstances within reasonable limits and expressly
                waives to claim any responsibility for them from PICLESS.
              </p>
              <p>
                PICLESS does not guarantee that access and interaction on the social network is compatible with all devices
                and operating systems. It is your sole responsibility to determine whether or not PICLESS is compatible with
                your device.
              </p>
              <p>
                The User is prohibited to take any type of action on PICLESS that causes an excessive operating overload to
                our computer systems, as well as the introduction of viruses, or installation of robots, or software that
                alters the normal operation of PICLESS, or ultimately may cause damage to our computer systems.
              </p>
              <p>
                The User assumes all responsibility derived from the use of PICLESS, being solely responsible for any direct
                or indirect effect that may arise on PICLESS, including, but not limited to, any adverse economic, technical
                and/or legal result as well as frustration of expectations caused by PICLESS, obliging the User to hold
                PICLESS harmless for any claims derived, directly or indirectly from such events.
              </p>
              <p>
                The Creator is responsible for any User Content that he/she sends, spreads, facilitates or contributes, and
                has full responsibility for such content in relation to its legality and accuracy.
                <br />
                PICLESS is exonerated of any responsibility derived from any claim, including lawyers’ fees payment, for
                demands and claims originated by third parties for the User’s breach of our Conditions of use and Privacy
                Policy, or any other claims for the non-compliance with current legislation.
              </p>
              <p>
                PICLESS will have access to the messaging system and its content and to everything developed on the platform,
                in order to verify compliance with these Conditions of use.
              </p>
              <p>
                The User acknowledges that he/she has understood all the information regarding the Conditions of use of our
                website, and acknowledges that they are sufficient for the exclusion of the error in them.Therefore, he
                accepts them entirely and expressly.
              </p>
              <p>
                The User is fully aware that the mere use of PICLESS and its services implies acceptance of these Conditions
                of use.
              </p>

              <h5>E. Jurisdiction and validity of the general conditions of access to the Web</h5>
              <p>
                Everything related to PICLESS is governed exclusively by the Laws of the Republic of Cyprus.
                <br />
                If any provision of these Conditions of use shall be determined invalid, unlawful or unenforceable for any
                reason before a court or any other competent body of jurisdiction, such provision will be eliminated or
                limited to the minimum extent so that the remaining provisions of the Conditions of use remain in full force
                and effect.
              </p>
              <p>
                These general Conditions of use have been updated on 03/16/2021. At any time we can proceed to their
                amendment: please check the date of issue each time you connect to PICLESS, and thus, you will be sure that
                there have been no amendments that affect you. For any questions regarding PICLESS Conditions of use, you can
                contact us at <a href="mailto:support@picless.com"> support@picless.com</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TermsAndConditions
