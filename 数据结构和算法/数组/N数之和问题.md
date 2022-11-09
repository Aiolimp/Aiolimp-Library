# N数之和问题
非常常见的问题，基本上都是一个套路，主要考虑如何比暴利法降低时间复杂度，而且也会用到上面的双指针技巧
## 两数之和.1

### 题目

给定一个整数数组 `nums` 和一个目标值 `target`，请你在该数组中找出和为目标值的那两个整数，并返回他们的数组下标。

你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。

示例:

```js
给定 nums = [2, 7, 11, 15], target = 9

因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1]
```

### 思路

使用一个`map`将遍历过的数字存起来，值作为`key`，下标作为值。

对于每一次遍历：

- 取`map`中查找是否有`key`为`target-nums[i]`的值
- 如果取到了，则条件成立，返回。
- 如果没有取到，将当前值作为`key`，下标作为值存入`map`

时间复杂度：`O(n)`

空间复杂度`O(n)`

### 代码

```js
	var twoSum = function (nums, target) {
        const map = {};
        if (Array.isArray(nums)) {
            for (let i = 0; i < nums.length; i++) {
                if (map[target - nums[i]] != undefined) {
                    return [map[target - nums[i]], i];
                } else {
                    map[nums[i]] = i;
                }
            }
        }
        return [];
    };

    var twoSum = function (nums, target) {
        const map = new Map();
        for (let i = 0; i < nums.length; i++) {
            const complement = target - nums[i];
            if (map.has(complement)) {
                return [map.get(complement), i]
            } else {
                map.set(nums[i], i)
            }
        }
    }
```

## 两数之和.15

题目

给定一个包含 `n` 个整数的数组`nums`，判断 `nums` 中是否存在三个元素`a，b，c` ，使得 `a + b + c = 0 ？`找出所有满足条件且不重复的三元组。

注意：答案中不可以包含重复的三元组。

```js
例如, 给定数组 nums = [-1, 0, 1, 2, -1, -4]，

满足要求的三元组集合为：
[
  [-1, 0, 1],
  [-1, -1, 2]
]
```

### 思路

题目中说明可能会出现多组结果，所以我们要考虑好去重

- 1.为了方便去重，我们首先将数组排序
- 2.对数组进行遍历，取当前遍历的数`nums[i]`为一个基准数，遍历数后面的数组为寻找数组
- 3.在寻找数组中设定两个起点，最左侧的`left`(`i+1`)和最右侧的`right`(`length-1`)
- 4.判断`nums[i] + nums[left] + nums[right]`是否等于0，如果等于0，加入结果，并分别将`left`和`right`移动一位
- 5.如果结果大于0，将`right`向左移动一位，向结果逼近
- 5.如果结果小于0，将`left`向右移动一位，向结果逼近

注意整个过程中要考虑去重

代码

```js
    var threeSum = function (nums) {
      const result = [];
      nums.sort((a, b) => a - b);
      for (let i = 0; i < nums.length; i++) {
        // 跳过重复数字
        if (i && nums[i] === nums[i - 1]) { continue; }
        let left = i + 1;
        let right = nums.length - 1;
        while (left < right) {
          const sum = nums[i] + nums[left] + nums[right];
          if (sum > 0) {
            right--;
          } else if (sum < 0) {
            left++;
          } else {
            result.push([nums[i], nums[left++], nums[right--]]);
            // 跳过重复数字
            while (nums[left] === nums[left - 1]) {
              left++;
            }
            // 跳过重复数字
            while (nums[right] === nums[right + 1]) {
              right--;
            }
          }
        }
      }
      return result;
    }
```

## 四数之和.18

### 题目

给定一个包含 `n` 个整数的数组`nums`，判断 `nums` 中是否存在四个元素`a，b，c，d` ，使得 `a + b + c + d = 0 ？`找出所有满足条件且不重复的四元组。

注意：答案中不可以包含重复的四元组。

```js
给定数组 nums = [1, 0, -1, 0, -2, 2]，和 target = 0。

满足要求的四元组集合为：
[
  [-1,  0, 0, 1],
  [-2, -1, 1, 2],
  [-2,  0, 0, 2]
]
```



### 思路

你已经经历了两数之和、三数之和，玩玩没想到，还有四数之和...

其实，后面还有五数之和，六数之和...

到这里其实我们就能发现一些规律，我们可以像[三数之和 (opens new window)](https://github.com/ConardLi/awesome-coding-js/blob/master/数据结构分类/数组/三数之和.md)那样，我们可以通过大小指针来逼近结果，从而达到降低一层时间复杂度的效果。

不管是几数之和，我们都用这种方法来进行优化。

### 代码

```js
var fourSum = function (nums, target) {
    if (nums.length < 4) {
        return [];
    }
    nums.sort((a, b) => a - b);
    const result = [];
    for (let i = 0; i < nums.length - 3; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) {
            continue;
        }
        if (nums[i] + nums[i + 1] + nums[i + 2] + nums[i + 3] > target) {
            break;
        }
        for (let j = i + 1; j < nums.length - 2; j++) {
            if (j > i + 1 && nums[j] === nums[j - 1]) {
                continue;
            }
            let left = j + 1,
                right = nums.length - 1;
            while (left < right) {
                const sum = nums[i] + nums[j] + nums[left] + nums[right];
                if (sum === target) {
                    result.push([nums[i], nums[j], nums[left], nums[right]]);
                }
                if (sum <= target) {
                    while (nums[left] === nums[++left]);
                } else {
                    while (nums[right] === nums[--right]);
                }
            }
        }
    }
    return result;
};
```