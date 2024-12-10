document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    const progress = document.getElementById('progress');

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Предотвращаем стандартное поведение формы

        const fileInput = document.getElementById('file');
        const file = fileInput.files[0]; // Получаем выбранный файл

        if (!file) {
            alert('Пожалуйста, выберите файл для загрузки.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        const xhr = new XMLHttpRequest();
        xhr.open('POST', form.action, true);

        // Отслеживание прогресса загрузки
        xhr.upload.onprogress = (event) => {
            console.log(`Загружено ${event.loaded} из ${event.total}`);
            if (event.lengthComputable) {
                const percentComplete = event.loaded / event.total;
                progress.value = percentComplete;
            }
        };

        // Обработка успешного завершения загрузки
        xhr.onload = () => {
            if (xhr.status === 200 || xhr.status === 201) {
                alert('Файл успешно загружен!');
                progress.value = 0; // Сбрасываем прогресс-бар
            } else {
                alert(`Ошибка загрузки: ${xhr.status}`);
            }
        };

        // Обработка ошибки
        xhr.onerror = () => {
            alert('Произошла ошибка при загрузке файла.');
        };

        xhr.send(formData); // Отправляем данные
    });
});
