# Surveysaurus - REST API

## How To Run?

Below is the script you need to use to revoke the Rest API.

To install dependencies

```
npm install
```

To run the script

```
npm start
```

To restart for each change on project files (For developers only)

```
npm run dev
```

## How to Send Request ?


### Login

```
POST /api/user/login
```

Bu endpoint kullanıcı girişi için kullanılmalı

**Parameters:**

| Veri adı | Veri tipi | Zorunluluk | Açıklama                                                 |
| -------- | --------- | ---------- | -------------------------------------------------------- |
| email    | STRING    | EVET       | email formatında olmalı örn. example@example.com         |
| password | STRING    | EVET       | Bir büyük harf, bir küçük harf, bir nokta tavsiye edilir |

**Response:**

```javascript
[
    {
        accessToken: 'ey.....',
        data: {
            email: 'example@example.com',
            name: 'NAME SURNAME',
            gender: 'Male',
            city: 'CITY NAME',
            country: 'COUNTRY',
        },
        message: 'Giriş Yapıldı',
    },
]
```

---

### Register

```
POST /api/user/register
```

Bu endpoint kullanıcı kaydı için kullanılmalı

**Parameters:**

| Veri adı | Veri tipi | Zorunluluk | Açıklama                                                 |
| -------- | --------- | ---------- | -------------------------------------------------------- |
| userName | STRING    | EVET       | bu veri eşşiz (unique) olmalıdır                         |
| email    | STRING    | EVET       | email formatında olmalı örn. example@example.com         |
| password | STRING    | EVET       | Bir büyük harf, bir küçük harf, bir nokta tavsiye edilir |
| gender   | ENUM      | EVET       | seçenekler : male, famale                                |
| city     | STRING    | EVET       |                                                          |
| country  | STRING    | EVET       |                                                          |

**Response:**

```javascript
[
    {
        data: {},
        message: 'User oluşturuldu',
    },
]
```

---

### Create Survey

```
POST /api/survey/createSurvey
```

Bu endpoint anket oluşturmak için kullanılmalı

**Parameters:**

| Veri adı | Veri tipi | Zorunluluk | Açıklama                                                 |
| -------- | --------- | ---------- | -------------------------------------------------------- |
| title    | STRING    | EVET       | Sistemde kayıtlı olmayan ve eşsiz bir title olmalı |
| question | STRING    | EVET       | Soru içeriği |
| choice   | ARRAY       | EVET       | Example : ['Pizza' , 'Lahmacun']                                              |

**Response:**

```javascript
[
    {
        data: {},
        message: 'Survey created',
    },
]
```

### Fill Survey

```
POST /api/survey/fillSurvey
```

Bu endpoint anket oylamak için kullanılmalı

**Parameters:**

| Veri adı | Veri tipi | Zorunluluk | Açıklama                                                 |
| -------- | --------- | ---------- | -------------------------------------------------------- |
| title    | STRING    | EVET       |Veritabanında anketi bulmak için bu title kullanılıyor     |
| answer | NUMBER    | EVET       | Cevap index olarak gönderilmeli çünkü backend kodları buna göre ayarlanmıştır aksi takdirde sonuç hata olacaktır. |

**Response:**

```javascript
[
    {
        data: {},
        message: 'Survey filled',
    },
]
```

