const header_name = document.querySelector('.header .nav-bar a h1');

const contact_expand = document.querySelector('.footer .expand-footer img');
const contact_h1 = document.querySelector('.footer h1');
const contact = document.querySelector('.footer');
const contact_form = document.querySelector('.fcf-body');
const social_texts = document.querySelectorAll('.footer .social-text');

const project_items = document.querySelectorAll('.project-item');
const project_arrows = document.querySelectorAll('.decor-arrow');
const project_contents = document.querySelectorAll('.project-content');
const project_videos = document.querySelectorAll('.project-content iframe');
const project_heading = document.querySelectorAll('.project-desc h1');
const project_paragraph = document.querySelectorAll('.project-desc p');

var footerOpen = false;

var form = document.getElementById("fcf-form-id");
var projectsData;
var experienceData;

document.addEventListener('DOMContentLoaded', function() {
    loadJSON(function(response) {
        projectsData = JSON.parse(response);

        projectsData.forEach((item, index) => {
            document.querySelectorAll('.project-item')[index].classList.add('project-'+[index]);
            document.querySelectorAll('.project-item h2')[index].textContent = item.title;
            document.querySelector('.project-'+ [index]).style.backgroundImage = item.static_path;
        })
    }, 'project_data.json');

    loadJSON(function(response) {
        experienceData = JSON.parse(response);

        experienceData.forEach((item,index) => {
            document.querySelector('.experience-bottom').innerHTML += (
                '<div class="experience-item">\n<h2>'+ item.title
                + '</h2>\n<h3>' + item.employer
                +'</h3>\n<h4>' + item.dates
                + '</h4>\n<p>' + item.description
                + '</p>\n</div>\n'
            )

            if (index != experienceData.length - 1)
                document.querySelector('.experience-bottom').innerHTML += '<div class="arrow"><img src="https://img.icons8.com/windows/96/000000/up.png"/></div>\n';
        })
    }, 'experience_data.json');
}, false);

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

function loadJSON(callback, fileName) {   
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', fileName, true); // Replace 'appDataServices' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
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
        header_name.style.transform = 'scale(1)';
        header_name.style.opacity = '1';
	}
    else 
    {
        header_name.style.fontSize = '0';
        header_name.style.transform = 'scale(0)';
		header_name.style.opacity = '0';
	}

    if (scroll_position < findPos(document.getElementById("hide-footer-pos")))
        retractFooter();
})

var activeItem = null;
project_items.forEach((item, index) => {
    item.addEventListener('click', () => {
        var roundedIndex = Math.floor(index / 3);
        var activeRoundedIndex = Math.floor(Array.from(project_items).indexOf(activeItem) / 3)

        if (!project_arrows[roundedIndex].classList.contains('active'))
        {
            toggleProjectContent(roundedIndex, true);
            window.scroll(0, (findPos(project_arrows[roundedIndex]) - 368));

            if (activeRoundedIndex>=0)
            {
                if (project_arrows[activeRoundedIndex].classList.contains('active'))
                {
                    toggleProjectContent(activeRoundedIndex, false);

                    if (roundedIndex != 0)
                        window.scroll(0, (findPos(project_arrows[roundedIndex]) - 958));
                }
            }

            switchProjectItemDetails(roundedIndex, index, item);
        }
        else if (item === activeItem)
        {
            toggleProjectContent(activeRoundedIndex, false);
            window.scroll(0, findPos(document.getElementById("projects")));
            activeItem = null;
        }
        else
            switchProjectItemDetails(roundedIndex, index, item);
    })

    item.addEventListener('mouseenter', () => {
        document.querySelector('.project-'+[index]).style.backgroundImage = projectsData[index].gif_path;
    })

    item.addEventListener('mouseleave', () => {
        document.querySelector('.project-'+[index]).style.backgroundImage = projectsData[index].static_path;
    })
})

function switchProjectItemDetails(roundedIndex, index, item)
{
    activeItem = item;
        
    project_videos[roundedIndex].src = projectsData[index].video_link;
    project_heading[roundedIndex].textContent = projectsData[index].title;
    project_paragraph[roundedIndex].textContent = projectsData[index].description;

    switch (index % 3)
    {
        case 0:
            project_arrows[roundedIndex].style.marginRight = "900px";
            break;
        case 1:
            project_arrows[roundedIndex].style.marginRight = "0px";
            break;
        case 2:
            project_arrows[roundedIndex].style.marginRight = "-900px";
            break;
    }
}

function toggleProjectContent(index, isActive)
{
    project_arrows[index].classList.toggle('active', isActive);
    project_contents[index].classList.toggle('active', isActive);
    project_videos[index].classList.toggle('active', isActive);
}

contact_expand.addEventListener('click', toggleFooter);

contact.addEventListener('transitionend', () => {
    if (footerOpen == true)
        window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
});

form.addEventListener("submit", handleSubmit);