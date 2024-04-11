class HardMeters{
    constructor(){
        this.games = 0;
        this.tb = 0;
        this.tw = 0;

        //bonus wins , nobonus wins
        this.bw = 0;
        this.nw = 0;

        this.bg = 0;
        this.eg = 0;

        this.max_win = 0;

        this.games_el = document.getElementById("hm_games");
        this.tb_el = document.getElementById("hm_tb");
        this.tw_el = document.getElementById("hm_tw");
        this.bg_el = document.getElementById("hm_bonus_games");
        this.rtp_el = document.getElementById("hm_rtp");
        this.bonus_rtp_el = document.getElementById("hm_bonuses");
        this.nobonus_rtp_el = document.getElementById("hm_no_bonuses");
        this.bf_el = document.getElementById("hm_frequency");
        this.eg_el = document.getElementById("hm_empty");
        this.max_win_el = document.getElementById("hm_max_win");
    }

    update(){
        const rtp = this.tb != 0 ? this.tw / this.tb : 0;
        const bonus_rtp = this.tb != 0 ? this.bw / this.tb : 0;
        const nobonus_rtp = this.tb != 0 ? this.nw / this.tb : 0;

        const bg_frequency = this.bg != 0 ? (this.games / this.bg).toFixed(2) : 0.00;
        
        this.games_el.innerHTML = `Games Played: ${this.games}`;
        this.tb_el.innerHTML = `Total Bet: ${this.tb}`;
        this.tw_el.innerHTML = `Total Win: ${this.tw.toFixed(2)}`;
        this.bg_el.innerHTML = `Bonus Games: ${this.bg}`;
        this.rtp_el.innerHTML = `RTP: ${(rtp * 100).toFixed(2)} %`;
        this.bonus_rtp_el.innerHTML = `Bonus Games RTP: ${(bonus_rtp * 100).toFixed(2)}`;
        this.nobonus_rtp_el.innerHTML = `No Bonus Games RTP: ${(nobonus_rtp * 100).toFixed(2)}`;
        this.bf_el.innerHTML = `Bonus Games Frequency: 1 on every ${bg_frequency}`;
        this.eg_el.innerHTML = `Empty Games: ${(this.eg / this.games * 100).toFixed(2)} %`;
        this.max_win_el.innerHTML = `Max Win: ${this.max_win}`;
    }
}