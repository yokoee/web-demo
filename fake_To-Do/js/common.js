// 关闭侧栏
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

// 打开侧栏    
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

// 清单列表界面
function updateListUI() {
    let listContainer = document.getElementById('listContainer');
    while (listContainer.firstChild) listContainer.removeChild(listContainer.firstChild);
    createListUI();
}

function createListUI() {
    let listContainer = document.getElementById('listContainer');
    let list = JSON.parse(window.localStorage.list);
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

// 待办事项列表界面
function createTodoUI(list) {
    list = list || 'To-Do';
    let todoContainer = document.getElementById('todoContainer');
    let todos = JSON.parse(window.localStorage.ToDo).reverse();
    todos.forEach((e) => {
        if (e.list == list) {
            let div = document.createElement('div');
            div.id = e.id;
            div.className = e.completed ? 'todo checked' : 'todo unchecked';
            div.setAttribute('onclick', 'toggleChecked(this)');
            let i = document.createElement('i');
            i.className = 'checkBtn';
            let p = document.createElement('p');
            p.textContent = e.text;
            p.className = 'checkP';
            div.appendChild(i);
            div.appendChild(p);
            todoContainer.appendChild(div);
        }
    });
}

function updateTodoUI(list) {
    let todoContainer = document.getElementById('todoContainer');
    while (todoContainer.firstChild) todoContainer.removeChild(todoContainer.firstChild);
    createTodoUI(list);
}


// 切换清单
function changeSelected(that) {
    setSelected(that.id);
    closeSidePage();
    document.getElementById('Text').textContent = that.id;
}

// 切换已完成/未完成状态
function toggleChecked(that) {
    if (that.className.indexOf('unchecked') != -1) {
        that.className = 'todo checked';
        updateItem(that.id, { completed: new Date() })
    } else {
        that.className = 'todo unchecked';
        updateItem(that.id, { completed: false })
    }

}

// 设置选中清单
function setSelected(list) {
    let selected = document.getElementsByClassName('selected');
    for (var i = 0; i < selected.length; i++) {
        selected[i].className = selected[i].className.replace('selected', '');
    }
    let willSelected = document.getElementById(list);
    willSelected.className += ' selected';
    document.getElementById('Text').textContent = list;
    updateTodoUI(list);
}

// 搜索按钮点击
function clickSearchBtn() {
    let searchButton = document.getElementById('searchButton');
    searchButton.onclick = function() {
        alert('这个按钮罢工了😆');
    }
}
clickSearchBtn();


// menu键打开关闭菜单
(function() {
    let menu = document.getElementById('menu');
    let menuList = document.getElementById('menuList');
    menu.onclick = function() {
        if (menuList.style.display == 'block') {
            menuList.style.display = 'none';
        } else {
            menuList.style.display = 'block';
        }
    }
})()

// menu菜单项

function menuAction() {
    let menuRenameList = document.getElementById('menuRenameList');
    let menuDelList = document.getElementById('menuDelList');

    menuRenameList.onclick = function() {
        let oldName = document.getElementsByClassName('selected')[0].textContent;
        if (oldName == "To-Do") {
            alert('不能修改To-Do哦');
            return;
        }
        let newName = prompt('编辑清单');
        if (newName) {
            updateList(oldName, newName);
            updateListUI();
            setSelected(newName);
        }
    }

    menuDelList.onclick = function() {
        let listName = document.getElementsByClassName('selected')[0].textContent;
        if (listName == 'To-Do') {
            alert('不能删除To-Do哦');
            return;
        }
        delList(listName);
        updateListUI();
        setSelected('To-Do');
    }
}
menuAction();