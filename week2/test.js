
const jsrange = document.getElementById("js-range"); //바를 움직였을 때 정해지는 수
const printForm = document.getElementById("js-guess"); //form의 id이다. 
const display = document.getElementById("js-result"); //결과창에 보여주는 곳
const title = document.getElementsByClassName("js-title"); //나중에 숫자 변하는 것에 따라 바꿔주려고 
const usersnum = document.getElementById("usernum"); //사용자가 입력하는 수

const handlePrint = (e) => {
e.preventDefault();

const ln = jsrange.value //바가 움직였을 때 나타내는 수
const em = usersnum.value //사용자가 입력한 숫자
var random2 = Math.floor(Math.random() * ln); //컴퓨터가 랜덤한 수를 생성

const diplaySpan2 = display.querySelector("span");


if(random2 > em)
{

diplaySpan2.innerHTML = `
You choose: ${em} , the machine choose : ${random2}.<br>
<b>You lost!`;
}
else if(random2 < em)
{
    diplaySpan2.innerHTML = `
    You choose: ${em} , the machine choose : ${random2}.<br>
    <b>You win!`;
}
else{
    diplaySpan2.innerHTML = `
    You choose: ${em} , the machine choose : ${random2}.<br>
    <b>No one win!!`;
}
};

printForm.addEventListener("click", handlePrint); //함수 실행 