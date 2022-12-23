import React, { FunctionComponent, ReactPropTypes } from 'react'
import { IInvites } from '../../interfaces'

const Invite: React.FC<IInvites> = (props) => {
  return (
    <div key={props._id}>{props.name} {props.lastname}</div>
  )
}

export default Invite