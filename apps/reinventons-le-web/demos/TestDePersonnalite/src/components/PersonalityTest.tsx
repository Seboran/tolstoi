import { Fragment, effect, h, reactive, ref } from 'nirina.js'

/**
 * PersonalityTest Component
 *
 * This component demonstrates usage of the nirina.js reactive primitives inside a JSX component.
 *
 * IMPORTANT:
 * - Because the current renderer only re-runs reactive functions bound to attributes or text nodes,
 *   we structure the UI so that all dynamic visibility / text comes from small reactive functions.
 * - Each question block always exists in the DOM; we toggle its visibility via a reactive style attribute.
 * - Likewise, the result section is toggled similarly.
 *
 * To mount reactively (so that future improvements like dynamic list diffing would re-create the VNode tree),
 * you could (once exported) use mountReactive(() => <PersonalityTest /> , container).
 * For now, this component relies on attribute-level effects which are supported.
 */

// ---- Types ------------------------------------------------------------------

type AnswerOption = {
  id: string
  text: string
  // Trait impact can be extended (e.g., mapping to multiple trait scores)
  trait: string
  weight: number
}

type Question = {
  id: string
  prompt: string
  answers: AnswerOption[]
}

interface TestState {
  currentQuestion: number
  answers: string[] // answer IDs chosen (parallel to questions)
  finished: boolean
  scores: Record<string, number> // trait -> accumulated weight
}

// ---- Data -------------------------------------------------------------------

const questions: Question[] = [
  {
    id: 'q1',
    prompt: 'You’re at a party with many strangers. You:',
    answers: [
      {
        id: 'q1a1',
        text: 'Start conversations enthusiastically',
        trait: 'Extroversion',
        weight: 2,
      },
      { id: 'q1a2', text: 'Wait for people to approach you', trait: 'Introversion', weight: 2 },
      { id: 'q1a3', text: 'Stick with one or two people you know', trait: 'Stability', weight: 1 },
    ],
  },
  {
    id: 'q2',
    prompt: 'When faced with a complex problem you prefer:',
    answers: [
      { id: 'q2a1', text: 'Breaking it down methodically', trait: 'Logic', weight: 2 },
      { id: 'q2a2', text: 'Brainstorming creative angles', trait: 'Creativity', weight: 2 },
      { id: 'q2a3', text: 'Asking others for perspectives', trait: 'Empathy', weight: 1 },
    ],
  },
  {
    id: 'q3',
    prompt: 'Your ideal weekend involves:',
    answers: [
      { id: 'q3a1', text: 'Exploring new places/activities', trait: 'Openness', weight: 2 },
      { id: 'q3a2', text: 'Finishing tasks / organizing', trait: 'Conscientiousness', weight: 2 },
      { id: 'q3a3', text: 'Relaxing with a close circle', trait: 'Balance', weight: 1 },
    ],
  },
]

// ---- State ------------------------------------------------------------------

const state = reactive<TestState>({
  currentQuestion: 0,
  answers: [],
  finished: false,
  scores: {},
})

const totalQuestions = questions.length
const errorRef = ref<string | null>(null)

// ---- Logic ------------------------------------------------------------------

function selectAnswer(answer: AnswerOption) {
  errorRef.value = null

  // Record answer (replace existing if user clicks again on same question)
  state.answers[state.currentQuestion] = answer.id

  // Accumulate trait score
  state.scores[answer.trait] = (state.scores[answer.trait] || 0) + answer.weight

  // Advance or finish
  if (state.currentQuestion < totalQuestions - 1) {
    state.currentQuestion++
  } else {
    state.finished = true
  }
}

function resetTest() {
  state.currentQuestion = 0
  state.answers.length = 0
  state.finished = false
  for (const k of Object.keys(state.scores)) delete state.scores[k]
  errorRef.value = null
}

// Derive a sorted scores array inside a reactive wrapper for display
function sortedScores(): Array<{ trait: string; score: number }> {
  return Object.entries(state.scores)
    .map(([trait, score]) => ({ trait, score }))
    .sort((a, b) => b.score - a.score)
}

// ---- UI Helpers -------------------------------------------------------------

function progressPercent(): number {
  return Math.round(
    ((state.finished ? totalQuestions : state.currentQuestion + 1) / totalQuestions) * 100,
  )
}

function questionVisible(idx: number) {
  return () =>
    state.finished
      ? 'display:none'
      : idx === state.currentQuestion
        ? 'display:block'
        : 'display:none'
}

function resultsVisible() {
  return () => (state.finished ? 'display:block' : 'display:none')
}

// ---- Component --------------------------------------------------------------

export function PersonalityTest() {
  return (
    <div
      class="personality-test"
      style="font-family: system-ui; max-width: 640px; margin: 0 auto; line-height:1.4;"
    >
      <h2 style="margin-top:0;">Personality Test</h2>

      {/* Progress */}
      <div
        class="progress"
        style={() =>
          `margin:8px 0 16px; background:#eee; height:12px; border-radius:6px; overflow:hidden; position:relative;`
        }
      >
        <div
          class="bar"
          style={() =>
            `background:#4b7cff; width:${progressPercent()}%; height:100%; transition:width .3s;`
          }
        />
        <span
          style={() =>
            `position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); font-size:11px; color:#222;`
          }
        >
          {() => `${progressPercent()}%`}
        </span>
      </div>

      {/* Questions */}
      <div class="questions">
        {questions.map((q, qIndex) => (
          <div
            class="question-block"
            style={questionVisible(qIndex)}
            data-question-id={q.id}
            key={q.id}
          >
            <h3 style="margin:12px 0 8px; font-size:18px;">
              {() => `Question ${qIndex + 1} of ${totalQuestions}`}
            </h3>
            <p style="margin:0 0 12px; font-weight:500;">{q.prompt}</p>
            <div class="answers" style="display:flex; flex-direction:column; gap:8px;">
              {q.answers.map((a) => (
                <button
                  key={a.id}
                  onclick={() => selectAnswer(a)}
                  style={() => {
                    const chosen = state.answers[qIndex] === a.id
                    return [
                      'text-align:left',
                      'padding:10px 12px',
                      'border-radius:6px',
                      'border:1px solid',
                      chosen
                        ? 'background:#4b7cff; color:#fff; border-color:#4b7cff'
                        : 'background:#fff; color:#222; border-color:#ccc',
                      'cursor:pointer',
                      'font-size:14px',
                      'transition:background .2s, color .2s, border-color .2s',
                    ].join(';')
                  }}
                >
                  <strong>{a.text}</strong>
                  <br />
                  <small style="opacity:.7;">Trait: {a.trait}</small>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Results */}
      <div class="results" style={resultsVisible()}>
        <h3 style="margin:20px 0 8px;">Results</h3>
        <p style="margin:0 0 12px;">
          {() =>
            state.answers.length === totalQuestions
              ? 'You completed the test. Here are your trait intensities:'
              : 'Incomplete data.'
          }
        </p>
        <ul style="list-style:none; padding:0; margin:0 0 16px;">
          {sortedScores().map((s) => (
            <li
              key={s.trait}
              style="margin:4px 0; padding:6px 10px; background:#f7f9fc; border:1px solid #e2e6ef; border-radius:4px;"
            >
              <span style="display:inline-block; width:140px; font-weight:600;">{s.trait}</span>
              <span style="display:inline-block; min-width:40px;">{s.score}</span>
              <span
                style={() =>
                  `display:inline-block; height:6px; background:#4b7cff33; width:120px; position:relative; margin-left:8px; border-radius:3px; overflow:hidden;`
                }
              >
                <span
                  style={() =>
                    `display:block; height:100%; background:#4b7cff; width:${Math.min(
                      100,
                      s.score * 20,
                    )}%; transition:width .3s;`
                  }
                />
              </span>
            </li>
          ))}
        </ul>
        <button
          onclick={resetTest}
          style="padding:10px 14px; border-radius:6px; border:1px solid #4b7cff; background:#4b7cff; color:#fff; cursor:pointer; font-size:14px;"
        >
          Retake Test
        </button>
      </div>

      {/* Debug / Raw JSON (toggle comment if needed) */}
      {/* <pre style="margin-top:24px; font-size:11px; background:#fafafa; padding:8px; border:1px solid #eee; border-radius:4px;">
        {() => JSON.stringify(state, null, 2)}
      </pre> */}

      {errorRef.value && (
        <p style="color:#c00; font-weight:600; margin-top:12px;">{() => errorRef.value}</p>
      )}

      <p style="margin-top:24px; font-size:12px; opacity:.6;">
        Powered by <code>nirina.js</code> reactive primitives.
      </p>
    </div>
  )
}

export default PersonalityTest
