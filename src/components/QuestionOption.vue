<template>
  <ol :data-state="selectedOption !== null ? 'answered' : 'unanswered'">
    <li v-for="(question, index) in questions" :key="index">
      <label
        :for="getInputId(index)"
        :style="{
          '--percentage': selectedOption !== null ? `${percentages[index]}%` : '0%',
        }"
        :class="{
          animate: selectedOption !== null || isAuthenticated,
          disabled: !isAuthenticated,
        }"
        :data-question="selectedOption === index ? 'selected' : undefined"
      >
        <span>{{ question }}</span>
        <span
          v-if="selectedOption === null && !isAuthenticated"
          class="option-icon"
          aria-hidden="true"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_2393_15369)">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8.50002 11.937V13.1667H7.50002V11.937C6.63741 11.715 6.00002 10.9319 6.00002 10C6.00002 8.89543 6.89545 8 8.00002 8C9.10459 8 10 8.89543 10 10C10 10.9319 9.36263 11.715 8.50002 11.937ZM9.00002 10C9.00002 10.5523 8.5523 11 8.00002 11C7.44773 11 7.00002 10.5523 7.00002 10C7.00002 9.44772 7.44773 9 8.00002 9C8.5523 9 9.00002 9.44772 9.00002 10Z"
                fill="#858B94"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M4.00002 5.33333H2.50002C1.4875 5.33333 0.666687 6.17609 0.666687 7.21569V14.1176C0.666687 15.1572 1.4875 16 2.50002 16H13.5C14.5125 16 15.3334 15.1572 15.3334 14.1176V7.21569C15.3334 6.17609 14.5125 5.33333 13.5 5.33333H12V3.44498C11.9969 2.53215 11.5744 1.65749 10.825 1.01202C10.0755 0.366553 9.05991 0.00272623 8.00002 0C6.94013 0.00272623 5.92455 0.366553 5.17509 1.01202C4.42563 1.65749 4.00319 2.53215 4.00002 3.44498V5.33333ZM5.00002 5.33333V3.44688C5.00256 2.85073 5.27762 2.24347 5.82767 1.76974C6.38222 1.29214 7.16127 1.00275 8.00002 1C8.83877 1.00275 9.61782 1.29214 10.1724 1.76974C10.7224 2.24345 10.9975 2.85068 11 3.44681V5.33333H5.00002ZM1.66669 7.21569C1.66669 6.70334 2.06449 6.33333 2.50002 6.33333H13.5C13.9355 6.33333 14.3334 6.70334 14.3334 7.21569V14.1176C14.3334 14.63 13.9355 15 13.5 15H2.50002C2.06449 15 1.66669 14.63 1.66669 14.1176V7.21569Z"
                fill="#858B94"
              />
            </g>
            <defs>
              <clipPath id="clip0_2393_15369">
                <rect width="16" height="16" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </span>
        <output v-else :for="getInputId(index)">{{ getAnimatedPercentage(index) }}%</output>
        <input
          type="radio"
          :id="getInputId(index)"
          :name="name"
          :value="getOptionLabel(index).toLowerCase()"
          :disabled="selectedOption !== null"
          :data-question="selectedOption === index ? 'selected' : undefined"
          @change="handleSelection(index)"
        />
      </label>
      <meter :id="getInputId(index)" :value="getAnimatedPercentage(index)" :max="100"></meter>
    </li>
  </ol>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  questions: string[]
  percentages?: number[]
  name?: string
  isAuthenticated?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  name: 'poll-option',
  percentages: () => [25, 45, 30],
  isAuthenticated: false,
})

const emit = defineEmits<{
  'poll-answered': []
}>()

const selectedOption = ref<number | null>(null)
const animatedPercentages = ref<number[]>(props.percentages.map(() => 0))
const enabledInputs = ref<boolean[]>(props.questions.map(() => false))

const getOptionLabel = (index: number): string => {
  return String.fromCharCode(65 + index)
}

const getInputId = (index: number): string => {
  return `option-${getOptionLabel(index).toLowerCase()}`
}

const enableInput = (index: number) => {
  enabledInputs.value = enabledInputs.value.map((v, i) => (i === index ? true : v))
}

const handleSelection = (index: number) => {
  selectedOption.value = index
  animatePercentages()
  emit('poll-answered')
}

const animatePercentages = () => {
  const duration = 800
  const steps = 60
  const stepDuration = duration / steps

  let currentStep = 0

  const animate = () => {
    if (currentStep <= steps) {
      const progress = currentStep / steps

      animatedPercentages.value = props.percentages.map((target) => {
        return Math.round(target * progress)
      })

      currentStep++
      setTimeout(animate, stepDuration)
    }
  }

  animate()
}

const getAnimatedPercentage = (index: number): number => {
  return selectedOption.value !== null ? animatedPercentages.value[index] : 0
}
</script>

<style>
@keyframes animateGradient {
  0% {
    inline-size: 0%;
  }
  100% {
    inline-size: var(--percentage);
  }
}

ol {
  display: grid;
  grid-template-columns: 2rem 1fr auto;
  list-style-type: upper-latin;
  list-style-position: inside;
  padding-inline-start: 0;
  row-gap: 1rem;
}

li {
  border-radius: var(--border-radius-default-min) var(--border-radius-default-min)
    calc(var(--border-radius-default-max) * 2) calc(var(--border-radius-default-max) * 2);
  counter-increment: item;
  display: grid;
  grid-column: 1 / -1;
  grid-template-columns: subgrid;
  overflow: clip;
}

label {
  background-color: var(--color-brand-utility-0);
  align-items: center;
  cursor: pointer;
  display: grid;
  grid-column: 1 / -1;
  grid-template-columns: subgrid;
  min-block-size: 2.5rem;

  &::before {
    align-content: center;
    block-size: 100%;
    content: counter(item, upper-latin) ' ';
    font-weight: 700;
    text-align: center;
  }

  > * {
    align-content: center;
    block-size: 100%;
    padding-block: 0.75rem;
    padding-inline: 0.5rem;
  }
}

output {
  text-align: right;
}

meter {
  background: var(--color-brand-utility-200);
  block-size: 4px;
  grid-column: 1 / -1;
  inline-size: 100%;

  &::-webkit-meter-bar {
    background: var(--color-brand-utility-200);
    block-size: inherit;
  }

  &::-webkit-meter-inner-element {
    block-size: inherit;
  }

  &::-webkit-meter-inner-element {
    block-size: inherit;
  }

  &::-webkit-meter-optimum-value {
    background: var(--color-brand-utility-700);
  }

  &::-moz-meter-bar {
    background: var(--color-brand-utility-700);
  }
}

/* Utility class */
input[type='radio'] {
  border: 0;
  clip: rect(0, 0, 0, 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}

/*
 * States
 */

/* Not logged in state */
[data-user='not-logged-in'] {
  ol {
    cursor: not-allowed;
    opacity: 0.5;
    pointer-events: none;
  }
}

/* Logged in state */
[data-user='logged-in'] [data-state='unanswered'] {
  ol {
    @media (hover) and (prefers-reduced-motion: no-preference) {
      li {
        transition: opacity 360ms ease-out;
      }

      &:hover > li:not(:hover) {
        opacity: 50%;
      }
    }
  }
}

/* Answered state */
[data-state='answered'] {
  [data-question='selected']::before {
    background-color: var(--color-utility-success-light);
    background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNS44NjA0IDQuMDIwN0w2LjQ3OTk3IDEzLjA0MDRMMC45Mzk1MTQgNy43MTMwMUwxLjk3OTE4IDYuNjMxNzZMNi40Nzk5NyAxMC45NTk0TDE0LjgyMDggMi45Mzk0NUwxNS44NjA0IDQuMDIwN1oiIGZpbGw9IiMxMzI2NEEiLz4KPC9zdmc+Cg==');
    background-position: center;
    background-repeat: no-repeat;
    background-size: 16px;
    content: '';
  }
}
</style>
