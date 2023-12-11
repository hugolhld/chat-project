import React from 'react'

const ChatBox = ({idTo, chidlren}) => {
  return (
    <div className="grid grid-cols-12 gap-y-2">
        {chidlren}
    </div>
  )
}

export default ChatBox