'use strict';
const STORE = {
    questions: [
   {
    question: "How old was the oldest cat in the world?",
    options: [
        "16 years old", 
        "43 years old", 
        "38 years old", 
        "22 years old"
      ],
      answer: "38 years old",
      detailedAnswer: "According to the Guiness World Records, the oldest cat is 38 years old. Her name was Creme Puff and lived in Austin, Texas until 2005."
    },
    
       {
    question: "How long do cats typically sleep?",
    options: [
        "8 hours", 
        "12 hours", 
        "15 hours", 
        "19 hours"
      ],
      answer: "15 hours",
      detailedAnswer: "Purina states cats sleep on average of 15 hours a day with some kittens sleeping up to 20 hours per day."
    },

       {
    question: "What is the name of a person who loves cats?",
    options: [
        "dendrophile", 
        "anthophile", 
        "hydrophile", 
        "ailurophile"
      ],
      answer: "ailurophile",
      detailedAnswer: "According to Merriam-Webster, ailurophile means a cat fancier or a lover of cats."
    },
       {
    question: "How high can cats jump?",
    options: [
        "2 times their height", 
        "3 times their height", 
        "5 times their height", 
        "10 times their height"
      ],
      answer: "5 times their height",
      detailedAnswer: "An adult cat can jump 5 times their height. The longest recorded cat jump was Waffle the Warrior who jumped 213.36 cm, which is 7 feet."
    },

       {
    question: "How do cats walk?",
    options: [
        "Randomly using different feet", 
        "With both right feet, then both left feet, alternating", 
        "With front left foot and back right foot at the same time, alternating with the right foot and back left", 
        "With both front feet and then both back feet"
      ],
      answer: "With both right feet, then both left feet, alternating",
      detailedAnswer: "Similar to camels and giraffes they walk with both right feet then both left feet."
    },

       {
    question: "What body part on a cat is unique like humans fingerprints?",
    options: [
        "A cat's nose", 
        "A cat's paws", 
        "a cat's eyes", 
        "A cat's tongue"
      ],
      answer: "A cat's nose",
      detailedAnswer: "Dogs and cats alike share this trait having the little bumps and ridges which are unique like human fingerprints."
    }
],
currentQuestion: 0,
score: 0
};


// Start quiz triggered by click of start quiz button
function startQuiz() {
    $('#start').on('click', function(event) {
        $("#title").hide();
        // call function show title
        title();
        renderQuestion();
    });
}


// shows question number and score
function updateQuestionScore() {
    const html = $(
        `
        <ul>
            <li id="js-answered">Question Number: ${STORE.currentQuestion + 1}/${STORE.questions.length}</li>
            <li id="js-score">Score: ${STORE.score}/${STORE.questions.length}</li>
        </ul>
        `
    );
    $(".question-score").html(html);
}

// shows options for current question
function updateOptions() {
    let question = STORE.questions[STORE.currentQuestion];
    for(let i = 0; i < question.options.length; i++) {
        $(".js-options").append (
            `
            <input type="radio" name="options" id="option${i+1}" value="${question.options[i]}" tabindex="${i+1}">
            <label for="option${i+1}"> ${question.options[i]}</label>
            <br>
            <span id="js-r${i+1}"></span>
            `
        );
    }
}

// shows the question
function renderQuestion() {
    let question = STORE.questions[STORE.currentQuestion];
    updateQuestionScore();
    const questionHtml = $(
        `
        <div>
            <form id="js-questions" class="question-form">
                <fieldset>
                    <div class="group question">
                        <div class="item">
                            <legend> ${question.question}</legend>
                        </div>
                    </div>
                    <div class="group options">
                        <div class="item">
                            <div class="js-options"> 
                            </div>
                        </div>
                    </div>
                    <div class="group">
                        <div class="item">
                            <button type="submit" id="answer" tabindex="5">Submit</button>
                            <button type="button" id="next-question" tabindex="6">Next</button>
                        </div>
                    </div>
                </fieldset>
            </form>
        </div>
        `
    );
$("main").html(questionHtml);
updateOptions();
$("#next-question").hide();
}

// show results and restart quiz button
function displayResults() {
    let resultHtml = $(
        `
        <div class="results">
            <form id="js-restart-quiz">
                <fieldset>
                    <div class="group">
                        <div class="item">
                            <legend>Your Score is: ${STORE.score}/${STORE.questions.length}</legend>
                        </div>
                    </div>
                    <div class="group">
                        <div class="item">
                            <button type="button" id="restart">Restart Quiz</button>
                        </div>
                    </div>
                </fieldset>
            </form>
        </div>
        `
    );
    STORE.currentQuestion = 0;
    STORE.score = 0;
    $("main").html(resultHtml);
}

function title() {
  let quizTitle = (
    `
    <div class="group">
      <div class="item">
        <h1>All About Cats Quiz</h1>
          <div class="question-score"></div>
      </div>
    </div>
     `
  );
  $("header").html(quizTitle);
}

// checks if end of questions
function locationQuestions() {
    $('body').on('click', '#next-question', (event) => {
        STORE.currentQuestion === STORE.questions.length?displayResults() : renderQuestion();
    });
}

function rightWrongOption() {
    $('body').on("submit", '#js-questions', function(event) {
        event.preventDefault();
        let currentQuest = STORE.questions[STORE.currentQuestion];
        let selectedOption = $("input[name=options]:checked").val();
        if (!selectedOption) {
            alert("Choose an option");
            return;
        }
        let id_num = currentQuest.options.findIndex(i => i === selectedOption);
        let id = "#js-r" + ++id_num;
        $('span').removeClass("right-answer wrong-answer");
        if(selectedOption === currentQuest.answer) {
            STORE.score++;

$(`${id}`).append(`<h3>Your answer is correct!</h3>
            <p class="highlight">${currentQuest.answer}</p>
            <p> ${currentQuest.detailedAnswer}</p>
            `);
           $(`${id}`).addClass("right-answer");


        }
        else {
          $(`${id}`).append(`<h3>That answer is wrong.</h3>
            <p class="highlight">The answer is actually ${currentQuest.answer}</p>
            <p> ${currentQuest.detailedAnswer}</p>
            `);
          $(`${id}`).addClass("wrong-answer");
       }
        STORE.currentQuestion++;
        $("#js-score").text(`Score: ${STORE.score}/${STORE.questions.length}`);
        $('#answer').hide();
        $('input[type=radio]').attr('disabled', true);
        $('#next-question').show();
        });
}



function restartQuiz() {
    $('body').on('click', '#restart', (event) => {
        renderQuestion();
    });
}

// callback function when the page loads
function handleQuiz () {
    startQuiz();
    locationQuestions();
    rightWrongOption();
    restartQuiz();
}
// when the page loads, call handleQuiz
$(handleQuiz);



