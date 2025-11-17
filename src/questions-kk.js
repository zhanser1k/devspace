// Kazakh version of steps, structure and ids must fully match `questions.js`

export const stepsKk = [
  {
    id: 1,
    title: 'Қадам 1. Жалпы ақпарат',
    description: '',
    sections: [
      {
        id: 'step1-main',
        fields: [
          {
            id: 'fullName',
            label: 'Атыңыз және тегіңіз:',
            type: 'text',
            placeholder: 'Мысалы: Алихан Тохтаров',
            required: true,
          },
          {
            id: 'phone',
            label: 'Телефон нөмірі:',
            type: 'tel',
            placeholder: '+7...',
            required: true,
          },
          {
            id: 'address',
            label: 'Нысанның мекенжайы:',
            type: 'text',
            placeholder: 'Қала, көше, үй, пәтер',
            required: true,
          },
          {
            id: 'objectType',
            label: 'Түрі:',
            type: 'radio',
            required: true,
            options: [
              { value: 'квартира', label: 'пәтер' },
              { value: 'дом', label: 'үй' },
              { value: 'другое', label: 'басқа' },
            ],
          },
          {
            id: 'objectTypeOther',
            label: 'Нысан түрін нақтылаңыз',
            type: 'text',
            placeholder: 'Мысалы: таунхаус, апартаменттер',
            required: true,
            showIf: {
              fieldId: 'objectType',
              equals: 'другое',
            },
          },
          {
            id: 'area',
            label: 'Ауданы (м²):',
            type: 'number',
            placeholder: '',
            required: true,
          },
          {
            id: 'roomsCount',
            label: 'Бөлмелер саны:',
            type: 'number',
            placeholder: '',
            required: true,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Қадам 2. Пәтерде кім тұрады',
    sections: [
      {
        id: 'step2-main',
        fields: [
          {
            id: 'family',
            label: 'Отбасы құрамы (жынысы / жасы):',
            type: 'textarea',
            placeholder: 'Мысалы: әйелім, 30; ерім, 32; қызым, 5',
            required: true,
          },
          {
            id: 'pets',
            label: 'Үй жануарлары бар ма?',
            type: 'textarea',
            placeholder: 'Мысалы: мысық, ит / жоқ',
            required: true,
          },
          {
            id: 'futurePets',
            label:
              'Алда үй жануарын алуды жоспарлайсыз ба? Иә болса — нені ескеру керек? (төсекше, су ішетін ыдыс және т.б.)',
            type: 'textarea',
            placeholder:
              'Мысалы: ит алуды жоспарлап отырмыз, төсекше үшін орын қажет',
            required: true,
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'Қадам 3. Өмір салты',
    description: 'Сіз үшін өзекті нәрселерді белгілеңіз:',
    sections: [
      {
        id: 'step3-main',
        fields: [
          {
            id: 'lifestyle',
            label: 'Өмір салты',
            type: 'checkbox-multi',
            options: [
              {
                value: 'place_and_order',
                label: 'Әрқайсысының өз орны және тәртібі болуы маңызды',
              },
              {
                value: 'guests_and_parties',
                label: 'Қонақтарды және кештерді жақсы көреміз',
              },
              {
                value: 'early_birds',
                label: 'Ерте тұрамыз (бозторғайлар)',
              },
              {
                value: 'night_owls',
                label: 'Кеш жатамыз (жапалақтар)',
              },
              {
                value: 'different_time',
                label: 'Барлығы әртүрлі уақытта тұрады',
              },
              {
                value: 'dine_together',
                label: 'Таңғы/кешкі асты бірге ішеміз',
              },
              {
                value: 'rarely_cook',
                label: 'Демде сирек тамақ дайындаймыз',
              },
              {
                value: 'home_sport',
                label: 'Үйде спортпен шұғылдануға орын қажет',
              },
              {
                value: 'work_corner',
                label: 'Толыққанды жұмыс бұрышы қажет',
              },
              {
                value: 'collections',
                label: 'Коллекциялар бар (пластинкалар, фигуралар және т.б.)',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 4,
    title: 'Қадам 4. Стиль және атмосфера',
    sections: [
      {
        id: 'step4-main',
        fields: [
          {
            id: 'antiPreferences',
            label:
              'Қандай түстерді, материалдарды немесе элементтерді мүлдем көргіңіз келмейді?',
            type: 'textarea',
          },
          {
            id: 'referenceExamples',
            label:
              'Ұнайтын интерьер үлгілері бар ма? (сілтемелер, Pinterest және т.б.)',
            type: 'textarea',
          },
          {
            id: 'dreams',
            label: 'Орындауды қалайтын ерекше тілектеріңіз немесе армандарыңыз бар ма?',
            type: 'textarea',
            placeholder:
              'Мысалы: подиумдағы төсек, камин, үлкен гардероб бөлмесі',
          },
        ],
      },
    ],
  },
  {
    id: 5,
    title: 'Қадам 5. Бөлмелер және приоритеттер',
    sections: [
      {
        id: 'living-room',
        title: 'Қонақ бөлме',
        fields: [
          { id: 'livingRoom_sofa', label: 'Диван', type: 'checkbox' },
          { id: 'livingRoom_tvZone', label: 'ТД аймағы', type: 'checkbox' },
          {
            id: 'livingRoom_storage',
            label: 'Сақтау (стеллаждар, жабық шкафта)',
            type: 'checkbox',
          },
          {
            id: 'livingRoom_armchairs',
            label: 'Кресло / пуфтар',
            type: 'checkbox',
          },
          {
            id: 'livingRoom_projector',
            label: 'Үй кинотеатры / проектор',
            type: 'checkbox',
          },
          {
            id: 'livingRoom_console',
            label: 'Ойын приставкасы',
            type: 'checkbox',
          },
          {
            id: 'livingRoom_notImportant',
            label: 'Маңызды емес / кейін талқылаймыз',
            type: 'checkbox',
          },
        ],
      },
      {
        id: 'kitchen',
        title: 'Ас үй',
        fields: [
          { id: 'kitchen_island', label: 'Асүй аралы', type: 'checkbox' },
          {
            id: 'kitchen_lotsOfStorage',
            label: 'Көп сақтау орны',
            type: 'checkbox',
          },
          {
            id: 'kitchen_openShelves',
            label: 'Ашық сөрелер',
            type: 'checkbox',
          },
          {
            id: 'kitchen_wineCabinet',
            label: 'Шарап шкафы',
            type: 'checkbox',
          },
          {
            id: 'kitchen_minimalCooking',
            label: 'Тамақты аз дайындаймыз — минималды аймақ жеткілікті',
            type: 'checkbox',
          },
        ],
      },
      {
        id: 'bedroom',
        title: 'Жатын бөлме',
        fields: [
          {
            id: 'bedroom_bedSize',
            label: 'Төсек өлшемі:',
            type: 'radio',
            required: true,
            options: [
              { value: '1600', label: '1600' },
              { value: '1800', label: '1800' },
              { value: '2000', label: '2000' },
              { value: 'другое', label: 'басқа' },
            ],
          },
          {
            id: 'bedroom_bedSizeOther',
            label: 'Төсек өлшемін нақтылаңыз',
            type: 'text',
            placeholder: 'Мысалы: 1400х2000',
            required: true,
            showIf: {
              fieldId: 'bedroom_bedSize',
              equals: 'другое',
            },
          },
          {
            id: 'bedroom_storage',
            label: 'Сақтау / гардероб бөлме',
            type: 'checkbox',
          },
          {
            id: 'bedroom_tvProjector',
            label: 'ТД / проектор',
            type: 'checkbox',
          },
          {
            id: 'bedroom_workplace',
            label: 'Жұмыс орны',
            type: 'checkbox',
          },
          {
            id: 'bedroom_minimal',
            label: 'Артық ештеңе жоқ, тек ұйқыға арналған',
            type: 'checkbox',
          },
        ],
      },
      {
        id: 'bathroom',
        title: 'Жуыну бөлмесі',
        fields: [
          { id: 'bathroom_bath', label: 'Ванна', type: 'checkbox' },
          { id: 'bathroom_shower', label: 'Душ', type: 'checkbox' },
          { id: 'bathroom_installation', label: 'Инсталляция', type: 'checkbox' },
          { id: 'bathroom_storage', label: 'Сақтау', type: 'checkbox' },
          { id: 'bathroom_towelDryer', label: 'Сүлгі кептіргіш', type: 'checkbox' },
          { id: 'bathroom_bidet', label: 'Биде', type: 'checkbox' },
          {
            id: 'bathroom_hygienicShower',
            label: 'Гигиеналық душ',
            type: 'checkbox',
          },
        ],
      },
      {
        id: 'kids-room',
        title: 'Балалар бөлмесі (егер өзекті болса)',
        fields: [
          { id: 'kidsRoom_bed', label: 'Төсек', type: 'checkbox' },
          { id: 'kidsRoom_playZone', label: 'Ойын аймағы', type: 'checkbox' },
          {
            id: 'kidsRoom_studyPlace',
            label: 'Оқу / сабақ оқу орны',
            type: 'checkbox',
          },
          { id: 'kidsRoom_storage', label: 'Шкафтар / сөрелер', type: 'checkbox' },
          { id: 'kidsRoom_tv', label: 'ТД', type: 'checkbox' },
          {
            id: 'kidsRoom_changingTable',
            label: 'Жөргек ауыстыратын үстел',
            type: 'checkbox',
          },
        ],
      },
    ],
  },
  {
    id: 6,
    title: 'Қадам 6. Техникалық мәселелер',
    sections: [
      {
        id: 'step6-main',
        fields: [
          {
            id: 'smartHome',
            label: '«Ақылды үй» жүйесін орнатуды жоспарлайсыз ба?',
            type: 'radio',
            required: true,
            options: [
              { value: 'да', label: 'Иә' },
              { value: 'нет', label: 'Жоқ' },
              { value: 'под вопросом', label: 'Әзірге белгісіз' },
            ],
          },
          {
            id: 'security',
            label:
              'Су ағуларынан қорғаныс, дабыл, бейне домофон қажет пе?',
            type: 'textarea',
            placeholder: 'Нақты не жоспарлап отырғаныңызды жазыңыз',
          },
          {
            id: 'airConditioning',
            label: 'Кондиционер орнатыла ма?',
            type: 'radio',
            required: true,
            options: [
              { value: 'везде', label: 'Иә, барлық жерде' },
              { value: 'спальня', label: 'Тек жатын бөлмеде' },
              { value: 'гостиная', label: 'Тек қонақ бөлмеде' },
              { value: 'не думали', label: 'Әзірге ойлаған жоқпыз' },
            ],
          },
          {
            id: 'floorHeating',
            label: 'Еденді жылыту:',
            type: 'radio',
            required: true,
            options: [
              { value: 'санузлы', label: 'Тек жуыну бөлмелерінде' },
              { value: 'кухня и прихожая', label: 'Ас үй және кіреберіс' },
              {
                value: 'везде с плиткой',
                label: 'Плитка төселген барлық жерде',
              },
              { value: 'нет', label: 'Жоқ' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 7,
    title: 'Қадам 7. Мерзімдер және бюджет',
    sections: [
      {
        id: 'step7-main',
        fields: [
          {
            id: 'startDate',
            label: 'Жобаны қашан бастағыңыз келеді?',
            type: 'text',
            placeholder: 'Мысалы: 2026 наурызы / мүмкіндігінше тезірек',
            required: true,
          },
          {
            id: 'endDate',
            label: 'Жөндеуді / көшуіңізді қашан аяқтағыңыз келеді?',
            type: 'text',
            placeholder: 'Мысалы: 2026 жылдың соңына дейін',
            required: true,
          },
          {
            id: 'budgetType',
            label: 'Бюджет бойынша шектеу бар ма?',
            type: 'radio',
            required: true,
            options: [
              { value: 'нет', label: 'Жоқ' },
              { value: 'да', label: 'Иә' },
              { value: 'обсудим позже', label: 'Кейін талқылаймыз' },
            ],
          },
          {
            id: 'budgetComment',
            label: 'Бюджет бойынша түсіндірме *',
            type: 'textarea',
            required: true,
            showIf: {
              fieldId: 'budgetType',
              equals: 'да',
            },
          },
          {
            id: 'btiPlan',
            label: 'БТИ жоспары / өлшемдері бар ма?',
            type: 'radio',
            required: true,
            options: [
              { value: 'да', label: 'Иә' },
              { value: 'нет', label: 'Жоқ' },
            ],
          },
          {
            id: 'decisionMaker',
            label: 'Соңғы шешімді кім қабылдайды?',
            type: 'text',
            placeholder: 'Мысалы: мен / жұбайым(зайыбым) / ата-аналар',
            required: true,
          },
          {
            id: 'importantNotes',
            label: 'Білу маңызды ерекше жайттар бар ма?',
            type: 'textarea',
            placeholder:
              'Әдеттер, денсаулық, аллергия, алдыңғы жөндеу тәжірибесі және т.б.',
          },
        ],
      },
    ],
  },
]


