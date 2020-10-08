const $moveForwardButton = document.getElementById("move-forward-button");
const $turnRightButton = document.getElementById("turn-right-button");
let $avatar;
const BOARD = {
    HEIGHT: 10,
    WIDTH: 10,
};

let boardBoxes = [];
let avatarPosition = 0;
let avatarDirection = Vector2.right;

(function init() {
    initBoard();
    initAvatar();
})();

function initAvatar() {
    $avatar = document.createElement("div");
    $avatar.className = "avatar";
    $avatar.textContent = "👉";
    boardBoxes[avatarPosition].appendChild($avatar);
}

$moveForwardButton.addEventListener("click", handleMoveForward);
$turnRightButton.addEventListener("click", handleTurnRight);

function handleMoveForward() {
    const { x, y } = avatarDirection;
    //-y - because y axis is upside down
    const newPosition = avatarPosition - y * BOARD.WIDTH + x;

    if (shouldAvatarMove(newPosition)) {
        moveAvatar(newPosition);
    } else {
        handleTurnRight();
    }
}

function shouldAvatarMove(newPosition) {
    if (newPosition >= BOARD.WIDTH * BOARD.HEIGHT || newPosition < 0) {
        return false;
    }

    const currentRow = Math.floor(avatarPosition / BOARD.WIDTH);
    const newRow = Math.floor(newPosition / BOARD.WIDTH);

    if (avatarDirection.x !== 0 && currentRow !== newRow) {
        return false;
    }

    return true;
}

function handleTurnRight() {
    const { x, y } = avatarDirection;
    avatarDirection.x = y;
    avatarDirection.y = -x;

    const _currentRotation =
        -Math.atan2(avatarDirection.y, avatarDirection.x) * (180 / Math.PI);

    $avatar.style["transform"] = `rotate(${_currentRotation}deg)`;
}

function moveAvatar(newPosition) {
    boardBoxes[avatarPosition].removeChild($avatar);
    avatarPosition = newPosition;
    boardBoxes[avatarPosition].appendChild($avatar);
}

function initBoard() {
    const $board = document.getElementById("board");
    const $boardBox = createBoardBox();
    for (let i = 0; i < BOARD.HEIGHT * BOARD.WIDTH; i++) {
        $clonedBoard = $boardBox.cloneNode();
        boardBoxes.push($clonedBoard);
        $board.appendChild($clonedBoard);
    }

    $board.style["grid-template-columns"] = `repeat(${BOARD.WIDTH}, 1fr )`;
}

function createBoardBox() {
    $boardBox = document.createElement("div");
    $boardBox.className = "board-box";
    return $boardBox;
}