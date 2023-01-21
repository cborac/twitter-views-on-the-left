// ==UserScript==
// @name         Twitter Views on the Left
// @namespace    https://boraciner.com/
// @version      1.1
// @description  Moves the Twitter views to the left side of the screen
// @author       Bora Ciner
// @match        https://twitter.com/*
// @iconURL      https://raw.githubusercontent.com/cborac/twitter-views-on-the-left/main/assets/logo256.png
// @grant        none
// @updateURL    https://raw.githubusercontent.com/cborac/twitter-views-on-the-left/main/moveToLeft.user.js
// @downloadURL  https://raw.githubusercontent.com/cborac/twitter-views-on-the-left/main/moveToLeft.user.js
// ==/UserScript==


const observer = new MutationObserver((records) => {
     const nodes = records.flatMap(x => Array.from(x.addedNodes), 2)
     if (nodes.length == 0) return

     const btns = Array.from(document.querySelectorAll('[aria-label$="View Tweet analytics"]')).filter(x => !x.getAttribute("modified"))

     btns.forEach(x => {
          const el = x.parentElement
          const container = x.parentElement.parentElement

          const emptySpace = document.createElement("div")
          emptySpace.style.width = `${x.offsetWidth}px`

          container.prepend(emptySpace)

          el.style.position = "absolute";

          x.setAttribute("modified", true)
     })
})

observer.observe(document, {
     childList: true,
     subtree: true
})
