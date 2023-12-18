function setList() {
    // Get the inputted array and turn into array
    var list = document.getElementById('list').value.split(",")
    const len = list.length

    for (let i = 0; i < len; i ++) {
        var item = list[i]
        
        if (isNaN(item) || parseInt(item, 10) != item || item != Math.abs(item)) {
            alert("only valid integers bromie")
            
            return
        }

        if (item.includes(" ")) {
            list[i] = item.replace(/\s/g, '')
        }

        else if (item == "") {
            list.splice(i, 1)
        }
    }

    makeList(list)
}

function setRandList() {
    const max = 9999
    const n = document.getElementById('randLen').value
    var list = []
    
    // Three checks for a valid integer:
    // 1. Is a number, using isNaN because type is a string due to being from an input
    // 2. Is an integer, comparing parsed to original
    // 3. Is positive, comparing abs to original
    if (isNaN(n) || parseInt(n, 10) != n || n != Math.abs(n)) {
        alert("Invalid number of elements, please enter a valid positive integer")

        return
    }

    if (n > max + 1) {
        alert("You may only have a maximum of " + max + " elements.")

        return
    }


    for (let i = 0; i < n; i ++) {
        const value = Math.floor(Math.random() * (max + 1))

        if (!list.includes(value)) {
            list.push(value)
        }
        else {
            i --
        }
    }
    document.getElementById('list').value = JSON.stringify(list).substring(1, JSON.stringify(list).length-1)
    makeList(list)
}

function makeList(list) {
    const container = document.getElementById("listContainer")

    container.innerHTML = null

    for (let i in list){
        var item = document.createElement("div")
        item.id = "item" + list[i]
        item.classList.add("tester")
        item.innerHTML = list[i]
        item.style.order = i
        container.append(item)
    }
}

// var switchFrames = [
//     { transform: "translate(0px, 0px)" },
//     { transform: "translate(-262px, -50px)" },
//     { transform: "translate(-540px, 0px)"}
// ]

// var switchFrames2 = [
//     { transform: "translate(0px, 0px)" },
//     { transform: "translate(262px, 50px)" },
//     { transform: "translate(540px, 0px)"}
// ]

const switchOptions = {
    duration: 750,
    iterations: 1,
}

document.addEventListener("DOMContentLoaded", (event) => {
    eventListeners()
})





var Animation = function (item1, item2) {
    var r = $.Deferred()

    var listContainer = document.getElementById("listContainer")
    listContainerWidth = listContainer.offsetWidth
    itemDif = item2.style.order - item1.style.order
    itemLength = listContainer.children.length

    var switchFrames = [
        { transform: `translate(0px, 0px)` },
        { transform: `translate(${ listContainerWidth/itemLength * itemDif/2}px, -50px)` },
        { transform: `translate(${ listContainerWidth/itemLength * itemDif}px, 0px)`}
    ]

    var switchFrames2 = [
        { transform: `translate(0px, 0px)` },
        { transform: `translate(${ -listContainerWidth/itemLength * itemDif/2}px, 50px)` },
        { transform: `translate(${ -listContainerWidth/itemLength * itemDif}px, 0px)`}
    ]

    item1.animate(switchFrames, switchOptions)
    item2.animate(switchFrames2, switchOptions)

    setTimeout(function () {
        r.resolve()
    }, 750)

    return r
}

var StyleShift = function (item1, item2, swaps) {
    temp = item1.style.order
    item1.style.order = item2.style.order
    item2.style.order = temp
    swaps.splice(0,2)
    if(swaps != null){
        item1 = document.getElementById(`item${swaps[0]}`)
        item2 = document.getElementById(`item${swaps[1]}`)
        Animation(item1, item2).done(function() {StyleShift(item1, item2, swaps)})
    }
}

var swaps;

function eventListeners() {
    document.getElementById("submit").addEventListener("click", function() {
        setList()
        getSwaps("insertion" )
    })

    document.getElementById("randList").addEventListener("click", function() {
        setRandList()
    })

    document.getElementById("list").addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            setList()
        }
    })

    document.getElementById("randLen").addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            setRandList()
        }
    })

    document.getElementById("listContainer").addEventListener("click", () => {
        var swaps = [12, 11, 13, 5, 12, 5, 11, 5, 13, 6, 12, 6, 11, 6]
        item1 = document.getElementById(`item${swaps[0]}`)
        item2 = document.getElementById(`item${swaps[1]}`)
        Animation(item1, item2).done(function() {StyleShift(item1, item2, swaps)})
    })

    for (const method of ["bubble", "insertion", "selection", "merge"]) {
        document.getElementById(method).addEventListener("click", function() {
            getSwaps(method, document.getElementById('list').value.split(","))
            console.log(swaps)
            item1 = document.getElementById(`item${swaps[0]}`)
            item2 = document.getElementById(`item${swaps[1]}`)
            Animation(item1, item2).done(function() {StyleShift(item1, item2, swaps)})
        })
    }
}

function getSwaps(sort, list){
    console.log("list" + list);
    console.log(sort);
    fetch(`http://localhost:8085/api/${sort}/for`, {
        method: "POST",
        headers: {
            'Content-Type':'application/json',
        },
        body: JSON.stringify(list)
    }).then(response => response.json())
    .then(responseData => {
        console.log(responseData)
        swaps = responseData.swaps
        return responseData.swaps
    })
    .catch(error => {
        console.error('Error:', error);
    })
}