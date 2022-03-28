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

    

});