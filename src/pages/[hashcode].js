import React, { useState, useEffect } from "react"
import axios from "axios"

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

// markup
const IndexPage = ({ params }) => {

  const hashcode = params[`hashcode`]
  const [oriUrl, setOriUrl] = useState('')

  useEffect(() => {
    axios.get(`https://apiurls.nazrulmuhaimin.com/get/${hashcode}`)
        .then( response => {
            console.log(response)
            setOriUrl(response.data.url)
        }).catch(function (error) {
            console.log(error);
        })
  })

  return (
    <main style={pageStyles}>
      <title>Home Page</title>
      <h1 style={headingStyles}>
        URL-Shortener
        <br />
        <span style={headingAccentStyles}>{oriUrl}</span>
      </h1>
    </main>
  )
}

export default IndexPage
