// File APIに対応しているか確認
if(window.File) {
    const thumbnail = document.getElementById('thumbnail');
    const select = document.getElementById('select');
    const filename = document.getElementById('name');
 
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
            const insert = '<img src="' + reader.result + '"><br>';
            thumbnail.innerHTML = insert;
            filename.innerHTML = fileData.name;
        }
        // ファイル読み取りを実行
        reader.readAsDataURL(fileData);
    }, false);
}