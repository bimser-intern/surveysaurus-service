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

### **Get Survey**

```
GET /api/survey/getSurvey
```

Bu endpoint spesifik bir anketi almak için kullanılır
Geri dönüşteki counts dizisi seçeneklerin yüzdelik oranlarını verir

**Parameters:**

| Veri adı | Veri tipi | Zorunluluk | Açıklama                                    |
| -------- | --------- | ---------- | ------------------------------------------- |
| title    | STRING    | EVET       | Sistemde kayıtlı bir anketin title'ı olmalı |

**Response:**

```javascript
{
    data: {
        question: 'Which animals do you like most',
        choice: ['Gold Fish', 'Dog', 'Cat'],
        counts: [2,2,1],
        percent: [40,40,20]
    },
    message: 'Anket alındı',
}

```

### **Fill Survey**

```
GET /api/survey/fillSurvey
```

Bu endpoint belirli bir ankete oylama yapmak için kullanılmalı

**Parameters:**

| Veri adı | Veri tipi | Zorunluluk | Açıklama                                                                                    |
| -------- | --------- | ---------- | ------------------------------------------------------------------------------------------- |
| title    | STRING    | EVET       | Oylanacak anketin title'ını vermeniz gerekir. Title eşleştirme işlemi için kullanılacaktır. |
| answer   | NUMBER    | EVET       | Seçilen cevabın index numarası                                                              |

**Response:**

```javascript
{ data: {}, message: 'Survey filled' }

```

### **List Countries**

```
GET /api/user/countries
```

Bu endpoint Country listesi almak için kullanılır

**Parameters:**

| Veri adı | Veri tipi | Zorunluluk | Açıklama                                                 |
| -------- | --------- | ---------- | -------------------------------------------------------- |
|          |           |            | Bu endpointte parametre ve header vermenize gerek yoktur |

**Response:**

```javascript
{
    data: {
        surveys: [
            'Albania',
            'Algeria',
            'Andorra',
            'Angola',
            'Antigua And Barbuda',
            ...
        ],
    },
    message: 'Anketler alındı',
}

```

### **List Cities**

```
GET /api/user/countries
```

Bu endpoint City listesi almak için kullanılır

**Parameters:**

| Veri adı | Veri tipi | Zorunluluk | Açıklama          |
| -------- | --------- | ---------- | ----------------- |
| country  | STRING    | EVET       | example : Turkiye |

**Response:**

```javascript
 {
    data: {
        surveys: [
            'Adana',
            'Zonguldak',
            'Yozgat',
            'Yalova',
            'Ağrı',
            'Afyonkarahisar',
            'Adıyaman',
            ...
        ],
    },
    message: 'Şehirler alındı',
}


```

### **Get User Info**

```
POST /api/profile/getinfo
```

Bu endpoint kullanıcının bilgilerini almak için kullanılır

**Parameters:**

| Veri adı | Veri tipi | Zorunluluk | Açıklama                                                 |
| -------- | --------- | ---------- | -------------------------------------------------------- |
|  |     |        |Bu endpointte parametre ve header vermenize gerek yoktur      |

**Response:**

```javascript
;[
    {
        data: {
            email: 'example@example.com',
            name: 'NAME SURNAME',
            gender: 'Male',
            city: 'CITY NAME',
            country: 'COUNTRY',
        },
        message: 'Kullanıcı bilgileri gönderildi',
    },
]
```

---

### **Update User Info**

```
POST /api/profile/update
```

Bu endpoint kullanıcı bilgilerinin güncellenmesi için kullanılır

**Parameters:**

| Veri adı | Veri tipi | Zorunluluk | Açıklama                                                 |
| -------- | --------- | ---------- | -------------------------------------------------------- |
| userName | STRING   | EVET      | bu veri eşşiz (unique) olmalıdır                        |
| email    | STRING   | EVET      | email formatında olmalı örn. example@example.com         |
| password | STRING   | EVET      | Bir büyük harf, bir küçük harf, bir nokta tavsiye edilir |
| gender   | ENUM     | EVET      | seçenekler : male, famale                                |
| city     | STRING   | EVET      |                                                          |
| country  | STRING   | EVET      |                                                          |

**Response:**

```javascript
;[
    {
        accessToken: 'ey.....',
        data: {},
        message: 'Kullanıcı bilgileri güncellendi',
    },
]
```

---

### **Get Comments**

```
GET /api/comment/get
```

Bu endpoint spesifik bir anketin yorumlarını çekmek için kullanılır

**Parameters:**

| Veri adı | Veri tipi | Zorunluluk | Açıklama                                                 |
| -------- | --------- | ---------- | -------------------------------------------------------- |
| title | STRING   | EVET      | Anket başlığı gönderilir                         |
                                                       

**Response:**

```javascript
;[
    {
        data: {
            comments: [
            {
                commentID: 476,
                writer: "Kullanıcı Adı",
                comment: "Bu kullanıcının yorumudur",
                upvote: 10,
                report: 2,
            },
            {
                commentID: 477,
                writer: "İkinci kullanıcı adı",
                comment: "Bu başka kullanıcının yorumudur",
                upvote: 2,
                report: 5
            }
        ]
        },
        message: 'Yorumlar döndürüldü',
    },
]
```

---



### **Add Comment**

```
POST /api/comment/add
```

Bu endpoint ankete yorum yapmak için kullanılır

**Parameters:**

| Veri adı | Veri tipi | Zorunluluk | Açıklama                                                 |
| -------- | --------- | ---------- | -------------------------------------------------------- |
| title | STRING   | EVET      | Anket başlığı gereklidir |
| comment | STRING   | EVET      | Yorum metni gereklidir |
| parentID | NUMBER   | HAYIR    | Yoruma yorum yapılacaksa bu parametre gönderilir |
                                                       

**Response:**

```javascript
;[
    {
        data: {
            commentID : 478
        },
        message: 'Yorum eklendi',
    },
]
```

---





### **Upvote Comment**

```
POST /api/comment/upvote
```

Bu endpoint yoruma oy vermek için kullanılır

**Parameters:**

| Veri adı | Veri tipi | Zorunluluk | Açıklama                                                 |
| -------- | --------- | ---------- | -------------------------------------------------------- |
| commentID | NUMBER   | EVET      | Yorum ID'si gereklidir |

                                                       

**Response:**

```javascript
;[
    {
        data: {
        },
        message: 'Upvote eklendi',
    },
]
```

---



### **Report Comment**

```
POST /api/comment/report
```

Bu endpoint yorumu şikayet etmek için kullanılır

**Parameters:**

| Veri adı | Veri tipi | Zorunluluk | Açıklama                                                 |
| -------- | --------- | ---------- | -------------------------------------------------------- |
| commentID | NUMBER   | EVET      | Yorum ID'si gereklidir |

                                                       

**Response:**

```javascript
;[
    {
        data: {
            reportcount : 5 // 10
        },
        message: 'Report eklendi' // 'Yorum silindi',
    },
]
```

---