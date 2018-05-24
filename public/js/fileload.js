var file = document.querySelector("#input-file");

// 파일 로드했을 때,
file.onchange = function(){
    var fileList = file.files;

    // 읽기
    var reader = new FileReader();
    reader.readAsDataURL(fileList[0]);


    // 로드한 후
    reader.onload = function(){
        // 로컬 이미지를 보여주기
        var Filename = document.getElementById("input-file").value;
        Filename = Filename.split("\\")[2];
        src = reader.result;

        document.querySelector("#loaded-img").src = src;
        document.getElementById("filepathbox").innerHTML = Filename;

        // 쿠키에 파일정보 저장
        localStorage.setItem('filename', Filename);
        localStorage.setItem('src', src);
    }
}


