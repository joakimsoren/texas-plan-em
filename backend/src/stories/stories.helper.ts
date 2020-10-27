export const getMedian = (numbers: number[]): number => {
  const mid: number = Math.floor(numbers.length / 2)
  const sortedNumbers: number[] = [...numbers].sort((a, b) => a - b)
  const isOdd: boolean = numbers.length % 2 !== 0
  
  return isOdd ? sortedNumbers[mid] : (sortedNumbers[mid - 1] + sortedNumbers[mid]) / 2
}