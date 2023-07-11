const commentInput = []; /* コメントを入れるための配列 */
const titleInput = [];
const firstReplyInput = [];
const secondReplyInput = [];
const userName = "古郡 和真";
var userDate = [];
let firstUserCount = 0;
let secondUserCount = 0;
const myImg = document.getElementsByClassName("my-img")[0];
const postBtn = document.getElementsByClassName("post-btn")[0];
const chatList = document.getElementsByClassName("chat-list")[0];
const copyChatList = chatList.cloneNode(true);
const firstContent = document.getElementsByClassName("first-user")[0];
const secondContent = document.getElementsByClassName("second-user")[0];
const copyContent = secondContent.cloneNode(true);
const firstCopyContent = copyContent.cloneNode(true);
const firstUserAddBtn = document.getElementsByClassName("add-btn")[0];
const firstUserSubBtn = document.getElementsByClassName("sub-btn")[0];
const firstUserGoodCount = document.getElementsByClassName("count")[0];
const firstUserReplyBtn = document.getElementsByClassName("reply-btn")[0];
const firstUserReplyCompleteBtn =
  document.getElementsByClassName("reply-complete-btn")[0];
const firstReplyContent =
  document.getElementsByClassName("first-reply-text")[0];
const secondCopyContent = copyContent.cloneNode(true);
const secondUserAddBtn = document.getElementsByClassName("add-btn")[1];
const secondUserSubBtn = document.getElementsByClassName("sub-btn")[1];
const secondUserGoodCount = document.getElementsByClassName("count")[1];
const secondUserReplyBtn = document.getElementsByClassName("reply-btn")[1];
const secondUserReplyCompleteBtn =
  document.getElementsByClassName("reply-complete-btn")[1];
const secondReplyContent =
  document.getElementsByClassName("second-reply-text")[0];
const returnBtn = document.getElementsByClassName("return-btn")[0];

/* 質問一覧のページに移動する */
returnBtn.addEventListener("click", function () {
  location.replace("http://127.0.0.1:5500/question.html");
});

/* 投稿ボタンをクリックしたとき */
postBtn.addEventListener("click", function () {
  const commentText = document.getElementsByClassName("post-text")[0].value;
  const titleText = document.getElementsByClassName("title-text")[0].value;

  if (commentText == "") {
    alert("何か文字を入力してください!");
    return;
  } else if (commentText.trim() === "") {
    alert("スペース以外で何か文字を入力してください!");
    document.getElementsByClassName("post-text")[0].value = "";
    return;
  }
  if (titleText.length > 100) {
    alert("タイトルを100文字以内で入力してください");
    document.getElementsByClassName("title-text")[0].value = "";
    return;
  }
  getNowTimes();
  commentInput.push(commentText);
  titleInput.push(titleText);
  createComment();
  document.getElementsByClassName("post-text")[0].value = "";
  document.getElementsByClassName("title-text")[0].value = "";
});

/* 現在の時刻を取得する関数 */
function getNowTimes() {
  var nowTime = new Date();
  var year = nowTime.getFullYear();
  var month = (nowTime.getMonth() + 1).toString().padStart(2, 0);
  var date = nowTime.getDate().toString().padStart(2, 0);
  var hour = nowTime.getHours().toString().padStart(2, 0);
  var min = nowTime.getMinutes().toString().padStart(2, 0);
  var sec = nowTime.getSeconds().toString().padStart(2, 0);

  times = year + "/" + month + "/" + date + " " + hour + ":" + min + ":" + sec;
  userDate = [];
  userDate.push(times);
}

/* 新しいコメントを作成する関数 */
function createComment() {
  let myCount = 0;
  const copyMyImg = myImg.cloneNode(true);
  const newComment = copyContent.cloneNode(true);
  newComment.className = "newUser";
  const secondUserImg = newComment.getElementsByClassName("second-user-img")[0];
  const commentText = newComment.getElementsByClassName("comment-text")[0];
  const answerTitle = newComment.getElementsByClassName("answer-title")[0];
  const deleteBtn = newComment.getElementsByClassName("delete-btn")[0];
  const myAddBtn = newComment.getElementsByClassName("add-btn")[0];
  const mySubBtn = newComment.getElementsByClassName("sub-btn")[0];
  const myGoodCount = newComment.getElementsByClassName("count")[0];
  const editBtn = newComment.getElementsByClassName("edit-btn")[0];
  const editCompleteBtn =
    newComment.getElementsByClassName("edit-complete-btn")[0];
  const myReplyBtn = newComment.getElementsByClassName("reply-btn")[0];

  deleteBtn.style.display = "inline";
  editBtn.style.display = "inline";
  myReplyBtn.style.display = "none";
  secondUserImg.style.backgroundImage = "none";

  answerTitle.innerHTML = titleInput[titleInput.length - 1];
  commentText.value = commentInput[commentInput.length - 1];
  newComment.getElementsByClassName("user-name")[0].innerHTML = userName;
  newComment.getElementsByClassName("user-date")[0].innerHTML = userDate;
  secondUserImg.appendChild(copyMyImg);

  /* 削除ボタンを押したとき */
  deleteBtn.addEventListener("click", function () {
    /* 関数を引数として渡す */
    createDialog(function () {
      newComment.remove();
    });
  });
  /* プラスボタンを押したとき */
  myAddBtn.addEventListener("click", function () {
    myCount++;
    myGoodCount.innerHTML = myCount;
  });
  /* マイナスボタンを押したとき */
  mySubBtn.addEventListener("click", function () {
    if (myCount > 0) {
      myCount--;
      myGoodCount.innerHTML = myCount;
    }
  });
  /* 修正ボタンを押したとき */
  editBtn.addEventListener("click", function () {
    commentText.readOnly = false;
    editCompleteBtn.style.display = "inline";
    editBtn.style.display = "none";
    commentText.style.border = "solid 2px black";
  });
  /* 修正完了ボタンを押したとき */
  editCompleteBtn.addEventListener("click", function () {
    commentText.readOnly = true;
    editCompleteBtn.style.display = "none";
    editBtn.style.display = "inline";
    getNowTimes();
    newComment.getElementsByClassName("user-date")[0].innerHTML = userDate;
    commentText.style.border = "none";
  });

  chatList.appendChild(newComment);
}
/* ダイアログを作成する関数 */
function createDialog(commentRemove) {
  const deleteDialog = document.getElementsByClassName("delete-dialog")[0];
  const yesDeleteBtn = document.getElementsByClassName("delete-yesbtn")[0];
  const noDeleteBtn = document.getElementsByClassName("delete-nobtn")[0];

  /* 削除ボタンのはいボタンを押したとき */
  yesDeleteBtn.addEventListener("click", function () {
    deleteDialog.close();
    if (commentRemove) {
      commentRemove();
    }
  });
  /* 削除ボタンのいいえボタンを押したとき */
  noDeleteBtn.addEventListener("click", function () {
    deleteDialog.close();
  });

  deleteDialog.showModal();
}

/* first-userのプラスボタンを押したとき */
firstUserAddBtn.addEventListener("click", function () {
  firstUserCount++;
  firstUserGoodCount.innerHTML = firstUserCount;
});
/* first-userのマイナスボタンを押したとき */
firstUserSubBtn.addEventListener("click", function () {
  if (firstUserCount > 0) {
    firstUserCount--;
    firstUserGoodCount.innerHTML = firstUserCount;
  }
});
/* first-userの返信ボタンを押したとき */
firstUserReplyBtn.addEventListener("click", function () {
  firstReplyContent.style.display = "inline";
  firstUserReplyCompleteBtn.style.display = "inline";
  firstUserReplyBtn.style.display = "none";
});
/* first-userの返信完了ボタンを押したとき */
firstUserReplyCompleteBtn.addEventListener("click", function () {
  firstReplyContent.style.display = "none";
  firstUserReplyCompleteBtn.style.display = "none";
  firstUserReplyBtn.style.display = "inline";
  createReplyContent();
});

/* second-userのプラスボタンを押したとき */
secondUserAddBtn.addEventListener("click", function () {
  secondUserCount++;
  secondUserGoodCount.innerHTML = secondUserCount;
});
/* second-userのマイナスボタンを押したとき */
secondUserSubBtn.addEventListener("click", function () {
  if (secondUserCount > 0) {
    secondUserCount--;
    secondUserGoodCount.innerHTML = secondUserCount;
  }
});
/* second-userの返信ボタンを押したとき */
secondUserReplyBtn.addEventListener("click", function () {
  secondReplyContent.style.display = "inline";
  secondUserReplyCompleteBtn.style.display = "inline";
  secondUserReplyBtn.style.display = "none";
});
/* second-userの返信完了ボタンを押したとき */
secondUserReplyCompleteBtn.addEventListener("click", function () {
  secondReplyContent.style.display = "none";
  secondUserReplyCompleteBtn.style.display = "none";
  secondUserReplyBtn.style.display = "inline";
  createReplyContent();
});

/* 返信コメントを作成する関数 */
function createReplyContent() {
  let firstReplyCount = 0;
  let secondReplyCount = 0;
  const copyMyImg = myImg.cloneNode(true);
  const replyComment = copyChatList.cloneNode(true);

  const firstUserImg = replyComment.getElementsByClassName("first-user-img")[0];
  const firstReplyCommentText =
    replyComment.getElementsByClassName("comment-text")[0];
  const firstReplyDeleteBtn =
    replyComment.getElementsByClassName("delete-btn")[0];
  const firstReplyAddBtn = replyComment.getElementsByClassName("add-btn")[0];
  const firstReplySubBtn = replyComment.getElementsByClassName("sub-btn")[0];
  const firstReplyGoodCount = replyComment.getElementsByClassName("count")[0];
  const firstReplyEditBtn = replyComment.getElementsByClassName("edit-btn")[0];
  const firstReplyEditCompleteBtn =
    replyComment.getElementsByClassName("edit-complete-btn")[0];
  const firstUserReplyBtn = replyComment.getElementsByClassName("reply-btn")[0];

  const secondUserImg =
    replyComment.getElementsByClassName("second-user-img")[0];
  const secondReplyCommentText =
    replyComment.getElementsByClassName("comment-text")[1];
  const secondReplyDeleteBtn =
    replyComment.getElementsByClassName("delete-btn")[1];
  const secondReplyAddBtn = replyComment.getElementsByClassName("add-btn")[1];
  const secondReplySubBtn = replyComment.getElementsByClassName("sub-btn")[1];
  const secondReplyGoodCount = replyComment.getElementsByClassName("count")[1];
  const secondReplyEditBtn = replyComment.getElementsByClassName("edit-btn")[1];
  const secondReplyEditCompleteBtn =
    replyComment.getElementsByClassName("edit-complete-btn")[1];
  const secondUserReplyBtn =
    replyComment.getElementsByClassName("reply-btn")[1];

  const firstReplyText = firstReplyContent.value.trim();
  const secondReplyText = secondReplyContent.value.trim();
  getNowTimes();

  if (firstReplyText === "" && secondReplyText === "") {
    alert("返信内容を入力してください");
    return;
  }

  if (firstReplyText !== "") {
    const firstReplyComment =
      replyComment.getElementsByClassName("first-user")[0];
    firstReplyDeleteBtn.style.display = "inline";
    firstReplyEditBtn.style.display = "inline";
    firstUserReplyBtn.style.display = "none";
    firstUserImg.style.backgroundImage = "none";

    /* 削除ボタンを押したとき */
    firstReplyDeleteBtn.addEventListener("click", function () {
      createDialog(function () {
        firstReplyComment.remove();
      });
    });
    /* プラスボタンを押したとき */
    firstReplyAddBtn.addEventListener("click", function () {
      firstReplyCount++;
      firstReplyGoodCount.innerHTML = firstReplyCount;
    });
    /* マイナスボタンを押したとき */
    firstReplySubBtn.addEventListener("click", function () {
      if (firstReplyCount > 0) {
        firstReplyCount--;
        firstReplyGoodCount.innerHTML = firstReplyCount;
      }
    });
    /* 修正ボタンを押したとき */
    firstReplyEditBtn.addEventListener("click", function () {
      firstReplyCommentText.readOnly = false;
      firstReplyEditCompleteBtn.style.display = "inline";
      firstReplyEditBtn.style.display = "none";
      firstReplyCommentText.style.border = "solid 2px black";
    });
    /* 修正完了ボタンを押したとき */
    firstReplyEditCompleteBtn.addEventListener("click", function () {
      firstReplyCommentText.readOnly = true;
      firstReplyEditCompleteBtn.style.display = "none";
      firstReplyEditBtn.style.display = "inline";
      getNowTimes();
      firstReplyComment.getElementsByClassName("user-date")[0].innerHTML =
      userDate;
      firstReplyCommentText.style.border = "none";
    });

    firstReplyInput.push(firstReplyText);
    firstReplyCommentText.value = firstReplyInput[firstReplyInput.length - 1];
    firstReplyComment.getElementsByClassName("user-name")[0].innerHTML =
      userName;
    firstReplyComment.getElementsByClassName("user-date")[0].innerHTML =
      userDate;
    firstReplyComment.style.width = "90%";
    firstContent.after(firstReplyComment);
    firstUserImg.appendChild(copyMyImg);
    firstReplyContent.value = "";
  }

  if (secondReplyText !== "") {
    const secondReplyComment =
      replyComment.getElementsByClassName("second-user")[0];
    secondReplyDeleteBtn.style.display = "inline";
    secondReplyEditBtn.style.display = "inline";
    secondUserReplyBtn.style.display = "none";
    secondUserImg.style.backgroundImage = "none";

    /* 削除ボタンを押したとき */
    secondReplyDeleteBtn.addEventListener("click", function () {
      createDialog(function () {
        secondReplyComment.remove();
      });
    });
    /* プラスボタンを押したとき */
    secondReplyAddBtn.addEventListener("click", function () {
      secondReplyCount++;
      secondReplyGoodCount.innerHTML = secondReplyCount;
    });
    /* マイナスボタンを押したとき */
    secondReplySubBtn.addEventListener("click", function () {
      if (secondReplyCount > 0) {
        secondReplyCount--;
        secondReplyGoodCount.innerHTML = secondReplyCount;
      }
    });
    /* 修正ボタンを押したとき */
    secondReplyEditBtn.addEventListener("click", function () {
      secondReplyCommentText.readOnly = false;
      secondReplyEditCompleteBtn.style.display = "inline";
      secondReplyEditBtn.style.display = "none";
      secondReplyCommentText.style.border = "solid 2px black";
    });
    /* 修正完了ボタンを押したとき */
    secondReplyEditCompleteBtn.addEventListener("click", function () {
      secondReplyCommentText.readOnly = true;
      secondReplyEditCompleteBtn.style.display = "none";
      secondReplyEditBtn.style.display = "inline";
      getNowTimes();
      secondReplyComment.getElementsByClassName("user-date")[0].innerHTML =
      userDate;
      secondReplyCommentText.style.border = "none";
    });

    secondReplyInput.push(secondReplyText);
    secondReplyCommentText.value =
      secondReplyInput[secondReplyInput.length - 1];
    secondReplyComment.getElementsByClassName("user-name")[0].innerHTML =
      userName;
    secondReplyComment.getElementsByClassName("user-date")[0].innerHTML =
      userDate;
    secondReplyComment.style.width = "90%";
    secondContent.after(secondReplyComment);
    secondUserImg.appendChild(copyMyImg);
    secondReplyContent.value = "";
  }
}

/* 質問の回答作成 */
function createAnswer() {
  const questionId = sessionStorage.getItem("questionId");
  const commentContainers = document.querySelectorAll(".user-comment");
  const users = document.querySelectorAll("#users");
  const countBtn = document.querySelectorAll(".goodcount-btn");

  fetch("http://127.0.0.1:5500/data" + questionId + ".json")
    .then((response) => response.json())
    .then((data) => {
      if (data.answers) {
        data.answers.forEach((comment, index) => {
          const questionTitle = document.querySelector(".title");
          const answersComment =
            commentContainers[index].querySelector(".comment-text");
          const answersTitle = users[index].querySelector(".answer-title");
          const answersUserName = users[index].querySelector(".user-name");
          const answersUserDate = users[index].querySelector(".user-date");
          const answersUserImg = users[index].querySelector("#user-img");
          const imageElement = document.createElement("img");
          const answersScore = countBtn[index].querySelector(".count");
          const answersAddBtn = countBtn[index].querySelector(".add-btn");
          const answersSubBtn = countBtn[index].querySelector(".sub-btn");

          if (questionTitle && index === 0) {
            questionTitle.innerHTML = comment.question;
          }
          if (answersUserName) {
            answersUserName.innerHTML = comment.user.username;
          }
          if (answersUserDate) {
            answersUserDate.innerHTML = comment.user.userdate;
          }
          if (answersUserImg) {
            imageElement.src = comment.user.image.url;
            answersUserImg.appendChild(imageElement);
          }
          if (answersComment) {
            answersComment.value = comment.content;
          }
          if (answersTitle) {
            answersTitle.innerHTML = comment.title;
          }
          if (answersScore) {
            var jsonScore = comment.score;
            answersScore.innerHTML = jsonScore;
            answersAddBtn.addEventListener("click", function () {
              jsonScore++;
              answersScore.innerHTML = jsonScore;
            });
            answersSubBtn.addEventListener("click", function () {
              jsonScore--;
              answersScore.innerHTML = jsonScore;
            });
          }
        });
      } else {
        console.error("コメントが見つかりません");
      }
    });
}
createAnswer();

/* コメントをフィルターする関数 */
function filterComments() {
  const firstUser = document.getElementsByClassName("first-user")[0];
  const secondUser = document.getElementsByClassName("second-user")[0];
  const newUser = document.getElementsByClassName("newUser");
  const userComments = Array.from(newUser);

  userComments.push(firstUser, secondUser);
  userComments.sort(compareComments);
  chatList.innerHTML = "";
  for (const comment of userComments) {
    chatList.appendChild(comment);
  }
}

/* 比較する関数 */
function compareComments(comment1, comment2) {
  const filterOption = document.getElementById("filter-option").value;
  const firstDate = comment1.getElementsByClassName("user-date")[0].innerHTML;
  const secondDate = comment2.getElementsByClassName("user-date")[0].innerHTML;
  const firstText = comment1.getElementsByClassName("comment-text")[0].value;
  const secondText = comment2.getElementsByClassName("comment-text")[0].value;
  const firstScore = comment1.getElementsByClassName("count")[0].innerHTML;
  const secondScore = comment2.getElementsByClassName("count")[0].innerHTML;

  if (filterOption === "newest") {
    return secondDate.localeCompare(firstDate);
  } else if (filterOption === "oldest") {
    return firstDate.localeCompare(secondDate);
  } else if (filterOption === "longest") {
    return secondText.length - firstText.length;
  } else if (filterOption === "shortest") {
    return firstText.length - secondText.length;
  } else if (filterOption === "largest") {
    return secondScore - firstScore;
  } else if (filterOption === "smallest") {
    return firstScore - secondScore;
  } else if (filterOption === "normal") {
    return firstDate.localeCompare(secondDate);
  } else {
    return 0;
  }
}
