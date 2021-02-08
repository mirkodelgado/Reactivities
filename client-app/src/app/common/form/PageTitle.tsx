import React from 'react'

const PageTitle: React.FC<{title: string}> = ({title}) => {
    return (
      <div
        className="ced_header"
        style={{
          background: 'url("/assets/ced_header.png") center bottom no-repeat',
        }}
      >
        {title}
      </div>           
    )
}

export default PageTitle
