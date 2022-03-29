document.addEventListener("DOMContentLoaded", (event)=> {
    const initialTime = 100;
    let time = 100;
    let score = 0;
    let qCount = 0;
    let timeset;
    let answers = document.querySelectorAll ("#quizHolder button");
    let recordsArray = [];
    (localStorage.getItem("recordsArray")) ? recordsArray = JSON.parse(localStorage.getItem("recordsArray"))
: recordsArray = [];
    let queryElement = (element) => {
        return document.querySelector (element);
    }

    let onlyDisplaySection = (element) => {
        let sections = document.querySelectorAll("section");
        Array.from(sections).forEach((userItem) => {
            userItem.classList.add("hide");
        });
        queryElement(element).classList.remove("hide");
    }

    let recordsHtmlReset = () => {
        queryElement("#highScores div").innerHTML = "";
        var i = 1;
        recordsArray.sort((a,b) => b.score - a.score);
        Array.from(recordsArray).forEach(check =>
            {
                var scores = document.createElement("div");
                scores.innerHTML = i + ". " + check.initialRecord + " - " + check.score;
                queryElement('#highScores div').appendChild(scores);
                i = i + 1
            });
            i = 0;
            Array.from(answers).forEach(answer => {
                answer.classList.remove("disable");
            });
    }

    let setQuestionData = () => {
        queryElement("#quizHolder p").innerHTML = questions[qCount].title;
        queryElement("#quizHolder button:nth-of-type(1)").innerHTML = `1. ${questions[qCount].choices[0]}`;
		queryElement("#quizHolder button:nth-of-type(2)").innerHTML = `2. ${questions[qCount].choices[1]}`;
		queryElement("#quizHolder button:nth-of-type(3)").innerHTML = `3. ${questions[qCount].choices[2]}`;
		queryElement("#quizHolder button:nth-of-type(4)").innerHTML = `4. ${questions[qCount].choices[3]}`;
        queryElement("#quizHolder button:nth-of-type(5)").innerHTML = `5. ${questions[qCount].choices[4]}`;
        queryElement("#quizHolder button:nth-of-type(5)").innerHTML = `6. ${questions[qCount].choices[5]}`;
        queryElement("#quizHolder button:nth-of-type(5)").innerHTML = `7. ${questions[qCount].choices[6]}`; 
        queryElement("#quizHolder button:nth-of-type(5)").innerHTML = `8. ${questions[qCount].choices[7]}`;
        queryElement("#quizHolder button:nth-of-type(5)").innerHTML = `9. ${questions[qCount].choices[8]}`;
        queryElement("#quizHolder button:nth-of-type(5)").innerHTML = `10. ${questions[qCount].choices[9]}`;  
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
    queryElement ("#intro button").addEventListener("click", (e) => {
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
            if (this.innerHTML.substring(3, this.length) === questions [qCount].answer) {
                score = score + 10;
                qCount = qCount + 10;
                quizUpdate("Correct!");
            } else {
                time = time - 10;
                qCount = qCount - 10;
                quizUpdate("Incorrect");
            }
        });
    });

    let errorIndicator = () => {
        clearTimeout(timeset);
        timeset = setTimeout(()=> {
            queryElement ("#errorIndicator").classList.add("hidden");
        }, 3000);
    }

    queryElement("#records button").addEventListener("click", () => {
		let initialsRecord = queryElement('#initials').value;
		if (initialsRecord === ''){
			queryElement('#errorIndicator p').innerHTML = "You need at least 1 character";
			queryElement('#errorIndicator').classList.remove("hidden", errorIndicator());
		} else if (initialsRecord.match(/[[A-Za-z]/) === null) {
			queryElement('#errorIndicator p').innerHTML = "Only letters for initials allowed.";
			queryElement('#errorIndicator').classList.remove("hidden", errorIndicator());
		} else if (initialsRecord.length > 5) {
			queryElement('#errorIndicator p').innerHTML = "Maximum of 5 characters allowed.";
			queryElement('#errorIndicator').classList.remove("hidden", errorIndicator());
		} else {
			recordsArray.push({
				"initialRecord": initialsRecord,
				"score": score
			});
			localStorage.setItem('recordsArray', JSON.stringify(recordsArray));
			queryElement('#highScores div').innerHTML = '';
			onlyDisplaySection("#highScores");
			recordsHtmlReset();
			queryElement("#initials").value = '';
        }

        queryElement("#reset").addEventListener("click", () => {
            time = initialTime;
            score = 0;
            qCount = 0;
            onlyDisplaySection("#intro");
        });

        queryElement("#reset").addEventListener("click", () => {
            time = initialTime;
            score = 0;
            qCount = 0;
            onlyDisplaySection("#intro");
        });

        queryElement("#scores").addEventListener("click", (e) => {
            e.preventDefault();
            clearInterval(clock);
            queryElement('#time').innerHTML = 0;
            time = initialTime;
            score = 0;
            qCount = 0;
            onlyDisplaySection("#highScores");
            recordsHtmlReset();
        });
});
});