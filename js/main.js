// File APIに対応しているか確認
if(window.File) {
    const thumbnail = document.getElementById('thumbnail-1');
    const select = document.getElementById('image-1');
    const filename = document.getElementById('filename-1');
    const deleteButton = document.getElementById('delete-1');
 
    // ファイルが選択されたとき
    select.addEventListener('change', function(e) {
        // 選択されたファイルの情報を取得
        const fileData = e.target.files[0];
        const imgType = fileData.type;
 
        // 選択されたファイルが画像かどうか確認
        if(!imgType.match(/^image/)) {
            alert('画像を選択してください');
            select.value = '';
            thumbnail.innerHTML = 'ここにサムネイルを表示します。';
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