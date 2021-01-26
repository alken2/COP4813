function performStatistics() {
  var inputArray = (document.getElementById("userinput").value).split(" ").map(Number);
  inputArray.sort(function(a, b){return a - b});
  document.getElementById("sum").value = calcSum(inputArray).toFixed(2);
  document.getElementById("min").value = findMin(inputArray).toFixed(2);
  document.getElementById("max").value = findMax(inputArray).toFixed(2);
  document.getElementById("median").value = calcMedian(inputArray).toFixed(2);
  document.getElementById("mode").value = calcMode(inputArray);
  document.getElementById("mean").value = calcMean(inputArray).toFixed(2);
  document.getElementById("stdev").value = calcStdDev(inputArray).toFixed(2);
  document.getElementById("variance").value = calcVariance(inputArray).toFixed(2);
  return false;
}

function calcSum(array) {
  var result = 0;
  for (var x of array) {
    result += x;
  }
  return result;
}

function findMin(array) {
  return array[0];
}

function findMax(array) {
  return array[array.length - 1];
}

function calcMedian(array) {
  if (array.length % 2 == 0) {
    var result = (array[Math.floor((array.length / 2) - 1)] + array[Math.floor(array.length / 2)]) / 2;
    return result;
  }
  else {
    return array[Math.floor(array.length / 2)];
  }
}

function calcMode(array) {
  if (array.length == 1) {
    return array[0];
  }
  var result = [];
  var temp1 = array[0];
  var temp2 = 1;
  var temp3 = 1;
  for (var i = 1; i < array.length; i++) {
    if (temp1 != array[i]) {
      temp1 = array[i];
      temp2 = 1;
    }
    else {
      temp2++;
    }
    if (temp2 == temp3) {
      result.push(temp1);
    }
    if (temp2 > temp3) {
      result = [temp1];
      temp3 = temp2;
    }
  }
  if (temp3 == 1) {
    return array.join(" ");
  }
  else {
    return result.join(" ");
  }
}

function calcMean(array) {
  return calcSum(array) / array.length;
}

function calcStdDev(array) {
  return Math.sqrt(calcVariance(array));
}

function calcVariance(array) {
  var result = 0;
  var temp1 = 0;
  var temp2 = calcMean(array);
  for (var x of array) {
    temp1 = x - temp2;
    result += Math.pow(temp1, 2);
  }
  result /= array.length;
  return result;
}

