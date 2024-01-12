function showAdditionalContent() {
    var additionalContent = document.querySelector('.additional-content');
    var readMoreButton = document.querySelector('.read-more-button');

    if (additionalContent.style.display === 'none') {
        additionalContent.style.display = 'block';
        readMoreButton.innerHTML = 'Read Less';
    } else {
        additionalContent.style.display = 'none';
        readMoreButton.innerHTML = 'Read More';
    }
}
