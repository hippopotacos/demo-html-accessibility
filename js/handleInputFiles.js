// File APIに対応しているか確認
if(window.File) {
    function Thumbnail(id){
        const thumbnailId = 'thumbnail-' + id;
        const selectId = 'image-' + id;
        const filenameId = 'filename-' + id;
        const deleteButtonId = 'delete-' + id;
    
        const thumbnail = document.getElementById(thumbnailId);
        const select = document.getElementById(selectId);
        const filename = document.getElementById(filenameId);
        const deleteButton = document.getElementById(deleteButtonId);
     
        // ファイルが選択されたとき
        select.addEventListener('change', function(e) {
            // 選択されたファイルの情報を取得
            const fileData = e.target.files[0];
            const imgType = fileData.type;
            const imgSize = fileData.size;
            const limitSize = 300 * 1024 * 1024;
     
            // 選択されたファイルが画像かどうか確認
            if(!imgType.match(/^image/)) {
                alert('画像を選択してください');
                select.value = '';
                thumbnail.innerHTML = '';
                return;
            }

            // 指定したサイズ以上のファイルは許可しない
            if(imgSize > limitSize){
                alert('300MB以内の画像を選択してください');
                select.value = '';
                thumbnail.innerHTML = '';
                return;
            }
     
            const reader = new FileReader();
            // ファイル読み取りに失敗したとき
            reader.onerror = function() {
                alert('ファイル読み取りに失敗しました')
                thumbnail.innerHTML = '';
            }
            // ファイル読み取りに成功したとき
            reader.onload = function() {
                deleteButton.classList.add('is-show');
                const insert = '<img src="' + reader.result + '">';
                thumbnail.innerHTML = insert;
                filename.innerHTML = fileData.name;
            }
            // ファイル読み取りを実行
            reader.readAsDataURL(fileData);
        }, false);
    
        deleteButton.addEventListener('click', function(){
            deleteButton.classList.remove('is-show');
            select.value = '';
            const insert = '<img src="">';
            thumbnail.innerHTML = insert;
            filename.innerHTML = '選択されていません';
        });
    }

    const el = document.getElementsByClassName('js-input-image');
    for(let i = 0; i < el.length; i++){
        new Thumbnail(i+1);
    }
}