const Mock = require('mockjs')

Mock.setup({ timeout: 1000 });

// router

// /login
Mock.mock(new RegExp('/login'), 'post', function(options) {
    let passed = false;
    if (options.body == 'username=bing&password=password') {
        return {
            statusCode: 200,
            token: Mock.Random.natural(),
        }
    } else {
        return { statusCode: 401 }
    }
});

// /logout
Mock.mock(new RegExp('/logout'), 'get', function() {
    return { statusCode: 200 }
});

// /regster
Mock.mock(new RegExp('/register'), 'post', function(options) {
    return { statusCode: 200 }
});

// /userinfo
Mock.mock(new RegExp('/userinfo'), 'post', function(options) {
    return {
        statusCode: 200,
        avatar: './static/img/avatar-bing.png'
    }
})

// /diary

// /diary
Mock.mock(new RegExp('/diary'), 'post', function(options) {
    return Mock.mock({
        statusCode: 200,
        username: 'bing',
        'count': 50,
        'diaries|3-12': [{
            'id|1356998400000-1511525072484': 1,
            'date|1356998400000-1511525072484': 1,
            'text|2-50': '这是一条日记',
            'mood|1': ['开心', '平静', '伤心'],
            'moodColor|1': ['#11A5F7', '#A3A9A0', '#DD2C00'],
            'weather|1': ['晴', '阴', '雨', '风', '雪'],
        }],
        dates: {
            'months': [1, 3, 6, 8, 9, 10, 11, 12],
            'years': [2017, 2016, 2015, 2014],
        }
    })
})

// /diary/:id 获取单条日记
Mock.mock(new RegExp('/diary/*'), 'post', function(options) {
    return {
        statusCode: 200,
        diary: {
            'id|1356998400000-1511525072484': 1,
            'date|1356998400000-1511525072484': 1,
            'text|2-50': '这是一条日记',
            'mood|1': ['开心', '平静', '伤心'],
            'moodColor|1': ['#11A5F7', '#A3A9A0', '#DD2C00'],
            'weather|1': ['晴', '阴', '雨', '风', '雪'],
            'img|0-3': ['./static/img/diary-img.jpg'],
        }
    }
})

// /diary/:id 删除单条日记
Mock.mock(new RegExp('/diary/*'), 'delete', function(options) {
    return {
        statusCode: 200
    }
})

// /diary/add 新增一条日记
Mock.mock(new RegExp('/diary/add'), 'post', function(options) {
    return {
        statusCode: 200
    }
})


/* let moodColor = {
    'happy': '#00E676',
    'calm': '#90A4AE',
    'sad': '#DD2C00'
} */