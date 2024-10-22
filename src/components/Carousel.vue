<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const carouselItems = [
  {
    id: 1,
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 2,
    image: 'https://images.pexels.com/photos/346748/pexels-photo-346748.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 3,
    image: 'https://images.pexels.com/photos/50987/money-card-business-credit-card-50987.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 4,
    image: 'https://images.pexels.com/photos/1087727/pexels-photo-1087727.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 5,
    image: 'https://images.pexels.com/photos/1727684/pexels-photo-1727684.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
]

const currentSlide = ref(0);
const items = ref(null);
const intervalId = ref();


const startAutoplay = () => {
  intervalId.value = setInterval(nextSlide, 3000);
}
const stopAutoplay = () => {
  clearInterval(intervalId.value);
}

const previousSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + items.value.length) % items.value.length;
  updateSlides();
}

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % items.value.length;
  updateSlides();
};

const updateSlides = () => {
  stopAutoplay()
  items.value.forEach((item, index) => {
    item.classList.toggle('hidden', index !== currentSlide.value);
    item.classList.toggle('block', index === currentSlide.value);
  });
  startAutoplay()
};

onMounted(() => {
  items.value = document.querySelectorAll('[data-carousel-item]');
  startAutoplay();
  updateSlides();
});
</script>

<template>
  <div id="controls-carousel" class="relative w-full" data-carousel="static">
    <div class="relative h-56 overflow-hidden rounded-lg md:h-96">
      <div v-for="item in carouselItems" class="hidden duration-700 ease-in-out" data-carousel-item>
        <img
          :src="item.image"
          class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
        >
      </div>
    </div>

    <button
      class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
      data-carousel-prev
      @click="previousSlide()"
    >
      <span
        class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
        <svg
          class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 1 1 5l4 4"
          />
        </svg>
        <span class="sr-only">Previous</span>
      </span>
    </button>
    <button
      type="button"
      class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
      data-carousel-next
      @click="nextSlide()"
    >
      <span
        class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
        <svg
          class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 9 4-4-4-4"
          />
        </svg>
        <span class="sr-only">Next</span>
      </span>
    </button>
  </div>
</template>
