<!-- src/App.vue -->
<template>
  <div class="min-h-screen bg-slate-100 px-4 py-8 flex justify-center">
    <div class="w-full max-w-5xl bg-white rounded-2xl shadow-lg px-6 py-6 sm:px-8 sm:py-8">
      <h1 class="text-2xl font-semibold text-slate-900 mb-4">DevSpace.kz</h1>
      <header class="mb-6 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 class="text-2xl font-semibold text-slate-900">
            {{ t.title }}
          </h1>
          <p class="mt-1 text-sm text-slate-500">
            {{ t.subtitle }}
          </p>
        </div>
        <div class="flex items-center gap-2 mt-2 sm:mt-0">
          <button
            type="button"
            class="px-3 py-1 text-xs font-medium rounded-full border transition"
            :class="
              currentLang === 'ru'
                ? 'bg-sky-500 border-sky-500 text-white'
                : 'bg-slate-50 border-slate-300 text-slate-600 hover:bg-slate-100'
            "
            @click="setLanguage('ru')"
          >
            {{ t.langRu }}
          </button>
          <button
            type="button"
            class="px-3 py-1 text-xs font-medium rounded-full border transition"
            :class="
              currentLang === 'kk'
                ? 'bg-sky-500 border-sky-500 text-white'
                : 'bg-slate-50 border-slate-300 text-slate-600 hover:bg-slate-100'
            "
            @click="setLanguage('kk')"
          >
            {{ t.langKk }}
          </button>
        </div>
      </header>

      <!-- Индикатор шагов -->
      <div class="flex items-center gap-2 mb-6">
        <div v-for="step in uiSteps" :key="step.id" class="flex items-center">
          <button
            type="button"
            class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium border transition"
            :class="[
              step.id === currentStep
                ? 'bg-sky-500 border-sky-500 text-white'
                : step.id < currentStep
                  ? 'bg-emerald-500 border-emerald-500 text-white cursor-pointer hover:opacity-80'
                  : 'bg-slate-50 border-slate-300 text-slate-500 cursor-not-allowed',
            ]"
            :disabled="step.id > currentStep"
            @click="goToStep(step.id)"
          >
            {{ step.id }}
          </button>
          <div
            v-if="step.id !== uiSteps.length"
            class="w-8 h-px bg-slate-300 mx-1 hidden sm:block"
          />
        </div>
      </div>

      <!-- Текущий шаг -->
      <form @submit.prevent="handleSubmit">
        <section v-if="currentStepData" class="space-y-6">
          <div>
            <h2 class="text-xl font-semibold text-slate-900 mb-1">
              {{ currentStepData.title }}
            </h2>
            <p v-if="currentStepData.description" class="text-sm text-slate-500">
              {{ currentStepData.description }}
            </p>
          </div>

          <div v-for="section in currentStepData.sections" :key="section.id" class="space-y-4">
            <div v-if="section.title" class="mt-2">
              <h3 class="text-base font-semibold text-slate-800">
                {{ section.title }}
              </h3>
            </div>

            <template v-for="field in section.fields" :key="field.id">
              <div v-if="shouldShowField(field)" class="space-y-1">
                <!-- Лейбл (кроме одиночного и группы чекбоксов) -->
                <label
                  v-if="field.label && !['checkbox', 'checkbox-multi'].includes(field.type)"
                  class="block text-sm font-medium text-slate-700"
                >
                  {{ field.label }}
                </label>

                <!-- Однострочный input -->
                <div v-if="['text', 'tel', 'number'].includes(field.type)">
                  <input
                    :type="field.type === 'number' ? 'number' : field.type"
                    v-model="form[field.id]"
                    :placeholder="field.placeholder || ''"
                    :class="[
                      'w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2',
                      hasError(field.id)
                        ? 'border-red-500 focus:ring-red-400 focus:border-red-400'
                        : 'border-slate-300 focus:ring-sky-400 focus:border-sky-400',
                    ]"
                    @input="clearFieldError(field.id)"
                  />
                </div>

                <!-- textarea -->
                <div v-else-if="field.type === 'textarea'">
                  <textarea
                    v-model="form[field.id]"
                    :placeholder="field.placeholder || ''"
                    rows="3"
                    :class="[
                      'w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2',
                      hasError(field.id)
                        ? 'border-red-500 focus:ring-red-400 focus:border-red-400'
                        : 'border-slate-300 focus:ring-sky-400 focus:border-sky-400',
                    ]"
                    @input="clearFieldError(field.id)"
                  />
                </div>

                <!-- radio -->
                <div v-else-if="field.type === 'radio'">
                  <div
                    :class="[
                      'flex flex-wrap gap-3 mt-1 p-2 rounded-lg',
                      hasError(field.id) ? 'bg-red-50 border border-red-300' : '',
                    ]"
                  >
                    <label
                      v-for="opt in field.options"
                      :key="opt.value"
                      class="inline-flex items-center text-sm text-slate-700"
                    >
                      <input
                        type="radio"
                        class="mr-2 rounded border-slate-300 text-sky-500 focus:ring-sky-500"
                        :name="field.id"
                        :value="opt.value"
                        v-model="form[field.id]"
                        @change="clearFieldError(field.id)"
                      />
                      {{ opt.label }}
                    </label>
                  </div>
                </div>

                <!-- одиночный checkbox (булево) -->
                <div v-else-if="field.type === 'checkbox'">
                  <label class="inline-flex items-center text-sm text-slate-700">
                    <input
                      type="checkbox"
                      class="mr-2 rounded border-slate-300 text-sky-500 focus:ring-sky-500"
                      v-model="form[field.id]"
                    />
                    {{ field.label }}
                  </label>
                </div>

                <!-- группа чекбоксов (checkbox-multi) -->
                <div v-else-if="field.type === 'checkbox-multi'">
                  <p v-if="field.label" class="text-sm font-medium text-slate-700">
                    {{ field.label }}
                  </p>
                  <div class="flex flex-col gap-2 mt-1">
                    <label
                      v-for="opt in field.options"
                      :key="opt.value"
                      class="inline-flex items-center text-sm text-slate-700"
                    >
                      <input
                        type="checkbox"
                        class="mr-2 rounded border-slate-300 text-sky-500 focus:ring-sky-500"
                        :value="opt.value"
                        v-model="form[field.id]"
                      />
                      {{ opt.label }}
                    </label>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </section>

        <!-- Навигация по шагам -->
        <p v-if="showValidationMessage" class="text-sm text-red-600 mt-4">
          {{ t.validation }}
        </p>
        <div class="mt-8">
          <div class="flex justify-between items-center gap-3">
            <button
              type="button"
              class="inline-flex items-center rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 disabled:opacity-60 disabled:cursor-default"
              @click="prevStep"
              :disabled="currentStep === 1"
            >
              {{ t.back }}
            </button>

            <div class="flex flex-col items-end gap-2">
              <div class="flex items-center gap-3">
                <button
                  v-if="currentStep < totalSteps"
                  type="button"
                  class="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium text-white bg-sky-500 hover:bg-sky-600"
                  @click="nextStep"
                >
                  {{ t.next }}
                </button>

                <button
                  v-else
                  type="submit"
                  :disabled="isSubmitting"
                  class="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 disabled:cursor-wait"
                >
                  <svg
                    v-if="isSubmitting"
                    class="animate-spin h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {{ isSubmitting ? t.submitting : t.submit }}
                </button>
              </div>
            </div>
          </div>
        </div>
        <p v-if="sent" class="mt-4 text-sm text-emerald-600">
          {{ t.sent }}
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import { steps as stepsRu } from '../questions'
import { stepsKk } from '../questions-kk'

const currentStep = ref(1)
const sent = ref(false)
const validationErrors = ref(new Set())
const showValidationMessage = ref(false)
const isSubmitting = ref(false)

// Язык интерфейса
const currentLang = ref('ru')

if (typeof window !== 'undefined') {
  const saved = window.localStorage.getItem('brief_lang')
  if (saved === 'kk' || saved === 'ru') {
    currentLang.value = saved
  }
}

const uiText = {
  ru: {
    title: 'Бриф для дизайнера интерьера',
    subtitle:
      'Пожалуйста, заполните анкету максимально подробно — это поможет лучше понять ваши задачи и пожелания.',
    back: 'Назад',
    next: 'Далее',
    submit: 'Отправить бриф',
    submitting: 'Отправка...',
    sent: 'Спасибо! Бриф отправлен. Мы свяжемся с вами в ближайшее время.',
    validation: 'Пожалуйста, заполните все обязательные поля (выделены красным)',
    langRu: 'Рус',
    langKk: 'Қаз',
  },
  kk: {
    title: 'Интерьер дизайнеріне арналған бриф',
    subtitle:
      'Өтінеміз, сауалнаманы мүмкіндігінше толық толтырыңыз — бұл сіздің міндеттеріңіз бен тілектеріңізді жақсырақ түсінуге көмектеседі.',
    back: 'Артқа',
    next: 'Келесі',
    submit: 'Брифті жіберу',
    submitting: 'Жіберілуде...',
    sent: 'Рахмет! Бриф жіберілді. Біз сізбен жақын арада хабарласамыз.',
    validation: 'Өтінеміз, міндетті өрістерді толтырыңыз (қызылмен белгіленген)',
    langRu: 'Рус',
    langKk: 'Қаз',
  },
}

const t = computed(() => uiText[currentLang.value])

const uiSteps = computed(() => (currentLang.value === 'kk' ? stepsKk : stepsRu))

const form = reactive({})

function initFormFromSteps() {
  // структура шагов одинакова для обоих языков, используем русскую версию как базу
  for (const step of stepsRu) {
    if (!step.sections) continue

    for (const section of step.sections) {
      if (!section.fields) continue

      for (const field of section.fields) {
        if (!field || form[field.id] !== undefined) continue

        if (field.type === 'checkbox-multi') {
          form[field.id] = []
        } else if (field.type === 'checkbox') {
          form[field.id] = false
        } else {
          form[field.id] = ''
        }
      }
    }
  }
}

initFormFromSteps()

const currentStepData = computed(() => uiSteps.value.find((s) => s.id === currentStep.value))

const totalSteps = computed(() => uiSteps.value.length)

function setLanguage(lang) {
  if (lang !== 'ru' && lang !== 'kk') return
  currentLang.value = lang
  if (typeof window !== 'undefined') {
    window.localStorage.setItem('brief_lang', lang)
  }
}

function nextStep() {
  if (!validateCurrentStep()) {
    showValidationMessage.value = true
    return
  }

  showValidationMessage.value = false
  validationErrors.value = new Set()

  if (currentStep.value < totalSteps.value) currentStep.value++
}

function prevStep() {
  showValidationMessage.value = false
  validationErrors.value = new Set()

  if (currentStep.value > 1) currentStep.value--
}

function goToStep(stepId) {
  // Разрешаем переход только на текущий или предыдущие шаги
  if (stepId >= 1 && stepId <= currentStep.value) {
    currentStep.value = stepId
  }
}

function shouldShowField(field) {
  // на всякий случай — если поле undefined, не падаем
  if (!field) return true

  const cond = field.showIf
  if (!cond) return true

  const { fieldId, equals } = cond

  // если почему-то условное поле ещё не инициализировали — тоже не падаем
  if (!(fieldId in form)) return true

  return form[fieldId] === equals
}

function validateCurrentStep() {
  const errors = new Set()
  const stepData = uiSteps.value.find((s) => s.id === currentStep.value)

  if (!stepData || !stepData.sections) return true

  for (const section of stepData.sections) {
    if (!section.fields) continue

    for (const field of section.fields) {
      // Пропускаем скрытые поля
      if (!shouldShowField(field)) continue

      // Проверяем только required поля
      if (!field.required) continue

      const value = form[field.id]

      // Проверка для текстовых полей и textarea
      if (['text', 'tel', 'number', 'textarea'].includes(field.type)) {
        if (!value || (typeof value === 'string' && value.trim() === '')) {
          errors.add(field.id)
        }
      }

      // Проверка для radio
      if (field.type === 'radio') {
        if (!value || value === '') {
          errors.add(field.id)
        }
      }
    }
  }

  validationErrors.value = errors
  return errors.size === 0
}

function hasError(fieldId) {
  return validationErrors.value.has(fieldId)
}

function clearFieldError(fieldId) {
  if (validationErrors.value.has(fieldId)) {
    validationErrors.value.delete(fieldId)
    // Если ошибок больше нет, скрываем сообщение
    if (validationErrors.value.size === 0) {
      showValidationMessage.value = false
    }
  }
}

function prepareDataForSheets() {
  const data = {}

  // Для Google Sheets всегда используем русскую конфигурацию шагов,
  // чтобы заголовки колонок (и значения вариантов) были на русском,
  // независимо от языка, выбранного в UI.
  for (const step of stepsRu) {
    if (!step.sections) continue

    for (const section of step.sections) {
      if (!section.fields) continue

      for (const field of section.fields) {
        const value = form[field.id]

        // Пропускаем пустые значения
        if (value === '' || value === false || (Array.isArray(value) && value.length === 0)) {
          continue
        }

        // Русский label как имя колонки
        const columnName = field.label || field.id

        // Форматируем значение
        let formattedValue = value

        if (field.type === 'checkbox-multi' && Array.isArray(value)) {
          // Для checkbox-multi: конвертируем value в РУССКИЕ label
          const labels = value.map((val) => {
            const option = field.options?.find((opt) => opt.value === val)
            return option ? option.label : val
          })
          formattedValue = labels.join(', ')
        } else if (field.type === 'radio' && field.options) {
          // Для radio: находим РУССКИЙ label выбранной опции
          const option = field.options.find((opt) => opt.value === value)
          formattedValue = option ? option.label : value
        } else if (Array.isArray(value)) {
          formattedValue = value.join(', ')
        } else if (typeof value === 'boolean') {
          formattedValue = value ? 'Да' : 'Нет'
        }

        data[columnName] = formattedValue
      }
    }
  }

  // Добавляем дату отправки
  data['Дата отправки'] = new Date().toLocaleString('ru-RU')

  return data
}

async function handleSubmit() {
  if (!validateCurrentStep()) {
    showValidationMessage.value = true
    return
  }

  isSubmitting.value = true
  const sheetData = prepareDataForSheets()
  console.log('BRIEF DATA:', sheetData)

  try {
    // Замените на ваш URL Google Apps Script
    const GOOGLE_SCRIPT_URL =
      'https://script.google.com/macros/s/AKfycbxwadAg7RYHgs4cS_h8iuxwCmRtChsrws6yHmN1iEP9mruYFLiE8JZ8Oj5BvQw-Hwf4/exec'

    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sheetData),
    })

    // Небольшая задержка, чтобы данные успели записаться
    await new Promise((resolve) => setTimeout(resolve, 1000))

    sent.value = true
    isSubmitting.value = false
  } catch (error) {
    console.error('Ошибка отправки:', error)
    isSubmitting.value = false
    alert('Произошла ошибка при отправке. Пожалуйста, попробуйте снова.')
  }
}
</script>
