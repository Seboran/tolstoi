const STATE_KEY = 'bingoStates'
let states = JSON.parse(localStorage.getItem(STATE_KEY)) || {}

document.querySelectorAll('#bingo-grid td').forEach((td) => {
  const idx = td.dataset.idx
  if (states[idx]) td.classList.add('marked')
  td.addEventListener('click', () => {
    td.classList.toggle('marked')
    states[idx] = td.classList.contains('marked')
    localStorage.setItem(STATE_KEY, JSON.stringify(states))
  })
})
