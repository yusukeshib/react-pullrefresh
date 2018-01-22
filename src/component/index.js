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
  z-index: ${props => props.zIndex};
  left: 50%;
  border-radius: 20px;
  width: 40px;
  height: 40px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),
    0 3px 1px -2px rgba(0, 0, 0, 0.2);
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

export default props => {
  const { zIndex, color, bgColor, max, yRefreshing, y, phase } = props
  const p = Math.atan(y / max)
  const pMax = Math.atan(yRefreshing / max)
  const r = Math.PI * 10 * 2
  const Svg = phase === 'refreshing' ? RotatingSvg : 'svg'
  const Circle = phase === 'refreshing' ? DashedCircle : 'circle'
  const refreshed = phase === 'refreshed'
  return (
    <Component
      key="pull"
      zIndex={zIndex}
      style={{
        top: Math.max(refreshed ? Math.atan(1) : p, 0) * max - 10,
        transform: `translate(-50%, -100%) scale(${refreshed ? p : 1},${
          refreshed ? p : 1
        })`,
        backgroundColor: bgColor
      }}
    >
      <Svg
        style={{
          transform: `rotate(${yRefreshing}deg)`
        }}
        width={40}
        height={40}
        viewBox="0 0 40 40"
      >
        <Circle
          style={{ opacity: pMax }}
          stroke={color}
          strokeWidth={2.5}
          strokeDasharray={[r * pMax * 0.6, r * (1 - pMax * 0.6)]}
          strokeDashoffset={-r * (1 - pMax * 0.6)}
          fill="none"
          cx={20}
          cy={20}
          r={8.5}
        />
        {phase !== 'refreshing' && (
          <path
            style={{
              opacity: pMax,
              transformOrigin: '50% 0%',
              transform: `scale(${Math.min(pMax, 1)}, ${Math.min(pMax, 1)})`
            }}
            fill={color}
            d="M23.5,19l5,5l5-5H23.5z"
          />
        )}
      </Svg>
    </Component>
  )
}
