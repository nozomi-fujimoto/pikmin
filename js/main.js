// Vue.jsで扱うデータを用意する
const myData = {
    appName: "Pikmin!!!!!!",
    pikmins: [
        { name: "赤ピクミン!", path: "/assets/images/redPikmin.png" },
        { name: "青ピクミン", path: "/assets/images/bluePikmin.png" },
        { name: "岩ピクミン", path: "/assets/images/rockPikmin.png" },
        { name: "黄ピクミン", path: "/assets/images/yellowPikmin.png" },
        { name: "羽ピクミン", path: "/assets/images/featherPikmin.png" }
    ]
}

// Vue.jsの準備をする
const app = Vue.createApp({
    data() {
        return myData;// Vue.jsで扱うデータを指定する
    },
    created() {
        console.log("created!!");// Vue.jsが起動した時に実行されます
        // ピクミン雨を作成する関数
        function createPikminRain() {
            const raindrop = {
                path: "/assets/images/redPikmin.png",
                x: Math.random() * window.innerWidth, // ランダムなX座標を設定
                y: -50, // Y座標を画面上部に設定
                speed: Math.random() * 5 + 1 // 落下速度
            }
            // 雨滴の情報をVueインスタンスのデータに追加
            this.pikmins.push(raindrop);

            // 雨滴を画面から外れたら配列から削除
            setTimeout(() => {
                const index = this.pikmins.indexOf(raindrop);
                if (index !== -1) {
                    this.pikmins.splice(index, 1);
                }
            }, 5000); // 5秒後に削除
        }
        // 雨滴を定期的に生成
        //setInterval(createPikminRain.bind(this), 100);
    }
});

app.mount("#app");// 3, Vue.jsを起動する


// 画像を動かすスクリプト
const image = document.getElementById("pikmin");
let isMoving = false; // アニメーション中かどうかを示すフラグ

// 画像を上下にぴょこぴょこさせる関数
function moveImage() {
    let currentPosition = 0;
    function animationLoop() {
        if (isMoving && currentPosition <= 500) {
            currentPosition += 5; // 上下の移動量を設定
            image.style.top = currentPosition + "px";
            requestAnimationFrame(animationLoop); // アニメーションをループさせる
        }
    }
    animationLoop();
}

// ボタンをクリックしたときの処理
function startAnimation() {
    isMoving = !isMoving; // アニメーション中かどうかのフラグを切り替える
    if (isMoving) {
        moveImage(); // アニメーションを開始
    }

}

// ピクミン雨を作成する関数
function createPikminRain() {
    const raindrop = document.createElement("img");
    raindrop.classList.add("pikmindrop");
    raindrop.src = getRandomPikmin(myData).path; // ランダムな画像を選択
    raindrop.style.left = Math.random() * window.innerWidth + "px"; // 雨滴のX座標をランダムに設定
    document.body.appendChild(raindrop)
    // 雨滴が画面下端に到達したら削除する
    raindrop.addEventListener("animationend", function () {
        document.body.removeChild(raindrop);
    });
}

// randomピクミンを取得する関数
function getRandomPikmin(data) {
    const randomIndex = Math.floor(Math.random() * data.pikmin.length); // ランダムなインデックスを生成
    return data.pikmin[randomIndex]; // ランダムな要素を取得して返す
}

// 定期的に雨滴を生成する
//setInterval(createPikminRain, 100);