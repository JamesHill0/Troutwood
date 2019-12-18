var currentQuestion = 0
var questions = [
    {prompt:"1) What is the S&P 500?", choices:["500+ of the largest publicly traded companies in the U.S.", "Supersonic stealth drone fighter", "NASCAR race", "A newly discovered comet circling Neptune"]},
    {prompt:"2) What should be the first line item in your budget?", choices:["1500+ of the largest publicly traded companies in the U.S.", "Supersonic stealth drone fighter", "NASCAR race", "A newly discovered comet circling Neptune"]},
    {prompt:"3) Which of these companies is in the S&P 500?", choices:["2500+ of the largest publicly traded companies in the U.S.", "Supersonic stealth drone fighter", "NASCAR race", "A newly discovered comet circling Neptune"]}
];


function addQuestion(qN, animate){
    
    question = $("<h1>"+questions[qN].prompt+"</h1>")
    question.attr("id", "question")
    if (animate == true){
        question.hide()};
    $("#question-box").append(question);
    if (animate == true){
        question.fadeIn(1000)};

    for (x of questions[qN].choices){
        div = $("<div></div>");
        div.attr("class", "text-box");
        h2 = $('<h2>' + x + '</h2>');
        h2.attr("class", "response");
        div.append(h2);
        if (animate == true){
            div.hide()};
        $("#responses").append(div);
        if (animate == true){
            div.fadeIn(1000)};
    }
}

$(document).ready(function(){
    addQuestion(currentQuestion, false)
    $("#prev").click(function (){
        $("#responses").empty()
        $("#question-box").empty()
        currentQuestion ++;
        addQuestion(currentQuestion, true)

        
    })
    
});


