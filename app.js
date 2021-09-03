const hamburger = document.querySelector('.hamburger');
const header_name = document.querySelector('.header .nav-bar a h1');
const contact_expand = document.querySelector('.footer .expand-footer img');
const contact_h1 = document.querySelector('.footer h1');
const contact = document.querySelector('.footer');
const contact_form = document.querySelector('.fcf-body');
const social_icons = document.querySelector('.social-icons');
const social_texts = document.querySelectorAll('.footer .social-text');

const test = document.querySelector('.experience-item h2');

var footerOpen = false;

var form = document.getElementById("fcf-form-id");
var projectsData;
var experienceData;
var activeItem = null;
var activeIndex = -1;

var screenChangeWidth = 1200;

var isMobile = /iPhone|iPod|Android/i.test(navigator.userAgent);
var smallScreen = isMobile || window.innerWidth <= screenChangeWidth;

document.addEventListener('DOMContentLoaded', function() {

    loadJSON(function(response) {
        projectsData = JSON.parse(response);
        projectsData.forEach((item, index) => {
            if (smallScreen)
            {
                document.querySelector('.projects').innerHTML += (
                    '<div class="projects-row">\n' +
                    '</div>\n' +
                    '<div class="decor-arrow">\n' +
                        '<img src="https://img.icons8.com/fluent-systems-filled/96/000000/sort-up.png"/>\n' +
                    '</div>\n' +
                    '<div class="project-section">\n' +
                    '</div>\n'
                )
            }
            else if ((index % 3) === 0)
            {
                document.querySelector('.projects').innerHTML += (
                    '<div class="projects-row">\n' +
                    '</div>\n' +
                    '<div class="decor-arrow">\n' +
                        '<img src="https://img.icons8.com/fluent-systems-filled/96/000000/sort-up.png"/>\n' +
                    '</div>\n' +
                    '<div class="project-section">\n' +
                    '</div>\n'
                )
            }

            document.querySelectorAll('.projects-row')[smallScreen ? index : Math.floor(index / 3)].innerHTML += (
                '<div class="project-item project-card-color">\n' +
                    '<h2>' + projectsData[index].title + '</h2>\n' +
                '</div>\n'
            )

            document.querySelectorAll('.project-section')[smallScreen ? index : Math.floor(index / 3)].innerHTML += (
                '<div class="project-content">\n' +
                    '<div class="project-video">\n' +
                        '<iframe width="675px" height="380px" src="' + projectsData[index].video_link + '?enablejsapi=1"></iframe>\n' +
                    '</div>\n' +
                    '<div class="project-desc">\n' +
                        '<h1>' + projectsData[index].title + '</h1>\n' +
                        projectsData[index].description + '\n' +
                        '<div class="project-icons">\n' +
                        '</div>\n' +
                    '</div>\n' +
                '</div>\n'
            )
            
            if (projectsData[index].links.length != 0)
            {
                projectsData[index].links.forEach((linkItem) => {
                    document.querySelectorAll('.project-icons')[index].innerHTML += (
                        '<div class="project-link">\n' +
                            '<a href="' + linkItem.link + '" target="_blank" rel="noopener noreferrer">\n' +
                                '<img src="' + linkItem.icon + '"/>\n' +
                            '</a>\n' +
                        '</div>\n'
                    )
                })
            }

            if (smallScreen)
                document.querySelectorAll('.project-item')[index].classList.add('project-item-diff3');
        })

        if ((document.querySelectorAll('.project-item').length % 3) > 0 && !smallScreen)
        {
            if ((document.querySelectorAll('.project-item').length % 3) == 1)
            {
                document.querySelectorAll('.project-item')[document.querySelectorAll('.project-item').length - 1].classList.add('project-item-diff1');
            }
            else
            {
                document.querySelectorAll('.project-item')[document.querySelectorAll('.project-item').length - 1].classList.add('project-item-diff2');
                document.querySelectorAll('.project-item')[document.querySelectorAll('.project-item').length - 2].classList.add('project-item-diff2');
            }
        }

        document.querySelectorAll('.project-item').forEach((item, index) => {
            var roundedIndex = smallScreen ? index : Math.floor(index / 3);

            item.classList.add('project-'+[index]);
            document.querySelector('.project-'+ [index]).style.backgroundImage = projectsData[index].static_path;

            item.addEventListener('click', () => {
                var activeRoundedIndex = Math.floor(Array.from(document.querySelectorAll('.project-item')).indexOf(activeItem) / (smallScreen ? 1 : 3))

                if (!document.querySelectorAll('.decor-arrow')[roundedIndex].classList.contains('active'))
                {
                    updateActiveItem(roundedIndex, index, item);
                    toggleProjectContent(roundedIndex, true);

                    if (activeRoundedIndex>=0)
                        if (document.querySelectorAll('.decor-arrow')[activeRoundedIndex].classList.contains('active'))
                            toggleProjectContent(activeRoundedIndex,  false);

                    if (roundedIndex > activeRoundedIndex && activeRoundedIndex >= 0)
                        window.scroll(0, findPos(document.querySelectorAll('.decor-arrow')[activeRoundedIndex]) - (-142));
                    else
                        window.scroll(0, (findPos(document.querySelectorAll('.decor-arrow')[roundedIndex]) - 246));
                }
                else if (item === activeItem)
                {
                    RemoveActiveProject();
                    toggleProjectContent(activeRoundedIndex, false);
                    if (roundedIndex === 0)
                        window.scroll(0, 0);
                    else
                        window.scroll(0, findPos(document.querySelectorAll('.decor-arrow')[roundedIndex - 1]) - 368);
                    activeItem = null;
                }
                else
                {
                    updateActiveItem(roundedIndex, index, item);
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

    if (window.innerWidth <= screenChangeWidth && !smallRefreshed)
        smallRefreshed = true;
    else if (window.innerWidth > screenChangeWidth && smallRefreshed)
        smallRefreshed = false;
}, false);

function RemoveActiveProject()
{
    $('.project-video iframe')[activeIndex].contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*')
    document.querySelectorAll('.project-video iframe')[activeIndex].classList.toggle('active', false);
    document.querySelectorAll('.project-content')[activeIndex].classList.toggle('active', false);
    document.querySelectorAll('.project-desc')[activeIndex].classList.toggle('active', false);
}

function updateActiveItem(roundedIndex, index, item)
{
    if (activeIndex > -1)
        RemoveActiveProject();

    document.querySelectorAll('.project-content')[index].classList.toggle('active', true);
    document.querySelectorAll('.project-video iframe')[index].classList.toggle('active', true);
    document.querySelectorAll('.project-desc')[index].classList.toggle('active', true);

    activeItem = item;
    activeIndex = index;

    let offsetCalc = ((item.offsetLeft + item.offsetWidth / 2) - (document.body.clientWidth / 2)) * 2;
    document.querySelectorAll('.decor-arrow')[roundedIndex].style.marginLeft = offsetCalc + 'px';
}

function toggleProjectContent(roundedIndex, isActive)
{
    document.querySelectorAll('.decor-arrow')[roundedIndex].classList.toggle('active', isActive);
    document.querySelectorAll('.project-section')[roundedIndex].classList.toggle('active', isActive);
}

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
    social_icons.classList.toggle('active');
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
    social_icons.classList.toggle('active', false);
    social_texts.forEach(function(element) {
        element.classList.toggle('active', false);
    });

    document.getElementById("fcf-button").innerHTML = "Send Message";

    footerOpen = false;
}

var smallRefreshed = false;
window.addEventListener('resize', ()=> {
    if (window.innerWidth <= screenChangeWidth && !smallRefreshed)
    {
        smallRefreshed = true;
        location.reload();
    }
    else if (window.innerWidth > screenChangeWidth && smallRefreshed)
    {
        smallRefreshed = false;
        location.reload();
    }
});

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

    if (scroll_position < findPos(document.getElementById("experience")))
        retractFooter();
})

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    document.querySelector('.hamburger .nav-list ul').classList.toggle('active');
});

contact_expand.addEventListener('click', toggleFooter);

contact.addEventListener('transitionend', () => {
    if (footerOpen == true)
        window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
});

form.addEventListener("submit", handleSubmit);