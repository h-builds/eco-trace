export function setupCounter(counterButton: HTMLButtonElement) {
  let clickCount = 0
  const setCounter = (count: number) => {
    clickCount = count
    counterButton.textContent = `Count is ${clickCount}`
  }
  counterButton.addEventListener('click', () => setCounter(clickCount + 1))
  setCounter(0)
}
