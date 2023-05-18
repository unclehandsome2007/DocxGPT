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
                            text: text1,
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
                            text: "內容摘錄內容摘錄內容摘錄內容摘錄內容摘錄內容摘錄內容摘錄內容摘錄內容摘錄內容摘錄內容摘錄內容摘錄內容摘錄內容摘錄",
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
                            text: "我的觀點我的觀點我的觀點我的觀點我的觀點我的觀點我的觀點我的觀點我的觀點我的觀點我的觀點我的觀點我的觀點我的觀點",
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
                            text: "討論議題討論議題討論議題討論議題討論議題討論議題討論議題討論議題討論議題討論議題討論議題討論議題討論議題討論議題討論議題",
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
    saveAs(blob, 'test.docx')
})
// docx存檔
result.scrollTop = result.scrollHeight;