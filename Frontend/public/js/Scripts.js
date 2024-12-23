$(document).ready(function () {
    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 3
            },
            1000: {
                items: 5
            }
        }
    });
});

$(".dropdown").click(function () {
    var $menu = $(this).children(".mega-menu");

    // Toggle the visibility of mega menu on click
    if ($menu.is(":visible")) {
        $menu.stop(true, true).slideUp(200); // Ẩn mega menu
    } else {
        $(".mega-menu").stop(true, true).slideUp(200); // Ẩn tất cả các mega menu
        $menu.stop(true, true).slideDown(200); // Hiển thị mega menu
    }
});

// Đảm bảo các mega menu bị ẩn khi click bên ngoài menu
$(document).click(function (event) {
    if (!$(event.target).closest('.dropdown').length) {
        $(".mega-menu").slideUp(200); // Ẩn tất cả các mega menu khi click bên ngoài
    }
});

function showEditModal(title) {
    document.getElementById('editModal').style.display = 'block';
}

function showRejectModal(title) {
    document.getElementById('rejectModal').style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// ckeditor-init.js
CKEDITOR.replace('content');

//tag select
function updateSelectedTags() {
    var select = document.getElementById("tags");
    var selectedTags = Array.from(select.selectedOptions).map(option => option.value);
    var selectedTagsList = document.getElementById("selected-tags-list");

    // Get current tags already displayed in the list
    var displayedTags = Array.from(selectedTagsList.getElementsByTagName("li")).map(item => item.textContent.trim());

    // Loop through selected tags and display them if not already displayed
    selectedTags.forEach(tag => {
        if (!displayedTags.includes(tag)) {
            var tagItem = document.createElement('div');
            tagItem.classList.add('tag');
            tagItem.textContent = tag;

            // Add a delete button next to each tag
            var deleteButton = document.createElement('button');
            deleteButton.textContent = 'X';
            deleteButton.onclick = function() {
                removeTag(tag, tagItem);
            };

            tagItem.appendChild(deleteButton);
            selectedTagsList.appendChild(tagItem);
        }
    });
}

function removeTag(tag, tagItem) {
    var select = document.getElementById("tags");

    // Deselect the tag in the <select> element
    Array.from(select.options).forEach(option => {
        if (option.value === tag) {
            option.selected = false;
        }
    });

    // Remove the tag from the displayed list
    tagItem.remove();
}


