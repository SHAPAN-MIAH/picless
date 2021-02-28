import React, { FunctionComponent } from 'react'

const iframe =
  '<iframe src="https://antmedia.lup20.uk/WebRTCAppEE/play.html?name=lupanarStreamc" frameborder="0" style="overflow:hidden;height:100%;width:100%" height="100%" width="100%"/>'

const Iframe = (props: any) => {
  return <div dangerouslySetInnerHTML={{ __html: props.iframe ? props.iframe : '' }} />
}

const Viewer: FunctionComponent<{}> = () => {
  return (
    <>
      <div className="grid grid-3-9">
        <div className="account-hub-content">
          <div className="grid-column"> </div>
          <div className="grid-column">
            <div className="widget-box">
              <p className="widget-box-title">Viewer</p>
              <Iframe iframe={iframe} />
            </div>
          </div>

          <div className="grid-column"> </div>
        </div>
      </div>
    </>
  )
}

export default Viewer
