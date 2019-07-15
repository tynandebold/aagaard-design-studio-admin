import React, { useState } from "react"

const Contact = () => {
  const [active, setActive] = useState(false)
  const [copyMessage, setCopyMessage] = useState("")

  const handleClick = e => {
    e.target.firstChild.select()
    document.execCommand("copy")
    setActive(true)
    setCopyMessage("Email copied to clipboard")
    removeClass()
  }

  const removeClass = () => {
    window.setTimeout(() => {
      setActive(false)
    }, 3500)
  }

  return (
    <div className="contact-btn-wrapper">
      <button onClick={handleClick}>
        <input
          style={{
            top: "-1rem",
            cursor: "default",
            height: 0,
            opacity: 0.01,
            position: "absolute",
            right: 0,
          }}
          defaultValue="fta@charlietango.dk"
        />
        Contact
      </button>
      {copyMessage && (
        <p className={active ? "copied-msg active" : "copied-msg"}>
          {copyMessage}
        </p>
      )}
    </div>
  )
}

export default Contact
