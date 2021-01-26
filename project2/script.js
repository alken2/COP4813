function testLength(value, length) {
  if (value.length == length) {
    return true;
  }
  else {
    return false;
  }
}

function testNumber(value) {
  if (!isNaN(value)) {
    return true;
  }
  else {
    return false;
  }
}

function validateControl(control, name, length) {
  if (!testLength(control.value, length)) {
    console.log("Error! Invalid number of digits entered for " + name + ".");
    window.alert("Error! Invalid number of digits entered for " + name + ".");
    return false;
  }
  else if (!testNumber(control.value)) {
    console.log("Error! Input for " + name + " is not a number.");
    window.alert("Error! Input for " + name + " is not a number.");
    return false;
  }
  else {
    return true;  
  }
}

function validateCreditCard(value) {
  value = value.replace(/ /g,'');
  if (!testNumber(value)) {
    console.log("Error! Input for card number is not a number.");
    window.alert("Error! Input for card number is not a number.");
    return false;
  }
  else if (!value.match(/^3/) && !value.match(/^6/) && !value.match(/^5/) && !value.match(/^4/)) {
    console.log("Error! Invalid card number.");
    window.alert("Error! Invalid card number.");
    return false;
  }
  else if ((value.match(/^3/) && !testLength(value, 15)) || (!value.match(/^3/) && !testLength(value, 16))) {
    console.log("Error! Invalid card number length.");
    window.alert("Error! Invalid card number length.");
    return false;
  }
  else {
    return true;
  }
}

function validateDate(value) {
  var temp = value.split("-");
  var exp = new Date(temp[0], temp[1], 0, 0, 0, 0, 0);
  var today = new Date();
  if (exp.valueOf() <= today.valueOf()) {
    console.log("Error! Invalid expiration date.");
    window.alert("Error! Invalid expiration date.");
    return false;
  }
  else {
    return true;
  }
}

function validateEmail(value) {
  if (!value.match(/^\w+@\w+\.\w+$/)) {
    console.log("Error! Invalid email.");
    window.alert("Error! Invalid email.");
    return false;
  }
  else {
    return true;
  }
}

function validateForm() {
  if (validateControl(document.getElementById("cvv"), "CVV2/CVC", 3) && validateControl(document.getElementById("zip"), "zip", 5) && validateCreditCard(document.getElementById("cardnum").value) && validateDate(document.getElementById("exp").value) && validateEmail(document.getElementById("email").value) && validateState(document.getElementById("state").selectedIndex)) {
    console.log("Payment submitted.");
    window.alert("Payment submitted.");
  }
  return false;
}

function validateState(value) {
  if (value == 0) {
    console.log("Error! No state selected.");
    window.alert("Error! No state selected.");
    return false;
  }
  else {
    return true;
  }
}