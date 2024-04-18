let reels = [];
let player , bot;
let respin_state = 0;
let prev_progress = {};
let autoplay = false;
const hm = new HardMeters();
const series = new Series();

Setup();


function Setup(){
    const reel_boxes = document.getElementsByClassName('reel')

    bot = new Bot();

    player = new Player(BALANCE , BETS[0]);

    player.setup();

    reels.push(new Reel(REEL_1_ODDS , reel_boxes[0] , REEL1_SYMBOLS));
    reels.push(new Reel(REEL_2_ODDS , reel_boxes[1] , REEL2_SYMBOLS));
    reels.push(new Reel(REEL_3_ODDS , reel_boxes[2] , REEL3_SYMBOLS));
}

function Spin(spinner){
    if(autoplay && spinner == "player")return;
    if(player.balance < player.bet)return;
        
    let gifts_num = 0;

    if(respin_state == 0){
        if(autoplay){
            bot.gamesLeft--;
            bot.has_to_stop = false;
        }

        player.balance -= player.bet;
        player.updateBalance();

        document.getElementById("win").innerHTML = `Win: `;

        if(autoplay){
            series.games++;
            series.tb += player.bet;
            series.update();
        }
        hm.games++;
        hm.tb += player.bet;
        hm.update();

        for(const reel of reels)
            reel.spin();

        for(const reel of reels)
            if(reel.output == 'G')gifts_num++;

        prev_progress.gifts = gifts_num;

        const will_respin = haveToRespin();

        if(will_respin == "respin"){
            document.getElementById("respin").innerHTML = "there is respin";
            document.getElementById("respin").style.display = "block";
            respin_state = 1;
            return;
        }
        
        showWin(will_respin); 
    }else if(respin_state == 1){
        if(prev_progress.gifts == 1){
            for(const index in reels)
                if(reels[index].output != 'G')
                    reels[index].respinForGifts();

            for(const reel of reels)
                if(reel.output == 'G')gifts_num++;

            if(gifts_num == 3){
                if(autoplay){
                    series.bg++;
                    series.update();
                }
                hm.bg++;
                hm.update();
                showWin(JACKPOT);
            }else
                showWin(0);
                    
        }else{
            for(const index in reels)
                if(index > 0)
                    reels[index].spin();

            const output = haveToRespin();
            // if(output == "respin"){
            //     document.getElementById("respin").innerHTML = "there is respin";
            //     document.getElementById("respin").style.display = "block";
            //     respin_state = 2;
            //     return;
            // }
            if(output == "respin")showWin(0);
            else showWin(output);
        }
    }//else{
    //     for(const index in reels)
    //         if(reels[index].output != 'G')
    //             reels[index].respinForGifts();

    //     for(const reel of reels)
    //         if(reel.output == 'G')gifts_num++;

    //     if(gifts_num == 3)
    //         showWin(JACKPOT);
    //     else
    //         showWin(0);
    // }
}

function haveToRespin(){
    const left = reels[0].output;
    const znak = reels[1].output;
    const right = reels[2].output;

    if(left == "G" && znak == "G" && right == "G"){
        if(autoplay){
            series.bg++;
            series.update();
        }
        hm.bg++;
        hm.update();
        
        return JACKPOT;
    }
    if(znak == "G")
        return "respin";

    if(left == "G")
        return Number(right);

    if(znak == "G")
        return Number(left + "" + right);

    if(right == "G")
        return Number(left);

    switch(znak){
        case "+":
            const result_plus = Number(left) + Number(right);
            return result_plus;
        case "-":
            const result_minus = Number(left) - Number(right);
            return result_minus >= 0 ? result_minus : 0;
        case "*":
            const result_multiplication = Number(left) * Number(right);
            return result_multiplication;
        case "/":
            const result_divide = Number(left) / Number(right);
            return Number(left) % Number(right) == 0 ? result_divide : "respin";
        case "":
            return Number(left + "" + right);
    }
}

function showWin(win){
    document.getElementById("respin").style.display = "none";

    respin_state = 0;

    player.balance = Number(player.balance) + Number(win);

    bot.has_to_stop = true;

    let gfts = 0;
    for(const reel of reels)
        if(reel.output == "G")gfts++;

    if(autoplay){
        if(win == 0)
            series.eg++;

        if(gfts == 3)
            series.bw = Number(series.bw) + Number(win);
        else
            series.nw = Number(series.nw) + Number(win);

        if(win > series.max_win && gfts != 3)
            series.max_win = win;

        series.tw = Number(series.tw) + Number(win);
        series.update();
    }
    if(win == 0)
        hm.eg++;

    if(win > hm.max_win && gfts != 3)
        hm.max_win = win;

    if(gfts == 3)
        hm.bw = Number(hm.bw) + Number(win);
    else
        hm.nw = Number(hm.nw) + Number(win);

    hm.tw = Number(hm.tw) + Number(win);
    hm.update();

    document.getElementById("win").innerHTML = `Win: ${win}`;
    player.updateBalance();
}

function triggerAuto(){
    if(autoplay)
        bot.stop();
    else{
        series.reset();
        series.update();
        bot.start();
    }

    autoplay = !autoplay;
}