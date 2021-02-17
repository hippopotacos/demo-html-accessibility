const selectbox = document.getElementById('js-selectbox');
const selectboxWrapper = document.getElementById('js-selectbox-wrapper');

selectbox.addEventListener('change', function(e){
    const val = e.target.value;
    if(val === '1'){
        selectboxWrapper.dataset.selectValue = val;
    }else if(val === '2'){
        selectboxWrapper.dataset.selectValue = val;
    }else if(val === '3'){
        selectboxWrapper.dataset.selectValue = val;
    }else{
        selectboxWrapper.dataset.selectValue = '';
    }
});