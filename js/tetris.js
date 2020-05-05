const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');



const board = new Board(12, 24);
const pieces = 'TJLOSZI';
const color = [
    null,
    '#0074D9',
    '#39CCCC',
    '#3D9970',
    '#2ECC40',
    '#FF851B',
    '#85144b',
    '#001f3f',
]

//ToDo: Game Over
// draw a grid board
function initializePlayer(){
    const tempBlock = createBlock(pieces[pieces.length * Math.random() | 0]);
    player.pos =  {x:4, y:0};    

    player.block = new Block(tempBlock);
    if (board.collide(player)){
        board.forEach(row => row.fill(0));
    }
    //console.log(player.block.patten);
    //console.log(player.pos);
    //console.log('chuang jian cheng gong');
}

const block = createBlock('L');

function createBlock(blockType){
    switch(blockType){
        case 'T':
            return [
                [0, 7, 0],
                [7, 7, 7],
                [0, 0, 0]
            ];
        case 'S':
            return [
                [0, 6, 6],
                [6, 6, 0],
                [0, 0, 0],
            ];
        case 'Z':
            return [
                [5, 5, 0],
                [0, 5, 5],
                [0, 0, 0],
            ];
        case 'I':
            return [
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0],
            ];
        case 'L':
            return [
                [0, 2, 0],
                [0, 2, 0],
                [0, 2, 2],
            ];
        case 'J':
            return [
                [0, 3, 0],
                [0, 3, 0],
                [3, 3, 0],
            ];
        case 'O':
            return [
                [4, 4],
                [4, 4],
            ];
    }

}

const player = {
	pos: {x:3, y:0},
	block: new Block(block)
}

function drawBlocks(block, offset){
    for (i = 0; i < block.length; i++) {
        for (j = 0; j < block[i].length; j++) {
            if (block[i][j] !== 0){
                context.fillStyle = 'white';
                context.fillRect(j + offset.x, i + offset.y, 1, 1);
                
                context.fillStyle = color[block[i][j]];
                context.fillRect(j + offset.x + 0.05, i + offset.y+ 0.05, 0.9, 0.9);
            }
        }
    }
}

function drawBoard(block, offset){
    for (i = 4; i < block.length; i++) {
        for (j = 0; j < block[i].length; j++) {
            if (block[i][j] !== 0){
                context.fillStyle = 'white';
                context.fillRect(j + offset.x, i + offset.y, 1, 1);
                
                context.fillStyle = color[block[i][j]];
                context.fillRect(j + offset.x + 0.05, i + offset.y+ 0.05, 0.9, 0.9);
            }
        }
    }
}

context.scale(20, 20);

function draw(){
    //old:
    context.fillStyle = '#AAAAAA';
    context.fillRect(0, 0, canvas.width, canvas.height);


        
    drawBlocks(player.block.patten, player.pos);
    drawBoard(board.matrix, {x:0, y:0})
}

var interval = 1000;
var lastTimeStamp = 0;
var dropCounter = 0;

function update(time = 0){
    const deltaTime = time - lastTimeStamp;
    
    dropCounter += deltaTime;
    if (dropCounter > interval){
        playerDrop();
    }
    lastTimeStamp = time;
    draw();
    //player.pos.y += (movingSpeed * lastTimeStamp);
    requestAnimationFrame(update);
}

function playerRotate(player){
    //regular situation:
    var b = player.block;
    var p = player.pos;
    const pInitial = p.x;
    b.rotate();
    //console.log(player.pos);
    var offset = 1;
    while (board.collide(player)) {
        player.pos.x += offset;
        offset = -(offset + (offset > 0 ? 1 : -1));
        if (offset > b.patten[0].length) {
            b.rotate();
            player.pos.x = pInitial;
            return;
        }
    }
}

function playerMoveRight(){
    player.pos.x++;
    if (board.collide(player))
        player.pos.x--;
}

function playerMoveLeft(){
    player.pos.x--;
    if (board.collide(player))
        player.pos.x++;
}

function playerDrop(){
    player.pos.y++;
    if (board.collide(player)){
        player.pos.y --;
        board.merge(player);
        //console.log('-------------------------');

        board.checkSweep();
        initializePlayer();
        player.pos.y = 0;
    }
    dropCounter = 0;
}

document.addEventListener('keydown', event => {
    if(event.keyCode == 37){
        playerMoveLeft();
    }else if(event.keyCode == 39){
        playerMoveRight();
    }else if(event.keyCode == 40){
        playerDrop();
    }else if(event.keyCode == 32){
        playerRotate(player); 
    }
});

initializePlayer();
update();









