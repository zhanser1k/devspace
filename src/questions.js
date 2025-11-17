// src/questions.js

export const steps = [
  {
    id: 1,
    title: "Шаг 1. Общая информация",
    description: "",
    sections: [
      {
        id: "step1-main",
        fields: [
          {
            id: "fullName",
            label: "Ваше имя и фамилия:",
            type: "text",
            placeholder: "Иван Иванов",
            required: true,
          },
          {
            id: "phone",
            label: "Номер телефона:",
            type: "tel",
            placeholder: "+7...",
            required: true,
          },
          {
            id: "address",
            label: "Адрес объекта:",
            type: "text",
            placeholder: "Город, улица, дом, квартира",
            required: true,
          },
          {
            id: "objectType",
            label: "Тип:",
            type: "radio",
            required: true,
            options: [
              {
                value: "квартира", label: "квартира"
              },
              {
                value: "дом", label: "дом"
              },
              {
                value: "другое", label: "другое"
              },
            ],
          },
          {
            id: "objectTypeOther",
            label: "Уточните тип объекта",
            type: "text",
            placeholder: "Например: таунхаус, апартаменты",
            required: true,
            showIf: {
              fieldId: "objectType", equals: "другое"
            },
          },
          {
            id: "area",
            label: "Площадь (м²):",
            type: "number",
            placeholder: "",
            required: true,
          },
          {
            id: "roomsCount",
            label: "Количество комнат:",
            type: "number",
            placeholder: "",
            required: true,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Шаг 2. Кто живёт в квартире",
    sections: [
      {
        id: "step2-main",
        fields: [
          {
            id: "family",
            label: "Состав семьи (пол / возраст):",
            type: "textarea",
            placeholder: "Например: жена, 30; муж, 32; дочь, 5",
            required: true,
          },
          {
            id: "pets",
            label: "Есть ли домашние животные?",
            type: "textarea",
            placeholder: "Например: кот, собака / нет",
            required: true,
          },
          {
            id: "futurePets",
            label: "Планируются ли питомцы? Если да — что важно учесть? (лежанка, поилки и т.д.)",
            type: "textarea",
            placeholder: "Например: планируем собаку, нужна зона для лежанки",
            required: true,
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Шаг 3. Образ жизни",
    description: "Отметьте, что для вас актуально:",
    sections: [
      {
        id: "step3-main",
        fields: [
          {
            id: "lifestyle",
            label: "Образ жизни",
            type: "checkbox-multi",
            options: [
              {
                value: "place_and_order",
                label: "У каждого должно быть своё место и порядок",
              },
              {
                value: "guests_and_parties",
                label: "Мы любим гостей и вечеринки",
              },
              {
                value: "early_birds", label: "Встаем рано (жаворонки)"
              },
              {
                value: "night_owls", label: "Ложимся поздно (совы)"
              },
              {
                value: "different_time",
                label: "Все встают в разное время",
              },
              {
                value: "dine_together",
                label: "Все завтракаем/ужинаем вместе",
              },
              {
                value: "rarely_cook", label: "Почти не готовим"
              },
              {
                value: "home_sport",
                label: "Нужна домашняя зона для спорта",
              },
              {
                value: "work_corner",
                label: "Нужен полноценный рабочий уголок",
              },
              {
                value: "collections",
                label: "Есть коллекции (пластинки, фигурки и т.д.)",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Шаг 4. Стиль и атмосфера",
    sections: [
      {
        id: "step4-main",
        fields: [
          {
            id: "antiPreferences",
            label: "Какие цвета, материалы или элементы вы категорически НЕ хотите видеть?",
            type: "textarea",
          },
          {
            id: "referenceExamples",
            label: "Есть ли примеры интерьеров, которые нравятся? (ссылки, Pinterest и т.д.)",
            type: "textarea",
          },
          {
            id: "dreams",
            label: "Есть ли пожелания или мечты, которые хочется реализовать?",
            type: "textarea",
            placeholder: "Например: кровать на подиуме, камин, большая гардеробная",
          },
        ],
      },
    ],
  },
  {
    id: 5,
    title: "Шаг 5. Помещения и приоритеты",
    sections: [
      {
        id: "living-room",
        title: "Гостиная",
        fields: [
          {
            id: "livingRoom_sofa", label: "Диван", type: "checkbox"
          },
          {
            id: "livingRoom_tvZone", label: "ТВ-зона", type: "checkbox"
          },
          {
            id: "livingRoom_storage",
            label: "Хранение (стеллажи, закрытые шкафы)",
            type: "checkbox",
          },
          {
            id: "livingRoom_armchairs", label: "Кресла / пуфы", type: "checkbox"
          },
          {
            id: "livingRoom_projector",
            label: "Домашний кинотеатр / проектор",
            type: "checkbox",
          },
          {
            id: "livingRoom_console",
            label: "Игровая консоль",
            type: "checkbox",
          },
          {
            id: "livingRoom_notImportant",
            label: "Неважно / обсудим позже",
            type: "checkbox",
          },
        ],
      },
      {
        id: "kitchen",
        title: "Кухня",
        fields: [
          {
            id: "kitchen_island", label: "Остров", type: "checkbox"
          },
          {
            id: "kitchen_lotsOfStorage",
            label: "Много хранения",
            type: "checkbox",
          },
          {
            id: "kitchen_openShelves",
            label: "Открытые полки",
            type: "checkbox",
          },
          {
            id: "kitchen_wineCabinet",
            label: "Винный шкаф",
            type: "checkbox",
          },
          {
            id: "kitchen_minimalCooking",
            label: "Не готовим — нужна минимальная зона",
            type: "checkbox",
          },
        ],
      },
      {
        id: "bedroom",
        title: "Спальня",
        fields: [
          {
            id: "bedroom_bedSize",
            label: "Размер кровати:",
            type: "radio",
            required: true,
            options: [
              {
                value: "1600", label: "1600"
              },
              {
                value: "1800", label: "1800"
              },
              {
                value: "2000", label: "2000"
              },
              {
                value: "другое", label: "другое"
              },
            ],
          },
          {
            id: "bedroom_bedSizeOther",
            label: "Уточните размер кровати",
            type: "text",
            placeholder: "Например: 1400х2000",
            required: true,
            showIf: {
              fieldId: "bedroom_bedSize", equals: "другое"
            },
          },
          {
            id: "bedroom_storage",
            label: "Хранение / гардеробная",
            type: "checkbox",
          },
          {
            id: "bedroom_tvProjector",
            label: "ТВ / проектор",
            type: "checkbox",
          },
          {
            id: "bedroom_workplace",
            label: "Рабочее место",
            type: "checkbox",
          },
          {
            id: "bedroom_minimal",
            label: "Нет ничего лишнего, только сон",
            type: "checkbox",
          },
        ],
      },
      {
        id: "bathroom",
        title: "Санузел",
        fields: [
          {
            id: "bathroom_bath", label: "Ванна", type: "checkbox"
          },
          {
            id: "bathroom_shower", label: "Душ", type: "checkbox"
          },
          {
            id: "bathroom_installation", label: "Инсталляция", type: "checkbox"
          },
          {
            id: "bathroom_storage", label: "Хранение", type: "checkbox"
          },
          {
            id: "bathroom_towelDryer",
            label: "Полотенцесушитель",
            type: "checkbox",
          },
          {
            id: "bathroom_bidet",
            label: "Биде",
            type: "checkbox",
          },
          {
            id: "bathroom_hygienicShower",
            label: "Гигиенический душ",
            type: "checkbox",
          },
        ],
      },
      {
        id: "kids-room",
        title: "Детская (если актуально)",
        fields: [
          {
            id: "kidsRoom_bed", label: "Кровать", type: "checkbox"
          },
          {
            id: "kidsRoom_playZone",
            label: "Игровая зона",
            type: "checkbox",
          },
          {
            id: "kidsRoom_studyPlace",
            label: "Место для учебы",
            type: "checkbox",
          },
          {
            id: "kidsRoom_storage", label: "Шкафы / полки", type: "checkbox"
          },
          {
            id: "kidsRoom_tv", label: "ТВ", type: "checkbox"
          },
          {
            id: "kidsRoom_changingTable",
            label: "Пеленальный стол",
            type: "checkbox",
          },
        ],
      },
    ],
  },
  {
    id: 6,
    title: "Шаг 6. Технические моменты",
    sections: [
      {
        id: "step6-main",
        fields: [
          {
            id: "smartHome",
            label: "Планируете ли установку системы «умный дом»?",
            type: "radio",
            required: true,
            options: [
              {
                value: "да", label: "Да"
              },
              {
                value: "нет", label: "Нет"
              },
              {
                value: "под вопросом", label: "Под вопросом"
              },
            ],
          },
          {
            id: "security",
            label: "Нужна ли защита от протечек, сигнализация, видеодомофон?",
            type: "textarea",
            placeholder: "Опишите, что именно планируете",
          },
          {
            id: "airConditioning",
            label: "Будет ли кондиционирование?",
            type: "radio",
            required: true,
            options: [
              {
                value: "везде", label: "Да, везде"
              },
              {
                value: "спальня", label: "Только в спальне"
              },
              {
                value: "гостиная", label: "Только в гостиной"
              },
              {
                value: "не думали", label: "Пока не думали"
              },
            ],
          },
          {
            id: "floorHeating",
            label: "Утепление полов:",
            type: "radio",
            required: true,
            options: [
              {
                value: "санузлы", label: "Только санузлы"
              },
              {
                value: "кухня и прихожая", label: "Кухня и прихожая"
              },
              {
                value: "везде с плиткой",
                label: "Везде где есть плитка",
              },
              {
                value: "нет", label: "Нет"
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 7,
    title: "Шаг 7. Сроки и бюджет",
    sections: [
      {
        id: "step7-main",
        fields: [
          {
            id: "startDate",
            label: "Когда хотите начать проект?",
            type: "text",
            placeholder: "Например: март 2026 / как можно скорее",
            required: true,
          },
          {
            id: "endDate",
            label: "Когда хотите завершить ремонт / переезд?",
            type: "text",
            placeholder: "Например: до конца 2026 года",
            required: true,
          },
          {
            id: "budgetType",
            label: "Есть ли ограничение по бюджету?",
            type: "radio",
            required: true,
            options: [
              {
                value: "нет", label: "Нет"
              },
              {
                value: "да", label: "Да"
              },
              {
                value: "обсудим позже", label: "Обсудим позже"
              },
            ],
          },
          {
            id: "budgetComment",
            label: "Комментарий по бюджету *",
            type: "textarea",
            required: true,
            showIf: {
              fieldId: "budgetType", equals: "да"
            },
          },
          {
            id: "btiPlan",
            label: "Есть ли уже план БТИ / обмеры?",
            type: "radio",
            required: true,
            options: [
              {
                value: "да", label: "Да"
              },
              {
                value: "нет", label: "Нет"
              },
            ],
          },
          {
            id: "decisionMaker",
            label: "Кто принимает финальные решения?",
            type: "text",
            placeholder: "Например: я / супруг(а) / родители",
            required: true,
          },
          {
            id: "importantNotes",
            label: "Есть ли важные нюансы, о которых нужно знать?",
            type: "textarea",
            placeholder: "Особые привычки, здоровье, аллергии, опыт предыдущего ремонта и т.д.",
          },
        ],
      },
    ],
  },
]