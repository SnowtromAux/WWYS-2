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

    respinForGifts(){
        this.output = useCoef(REEL_RESPIN_ODDS , REEL_RESPIN_SYMBOLS);
        this.box.innerHTML = `${this.output}`;
    }
}