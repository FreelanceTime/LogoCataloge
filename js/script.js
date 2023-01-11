
//1 для меню бургера в шапке
    $('.header__burger').click(function (event) {
        $('.header__burger,.menu__body' ).toggleClass('active');
    });

    $('.menu-page__burger').click(function (event) {
        $('.menu-page__burger').toggleClass('active');//крестик для бургера в боковом меню
        $('.menu-page__body').slideToggle("slow");//боковое меню выезжает вниз 
    });
    

    if (document.documentElement.clientWidth < 992) {
        let menuParents = document.querySelectorAll('.menu-page__parent a');
        for (index = 0; index < menuParents.length; index++) {
            const menuParent = menuParents[index];
            menuParent.addEventListener("click", function (e) {
                menuParent.parentElement.classList.toggle('active');
                e.preventDefault();
            });
        }
    } else {
        let menuParents = document.querySelectorAll('.menu-page__parent');
        for (index = 0; index < menuParents.length; index++) {
            const menuParent = menuParents[index];
            menuParent.addEventListener("mouseenter", function (e) {
                menuParent.classList.add('active');
            });
            menuParent.addEventListener("mouseleave", function (e) {
                menuParent.classList.remove('active');
            });
        }
    }
/*let menuPageBurger = document.querySelectorAll('.menu-page__burger');
let menuPageBody = document.querySelectorAll('.menu-page__body');
menuPageBurger.addEventListener("click", function(e) {
    menuPageBurger.classList.toggle('active');

});*/
//ниже простой способ повернуть стрелку в строке "везде"

$('.search-page__title').click(function (event) {
    $('.search-page__select').toggleClass('active');//переворачивается стрелка
    $('.categories-search').slideToggle("slow");//меню для поиска выезжает вниз 
}); 

//ниже для выбора товаров из выпадающего меню под "Везде"

let searchSelect = document.querySelector('.search-page__title');
let checkboxCategories = document.querySelectorAll('.categories-search__checkbox');
for (let index = 0; index < checkboxCategories.length; index++) {
    const checkboxCategory = checkboxCategories[index];
    checkboxCategory.addEventListener("change", function (e) {
        checkboxCategory.classList.toggle('active');
        let checkboxActiveCategories = document.querySelectorAll('.categories-search__checkbox.active');
        if (checkboxActiveCategories.length > 0) {
            searchSelect.classList.add('categories');
            let searchQuantity = searchSelect.querySelector('.search-page__quantity');
            searchQuantity.innerHTML = searchQuantity.getAttribute('data-text') + ' ' + checkboxActiveCategories.length;
        } else {
            searchSelect.classList.remove('categories');
        }
    });
}

const swiper = new Swiper('.products-slider__items', {
    // Optional parameters
    //direction: 'vertical',
    loop: true,
  
    // If we need pagination
    pagination: {
        //el: '.swiper-pagination',
        el: '.products-slider__info',
        type: 'fraction'
        
    },
  
    // Navigation arrows
    /*navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },*/
    navigation: { //Я ПРОПИСАЛА ТЕ КЛАССЫ, КОТОРЫЕ В МОЕМ КОДЕ ДЛЯ СТРЕЛОК
        nextEl: '.products-slider__arrow-next',
        prevEl: '.products-slider__arrow-prev',
      },
    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
});
new Swiper('.brands-slider__swiper', {
    slidesPerView: 5,
    slidesPerView: 1,
  spaceBetween: 10,
  // Responsive breakpoints
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1,
      //spaceBetween: 10
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 2,
      spaceBetween: 20
    },
    // when window width is >= 640px
    640: {
      slidesPerView: 4,
      spaceBetween: 40
      },
      992: {
        slidesPerView: 5,
        spaceBetween: 50
      }
  },
        navigation: { //Я ПРОПИСАЛА ТЕ КЛАССЫ, КОТОРЫЕ В МОЕМ КОДЕ ДЛЯ СТРЕЛОК
        nextEl: '.brands-slider__arrow-prev',
        prevEl: '.brands-slider__arrow-next',
    },
   
}); 
const ranger = document.getElementById('price-filter');

noUiSlider.create(ranger, {
    start: [0, 200000],
    connect: true,
    tooltips: true,//чтобы значения движка были над линейкой
    step: 1, //чтобы не было дробных значени над движком
    range: {
        'min': [0],
        'max': [200000]
    },
    format: { //чтобы не было десятичных и запятой, а только целое число
        to: function (value) {
            return parseInt (value);
        },
        from: function (value) {
            return parseInt (value);
        }
    }
}); 

const input0 = document.getElementById('price-start');
const input1 = document.getElementById('price-end');
const inputs = [input0, input1];
inputs.forEach(function (input, handle) {

    input.addEventListener('change', function () {
        ranger.noUiSlider.setHandle(handle, this.value);
    });

    input.addEventListener('keydown', function (e) {

        var values = ranger.noUiSlider.get();
        var value = Number(values[handle]);

        // [[handle0_down, handle0_up], [handle1_down, handle1_up]]
        var steps = ranger.noUiSlider.steps();

        // [down, up]
        var step = steps[handle];

        var position;

        // 13 is enter,
        // 38 is key up,
        // 40 is key down.
        switch (e.which) {

            case 13:
                ranger.noUiSlider.setHandle(handle, this.value);
                break;

            case 38:

                // Get step to go increase slider value (up)
                position = step[1];

                // false = no step is set
                if (position === false) {
                    position = 1;
                }

                // null = edge of slider
                if (position !== null) {
                    ranger.noUiSlider.setHandle(handle, value + position);
                }

                break;

            case 40:

                position = step[0];

                if (position === false) {
                    position = 1;
                }

                if (position !== null) {
                    ranger.noUiSlider.setHandle(handle, value - position);
                }

                break;
        }
    });
});

//СТРЕЛКА ПЕРЕВОРАЧИВАЕТСЯ В СПОЙЛЕРЕ НА СТРАНИЦЕ КАТАЛОГ:

/* $('.spoiler').click(function (event) {
    $('.spoiler').toggleClass('active');ЗАГОЛОВОК СПОЙЛЕРА МЕЯЕТСЯ НА СЕРЫЙ, СТРЕЛКА ПЕРЕВОРАЧИВАЕТСЯ
    $('.body-spoiler').slideToggle("slow");меню спойлера выезжает вниз
    ЭТО ПОДХОДИТ ТОЛЬКО ДЛЯ ОДНОГО РАЗА.
})*/
// ЕСЛИ МНОГО ОДИНАКОВЫХ, А НУЖНО, ЧТОБЫ ОТКРЫЛОСЬ ТОЛЬКО ОДНО МЕНЮ СМ КОД НИЖЕ:
    let spoilerTitle = document.querySelectorAll('.spoiler');
for (index = 0; index < spoilerTitle.length; index++) {
    const spoilerBody = spoilerTitle[index];
    spoilerBody.addEventListener("click", function (e) {
        spoilerBody.classList.toggle('active');
        spoilerBody.nextElementSibling.classList.toggle('active');
        e.preventDefault();
    });
}
