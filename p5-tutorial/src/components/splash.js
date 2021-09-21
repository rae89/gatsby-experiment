import React from "react"
import styled, { keyframes } from "styled-components"

export default function Spalsh() {
  const spinPulse = keyframes`
    0% {
      -moz-transform: rotate(160deg);
      opacity: 0;
      box-shadow: 0 0 1px #bdd73c;
    }
    50% {
      -moz-transform: rotate(145deg);
      opacity: 1;
    }
    100% {
      -moz-transform: rotate(-320deg);
      opacity: 0;
    }
  `

  const spinoffPulse = keyframes`
    0% {
      -moz-transform: rotate(0deg);
    }
    100% {
      -moz-transform: rotate(360deg);
    }
  `

  const rotatecircle = keyframes`
    0% {
      -moz-transform: rotate(0deg);
    }
    100% {
      -moz-transform: rotate(-360deg);
    }
  `

  const OutterCircle = styled.div`
    background-color: transparent;
    border: 8px solid rgba(97, 82, 72, 0.9);
    opacity: 0.9;
    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
    border-radius: 100px;
    width: 103px;
    height: 103px;
    margin: 0 auto;
    animation: ${spinPulse} 1s infinite linear;
  `

  const InnerCircle = styled.div`
    background-color: transparent;
    border: 5px solid rgba(189, 215, 60, 0.6);
    opacity: 0.9;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-radius: 100px;
    top: -110px;
    width: 92px;
    height: 92px;
    margin: 0 auto;
    position: relative;
    animation: ${spinoffPulse} 1s infinite linear;
  `

  const Icon = styled.div`
    background: rgba(255, 255, 255, 0)
      url("https://img.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/2008794.png")
      no-repeat center/100%;
    width: 76px;
    height: 76px;
    top: -200px;
    margin: 0 auto;
    position: relative;
    animation: ${rotatecircle} 4s infinite linear;
  `
  return (
    <div>
      <OutterCircle />
      <InnerCircle />
      <Icon />
    </div>
  )
}
