let customDrinks = [];

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

  let total = (coffee * 90) + (tea * 45) + (energy * 80);

  // カスタム飲料の分を加算
  for (const drink of customDrinks) {
    total += drink.caffeinePer * drink.count;
  }

  document.getElementById('caffeine').value = total;
}

function predictSleepImpact() {
      const caffeine = parseFloat(document.getElementById('caffeine').value);
      const age = parseFloat(document.getElementById('age').value);
      const weight = parseFloat(document.getElementById('weight').value);
      const resultDiv = document.getElementById('result');

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

