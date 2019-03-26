
(

    
    function(){
 var questions = [
  {
  question:" Who is the Prime Minister if India?",
  choices:["Narendra Modi", "Rahul Modi", "Amitabh bachchan", "Richa Modi"],
  correctAnswer:0
  },
  {
  question:"Subtract 5 from 10",
  choices:[0,4,5,3],
  correctAnswer:2
  },
  
  {
  question:"Canadas National Language:",
  choices:["English", "French", "Spanish", "English and French"],
  correctAnswer:1
  },
  
  {
  question:" What Canadian city is the second-largest French-speaking city in the world?",
  choices:["Montreal", "Toronto", "Calgary", "Ottawa"],
  correctAnswer:0
  },
  {
  question:" Which city is the capital city of Ontario?",
  choices:["Hamilton", "Toronto", "Brantford", "Ottawa"],
  correctAnswer:0
  },
  ]; 
  
var questionCounter = 0;
  var userAnswers = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object
  
  // Display initial question
  nextQuestion();
  
  // Click handler for the 'next' button
  $('#next').on('click', function (e) {
    e.preventDefault();
    
    // Suspend click listener during fade animation
    if(quiz.is(':animated')) {        
      return false;
    }
    choose();
    
    // If no user selection, progress is stopped
    if (isNaN(userAnswers[questionCounter])) {
      alert('Please make a selection!');
    } else {
      questionCounter++;
      nextQuestion();
    }
  });
  
  // Click handler for the 'prev' button
  $('#prev').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    nextQuestion();
  });
  
  // Click handler for the 'Start Over' button
  $('#start').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    userAnswers = [];
    nextQuestion();
    $('#start').hide();
  });
  
  // Animates buttons on hover
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });
  
  // Creates and returns the div that contains the questions and 
  // the answer userAnswers
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });
    
    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    qElement.append(header);
    
    var question = $('<p>').append(questions[index].question);
    qElement.append(question);
    
    var radioButtons = createRadios(index);
    qElement.append(radioButtons);
    
    return qElement;
  }
  
  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }
  
  // Reads the user selection and pushes the value to an array
  function choose() {
    userAnswers[questionCounter] = +$('input[name="answer"]:checked').val();
  }
  
  // Displays next requested element
  function nextQuestion() {
    quiz.fadeOut(function() {
      $('#question').remove();
      
      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(userAnswers[questionCounter]))) {
          $('input[value='+userAnswers[questionCounter]+']').prop('checked', true);
        }
        
        // Controls display of 'prev' button
        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){
          
          $('#prev').hide();
          $('#next').show();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }
  
  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    var score = $('<p>',{id: 'question'});
    
    var numCorrect = 0;
    for (var i = 0; i < userAnswers.length; i++) {
      if (userAnswers[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }
    var grades = ["Very Poor","Poor","Good","Very Good", "Excellent"];
    score.append('You got ' + numCorrect + ' questions out of ' +
                 questions.length + ' right!!! </br> </p>');
 score.append('<p>You grade is ' + grades[numCorrect-1] +'</p>');
    return score;
  }
})();