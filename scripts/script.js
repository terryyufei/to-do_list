// Initial left item count
let itemLeft = 0

// Draggability of lists using the Sortable library
const dragArea = document.querySelector('.listContainer')
new Sortable(dragArea, {
    Animation: 3500
})

// Dark mode, light mode toggle using jQuery
$(document).ready(function () {

    // Switch to light mode
    $('.sun').click(function () {
        $('body').css("background-color", "hsl(236, 33%, 92%)");
        $('.sun').hide();
        $('.moon').show();
        $('input').css({ "background-color": "hsl(0,0%,98%)", "color": "black" });
        $('.listContainer').css({ "background-color": "white", "color": "black" });
        $('.filter').css({ "background-color": "hsl(0,0%,98%)", "color": "black" });
    });
    $('.moon').click(function () {
        // Switch to dark mode
        $('body').css("background-color", "hsl(235, 21%, 11%)");
        $('input').css({ "background-color": "hsl(235, 24%, 19%)", "color": "white" });
        $('.listContainer').css({ "background-color": "hsl(235, 24%, 19%)", "color": "gray" });
        $('.filter').css({ "background-color": "hsl(235, 24%, 19%)", "color": "gray" });
        $('.sun').show();
        $('.moon').hide();
    });
    

    // Adding elements on Enter key press
    $('input').keypress(function (e) {
        if (e.key == 'Enter') {
            // Increment the left item count
            $('.listContainer').children().length += 1
            console.log($('.listContainer').children().length)
            $('.leftItem').text(`${$('.listContainer').children().length} item left`)

            // Check for empty input            
            if (e.target.value.trim() == '') {
                return
            }

            // Prepend a new list item
            $('.listContainer').prepend(`
            <div class="listItem"> 
            <span onclick="checkItem(event)" class="checkContainer"></span> 
            ${e.target.value} 
            <img class="cross" onclick="deleteItem(event)" src="./images/icon-cross.svg" alt=""> 
            </div>`);
            e.target.value = ""
            itemLeft = $('.listItem').length
        }
        
    });
    
});


// Deleting items
function deleteItem(e) {
    e.target.parentElement.remove()
    // Decrement the left item count
    let decreamentedItemLeft = itemLeft -= 1
    $('.leftItem').text(decreamentedItemLeft + ' items left');
}


// Marking items as done
function checkItem(e) {
    e.target.parentElement.classList.toggle('checked')
}


// Clear completed items and update the left item count
$('.clearCompleted').click(()=>{
    let items = document.querySelectorAll('.listItem')
    items.forEach(item=>{
        if(item.classList.contains('checked')){
            item.remove()
        }
    })
    itemLeft = $('.listItem').length
    $('.leftItem').text(itemLeft + ' items left')
})


// Filter completed items
$('.completed').click(function () { 
    let listItems = document.querySelectorAll('.listItem')
    console.log(listItems)
    listItems.forEach(function(listItem){
        listItem.style.display = 'flex'
        if(listItem.classList.contains('checked') == false){
            listItem.style.display = 'none'
        }
    })
    
});

// Filter active items
$('.active').click(function () { 
    let listItems = document.querySelectorAll('.listItem')
    console.log(listItems)
    listItems.forEach(function(listItem){
        listItem.style.display = 'flex'
        if(listItem.classList.contains('checked')){
            listItem.style.display = 'none'
        }
    })
    
});


// Display all items
$('.all').click(function () { 
    let listItems = document.querySelectorAll('.listItem')
    listItems.forEach(function(listItem){
        listItem.style.display = 'flex'
    });
    
});
