import React, { useState } from 'react';
import { motion } from 'framer-motion';

const API_BASE = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8010';

const CodingPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('Arrays');
  const [selectedDifficulty, setSelectedDifficulty] = useState('Easy');
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [showSolution, setShowSolution] = useState(false);
  const [showBruteForce, setShowBruteForce] = useState(false);

  const categories = [
    'Arrays', 'Strings', 'Linked List', 'Stack', 'Queue', 
    'HashMap', 'Trees', 'Binary Search Tree', 'Heap', 'Graph',
    'Trie', 'Dynamic Programming', 'Greedy', 'Backtracking',
    'Recursion', 'Sliding Window', 'Two Pointer', 'Binary Search',
    'Bit Manipulation', 'Mathematics'
  ];

  const difficulties = ['Easy', 'Medium', 'Hard'];

  // ========== COMPLETE QUESTION BANK ==========
  const questionBank = {
    'Arrays': {
      'Easy': [
        {
          id: 1,
          title: 'Two Sum',
          problem: 'Given an array of integers nums and an integer target, return indices of the two numbers that add up to target.',
          constraints: ['2 <= nums.length <= 10^4', '-10^9 <= nums[i] <= 10^9', '-10^9 <= target <= 10^9'],
          inputFormat: 'First line: n (size of array)\nSecond line: n space-separated integers\nThird line: target',
          outputFormat: 'Indices of two numbers (0-based)',
          sampleInput: '4\n2 7 11 15\n9',
          sampleOutput: '[0, 1]',
          explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].',
          bruteForce: {
            approach: 'Use two nested loops to check every pair of numbers.',
            complexity: 'Time: O(n²), Space: O(1)',
            code: `function twoSum(nums, target) {\n  for (let i = 0; i < nums.length; i++) {\n    for (let j = i + 1; j < nums.length; j++) {\n      if (nums[i] + nums[j] === target) {\n        return [i, j];\n      }\n    }\n  }\n  return [];\n}`
          },
          optimal: {
            approach: 'Use a hash map to store numbers and their indices. For each number, check if complement exists in map.',
            complexity: 'Time: O(n), Space: O(n)',
            code: `function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) {\n      return [map.get(complement), i];\n    }\n    map.set(nums[i], i);\n  }\n  return [];\n}`
          }
        },
        {
          id: 2,
          title: 'Find Maximum Element',
          problem: 'Find the maximum element in a given array.',
          constraints: ['1 <= n <= 10^5', '-10^9 <= arr[i] <= 10^9'],
          inputFormat: 'First line: n\nSecond line: n space-separated integers',
          outputFormat: 'Maximum element',
          sampleInput: '5\n1 8 3 6 5',
          sampleOutput: '8',
          explanation: 'The maximum element in [1, 8, 3, 6, 5] is 8.',
          bruteForce: {
            approach: 'Sort the array and return the last element.',
            complexity: 'Time: O(n log n), Space: O(1)',
            code: `function findMax(arr) {\n  arr.sort((a,b) => a-b);\n  return arr[arr.length - 1];\n}`
          },
          optimal: {
            approach: 'Traverse the array once, keeping track of maximum element seen so far.',
            complexity: 'Time: O(n), Space: O(1)',
            code: `function findMax(arr) {\n  let max = -Infinity;\n  for (const num of arr) {\n    if (num > max) max = num;\n  }\n  return max;\n}`
          }
        },
        {
          id: 3,
          title: 'Reverse an Array',
          problem: 'Reverse the given array in-place.',
          constraints: ['1 <= n <= 10^5'],
          inputFormat: 'First line: n\nSecond line: n space-separated integers',
          outputFormat: 'Reversed array',
          sampleInput: '5\n1 2 3 4 5',
          sampleOutput: '5 4 3 2 1',
          explanation: 'The array is reversed.',
          bruteForce: {
            approach: 'Create a new array and copy elements in reverse order.',
            complexity: 'Time: O(n), Space: O(n)',
            code: `function reverseArray(arr) {\n  const result = [];\n  for (let i = arr.length - 1; i >= 0; i--) {\n    result.push(arr[i]);\n  }\n  return result;\n}`
          },
          optimal: {
            approach: 'Use two pointers, swap elements from both ends moving towards center.',
            complexity: 'Time: O(n), Space: O(1)',
            code: `function reverseArray(arr) {\n  let left = 0, right = arr.length - 1;\n  while (left < right) {\n    [arr[left], arr[right]] = [arr[right], arr[left]];\n    left++;\n    right--;\n  }\n  return arr;\n}`
          }
        }
      ],
      'Medium': [
        {
          id: 4,
          title: 'Merge Intervals',
          problem: 'Given an array of intervals where intervals[i] = [start_i, end_i], merge all overlapping intervals.',
          constraints: ['1 <= intervals.length <= 10^4', 'intervals[i].length == 2', '0 <= start_i <= end_i <= 10^4'],
          inputFormat: 'First line: n\nNext n lines: start end',
          outputFormat: 'Merged intervals',
          sampleInput: '4\n1 3\n2 6\n8 10\n15 18',
          sampleOutput: '[[1,6],[8,10],[15,18]]',
          explanation: 'Intervals [1,3] and [2,6] overlap, so they are merged into [1,6].',
          bruteForce: {
            approach: 'For each interval, check overlap with all other intervals.',
            complexity: 'Time: O(n²), Space: O(n)',
            code: `function merge(intervals) {\n  intervals.sort((a,b) => a[0] - b[0]);\n  const result = [];\n  for (const interval of intervals) {\n    let merged = false;\n    for (const res of result) {\n      if (interval[0] <= res[1]) {\n        res[1] = Math.max(res[1], interval[1]);\n        merged = true;\n        break;\n      }\n    }\n    if (!merged) result.push(interval);\n  }\n  return result;\n}`
          },
          optimal: {
            approach: 'Sort intervals, then merge in one pass.',
            complexity: 'Time: O(n log n), Space: O(n)',
            code: `function merge(intervals) {\n  intervals.sort((a,b) => a[0] - b[0]);\n  const result = [];\n  for (const interval of intervals) {\n    if (!result.length || result[result.length-1][1] < interval[0]) {\n      result.push(interval);\n    } else {\n      result[result.length-1][1] = Math.max(result[result.length-1][1], interval[1]);\n    }\n  }\n  return result;\n}`
          }
        },
        {
          id: 5,
          title: 'Find Missing Number',
          problem: 'Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing.',
          constraints: ['n == nums.length', '1 <= n <= 10^4', '0 <= nums[i] <= n'],
          inputFormat: 'First line: n\nSecond line: n space-separated integers',
          outputFormat: 'Missing number',
          sampleInput: '5\n3 0 1 4 6',
          sampleOutput: '5',
          explanation: 'n = 5, numbers should be 0-5. Missing is 5.',
          bruteForce: {
            approach: 'Sort the array and check for missing number.',
            complexity: 'Time: O(n log n), Space: O(1)',
            code: `function missingNumber(nums) {\n  nums.sort((a,b) => a-b);\n  for (let i = 0; i <= nums.length; i++) {\n    if (nums[i] !== i) return i;\n  }\n  return -1;\n}`
          },
          optimal: {
            approach: 'Use sum formula: sum of 0 to n = n*(n+1)/2. Subtract sum of array.',
            complexity: 'Time: O(n), Space: O(1)',
            code: `function missingNumber(nums) {\n  const n = nums.length;\n  const total = (n * (n + 1)) / 2;\n  const sum = nums.reduce((acc, num) => acc + num, 0);\n  return total - sum;\n}`
          }
        }
      ],
      'Hard': [
        {
          id: 6,
          title: 'Median of Two Sorted Arrays',
          problem: 'Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.',
          constraints: ['0 <= m, n <= 1000', '1 <= m + n <= 2000', '-10^6 <= nums1[i], nums2[i] <= 10^6'],
          inputFormat: 'First line: m n\nSecond line: m space-separated integers\nThird line: n space-separated integers',
          outputFormat: 'Median (double)',
          sampleInput: '2 2\n1 3\n2 4',
          sampleOutput: '2.5',
          explanation: 'The merged array is [1,2,3,4] and median is (2+3)/2 = 2.5.',
          bruteForce: {
            approach: 'Merge both arrays and find median.',
            complexity: 'Time: O(m+n), Space: O(m+n)',
            code: `function findMedianSortedArrays(nums1, nums2) {\n  const merged = [];\n  let i = 0, j = 0;\n  while (i < nums1.length && j < nums2.length) {\n    if (nums1[i] < nums2[j]) merged.push(nums1[i++]);\n    else merged.push(nums2[j++]);\n  }\n  while (i < nums1.length) merged.push(nums1[i++]);\n  while (j < nums2.length) merged.push(nums2[j++]);\n  const mid = Math.floor(merged.length / 2);\n  if (merged.length % 2 === 0) {\n    return (merged[mid-1] + merged[mid]) / 2;\n  }\n  return merged[mid];\n}`
          },
          optimal: {
            approach: 'Binary search on smaller array to find partition point.',
            complexity: 'Time: O(log(min(m,n))), Space: O(1)',
            code: `function findMedianSortedArrays(nums1, nums2) {\n  if (nums1.length > nums2.length) {\n    [nums1, nums2] = [nums2, nums1];\n  }\n  const m = nums1.length, n = nums2.length;\n  let left = 0, right = m;\n  while (left <= right) {\n    const partition1 = Math.floor((left + right) / 2);\n    const partition2 = Math.floor((m + n + 1) / 2) - partition1;\n    const maxLeft1 = partition1 === 0 ? -Infinity : nums1[partition1-1];\n    const minRight1 = partition1 === m ? Infinity : nums1[partition1];\n    const maxLeft2 = partition2 === 0 ? -Infinity : nums2[partition2-1];\n    const minRight2 = partition2 === n ? Infinity : nums2[partition2];\n    if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {\n      if ((m + n) % 2 === 0) {\n        return (Math.max(maxLeft1, maxLeft2) + Math.min(minRight1, minRight2)) / 2;\n      } else {\n        return Math.max(maxLeft1, maxLeft2);\n      }\n    } else if (maxLeft1 > minRight2) {\n      right = partition1 - 1;\n    } else {\n      left = partition1 + 1;\n    }\n  }\n  return -1;\n}`
          }
        }
      ]
    },
    'Strings': {
      'Easy': [
        {
          id: 7,
          title: 'Valid Parentheses',
          problem: 'Given a string s containing just the characters "(", ")", "{", "}", "[" and "]", determine if the input string is valid.',
          constraints: ['1 <= s.length <= 10^4'],
          inputFormat: 'String s',
          outputFormat: 'true or false',
          sampleInput: '()[]{}',
          sampleOutput: 'true',
          explanation: 'The string has matching pairs of parentheses.',
          bruteForce: {
            approach: 'Replace all pairs repeatedly until no more pairs.',
            complexity: 'Time: O(n²), Space: O(n)',
            code: `function isValid(s) {\n  let str = s;\n  while (str.includes('()') || str.includes('[]') || str.includes('{}')) {\n    str = str.replace('()', '').replace('[]', '').replace('{}', '');\n  }\n  return str.length === 0;\n}`
          },
          optimal: {
            approach: 'Use stack to track opening brackets, pop when matching closing bracket.',
            complexity: 'Time: O(n), Space: O(n)',
            code: `function isValid(s) {\n  const stack = [];\n  const map = { '(': ')', '{': '}', '[': ']' };\n  for (const char of s) {\n    if (map[char]) {\n      stack.push(char);\n    } else {\n      const top = stack.pop();\n      if (map[top] !== char) return false;\n    }\n  }\n  return stack.length === 0;\n}`
          }
        }
      ],
      'Medium': [
        {
          id: 8,
          title: 'Longest Palindromic Substring',
          problem: 'Given a string s, return the longest palindromic substring in s.',
          constraints: ['1 <= s.length <= 1000'],
          inputFormat: 'String s',
          outputFormat: 'Longest palindromic substring',
          sampleInput: 'babad',
          sampleOutput: 'bab',
          explanation: '"aba" is also a valid answer.',
          bruteForce: {
            approach: 'Check all substrings if they are palindrome.',
            complexity: 'Time: O(n³), Space: O(1)',
            code: `function longestPalindrome(s) {\n  let max = '';\n  for (let i = 0; i < s.length; i++) {\n    for (let j = i + 1; j <= s.length; j++) {\n      const sub = s.substring(i, j);\n      if (sub === sub.split('').reverse().join('') && sub.length > max.length) {\n        max = sub;\n      }\n    }\n  }\n  return max;\n}`
          },
          optimal: {
            approach: 'Expand from center for each character and between characters.',
            complexity: 'Time: O(n²), Space: O(1)',
            code: `function longestPalindrome(s) {\n  let start = 0, end = 0;\n  const expand = (left, right) => {\n    while (left >= 0 && right < s.length && s[left] === s[right]) {\n      left--;\n      right++;\n    }\n    return right - left - 1;\n  };\n  for (let i = 0; i < s.length; i++) {\n    const len1 = expand(i, i);\n    const len2 = expand(i, i+1);\n    const len = Math.max(len1, len2);\n    if (len > end - start) {\n      start = i - Math.floor((len-1)/2);\n      end = i + Math.floor(len/2);\n    }\n  }\n  return s.substring(start, end+1);\n}`
          }
        }
      ],
      'Hard': [
        {
          id: 9,
          title: 'Edit Distance',
          problem: 'Given two strings word1 and word2, return the minimum number of operations to convert word1 to word2.',
          constraints: ['0 <= word1.length, word2.length <= 500'],
          inputFormat: 'Two strings',
          outputFormat: 'Minimum operations',
          sampleInput: 'horse\nros',
          sampleOutput: '3',
          explanation: 'horse -> rorse (replace h with r)\nrorse -> rose (remove r)\nrose -> ros (remove e)',
          bruteForce: {
            approach: 'Recursive approach with all three operations.',
            complexity: 'Time: O(3^(m+n)), Space: O(m+n)',
            code: `function minDistance(word1, word2, i=0, j=0) {\n  if (i === word1.length) return word2.length - j;\n  if (j === word2.length) return word1.length - i;\n  if (word1[i] === word2[j]) return minDistance(word1, word2, i+1, j+1);\n  const insert = minDistance(word1, word2, i, j+1);\n  const deleteOp = minDistance(word1, word2, i+1, j);\n  const replace = minDistance(word1, word2, i+1, j+1);\n  return 1 + Math.min(insert, deleteOp, replace);\n}`
          },
          optimal: {
            approach: 'Dynamic Programming with 2D table.',
            complexity: 'Time: O(m*n), Space: O(m*n)',
            code: `function minDistance(word1, word2) {\n  const m = word1.length, n = word2.length;\n  const dp = Array(m+1).fill(null).map(() => Array(n+1).fill(0));\n  for (let i = 0; i <= m; i++) dp[i][0] = i;\n  for (let j = 0; j <= n; j++) dp[0][j] = j;\n  for (let i = 1; i <= m; i++) {\n    for (let j = 1; j <= n; j++) {\n      if (word1[i-1] === word2[j-1]) {\n        dp[i][j] = dp[i-1][j-1];\n      } else {\n        dp[i][j] = 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);\n      }\n    }\n  }\n  return dp[m][n];\n}`
          }
        }
      ]
    },
    'Linked List': {
      'Easy': [
        {
          id: 10,
          title: 'Reverse Linked List',
          problem: 'Given the head of a singly linked list, reverse the list and return the reversed list.',
          constraints: ['0 <= nodes <= 5000', '-5000 <= Node.val <= 5000'],
          inputFormat: 'Linked list nodes',
          outputFormat: 'Reversed linked list',
          sampleInput: '1->2->3->4->5',
          sampleOutput: '5->4->3->2->1',
          explanation: 'The linked list is reversed.',
          bruteForce: {
            approach: 'Store all values in array, then create new list in reverse order.',
            complexity: 'Time: O(n), Space: O(n)',
            code: `function reverseList(head) {\n  const values = [];\n  let curr = head;\n  while (curr) {\n    values.push(curr.val);\n    curr = curr.next;\n  }\n  const dummy = new ListNode(0);\n  curr = dummy;\n  for (let i = values.length - 1; i >= 0; i--) {\n    curr.next = new ListNode(values[i]);\n    curr = curr.next;\n  }\n  return dummy.next;\n}`
          },
          optimal: {
            approach: 'Iterative reversal using three pointers (prev, curr, next).',
            complexity: 'Time: O(n), Space: O(1)',
            code: `function reverseList(head) {\n  let prev = null;\n  let curr = head;\n  while (curr) {\n    const next = curr.next;\n    curr.next = prev;\n    prev = curr;\n    curr = next;\n  }\n  return prev;\n}`
          }
        }
      ]
    },
    'Dynamic Programming': {
      'Easy': [
        {
          id: 11,
          title: 'Climbing Stairs',
          problem: 'You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?',
          constraints: ['1 <= n <= 45'],
          inputFormat: 'n',
          outputFormat: 'Number of ways',
          sampleInput: '4',
          sampleOutput: '5',
          explanation: 'Ways: 1+1+1+1, 1+1+2, 1+2+1, 2+1+1, 2+2',
          bruteForce: {
            approach: 'Recursive approach: f(n) = f(n-1) + f(n-2).',
            complexity: 'Time: O(2^n), Space: O(n)',
            code: `function climbStairs(n) {\n  if (n <= 2) return n;\n  return climbStairs(n-1) + climbStairs(n-2);\n}`
          },
          optimal: {
            approach: 'DP with two variables tracking previous two results.',
            complexity: 'Time: O(n), Space: O(1)',
            code: `function climbStairs(n) {\n  if (n <= 2) return n;\n  let prev1 = 1, prev2 = 2;\n  for (let i = 3; i <= n; i++) {\n    const current = prev1 + prev2;\n    prev1 = prev2;\n    prev2 = current;\n  }\n  return prev2;\n}`
          }
        }
      ],
      'Medium': [
        {
          id: 12,
          title: 'Coin Change',
          problem: 'Given coins of different denominations and a total amount, return the fewest number of coins needed to make that amount.',
          constraints: ['1 <= coins.length <= 12', '1 <= coins[i] <= 2^31 - 1', '0 <= amount <= 10^4'],
          inputFormat: 'First line: n (number of coins)\nSecond line: n space-separated coins\nThird line: amount',
          outputFormat: 'Fewest number of coins',
          sampleInput: '3\n1 2 5\n11',
          sampleOutput: '3',
          explanation: '11 = 5 + 5 + 1',
          bruteForce: {
            approach: 'Recursive approach trying all coins.',
            complexity: 'Time: O(amount^n), Space: O(amount)',
            code: `function coinChange(coins, amount) {\n  if (amount === 0) return 0;\n  if (amount < 0) return -1;\n  let min = Infinity;\n  for (const coin of coins) {\n    const res = coinChange(coins, amount - coin);\n    if (res !== -1) min = Math.min(min, res + 1);\n  }\n  return min === Infinity ? -1 : min;\n}`
          },
          optimal: {
            approach: 'DP with tabulation (bottom-up).',
            complexity: 'Time: O(amount * n), Space: O(amount)',
            code: `function coinChange(coins, amount) {\n  const dp = Array(amount+1).fill(Infinity);\n  dp[0] = 0;\n  for (const coin of coins) {\n    for (let i = coin; i <= amount; i++) {\n      dp[i] = Math.min(dp[i], dp[i-coin] + 1);\n    }\n  }\n  return dp[amount] === Infinity ? -1 : dp[amount];\n}`
          }
        }
      ],
      'Hard': [
        {
          id: 13,
          title: 'Longest Increasing Subsequence',
          problem: 'Given an integer array nums, return the length of the longest strictly increasing subsequence.',
          constraints: ['1 <= nums.length <= 2500', '-10^4 <= nums[i] <= 10^4'],
          inputFormat: 'First line: n\nSecond line: n space-separated integers',
          outputFormat: 'Length of LIS',
          sampleInput: '8\n10 9 2 5 3 7 101 18',
          sampleOutput: '4',
          explanation: 'The LIS is [2,3,7,101]',
          bruteForce: {
            approach: 'Recursive approach trying all subsequences.',
            complexity: 'Time: O(2^n), Space: O(n)',
            code: `function lengthOfLIS(nums) {\n  let max = 0;\n  const dfs = (index, prev) => {\n    if (index === nums.length) return 0;\n    let include = 0;\n    if (nums[index] > prev) {\n      include = 1 + dfs(index+1, nums[index]);\n    }\n    const exclude = dfs(index+1, prev);\n    return Math.max(include, exclude);\n  };\n  return dfs(0, -Infinity);\n}`
          },
          optimal: {
            approach: 'DP with patience sorting (binary search).',
            complexity: 'Time: O(n log n), Space: O(n)',
            code: `function lengthOfLIS(nums) {\n  const tails = [];\n  for (const num of nums) {\n    let left = 0, right = tails.length;\n    while (left < right) {\n      const mid = Math.floor((left + right) / 2);\n      if (tails[mid] < num) left = mid + 1;\n      else right = mid;\n    }\n    if (left === tails.length) tails.push(num);\n    else tails[left] = num;\n  }\n  return tails.length;\n}`
          }
        }
      ]
    },
    'Trees': {
      'Easy': [
        {
          id: 14,
          title: 'Maximum Depth of Binary Tree',
          problem: 'Given the root of a binary tree, return its maximum depth.',
          constraints: ['0 <= nodes <= 10^4'],
          inputFormat: 'Tree in level order',
          outputFormat: 'Maximum depth',
          sampleInput: '[3,9,20,null,null,15,7]',
          sampleOutput: '3',
          explanation: 'The tree has 3 levels.',
          bruteForce: {
            approach: 'Level order traversal counting levels.',
            complexity: 'Time: O(n), Space: O(n)',
            code: `function maxDepth(root) {\n  if (!root) return 0;\n  const queue = [root];\n  let depth = 0;\n  while (queue.length) {\n    depth++;\n    const size = queue.length;\n    for (let i = 0; i < size; i++) {\n      const node = queue.shift();\n      if (node.left) queue.push(node.left);\n      if (node.right) queue.push(node.right);\n    }\n  }\n  return depth;\n}`
          },
          optimal: {
            approach: 'Recursive DFS: depth = 1 + max(leftDepth, rightDepth).',
            complexity: 'Time: O(n), Space: O(h) where h is height',
            code: `function maxDepth(root) {\n  if (!root) return 0;\n  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));\n}`
          }
        }
      ],
      'Medium': [
        {
          id: 15,
          title: 'Binary Tree Level Order Traversal',
          problem: 'Given the root of a binary tree, return the level order traversal of its nodes\' values.',
          constraints: ['0 <= nodes <= 2000'],
          inputFormat: 'Tree in level order',
          outputFormat: 'Level order traversal',
          sampleInput: '[3,9,20,null,null,15,7]',
          sampleOutput: '[[3],[9,20],[15,7]]',
          explanation: 'Traverse level by level.',
          bruteForce: {
            approach: 'Recursive with depth tracking.',
            complexity: 'Time: O(n), Space: O(n)',
            code: `function levelOrder(root) {\n  const result = [];\n  const traverse = (node, depth) => {\n    if (!node) return;\n    if (!result[depth]) result[depth] = [];\n    result[depth].push(node.val);\n    traverse(node.left, depth+1);\n    traverse(node.right, depth+1);\n  };\n  traverse(root, 0);\n  return result;\n}`
          },
          optimal: {
            approach: 'Iterative with queue (BFS).',
            complexity: 'Time: O(n), Space: O(n)',
            code: `function levelOrder(root) {\n  if (!root) return [];\n  const result = [];\n  const queue = [root];\n  while (queue.length) {\n    const level = [];\n    const size = queue.length;\n    for (let i = 0; i < size; i++) {\n      const node = queue.shift();\n      level.push(node.val);\n      if (node.left) queue.push(node.left);\n      if (node.right) queue.push(node.right);\n    }\n    result.push(level);\n  }\n  return result;\n}`
          }
        }
      ],
      'Hard': [
        {
          id: 16,
          title: 'Binary Tree Maximum Path Sum',
          problem: 'Given a binary tree, find the maximum path sum. The path may start and end at any node.',
          constraints: ['1 <= nodes <= 3*10^4', '-1000 <= Node.val <= 1000'],
          inputFormat: 'Tree in level order',
          outputFormat: 'Maximum path sum',
          sampleInput: '[1,2,3]',
          sampleOutput: '6',
          explanation: 'The path 2->1->3 sums to 6.',
          bruteForce: {
            approach: 'Check all paths using DFS from each node.',
            complexity: 'Time: O(n²), Space: O(n)',
            code: `function maxPathSum(root) {\n  let max = -Infinity;\n  const dfs = (node) => {\n    if (!node) return 0;\n    const left = dfs(node.left);\n    const right = dfs(node.right);\n    max = Math.max(max, left + right + node.val);\n    return Math.max(0, Math.max(left, right) + node.val);\n  };\n  dfs(root);\n  return max;\n}`
          },
          optimal: {
            approach: 'DFS with global maximum tracking.',
            complexity: 'Time: O(n), Space: O(h)',
            code: `function maxPathSum(root) {\n  let maxSum = -Infinity;\n  const dfs = (node) => {\n    if (!node) return 0;\n    const left = Math.max(0, dfs(node.left));\n    const right = Math.max(0, dfs(node.right));\n    maxSum = Math.max(maxSum, left + right + node.val);\n    return Math.max(left, right) + node.val;\n  };\n  dfs(root);\n  return maxSum;\n}`
          }
        }
      ]
    },
    'Graph': {
      'Medium': [
        {
          id: 17,
          title: 'Number of Islands',
          problem: 'Given a 2D grid map of "1"s (land) and "0"s (water), count the number of islands.',
          constraints: ['1 <= m, n <= 300'],
          inputFormat: 'First line: m n\nNext m lines: n characters',
          outputFormat: 'Number of islands',
          sampleInput: '4 5\n11110\n11010\n11000\n00000',
          sampleOutput: '1',
          explanation: 'There is one island connected together.',
          bruteForce: {
            approach: 'DFS from each land cell, mark visited.',
            complexity: 'Time: O(m*n), Space: O(m*n)',
            code: `function numIslands(grid) {\n  let count = 0;\n  const dfs = (i, j) => {\n    if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length || grid[i][j] === '0') return;\n    grid[i][j] = '0';\n    dfs(i-1, j); dfs(i+1, j); dfs(i, j-1); dfs(i, j+1);\n  };\n  for (let i = 0; i < grid.length; i++) {\n    for (let j = 0; j < grid[0].length; j++) {\n      if (grid[i][j] === '1') {\n        count++;\n        dfs(i, j);\n      }\n    }\n  }\n  return count;\n}`
          },
          optimal: {
            approach: 'Same as brute force (DFS is optimal for this problem).',
            complexity: 'Time: O(m*n), Space: O(m*n)',
            code: `function numIslands(grid) {\n  let count = 0;\n  const dfs = (i, j) => {\n    if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length || grid[i][j] === '0') return;\n    grid[i][j] = '0';\n    dfs(i-1, j); dfs(i+1, j); dfs(i, j-1); dfs(i, j+1);\n  };\n  for (let i = 0; i < grid.length; i++) {\n    for (let j = 0; j < grid[0].length; j++) {\n      if (grid[i][j] === '1') {\n        count++;\n        dfs(i, j);\n      }\n    }\n  }\n  return count;\n}`
          }
        }
      ]
    },
    'Sliding Window': {
      'Medium': [
        {
          id: 18,
          title: 'Longest Substring Without Repeating Characters',
          problem: 'Given a string s, find the length of the longest substring without repeating characters.',
          constraints: ['0 <= s.length <= 5*10^4'],
          inputFormat: 'String s',
          outputFormat: 'Length of longest substring',
          sampleInput: 'abcabcbb',
          sampleOutput: '3',
          explanation: 'Answer is "abc", with the length of 3.',
          bruteForce: {
            approach: 'Check all substrings for repeating characters.',
            complexity: 'Time: O(n³), Space: O(1)',
            code: `function lengthOfLongestSubstring(s) {\n  let max = 0;\n  for (let i = 0; i < s.length; i++) {\n    for (let j = i; j < s.length; j++) {\n      const sub = s.substring(i, j+1);\n      if (new Set(sub).size === sub.length) {\n        max = Math.max(max, sub.length);\n      }\n    }\n  }\n  return max;\n}`
          },
          optimal: {
            approach: 'Sliding window with two pointers and hash set.',
            complexity: 'Time: O(n), Space: O(min(n, m))',
            code: `function lengthOfLongestSubstring(s) {\n  const set = new Set();\n  let left = 0, max = 0;\n  for (let right = 0; right < s.length; right++) {\n    while (set.has(s[right])) {\n      set.delete(s[left]);\n      left++;\n    }\n    set.add(s[right]);\n    max = Math.max(max, right - left + 1);\n  }\n  return max;\n}`
          }
        }
      ]
    },
    'Binary Search': {
      'Easy': [
        {
          id: 19,
          title: 'Binary Search',
          problem: 'Given a sorted array of integers and a target, return the index of target if found, else -1.',
          constraints: ['1 <= n <= 10^4', 'nums is sorted'],
          inputFormat: 'First line: n\nSecond line: n space-separated integers\nThird line: target',
          outputFormat: 'Index of target',
          sampleInput: '6\n1 2 3 4 5 6\n4',
          sampleOutput: '3',
          explanation: 'Target 4 is at index 3.',
          bruteForce: {
            approach: 'Linear search through the array.',
            complexity: 'Time: O(n), Space: O(1)',
            code: `function binarySearch(nums, target) {\n  for (let i = 0; i < nums.length; i++) {\n    if (nums[i] === target) return i;\n  }\n  return -1;\n}`
          },
          optimal: {
            approach: 'Binary search with two pointers (left and right).',
            complexity: 'Time: O(log n), Space: O(1)',
            code: `function binarySearch(nums, target) {\n  let left = 0, right = nums.length - 1;\n  while (left <= right) {\n    const mid = Math.floor((left + right) / 2);\n    if (nums[mid] === target) return mid;\n    else if (nums[mid] < target) left = mid + 1;\n    else right = mid - 1;\n  }\n  return -1;\n}`
          }
        }
      ]
    }
  };

  const getQuestions = () => {
    return questionBank[selectedCategory]?.[selectedDifficulty] || [];
  };

  const defaultCodeTemplates = {
    cpp: `#include <iostream>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;
    cout << a + b << endl;
    return 0;
}`,
    java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int b = sc.nextInt();
        System.out.println(a + b);
    }
}`,
  };

  const [selectedLanguage, setSelectedLanguage] = useState('cpp');
  const [code, setCode] = useState(defaultCodeTemplates.cpp);
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState('');

  const handleQuestionSelect = (question) => {
    setSelectedQuestion(question);
    setShowSolution(false);
    setShowBruteForce(false);
  };

  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
    setCode(defaultCodeTemplates[lang]);
    setOutput('');
  };

  const runCode = async () => {
    setIsRunning(true);
    setOutput('Running...');

    try {
      const response = await fetch(`${API_BASE}/api/coding/run`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code,
          language: selectedLanguage,
          question_id: selectedQuestion?.id || 1,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || 'Execution failed');
      }

      const result = data.result;
      setOutput(
        result?.error
          ? `Error: ${result.error}`
          : result?.output || 'Program executed successfully with no output.'
      );
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const submitCode = async () => {
    try {
      setIsRunning(true);
      setOutput('Submitting solution...');

      const response = await fetch(`${API_BASE}/api/coding/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code,
          language: selectedLanguage,
          question_id: selectedQuestion?.id || 1,
          test_cases: [{ input: '1 2', expected: '3' }],
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || 'Submission failed');
      }

      setOutput(JSON.stringify(data, null, 2));
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const questions = getQuestions();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="text-white max-w-7xl mx-auto"
    >
      <div className="flex items-center gap-3 mb-2">
        <span className="text-3xl">💻</span>
        <h1 className="text-3xl font-bold text-white">Coding Bank</h1>
        <span className="text-xs bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full border border-orange-500/30">DSA Practice</span>
      </div>
      <p className="text-gray-400 mb-6">Practice coding problems with brute force and optimal solutions</p>

      <div className="mb-6 rounded-2xl border border-orange-500/30 bg-black/40 p-4 backdrop-blur-sm">
        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Live Coding Arena</h2>
            <p className="text-sm text-gray-400">Compile and test solutions in C++ or Java</p>
          </div>
          <div className="flex gap-2">
            {['cpp', 'java'].map((lang) => (
              <button
                key={lang}
                onClick={() => handleLanguageChange(lang)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  selectedLanguage === lang
                    ? 'bg-orange-500 text-slate-950'
                    : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
                }`}
              >
                {lang === 'cpp' ? 'C++' : 'Java'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-[1.5fr_0.8fr]">
          <div className="rounded-xl border border-slate-700 bg-slate-950/70 p-3">
            <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-slate-400">
              <span>Code Editor</span>
              <span>{selectedLanguage === 'cpp' ? 'main.cpp' : 'Main.java'}</span>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="h-72 w-full resize-none rounded-xl border border-slate-700 bg-slate-900 p-4 font-mono text-sm text-slate-100 outline-none ring-0 placeholder:text-slate-500"
              spellCheck={false}
            />
          </div>

          <div className="rounded-xl border border-slate-700 bg-slate-950/70 p-3">
            <div className="mb-2 text-xs uppercase tracking-[0.18em] text-slate-400">Console</div>
            <pre className="h-72 overflow-auto whitespace-pre-wrap rounded-xl border border-slate-700 bg-black/40 p-3 text-sm text-emerald-300">
              {output || 'Your output will appear here...'}
            </pre>
            <div className="mt-3 flex gap-2">
              <button
                onClick={runCode}
                disabled={isRunning}
                className="flex-1 rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-orange-400 disabled:opacity-60"
              >
                {isRunning ? 'Running...' : 'Run Code'}
              </button>
              <button
                onClick={submitCode}
                disabled={isRunning}
                className="flex-1 rounded-xl border border-slate-600 bg-slate-800 px-4 py-2 text-sm font-semibold text-white transition hover:border-orange-500 hover:text-orange-300 disabled:opacity-60"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Left Sidebar - Categories */}
        <div className="lg:col-span-1">
          <div className="bg-black/50 border border-orange-500/30 rounded-2xl p-4 backdrop-blur-sm">
            <h3 className="text-sm font-semibold text-gray-400 mb-3">📂 Categories</h3>
            <div className="space-y-1 max-h-[400px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-600">
              {categories.map((cat) => (
                <div
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setSelectedQuestion(null);
                    setShowSolution(false);
                    setShowBruteForce(false);
                  }}
                  className={`px-3 py-2 rounded-lg text-sm cursor-pointer transition-all ${
                    selectedCategory === cat 
                      ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' 
                      : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
                  }`}
                >
                  {cat}
                </div>
              ))}
            </div>

            {/* Difficulty Filter */}
            <div className="mt-4 pt-4 border-t border-gray-700">
              <h3 className="text-sm font-semibold text-gray-400 mb-2">📊 Difficulty</h3>
              <div className="flex gap-2">
                {difficulties.map((diff) => (
                  <button
                    key={diff}
                    onClick={() => {
                      setSelectedDifficulty(diff);
                      setSelectedQuestion(null);
                      setShowSolution(false);
                      setShowBruteForce(false);
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                      selectedDifficulty === diff 
                        ? diff === 'Easy' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                          diff === 'Medium' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                          'bg-red-500/20 text-red-400 border border-red-500/30'
                        : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50'
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Middle - Question List */}
        <div className="lg:col-span-1">
          <div className="bg-black/50 border border-orange-500/30 rounded-2xl p-4 backdrop-blur-sm">
            <h3 className="text-sm font-semibold text-gray-400 mb-3">
              Questions ({questions.length})
            </h3>
            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-600">
              {questions.length > 0 ? (
                questions.map((q) => (
                  <div
                    key={q.id}
                    onClick={() => handleQuestionSelect(q)}
                    className={`px-3 py-2 rounded-lg cursor-pointer transition-all ${
                      selectedQuestion?.id === q.id 
                        ? 'bg-orange-500/20 border border-orange-500/30' 
                        : 'hover:bg-gray-800/50'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-sm text-white">{q.title}</span>
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        selectedDifficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                        selectedDifficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {selectedDifficulty}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm text-center py-4">No questions available</p>
              )}
            </div>
          </div>
        </div>

        {/* Right - Question Details */}
        <div className="lg:col-span-2">
          {selectedQuestion ? (
            <div className="bg-black/50 border border-orange-500/30 rounded-2xl backdrop-blur-sm overflow-hidden">
              {/* Question Header */}
              <div className="p-4 border-b border-orange-500/20">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-white">{selectedQuestion.title}</h3>
                    <p className="text-sm text-gray-400 mt-1">{selectedQuestion.problem}</p>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full ${
                    selectedDifficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                    selectedDifficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {selectedDifficulty}
                  </span>
                </div>

                {/* Constraints & Input/Output */}
                <div className="grid grid-cols-2 gap-4 mt-3 text-xs">
                  <div>
                    <span className="text-gray-500">Constraints:</span>
                    <ul className="text-gray-400 mt-1 list-disc list-inside">
                      {selectedQuestion.constraints.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="text-gray-500">Sample Input:</div>
                    <pre className="text-gray-400 bg-black/30 p-2 rounded mt-1 text-xs">{selectedQuestion.sampleInput}</pre>
                    <div className="text-gray-500 mt-1">Sample Output:</div>
                    <pre className="text-gray-400 bg-black/30 p-2 rounded mt-1 text-xs">{selectedQuestion.sampleOutput}</pre>
                    <div className="text-gray-500 mt-1">Explanation:</div>
                    <p className="text-gray-400 text-xs mt-1">{selectedQuestion.explanation}</p>
                  </div>
                </div>
              </div>

              {/* Solutions */}
              <div className="p-4">
                <div className="flex gap-2 mb-3">
                  <button
                    onClick={() => {
                      setShowBruteForce(!showBruteForce);
                      if (showSolution) setShowSolution(false);
                    }}
                    className={`px-4 py-1 rounded-lg text-sm font-medium transition-all ${
                      showBruteForce 
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                        : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50'
                    }`}
                  >
                    🐌 Brute Force
                  </button>
                  <button
                    onClick={() => {
                      setShowSolution(!showSolution);
                      if (showBruteForce) setShowBruteForce(false);
                    }}
                    className={`px-4 py-1 rounded-lg text-sm font-medium transition-all ${
                      showSolution 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                        : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50'
                    }`}
                  >
                    ⚡ Optimal
                  </button>
                </div>

                {/* Brute Force Solution */}
                {showBruteForce && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-3"
                  >
                    <div className="bg-red-500/5 border border-red-500/30 rounded-lg p-3">
                      <h4 className="text-red-400 text-sm font-semibold mb-1">📝 Approach</h4>
                      <p className="text-gray-300 text-sm">{selectedQuestion.bruteForce.approach}</p>
                    </div>
                    <div className="bg-red-500/5 border border-red-500/30 rounded-lg p-3">
                      <h4 className="text-red-400 text-sm font-semibold mb-1">⏱️ Complexity</h4>
                      <p className="text-gray-300 text-sm">{selectedQuestion.bruteForce.complexity}</p>
                    </div>
                    <div className="bg-red-500/5 border border-red-500/30 rounded-lg p-3">
                      <h4 className="text-red-400 text-sm font-semibold mb-1">💻 Code</h4>
                      <pre className="text-gray-300 text-xs whitespace-pre-wrap bg-black/30 p-3 rounded">{selectedQuestion.bruteForce.code}</pre>
                    </div>
                  </motion.div>
                )}

                {/* Optimal Solution */}
                {showSolution && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-3"
                  >
                    <div className="bg-green-500/5 border border-green-500/30 rounded-lg p-3">
                      <h4 className="text-green-400 text-sm font-semibold mb-1">📝 Approach</h4>
                      <p className="text-gray-300 text-sm">{selectedQuestion.optimal.approach}</p>
                    </div>
                    <div className="bg-green-500/5 border border-green-500/30 rounded-lg p-3">
                      <h4 className="text-green-400 text-sm font-semibold mb-1">⏱️ Complexity</h4>
                      <p className="text-gray-300 text-sm">{selectedQuestion.optimal.complexity}</p>
                    </div>
                    <div className="bg-green-500/5 border border-green-500/30 rounded-lg p-3">
                      <h4 className="text-green-400 text-sm font-semibold mb-1">💻 Code</h4>
                      <pre className="text-gray-300 text-xs whitespace-pre-wrap bg-black/30 p-3 rounded">{selectedQuestion.optimal.code}</pre>
                    </div>
                  </motion.div>
                )}

                {!showBruteForce && !showSolution && (
                  <div className="text-center text-gray-500 text-sm py-8">
                    Click <span className="text-red-400">🐌 Brute Force</span> or <span className="text-green-400">⚡ Optimal</span> to view solutions
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-black/50 border border-orange-500/30 rounded-2xl p-12 backdrop-blur-sm text-center">
              <div className="text-6xl mb-4">💻</div>
              <h3 className="text-xl font-bold text-white mb-2">Select a Question</h3>
              <p className="text-gray-400">Choose a category, difficulty, and question to view solutions</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CodingPage;