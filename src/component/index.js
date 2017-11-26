import React from 'react'
import styled, { keyframes } from 'styled-components'

const rotating = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(270deg);
  }
`
const dashed = keyframes`
  0% {
    stroke-dashoffset: 62px;
  }
  50% {
    stroke-dashoffset: ${62 / 4}px;
    transform: rotate(135deg);
  }
  100% {
    stroke-dashoffset: 62px;
    transform: rotate(450deg);
  }
`

const Component = styled.div`
  position: absolute;
  left: 50%;
  border-radius: 20px;
  width: 40px;
  height: 40px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
`

const RotatingSvg = styled.svg`
  transform-origin: center;
  animation: ${rotating} 1.4s linear infinite;
`

const DashedCircle = styled.circle`
  stroke-dasharray: 62px;
  transform-origin: center;
  animation: ${dashed} 1.4s ease-in-out infinite;
`

export default (props, state, children) => {
  const { yMax, y, refreshing, refreshed } = state
  const p = Math.atan(y / props.max)
  const pMax = Math.atan(yMax / props.max)
  const r = Math.PI * 10 * 2
  const Svg = refreshing ? RotatingSvg : 'svg'
  const Circle = refreshing ? DashedCircle : 'circle'
  return [
    <Component
      key='pull'
      style={{
        top: Math.max(refreshed ? Math.atan(1) : p, 0) * props.max - 10,
        transform: `translate(-50%, -100%) scale(${refreshed ? p : 1},${refreshed ? p : 1})`,
        backgroundColor: props.bgColor
      }}
    >
      <Svg
        style={{
          transform:`rotate(${yMax}deg)`
        }}
        width={40}
        height={40}
        viewBox='0 0 40 40'
      >
        <Circle
          style={{ opacity:pMax }}
          stroke={props.color}
          strokeWidth={2.5}
          strokeDasharray={[r * pMax * 0.6, r * (1 - pMax * 0.6)]}
          strokeDashoffset={-r * (1 - pMax * 0.6)}
          fill='none'
          cx={20}
          cy={20}
          r={10}
        />
        { !refreshing &&
            <polygon
              style={{
                opacity: pMax,
                transformOrigin: '50% 0%',
                transform: `scale(${Math.min(pMax,1)}, ${Math.min(pMax,1)})`
              }}
              fill={props.color}
              points='30,24 26,20 34,20'
            />
        }
      </Svg>
    </Component>,
    children
  ]
}


