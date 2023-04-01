export function isSubarray(array: string[], subarray: string[]) {
  for (let item of subarray) {
    if (!array.includes(item)) {
      return false;
    }
  }

  return true;
}