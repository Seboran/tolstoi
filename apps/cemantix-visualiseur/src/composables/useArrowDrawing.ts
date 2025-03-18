export interface ArrowDrawing {
  drawArrow: (
    ctx: CanvasRenderingContext2D,
    fromX: number,
    fromY: number,
    toX: number,
    toY: number,
    color: string,
    lineWidth: number,
    arrowSize: number,
    sequenceNumber: number,
  ) => void
  getArrowColor: (index: number, totalPositions: number) => string
}

export function useArrowDrawing(): ArrowDrawing {
  /**
   * Draws a curved arrow between two points with a sequence number
   */
  const drawArrow = (
    ctx: CanvasRenderingContext2D,
    fromX: number,
    fromY: number,
    toX: number,
    toY: number,
    color: string = '#3b82f6',
    lineWidth: number = 1.5,
    arrowSize: number = 8,
    sequenceNumber: number = 1,
  ) => {
    // Calculate the distance and midpoint
    const dx = toX - fromX
    const dy = toY - fromY
    const distance = Math.sqrt(dx * dx + dy * dy)

    // Skip drawing arrows for very close words
    if (distance < 30) return

    // Calculate the control point for the curved line (perpendicular to the line)
    const midX = (fromX + toX) / 2
    const midY = (fromY + toY) / 2
    const curveFactor = Math.min(distance * 0.2, 40) // Curve intensity based on distance, with a cap

    // Create a slight offset for the control point perpendicular to the line
    const perpX = (-dy / distance) * curveFactor
    const perpY = (dx / distance) * curveFactor

    // Control point
    const ctrlX = midX + perpX
    const ctrlY = midY + perpY

    // Shorten the arrow to stop before reaching the destination
    // 0.96 means the arrow will go 96% of the way (increased from 0.92)
    const shortenFactor = 0.96

    // Calculate a point along the quadratic Bezier curve
    const t = shortenFactor
    const newToX = (1 - t) * (1 - t) * fromX + 2 * (1 - t) * t * ctrlX + t * t * toX
    const newToY = (1 - t) * (1 - t) * fromY + 2 * (1 - t) * t * ctrlY + t * t * toY

    // Calculate the tangent angle at this point for correct arrow head orientation
    // Derivative of quadratic Bezier: B'(t) = 2*(1-t)*(P1-P0) + 2*t*(P2-P1)
    const tangentX = 2 * (1 - t) * (ctrlX - fromX) + 2 * t * (toX - ctrlX)
    const tangentY = 2 * (1 - t) * (ctrlY - fromY) + 2 * t * (toY - ctrlY)
    const angle = Math.atan2(tangentY, tangentX)

    // Begin drawing
    ctx.save()
    ctx.beginPath()
    ctx.strokeStyle = color
    ctx.fillStyle = color
    ctx.lineWidth = lineWidth

    // Draw the curved line
    ctx.beginPath()
    ctx.moveTo(fromX, fromY)
    ctx.quadraticCurveTo(ctrlX, ctrlY, newToX, newToY)
    ctx.stroke()

    // Draw the arrow head at the new end point
    ctx.beginPath()
    ctx.moveTo(newToX, newToY)
    ctx.lineTo(
      newToX - arrowSize * Math.cos(angle - Math.PI / 6),
      newToY - arrowSize * Math.sin(angle - Math.PI / 6),
    )
    ctx.lineTo(
      newToX - arrowSize * Math.cos(angle + Math.PI / 6),
      newToY - arrowSize * Math.sin(angle + Math.PI / 6),
    )
    ctx.closePath()
    ctx.fill()

    // Draw the sequence number on the arrow
    const labelX = midX + perpX * 0.7 // Position it on the curved line, but not directly on the control point
    const labelY = midY + perpY * 0.7

    // Draw a small white circle background for the number
    ctx.beginPath()
    ctx.fillStyle = 'white'
    ctx.arc(labelX, labelY, 10, 0, Math.PI * 2)
    ctx.fill()

    // Draw the sequence number
    ctx.fillStyle = color
    ctx.font = 'bold 12px Arial'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(sequenceNumber.toString(), labelX, labelY)

    ctx.restore()
  }

  /**
   * Generates a color based on the position in the sequence
   */
  const getArrowColor = (index: number, totalPositions: number) => {
    // Create a gradient of colors throughout the sequence
    const hue = (index / totalPositions) * 300 // Value between 0-300 degrees
    return `hsla(${hue}, 70%, 50%, 0.8)`
  }

  return {
    drawArrow,
    getArrowColor,
  }
}
