const result = document.getElementById("result");
var loading_div = '<div style="position:fixed;top:0;left:0;width:100%;height:100%;background-color:rgba(255,255,255,0.6);"></div><div style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:1000;display:flex;flex-direction:column;align-items:center;"><svg class="ring" viewBox="25 25 50 50" stroke-width="5"><circle cx="50" cy="50" r="20"/></svg><h2 id="ring_text" style="margin-top:20px;margin-bottom:20px;">正在產生中</h2></div>'
const OPENAI_API_KEY = "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";
var dbRef = firebase.database();
var exchange_code = $.cookie('code');
dbRef.ref('/exchange_code/' + exchange_code).on('value', e => {
    if (e.val() == "unlimited") {
        $("#token_num").html("代幣剩餘次數: 無限 次")
    }
    else {
        $("#token_num").html("代幣剩餘次數: " + e.val() + " 次(一次扣6點)")
    }
})
function check() {
    const user_info = $('#user_info').val();
    const book_info = $('#book_info').val();
    $('#check_btn').attr('disabled', true);
    if (user_info == "" || book_info == "") {
        alert("尚有必填項目尚未填寫");
        $('#check_btn').attr('disabled', false);
    }
    else {
        dbRef.ref('/exchange_code/' + exchange_code).once('value', e => {
            if (e.val() > 5 || e.val() == "unlimited") {
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
    user_info = $("#user_info").val().split("|");
    book_info = $("#book_info").val().split("|");
    book_intr = $("#book_intr").val();
    book_content = $("#book_content").val();
    // 第一次POST
    $("#ring_text").html("正在生成內容簡介...(1/3)");
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
                { role: "user", content: "以下是一本書的內容簡介，請幫我寫出關於這個書籍的一些相關訊息，100~200字，並且內容請用自己的話說出來，禁止使用上面的句子，任何句子都不行一樣，這本書的書名叫做:" + book_info[2] + "。簡介為" + book_intr + "。簡介到此結束。生成的文字請直接生成內容，前面不要多加'內容簡介'之類的文字。" }],
            max_tokens: 500,
            temperature: 0.5,
        }),
    })
        .then((response) => response.json())
        .then((json) => {
            var text1 = json.choices[0].message.content;
            result.value += "\nChatGPT: " + text1;
            // 第二次POST
            $("#ring_text").html("正在生成我的觀點...(2/3)");
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
                        { role: "system", content: "你是撰寫閱讀心得的學生，避免使用難懂的詞語，並生成超過1000字。" },
                        { role: "assistant", content: "User: 以下是一本書的內容簡介，請幫我寫出關於這個書籍的觀點，100~200字，並且內容請用自己的話說出來，禁止使用上面的句子，任何句子都不行一樣，這本書的書名叫做:" + book_info[2] + "。簡介為" + text1 + "。簡介到此結束。" },
                        { role: "user", content: "請幫我根據這本書的簡介，寫出我的觀點，字數生成超過1000字，字數越多越好，我的觀點是本篇閱讀心得的重點，也是讀完一本書之後深刻思索所得到的感想，結合自己的生活與閱讀經驗，在此提出與別人分享。請勿抄襲書本的任何簡介。最好的我的觀點，是加入許多自己的生活經驗，再結合書上的內容。生成的文字請直接生成內容，前面不要多加'我的觀點'之類的文字。 " }
                    ],
                    max_tokens: 3000,
                    temperature: 1,
                }),
            })
                .then((response) => response.json())
                .then((json) => {
                    var text2 = json.choices[0].message.content;
                    result.value += "\nChatGPT: " + text2;
                    // 第三次POST
                    $("#ring_text").html("正在生成討論議題...(3/3)");
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
                                { role: "assistant", content: "User: 以下是一本書的內容簡介，請幫我寫出關於這個書籍的觀點，100~200字，並且內容請用自己的話說出來，禁止使用上面的句子，任何句子都不行一樣，這本書的書名叫做:" + book_info[2] + "。簡介為" + book_intr + "。簡介到此結束。" },
                                { role: "user", content: "請幫我根據這本書的簡介，寫出在裡面可以討論的一個問題，最多50字， 請針對書籍內容至少提出一個相關的討論議題，並建議使用「開放性疑問句」撰寫。生成的文字請直接生成內容，直接生成內容，前面不要多加其他文字。" }
                            ],
                            max_tokens: 200,
                            temperature: 0.5,
                        }),
                    })
                        .then((response) => response.json())
                        .then((json) => {
                            $("#ring_text").html("正在產生Docx...");
                            var text3 = json.choices[0].message.content;
                            result.value += "\nChatGPT: " + text3;
                            // docx生成
                            const doc = new docx.Document({
                                creator: "DocxGPT",
                                lastModifiedBy: "DocxGPT",
                                sections: [
                                    {
                                        properties: {},
                                        children: [
                                            new docx.Paragraph({
                                                children: [
                                                    new docx.TextRun({
                                                        text: "學校名稱：" + user_info[0],
                                                        font: "新細明體",
                                                        size: 24
                                                    })
                                                ]
                                            }),
                                            new docx.Paragraph({
                                                children: [
                                                    new docx.TextRun({
                                                        text: "年 級：" + user_info[1],
                                                        font: "新細明體",
                                                        size: 24
                                                    })
                                                ]
                                            }),
                                            new docx.Paragraph({
                                                children: [
                                                    new docx.TextRun({
                                                        text: "班 級：" + user_info[2],
                                                        font: "新細明體",
                                                        size: 24
                                                    })
                                                ]
                                            }),
                                            new docx.Paragraph({
                                                children: [
                                                    new docx.TextRun({
                                                        text: "科 別：" + user_info[3],
                                                        font: "新細明體",
                                                        size: 24
                                                    })
                                                ]
                                            }),
                                            new docx.Paragraph({
                                                children: [
                                                    new docx.TextRun({
                                                        text: "作 者：" + user_info[4],
                                                        font: "新細明體",
                                                        size: 24
                                                    })
                                                ]
                                            }),
                                            new docx.Paragraph({
                                                children: [
                                                    new docx.TextRun({
                                                        text: "參賽標題：" + book_info[0],
                                                        font: "新細明體",
                                                        size: 24
                                                    })
                                                ]
                                            }),
                                            new docx.Paragraph({
                                                children: [
                                                    new docx.TextRun({
                                                        text: "書籍ISBN：" + book_info[1],
                                                        font: "新細明體",
                                                        size: 24
                                                    })
                                                ]
                                            }),
                                            new docx.Paragraph({
                                                children: [
                                                    new docx.TextRun({
                                                        text: "中文書名：" + book_info[2],
                                                        font: "新細明體",
                                                        size: 24
                                                    })
                                                ]
                                            }),
                                            new docx.Paragraph({
                                                children: [
                                                    new docx.TextRun({
                                                        text: "書籍作者：" + book_info[3],
                                                        font: "新細明體",
                                                        size: 24
                                                    })
                                                ]
                                            }),
                                            new docx.Paragraph({
                                                children: [
                                                    new docx.TextRun({
                                                        text: "出版單位：" + book_info[4],
                                                        font: "新細明體",
                                                        size: 24
                                                    })
                                                ]
                                            }),
                                            new docx.Paragraph({
                                                children: [
                                                    new docx.TextRun({
                                                        text: "出版年月：" + book_info[5],
                                                        font: "新細明體",
                                                        size: 24
                                                    })
                                                ]
                                            }),
                                            new docx.Paragraph({
                                                children: [
                                                    new docx.TextRun({
                                                        text: "版 次：" + book_info[6],
                                                        font: "新細明體",
                                                        size: 24
                                                    })
                                                ]
                                            }),
                                            new docx.Paragraph({
                                                children: [
                                                    new docx.TextRun({
                                                        text: "",
                                                        font: "新細明體",
                                                        size: 24
                                                    })
                                                ]
                                            }),
                                            new docx.Paragraph({
                                                children: [
                                                    new docx.TextRun({
                                                        text: "一、圖書作者與內容簡介：",
                                                        font: "新細明體",
                                                        size: 24
                                                    })
                                                ]
                                            }),
                                            new docx.Paragraph({
                                                children: [
                                                    new docx.TextRun({
                                                        text: "  " + text1,
                                                        font: "新細明體",
                                                        size: 24
                                                    })
                                                ]
                                            }),
                                            new docx.Paragraph({
                                                children: [
                                                    new docx.TextRun({
                                                        text: "",
                                                        font: "新細明體",
                                                        size: 24
                                                    })
                                                ]
                                            }),
                                            new docx.Paragraph({
                                                children: [
                                                    new docx.TextRun({
                                                        text: "二、內容摘錄：",
                                                        font: "新細明體",
                                                        size: 24
                                                    })
                                                ]
                                            }),
                                            new docx.Paragraph({
                                                children: [
                                                    new docx.TextRun({
                                                        text: "【這邊自行打上】",
                                                        font: "新細明體",
                                                        size: 24
                                                    })
                                                ]
                                            }),
                                            new docx.Paragraph({
                                                children: [
                                                    new docx.TextRun({
                                                        text: "",
                                                        font: "新細明體",
                                                        size: 24
                                                    })
                                                ]
                                            }),
                                            new docx.Paragraph({
                                                children: [
                                                    new docx.TextRun({
                                                        text: "三、我的觀點：",
                                                        font: "新細明體",
                                                        size: 24
                                                    })
                                                ]
                                            }),
                                            new docx.Paragraph({
                                                children: [
                                                    new docx.TextRun({
                                                        text: "  " + text2,
                                                        font: "新細明體",
                                                        size: 24
                                                    })
                                                ]
                                            }),
                                            new docx.Paragraph({
                                                children: [
                                                    new docx.TextRun({
                                                        text: "",
                                                        font: "新細明體",
                                                        size: 24
                                                    })
                                                ]
                                            }),
                                            new docx.Paragraph({
                                                children: [
                                                    new docx.TextRun({
                                                        text: "四、討論議題：",
                                                        font: "新細明體",
                                                        size: 24
                                                    })
                                                ]
                                            }),
                                            new docx.Paragraph({
                                                children: [
                                                    new docx.TextRun({
                                                        text: "  " + text3,
                                                        font: "新細明體",
                                                        size: 24
                                                    })
                                                ]
                                            }),
                                            new docx.Paragraph({
                                                children: [
                                                    new docx.TextRun({
                                                        text: "",
                                                        font: "新細明體",
                                                        size: 24
                                                    })
                                                ]
                                            }),
                                        ]
                                    }
                                ]
                            });




                            docx.Packer.toBlob(doc).then(blob => {
                                dbRef.ref('/exchange_code/' + exchange_code).once('value', e => {
                                    if (e.val() != "unlimited") {
                                        dbRef.ref('/exchange_code/' + exchange_code).once('value', e => {
                                            dbRef.ref('/exchange_code/' + exchange_code).set(e.val() - 6);
                                        })
                                    }
                                })
                                

                                saveAs(blob, book_info[2]+'.docx')
                            })
                            // docx存檔
                            result.scrollTop = result.scrollHeight;

                        })
                        .finally(() => {
                            $('#check_btn').attr('disabled', false);
                            $("#loading_div").html("");
                        });
                })
        })

    if (result.value) result.value += "\n\n\n";
    result.value += `User: ${book_info}`;
    result.scrollTop = result.scrollHeight;
}