const startPDF = () => {
    let doc = new docx.Document();
    doc.addSection({
        children: [
            new docx.Paragraph({
                children: [
                    new docx.TextRun({
                        text: prompt("請輸入內容")
                    })
                ]
            })
        ]
    });
    docx.Packer.toBlob(doc).then( blob =>{
        saveAs(blob, 'test.docx')
    })
    
}

document.querySelector("#btn").addEventListener("click",()=>{
    startPDF()
})