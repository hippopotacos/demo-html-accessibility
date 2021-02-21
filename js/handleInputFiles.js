// File APIに対応しているか確認
if(window.File) {
    const limitSize = 3　* 1024 * 1024;
    const resizeThreshold = 1　* 1024 * 1024;
    const MIN_SIZE = 1000;

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

            // 選択されたファイルが画像かどうか確認
            if(!imgType.match(/^image/)) {
                alert('画像を選択してください');
                select.value = '';
                thumbnail.innerHTML = '';
                return;
            }

            // 指定したサイズ以上のファイルは許可しない
            if(imgSize > limitSize){
                alert('3MB以内の画像を選択してください');
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
                if(resizeThreshold < imgSize){
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    const image = new Image();
                    image.crossOrigin = "Anonymous";
                    image.src = reader.result;
                    image.onload = function(event){
                        var dstWidth, dstHeight;
                        if (this.width > this.height) {
                        dstWidth = MIN_SIZE;
                        dstHeight = this.height * MIN_SIZE / this.width;
                        } else {
                        dstHeight = MIN_SIZE;
                        dstWidth = this.width * MIN_SIZE / this.height;
                        }
                        canvas.width = dstWidth;
                        canvas.height = dstHeight;
                        ctx.drawImage(this, 0, 0, this.width, this.height, 0, 0, dstWidth, dstHeight);
                        const resizeResult = canvas.toDataURL('image/jpeg');
                        deleteButton.classList.add('is-show');
                        const insert = '<img src="' + resizeResult + '">';
                        thumbnail.innerHTML = insert;
                        filename.innerHTML = fileData.name;
                    };
                }else{
                    deleteButton.classList.add('is-show');
                    const insert = '<img src="' + reader.result + '">';
                    thumbnail.innerHTML = insert;
                    filename.innerHTML = fileData.name;
                }
                
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

    // const resizeImage = (data) => {
    //     console.log('resizeしますよ');
    //     const canvas = document.createElement('canvas');
    //     const ctx = canvas.getContext('2d');
    //     const image = new Image();
    //     image.crossOrigin = "Anonymous";
    //     image.src = data;
    //     image.onload = function(event){
    //         var dstWidth, dstHeight;
    //         if (this.width > this.height) {
    //           dstWidth = MIN_SIZE;
    //           dstHeight = this.height * MIN_SIZE / this.width;
    //         } else {
    //           dstHeight = MIN_SIZE;
    //           dstWidth = this.width * MIN_SIZE / this.height;
    //         }
    //         canvas.width = dstWidth;
    //         canvas.height = dstHeight;
    //         ctx.drawImage(this, 0, 0, this.width, this.height, 0, 0, dstWidth, dstHeight);
    //         console.log(canvas.toDataURL('image/jpeg'));
    //     };
    // }

    const el = document.getElementsByClassName('js-input-image');
    for(let i = 0; i < el.length; i++){
        new Thumbnail(i+1);
    }
}