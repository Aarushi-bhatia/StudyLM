import React from 'react'

const Chatpage = () => {
  return (
    <div className="space-y-6 pb-4">
            {/* Conversation messages */}
            {answers.map((item, index) => (
              <Conversation />
            ))}

            {/* Loading indicator */}
            {loading && (
              <Loading />
            )}
          </div>
  )
}

export default Chatpage