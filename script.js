const cellElement = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const winMsgTxtElemnt = document.querySelector('[data-win-msg-txt]');
const winMsg = document.querySelector('[data-win]');
const ResetButton = document.querySelector('[data-win-msg-btn]');

let isOturn = false;

const winCombinations = [
//horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
//vertical
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
//diagonal
    [0, 4, 8],
    [2, 4, 6]


]

const startGame = () =>{
    for(const cell of cellElement){
        cell.classList.remove('o');
        cell.classList.remove('x');
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true});
        setBoardHoverClass();
    }

    winMsg.classList.remove('showWinMsg'); 
}

const endGame = (isDraw) =>{
    if(isDraw) {
        winMsgTxtElemnt.innerText = 'Deu velha 😕';
    }else{
        winMsgTxtElemnt.innerText = isOturn ? 'Circulo Venceu!' : 'X Venceu!'
    }

    winMsg.classList.add("showWinMsg")
}

const checkForWin = (currentTurn) =>{

    return winCombinations.some((combination) => {
        return combination.every(index =>{
            return cellElement[index].classList.contains(currentTurn);
        });
    });

};

const checkForDraw = () =>{
    return [... cellElement].every((cell)=> {
       return cell.classList.contains('x') || cell.classList.contains('o');
    })
}

const setBoardHoverClass = () =>{
    board.classList.remove('o');
    board.classList.remove('x');

    if(isOturn){
        board.classList.add('o');
    }else{
        board.classList.add('x');
    }
}

const placeMark = (cell, classToAdd) =>{
    cell.classList.add(classToAdd);
}
const swapTurn = () =>{
    isOturn = !isOturn;

    setBoardHoverClass();
};

const handleClick = (e) => {
     // put the mark (x or O)
    const cell = e.target;
   // const classToAdd = isOturn ? "o" : "x";
    if(isOturn == true){
        classToAdd = "o";
    }else{
        classToAdd = "x";
    };

    placeMark(cell, classToAdd);
     //check victory
    const isWin = checkForWin(classToAdd);
    //check draw
    const isDraw = checkForDraw();
    if(isWin){
        endGame(false);
    }else if(isDraw){
        endGame(true);
    }else{
    //mudar simbolo
    swapTurn();
    }

};
startGame();
ResetButton.addEventListener('click', startGame);
