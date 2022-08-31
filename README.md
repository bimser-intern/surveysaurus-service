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
            point: 240
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

Bu endpoint kullanıcı kaydı için kullanılmalı.
Kullanıcı hesap açtıpı anda 30 puan kazanır

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
Survey oluşturulduğunda oluşturan kullanıcıya 20 puan eklenir.


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

**Not: Header'da token gönderilmelidir.**

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
                percent: [30.9, 11.6, 57.5]
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
                percent: [6.6, 27.3, 66.1]
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
                counts: [3, 2, 5],
                title: "En Çok Sevilen Şehirler",
                choices: ["Ankara", "İstanbul", "İzmir"]
                percent: [30.0, 20.0, 50.0]
                author: "sefa",
                icon: "bear"
            },
            {
                question: "hangi yemeği daha çok seviyorunuz",
                counts: [1, 2],
                choices: ["pizza", "lahmacun"],
                title: "yemek anketi"
                percent: [33.3, 66.7]
                author: "sefa",
                icon: "bear"
            }
        ]
    },
    message: "Survey Listed"
}

```
### **All Surveys**

```
GET /api/survey/allsurveys?queue=x
```

Bu endpoint all surveys sayfasında gösterilecek anketleri almak için kullanılmalı.
all surveys sayfasına ilk girişte queue değeri için 0 gönderilir, kullanıcı her show more tuşuna bastığında, bu sayı 1 arttırılarak gönderilir.
yeni sonuç onceki sonuçların sonuna eklenmelidir.
Linkteki x değeri yerine queue değeri yerleştirilir.



**Parameters:**

| Veri adı | Veri tipi | Zorunluluk | Açıklama                                                        |
| -------- | --------- | ---------- | --------------------------------------------------------------- |
| queue    | NUMBER    |  EVET      | Show more tıklanma sayısıdır queryde yollanır                   |

**Response:**

```javascript
{
    data: {
        surveys: [
            {
                question: "En sevilen şehir hangisidir? ",
                counts: [3, 2, 5],
                title: "En Çok Sevilen Şehirler",
                choices: ["Ankara", "İstanbul", "İzmir"]
                percent: [30.0, 20.0, 50.0]
                author: "sefa",
                icon: "bear"
            },
            {
                question: "hangi yemeği daha çok seviyorunuz",
                counts: [1, 2],
                choices: ["pizza", "lahmacun"],
                title: "yemek anketi"
                percent: [33.3, 66.7]
                author: "sefa",
                icon: "bear"
            }
        ]
    },
    message: "Survey Listed Succesfully"
}

```
### **Creators Profile**

```
POST /api/survey/creatorProfile
```

Bu endpoint farklı bir kullanıcının panelinin gösterilmesi için kullanılır.



**Parameters:**

| Veri adı | Veri tipi | Zorunluluk | Açıklama                                                        |
| -------- | --------- | ---------- | --------------------------------------------------------------- |
| author   | STRİNG    |  EVET      | Anket yazarının kullanıcı adıdır.                               |

**Response:**

```javascript
{
   "data":{
      "point":70,
      "surveycount":2,
      "surveys":[
         {
            "question":"en se di\n\n\nen sevdiğin spor",
            "counts":[
               0,
               0,
               0
            ],
            "choices":[
               "futbol",
               "basketbol",
               "voleybol"
            ],
            "title":"spor"
         },
      ]
   },
   "message":"User profile returned"
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
        "question": 'Which animals do you like most',
        "choice": ['Gold Fish', 'Dog', 'Cat'],
        "counts": [2,2,1],
        "percent": [40,40,20]
    },
    message: 'Anket alındı',
}

```

### **Is Filled**

```
POST /api/survey/isfilled
```

Bu endpoint bir anketin kullanıcı tarafından doldurulup doldurulmadığını, doldurulduysa da verilen cevabı görmek için kullanılır. Get Survey ile birlikte kullanıcı giriş yaptıysa kullanılması tavsiye edilir.

**Parameters:**

| Veri adı | Veri tipi | Zorunluluk | Açıklama                                    |
| -------- | --------- | ---------- | ------------------------------------------- |
| title    | STRING    | EVET       | Sistemde kayıtlı bir anketin title'ı olmalı |

**Not: Header'da token gönderilmelidir.**

**Response:**

```javascript
{
    data:{"choice":0},
    message:"Anket daha önce işaretlenmiş"
}

```

### **Fill Survey**

```
GET /api/survey/fillSurvey
```

Bu endpoint belirli bir ankete oylama yapmak için kullanılmalı
Bu endpoint çalıştırılıp ankete her oylama yapıldığında anket sahibine 5 puan eklenir ve her 100 doldurmada ekstra 50 puan verilir.

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
POST /api/user/cities
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
        cities: [
            'Adana',
            'Adıyaman',
            'Afyonkarahisar',
            'Ağrı',
            .
            .
            'Yalova',
            'Yozgat',
            'Zonguldak',
            ...
        ],
    },
    message: 'Şehirler alındı',
}


```

### **Get User Info**

```
GET /api/profile/getinfo
```

Bu endpoint kullanıcının bilgilerini almak için kullanılır

**Parameters:**

| Veri adı | Veri tipi | Zorunluluk | Açıklama                                                 |
| -------- | --------- | ---------- | -------------------------------------------------------- |
|          |           |            | Bu endpointte parametre ve header vermenize gerek yoktur |

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
            point: 250,
            icon: "polar"
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

| Veri adı | Veri tipi | Zorunluluk | Açıklama                                         |
| -------- | --------- | ---------- | ------------------------------------------------ |
| userName | STRING    | EVET       | bu veri eşşiz (unique) olmalıdır                 |
| email    | STRING    | EVET       | email formatında olmalı örn. example@example.com |
| city     | STRING    | EVET       |                                                  |
| country  | STRING    | EVET       |                                                  |

**Response:**

```javascript
;[
    {
        accessToken: 'ey.....',
        data: {},
        message: 'User informations updated successfully',
    },
]
```
---

### **Update User Icon**

```
PUT /api/profile/updateicon
```

Bu endpoint kullanıcı iconunun güncellenmesi için kullanılır

**Parameters:**

| Veri adı | Veri tipi | Zorunluluk | Açıklama                                         |
| -------- | --------- | ---------- | ------------------------------------------------ |
| icon     | STRING    | EVET       | kullanıcının seçtiği ikonun adıdıdır             |

**NOT: Headerda token gönderilmelidir**


**Response:**

```javascript
;[
    {
        data: {},
        message: 'Icon updated successfully',
    },
]
```

---

### **Update User Password**

```
PUT /api/profile/updatepassword
```

Bu endpoint kullanıcı parolasının güncellenmesi için kullanılır

**Parameters:**

| Veri adı    | Veri tipi | Zorunluluk | Açıklama                                                 |
| ----------- | --------- | ---------- | -------------------------------------------------------- |
| oldPassword | STRING    | EVET       | Kullanıcının eski parolası gereklidir                    |
| newPassword | STRING    | EVET       | Bir büyük harf, bir küçük harf, bir nokta tavsiye edilir |

**Response:**

```javascript
;[
    {
        data: {},
        message: 'Password updated',
    },
]
```

---

### **Get Comments**

```
GET /api/comment/comments
```

Bu endpoint spesifik bir anketin yorumlarını çekmek için kullanılır. Token gönderilirse kullanıcının silebileceği yorumlarda deletable değeri true döner.
Commentler beğeni sırasına göre sıralanmaktadır.

**Parameters:**

| Veri adı | Veri tipi | Zorunluluk | Açıklama                 |
| -------- | --------- | ---------- | ------------------------ |
| title    | STRING    | EVET       | Anket başlığı gönderilir |

**Not: Header'da token gönderilebilir (isteğe bağlıdır)**

**Response:**

```javascript
;[
    {
        data: {
            comments: [
                {
                    report: 0,
                    commentID: 4,
                    comment: 'Süper bir anket',
                    surveytitle: 'bestie',
                    time: {
                        year: 2022,
                        month: 8,
                        day: 23,
                        hour: 0,
                        minute: 15,
                        second: 45,
                        nanosecond: 275127000,
                        timeZoneOffsetSeconds: 10800,
                    },
                    upvote: 0,
                    author: 'felat',
                    deletable:true
                },
                .
                .
                .
            ],
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

| Veri adı | Veri tipi | Zorunluluk | Açıklama                                         |
| -------- | --------- | ---------- | ------------------------------------------------ |
| title    | STRING    | EVET       | Anket başlığı gereklidir                         |
| comment  | STRING    | EVET       | Yorum metni gereklidir                           |
| parentID | NUMBER    | HAYIR      | Yoruma yorum yapılacaksa bu parametre gönderilir |

**Response:**

```javascript
;[
    {
        data: {
            commentID: 478,
        },
        message: 'Yorum eklendi',
    },
]
```

---

### **Delete Comment**

```
POST /api/comment/delete
```

Bu endpoint yorum silmek için kullanılır.
Yorum sadece yorum sahibinin token'ı gönderilirse silinir.
Bir yorumun silinmesi halinde o yorumun tüm alt yorumları da silinir.

**Parameters:**

| Veri adı  | Veri tipi | Zorunluluk | Açıklama                                        |
| --------- | --------- | ---------- | ----------------------------------------------- |
| commentID | NUMBER    | EVET       | Silinecek yorumun comment ID değeri gereklidir. |

**NOT:Header'da token gönderilmesi gereklidir.**

**Response:**

```javascript
;[
    {
        data: {},
        message: 'Comment deleted successfully',
    },
]
```

---

### **Upvote Comment**

```
POST /api/comment/upvote
```

Bu endpoint yoruma oy vermek için kullanılır.
Eğer önceden upvote verildiyse tekrar tıklanması halinde upvote geri alınır.

**Parameters:**

| Veri adı  | Veri tipi | Zorunluluk | Açıklama               |
| --------- | --------- | ---------- | ---------------------- |
| commentID | NUMBER    | EVET       | Yorum ID'si gereklidir |

**Response:**

```javascript
;[
    {
        data: {},
        message: 'Upvote eklendi',
    },
]
```

### **Report Comment**

```
POST /api/comment/report
```

Bu endpoint yorumu şikayet etmek için kullanılır.
Eğer önceden report yapıldıysa tekrar tıklanması halinde report geri alınır.
Kullanıcı kendi yorumuna report vermeye çalışır ise bu işlem geçersiz sayılır.
Yorum 10. report'a ulaştığında otomatik olarak silinir.

**Parameters:**

| Veri adı  | Veri tipi | Zorunluluk | Açıklama               |
| --------- | --------- | ---------- | ---------------------- |
| commentID | NUMBER    | EVET       | Yorum ID'si gereklidir |

**Response:**

```javascript
;[
    {
        data: {
            reportcount: 5, // -1
        },
        message: 'Reported successfully', // 'Comment deleted',
    },
]
```

### **Get Map**

```
POST /api/map/getmap
```

Bu endpoint anket ile ilgili geomap istatistiklerini kullanıcıya verir.

**Parameters:**

| Veri adı | Veri tipi | Zorunluluk | Açıklama                   |
| -------- | --------- | ---------- | -------------------------- |
| title    | STRING    | EVET       | Anket başlığı verilmelidir |

**Response:**

```javascript
{
  data: {
    csv: 'countryname,countrycode,bestindex,bestchoice\n' +
      'Turkey,TUR,0,samsun\n' +
      'Germany,DEU,1,trabzon\n' +
      'France,FRA,2,rize'
  },
  message: 'Map Values listed successfully'
}
```

#### Not

Bu endpoint sonucunu en güzel kullanmak için d3 kütüphanesini kullanmalısınız.

-   [Ana kütüphane linki](https://www.npmjs.com/package/d3)
-   [Component kütüphane linki](https://d3-graph-gallery.com/index.html)
