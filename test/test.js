const { default: axios } = require('axios')

const user = {
    token: '',
}
const signIn = async ({ email, password }) => {
    const res = await axios.post('http://localhost:5500/api/user/login', {
        email,
        password,
    })

    const data = res.data

    console.log(
        '=============================================================='
    )
    console.log(`Status : ${res.status} \n data : ${JSON.stringify(res.data)}`)

    if (res.status === 200) {
        user.token = data.accessToken
    }
}

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

    console.log(
        '=============================================================='
    )
    console.log(`Status : ${res.status} \n data : ${JSON.stringify(res.data)}`)
}

const signUp = async ({ userName, email, password, gender, city, country }) => {
    const res = await axios.post('http://localhost:5500/api/user/register', {
        userName,
        email,
        password,
        gender,
        city,
        country,
    })
    console.log(
        '=============================================================='
    )

    console.log(`Status : ${res.status} \n data : ${res.data}`)
}

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
    console.log(
        '=============================================================='
    )
    console.log(`Status : ${res.status} \n data : ${res.data}`)
}

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
    console.log(
        '=============================================================='
    )
    console.log(`Status : ${res.status} \n data : ${JSON.stringify(res.data)}`)
}

const getSurveys = async ({}) => {
    const res = await axios.get('http://localhost:5500/api/user/mysurveys', {
        headers: {
            authorization: user.token,
        },
    })

    console.log(`Status : ${res.status} \n data : ${JSON.stringify(res.data)}`)
}

const getSamples = async ({}) => {
    const res = await axios.get('http://localhost:5500/api/survey/sample', {})

    console.log(`Status : ${res.status} \n data : ${JSON.stringify(res.data)}`)
}

const getCountries = async () => {
    const res = await axios.get(
        'http://localhost:5500/api/user/countries',

        {}
    )
    console.log(
        '=============================================================='
    )
    console.log(`Status : ${res.status} \n data : ${JSON.stringify(res.data)}`)
}

const getCities = async ({ country }) => {
    const res = await axios.post(
        'http://localhost:5500/api/user/cities',
        {
            country,
        },

        {}
    )
    console.log(
        '=============================================================='
    )
    console.log(`Status : ${res.status} \n data : ${JSON.stringify(res.data)}`)
}

const getSurvey = async ({ title }) => {
    const res = await axios.post('http://localhost:5500/api/survey/getSurvey', {
        title,
    })
    console.log(
        '=============================================================='
    )
    console.log(`Status : ${res.status} \n data : ${JSON.stringify(res.data)}`)
}

const getUserInfo = async ({}) => {
    const res = await axios.get('http://localhost:5500/api/profile/getinfo', {
    })
    console.log(
        '=============================================================='
    )
    console.log(`Status : ${res.status} \n data : ${JSON.stringify(res.data)}`)
}

const updateUserInfo = async ({ userName, email, city, country}) => {
    const res = await axios.post('http://localhost:5500/api/profile/update', {
        userName,
        email,
        city,
        country
    })
    console.log(
        '=============================================================='
    )
    console.log(`Status : ${res.status} \n data : ${JSON.stringify(res.data)}`)
}

const updatePass = async ({ oldPassword, newPassword }) => {
    const res = await axios.put('http://localhost:5500/api/profile/updatepassword', {
        oldPassword, 
        newPassword
    })
    console.log(
        '=============================================================='
    )
    console.log(`Status : ${res.status} \n data : ${JSON.stringify(res.data)}`)
}


const main = async () => {
    await signIn({ email: 'felat@gmail.com', password: 'Felat123.' })

    // await createSurvey({
    //     question: 'En sevilen şehir hangisidir? ',
    //     title: 'En Çok Sevilen Şehirler',
    //     choice: ['Ankara', 'İstanbul', 'İzmir'],
    // })
    // await getSurveys({})
    //await getSamples({})
    //await signUp();
    // await isFilledTest({ title: 'yemek anketi' })
    // await fillSurvey({ title: 'animaldoyoulike', answer: 1 })
    //await getSurvey({ title: 'animaldoyoulike' })
    // await getCountries()
    // await getCities({ country: 'Turkey' })
    await getUserInfo({})
    //await updateUserInfo({email:"felat@gmail.com", userName: "felat", city: "Ankara", country:"Turkey"})
    //await updatePass({oldPassword:"Felat123.", newPassword:"felat"})
}
main()
    .then(() => {
        console.log('Finished')
    })
    .catch((err) => console.error(err))
