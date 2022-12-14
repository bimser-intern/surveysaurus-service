const { default: axios } = require('axios')
const { parseAsync } = require('json2csv')

const user = {
    token: '',
}

// ---------------------------------------------------------------------
const signIn = async ({ email, password }) => {
    const res = await axios.post('http://localhost:5500/api/user/login', {
        email,
        password,
    })

    const data = res.data

    console.log('==============================================================')
    console.log(`Status : ${res.status} \n data : ${JSON.stringify(res.data)}`)

    if (res.status === 200) {
        user.token = data.accessToken
    }
}

// ---------------------------------------------------------------------

const isFilledTest = async ({ title }) => {
    const res = await axios.post(
        'http://localhost:5500/api/survey/isfilled',
        {
            title,
        },
        {
            headers: {
                authorization: user.token,
            },
        }
    )

    const data = res.data

    console.log('==============================================================')
    console.log(`Status : ${res.status} \n data : ${JSON.stringify(res.data)}`)
}

// ----------------------------------------------------------------------

const signUp = async ({ userName, email, password, gender, city, country }) => {
    const res = await axios.post('http://localhost:5500/api/user/register', {
        userName,
        email,
        password,
        gender,
        city,
        country,
    })
    console.log('==============================================================')

    console.log(`Status : ${res.status} \n data : ${JSON.stringify(res.data)}`)
}

// ----------------------------------------------------------------------

const createSurvey = async ({ title, question, choice }) => {
    const res = await axios.post(
        'http://localhost:5500/api/survey/createSurvey',
        {
            title,
            question,
            choice,
        },
        {
            headers: {
                authorization: user.token,
            },
        }
    )
    console.log('==============================================================')
    console.log(`Status : ${res.status} \n data : ${JSON.stringify(res.data)}`)
}

// ----------------------------------------------------------------------

const fillSurvey = async ({ title, answer }) => {
    const res = await axios.post(
        'http://localhost:5500/api/survey/fillSurvey',
        {
            title,
            answer,
        },
        {
            headers: {
                authorization: user.token,
            },
        }
    )
    console.log('==============================================================')
    console.log(`Status : ${res.status} \n data : ${JSON.stringify(res.data)}`)
}

// ----------------------------------------------------------------------

const getSurveys = async ({}) => {
    const res = await axios.get('http://localhost:5500/api/user/mysurveys', {
        headers: {
            authorization: user.token,
        },
    })

    console.log(`Status : ${res.status} \n data : ${JSON.stringify(res.data)}`)
}

// ----------------------------------------------------------------------

const getSamples = async ({ count }) => {
    const res = await axios.get('http://localhost:5500/api/survey/sample?count=' + count, {})

    console.log(`Status : ${res.status} \n data : ${JSON.stringify(res.data)}`)
}
// ----------------------------------------------------------------------

const getAllSurveys = async ({ queue }) => {
    const res = await axios.get('http://localhost:5500/api/survey/allsurveys?queue=' + queue, {})

    console.log(`Status : ${res.status} \n data : ${JSON.stringify(res.data)}`)
}
// ----------------------------------------------------------------------

const getCountries = async () => {
    const res = await axios.get(
        'http://localhost:5500/api/user/countries',

        {}
    )
    console.log('==============================================================')
    console.log(`Status : ${res.status} \n data : ${JSON.stringify(res.data)}`)
}

// ----------------------------------------------------------------------

const getCities = async ({ country }) => {
    const res = await axios.post(
        'http://localhost:5500/api/user/cities',
        {
            country,
        },

        {}
    )
    console.log('==============================================================')
    console.log(`Status : ${res.status} \n data : ${JSON.stringify(res.data)}`)
}

// ----------------------------------------------------------------------

const getSurvey = async ({ title }) => {
    const res = await axios.post('http://localhost:5500/api/survey/getSurvey', {
        title,
    })
    console.log('==============================================================')
    console.log(`Status : ${res.status} \n data : ${JSON.stringify(res.data)}`)
}

// ----------------------------------------------------------------------

const creatorProfile = async ({ author }) => {
    const res = await axios.post('http://localhost:5500/api/survey/creatorProfile', {
        author,
    })
    console.log('==============================================================')
    console.log(`Status : ${res.status} \n data : ${JSON.stringify(res.data)}`)
}

// ----------------------------------------------------------------------

const getUserInfo = async ({}) => {
    const res = await axios.get('http://localhost:5500/api/profile/getinfo', {
        headers: {
            authorization: user.token,
        },
    })
    console.log('==============================================================')
    console.log(`Status : ${res.status} \n data : ${JSON.stringify(res.data)}`)
}

// ----------------------------------------------------------------------

const updateUserInfo = async ({ userName, email, city, country, gender }) => {
    const res = await axios.post(
        'http://localhost:5500/api/profile/update',
        {
            userName,
            email,
            city,
            country,
            gender,
        },

        {
            headers: {
                authorization: user.token,
            },
        }
    )
    console.log('==============================================================')
    console.log(`Status : ${res.status} \n data : ${JSON.stringify(res.data)}`)

    if (res.data.accessToken) {
        user.token = res.data.accessToken
    }
}

// ----------------------------------------------------------------------

const updatePass = async ({ oldPassword, newPassword }) => {
    const res = await axios.put(
        'http://localhost:5500/api/profile/updatepassword',
        {
            oldPassword,
            newPassword,
        },
        {
            headers: {
                authorization: user.token,
            },
        }
    )
    console.log('==============================================================')
    console.log(`Status : ${res.status} \n data : ${JSON.stringify(res.data)}`)
}

// ----------------------------------------------------------------------

const updateIcon = async ({ icon }) => {
    const res = await axios.put(
        'http://localhost:5500/api/profile/updateicon',
        {
            icon,
        },
        {
            headers: {
                authorization: user.token,
            },
        }
    )
    console.log('==============================================================')
    console.log(`Status : ${res.status} \n data : ${JSON.stringify(res.data)}`)
}

// ----------------------------------------------------------------------

const addComment = async ({ title, comment, parentID }) => {
    const res = await axios.post(
        'http://localhost:5500/api/comment/addcomment',
        {
            title,
            comment,
            parentID,
        },
        {
            headers: {
                authorization: user.token,
            },
        }
    )
    console.log('==============================================================')
    console.log(`Status : ${res.status} \n data : ${JSON.stringify(res.data)}`)
}

// ----------------------------------------------------------------------

const upVote = async ({ commentID }) => {
    const res = await axios.post(
        'http://localhost:5500/api/comment/upVote',
        {
            commentID,
        },
        {
            headers: {
                authorization: user.token,
            },
        }
    )
    console.log('==============================================================')
    console.log(`Status : ${res.status} \n data : ${JSON.stringify(res.data)}`)
}

// ----------------------------------------------------------------------

const report = async ({ commentID }) => {
    const res = await axios.post(
        'http://localhost:5500/api/comment/report',
        {
            commentID,
        },
        {
            headers: {
                authorization: user.token,
            },
        }
    )
    console.log('==============================================================')
    console.log(`Status : ${res.status} \n data : ${JSON.stringify(res.data)}`)
}

// ----------------------------------------------------------------------

const getComments = async ({ title }) => {
    const res = await axios.post(
        'http://localhost:5500/api/comment/comments',
        {
            title,
        },
        {
            headers: {
                authorization: user.token,
            },
        }
    )
    console.log('==============================================================')
    console.log(`Status : ${res.status} \n data : ${JSON.stringify(res.data)}`)
}

const getMap = async ({ title }) => {
    console.log("URL: "+'http://localhost:5500/api/map/getmap?title=' + title)
    const res = await axios.get('http://localhost:5500/api/map/getmap?title=' + title)
    console.log(res.data)
}

function sleep(n) {
    return new Promise((resolve) => setTimeout(resolve, n))
}

// ----------------------------------------------------------------------

const deleteComment = async ({ commentID }) => {
    const res = await axios.post(
        'http://localhost:5500/api/comment/delete',
        {
            commentID,
        },
        {
            headers: {
                authorization: user.token,
            },
        }
    )
    console.log('==============================================================')
    console.log(`Status : ${res.status} \n data : ${JSON.stringify(res.data)}`)
}

// ----------------------------------------------------------------------

const main = async () => {
    //await signIn({ email: 'eraydddd@gmail.com', password: 'Eray123.' })
    //await sleep(2000)
    //await signUp({userName:"Çatuğ", email:"nasadcnsof@sswhsaizli.email", password:"deneme",gender:"Male",city:"Bangkok",country:"Thailand"});
    /*await createSurvey({
        question: 'yeni anket denemesi',
        title: 'Dünyanın en güzel şehri anketi',
        choice: ['şık1', 'şık2', 'şık3'],
    })*/
    //await getSurveys({})
    //await updateIcon({icon: "bear"})
    // await getSamples({ count: 6 })
    //await isFilledTest({ title: 'yemek anketi' })
    //await fillSurvey({ title: 'animaldoyoulike', answer: 1 })
    //await getSurvey({ title: 'animaldoyoulike' })
    //await getAllSurveys({ queue: 15 })
    // await getCountries()
    // await getCities({ country: 'Turkey' })
    //await getUserInfo({})
    /*
    await updateUserInfo({
         email: 'eraydddd@gmail.com',
         userName: 'denme2156',
         city: 'Ankara',
         country: 'Turkey',
         gender: "Male",

     })
     */
    //await updatePass({ oldPassword: 'Eray123...', newPassword: 'Eray1245...' })
    /*
    await addComment({
        title: 'ankeet',
        comment: 'bu bir yorum denemesidir',
        //parentID: 53
    })
    */

    //await upVote({ commentID: 94 })

    //await getComments({ title: 'karadenizin en güzel şehirleri' })
    //await report({ commentID: 115 })
    // await getComments({ title: 'animaldoyoulike' })

    const query = encodeURIComponent('karadenizin en güzel şehirleri')

    await getMap({ title:query })
    //await deleteComment({commentID:128 })
    //await creatorProfile({author:"wiozeo"})
}
main()
    .then(() => {
        console.log('Finished')
    })
    .catch((err) => console.error(err))
