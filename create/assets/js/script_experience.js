var loading_div = '<div style="position:fixed;top:0;left:0;width:100%;height:100%;background-color:rgba(255,255,255,0.6);"></div><div style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:1000;display:flex;flex-direction:column;align-items:center;"><svg class="ring" viewBox="25 25 50 50" stroke-width="5"><circle cx="50" cy="50" r="20"/></svg><h2 style="margin-top:20px;margin-bottom:20px;">正在產生中</h2></div>'
var dbRef = firebase.database();
const OPENAI_API_KEY = "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";
var exchange_code = $.cookie('code');
dbRef.ref('/exchange_code/' + exchange_code).on('value', e => {
  if (e.val() == "unlimited") {
    $("#token_num").html("代幣剩餘次數: 無限 次")
  }
  else {
    $("#token_num").html("代幣剩餘次數: " + e.val() + " 次(一次扣2點)")
  }

})
function check() {
  const doc_content = $('#doc_content').val();
  $('#check_btn').attr('disabled', true);
  if (doc_content == "") {
    alert("尚有必填項目尚未填寫");
    $('#check_btn').attr('disabled', false);
  }
  else {
    dbRef.ref('/exchange_code/' + exchange_code).once('value', e => {
      if (e.val() >= 2 || e.val() == "unlimited") {
        create1();
      }
      else {
        alert("已經無兌換次數")
        $('#check_btn').attr('disabled', false);
      };
    })
  }
}
function create1() {
  $("#loading_div").html(loading_div);
  var doc_content = $("#doc_content").val();
  // POST
  fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + OPENAI_API_KEY,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "你現在是一個寫閱讀心得的人，用字要偏向學生，不用太艱難的字詞。" },
        { role: "user", content: "請幫我用以下內容寫出一個自己的心得，內容為:" + doc_content + "。內容到此結束" }
      ],
      max_tokens: 500,
      temperature: 0.5,
    }),
  })
    .then((response) => response.json())
    .then((json) => {
      var text = json.choices[0].message.content;
      dbRef.ref('/exchange_code/' + exchange_code).once('value', e => {
        if (e.val() != "unlimited") {
          dbRef.ref('/exchange_code/' + exchange_code).set(e.val() - 2);
        }
      })
      $("#result").html(text);
    })
    .catch((error) => console.error("Error:", error))
    .finally(() => {
      $('#check_btn').attr('disabled', false);
      $("#loading_div").html("");
    });

}