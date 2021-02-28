import React, { FunctionComponent } from 'react'

const ProfileNotExist: FunctionComponent<{}> = () => {
  return (
    <>
      <div className="content-grid" style={{ maxWidth: '800px', paddingTop: '100px' }}>
        <h1>User not exists</h1>
      </div>
    </>
  )
}

export default ProfileNotExist
