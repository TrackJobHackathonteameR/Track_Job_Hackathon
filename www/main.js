let customDrinks = [];
totalCaffeine = 0;

function addCustomDrink() {
  const name = document.getElementById('customName').value;
  const caffeinePer = parseFloat(document.getElementById('customCaffeine').value);
  const count = parseInt(document.getElementById('customCount').value);

  if (!name || isNaN(caffeinePer) || isNaN(count)) {
    alert("正しくすべての項目を入力してください。");
    return;
  }

  customDrinks.push({ name, caffeinePer, count });

  // 表示更新
  const list = document.getElementById('customDrinkList');
  const item = document.createElement('li');
  item.textContent = `${name}（${caffeinePer}mg × ${count}杯）`;
  list.appendChild(item);

  // 入力初期化
  document.getElementById('customName').value = "";
  document.getElementById('customCaffeine').value = "";
  document.getElementById('customCount').value = "";
}

function calculateCaffeine() {
  const coffee = parseInt(document.getElementById('coffee').value) || 0;
  const tea = parseInt(document.getElementById('tea').value) || 0;
  const energy = parseInt(document.getElementById('energy').value) || 0;

  let totalCaffeine = (coffee * 90) + (tea * 45) + (energy * 80);

  // カスタム飲料の分を加算
  for (const drink of customDrinks) {
    totalCaffeine += drink.caffeinePer * drink.count;
  }

  document.getElementById('caffeine').value = totalCaffeine;
}

function predictSleepImpact() {
      const caffeine = parseFloat(document.getElementById('caffeine').value);
      const age = parseFloat(document.getElementById('age').value);
      const weight = parseFloat(document.getElementById('weight').value);
      const resultDiv = document.getElementById('result');

      // 背景色をカフェイン量に応じて変更
      const bgColor = getBackgroundColorByCaffeine(caffeine);
      document.body.style.background = bgColor;
      if (caffeine >= 400) {
      document.body.classList.add("flash-warning");
      } else {
      document.body.classList.remove("flash-warning");
      }
      if (isNaN(caffeine) || isNaN(age) || isNaN(weight)) {
        resultDiv.innerHTML = "すべての項目を正しく入力してください。";
        return;
      }

      // 仮のロジック：体重と年齢で代謝スピードを調整し、半減期から寝れるまでの時間を推定
      const halfLife = 5; // カフェインの平均半減期（時間）
      const metabolismFactor = (70 / weight) * (1 + (50 - age) * 0.01);
      const sleepDelay = halfLife * Math.log2(caffeine / 50) * metabolismFactor;

      const roundedDelay = Math.max(0, sleepDelay.toFixed(1));
      resultDiv.innerHTML = `おおよそ ${roundedDelay} 時間後に眠れる可能性があります。`;
}

function getBackgroundColorByCaffeine(caffeine) {
      // カフェイン量 0〜400mg に対して、暗→明 で変化（上限を400に固定）
      const capped = Math.min(caffeine, 400);
      const brightness = Math.floor(30 + (capped / 400) * 70); // 30%〜100%まで変化
      return `hsl(45, 100%, ${brightness}%)`; // 明るさだけ変化、色味は黄系
}


// 初期状態：カフェイン量0mgの背景
window.onload = function () {
  document.body.style.background = getBackgroundColorByCaffeine(0);
};

//リセットボタンの動作
function resetForm() {
  document.getElementById('coffee').value = 0;
  document.getElementById('tea').value = 0;
  document.getElementById('energy').value = 0;
  document.getElementById('customName').value = '';
  document.getElementById('customCaffeine').value = '';
  document.getElementById('customCount').value = '';
  document.getElementById('customDrinkList').innerHTML = '';
  customDrinks = [];
  totalCaffeine = 0;
  document.getElementById('caffeine').value = totalCaffeine;
  document.getElementById('age').value = '';
  document.getElementById('weight').value = '';
  document.getElementById('result').innerHTML = '';

  document.body.classList.remove("flash-warning");
  document.body.style.background = getBackgroundColorByCaffeine(0);
}

function changeDrinkAmount(id, delta) {
  const input = document.getElementById(id);
  let current = parseInt(input.value) || 0;
  current = Math.max(0, current + delta); // マイナスにならないように
  input.value = current;
}
