const result = document.getElementById(result);
 const OPENAI_API_KEY = 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; API過期
const OPENAI_API_KEY = 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;

function check() {
  const doc_type = $('#doc_type').val();
  const doc_topic = $('#doc_topic').val();
  if (doc_type == null  doc_topic ==   doc_topic == ) {
    alert(尚有必填項目尚未填寫);
  }
  else {
    create();
  }
}
function create() {
  const doc_type = $('#doc_type').val();
  const doc_topic = $('#doc_topic').val();
  fetch(httpsapi.openai.comv1completions, {
    method POST,
    headers {
      Accept applicationjson,
      Content-Type applicationjson,
      Authorization Bearer  + OPENAI_API_KEY,
    },
    body JSON.stringify({
      model text-ada-001,
      prompt Hello, how's the weather today,
      max_tokens 10,
      temperature 0.5,
    }),
  })
    .then((response) = response.json())
    .then((json) = {
      if (result.value) result.value += n;

      if (json.error.message) {
        result.value += `Error ${json.error.message}`;
      }
      else if (json.choices.[0].text) {
        var text = json.choices[0].text  Sem resposta;

        result.value += ChatGPT  + text;
         docx生成
        const doc = new docx.Document({
          sections [
            {
              properties {},
              children [
                new docx.Paragraph({
                  alignment docx.AlignmentType.CENTER,
                  children [
                    new docx.TextRun({
                      text 標題測試,
                      font 標楷體,
                      size 64
                    })
                  ]
                }),
                new docx.Paragraph({
                  children [
                    new docx.TextRun({
                      text text,
                      size 32
                    })
                  ]
                })
              ]
            }
          ]
        });



        docx.Packer.toBlob(doc).then(blob = {
          saveAs(blob, 'test.docx')
        })
      }
       docx存檔
      result.scrollTop = result.scrollHeight;
    })
    .catch((error) = console.error(Error, error))
    .finally(() = {
      生成完成後執行動作
    });

  if (result.value) result.value += nnn;
  result.value += `User ${doc_topic}`;
  result.scrollTop = result.scrollHeight;
}