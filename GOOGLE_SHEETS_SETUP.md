# Настройка интеграции с Google Sheets

## Шаг 1: Создайте Google Таблицу

1. Откройте [Google Sheets](https://sheets.google.com)
2. Создайте новую таблицу
3. Назовите её, например: "Брифы дизайн интерьера"

## Шаг 2: Создайте Google Apps Script

1. В таблице откройте: **Расширения → Apps Script**
2. Удалите весь код в редакторе
3. Вставьте следующий код:

```javascript
function doPost(e) {
  // Логирование для отладки
  Logger.log('Получен POST запрос')

  try {
    // Проверяем наличие данных
    if (!e.postData || !e.postData.contents) {
      throw new Error('Нет данных в запросе')
    }

    Logger.log('Данные запроса: ' + e.postData.contents)

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet()
    const data = JSON.parse(e.postData.contents)

    Logger.log('Распарсенные данные: ' + JSON.stringify(data))

    // Получаем все заголовки из первой строки
    const lastCol = sheet.getLastColumn()
    let headers = []

    if (lastCol > 0) {
      headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0]
      // Фильтруем пустые заголовки
      headers = headers.filter((h) => h !== '')
    }

    Logger.log('Существующие заголовки: ' + JSON.stringify(headers))

    // Если таблица пустая или нет заголовков, создаем их из данных
    if (headers.length === 0) {
      headers = Object.keys(data)
      Logger.log('Создаем новые заголовки: ' + JSON.stringify(headers))

      sheet.getRange(1, 1, 1, headers.length).setValues([headers])

      // Форматируем заголовки
      sheet
        .getRange(1, 1, 1, headers.length)
        .setBackground('#4285f4')
        .setFontColor('#ffffff')
        .setFontWeight('bold')
        .setHorizontalAlignment('center')
        .setWrap(true)

      // Замораживаем первую строку
      sheet.setFrozenRows(1)
    } else {
      // Добавляем новые колонки, если есть новые поля
      const newHeaders = Object.keys(data).filter((key) => !headers.includes(key))
      if (newHeaders.length > 0) {
        Logger.log('Добавляем новые колонки: ' + JSON.stringify(newHeaders))
        const startCol = headers.length + 1
        sheet.getRange(1, startCol, 1, newHeaders.length).setValues([newHeaders])
        sheet
          .getRange(1, startCol, 1, newHeaders.length)
          .setBackground('#4285f4')
          .setFontColor('#ffffff')
          .setFontWeight('bold')
          .setHorizontalAlignment('center')
          .setWrap(true)
        headers = headers.concat(newHeaders)
      }
    }

    // Создаем массив значений в соответствии с порядком заголовков
    const row = headers.map((header) => {
      const value = data[header]
      // Преобразуем undefined и null в пустую строку
      return value !== undefined && value !== null ? String(value) : ''
    })

    Logger.log('Строка для добавления: ' + JSON.stringify(row))

    // Добавляем новую строку с данными
    sheet.appendRow(row)

    // Автоподбор ширины столбцов
    sheet.autoResizeColumns(1, headers.length)

    const lastRow = sheet.getLastRow()
    Logger.log('Данные добавлены в строку: ' + lastRow)

    return ContentService.createTextOutput(
      JSON.stringify({
        result: 'success',
        row: lastRow,
        message: 'Данные успешно добавлены',
      }),
    ).setMimeType(ContentService.MimeType.JSON)
  } catch (error) {
    Logger.log('ОШИБКА: ' + error.toString())
    Logger.log('Stack trace: ' + error.stack)

    return ContentService.createTextOutput(
      JSON.stringify({
        result: 'error',
        error: error.toString(),
        stack: error.stack,
      }),
    ).setMimeType(ContentService.MimeType.JSON)
  }
}

function doGet(e) {
  return ContentService.createTextOutput(
    'API работает. Используйте POST запрос для отправки данных.',
  )
}

// Тестовая функция для отладки
function testDoPost() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        'Ваше имя и фамилия:': 'Тест',
        'Номер телефона:': '1234567890',
        'Дата отправки': new Date().toLocaleString('ru-RU'),
      }),
    },
  }

  const result = doPost(testData)
  Logger.log('Результат теста: ' + result.getContent())
}
```

## Шаг 3: Тестируйте скрипт локально

Перед развертыванием протестируйте скрипт:

1. В редакторе выберите функцию `testDoPost` из выпадающего списка
2. Нажмите **Запустить** (▶)
3. При первом запуске разрешите доступ к Google Sheets
4. Проверьте логи: **Выполнение → Посмотреть логи выполнения**
5. Проверьте таблицу - должна появиться тестовая строка

## Шаг 4: Разверните скрипт

1. Нажмите **Развернуть → Новое развертывание**
2. Выберите тип: **Веб-приложение**
3. Настройки:
   - **Описание**: "API для брифов"
   - **Запуск от имени**: **Мой аккаунт** ← Важно!
   - **У кого есть доступ**: **Все** ← Важно!
4. Нажмите **Развернуть**
5. При первом развертывании:
   - Нажмите **Авторизовать доступ**
   - Выберите ваш аккаунт Google
   - Нажмите **Дополнительные настройки**
   - Нажмите **Перейти на страницу "[название проекта]" (небезопасно)**
   - Нажмите **Разрешить**
6. **Скопируйте URL веб-приложения** (он будет примерно таким: `https://script.google.com/macros/s/XXXXXXXXXX/exec`)

⚠️ **ВАЖНО**: Если вы обновляете код скрипта после развертывания:

1. Нажмите **Развернуть → Управление развертываниями**
2. Нажмите ✏️ (карандаш) рядом с развертыванием
3. В разделе **Версия** выберите **Новая версия**
4. Нажмите **Развернуть**

## Шаг 5: Вставьте URL в код

Откройте файл `src/views/Brief.vue` и замените:

```javascript
const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_SCRIPT_URL_HERE'
```

на ваш скопированный URL:

```javascript
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/XXXXXXXXXX/exec'
```

## Шаг 6: Проверка

1. Запустите ваше приложение
2. Заполните бриф
3. Отправьте форму
4. Проверьте Google Таблицу - должна появиться новая строка с данными

## Структура данных в таблице

Колонки будут автоматически созданы с названиями из `label` полей:

- Ваше имя и фамилия:
- Номер телефона:
- Адрес объекта:
- Тип:
- Уточните тип объекта (если выбрано "другое")
- Площадь (м²):
- Количество комнат:
- Состав семьи (пол / возраст):
- и т.д.
- Дата отправки

## Возможные проблемы и их решения

### Статус 302 или данные не появляются

**Это самая частая проблема!** Если запрос возвращает 302, но данные не появляются:

1. **Обновите развертывание**:
   - Apps Script → **Развернуть → Управление развертываниями**
   - Нажмите ✏️ рядом с активным развертыванием
   - **Версия** → выберите **Новая версия**
   - Нажмите **Развернуть**
   - **ВАЖНО**: URL останется тот же, менять в коде не нужно

2. **Проверьте логи выполнения**:
   - Apps Script → **Выполнение → Мои выполнения**
   - Найдите последнее выполнение doPost
   - Кликните на него, чтобы увидеть логи
   - Проверьте, есть ли ошибки

3. **Проверьте права доступа**:
   - Развертывание должно быть от имени **"Мой аккаунт"**
   - Доступ должен быть **"Все"**

4. **Тест через curl** (замените URL на свой):

```bash
curl -L 'https://script.google.com/macros/s/YOUR_ID/exec' \
  -X POST \
  -H 'Content-Type: application/json' \
  -d '{"Тест":"Данные","Дата":"2024-01-01"}'
```

### Ошибка CORS

Это **нормально** при использовании `mode: 'no-cors'`. Браузер блокирует чтение ответа, но запрос всё равно выполняется и данные сохраняются.

### Ошибка "Script function not found: doPost"

1. Убедитесь, что функция называется именно `doPost` (регистр важен)
2. Пересохраните скрипт
3. Создайте новое развертывание

### Не приходят некоторые поля

Проверьте функцию `prepareDataForSheets()` в `Brief.vue` - она должна правильно форматировать все поля.

### Отладка на стороне клиента

Откройте консоль браузера (F12) и проверьте:

```javascript
console.log('BRIEF DATA:', sheetData) // выведет данные перед отправкой
```

## Дополнительные возможности

### Добавление уведомлений по email

Добавьте в конец функции `doPost` (перед `return`):

```javascript
// Отправка email уведомления
MailApp.sendEmail({
  to: 'your-email@example.com',
  subject: 'Новый бриф от ' + data['Ваше имя и фамилия:'],
  body: 'Получен новый бриф. Проверьте таблицу: ' + SpreadsheetApp.getActiveSpreadsheet().getUrl(),
})
```

### Форматирование данных

Вы можете добавить дополнительное форматирование ячеек в скрипте, например:

- Выделение цветом определённых значений
- Добавление формул
- Условное форматирование
