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

istek atabilmek için zorunlu bazı headerların kullanılması gerekir aşağıdaki rotaya uyarak hareket edebilirsiniz.

| Header Adı    | Veri tipi | Açıklama                                                                                                                                                                                                                                                                |
| ------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| authorization | STRING    | ey... ile başalayan bir jwt tokeni olmalıdır. örnek : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c\* **Not : Login ve Register için gerekli değildir !** |

### **Login**

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
;[
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

### **Register**

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
;[
    {
        data: {},
        message: 'User oluşturuldu',
    },
]
```

---

### **Create Survey**

```
POST /api/survey/createSurvey
```

Bu endpoint anket oluşturmak için kullanılmalı

**Parameters:**

| Veri adı | Veri tipi | Zorunluluk | Açıklama                                           |
| -------- | --------- | ---------- | -------------------------------------------------- |
| title    | STRING    | EVET       | Sistemde kayıtlı olmayan ve eşsiz bir title olmalı |
| question | STRING    | EVET       | Soru içeriği                                       |
| choice   | ARRAY     | EVET       | Example : ['Pizza' , 'Lahmacun']                   |

**Response:**

```javascript
;[
    {
        data: {},
        message: 'Survey created',
    },
]
```

### **Fill Survey**

```
POST /api/survey/fillSurvey
```

Bu endpoint anket oylamak için kullanılmalı

**Parameters:**

| Veri adı | Veri tipi | Zorunluluk | Açıklama                                                                                                          |
| -------- | --------- | ---------- | ----------------------------------------------------------------------------------------------------------------- |
| title    | STRING    | EVET       | Veritabanında anketi bulmak için bu title kullanılıyor                                                            |
| answer   | NUMBER    | EVET       | Cevap index olarak gönderilmeli çünkü backend kodları buna göre ayarlanmıştır aksi takdirde sonuç hata olacaktır. |

**Response:**

```javascript
;[
    {
        data: {},
        message: 'Survey filled',
    },
]
```

### **List User Surveys**

```
GET /api/user/mysurveys
```

Bu endpoint kişinin kendi anketlerini göstermek için kullanılmalı

**Parameters:**

| Veri adı | Veri tipi | Zorunluluk | Açıklama                                     |
| -------- | --------- | ---------- | -------------------------------------------- |
|          |           |            | Not : Bu bölümde parametreye ihtiyaç yoktur. |

**Response:**

```javascript
{
    data: {
    mysurveys: [
            {
                title: "En Güzel Şehir Yarışması",
                question: "En güzel şehir hangisidir?",
                choices: [
                    "Ankara",
                    "İstanbul",
                    "İzmir"
                ],
                count: [
                    120,
                    45,
                    223
                ]
            },
            {
                title: "En Güzel Yemek Yarışması",
                question: "En güzel yemek hangisidir?",
                choices: [
                    "Döner",
                    "Lahmacun",
                    "Kebap"
                ],
                count: [
                    1241,
                    5123,
                    12414
                ]
            }
        ]
    },
    message: "User Survey is listed"

}

```

### **List Sample Surveys**

```
GET /api/survey/sample
```

Bu endpoint Homepage sayfasında örnek gösterilecek anketleri almak için kullanılmalı

**Parameters:**

| Veri adı | Veri tipi | Zorunluluk | Açıklama                                                        |
| -------- | --------- | ---------- | --------------------------------------------------------------- |
| count    | NUMBER    | HAYIR      | URL in devamında örnekteki gibi eklenmeli ?count=5, default : 3 |

**Response:**

```javascript
{
    data: {
        surveys: [
            {
                question: "En sevilen şehir hangisidir? ",
                counts: [0, 0, 0],
                title: "En Çok Sevilen Şehirler",
                choices: ["Ankara", "İstanbul", "İzmir"]
            },
            {
                question: "hangi yemeği daha çok seviyorunuz",
                counts: [0, 1],
                choices: ["pizza", "lahmacun"],
                title: "yemek anketi"
            }
        ]
    },
    message: "Survey filled"
}

```
