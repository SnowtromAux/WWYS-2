class Reel{
    constructor(odds , reel_box , symbols){
        this.odds = odds;
        this.box = reel_box;
        this.symbols = symbols;
    }

    spin(){
        this.output = useCoef(this.odds , this.symbols);
        this.box.innerHTML = `${this.output}`;
    }
}