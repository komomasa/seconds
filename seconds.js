(function(){
    'use strict';
    const userNameInput = document.getElementById('user-name');
    const timeEventInput = document.getElementById('time-name');
    const yearInput = document.getElementById('year');
    const mounthInput = document.getElementById('month');
    const dayInput = document.getElementById('day');
    const secondsButton = document.getElementById('seconds');
    const resultDivided = document.getElementById('result-area');
    const tweetDivided = document.getElementById('tweet-area');


    function removeAllChildren(element) {
        while (element.firstChild) { // 子どもの要素があるかぎり削除
            element.removeChild(element.firstChild);
        }

    }

    secondsButton.onclick = () => {
        const userName = userNameInput.value;
        if (userName.length === 0) {
            returm;
        }
        const timeEvent = timeEventInput.value;
        const year = yearInput.value;
        const month = mounthInput.value - 1;
        const day = dayInput.value;
        const youtime = new Date(year, month, day);
        const now = new Date();
        var time = (youtime.getTime() - now.getTime()) / 1000;
        if (time > 99999999) {//億以上のスコア
            const time1 = time / 100000000; //億
            const time1_2 = Math.floor((time1 * 100000000) / 100000000);
            const time2 = time - time1_2 * 100000000; //元値から億部分削除
            const time2_2 = time2 / 10000;
            const time2_3 = Math.floor((time2_2 * 10000) / 10000);
            const time3 = time2 - time2_3 * 10000 //億を除いた元値から万部分削除
            time = time1_2 + '億' + time2_3 + '万' + time3.toFixed(0);

        } else if (time > 9999) {//万以上のスコア
           const time1 = time / 10000;
           const time1_2 = Math.floor((time1 * 10000) / 10000);
           const time2 = time - time1_2 * 10000; //元値から万部分削除
           time = time1_2 + '万' + time2.toFixed(0);
        } else {
            time = time.toFixed(0)
        }

        removeAllChildren(resultDivided);
        const header = document.createElement('h3');
        header.innerText = '換算結果';
        resultDivided.appendChild(header);

        const paragraph = document.createElement('p');
        const result = userName + 'さんの' + timeEvent + 'まで、残り' + time + '秒です。';
        paragraph.innerText = result;
        resultDivided.appendChild(paragraph);

        //tweetareaの作成
        removeAllChildren(tweetDivided);
        const anchor = document.createElement('a');
        const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag='
            + encodeURIComponent('〇〇まであと何秒')
            + '&ref_src=twsrc%5Etfw';
        anchor.setAttribute('href', hrefValue);
        anchor.className = 'twitter-hashtag-button';
        anchor.setAttribute('data-text', result + '#〇〇まであと何秒');
        anchor.innerText = '#〇〇まであと何秒 をツイートする';
        tweetDivided.appendChild(anchor);

        twttr.widgets.load();
    };


})();