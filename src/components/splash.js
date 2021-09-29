import React from "react";
import styled, { keyframes } from "styled-components";

export default function Spalsh() {
  const spinPulse = keyframes`
    0% {
      transform: rotate(160deg);
      opacity: 0;
      box-shadow: 0 0 1px #bdd73c;
    }
    50% {
      transform: rotate(145deg);
      opacity: 1;
    }
    100% {
      transform: rotate(-320deg);
      opacity: 0;
    }
  `;

  const spinoffPulse = keyframes`
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  `;

  const rotatecircle = keyframes`
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(-360deg);
    }
  `;

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
    top: 100px;
    position: relative;
    animation: ${spinPulse} 1s infinite linear;
  `;

  const InnerCircle = styled.div`
    background-color: transparent;
    border: 5px solid rgba(189, 215, 60, 0.6);
    opacity: 0.9;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-radius: 100px;
    top: 1px;
    width: 92px;
    height: 92px;
    margin: 0 auto;
    position: relative;
    animation: ${spinoffPulse} 1s infinite linear;
  `;

  const Icon = styled.div`
    background: rgba(255, 255, 255, 0)
      url("https://lh3.googleusercontent.com/S8IkXht94PZC_NqYwmHAUehx2_r2pDgr_sLYkC8CdVBvHKSGsR4OKtneJVbiLuuaXoI27cB77KGgf9p7qiw6Q6--=s128")
      no-repeat center/100%;
    width: 76px;
    height: 700px;
    top: -400px;
    margin: 0 auto;
    position: relative;
    &:hover {
      animation: ${rotatecircle} 4s infinite linear;
    }
  `;
  return (
    <div>
      <OutterCircle />
      <InnerCircle />
      <Icon />
    </div>
  );
}
