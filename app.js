const header_name = document.querySelector('.header .nav-bar a h1');
const contact_expand = document.querySelector('.footer .expand-footer img');
const contact_h1 = document.querySelector('.footer h1');
const contact = document.querySelector('.footer');
const contact_form = document.querySelector('.fcf-body');

var footerOpen = false;

function findPos(obj) {
    var curtop = 0;
    if (obj.offsetParent) {
        do {
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
    return [curtop];
    }
}

function toggleFooter()
{
    contact.classList.toggle('active');
    contact_expand.classList.toggle('active');
    contact_h1.classList.toggle('active');
    contact_form.classList.toggle('active');

    footerOpen = !footerOpen;
}

function retractFooter()
{
    contact.classList.toggle('active', false);
    contact_expand.classList.toggle('active', false);
    contact_h1.classList.toggle('active', false);
    contact_form.classList.toggle('active', false);

    footerOpen = false;
}

document.addEventListener('scroll', ()=> {
    var scroll_position = window.scrollY;

	if (scroll_position > findPos(document.getElementById("show-name-pos")))
    {
		header_name.style.fontSize = '6rem';
        header_name.style.opacity = '1';
	}
    else 
    {
        header_name.style.fontSize = '0';
		header_name.style.opacity = '0';
	}

    if (scroll_position < findPos(document.getElementById("footer")) - document.getElementById("experience").clientHeight)
        retractFooter();
})

contact_expand.addEventListener('click', toggleFooter);

contact.addEventListener('transitionend', () => {
    if (footerOpen == true)
        window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
});
