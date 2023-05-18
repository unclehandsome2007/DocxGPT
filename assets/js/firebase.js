firebase.database().ref('/setting/open').on('value', e => {
	if(e.val()!=true){
        $("#login-form").html("<br><br><h2>管理員尚未開放 若有誤請由下方郵件聯絡</h2><br><br>")
    };
})