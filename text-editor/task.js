document.addEventListener('DOMContentLoaded', () => {
    const editor = document.getElementById('editor');
    const clearBtn = document.getElementById('clearButton');

    const savedText = localStorage.getItem('editor');
    if (savedText) {
        editor.value = savedText;
    }

    editor.addEventListener('input', () => {
        localStorage.setItem('editor', editor.value);
    });

    clearBtn.addEventListener('click', () => {
        editor.value = '';
        // localStorage.removeItem('editor'); // удаляем из localStorage способ 1
        localStorage.clear();           // удаляем из localStorage способ 2
    });
});
