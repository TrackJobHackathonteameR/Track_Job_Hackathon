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