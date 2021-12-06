import React from 'react'
import PropTypes from 'prop-types'

export default function Response() {
  return (
    <div>
      <p>this is a response to a survey</p>
    </div>
  )
}

Response.propTypes = {
  name: PropTypes.string,
  response1: PropTypes.string,
  response2: PropTypes.string,
  response3: PropTypes.string,
  response4: PropTypes.string,
  response5: PropTypes.string,
  id: PropTypes.string,
}
