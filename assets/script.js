document.addEventListener('DOMContentLoaded', (event) => {

	const initialTime = 120;
	let time = 120;
	let score = 0;
	let qCount = 0;
	let timeset;
	let answers = document.querySelectorAll('#quizHolder button');

	let scoreStorage = [];
	(localStorage.getItem("scoreStorage")) ? scoreStorage = JSON.parse(localStorage.getItem("scoreStorage")): scoreStorage = [];

	let queryElement = (element) => {
		return document.querySelector(element);
	}

	let onlyDisplaySection = (element) => {
		let sections = document.querySelectorAll("section");
		Array.from(sections).forEach((userItem) => {
			userItem.classList.add('hide');
		});
		queryElement(element).classList.remove('hide');
	}

	let recordsHtmlReset = () => {
		queryElement('#highScores div').innerHTML = "";
		var i = 1;
		recordsArray.sort((a, b) => b.score - a.score);
		Array.from(recordsArray).forEach(check =>
		{
			var scores = document.createElement("div");
			scores.innerHTML = i + ". " + check.initialRecord + " - " + check.score;
			queryElement('#highScores div').appendChild(scores);
			i = i + 1
		});
		i = 0;
		Array.from(answers).forEach(answer => {
			answer.classList.remove('disable');
		});
	}

	let setQuestionData = () => {
		queryElement('#quizHolder p').innerHTML = questions[qCount].title;
		queryElement('#quizHolder button:nth-of-type(1)').innerHTML = `1. ${questions[qCount].choices[0]}`;
		queryElement('#quizHolder button:nth-of-type(2)').innerHTML = `2. ${questions[qCount].choices[1]}`;
		queryElement('#quizHolder button:nth-of-type(3)').innerHTML = `3. ${questions[qCount].choices[2]}`;
		queryElement('#quizHolder button:nth-of-type(4)').innerHTML = `4. ${questions[qCount].choices[3]}`;
	}

	let quizUpdate = (answerCopy) => {
		queryElement("#userScore p").innerHTML = answerCopy;
		queryElement("#userScore").classList.remove("hidden", userScore());
		Array.from(answers).forEach(answer =>
		{
			answer.classList.add("disable");
		});

		setTimeout(() => {
			if (qCount === questions.length) {
				onlyDisplaySection("#finished");
				time = 0;
				queryElement("#time").innerHTML = time;
			} else {
				setQuestionData();
				Array.from(answers).forEach(answer => {
					answer.classList.remove("disable");
				});
			}
		}, 1000);
	}

	let myTimer = () => {
		if (time > 0) {
			time = time - 1;
			queryElement("#time").innerHTML = time;
		} else {
			clearInterval(clock);
			queryElement("#score").innerHTML = score;
			onlyDisplaySection("#finished");
		}
	}

	let clock;
	queryElement("#intro button").addEventListener("click", (e) => {
		setQuestionData();
		onlyDisplaySection("#quizHolder");
		clock = setInterval(myTimer, 1000);
	});

	let userScore = () => {
		clearTimeout(timeset);
		timeset = setTimeout(() => {
		    queryElement("#userScore").classList.add("hidden");
		}, 1000);
	}


	Array.from(answers).forEach(check => {
		check.addEventListener("click", function (event) {
			if (this.innerHTML.substring(3, this.length) === questions[qCount].answer) {
				score = score + 1;
				qCount = qCount + 1;
				quizUpdate("Correct!");
			}else{
				time = time - 10;
				qCount = qCount + 1;
				quizUpdate("Incorrect!");
			}
		});
	});


	let errorIndicator = () => {
		clearTimeout(timeset);
		timeset = setTimeout(() => {
			queryElement('#errorIndicator').classList.add("hidden");
		}, 3000);
	}

	queryElement("#scoreStorage button").addEventListener("click", () => {
		let initialsRecord = queryElement("#initials").value;
		if (initialsRecord === ""){
			recordsArray.push({
				"initialRecord": initialsRecord,
				"score": score
			});
			localStorage.setItem("scoreStorage", JSON.stringify(scoreStorage));
			queryElement('#highScores div').innerHTML = '';
			onlyDisplaySection("#highScores");
			recordsHtmlReset();
			queryElement("#initials").value = '';
		}
	});

	queryElement("#clearScores").addEventListener("click", () => {
		recordsArray = [];
		queryElement('#highScores div').innerHTML = "";
		localStorage.removeItem("recordsArray");
	});

	queryElement("#reset").addEventListener("click", () => {
		time = initialTime;
		score = 0;
		qCount = 0;
		onlyDisplaySection("#intro");
	});

});