import React from 'react'
import PropTypes from 'prop-types'

export default function Response(props) {
  return (
    <div>
      <p>Response 1: {props.response1}</p>
      <p>Response 2: {props.response2}</p>
      <p>Response 3: {props.response3}</p>
      <p>Response 4: {props.response4}</p>
      <p>Response 5: {props.response5}</p>
      
    </div>
  )
}

Response.propTypes = {
  title: PropTypes.string,
  response1: PropTypes.string,
  response2: PropTypes.string,
  response3: PropTypes.string,
  response4: PropTypes.string,
  response5: PropTypes.string,
  id: PropTypes.string,
}
