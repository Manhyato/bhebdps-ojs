document.addEventListener('DOMContentLoaded', () => {
    const tooltips = document.querySelectorAll('.has-tooltip'); // ищем `has-tooltip`
    let activeTooltip = null; // пПеременная для хранения текущей активной подсказки

    tooltips.forEach((tooltipElement) => {
        tooltipElement.addEventListener('click', (event) => {
            event.preventDefault(); 

            // уборка активной подсказки
            if (activeTooltip) {
                activeTooltip.remove();
                activeTooltip = null;
            }

            // Проверяем на тот же элемент
            const isSameTooltip = tooltipElement.nextElementSibling?.classList.contains('tooltip_active');
            if (isSameTooltip) {
                return; // Если подсказка уже активна, ничего не делаем
            }

            // Создание и показ новой подсказки
            const tooltipText = tooltipElement.getAttribute('title'); // Получаем текст подсказки
            const tooltip = document.createElement('div'); // Создаем новый элемент подсказки
            tooltip.className = 'tooltip tooltip_active';
            tooltip.textContent = tooltipText;

            // Добавляем подсказку сразу после элемента
            tooltipElement.insertAdjacentElement('afterend', tooltip);

            // Рассчитываем положение подсказки
            const { top, left, height } = tooltipElement.getBoundingClientRect();
            tooltip.style.position = 'absolute';
            tooltip.style.left = `${left}px`;
            tooltip.style.top = `${top + height}px`;

            // Сохраняем активную подсказку
            activeTooltip = tooltip;

            // Закрываем подсказку при клике вне её области
            document.addEventListener('click', (e) => {
                if (!tooltip.contains(e.target) && !tooltipElement.contains(e.target)) {
                    tooltip.remove();
                    activeTooltip = null;
                }
            }, { once: true });
        });
    });
});
