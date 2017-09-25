window.onload = function() {
    // theme-color
    (function changeThemeColor() {
        let themeColor = document.getElementsByName('theme-color')[0];
        let topBar = document.getElementById('topBar');
        themeColor.content = window.getComputedStyle(topBar, null).backgroundColor;
    })();

    // 侧栏打开关闭
    document.getElementById('sideShadow').onclick = closeSidePage;
    document.getElementById('openSideButton').onclick = openSidePage;

    // 初始数据开始 ---------------------------------------------------------------
    let defaultToDo = [{
            id: 1505976370490,
            list: 'To-Do',
            text: '第一条待办事项',
            completed: new Date(1505977093181),
            creationDate: new Date(1505976370490),
            note: '这是一条备注',
        },
        {
            id: 1505976523907,
            list: 'To-Do',
            text: '第二条待办事项',
            completed: false,
            creationDate: new Date(1505976523907),
            note: '这是一条备注',
        }, {
            id: 1505976540205,
            list: '其它清单',
            text: '第一条其它待办事项',
            completed: false,
            creationDate: new Date(1505976540205),
            note: '这是一条备注',
        }
    ];

    let defaultList = ['To-Do', '其它清单'];

    if (!window.localStorage.list) window.localStorage.setItem('list', JSON.stringify(defaultList));
    if (!window.localStorage.ToDo) window.localStorage.setItem('ToDo', JSON.stringify(defaultToDo));

    // 初始数据结束 ---------------------------------------------------------------

    // 初始化清单列表
    createListUI();
    setSelected('To-Do');


    // 新建清单
    document.getElementById('addListContainer').onclick = function() {
        let newList = prompt('新建清单');
        if (newList) {
            addList(newList);
            updateListUI();
            setSelected(newList);
        }
    }

}