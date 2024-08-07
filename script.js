
let canStart = false;
let corssClicked = false;
//  On click of start button take details of the players
document.getElementById('start').addEventListener('click', function () {
    if (canStart) {
        document.getElementById('start').disabled = true;
    } else if (corssClicked) {
        document.getElementById('start').disabled = false;
        isTwoPlayer = true;
        canStart = false;
        isWinner = false;
        startFromStart = true;
        level = 1;
        var IntroDiv = document.getElementById('IntroUser');
        IntroDiv.style.display = 'block';
        var btn = document.getElementById('Options');
        btn.style.display = 'block';
        var changeMode = document.getElementById('singleMode');
        changeMode.style.display = 'none';
        var changeMode = document.getElementById('doubleMode');
        changeMode.style.display = 'none';
    } else {
        var IntroDiv = document.getElementById('IntroUser');
        IntroDiv.style.display = 'block';
    }
});
// To take input info of 1 player
document.getElementById('singlePlayer').addEventListener('click', function () {
    var btn = document.getElementById('Options');
    btn.style.display = 'none';
    var changeMode = document.getElementById('singleMode');
    changeMode.style.display = 'block';
});
// To take input info of 2 players
document.getElementById('twoPlayer').addEventListener('click', function () {
    var btn = document.getElementById('Options');
    btn.style.display = 'none';
    var changeMode = document.getElementById('doubleMode');
    changeMode.style.display = 'block';
});

// Sign Selection for play with computer mode
document.getElementById('symbol1').addEventListener('click', function () {
    var nameBox = document.getElementById('nameBox1');
    nameBox.style.display = 'none';
    var selectSymbolBtn = document.getElementById('symbol1');
    selectSymbolBtn.style.display = 'none';
    var selectSymbolBtn = document.getElementById('Selectsign1');
    selectSymbolBtn.style.display = 'block';
    var startBtn = document.getElementById('startbtn1');
    startBtn.style.display = 'block';

});

// Sign Selection for play with Friend mode
document.getElementById('symbol2').addEventListener('click', function () {
    var nameBox = document.getElementById('nameBox2');
    nameBox.style.display = 'none';
    var selectSymbolBtn = document.getElementById('symbol2');
    selectSymbolBtn.style.display = 'none';
    var selectSymbolBtn = document.getElementById('Selectsign2');
    selectSymbolBtn.style.display = 'block';
    var startBtn = document.getElementById('startbtn2');
    startBtn.style.display = 'block';

});

// COMMON VARIABLES USED IN THE GAME

let player1 = 'Player 1';//PLAYER1 NAME
let player2 = 'Player 2';//PLAYER2 NAME
let p1s;//PLAYER1 SIGN
let p2s;//PLAYER2 SIGN
let isTwoPlayer = true;
let emptyArr = [];
let isWinner = false;
let startFromStart = true;
let level = 1;//TO MAINTIN COUNT OF LEVEL

// PLAYWITH COMPUTER SIGN ASSIGNMENT
function playWithComp() {
    isTwoPlayer = false;

    var userIntro = document.getElementById('IntroUser');
    userIntro.style.display = 'none';

    var name = document.getElementById('p1_nameC').value;

    //ASSIGINING NAMES
    player1 = name;
    player2 = 'computer';

    // setRounds(player1 , player2);

    //ASSIGINING SIGNS
    var radi = document.getElementsByName('singleMarker');
    for (i in radi) {
        if (radi[i].checked) {
            p1s = radi[i].value;
            break;
        }
    }

    if (p1s != 'X') {
        p2s = 'X';
    } else {
        p2s = 'O';
    }

    //STARTING THE GAME LOGIC 
    canStart = true;
    document.getElementById('start').disabled = true;

    setRounds();
    gameLogic();
}

//Play with Computer --- single player Mode logic :
let board = {
    btn1: '',
    btn2: '',
    btn3: '',
    btn4: '',
    btn5: '',
    btn6: '',
    btn7: '',
    btn8: '',
    btn9: '',
}
a = 0;
let signTemp = 1;

// MAIN LOGIC OF GAME
function gameLogic(element) {
    if (canStart) {
        //PLAY WITH FRIENDS
        if (element.innerText == "") {
            if (isTwoPlayer) {
                //Player1
                if (!isWinner) {
                    if (signTemp == 1) {
                        signTemp = 2;
                        element.innerText = p1s;
                        board[element.id] = p1s;
                        isWinner = checkWin();
                        if (isWinner) {
                            setTimeout(() => {
                                canStart = false;
                                isWinner = updateRounds(p1s);
                                signTemp = 1;
                            }, 1000);
                        }

                        //NO ONE WINS -- TO CHECK TIE
                        findEmpty();
                        if (emptyArr.length == 0) {
                            signTemp = 1;
                            reset();
                        } else {
                            emptyArr.splice(0, emptyArr.length);
                        }

                    } else {
                        signTemp = 1;
                        element.innerText = p2s;
                        board[element.id] = p2s;
                        isWinner = checkWin();

                        if (isWinner) {
                            setTimeout(() => {
                                canStart = false;
                                isWinner = updateRounds(p2s);
                            }, 1000);
                        }
                    }
                }
            }
            else {
                //player1

                if (!isWinner && signTemp == 1) {
                    startFromStart = true;
                    signTemp = 2;
                    element.innerText = p1s;
                    boardid = element.id;
                    board[element.id] = p1s;
                    isWinner = checkWin();
                    if (isWinner) {
                        console.log('c');
                        setTimeout(() => {
                            canStart = false;
                            startFromStart = false;
                            signTemp = 1
                            isWinner = updateRounds(p1s);
                            console.log('d');
                        }, 1000);

                    } else {
                        console.log('e');
                        //NO ONE WINS -- TO CHECK TIE
                        findEmpty();
                        if (emptyArr.length == 0) {
                            startFromStart = false;
                            reset();
                        } else {
                            emptyArr.splice(0, emptyArr.length);
                        }
                    }
                }
                setTimeout(() => {
                    if (!isWinner && startFromStart && signTemp == 2) {
                        signTemp = 1;
                        findEmpty();
                        let compSign = emptyArr[Math.floor(Math.random() * emptyArr.length)];
                        isTrue = impConditions();
                        if (isTrue != false) {
                            compSign = isTrue;
                        }
                        board[compSign] = p2s;
                        document.getElementById(compSign).innerText = p2s;
                        canStart = true;
                        isWinner = checkWin();
                        if (isWinner) {
                            setTimeout(() => {
                                canStart = false;
                                isWinner = updateRounds(p2s);
                            }, 1000);

                        }
                        emptyArr.splice(0, emptyArr.length);
                    }
                }, 1000);

            }
        }
    } else {
        console.log('Game not started yet');
    }
}

function findEmpty() {
    if (board.btn1 == '') {
        emptyArr.push("btn1");
    } if (board.btn2 == '') {
        emptyArr.push("btn2");
    } if (board.btn3 == '') {
        emptyArr.push("btn3");
    } if (board.btn4 == '') {
        emptyArr.push("btn4");
    } if (board.btn5 == '') {
        emptyArr.push("btn5");
    } if (board.btn6 == '') {
        emptyArr.push("btn6");
    } if (board.btn7 == '') {
        emptyArr.push("btn7");
    } if (board.btn8 == '') {
        emptyArr.push("btn8");
    } if (board.btn9 == '') {
        emptyArr.push("btn9");
    }
}

// PLAY WITH FRDS SIGN ASSIGNMENT
function playWithFriend() {
    isTwoPlayer = true;

    var userIntro = document.getElementById('IntroUser');
    userIntro.style.display = 'none';

    var name1 = document.getElementById('p1_nameF').value;
    var name2 = document.getElementById('p2_nameF').value;
    //ASSIGINING NAMES
    player1 = name1;
    player2 = name2;

    //ASSIGINING SIGNS
    var radi = document.getElementsByName('doubleMarker');
    for (i in radi) {
        if (radi[i].checked) {
            p1s = radi[i].value;
            break;
        }
    }

    if (p1s != 'X') {
        p2s = 'X';
    } else {
        p2s = 'O';
    }
    //STARTING THE GAME LOGIC 
    canStart = true;
    document.getElementById('start').disabled = true;

    setRounds();
    gameLogic();
}

//DETECTING THE WINNER
function checkWin() {
    var a1 = document.getElementById('btn1').innerText;
    var a2 = document.getElementById('btn2').innerText;
    var a3 = document.getElementById('btn3').innerText;
    var a4 = document.getElementById('btn4').innerText;
    var a5 = document.getElementById('btn5').innerText;
    var a6 = document.getElementById('btn6').innerText;
    var a7 = document.getElementById('btn7').innerText;
    var a8 = document.getElementById('btn8').innerText;
    var a9 = document.getElementById('btn9').innerText;

    if (a1 == a2 && a2 == a3 && a1 != "") {
        //change bg of winner div
        document.getElementById('btn1').style.backgroundColor = 'rgb(234, 176, 172)';
        document.getElementById('btn2').style.backgroundColor = 'rgb(234, 176, 172)';
        document.getElementById('btn3').style.backgroundColor = 'rgb(234, 176, 172)';

        if (a1 == p1s) {
            return true;
        } else {
            return true;
        }
    } else if (a1 == a4 && a4 == a7 && a1 != "") {

        //change bg of winner div
        document.getElementById('btn1').style.backgroundColor = 'rgb(234, 176, 172)';
        document.getElementById('btn4').style.backgroundColor = 'rgb(234, 176, 172)';
        document.getElementById('btn7').style.backgroundColor = 'rgb(234, 176, 172)';

        if (a1 == p1s) {
            return true;
        } else {
            return true;
        }

    } else if (a1 == a5 && a5 == a9 && a1 != "") {
        //change bg of winner div
        document.getElementById('btn1').style.backgroundColor = 'rgb(234, 176, 172)';
        document.getElementById('btn5').style.backgroundColor = 'rgb(234, 176, 172)';
        document.getElementById('btn9').style.backgroundColor = 'rgb(234, 176, 172)';

        if (a1 == p1s) {
            return true;
        } else {
            return true;
        }

    } else if (a4 == a5 && a5 == a6 && a4 != "") {

        //change bg of winner div
        document.getElementById('btn4').style.backgroundColor = 'rgb(234, 176, 172)';
        document.getElementById('btn5').style.backgroundColor = 'rgb(234, 176, 172)';
        document.getElementById('btn6').style.backgroundColor = 'rgb(234, 176, 172)';

        if (a4 == p1s) {
            return true;
        } else {
            return true;
        }

    } else if (a7 == a8 && a8 == a9 && a7 != "") {

        //change bg of winner div
        document.getElementById('btn7').style.backgroundColor = 'rgb(234, 176, 172)';
        document.getElementById('btn8').style.backgroundColor = 'rgb(234, 176, 172)';
        document.getElementById('btn9').style.backgroundColor = 'rgb(234, 176, 172)';

        if (a7 == p1s) {
            return true;
        } else {
            return true;
        }

    } else if (a3 == a5 && a5 == a7 && a3 != "") {

        //change bg of winner div
        document.getElementById('btn3').style.backgroundColor = 'rgb(234, 176, 172)';
        document.getElementById('btn5').style.backgroundColor = 'rgb(234, 176, 172)';
        document.getElementById('btn7').style.backgroundColor = 'rgb(234, 176, 172)';

        if (a3 == p1s) {
            return true;
        } else {
            return true;
        }

    } else if (a2 == a5 && a5 == a8 && a2 != "") {

        //change bg of winner div
        document.getElementById('btn2').style.backgroundColor = 'rgb(234, 176, 172)';
        document.getElementById('btn5').style.backgroundColor = 'rgb(234, 176, 172)';
        document.getElementById('btn8').style.backgroundColor = 'rgb(234, 176, 172)';


        if (a2 == p1s) {
            return true;
        } else {
            return true;
        }

    } else if (a3 == a6 && a6 == a9 && a3 != "") {

        //change bg of winner div
        document.getElementById('btn3').style.backgroundColor = 'rgb(234, 176, 172)';
        document.getElementById('btn6').style.backgroundColor = 'rgb(234, 176, 172)';
        document.getElementById('btn9').style.backgroundColor = 'rgb(234, 176, 172)';

        if (a3 == p1s) {
            return true;
        } else {
            return true;
        }

    } else {
        return false;
    }
}

// INSTRUCTIONS FOR COMPUTER
function impConditions() {
    if ((board.btn3 === board.btn2 && board.btn2 !== "" && board.btn1 == "") || (board.btn5 === board.btn9 && board.btn5 !== "" && board.btn1 == "") || (board.btn4 === board.btn7 && board.btn4 !== "" && board.btn1 == "")) {
        return "btn1";
    } else if ((board.btn3 === board.btn1 && board.btn1 !== "" && board.btn2 == "") || (board.btn5 === board.btn8 && board.btn5 !== "" && board.btn2 == "")) {
        return "btn2";
    } else if ((board.btn1 === board.btn2 && board.btn2 !== "" && board.btn3 == "") || (board.btn5 === board.btn7 && board.btn5 !== "" && board.btn3 == "") || (board.btn6 === board.btn9 && board.btn9 !== "" && board.btn3 == "")) {
        return "btn3";
    } else if ((board.btn1 === board.btn7 && board.btn1 !== "" && board.btn4 == "") || (board.btn5 === board.btn6 && board.btn5 !== "" && board.btn4 == "")) {
        return "btn4";
    } else if ((board.btn1 === board.btn9 && board.btn1 !== "" && board.btn5 == "") || (board.btn2 === board.btn8 && board.btn2 !== "" && board.btn5 == "") || (board.btn3 === board.btn7 && board.btn3 !== "" && board.btn5 == "") || (board.btn4 === board.btn6 && board.btn4 !== "" && board.btn5 == "")) {
        return "btn5";
    } else if ((board.btn3 === board.btn9 && board.btn9 !== "" && board.btn6 == "") || (board.btn5 === board.btn4 && board.btn5 !== "" && board.btn6 === "")) {
        return "btn6";
    } else if ((board.btn3 === board.btn5 && board.btn3 !== "" && board.btn7 == "") || (board.btn8 === board.btn9 && board.btn8 !== "" && board.btn7 == "") || (board.btn4 === board.btn1 && board.btn4 !== "" && board.btn7 == "")) {
        return "btn7";
    } else if ((board.btn7 === board.btn9 && board.btn7 !== "" && board.btn8 == "") || (board.btn5 === board.btn2 && board.btn5 !== "" && board.btn8 == "")) {
        return "btn8";

    } else if ((board.btn7 === board.btn8 && board.btn7 !== "" && board.btn9 == "") || (board.btn5 === board.btn1 && board.btn5 !== "" && board.btn9 == "") || (board.btn3 === board.btn6 && board.btn3 !== "" && board.btn9 == "")) {
        return "btn9";
    } else {
        return false;
    }
}

//TOTAL ROUNDS IN THE GAME
totalRounds = [
    {
        Round: 1,
        player1: 0,
        player2: 0
    },
    {
        Round: 2,
        player1: 0,
        player2: 0
    },
    {
        Round: 3,
        player1: 0,
        player2: 0
    }
];

//ROUNDS MANAGEMENT IN THE VIEWROUNDS BTN
function setRounds() {
    var rounds = document.getElementById('Round_numbers');
    str = '';
    let total1 = 0;
    let total2 = 0;
    for (i in totalRounds) {
        total1 += totalRounds[i].player1;
        total2 += totalRounds[i].player2;
    }
    for (i = 1; i <= level; i++) {
        str += "<div class=newRoundsUpdate> Round " + i + "<br>" + player1 + ":" + totalRounds[i - 1].player1 + "points <br>" + player2 + ":" + totalRounds[i - 1].player2 + "points<br>" + "</div>";
    }
    str += "<div id='TotalScoreInRounds'>" + "<span style:'margin-right:2px'>" + player1 + ":" + total1 + "</span>" + "<span margin-right:2px>" + player2 + ":" + total2 + "</span>" + "</div>"
    rounds.innerHTML = str;
    return;
}

//LOGIC TO UPDATE SCORES
function updateRounds(sign) {
    //change boxes to default color
    for (let i = 1; i <= 9; i++) {
        document.getElementById('btn' + i).style.backgroundColor = 'rgba(179, 170, 170, 0.5)';
    }



    // console.log(sign);
    if (sign == p1s) {

        totalRounds[level - 1].player1++;

    } else {
        totalRounds[level - 1].player2++;
    }
    if (level == 3) {
        setRounds();
        declareResults();
    } else {

        document.getElementById('btn1').innerText = '';
        document.getElementById('btn2').innerText = '';
        document.getElementById('btn3').innerText = '';
        document.getElementById('btn4').innerText = '';
        document.getElementById('btn5').innerText = '';
        document.getElementById('btn6').innerText = '';
        document.getElementById('btn7').innerText = '';
        document.getElementById('btn8').innerText = '';
        document.getElementById('btn9').innerText = '';

        board.btn1 = '';
        board.btn2 = '';
        board.btn3 = '';
        board.btn4 = '';
        board.btn5 = '';
        board.btn6 = '';
        board.btn7 = '';
        board.btn8 = '';
        board.btn9 = '';

        level++;
        setRounds();
        isWinner = false;

        var roundBox = document.getElementById('rounds_declare');
        roundBox.style.display = 'block';
        a = 'ROUND' + level;
        roundBox.innerText = a;

        function delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        async function hideRoundBox() {
            await delay(2000);
            canStart = true;
            roundBox.style.display = 'none';

        }

        hideRoundBox();

        return false;
    }
}

//RESULT DECLARATION
function declareResults() {
    total1 = 0;
    total2 = 0;
    for (i in totalRounds) {
        total1 += totalRounds[i].player1;
        total2 += totalRounds[i].player2;
    }


    if (total1 > total2) {
        var winnerModal = new bootstrap.Modal(document.getElementById('winner'));
        winnerModal.show();
        var text = document.getElementById('winner_text');
        let str = '';
        str += 'Yeyy!! ' + player1 + '<br>wins<br>the game';
        text.innerHTML = str;
    } else {
        var winnerModal = new bootstrap.Modal(document.getElementById('winner'));
        winnerModal.show();
        var text = document.getElementById('winner_text');
        let str = '';
        str += 'Yeyy!! ' + player2 + '<br>wins<br>the game'
        text.innerHTML = str;
    }

    document.getElementById('btn1').innerText = '';
    document.getElementById('btn2').innerText = '';
    document.getElementById('btn3').innerText = '';
    document.getElementById('btn4').innerText = '';
    document.getElementById('btn5').innerText = '';
    document.getElementById('btn6').innerText = '';
    document.getElementById('btn7').innerText = '';
    document.getElementById('btn8').innerText = '';
    document.getElementById('btn9').innerText = '';

    board.btn1 = '';
    board.btn2 = '';
    board.btn3 = '';
    board.btn4 = '';
    board.btn5 = '';
    board.btn6 = '';
    board.btn7 = '';
    board.btn8 = '';
    board.btn9 = '';
}

//LOGIC FOR RESET BUTTON AND TIE
function reset() {
    document.getElementById('btn1').innerText = "";
    document.getElementById('btn2').innerText = "";
    document.getElementById('btn3').innerText = "";
    document.getElementById('btn4').innerText = "";
    document.getElementById('btn5').innerText = "";
    document.getElementById('btn6').innerText = "";
    document.getElementById('btn7').innerText = '';
    document.getElementById('btn8').innerText = '';
    document.getElementById('btn9').innerText = '';

    board.btn1 = '';
    board.btn2 = '';
    board.btn3 = '';
    board.btn4 = '';
    board.btn5 = '';
    board.btn6 = '';
    board.btn7 = '';
    board.btn8 = '';
    board.btn9 = '';

    signTemp = 1;
    return;
}
function playAgain() {
    var a = document.getElementById('winner');
    a.style.display = 'none';
    //making scoreboard=0;
    for (i = 0; i < totalRounds.length; i++) {
        totalRounds[i].player1 = 0;
        totalRounds[i].player2 = 0;
    }
    level = 1;
    var rounds = document.getElementById('Round_numbers');
    rounds.innerHTML = '';
    canStart = true;
    setRounds();
    reset();
}

function winnerClose() {
    var winnerDiv = document.getElementById('winner');
    winnerDiv.style.display = 'none';
    corssClicked = true;
    document.getElementById('start').disabled = false;
}

