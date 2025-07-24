// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function CustomTooltip({ active, payload, coordinate }: any) {
  if (!active || !payload || !payload.length || !coordinate) return null

  const { x, y } = coordinate
  const value = payload[0].value

  return (
    <div
      style={{
        position: 'absolute',
        left: x - 8,
        top: y - 33.1,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          color: '#fff',
          fontSize: '12px',
          fontWeight: 600,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          padding: '2px 6px',
          borderRadius: '4px',
          marginBottom: '4px',
        }}
      >
        {value}
      </div>

      <svg width={14} height={14}>
        <circle
          cx={7}
          cy={7}
          r={5}
          fill='#37b8e7'
          stroke='#fff'
          strokeWidth={2}
        />
      </svg>
    </div>
  )
}
