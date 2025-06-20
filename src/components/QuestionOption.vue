<template>
  <ol :data-state="selectedOption !== null ? 'answered' : 'unanswered'">
    <li v-for="(question, index) in questions" :key="index">
      <label
        :for="getInputId(index)"
        :style="{
          '--gradient-percentage': selectedOption !== null ? `${percentages[index]}%` : '0%',
        }"
        :class="{ animate: selectedOption !== null }"
        :data-question="selectedOption === index ? 'selected' : undefined"
      >
        <span class="option-label">
          <span v-if="selectedOption !== index">{{ getOptionLabel(index) }}</span>
          <svg
            v-else
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M15.8604 4.0207L6.47997 13.0404L0.939514 7.71301L1.97918 6.63176L6.47997 10.9594L14.8208 2.93945L15.8604 4.0207Z"
              fill="#13264A"
            />
          </svg>
        </span>
        <span>{{ question }}</span>
        <output>{{ getAnimatedPercentage(index) }}%</output>
        <meter :value="getAnimatedPercentage(index)" :max="100"></meter>
      </label>
      <input
        type="radio"
        :id="getInputId(index)"
        :name="name"
        :value="getOptionLabel(index).toLowerCase()"
        :disabled="selectedOption !== null"
        :data-question="selectedOption === index ? 'selected' : undefined"
        @change="handleSelection(index)"
      />
    </li>
  </ol>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

interface Props {
  questions: string[]
  percentages?: number[]
  name?: string
}

const props = withDefaults(defineProps<Props>(), {
  name: 'poll-option',
  percentages: () => [25, 45, 30], // Default static data for testing
})

const selectedOption = ref<number | null>(null)
const animatedPercentages = ref<number[]>(props.percentages.map(() => 0))

const getOptionLabel = (index: number): string => {
  return String.fromCharCode(65 + index) // 65 is ASCII for 'A'
}

const getInputId = (index: number): string => {
  return `option-${getOptionLabel(index).toLowerCase()}`
}

const handleSelection = (index: number) => {
  selectedOption.value = index
  animatePercentages()
}

const animatePercentages = () => {
  const duration = 800 // 0.8 seconds to match CSS animation
  const steps = 60 // 60 steps for smooth animation
  const stepDuration = duration / steps

  let currentStep = 0

  const animate = () => {
    if (currentStep <= steps) {
      const progress = currentStep / steps

      animatedPercentages.value = props.percentages.map((target, index) => {
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
    inline-size: var(--gradient-percentage);
  }
}

ol {
  list-style-type: none;
  padding-inline-start: 0;
}

li {
  display: grid;
  grid-template-columns: 2rem 1fr auto;
  grid-template-rows: 1fr 4px;
  row-gap: 1rem;
}

label {
  background-color: var(--color-brand-utility-0);
  align-items: center;
  border-start-end-radius: var(--border-radius-default-min);
  border-radius: var(--border-radius-default-min) var(--border-radius-default-min) 4px 4px;
  color: var(--color-typography-secondary);
  cursor: pointer;
  display: grid;
  grid-column: 1 / -1;
  grid-template-columns: subgrid;
  overflow: clip;

  span,
  output {
    grid-template-columns: subgrid;
    padding: 0.5rem;
  }

  .option-label span {
    border-start-start-radius: 2px;
    inline-size: 100%;
    padding: 0;
    place-content: center;
  }

  .option-label {
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.3s ease-out;

    span {
      block-size: 100%;
      font-weight: 700;
      text-align: center;
    }
  }

  .option-label span,
  .option-label svg {
    transition: opacity 0.3s ease-out;
  }

  .option-label svg {
    color: var(--color-brand-utility-700);
  }

  span:nth-child(1) {
    grid-column: 1 / 2;
  }

  span:nth-child(2) {
    border-inline-start: 1px solid var(--color-ui-generic-bg);
    grid-column: 2 / 3;
  }

  output {
    grid-column: 3 / 4;
  }
}

meter {
  background: var(--color-brand-utility-200);
  block-size: 4px;
  box-shadow: none;
  grid-column: 1 / -1;
  grid-row: 2;
  inline-size: 100%;

  &::-webkit-meter-bar {
    background: var(--color-brand-utility-200);
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

.option-items {
  @media (hover) and (prefers-reduced-motion: no-preference) {
    label {
      transition: opacity 360ms ease-out;
    }

    &:hover > label:not(:hover) {
      opacity: 50%;
    }

    &[data-state='answered']:hover > label:not(:hover) {
      opacity: 100%;
    }
  }
}

input[type='radio'] {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

[data-question='selected'] {
  span,
  output {
    font-weight: 600;
  }

  .option-label {
    background-color: var(--color-brand-utility-100);
    block-size: 100%;
    border-start-start-radius: 2px;
    padding: 0;
  }
}

[disabled] {
  pointer-events: none;
}
</style>
