var mode = "integer_mode";  //整数値
var is_calc = false;  //=で未計算

function clickbutton_clear(target) {   //クリアボタン（AC）押下
  let result = document.getElementById("result");
  let target_value = target.innerHTML;
  
  if(target_value == "AC") {
    result.innerHTML = "0";
    mode = "integer_mode";
  }
}

function clickbutton_equal(target) {   //イコールボタン（=）押下
  let result = document.getElementById("result");
  let target_value = target.innerHTML;

  if(is_ope_last()) result.innerHTML = result.innerHTML.slice(0,-1);
  
  if(target_value == "=")  {
    result.innerHTML = eval(result.innerHTML);
    is_calc = true;  // =で計算済
  } 
}
  

function clickbutton_num(target) {   //数字ボタン押下
  let result = document.getElementById("result");
  let target_value = target.innerHTML;
  

  if(target_value == "." && mode == "integer_mode" && is_calc == false) {
    result.innerHTML = result.innerHTML + target_value;
    mode = "decimal_mode";  // 小数値
  }
  
  if(mode == "decimal_mode" && target_value == ".") return; 

  if(result.innerHTML.slice(-1) == "." && (target_value == ".")) {
    result.innerHTML = result.innerHTML.slice(0,-1) + ".";
  }
  
  if(result.innerHTML == "0" && target_value == "0") {
    result.innerHTML = "0";
    is_calc = false;
  } else if(result.innerHTML == "0" && target_value == ".") {
    result.innerHTML = "0.";
    is_calc = false;
  } else if(result.innerHTML == "0." && target_value == "."){
    result.innerHTML = "0.";
    is_calc = false;
  } else if(result.innerHTML == "0" && target_value == "00") {
    result.innerHTML = "0";
    is_calc = false;
  } else if(result.innerHTML == "0") {
    result.innerHTML = target_value;
  } else if(is_calc == true && target_value == "00") {
    is_calc = false;
    result.innerHTML = "0"; 
  }else if(is_calc == true && target_value == ".") {
    is_calc = false;
    mode = "decimal_mode";
    result.innerHTML = "0.";
  } else if(is_calc == true) {
    is_calc = false;
    result.innerHTML = target_value;
  }
  else {
    result.innerHTML += target_value;
  }
}

function clickbutton_ope(target) {   //演算子ボタン押下
  let result = document.getElementById("result");
  let target_value = target.innerHTML;

  if(is_calc) is_calc = false;
  
  if(target_value) mode = "integer_mode";
  
  if(result.innerHTML.slice(-1) == "." && (target_value == "+" || target_value == "-" || target_value == "*" || target_value == "/")) 
    return;

  if(result.innerHTML == "0" && (target_value == "+" || target_value == "-" || target_value == "*" || target_value == "/")) 
    return;

  if(is_ope_last()) {
    result.innerHTML = result.innerHTML.slice(0,-1) + target_value;
  }  
  else {
    result.innerHTML += target_value;
    let mode = "integer_mode";
  }
}

function is_ope_last() {   //計算式の最後の文字が演算子かどうか
  let result = document.getElementById("result");
  return ["+","-","*","/"].includes(result.innerHTML.toString().slice(-1));
}