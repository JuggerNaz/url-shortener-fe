import React, { useState } from "react"
import axios from "axios"
// const validUrl = require('valid-url')
import validUrl from 'valid-url'

// styles
const pageStyles = {
  color: "#232129",
  padding: 96,
  fontFamily: "-apple-system, Roboto, sans-serif, serif"
}

const headingStyles = {
  marginTop: 0,
  marginBottom: 64,
  textAlign: "center"
}

const headingAccentStyles = {
  color: "#663399",
}

const paragraphStyles = {
  marginBottom: 48,
  textAlign: "center"
}

const inputStyle = {
  padding: '15px',
  width: '50vw',
  marginRight: '3px',
  border: '3px solid #663399',
  borderRadius: '5px',
  color: '#663399'
}

const buttonStyle = {
  padding: '15px',
  backgroundColor: '#663399',
  color: '#fff',
  borderRadius: '5px',
}

// markup
const IndexPage = () => {

  const [message, setMessage] = useState('')
  const [hashcode, setHashCode] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    setMessage('')
    setErrorMessage('')

    if(e.target.url.value.length > 50 && validUrl.isUri(e.target.url.value)){
      axios.post('https://apiurls.nazrulmuhaimin.com/url',
      {
        url: e.target.url.value
      }
      ).then( response => {
        console.log(response)
        setMessage(response.data.message)
        setHashCode(response.data.hashcode)
      }).catch(function (error) {
        console.log(error);
      })
    }
    else
      setErrorMessage('Your link are just short / not a valid URI')
  }

  const handleClear = (e) => {
    e.preventDefault()
    document.getElementById("urlShortForm").reset()
    setMessage('')
    setErrorMessage('')
  }

  return (
    <main style={pageStyles}>
      <title>Home Page</title>
      <h1 style={headingStyles}>
        URL-Shortener
        <br />
        <span style={headingAccentStyles}>just paste long URL and hit the button! </span>
        <span role="img" aria-label="Party popper emojis">
          🎉🎉🎉
        </span>
      </h1>
      <div style={paragraphStyles}>
        <form onSubmit={handleSubmit} id="urlShortForm">
          <input name="url" type="text" style={inputStyle} />
          <button type="submit" style={buttonStyle} >Shorter!</button>
          <button style={buttonStyle} onClick={handleClear}>Clear</button>
        </form>
      </div>
      {
        message != '' &&
        <p style={paragraphStyles}>
          { message }. Copy below shortened URL: <br/>
          <a href={ `http://localhost:3000/dev/get/${hashcode}` } target="_blank">{ `http://localhost:3000/dev/get/${hashcode}` }</a>
        </p>
      }
      {
        errorMessage != '' &&
        <p style={paragraphStyles}>
          { errorMessage }
        </p>
      }
    </main>
  )
}

export default IndexPage
