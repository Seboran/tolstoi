import { type SudokuGrid } from 'lib-sudoku'
import * as OSMD from 'opensheetmusicdisplay'
import { onUnmounted, ref, watchEffect } from 'vue'
import { createPartition } from './musiqueUtils'
import { numberToNote } from './numberToNote'

export function useOsmd(divId: string, grilleAccords: SudokuGrid) {
  const $osmd = (identifier: string) =>
    new OSMD.OpenSheetMusicDisplay(identifier)
  let osmd: ReturnType<typeof $osmd> | undefined

  const notes = ref<string[]>([])
  watchEffect(
    async () => {
      if (!osmd) {
        osmd = $osmd(divId)
      }

      osmd.setOptions({
        drawTitle: false,
        followCursor: true,
        drawMeasureNumbersOnlyAtSystemStart: false,
        drawMeasureNumbers: false,
        drawPartNames: false,
      })
      // Convert the chord to music notes and format them for OSMD
      notes.value = grilleAccords.flatMap((grille) => grille)!.map(numberToNote)

      const xmlString = createPartition(notes.value)

      await osmd.load(xmlString)
      osmd.render()
    },
    {
      flush: 'post',
    },
  )
  onUnmounted(() => {
    osmd?.clear()
  })

  return {
    notes,
  }
}
