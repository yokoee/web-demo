// theme-color
(function changeThemeColor() {
    let themeColor = document.getElementsByName('theme-color')[0];
    let topBar = document.getElementById('topBar');
    themeColor.content = window.getComputedStyle(topBar, null).backgroundColor;
})();

// 侧栏打开关闭
document.getElementById('sideShadow').onclick = closeSidePage;
document.getElementById('openSideButton').onclick = openSidePage;

function closeSidePage() {
    let sideContent = document.getElementById('sideContent');
    let sideShadow = document.getElementById('sideShadow');
    let sidePage = document.getElementById('sidePage');

    sideContent.style.animation = 'slide-in 0.2s ease-in';
    sideContent.style.animationFillMode = 'forwards';
    sideShadow.style.animation = 'slide-in-shadow 0.2s ease-in';
    sideShadow.style.animationFillMode = 'forwards';
    setTimeout(() => {
        sidePage.style.display = 'none';
    }, 300)
}

function openSidePage() {
    let sideContent = document.getElementById('sideContent');
    let sideShadow = document.getElementById('sideShadow');
    let sidePage = document.getElementById('sidePage');

    sidePage.style.display = 'block';
    sideContent.style.animation = 'slide-out 0.2s ease-out';
    sideContent.style.animationFillMode = 'forwards';
    sideShadow.style.animation = 'slide-out-shadow 0.2s ease-in';
    sideShadow.style.animationFillMode = 'forwards';
}


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


// 数据操作开始 ---------------------------------------------------------------
function addList(name) {
    let list = JSON.parse(window.localStorage.list);
    if (list.indexOf(name) == -1) {
        list.push(name);
        window.localStorage.setItem('list', JSON.stringify(list));
        return 'add list ' + name + ' success!';
    } else {
        return 0;
    }
}

function delList(name) {
    let list = JSON.parse(window.localStorage.list);
    let ToDo = JSON.parse(window.localStorage.ToDo);

    let index = list.indexOf(name);
    if (index != -1) {
        list.splice(index, 1);

        for (var i = ToDo.length - 1; i >= 0; i--) {
            if (ToDo[i].list == name) ToDo.splice(i, 1);
        }
        window.localStorage.setItem('list', JSON.stringify(list));
        window.localStorage.setItem('ToDo', JSON.stringify(ToDo));
        return 'delete list ' + name + ' success!';
    } else {
        return 0;
    }
}

function updateList(oldName, newName) {
    let list = JSON.parse(window.localStorage.list);
    let ToDo = JSON.parse(window.localStorage.ToDo);
    if (!newName) return 0;

    let index = list.indexOf(oldName);
    if (index != -1) {
        list[index] = newName;

        ToDo.forEach((e) => {
            if (e.list == oldName) e.list = newName;
        });
        window.localStorage.setItem('list', JSON.stringify(list));
        window.localStorage.setItem('ToDo', JSON.stringify(ToDo));
        return oldName + ' rename to ' + newName;
    } else {
        return 0;
    }
}

function addItem(args) {
    let list = JSON.parse(window.localStorage.list);
    let ToDo = JSON.parse(window.localStorage.ToDo);

    if (!args.text) {
        return 0;
    } else {
        if (args.list && list.indexOf(args.list) == -1) addList(args.list);
        ToDo.push(setItem(args));
        window.localStorage.setItem('ToDo', JSON.stringify(ToDo));
        return 1;
    }
}

function delItem(id) {
    let ToDo = JSON.parse(window.localStorage.ToDo);
    for (var i = 0; i < ToDo.length; i++) {
        if (ToDo[i].id == id) {
            ToDo.splice(i, 1);
            break;
        }
    }
    window.localStorage.setItem('ToDo', JSON.stringify(ToDo));
}

function updateItem(id, args) {
    let ToDo = JSON.parse(window.localStorage.ToDo);
    ToDo.forEach((e) => {
        if (e.id == id) {
            Object.assign(e, args);
            e.creationDate = new Date();
        }
    })
    window.localStorage.setItem('ToDo', JSON.stringify(ToDo));
}

function setItem(args) {
    let now = new Date();
    if (!args.id) args.id = now.getTime();
    if (!args.list) args.list = 'To-Do';
    if (!args.text) args.text = '';
    if (!args.completed) args.completed = false;
    if (!args.creationDate) args.creationDate = now;
    if (!args.note) args.note = '';
    return args;
}

// 数据操作结束 ---------------------------------------------------------------

// 设置选中清单
function setSelected(name) {
    let selected = document.getElementsByClassName('selected');
    for (var i = 0; i < selected.length; i++) {
        selected[i].className = selected[i].className.replace('selected', '');
    }
    let willSelected = document.getElementById(name);
    willSelected.className += ' selected';
}

// 初始化清单列表开始 ---------------------------------------------------------------
createListUI();
setSelected('To-Do');

function updateListUI() {
    let listContainer = document.getElementById('listContainer');
    while (listContainer.firstChild) listContainer.removeChild(listContainer.firstChild);
    createListUI();
}

function createListUI() {
    let listContainer = document.getElementById('listContainer');
    let list = JSON.parse(window.localStorage.list)
    list.forEach((e) => {
        let li = document.createElement('li');
        li.id = e;
        li.className = 'list other';
        let icon = document.createElement('i');
        let text = document.createTextNode(e);
        li.appendChild(icon);
        li.appendChild(text);
        li.setAttribute('onclick', 'changeSelected(this)');
        listContainer.appendChild(li);
    });
}
// 初始化清单列表结束 ---------------------------------------------------------------

// 初始化待办事项列表
//
//

// 新建清单
document.getElementById('addListContainer').onclick = function() {
    let newList = prompt('新建清单');
    if (newList) {
        addList(newList);
        updateListUI();
        setSelected(newList);
        // 待办事项列表更新 ----------------------------------------------------------------------------------
        // 待办事项列表更新 ----------------------------------------------------------------------------------
    }
}

// 切换清单
function changeSelected(that) {
    setSelected(that.id);
    closeSidePage();
    document.getElementById('Text').textContent = that.id;

}