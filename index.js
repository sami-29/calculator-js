var current_operation = "";

const add_to_operation = (char) => {
  if (current_operation === "") {
    current_operation += char;
  } else if (/[0-9]|\./.test(current_operation[current_operation.length - 1])) {
    if (/[0-9]|\./.test(char)) {
      current_operation += char;
    } else {
      current_operation += " " + char;
    }
  } else {
    current_operation += " " + char;
  }
};

const remove_from_operation = () => {
  if (current_operation.length > 0) {
    // remove last char that is not a space
    if (/[0-9]|./.test(current_operation[current_operation.length - 1])) {
      current_operation = current_operation.slice(
        0,
        current_operation.length - 1
      );
    }
    // remove last space
    else {
      current_operation = current_operation.slice(
        0,
        current_operation.length - 2
      );
    }
  }
};

const result = (operation) => {
  operation = operation.split(" ");
  console.log(operation);
  if (operation[0] === "-") {
    operation.shift();
    operation[0] = "-" + operation[0];
    if (operation.length === 1) {
      return operation[0];
    }
  }
  if (operation[0] === "+") {
    operation.shift();
    if (operation.length === 1) {
      return operation[0];
    }
  }
  let result;
  let i = 1;
  while (operation.length > 1 && i < operation.length - 1) {
    if (operation[i] === "^") {
      result = Math.pow(operation[i - 1], operation[i + 1]);
      console.log(result);
      operation.splice(i - 1, 3, result);
    } else {
      i = i + 2;
    }
  }
  i = 1;
  while (operation.length > 1 && i < operation.length - 1) {
    if (operation[i] === "x" || operation[i] === "/") {
      result =
        operation[i] === "x"
          ? parseFloat(operation[i - 1]) * parseFloat(operation[i + 1])
          : parseFloat(operation[i - 1]) / parseFloat(operation[i + 1]);
      console.log(result);
      operation.splice(i - 1, 3, result);
    } else {
      i = i + 2;
    }
  }
  i = 1;
  while (operation.length > 1 && i < operation.length - 1) {
    if (operation[i] === "+" || operation[i] === "-") {
      result =
        operation[i] === "+"
          ? parseFloat(operation[i - 1]) + parseFloat(operation[i + 1])
          : parseFloat(operation[i - 1]) - parseFloat(operation[i + 1]);
      console.log(result);
      operation.splice(i - 1, 3, result);

      console.log(operation);
    } else {
      i = i + 2;
    }
  }
  return operation[0];
};

/* while (operations_ordered.length > 1) {
    let first_number = parseFloat(operations_ordered.shift());
    let operator = operations_ordered.shift();
    let second_number = parseFloat(operations_ordered.shift());
    console.log(first_number, operator, second_number);
    switch (operator) {
      case "+":
        result = first_number + second_number;
        result = Math.round(result * 100) / 100;
        break;
      case "-":
        result = first_number - second_number;
        result = Math.round(result * 100) / 100;
        break;
      case "x":
        result = first_number * second_number;
        result = Math.round(result * 100) / 100;
        break;
      case "/":
        if (second_number === 0) {
          result = "Error";
          break;
        }
        result = first_number / second_number;
        result = Math.round(result * 100) / 100;
        break;
      case "^":
        result = Math.pow(first_number, second_number);
        result = Math.round(result * 100) / 100;
        break;

      default:
        result = "Error";
        break;
    }

    operations_ordered.unshift(result);
  }
*/

$("#numbers,#operations")
  .children()
  .on("click", (e) => {
    if (e.target.innerHTML === "=") {
      if (current_operation.includes(" ")) {
        $("#input").html(result(current_operation));
        current_operation = result(current_operation).toString();
      } else {
        $("#input").html(current_operation);
      }
    } else {
      $("#input").append(e.target.innerHTML);
      add_to_operation(e.target.innerHTML);
      console.log(current_operation);
    }
  });

$("#ac-clear").on("click", (e) => {
  if (e.target.innerHTML === "AC") {
    $("#input").html("");
    current_operation = "";
  }
  if (e.target.innerHTML === "DEL") {
    var temp = $("#input").html();
    $("#input").html(`${temp.substring(0, temp.length - 1)}`);
    remove_from_operation();
  }
});
