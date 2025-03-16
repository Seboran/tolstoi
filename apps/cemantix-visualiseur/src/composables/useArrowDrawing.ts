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

    // Calculate the arrow head points
    const angle = Math.atan2(toY - ctrlY, toX - ctrlX)

    // Begin drawing
    ctx.save()
    ctx.beginPath()
    ctx.strokeStyle = color
    ctx.fillStyle = color
    ctx.lineWidth = lineWidth

    // Draw the curved line
    ctx.beginPath()
    ctx.moveTo(fromX, fromY)
    ctx.quadraticCurveTo(ctrlX, ctrlY, toX, toY)
    ctx.stroke()

    // Draw the arrow head
    ctx.beginPath()
    ctx.moveTo(toX, toY)
    ctx.lineTo(
      toX - arrowSize * Math.cos(angle - Math.PI / 6),
      toY - arrowSize * Math.sin(angle - Math.PI / 6),
    )
    ctx.lineTo(
      toX - arrowSize * Math.cos(angle + Math.PI / 6),
      toY - arrowSize * Math.sin(angle + Math.PI / 6),
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
