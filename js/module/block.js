class Block{
    constructor(p, t){
        this.patten = p;
        this.type = t;
    }
    rotate(){
        for (let y = 0; y < this.patten.length; ++y) {
            for (let x = 0; x < y; ++x) {
                [
                    this.patten[x][y],
                    this.patten[y][x],
                ] = [
                    this.patten[y][x],
                    this.patten[x][y],
                ];
            }
        }
        this.patten.forEach(row => row.reverse());
        //console.log(this.patten);
    }
}