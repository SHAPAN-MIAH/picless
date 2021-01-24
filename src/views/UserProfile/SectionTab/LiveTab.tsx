import React, { FunctionComponent } from 'react'

const LiveTab: FunctionComponent<{}> = () => {
  const iframe =
    '<iframe src="https://antmedia.lup20.uk/WebRTCAppEE/play.html?name=lupanarStreamc" frameborder="0" style="overflow:hidden;height:100%;width:100%" height="100%" width="100%"/>'

  const Iframe = (props: any) => {
    return <div dangerouslySetInnerHTML={{ __html: props.iframe ? props.iframe : '' }} style={{ height: '450px' }} />
  }

  return (
    <>
      <div className="grid grid-9-3 mobile-prefer-content">
        <div className="grid-column">
          <div className="widget-box">
            <Iframe iframe={iframe} />
          </div>
        </div>
        <div className="grid-column">
          <div className="widget-box">CHAT</div>
        </div>
      </div>
    </>
  )
}

export default LiveTab
