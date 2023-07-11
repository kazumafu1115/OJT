// 質問一覧を作成する関数
function createQuestionList() {
  const questionList = document.getElementById("question-items");

  fetch("http://127.0.0.1:5500/question.json")
    .then((response) => response.json())
    .then((data) => {
      if (data.question) {
        data.question.forEach((questions) => {
          const questionItem = document.createElement("li");
          const questionLink = document.createElement("a");
          const questionContent = document.createElement("ul");
          const questionId = questions.id;

          questionLink.href = "index.html?id=${questions.id}";
          questionLink.innerHTML = questions.title;
          questionContent.innerHTML = questions.content;

          questionLink.addEventListener("click", function () {
            sessionStorage.setItem("questionId", questionId);
          });

          questionItem.appendChild(questionLink);
          questionItem.appendChild(questionContent);
          questionList.appendChild(questionItem);
        });
      } else {
        console.error("コメントが見つかりません");
      }
    });
}

createQuestionList();
