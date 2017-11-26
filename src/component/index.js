import React from 'react'
import { StyleSheet, css } from 'aphrodite'

const rotateKey = {
  '0%': {
    transform: 'rotate(0deg)'
  },
  '100%': {
    transform: 'rotate(270deg)'
  }
}
const dashKey = {
  '0%': {
    strokeDashoffset: 62
  },
  '50%': {
    strokeDashoffset: 62 / 4,
    transform: 'rotate(135deg)'
  },
  '100%': {
    strokeDashoffset: 62,
    transform: 'rotate(450deg)'
  }
}

const styles = StyleSheet.create({
  comp: {
    position: 'absolute',
    left: '50%',
    borderRadius: 20,
    width: 40,
    height: 40,
    boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)'
  },
  rotate: {
    transformOrigin: 'center',
    animationName: rotateKey,
    animationDuration: '1400ms',
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite'
  },
  dash: {
    strokeDasharray: 62,
    transformOrigin: 'center',
    animationName: dashKey,
    animationDuration: '1400ms',
    animationTimingFunction: 'ease-in-out',
    animationIterationCount: 'infinite'
  }
})

export default (props, state, children) => {
  const { yMax, y, refreshing, refreshed } = state
  const p = Math.atan(y / props.max)
  const pMax = Math.atan(yMax / props.max)
  const r = Math.PI * 10 * 2
  return [
    <div
      key='pull'
      className={css(styles.comp)}
      style={{
        top: Math.max(refreshed ? Math.atan(1) : p, 0) * props.max - 10,
        transform: `translate(-50%, -100%) scale(${refreshed ? p : 1},${refreshed ? p : 1})`,
        backgroundColor: props.bgColor
      }}
    >
      <svg
        style={{
          transform:`rotate(${yMax}deg)`
        }}
        className={css(refreshing && styles.rotate)}
        width={40}
        height={40}
        viewBox='0 0 40 40'
      >
        <circle
          className={css(refreshing && styles.dash)}
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
      </svg>
    </div>,
    children
  ]
}


