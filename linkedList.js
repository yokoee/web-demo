function Node(element) {
    this.element = element;
    this.next = null;
    this.prev = null;
}

// 单向链表
function singlyLList() {
    this.head = new Node('head');
    this.find = find;
    this.insert = insert;
    this.remove = remove;
    this.display = display;
    this.findPrev = findPrev;

    function find(item) {
        let currNode = this.head;
        while (currNode.element != item) {
            currNode = currNode.next;
        }
        return currNode;
    }

    function insert(newElement, item) {
        let newNode = new Node(newElement);
        let currNode = this.find(item);
        newNode.next = currNode.next;
        currNode.next = newNode;
    }

    function remove(item) {
        let prevNode = this.findPrev(item);
        let currNode = this.find(item);
        prevNode.next = currNode.next;
        currNode
    }

    function display() {
        let currNode = this.head;
        while (currNode.next != null) {
            console.log(currNode.next.element);
            currNode = currNode.next;
        }
    }

    function findPrev(item) {
        let currNode = this.head;
        while (currNode.next != null && currNode.next.element != item) {
            currNode = currNode.next;
        }
        return currNode;
    }
}

// 双向链表
function doubleLList() {
    this.head = new Node('head');
    this.find = find;
    this.insert = insert;
    this.remove = remove;
    this.display = display;
    this.findLast = findLast;
    // 反序display
    this.dispReverse = dispReverse;

    function find(item) {
        let currNode = this.head;
        while (currNode.element != item) {
            currNode = currNode.next;
        }
        return currNode;
    }

    function insert(newElement, item) {
        let newNode = new Node(newElement);
        let currNode = this.find(item);
        newNode.next = currNode.next;
        newNode.prev = currNode;
        currNode.next = newNode;
    }

    function remove(item) {
        let removeNode = this.find(item);
        if (removeNode.next != null) {
            removeNode.prev.next = removeNode.next;
            removeNode.next.prev = removeNode.prev;
            removeNode.prev = null;
            removeNode.next = null;
        }
    }

    function display() {
        let currNode = this.head;
        while (currNode.next != null) {
            console.log(currNode.next.element);
            currNode = currNode.next;
        }
    }

    function findLast() {
        let currNode = this.head;
        while (currNode.next != null) {
            currNode = currNode.next;
        }
        return currNode;
    }

    function dispReverse() {
        let currNode = this.findLast();
        while (currNode.element != 'head') {
            console.log(currNode.element);
            currNode = currNode.prev;
        }
    }
}