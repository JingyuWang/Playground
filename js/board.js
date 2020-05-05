class Board{
    constructor(w, h){
        const matrix = [h];
        for (var i=0;i<h;i++) {
            matrix[i] = new Array(w).fill(0);
        }
        this.matrix = matrix;
    }

    merge(player){
        player.block.patten.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0 ){
                    this.matrix[y + player.pos.y][x + player.pos.x] = value;
                }
            })
        });
    }

    checkSweep(){
        outer: for( var y = this.matrix.length-1; y>=0; y--){
            for(var x = 0; x<this.matrix[y].length; x++){
                if (this.matrix[y][x]===0){
                    continue outer;
                }
            }
            const row = this.matrix.splice(y, 1)[0].fill(0);
            this.matrix.unshift(row);
            y++;
        }
    }


    collide(player){
        for( var y = 0; y<player.block.patten.length; y++){
            for( var x = 0; x< player.block.patten[y].length; x++){
                if (player.block.patten[y][x] !==0 &&
                    (this.matrix[y + player.pos.y] &&
                    this.matrix[y + player.pos.y][x + player.pos.x]) !==0){
                        return true;
                        console.log("true");
                    }
            }
        }
        //console.log("not yet");
        return false;
    }


}