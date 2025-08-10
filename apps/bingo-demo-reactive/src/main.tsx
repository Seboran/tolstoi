import { h, mount } from 'nirina.js'
import { BingoTableau } from './components/BingoTableau'
import './style.css'

const container = document.getElementById('app')!

// Define the bingo grid data
const bingoData = [
  [5, 12, 1, 16],
  [9, 3, 11, 2],
  [14, 7, 4, 6],
  [8, 15, 10, 13],
]

// Mount the app with a 4x4 grid
mount(
  <div class="main-app">
    <h1>Bingo</h1>
    <BingoTableau rows={bingoData} />
  </div>,
  container,
)
