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

    console.log(`Status : ${res.status} \n data : ${res.data}`)
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
    console.log(`Status : ${res.status} \n data : ${res.data}`)
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

const getSamples = async ({}) => {
    const res = await axios.get('http://localhost:5500/api/survey/sample', {})

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

const updateUserInfo = async ({ userName, email, city, country }) => {
    const res = await axios.post(
        'http://localhost:5500/api/profile/update',
        {
            userName,
            email,
            city,
            country,
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
    const d3 = await import('d3')

    const res = await axios.post('http://localhost:5500/api/map/getmap', {
        title,
    })
    console.log(res.data)
}

function sleep(n) {
    return new Promise((resolve) => setTimeout(resolve, n))
}

// ----------------------------------------------------------------------

const main = async () => {
    //await signIn({ email: 'apertek1@gmail.com', password: '12345678' })
    //await sleep(2000)
    //await signUp({userName:"Sefa Can Pehlivan", email:"sefacan779@gmail.com", password:"sefa123",gender:"Male",city:"Bangkok",country:"Thailand"});
    //await createSurvey({
    //    question: 'denemeee',
    //     title: 'denemeee',
    //     choice: ['şık1', 'şık2', 'şık3'],
    // })
    // await getSurveys({})
    //await getSamples({})
    // await isFilledTest({ title: 'yemek anketi' })
    //await fillSurvey({ title: 'animaldoyoulike', answer: 0 })
    //await getSurvey({ title: 'animaldoyoulike' })
    // await getCountries()
    // await getCities({ country: 'Turkey' })
    // await getUserInfo({})
    // await updateUserInfo({
    //     email: 'test1@gmail.com',
    //     userName: 'felat',
    //     city: 'Ankara',
    //     country: 'Turkey',
    // })
    // await getUserInfo({})

    // await updatePass({ oldPassword: 'Felat123.', newPassword: 'felat' })
    /*
    await addComment({
        title: 'fhklşm',
        comment: 'alt yorum 3',
        parentID: 17
    })
*/

    //await getComments({ title: 'bestie' })

    //await upVote({ commentID: 9 })
    //await report({ commentID: 2 })
    await getMap({ title: 'karadenizin en güzel şehirleri' })
}
main()
    .then(() => {
        console.log('Finished')
    })
    .catch((err) => console.error(err))
