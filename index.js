const $moveForwardButton = document.getElementById("move-forward-button");
const $turnRightButton = document.getElementById("turn-right-button");
let $avatar;
const BOARD = {
    HEIGHT: 10,
    WIDTH: 10,
};

const boardBoxes = [];
let avatarPosition = 0;
let avatarRotation = 0;

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
    const step = getStepFromRotation(avatarRotation);
    const newPosition = avatarPosition + step;
    if (shouldAvatarMove(step, newPosition)) {
        moveAvatar(newPosition);
    } else {
        handleTurnRight();
    }
}

function shouldAvatarMove(step, newPosition) {
    if (newPosition > BOARD.WIDTH * BOARD.HEIGHT || newPosition < 0) {
        return false;
    }

    const currentRow = Math.floor(avatarPosition / BOARD.WIDTH);
    const newRow = Math.floor(newPosition / BOARD.WIDTH);

    if (Math.abs(step) === 1 && currentRow !== newRow) {
        return false;
    }

    return true;
}

function handleTurnRight() {
    let currentRotation = avatarRotation + 90;
    avatarRotation = currentRotation === 360 ? 0 : currentRotation;
    $avatar.style["transform"] = `rotate(${avatarRotation}deg)`;
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

//helpers
function getStepFromRotation(rotation) {
    switch (rotation) {
        case 0: {
            return 1;
        }
        case 90: {
            return BOARD.WIDTH;
        }
        case 180: {
            return -1;
        }
        case 270: {
            return -BOARD.WIDTH;
        }
    }
}
