export function detectPattern(topic: string) {
  if (!topic) return "unknown"; // ✅ HARD GUARD

  const t = topic.toLowerCase();

  if (t.includes("two sum")) return "two-sum";
  if (t.includes("three sum")) return "three-sum";
  if (t.includes("binary")) return "binary-search";
  if (t.includes("palindrome")) return "palindrome";
  if (t.includes("window")) return "sliding-window";

  return "unknown";
}
export function generateTwoSumSteps(nums: number[], target: number) {
  const steps = [];

  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      steps.push({
        array: nums,
        left: i,
        right: j,
        description: `Checking ${nums[i]} + ${nums[j]}`,
      });

      if (nums[i] + nums[j] === target) {
        steps.push({
          array: nums,
          highlight: [i, j],
          description: `Found pair`,
        });
        return steps;
      }
    }
  }
  return steps;
}

export function generateBinarySearchSteps(nums: number[], target: number) {
  const steps = [];
  let l = 0,
    r = nums.length - 1;

  while (l <= r) {
    let mid = Math.floor((l + r) / 2);

    steps.push({
      array: nums,
      left: l,
      right: r,
      mid,
      description: `Checking ${nums[mid]}`,
    });

    if (nums[mid] === target) {
      steps.push({
        array: nums,
        highlight: [mid],
        description: `Found`,
      });
      return steps;
    }

    if (nums[mid] < target) l = mid + 1;
    else r = mid - 1;
  }

  return steps;
}

export function generatePalindromeSteps(str: string) {
  const arr = str.split("");
  const steps = [];
  let l = 0,
    r = arr.length - 1;

  while (l < r) {
    steps.push({
      array: arr,
      left: l,
      right: r,
      description: `Comparing ${arr[l]} & ${arr[r]}`,
    });

    if (arr[l] !== arr[r]) return steps;

    l++;
    r--;
  }

  steps.push({
    array: arr,
    description: "Palindrome confirmed",
  });

  return steps;
}

export function getSteps(topic: string) {
  const p = detectPattern(topic);

  if (p === "two-sum")
    return generateTwoSumSteps([2, 7, 11, 15], 9);

  if (p === "binary-search")
    return generateBinarySearchSteps([1, 3, 5, 7, 9], 7);

  if (p === "palindrome")
    return generatePalindromeSteps("racecar");

  return [];
}