/**
 * Created by DingYiwei on 2017/6/19.
 */
var currentUserId;

$(function () {
    $("[data-toggle='popover']").popover();
    var messagesDiv = $("#messages");
    messagesDiv.height(messagesDiv.parent().height() - 144);
    currentUserId = $.cookie("accountid");
    loadUserInfo();
    loadRecentMessageList(currentUserId);
});

function loadUserInfo() {
    $.getJSON("../AccountInfoServlet", {accountid: currentUserId}, function (userInfo) {
        var photo = userInfo[0]["PHOTO"];
        var nickname = userInfo[0]["NICKNAME"];
        alert(photo);
        $("#photo").find("img").attr("src", photo);
        $("#nickname").find("p").text(nickname);
    })
}

// MessageList
// friendId, friendNickname, friendPhoto, lastTime, lastMessage, messageNumber
function loadRecentMessageList() {
    /*$.getJSON("MessageListServlet", {uid: userId}, function (messageList) {
     var messageDiv = $("#messageList");
     messageDiv.clear();
     for (var message in messageList) {
     var lastMessage = message["lastMessage"];
     if (lastMessage.length > 22) {
     lastMessage = lastMessage.substr(0, 20) + "...";
     }
     var nickname = message["friendNickname"];
     if (nickname.length > 18) {
     nickname.length = 18;
     nickname += message["lastTime"];
     }
     messageDiv.append("<li class='list-group-item'>" +
     "<div class='row'>" +
     "<div class='col-xs-3'>" +
     "<img src='" + message["friendPhoto"] + "' class='img-circle' style='height: 30px; width: 30px;'></div>" +
     "<div class='col-xs-6'>" + message["friendNickname"] + "<br>" + lastMessage + "</div></div></li>");
     }
     });*/
    var tempMessages = [];
    var tempMessage1 = {};
    tempMessage1.friendId = "1233";
    tempMessage1["friendNickname"] = "abc";
    tempMessage1["friendPhoto"] = "../img/photo1.jpg";
    tempMessage1["lastTime"] = "13:00";
    tempMessage1["lastMessage"] = "hello";
    tempMessage1.messageNumber = 2;
    var tempMessage2 = tempMessage1;
    tempMessages[0] = tempMessage1;
    tempMessage2.lastMessage = "what does the fox say? dinglinglingling";
    tempMessages[1] = tempMessage2;
    var messageDiv = $("#messageList");
    messageDiv.empty();
    for (var i = 0; i < tempMessages.length; ++i) {
        var message = tempMessages[i];
        var lastMessage = message["lastMessage"];
        if (lastMessage.length > 24) {
            lastMessage = lastMessage.substr(0, 22) + "...";
        }
        var nickname = message["friendNickname"];
        nickname += message["lastTime"];

        messageDiv.append("<li id='message" + message.friendId + "' onclick='chatTo(this.id)' class='list-group-item' style='background: transparent; border: none; border-radius: 0; border-top: 1px solid #555555;'>" +
            "<div class='row'>" +
            "<div class='col-xs-2'>" +
            "<img src='" + message["friendPhoto"] + "' class='img-circle' style='height: 40px; width: 40px;'></div>" +
            "<div class='col-xs-10'>" +
            "<div class='row'>" +
            "<div class='col-xs-10'>" + message.friendNickname +
            "<div class='col-xs-2 pull-right'>" + message.lastTime +
            "</div>" +
            "<div class='row' style='margin-left: 0'>" + lastMessage +
            "<span class='badge pull-right' style='background: #900000'>" + message.messageNumber +
            "</span></div></div></div></li>");
    }
}

// FriendList
// id, nickname, photo, groupName
// TODO
function loadFriendList() {
    $.getJSON("FriendListServlet", {uid: currentUserId}, function (friendList) {
        var messageDiv = $("#messageList");
        messageDiv.empty();
        for (var friend in friendList) {
            messageDiv.append("<li class='list-group-item'>" +
                "<div class='row'>" +
                "<div class='col-xs-3'>" +
                "<img src='" + friend["photo"] + "' class='img-circle' style='height: 30px; width: 30px'></div>" +
                "<div class='col-xs-6'>" + friend["nickname"] + "</div></div></li>");
        }
    });
    var messageDiv = $("#messageList");
    messageDiv.empty();
    var tempFriend = {};
    tempFriend.id = "123132";
    tempFriend.nickname = "alice";
    tempFriend.photo = "../img/photo1.jpg";
    var tempFriends = {};
    tempFriends["我的好友"] = [];
    tempFriends["我的好友"][0] = tempFriend;
    tempFriends["我的好友"][1] = tempFriend;
    tempFriends["我的好友"][2] = tempFriend;
    tempFriends["我的好友"][3] = tempFriend;
    tempFriends["我的好友"][4] = tempFriend;
    tempFriends["我的好友"][5] = tempFriend;
    tempFriends["不认识"] = [];
    tempFriends["不认识"][0] = tempFriend;
    tempFriends["不认识"][1] = tempFriend;
    tempFriends["不认识"][2] = tempFriend;
    tempFriends["同学"] = [];
    /*for (var friend in friendList) {
     messageDiv.append("<li class='list-group-item'>" +
     "<div class='row'>" +
     "<div class='col-xs-3'>" +
     "<img src='" + friend["photo"] + "' class='img-circle' style='height: 30px; width: 30px'></div>" +
     "<div class='col-xs-6'>" + friend["nickname"] + "</div></div></li>");
     }*/
    var strToAppend = "";
    var groupCount = 0;
    for (var group in tempFriends) {
        strToAppend += "<div id='group" + groupCount + "' class='panel-group' style='margin: 0;'>" +
            "<div class='panel panel-default' style='background: transparent; border: none; border-radius: 0; border-top: 1px solid #555555;'>" +
            "<div class='panel-heading' style='background: transparent; color: white; border: none'>" +
            "<label data-toggle='collapse' data-parent='#group" + groupCount + "' href='#collapse" + groupCount + "'>" + group + "(" + tempFriends[group].length + ")</label>" +
            "</div>" +
            "<div id='collapse" + groupCount + "' class='panel-collapse collapse'>" +
            "<div class='panel-body' style='padding: 0; border: none;'>" +
            "<ul class='list-group' style='margin: 0'>";
        for (var i = 0; i < tempFriends[group].length; ++i) {
            var friend = tempFriends[group][i];
            strToAppend += "<li id='friend" + friend.id + "' onclick='chatToFriend(this.id)' class='list-group-item' style='background: transparent; border: none; border-radius: 0; border-top: 1px solid #555555;'>" +
                "<div class='row'>" +
                "<div class='col-xs-3'>" +
                "<img src='" + friend.photo + "' class='img-circle' style='height: 30px; width: 30px;'>" +
                "</div>" +
                "<div class='col-xs-9'>" + friend.nickname +
                "</div>" +
                "</li>";
        }
        strToAppend += "</ul>" +
            "</div></div></div></div>";
        groupCount++;
    }
    messageDiv.append(strToAppend);
}

function loadApplyList() {
    $.getJSON("../ReadUserNewFriendServlet", {accountid: currentUserId}, function (applyList) {
        var messageDiv = $("#messageList");
        messageDiv.empty();
        for (var i = 0; i < applyList.length; ++i) {
            var apply = applyList[i];
            messageDiv.append("<li id='user" + apply["FRIENDID"] + "' class='list-group-item' " +
                "style='background: transparent; border: none; border-radius: 0; border-top: 1px solid #555555' " +
                "onclick='agree(this.id)'>" +
                "<div class='row'>" +
                "<div class='col-xs-2'>" +
                "<img src='" + apply["PHOTO"] + "' class='img-circle' style='height: 40px; width: 40px;'></div>" +
                "<div class='col-xs-10'>" + apply["NICKNAME"] + "(" + apply["FRIENDID"] + ")<br>请求添加你为好友</div></li>");
        }
    });
}

function agree(applyUserId) {
    $.getJSON("../AgreeNewFriendServlet", {accountid: currentUserId, friendid: applyUserId.substr("user".length)}, function (agreeInfo) {
        var noticeBox=$("#notice");
        var noticeBody=noticeBox.find(".modal-body");
        if(agreeInfo["ifNew"]==-1) {
            noticeBody.text("好友添加成功");
        }else {
            noticeBody.text("好友添加失败");
        }
        noticeBox.modal();
        $(applyUserId).remove();
    })
}

function searchUsers() {
    var searchOption = $("#searchOption").attr("value");
    var searchContent = $("#searchContent").val();
    var sendData = {};
    sendData.accountid = currentUserId;
    sendData[searchOption] = searchContent
    $.getJSON("../SearchFriendServlet", sendData, function (userList) {
        var list = $("#searchList");
        list.empty();
        for (var i = 0; i < userList.length; ++i) {
            var user = userList[i];
            var isFriend = user["isFriend"];
            var spanId = isFriend == 0 ? "friend" : "message";
            var classAndOnclick = isFriend == 0 ?
                "class='glyphicon glyphicon-send' onclick='addFriend(this.id)'" :
                "class='glyphicon glyphicon-comment' onclick='chatTo(this.id)'";
            list.append("<li class='list-group-item'>" +
                "<div class='row'>" +
                "<div class='col-xs-2'>" +
                "<img src='" + user["PHOTO"] + "' class='img-circle' style='height: 30px; width: 30px'></div>" +
                "<div class='col-xs-9'>" + user["NICKNAME"] + "(" + user["ACCOUNTID"] + ")" + "</div>" +
                "<span id='" + spanId + user["ACCOUNTID"] + "' style='color: dodgerblue; font-size: x-large;' " +
                classAndOnclick + "</span>" + "</div></li>");
        }
    });
}

function addFriend(friendId) {
    var userId = friendId.substr("friend".length);
    $.getJSON("../AddFriendServlet", {accountid: currentUserId, friendid: userId}, function () {
        $("#searchUser").modal("hide");
        var noticeBox=$("#notice");
        noticeBox.find(".modal-body").text("请求已发送");
        noticeBox.modal();
    });
}

function changeSearchOption() {
    var searchOption = $("#searchOption");
    var searchContent = $("#searchContent");
    if (searchOption.attr("value") == "findaccountid") {
        searchOption.attr("value", "nickname");
        searchOption.text("昵称▼");
        searchContent.attr("placeholder", "请输入昵称");
    } else {
        searchOption.attr("value", "findaccountid");
        searchOption.text("账号▼");
        searchContent.attr("placeholder", "请输入账号");
    }
    if (searchContent.val() != "") {
        searchUsers();
    }
}

function changeGroup() {
    var friendId = $("#div_userinfo").find("label");
    alert($("#div_userinfo").find("label").attr("id"));
}
