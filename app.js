const header_name = document.querySelector('.header .nav-bar a h1');

const contact_expand = document.querySelector('.footer .expand-footer img');
const contact_h1 = document.querySelector('.footer h1');
const contact = document.querySelector('.footer');
const contact_form = document.querySelector('.fcf-body');
const social_texts = document.querySelectorAll('.footer .social-text');

const test = document.querySelector('.experience-item h2');

var footerOpen = false;

var form = document.getElementById("fcf-form-id");
var projectsData;
var experienceData;
var activeItem = null;

document.addEventListener('DOMContentLoaded', function() {

    loadJSON(function(response) {

        projectsData = JSON.parse(response);
        projectsData.forEach((item, index) => {
            if ((index % 3) === 0)
            {
                document.querySelector('.projects').innerHTML += (
                    '<div class="projects-row">\n' +
                        '<div class="project-item project-card-color">\n' +
                            '<h2>' + projectsData[index].title + '</h2>\n' +
                        '</div>\n' +
                        '<div class="project-item project-card-color">\n' +
                            '<h2>' + projectsData[index+1].title + '</h2>\n' +
                        '</div>\n' +
                        '<div class="project-item project-card-color">\n' +
                            '<h2>' + projectsData[index+2].title + '</h2>\n' +
                        '</div>\n' +
                    '</div>\n' +
                    '<div class="decor-arrow">\n' +
                        '<img src="https://img.icons8.com/fluent-systems-filled/96/000000/sort-up.png"/>\n' +
                    '</div>\n' +
                    '<div class="project-content">\n' +
                        '<div class="project-video">\n' +
                            '<iframe width="640" height="360" src="' + projectsData[index].video_link + '"></iframe>\n' +
                        '</div>\n' +
                        '<div class="project-desc">\n' +
                            '<h1>' + projectsData[index].title + '</h1>\n' +
                            '<p>' + projectsData[index].description + '</p>\n' +
                            '<div class="project-icons">\n' +
                                '<div class="project-link">\n' +
                                    '<a href="' + projectsData[index].github_link + '">\n' +
                                        '<img src="https://img.icons8.com/dusk/128/000000/github.png"/>\n' +
                                    '</a>\n' +
                                '</div>\n' +
                                '<div class="project-link">\n' +
                                    '<a href="' + projectsData[index].itchio_link + '">\n' +
                                        '<img src="https://img.icons8.com/dusk/128/000000/itch-io.png"/>\n' +
                                    '</a>\n' +
                                '</div>\n' +
                            '</div>\n' +
                        '</div>\n' +
                    '</div>\n'
                )
            }
        })

        document.querySelectorAll('.project-item').forEach((item, index) => {
            var roundedIndex = Math.floor(index / 3);

            item.classList.add('project-'+[index]);
            document.querySelector('.project-'+ [index]).style.backgroundImage = projectsData[index].static_path;

            item.addEventListener('click', () => {
                document.querySelectorAll('.project-video')[roundedIndex].style.animation = 'none';
                document.querySelectorAll('.project-desc')[roundedIndex].style.animation = 'none';
                document.querySelectorAll('.project-video')[roundedIndex].offsetHeight; /* trigger reflow */
                document.querySelectorAll('.project-desc')[roundedIndex].offsetHeight; /* trigger reflow */
                document.querySelectorAll('.project-video')[roundedIndex].style.animation = '';
                document.querySelectorAll('.project-desc')[roundedIndex].style.animation = '';

                var activeRoundedIndex = Math.floor(Array.from(document.querySelectorAll('.project-item')).indexOf(activeItem) / 3)
        
                if (!document.querySelectorAll('.decor-arrow')[roundedIndex].classList.contains('active'))
                {
                    if (document.querySelectorAll('.project-content iframe')[roundedIndex].src != projectsData[index].video_link)
                    {
                        document.querySelectorAll('.project-content iframe')[roundedIndex].src = projectsData[index].video_link;                 
                        sleep(700);
                    }

                    switchProjectItemDetails(roundedIndex, index, item);
                    
                    toggleProjectContent(roundedIndex, true);
                    window.scroll(0, (findPos(document.querySelectorAll('.decor-arrow')[roundedIndex]) - 368));
        
                    if (activeRoundedIndex>=0)
                    {
                        if (document.querySelectorAll('.decor-arrow')[activeRoundedIndex].classList.contains('active'))
                        {
                            toggleProjectContent(activeRoundedIndex, false);
        
                            if (roundedIndex != 0)
                                window.scroll(0, (findPos(document.querySelectorAll('.decor-arrow')[roundedIndex]) - 958));
                        }
                    }
                }
                else if (item === activeItem)
                {
                    toggleProjectContent(activeRoundedIndex, false);
                    window.scroll(0, findPos(document.getElementById("projects")));
                    activeItem = null;
                }
                else
                {
                    document.querySelectorAll('.project-content iframe')[roundedIndex].src = projectsData[index].video_link;  
                    switchProjectItemDetails(roundedIndex, index, item);
                }
            })
        
            item.addEventListener('mouseenter', () => {
                document.querySelector('.project-'+[index]).style.backgroundImage = projectsData[index].gif_path;
            })
        
            item.addEventListener('mouseleave', () => {
                document.querySelector('.project-'+[index]).style.backgroundImage = projectsData[index].static_path;
            })
        })
    }, 'project_data.json');

    loadJSON(function(response) {
        experienceData = JSON.parse(response);
        experienceData.forEach((item,index) => {
            document.querySelector('.experience-bottom').innerHTML += (
                '<div class="experience-item">\n' +
                    '<h2>'+ item.title + '</h2>\n' +
                    '<h3>' + item.employer +'</h3>\n' +
                    '<h4>' + item.dates + '</h4>\n' +
                    '<p>' + item.description + '</p>\n' +
                '</div>\n'
            )

            if (index != experienceData.length - 1)
                document.querySelector('.experience-bottom').innerHTML += '<div class="arrow"><img src="https://img.icons8.com/windows/96/000000/up.png"/></div>\n';
        })
    }, 'experience_data.json');
}, false);

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

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

    console.log(document.querySelectorAll('.project-item').length);
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

function switchProjectItemDetails(roundedIndex, index, item)
{
    activeItem = item;
    
    document.querySelectorAll('.project-desc h1')[roundedIndex].textContent = projectsData[index].title;
    document.querySelectorAll('.project-desc p')[roundedIndex].textContent = projectsData[index].description;

    switch (index % 3)
    {
        case 0:
            document.querySelectorAll('.decor-arrow')[roundedIndex].style.marginRight = "900px";
            break;
        case 1:
            document.querySelectorAll('.decor-arrow')[roundedIndex].style.marginRight = "0px";
            break;
        case 2:
            document.querySelectorAll('.decor-arrow')[roundedIndex].style.marginRight = "-900px";
            break;
    }
}

function toggleProjectContent(index, isActive)
{
    document.querySelectorAll('.decor-arrow')[index].classList.toggle('active', isActive);
    document.querySelectorAll('.project-content')[index].classList.toggle('active', isActive);
    document.querySelectorAll('.project-video iframe')[index].classList.toggle('active', isActive);
}

contact_expand.addEventListener('click', toggleFooter);

contact.addEventListener('transitionend', () => {
    if (footerOpen == true)
        window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
});

form.addEventListener("submit", handleSubmit);