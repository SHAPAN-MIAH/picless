import React, { FunctionComponent } from 'react'
import styled from 'styled-components'

const DivContainer = styled.div`
  padding: 3px;
  margin: 5px 5px 15px 5px;
  box-sizing: border-box;
  width: 14.2%;
`;

const data = [
    {
      title: 'MONTH',
      total: 20,
      subs_Amount: 20,
      subs_total: 20,
      content_Amount: 20,
      content_total: 20,
      tips_Amount: 20,
      tips_total: 20,
    },
    {
      title: 'HISTORIC',
      total: 20,
      subs_Amount: 20,
      subs_total: 20,
      content_Amount: 20,
      content_total: 30,
      tips_Amount: 20,
      tips_total: 20,
    },
    {
      title: 'TIME PERIOD COMPARISION',
      total: 20,
      subs_Amount: 20,
      subs_total: 20,
      content_Amount: 20,
      content_total: 20,
      tips_Amount: 20,
      tips_total: 40,
    },
  ]

const FollowersTable: FunctionComponent<{}> = () => {
  return (
    <>
      <div className="widget-box">
        <h4 className="section-title">Top Followers</h4>
        <div className="widget-box-content" >
          <div className="exp-line-list scroll-content">
              {data.map((el => (
                    <div className="exp-line" style={{ alignItems: "flex-start", boxShadow: '0 0 40px 0 rgb(94 92 154 / 6%)', padding: '3px', borderRadius: '0.5em' }}>
                    <DivContainer>
                        <p className="text-category">Name:</p>
                        <p className="exp-line-text">Gato:</p>
                    </DivContainer>
                    <DivContainer>
                        <p className="text-category">User since:</p>
                        <p className="exp-line-text">5 months</p>
                    </DivContainer>
                    <DivContainer>
                        <p className="text-category">Birthday:</p>
                        <p className="exp-line-text">21/12/21:</p>
                    </DivContainer>
                    <DivContainer>
                        <p className="text-category">Tips</p>
                        <p className="exp-line-text">Q: $10  </p>
                        <p className="exp-line-text">Revenue: $20</p>
                        <p className="exp-line-text">Average: $20</p>
                    </DivContainer>
                    <DivContainer>
                        <p className="text-category">Exclusive Content</p>
                        <p className="exp-line-text">Q: $10  </p>
                        <p className="exp-line-text">Revenue: $20</p>
                    </DivContainer>
                    <DivContainer>
                        <p className="text-category">Start:</p>
                        <p className="exp-line-text">#</p>
                    </DivContainer>
                    <DivContainer>
                        <p className="text-category">Coments</p>
                        <p className="exp-line-text">#</p>
                    </DivContainer>
                </div>
              )))}
          </div>
        </div>
      </div>
    </>
  )
}

export default FollowersTable
