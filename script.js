// Agregar al inicio del archivo
function showTab(index) {
    // Obtener todos los botones y contenidos
    const buttons = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.tab-content');
    
    // Actualizar botones
    buttons.forEach(btn => btn.classList.remove('active'));
    buttons[index].classList.add('active');
    
    // Transición suave del contenido
    contents.forEach(content => {
        content.style.opacity = '0';
        content.style.transform = 'translateY(10px)';
        setTimeout(() => {
            content.style.display = 'none';
        }, 300);
    });
    
    // Mostrar el nuevo contenido
    setTimeout(() => {
        contents[index].style.display = 'block';
        setTimeout(() => {
            contents[index].style.opacity = '1';
            contents[index].style.transform = 'translateY(0)';
        }, 50);
    }, 300);
}

// active hamburger menu 
let menuIcon = document.querySelector(".menu-icon");
let navlist = document.querySelector(".navlist")
menuIcon.addEventListener("click",()=>{
    menuIcon.classList.toggle("active");
    navlist.classList.toggle("active");
    document.body.classList.toggle("open");
});

// remove navlist
navlist.addEventListener("click",()=>{
    navlist.classList.remove("active");
    menuIcon.classList.remove("active");
    document.body.classList.remove("open");
})



// rotate text js code 
let text = document.querySelector(".text p");

text.innerHTML = text.innerHTML.split("").map((char,i)=>
    `<b style="transform:rotate(${i * 6.3}deg")>${char}</b>`
).join("");


// switch between about buttons 

document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.about-btn button');
    const contents = document.querySelectorAll('.content-btn .content');

    buttons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            // Remover active de todos los botones
            buttons.forEach(b => b.classList.remove('active'));
            // Agregar active al botón clickeado
            btn.classList.add('active');
            
            // Ocultar todos los contenidos
            contents.forEach(content => {
                content.style.display = 'none';
            });
            // Mostrar el contenido correspondiente
            if (contents[index]) {
                contents[index].style.display = 'block';
            }
        });
    });
});



// portfolio fillter 

var mixer = mixitup('.portfolio-gallery',{
    selectors: {
        target: '.portfolio-box'
    },
    animation: {
        duration: 500
    }
});


// Initialize swiperjs 

var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    autoplay:{
        delay:3000,
        disableOnInteraction:false,
    },

    breakpoints: {
        576:{
            slidesPerView:2,
            spaceBetween:10,
        },
        1200:{
            slidesPerView:3,
            spaceBetween:20,
        },
    }
  });



//   skill Progress bar 

const first_skill = document.querySelector(".skill:first-child");
const sk_counters = document.querySelectorAll(".counter span");
const progress_bars = document.querySelectorAll(".skills svg circle");

window.addEventListener("scroll",()=>{
    if(!skillsPlayed)
    skillsCounter();
})


function hasReached(el){
    let topPosition = el.getBoundingClientRect().top;
    if(window.innerHeight >= topPosition + el.offsetHeight)return true;
    return false;
}

function updateCount(num,maxNum){
    let currentNum = +num.innerText;
    
    if(currentNum < maxNum){
        num.innerText = currentNum + 1;
        setTimeout(()=>{
            updateCount(num,maxNum)
        },12)
    }
}


let skillsPlayed = false;

function skillsCounter(){
    if(!hasReached(first_skill))return;
    skillsPlayed = true;
    sk_counters.forEach((counter,i)=>{
        let target = +counter.dataset.target;
        let strokeValue = 465 - 465 * (target / 100);

        progress_bars[i].style.setProperty("--target",strokeValue);

        setTimeout(()=>{
            updateCount(counter,target);
        },400)
    });

    progress_bars.forEach(p => p.style.animation = "progress 2s ease-in-out forwards");
}


// side progress bar 

let calcScrollValue = ()=>{
    let scrollProgress = document.getElementById("progress");
    let pos = document.documentElement.scrollTop;

    let calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrollValue = Math.round((pos * 100)/calcHeight);
    
    if(pos > 100){
        scrollProgress.style.display = "grid";
    }else{
        scrollProgress.style.display = "none";
    }

    scrollProgress.addEventListener("click",()=>{
        document.documentElement.scrollTop = 0;
    });

    scrollProgress.style.background = `conic-gradient(#fff ${scrollValue}%,#e6006d ${scrollValue}%)`;
};

window.onscroll = calcScrollValue;
window.onload = calcScrollValue;


// active menu 

let menuLi = document.querySelectorAll("header ul li a");
let section = document.querySelectorAll('section');

function activeMenu(){
    let len = section.length;
    while(--len && window.scrollY + 97 < section[len].offsetTop){}
    menuLi.forEach(sec => sec.classList.remove("active"));
    menuLi[len].classList.add("active");
}
activeMenu();
window.addEventListener("scroll",activeMenu);

// scroll reveal

ScrollReveal({ 
    distance:"90px",
    duration:2000,
    delay:200,
    // reset: true ,
});


ScrollReveal().reveal('.hero-info,.main-text,.proposal,.heading', { origin: "top" });
ScrollReveal().reveal('.about-img,.fillter-buttons,.contact-info', { origin: "left" });
ScrollReveal().reveal('.about-content,.skills', { origin: "right" });
ScrollReveal().reveal('.allServices,.portfolio-gallery,.blog-box,footer,.img-hero', { origin: "bottom" });


// Reemplaza la función existente del formulario con esta
function handleSubmit(event) {
    event.preventDefault(); // Detiene la redirección
    
    const form = document.getElementById('contactForm');
    const formData = new FormData(form);
    const queryString = new URLSearchParams(formData).toString();
    const url = 'https://magicloops.dev/api/loop/85e914fa-ac16-4762-80c3-6af2b340433c/run';
    
    // Deshabilitar el botón
    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    
    // Enviar en segundo plano
    fetch(`${url}?${queryString}`, {
        method: 'GET',
        mode: 'no-cors' // Esto evita problemas de CORS
    })
    .then(() => {
        alert('¡Mensaje enviado con éxito!');
        form.reset();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error al enviar el mensaje');
    })
    .finally(() => {
        submitButton.disabled = false;
    });
    
    return false; // Asegura que no haya redirección
}

