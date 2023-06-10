'use strict'

let elements = $('.elements');
let filtersColor = $('.filters__color');
let filtersFigure = $('.filters__shape');
let buttonAdd = $('.add');
let totalNum = $('.total__number');
let totalWord = $('.total__words');
let buttonClear = $('.clear')
let paremetrsColor = [];
let paremetrsFigure = [];

$.ajax({
    url: "pictures.json",
    dataType: "json"
}).done(function(data) {
    renderFigure(data,elements);
    chooseActiveEl(filtersColor);
    chooseActiveEl(filtersFigure);
    clearActiveClass(buttonClear, $('.elements__item'), filtersColor.find('li'), filtersFigure.find('li'),totalNum);

    buttonAdd.on('click', function() {
        paremetrsColor = [];
        paremetrsFigure = [];
        $('.elements__item').removeClass('active');

        checkActiveEl(filtersColor,paremetrsColor,'color');
        checkActiveEl(filtersFigure,paremetrsFigure,'shape');

        let numbActColor = $();
        $.each(paremetrsColor, function(index,color) {
            let act = $('.elements__item').filter(function() {
              return $(this).data('color') === color;
            });
            numbActColor = numbActColor.add(act)
            act.addClass('active');
        });
        showNumberEl(numbActColor,totalNum,totalWord);

        let numbActFigure = $();
        $.each(paremetrsFigure, function(index,figure) {
            let act = $('.elements__item').filter(function() {
                return $(this).data('shape') === figure;
            });
            numbActFigure = numbActFigure.add(act)
            act.addClass('active');
        })
        if(numbActColor.length === 0) {
            showNumberEl(numbActFigure,totalNum,totalWord);
        }

        if(paremetrsColor.length !== 0 && paremetrsFigure.length !== 0) {
            $('.elements__item').removeClass('active');
            paremetrsColor = [];
            paremetrsFigure = [];

            checkActiveEl(filtersColor,paremetrsColor,'color');
            checkActiveEl(filtersFigure,paremetrsFigure,'shape');

            let arrFilteredColor = $();
            $.each(paremetrsColor, function(index,color) {
                let act = $('.elements__item').filter(function() {
                    return $(this).data('color') === color;
                });
                arrFilteredColor = arrFilteredColor.add(act);
            })

            let arrFinal = $();
            $.each(paremetrsFigure, function(index,figure) {
                let act = arrFilteredColor.filter(function() {
                    return $(this).data('shape') === figure;
                })
                arrFinal = arrFinal.add(act);
                act.addClass('active');
            })

            showNumberEl(arrFinal,totalNum,totalWord);
        }
    })
})

function renderFigure(arr1,arr2) {
    $.each(arr1, function(index,elem) {
        arr2.append(`<li class="elements__item" data-color="${elem.color}" data-shape="${elem.shape}">
                            <img src="${elem.url}">
                        </li>`);
    })
}

function chooseActiveEl(arr) {
    arr.delegate('li', 'click', function() {
        $(this).toggleClass('active');
    });
}

function checkActiveEl(arrToCheck,arrResult,parametr) {
    let checkEl = arrToCheck.find('li').filter('.active');
    checkEl.each(function() {
        arrResult.push($(this).data(parametr));
    })
}

function clearActiveClass(button,arr1,arr2,arr3,table) {
    button.on('click', function() {
        arr1.removeClass('active');
        arr2.removeClass('active');
        arr3.removeClass('active');
        table.text('0');
    })
}

function showNumberEl(arr, res, resWord) {
    if (arr.length === 1) {
        res.text(arr.length);
        resWord.text('елемент');
    } else if (arr.length <= 4) {
        res.text(arr.length);
        resWord.text('елементи');
    } else if (arr.length > 4) {
        res.text(arr.length);
        resWord.text('елементів');
    }
}