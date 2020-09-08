
class BingoCard { // BingoCard Class follows Class syntax
	constructor() {
		this.matrix = []; // matrix property
	}
	generateMatrix(){
		var rowArr = [];
		for(var i = 1; i <= 5; i++){
			for(var j = 1; j <= 5; j++){
				rowPush(j, rowArr) // calls recursive method to push unique numbers in bingo card
			}
		}
		var newRowArr = [];
		while(rowArr.length) newRowArr.push(rowArr.splice(0,5)); // will split single array into multiple array
		this.matrix = newRowArr;
	}
	drawCard() { // method will return HTML codes of the card passing the array data in matrix property
		var count = 1;
		for(var i = 0; i < 5; i++){
			var columnDiv = document.getElementsByClassName("column " + (i + 1));
			for(var j = 0; j < 5; j++){
				columnDiv[0].innerHTML += "<div class='number col-" + count + "'><span class='span_val'>" + this.matrix[j][i] + "</span></div>";
				count ++;
			}
		}
	}
}
// helper method to generate numbers between 1 - 75 depending on Bingo letters
function makeNum(j) {
	var num;
	if (j == 1) num = Math.floor((Math.random()) * (15 - 1)) + 1; // Letter B numbers
	if (j == 2) num = Math.floor((Math.random()) * (30 - 16)) + 16; // Letter I numbers
	if (j == 3) num = Math.floor((Math.random()) * (45 - 31)) + 31; // Letter N numbers
	if (j == 4) num = Math.floor((Math.random()) * (60 - 46)) + 46; // Letter G numbers
	if (j == 5) num = Math.floor((Math.random()) * (75 - 61)) + 61; // Letter O numbers
	return num;
} 
// helper method that pushes unique numbers between 1 - 75 once in multidimensional array
function rowPush(idx, rowArr) {
	var num = makeNum(idx);
	if(rowArr.indexOf(num) === -1){
		rowArr.push(num);
	}else{
		rowPush(idx, rowArr);
	}
}

class BallDraw { // BallDraw Class follows Class syntax
	constructor() {
		this.ballDrawns = [];
	}
	drawBall() {
		var arr = this.ballDrawns;
		var randomNum = Math.floor(Math.random() * 75) + 1; // generates random number between 1 - 75
		if(arr.indexOf(randomNum) === -1){
			arr.push(randomNum);
			console.info("ball", this.ballDrawns);
			this.markCard(randomNum);
		}else{
			ballDraw.drawBall();
		}
	}
	markCard(numberParam) { // method that applies color-mark css in HTML
	var count = 1;
		for(var i = 0; i < 5; i++){
			var columnDiv = document.getElementsByClassName("column " + (i + 1));
			for(var j = 0; j < 5; j++){
				var colNum = columnDiv[0].getElementsByClassName("col-" + count);
				if(typeof colNum[0] !== 'undefined'){
					var spanVal = colNum[0].getElementsByClassName("span_val")[0].innerHTML;
					if(spanVal == numberParam){
						console.log("match");
						colNum[0].classList.add("mark-color");
					}
				}
				count ++;
			}
		}
	}
}

var bingoCard;
var ballDraw;

function drawCardBtn() { // Draw Card button function
	clearCard();
	bingoCard = new BingoCard(); // creates new BingoCard class and assigns to bingoCard variable
	bingoCard.generateMatrix();
	bingoCard.drawCard();
	ballDraw = new BallDraw(); // creates new BallDraw class and assigns to ballDraw variable
}

function drawBallBtn() { // Draw Ball button function
	if(typeof ballDraw !== 'undefined'){ //will check if ballDraw object is not undefined and invokes drawBall method
		ballDraw.drawBall();
	}
}

function clearBtn() { // Clear button function
	clearCard();
}

function clearCard() { // helper method to clear BallDraw object and HTML
	if(typeof ballDraw !== 'undefined'){
		ballDraw = undefined;
	}
	
	var count = 1;
	for(var i = 0; i < 5; i++){
		var columnDiv = document.getElementsByClassName("column " + (i + 1));
		for(var j = 0; j < 5; j++){
			columnDiv[0].innerHTML = "";
			count ++;
		}
	}
}

