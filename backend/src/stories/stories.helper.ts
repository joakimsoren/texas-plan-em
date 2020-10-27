export const getMedian = (numbers: number[]): number => {
  const mid: number = Math.floor(numbers.length / 2)
  const sortedNumbers: number[] = [...numbers].sort((a, b) => a - b)
  const isOdd: boolean = numbers.length % 2 !== 0
  
  return isOdd ? sortedNumbers[mid] : roundToNearest((sortedNumbers[mid - 1] + sortedNumbers[mid]) / 2)
}

const roundToNearest = (number: number): number => {
  const allowedValues: number[] = [1, 2, 4, 8]
  return allowedValues.reduce(function(prev, curr) {
    return (Math.abs(curr - number) < Math.abs(prev - number) ? curr : prev);
  });
}