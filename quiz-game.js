class QuizGame {
    constructor(quizData) {
        this.quizData = quizData; // クイズデータを保存
        this.currentQuestionIndex = 0; // 現在の問題インデックス
        this.score = 0; // スコア

        // HTML要素の取得
        this.questionElement = document.getElementById('question');
        this.choicesElement = document.getElementById('choices');
        this.resultElement = document.getElementById('result');
        this.nextButton = document.getElementById('next-button');

        // 次の問題ボタンにイベントリスナーを追加
        this.nextButton.addEventListener('click', () => this.loadNextQuestion());
        this.loadQuestion(); // 最初の問題を読み込む
    }

    loadQuestion() {
        const currentQuestion = this.quizData[this.currentQuestionIndex];
        this.questionElement.textContent = currentQuestion.question; // 問題文を設定
        this.choicesElement.innerHTML = ''; // 選択肢をクリア

        // 選択肢ボタンを生成
        currentQuestion.choices.forEach((choice, index) => {
            const button = document.createElement('button');
            button.textContent = choice;
            button.addEventListener('click', () => this.checkAnswer(index));
            this.choicesElement.appendChild(button);
        });

        this.resultElement.textContent = ''; // 結果表示をクリア
        this.nextButton.style.display = 'none'; // 次の問題ボタンを非表示
    }

    checkAnswer(choiceIndex) {
        const currentQuestion = this.quizData[this.currentQuestionIndex];
        if (choiceIndex === currentQuestion.correctAnswer) {
            this.score++; // スコアを増やす
            this.resultElement.textContent = '正解！';
        } else {
            this.resultElement.textContent = '不正解。正解は: ' + currentQuestion.choices[currentQuestion.correctAnswer];
        }

        this.disableChoices(); // 選択肢を無効化
        this.nextButton.style.display = 'block'; // 次の問題ボタンを表示
    }

    disableChoices() {
        // すべての選択肢ボタンを無効化
        const buttons = this.choicesElement.getElementsByTagName('button');
        for (let button of buttons) {
            button.disabled = true;
        }
    }

    loadNextQuestion() {
        this.currentQuestionIndex++; // 次の問題へ
        if (this.currentQuestionIndex < this.quizData.length) {
            this.loadQuestion(); // 次の問題を読み込む
        } else {
            this.showFinalResult(); // 全問題終了時の結果表示
        }
    }

    showFinalResult() {
        this.questionElement.textContent = 'クイズ終了！';
        this.choicesElement.innerHTML = ''; // 選択肢をクリア
        this.resultElement.textContent = `あなたの得点: ${this.score} / ${this.quizData.length}`;
        this.nextButton.style.display = 'none'; // 次の問題ボタンを非表示
    }
}

// DOMの読み込みが完了したらQuizGameインスタンスを作成
document.addEventListener('DOMContentLoaded', () => {
    new QuizGame(quizData);
});