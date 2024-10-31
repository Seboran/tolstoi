export const createPartition = (notes: string[]) => `
  <?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE score-partwise PUBLIC "-//Recordare//DTD MusicXML 3.1 Partwise//EN" "http://www.musicxml.org/dtds/partwise.dtd">
<score-partwise version="3.1">
  <work>
    <work-title></work-title>
  </work>
  <part-list>
    <score-part id="P1">
    </score-part>
  </part-list>
  <part id="P1">
    ${getMesures(notes)}
  </part>
</score-partwise>`

const getMesures = (notes: string[]) => {
  // split notes into measures of 4 notes
  const measures: string[][] = []
  for (let i = 0; i < notes.length; i += 4) {
    const measureNotes = notes.slice(i, i + 4)
    measureNotes.reverse()
    measures.push(measureNotes)
  }

  return measures
    .map(
      (measure, index) => `<measure number="${index + 1}">
      // ${measure.map(createNote).join('\n')}
    </measure>`,
    )
    .join('')
}
const createNote = (note: string) => `
        <note>
          <pitch>
            <step>${note[0]}</step>
            <octave>4</octave>
          </pitch>
          <duration>1</duration>
          <type>quarter</type>
        </note>`
