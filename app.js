const header_name = document.querySelector('.header .nav-bar a h1');
const contact_expand = document.querySelector('.footer .expand-footer img');
const contact_h1 = document.querySelector('.footer h1');
const contact = document.querySelector('.footer');
const contact_form = document.querySelector('.fcf-body');

const social_texts = document.querySelectorAll('.footer .social-text');
const project_items = document.querySelectorAll('.projects .projects-row .project-item');
const project_arrows = document.querySelectorAll('.projects .decor-arrow');
const project_contents = document.querySelectorAll('.projects .project-content');

var footerOpen = false;

var form = document.getElementById("fcf-form-id");

function findPos(obj) {
    var curtop = 0;
    if (obj.offsetParent) {
        do {
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
    return [curtop];
    }
}

async function handleSubmit(event) {
    event.preventDefault();
    var status = document.getElementById("fcf-button");
    var data = new FormData(event.target);
    fetch(event.target.action, {
      method: form.method,
      body: data,
      headers: {
          'Accept': 'application/json'
      }
    }).then(response => {
      status.innerHTML = "Thanks for your message, I'll be in touch!";
      form.reset()
    }).catch(error => {
      status.innerHTML = "Oops, here was a problem. Please use the below methods instead."
    });
  }

function toggleFooter()
{
    contact.classList.toggle('active');
    contact_expand.classList.toggle('active');
    contact_h1.classList.toggle('active');
    contact_form.classList.toggle('active');
    social_texts.forEach(function(element) {
        element.classList.toggle('active');
    });

    footerOpen = !footerOpen;
}

function retractFooter()
{
    contact.classList.toggle('active', false);
    contact_expand.classList.toggle('active', false);
    contact_h1.classList.toggle('active', false);
    contact_form.classList.toggle('active', false);
    social_texts.forEach(function(element) {
        element.classList.toggle('active', false);
    });

    document.getElementById("fcf-button").innerHTML = "Send Message";

    footerOpen = false;
}

document.addEventListener('scroll', ()=> {
    var scroll_position = window.scrollY;

	if (scroll_position > findPos(document.getElementById("show-name-pos")))
    {
		header_name.style.fontSize = '4rem';
        header_name.style.transform = 'scaleY(1)';
        header_name.style.opacity = '1';
	}
    else 
    {
        header_name.style.fontSize = '0';
        header_name.style.transform = 'scaleY(0)';
		header_name.style.opacity = '0';
	}

    if (scroll_position < findPos(document.getElementById("hide-footer-pos")))
        retractFooter();
})

var activeItem = null;
project_items.forEach(item => {
    item.addEventListener('click', () => {
        if (Array.from(project_items).indexOf(item) < 3)
        {
            if (project_contents[0].style.display === "none" || project_contents[0].style.display === "")
            {
                console.log("opening content");

                project_arrows[0].style.display = "flex";
                project_contents[0].style.display = "flex";
                
                project_arrows[1].style.display = "none";
                project_contents[1].style.display = "none";

                window.scroll(0, (findPos(document.getElementById("first-row-pos")) - 80));
            }
            else if (item === activeItem)
            {
                project_arrows[0].style.display = "none";
                project_contents[0].style.display = "none";

                console.log("closing content");

                window.scroll(0, findPos(document.getElementById("projects")));
            }
        }
        else
        {
            if (project_arrows[1].style.display === "none") 
            {
                project_arrows[1].style.display = "flex";
                project_contents[1].style.display = "flex";

                project_arrows[0].style.display = "none";
                project_contents[0].style.display = "none";

                window.scroll(0, (findPos(document.getElementById("second-row-pos")) - 110));
            }
            else if (item === activeItem)
            {
                project_arrows[1].style.display = "none";
                project_contents[1].style.display = "none";

                window.scroll(0, findPos(document.getElementById("projects")));
            }
        }

        switch (Array.from(project_items).indexOf(item))
        {
            case 0:
                project_arrows[0].style.marginRight = "900px";
                break;
            case 1:
                project_arrows[0].style.marginRight = "0px";
                break;
            case 2:
                project_arrows[0].style.marginRight = "-900px";
                break;
            case 3:
                project_arrows[1].style.marginRight = "900px";
                break;
            case 4:
                project_arrows[1].style.marginRight = "0px";
                break;
            case 5:
                project_arrows[1].style.marginRight = "-900px";
                break;
        }

        activeItem = item;
    })
})

contact_expand.addEventListener('click', toggleFooter);

contact.addEventListener('transitionend', () => {
    if (footerOpen == true)
        window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
});

form.addEventListener("submit", handleSubmit)
