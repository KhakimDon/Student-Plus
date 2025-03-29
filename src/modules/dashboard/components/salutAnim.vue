<script setup>
import { onMounted } from "vue";
import confetti from "canvas-confetti";

const startSideConfetti = () => {
  const defaults = {
    spread: 30, // Меньший разброс
    startVelocity: 10, // Медленнее вылетают
    gravity: 0.5, // Естественное падение вниз
    ticks: 100, // Чуть быстрее исчезают
    decay: 0.95, // Плавное затухание
    scalar: 0.7, // Частицы стали меньше
    zIndex: 1000, // Поверх всех элементов
  };

  let duration = 2000; // Длительность анимации (2 секунды)
  let startTime = Date.now(); // Время старта

  const shoot = (x, angle) => {
    confetti({
      ...defaults,
      particleCount: 2, // Ещё меньше частиц
      angle: angle, // Угол направления
      origin: { x: x, y: Math.random() * 0.8 + 0.1 }, // Выходят выше середины
    });
  };

  const frame = () => {
    if (Date.now() - startTime < duration) {
      shoot(0, 50); // Левый край, ближе к центру
      shoot(1, 120); // Правый край, ближе к центру
      requestAnimationFrame(frame); // Зацикливаем анимацию
    }
  };

  frame();
};

onMounted(() => {
  startSideConfetti();
});
</script>

<template>
  <div></div>
</template>
