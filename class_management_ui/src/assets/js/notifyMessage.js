﻿/*notifyMessage 1.2.0
Copyright 2021 a project by Ivan Persiani

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
const animationPositionY = "40rem";
const defaultTimer = 3000;

function runNotify(options) {
  if (options == undefined || options == null) {
    alert("Error! Read guideline!");
  } else {
    var levelMessage = options.levelMessage;
    var typeMessage = options.type;
    var message = options.message;
    var messageTitle = options.messageTitle;
    var timer = options.timer;
    var position = options.position;
    var readMoreMessage =
      options.readMoreMessage == undefined ||
      options.readMoreMessage == null ||
      options.readMoreMessage === ""
        ? "Read more..."
        : options.readMoreMessage;

    var notifyName =
      "notificationItem" +
      Math.floor(100000 + Math.random() * 900000).toString();

    $("#").append(
      GenerateMessageItem(
        typeMessage,
        message,
        notifyName,
        levelMessage,
        readMoreMessage,
        position
      )
    );
    var $notifyElement = $("#" + notifyName);
    OpenNotification($notifyElement, position);
    if (typeMessage === "fixed") {
      $notifyElement.append(GenerateCloseButton());
      $(".notificationItem .allertNotifyButton").on("click", function () {
        CloseNotification($notifyElement, position);
      });
    } else if (typeMessage === "readmore") {
      if (messageTitle == undefined || messageTitle == null) {
        messageTitle = levelMessage;
      }
      var modalName = notifyName + "modal";
      $("body").append(GenerateModal(modalName, messageTitle, message));
      var $modalElement = $("#" + modalName);

      $(".notificationItem .allertNotifyReadMore").on("click", function () {
        ReadMoreNotifyItem($modalElement, $notifyElement, position);
      });
      $(".modalNotifyContent .header .allertNotifyButton").on(
        "click",
        function () {
          CloseNotification($modalElement, position);
          $(".overlay").remove();
        }
      );
    } else {
      if (timer === undefined || timer === null) {
        timer = defaultTimer;
      }
      $notifyElement.delay(parseInt(timer)).queue((next) => {
        CloseNotification($notifyElement, position);

        next();
      });
      setTimeout(function () {
        $notifyElement.remove();
      }, parseInt(timer) + 2000);
    }
  }
}

function CloseNotification($notify, position) {
  switch (position) {
    case "top-right":
      $notify.animate(
        {
          top: animationPositionY,
          opacity: 0,
        },
        1000
      );
      break;
    case "bottom-right":
      $notify.animate(
        {
          bottom: animationPositionY,
          opacity: 0,
        },
        1000
      );
      break;
    case "top-left":
      $notify.animate(
        {
          top: animationPositionY,
          opacity: 0,
        },
        1000
      );
      break;
    case "bottom-left":
      $notify.animate(
        {
          bottom: animationPositionY,
          opacity: 0,
        },
        1000
      );
      break;
    default:
      $notify.animate(
        {
          top: animationPositionY,
          opacity: 0,
        },
        1000
      );
      break;
  }

  setTimeout(function () {
    $notify.remove();
  }, 2000);
}

function ReadMoreNotifyItem($modal, $notify, position) {
  $modal.show();
  $(".overlay").show();
  CloseNotification($notify, position);
}

function GenerateModal(name, title, message, levelMessage) {
  return (
    '<div class="overlay" ></div>' +
    '<div id="' +
    name +
    '" class="modalNotify ' +
    GetLevelMessage(levelMessage) +
    '" tabindex="-1" role="dialog" aria-labelledby="' +
    name +
    '" aria-hidden="true" > ' +
    '<div class="modalNotifyContent ">' +
    '<div class="header"> ' +
    '<h3 class="modal-title">' +
    title +
    "</h3> " +
    GenerateCloseButton() +
    "</div>" +
    '<div class="body">' +
    message +
    "</div>" +
    "</div>" +
    "</div>"
  );
}
function GenerateMessageItem(
  typeMessage,
  message,
  notifyName,
  levelMessage,
  readMoreMessage,
  position
) {
  return (
    '<div id="' +
    notifyName +
    '" class="alertNotify ' +
    GetPosition(position) +
    " " +
    GetLevelMessage(levelMessage) +
    ' notificationItem">' +
    (typeMessage === "readmore"
      ? jQuery
          .trim(message)
          .substring(0, 30)
          .split(" ")
          .slice(0, -1)
          .join(" ") +
        ' <span class="allertNotifyReadMore">' +
        readMoreMessage +
        "</span>"
      : message) +
    "</div>"
  );
}

function GenerateCloseButton() {
  return (
    '<i class="allertNotifyButton" ><svg viewBox="0 0 25 25" width="15px" height="15px">' +
    '<path fill="currentcolor" d = "M16.043,11.667L22.609,5.1c0.963-0.963,0.963-2.539,0-3.502l-0.875-0.875c-0.963-0.964-2.539-0.964-3.502,0L11.666,7.29  L5.099,0.723c-0.962-0.963-2.538-0.963-3.501,0L0.722,1.598c-0.962,0.963-0.962,2.539,0,3.502l6.566,6.566l-6.566,6.567  c-0.962,0.963-0.962,2.539,0,3.501l0.876,0.875c0.963,0.963,2.539,0.963,3.501,0l6.567-6.565l6.566,6.565  c0.963,0.963,2.539,0.963,3.502,0l0.875-0.875c0.963-0.963,0.963-2.539,0-3.501L16.043,11.667z" />' +
    "Sorry, your browser does not support inline SVG." +
    "</svg ></i>"
  );
}

function GetLevelMessage(levelMessage) {
  switch (levelMessage) {
    case "notify":
      return "notify";
    case "error":
      return "error";
    case "success":
      return "success";
    case "warning":
      return "warning";
    default:
      return "notify";
  }
}

function GetPosition(position) {
  switch (position) {
    case "top-right":
      return "top-right";
    case "top-left":
      return "top-left";
    case "bottom-right":
      return "bottom-right";
    case "bottom-left":
      return "bottom-left";
    default:
      return "top-right";
  }
}

function OpenNotification($notifyElement, position) {
  switch (position) {
    case "top-right":
      $notifyElement.animate(
        {
          right: "1rem",
        },
        500
      );
      break;
    case "bottom-right":
      $notifyElement.animate(
        {
          right: "1rem",
        },
        500
      );
      break;
    case "top-left":
      $notifyElement.animate(
        {
          left: "1rem",
        },
        500
      );
      break;
    case "bottom-left":
      $notifyElement.animate(
        {
          left: "1rem",
        },
        500
      );
      break;
    default:
      $notifyElement.animate(
        {
          right: "1rem",
        },
        500
      );
      break;
  }
}
