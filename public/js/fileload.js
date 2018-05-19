var file = document.querySelector("#input-file");

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

        document.querySelector("#loaded-img").src = reader.result;
        document.getElementById("filepathbox").innerHTML = Filename;
    }
}

