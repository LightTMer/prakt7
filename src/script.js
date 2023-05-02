var jquery = require("jquery");
window.$ = window.jQuery = jquery; // notice the definition of global variables here
import 'bootstrap/dist/css/bootstrap.css';
var $ = require('jquery');
window.$ = $;
require('bootstrap');


// Получаем DOM элементы. Работа с модальным окном

const modal = document.querySelector('#my-modal');
const modalBtn = document.querySelector('#modal-btn');
const closeBtn = document.querySelector('.close');

// События
modalBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', outsideClick);

// Открытие
function openModal() {
  modal.style.display = 'block';
}

// Закрытие
function closeModal() {
  modal.style.display = 'none';
}

// Закрытие, если нажали на задний вид
function outsideClick(e) {
  if (e.target == modal) {
  modal.style.display = 'none';
  }
}

//Модальное окно на jQuery

$(document).ready(function($) {
	$('.popup-open').click(function() {
		$('.popup-fade').fadeIn();
		return false;
	});	
	
	$('.popup-close').click(function() {
		$(this).parents('.popup-fade').fadeOut();
		return false;
	});		
 
	$(document).keydown(function(e) {
		if (e.keyCode === 27) {
			e.stopPropagation();
			$('.popup-fade').fadeOut();
		}
	});
	
	$('.popup-fade').click(function(e) {
		if ($(e.target).closest('.popup').length == 0) {
			$(this).fadeOut();					
		}
	});
});

// Слайдер на jQuery
$(window).on('load', function() {

	let nbImg = 0;
	$('.slider .container-images img').each(function() {
		nbImg += 1;
	});

	$('.slider .arrow').click(function() {
		let n = imageActive();
		
		$('.slider').removeClass('right left');

		if($(this).hasClass('left')) { 
			n -= 1;
			$('.slider').addClass('left');
			setTimeout(function() {
				$('.slider .container-images img.active').addClass('to_left');
			}, 50)
		}
		else if($(this).hasClass('right')) { 
			n += 1;
			$('.slider').addClass('right');
			setTimeout(function() {
				$('.slider .container-images img.active').addClass('to_right');
			}, 50)
		}

		if(n > nbImg) {n= nbImg; document.getElementById("rd").classList.add("disp");}
        else{document.getElementById("rd").classList.remove("disp")}
		if(n < 1) {n=1;document.getElementById("ld").classList.add("disp");}
        else{document.getElementById("ld").classList.remove("disp")}

		setTimeout(function() {
			$('.slider .container-images img').removeClass('active');
			$('.slider .container-images img:nth-child('+n+')').addClass('active');
		
			setTimeout(function() {
				$('.slider .container-images img').removeClass('to_left');
				$('.slider .container-images img').removeClass('to_right');
			}, 500)
		}, 50)
	});

	function imageActive() {
		let n = 1;
		$('.slider .container-images img').each(function(index) {
			if($(this).hasClass('active')) {
				n += index;
			}
		});
		return n;
	}

});

//Handlebars
import data from "../data/data.json";
import block from "../components/text.hbs";
import titles from "/components/title.hbs";

const root = document.getElementById('root');
const title = titles({title: data.h_name});
const blocks = block({blocks: data.blocks});

root.innerHTML +=title;
root.innerHTML +=blocks;