var loading_div = '<div style="position:fixed;top:0;left:0;width:100%;height:100%;background-color:rgba(255,255,255,0.6);"></div><div style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:1000;display:flex;flex-direction:column;align-items:center;"><svg class="ring" viewBox="25 25 50 50" stroke-width="5"><circle cx="50" cy="50" r="20"/></svg><h2 style="margin-top:20px;margin-bottom:20px;">正在產生中</h2></div>'
// const OPENAI_API_KEY = "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"; API過期
const OPENAI_API_KEY = "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";
var dbRef = firebase.database();
var exchange_code = $.cookie('code');
dbRef.ref('/exchange_code/' + exchange_code).on('value', e => {
  if (e.val() == "unlimited") {
    $("#token_num").html("代幣剩餘次數: 無限 次")
  }
  else {
    $("#token_num").html("代幣剩餘次數: " + e.val() + " 次(一次扣1點)")
  }
})
function check() {
  const doc_topic = $('#doc_topic').val();
  const doc_title = $('#doc_title').val();
  $('#check_btn').attr('disabled', true);
  if (doc_topic == "" || doc_title == "") {
    alert("尚有必填項目尚未填寫");
    $('#check_btn').attr('disabled', false);
  }
  else {
    dbRef.ref('/exchange_code/' + exchange_code).once('value', e => {
      if (e.val() > 0 || e.val() == "unlimited") {
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
  const doc_topic = $('#doc_topic').val();
  fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + OPENAI_API_KEY,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: "請幫我生成一個公告文章，主題是" + $("#doc_topic").val() + "，內容主要是" + $("#doc_additional").val() + "，並且請不要換行。" }],
      max_tokens: 2048,
      temperature: 0.5,
    }),
  })
    .then((response) => response.json())
    .then((json) => {
      if (json.error?.message) {
        $("#msg").html(`Error: ${json.error.message}`);
      }
      else if (json.choices[0].message.content) {
        var text = json.choices[0].message.content;
        // docx生成
        const doc = new docx.Document({
          creator: "DocxGPT",
          lastModifiedBy: "DocxGPT",
          sections: [
            {
              properties: {},
              children: [
                new docx.Paragraph({
                  alignment: docx.AlignmentType.CENTER,
                  children: [
                    new docx.TextRun({
                      text: $("#doc_title").val(),
                      font: "標楷體",
                      size: 64
                    })
                  ]
                }),
                new docx.Paragraph({
                  children: [
                    new docx.TextRun({
                      text: text,
                      size: 32,
                      font: "標楷體"
                    }),

                  ]
                })
              ]
            }
          ]
        });




        docx.Packer.toBlob(doc).then(blob => {
          dbRef.ref('/exchange_code/' + exchange_code).once('value', e => {
            if (e.val() != "unlimited") {
              dbRef.ref('/exchange_code/' + exchange_code).once('value', e => {
                dbRef.ref('/exchange_code/' + exchange_code).set(e.val() - 1);
              })
            }
          })
          

          saveAs(blob, $("#doc_title").val()+'.docx')
        })
      }
      // docx存檔
    })
    .catch((error) => console.error("Error:", error))
    .finally(() => {
      $('#check_btn').attr('disabled', false);
      $("#loading_div").html("");
    });

}