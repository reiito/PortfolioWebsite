const expand = document.querySelector('.dropdown-button');

document.querySelector('.dropdown-button').addEventListener('click', () => {
    document.querySelector('.dropdown img').classList.toggle('active');
    document.querySelector('.dropdown-content').classList.toggle('active');
});