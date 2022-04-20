const langArrow = document.querySelector('.languages__arrow');
const languages = document.querySelector('.languages>ul');
//!--------------------------------Languages--------------------------------------------------------------
document.addEventListener('click', () => {
	if ((event.target.closest('.languages__arrow')) || (event.target.closest('.languages>ul'))) {
		langArrow.classList.toggle('_active')
		languages.classList.toggle('_active')
	} else {
		langArrow.classList.remove('_active')
		languages.classList.remove('_active')
	}
});
//!---------------------Menu--------------------------------------------
const menuArrow = document.querySelector('.menu__arrow');
const menuList = document.querySelector('.menu-inner ul');

menuArrow.addEventListener('click', () => {
	menuArrow.classList.toggle('_active')
	menuList.classList.toggle('_active')
})
//!---------------------brand-options--------------------------------------------
const brandOptionsArrow = document.querySelector('.brand-options__arrow');
const brandOptionsList = document.querySelector('.brand-options-inner ul');

brandOptionsArrow.addEventListener('click', () => {
	brandOptionsArrow.classList.toggle('_active')
	brandOptionsList.classList.toggle('_active')
})
//!---------------------category-options--------------------------------------------
const categoryOptionsArrow = document.querySelector('.category-options__arrow');
const categoryOptionsList = document.querySelector('.category-options-inner ul');

categoryOptionsArrow.addEventListener('click', () => {
	categoryOptionsArrow.classList.toggle('_active')
	categoryOptionsList.classList.toggle('_active')
})



//!----------------------Product-in-details slider----------------------------------
// непосредственно блок со слайдами
const pIdSliderBlock = document.querySelector('.product-in-detail__slider')
//nodelist со всеми слайдами
const pIdSliderItems = document.querySelectorAll('.product-in-detail__slider-item')
//превращаем nodelist из изображений внутри слайдов в массив
const pIdSliderItemsArray = Array.from(document.querySelectorAll('.product-in-detail__slider-item>img'));
//создаем новый массив, сосотоящий из src этих изображений
const pIdSlideItemsSrc = pIdSliderItemsArray.map(el => el.src);
//в css предварительно даем display:none всем слайдам, кроме тех, которые показываются
//на начальном экране (кроме первых 3х) + сейчас удаляем эти слайды вообще из длока
for (let i = 3; i < pIdSliderItems.length; i++) {
	pIdSliderItems[i].remove()
}

// шаг смещения transform и left, получается он из процентной ширины одного слайда + процентный
// margin от каждого слайда
let pIdOffset = 37;
pIdOpacity = 100;

//Сдвиг prev 
//цифра 3 - индекс 4го элемента в массиве с src (если изначально показываются 3 слайда, то 
// равен 3, 4 - равен четырем)
let pIdStepPr = 3;
// сдвиг вправо, изначально также равен количеству блоков, которые показываются изначально
let pIdLeftCounterPr = 3
// сдвиг с помощью transform влево, изначально -1
let pIdTransformCounterPr = -1

// Сдвиг next
// поставить такие же значения
let pIdStepNext = pIdSlideItemsSrc.length - 1
let pIdLeftCounterNext = -1
let pIdTransformCounterNext = 1


function drawPrevButton() {
	// создаем и наполняем блок справа от слайдера
	let sliderItem = document.createElement('div')
	sliderItem.classList.add('product-in-detail__slider-item')
	//наполняем
	if (pIdSlideItemsSrc[pIdStepPr]) {
		sliderItem.innerHTML = `<img src = "${pIdSlideItemsSrc[pIdStepPr]}">`
	} else {
		pIdStepPr = 0
		sliderItem.innerHTML = `<img src = "${pIdSlideItemsSrc[pIdStepPr]}">`
	}

	//размещаем этот блок правее 3х видимых слайдов
	sliderItem.style.cssText = `
 					left: ${pIdOffset * pIdLeftCounterPr}%;
					 display:block `
	// добавляем блок с этими характеристиками в конец родителя
	document.querySelector('.product-in-detail__slider').append(sliderItem)
	// смещаем родитель влево с помощью translateX
	pIdSliderBlock.style.cssText = `
 					transform: translateX(${pIdOffset * pIdTransformCounterPr}%)`
	setTimeout(() => sliderItem.classList.add('_visible'), pIdOpacity)
	// удаляем первый блок, который уезжает левее слайдера
	pIdSliderBlock.firstElementChild.remove()


	pIdTransformCounterPr--
	pIdTransformCounterNext--

	pIdLeftCounterPr++
	pIdLeftCounterNext++

	pIdStepPr++
	pIdStepNext++

	if (!pIdSlideItemsSrc[pIdStepNext]) {
		pIdStepNext = 0
	}
};



function drawNextButton() {
	// создаем и наполняем блок слева от слайдера
	let sliderItem = document.createElement('div')
	sliderItem.classList.add('product-in-detail__slider-item')
	//наполняем
	if (pIdSlideItemsSrc[pIdStepNext]) {
		sliderItem.innerHTML = `<img src = "${pIdSlideItemsSrc[pIdStepNext]}">`
	} else {
		pIdStepNext = pIdSlideItemsSrc.length - 1
		sliderItem.innerHTML = `<img src = "${pIdSlideItemsSrc[pIdStepNext]}">`
	}
	//размещаем этот блок правее 3х видимых слайдов
	sliderItem.style.cssText = `
 					left: ${pIdOffset * pIdLeftCounterNext}%;
					 display:block; `
	// добавляем блок с этими характеристиками в конец родителя
	document.querySelector('.product-in-detail__slider').prepend(sliderItem)
	// смещаем родитель влево с помощью translateX
	pIdSliderBlock.style.cssText = `
 					transform: translateX(${pIdOffset * pIdTransformCounterNext}%); `
	setTimeout(() => sliderItem.classList.add('_visible'), pIdOpacity)

	// удаляем первый блок, который уезжает левее слайдера
	pIdSliderBlock.lastElementChild.remove()

	pIdTransformCounterNext++
	pIdTransformCounterPr++

	pIdLeftCounterNext--
	pIdLeftCounterPr--

	pIdStepNext--
	pIdStepPr--

	if (!pIdSlideItemsSrc[pIdStepNext]) {
		pIdStepPr = pIdSlideItemsSrc.length - 1
	}

};

// получаем весь блок с кнопками
const pIdSliderWrapper = document.querySelector('.product-in-detail__slider-wrapper');

if (pIdSliderItems.length > 3) {
	pIdSliderWrapper.addEventListener('click', () => {
		if (event.target.closest('.product-in-detail__slider-wrapper>img:nth-child(1)')) {
			drawPrevButton()
		}
		if (event.target.closest('.product-in-detail__slider-wrapper>img:nth-child(2)')) {
			drawNextButton()
		}
	})
}

//?Замена основного изображения товара при клике на изображение в слайдере
// блок со 	ВСЕМИ изображениями товара
const pIdImages = document.querySelector('.product-in-detail__images');

//основное изображение
const pIdBigImage = document.querySelector('.product-in-detail__big-image img');


pIdImages.addEventListener('click', () => {
	if (event.target.closest('.product-in-detail__slider-item')) {
		let pIdBigImageSrc = pIdBigImage.src;
		let sliderSrc = event.target.src;
		pIdBigImage.src = `${sliderSrc}`;
		event.target.src = `${pIdBigImageSrc}`;
		numSrc = pIdSlideItemsSrc.indexOf(sliderSrc);
		pIdSlideItemsSrc[numSrc] = pIdBigImageSrc;
	}
})


//!------------------------------------------product-more-info--------------------------------------------
const pMiTitles = document.querySelector('.product-more-info__titles');
const pMiTitlesItems = document.querySelectorAll('.product-more-info__titles li');
const pMiItems = document.querySelectorAll('.product-more-info__items>li');

pMiTitles.addEventListener('click', () => {
	if (event.target !== document.querySelector('.product-more-info__titles ul li._active')) {
		document.querySelector('.product-more-info__titles ul li._active').classList.remove('_active');
		document.querySelector('.product-more-info__items>li._active').classList.remove('_active');

		if (event.target === pMiTitlesItems[0]) {
			pMiTitlesItems[0].classList.add('_active')
			pMiItems[0].classList.add('_active')
		}
		if (event.target === pMiTitlesItems[1]) {
			pMiTitlesItems[1].classList.add('_active')
			pMiItems[1].classList.add('_active')
		}
		if (event.target === pMiTitlesItems[2]) {
			pMiTitlesItems[2].classList.add('_active')
			pMiItems[2].classList.add('_active')
		}
		if (event.target === pMiTitlesItems[3]) {
			pMiTitlesItems[3].classList.add('_active')
			pMiItems[3].classList.add('_active')
		}
	}
})


// //!-----------------------------------might-also-like-------------------------------------------------
// непосредственно блок со слайдами
const mAlSliderBlock = document.querySelector('.might-also-like__items-inner')
//nodelist со всеми слайдами
const mAlSliderItems = document.querySelectorAll('.might-also-like-product__item')
//превращаем nodelist из слайдов в массив
const mAlSliderItemsArray = Array.from(mAlSliderItems);
//создаем новый массив, сосотоящий из innerHtml каждого слайда
const mAlSlideItemsInnerHTML = mAlSliderItemsArray.map(el => el.innerHTML);
//в css предварительно даем display:none всем слайдам, кроме тех, которые показываются
//на начальном экране (кроме первых 3х) + сейчас удаляем эти слайды вообще из длока
let mAlOffset;
let mAlStepPr;
let mAlLeftCounterPr;

if (window.innerWidth > 600) {
	for (let i = 3; i < mAlSliderItems.length; i++) {
		mAlSliderItems[i].remove()
	};
	mAlOffset = 34.5;
	mAlStepPr = 3;
	mAlLeftCounterPr = 3;
}
if ((window.innerWidth <= 600) && (window.innerWidth>=420)) {
	for (let i = 2; i < mAlSliderItems.length; i++) {
		mAlSliderItems[i].remove()
	};
	mAlOffset = 53;
	mAlStepPr = 2;
	mAlLeftCounterPr = 2;
}
if (window.innerWidth < 420) {
	for (let i = 1; i < mAlSliderItems.length; i++) {
		mAlSliderItems[i].remove()
	};
	mAlOffset = 100;
	mAlStepPr = 1;
	mAlLeftCounterPr = 1;
}


let mAlOpacity = 100

// сдвиг с помощью transform влево, изначально -1
let mAlTransformCounterPr = -1

// Сдвиг next
// поставить такие же значения
let mAlStepNext = mAlSlideItemsInnerHTML.length - 1
let mAlLeftCounterNext = -1
let mAlTransformCounterNext = 1


function mAldrawPrevButton() {
	// создаем и наполняем блок справа от слайдера
	let sliderItem = document.createElement('div')
	sliderItem.classList.add('might-also-like-product__item')
	sliderItem.classList.add('product-item')
	
	//наполняем
	if (mAlSlideItemsInnerHTML[mAlStepPr]) {
		sliderItem.innerHTML = mAlSlideItemsInnerHTML[mAlStepPr]
	} else {
		mAlStepPr = 0
		sliderItem.innerHTML = mAlSlideItemsInnerHTML[mAlStepPr]
	}

	//размещаем этот блок правее 3х видимых слайдов
	sliderItem.style.cssText = `
 					left: ${mAlOffset * mAlLeftCounterPr}%;
					 display:block `
	// добавляем блок с этими характеристиками в конец родителя
	mAlSliderBlock.append(sliderItem)
	// смещаем родитель влево с помощью translateX
	mAlSliderBlock.style.cssText = `
 					transform: translateX(${mAlOffset * mAlTransformCounterPr}%)`
	setTimeout(() => sliderItem.classList.add('_visible'), mAlOpacity)
	// удаляем первый блок, который уезжает левее слайдера
	mAlSliderBlock.firstElementChild.remove()


	mAlTransformCounterPr--
	mAlTransformCounterNext--

	mAlLeftCounterPr++
	mAlLeftCounterNext++

	mAlStepPr++
	mAlStepNext++

	if (!mAlSlideItemsInnerHTML[mAlStepNext]) {
		mAlStepNext = 0
	}
};



function mAldrawNextButton() {
	// создаем и наполняем блок слева от слайдера
	let sliderItem = document.createElement('div')
	sliderItem.classList.add('might-also-like-product__item')
	sliderItem.classList.add('product-item')
	//наполняем
	if (mAlSlideItemsInnerHTML[mAlStepNext]) {
		sliderItem.innerHTML = mAlSlideItemsInnerHTML[mAlStepNext]
	} else {
		mAlStepNext = mAlSlideItemsInnerHTML.length - 1
		sliderItem.innerHTML = mAlSlideItemsInnerHTML[mAlStepNext]
	}
	//размещаем этот блок правее 3х видимых слайдов
	sliderItem.style.cssText = `
 					left: ${mAlOffset * mAlLeftCounterNext}%;
					 display:block; `
	// добавляем блок с этими характеристиками в конец родителя
	mAlSliderBlock.prepend(sliderItem)
	// смещаем родитель влево с помощью translateX
	mAlSliderBlock.style.cssText = `
 					transform: translateX(${mAlOffset * mAlTransformCounterNext}%); `
	setTimeout(() => sliderItem.classList.add('_visible'), mAlOpacity)
	
	

	// удаляем первый блок, который уезжает левее слайдера
	mAlSliderBlock.lastElementChild.remove()

	mAlTransformCounterNext++
	mAlTransformCounterPr++

	mAlLeftCounterNext--
	mAlLeftCounterPr--

	mAlStepNext--
	mAlStepPr--

	if (!mAlSlideItemsInnerHTML[mAlStepNext]) {
		mAlStepPr = mAlSlideItemsInnerHTML.length - 1
	}

};

// получаем весь блок с кнопками
const mAlSliderWrapper = document.querySelector('.might-also-like__items');

if (mAlSliderItems.length > 3) {
	mAlSliderWrapper.addEventListener('click', () => {
		if (event.target.closest('.might-also-like__button-prev')) {
			mAldrawPrevButton()
		}
		if (event.target.closest('.might-also-like__button-next')) {
			mAldrawNextButton()
		}
	})
}
// //!-----------------------recently-viewed--------------------------------------
// непосредственно блок со слайдами
const rVSliderBlock = document.querySelector('.recently-viewed__items-inner')
//nodelist со всеми слайдами
const rVSliderItems = document.querySelectorAll('.recently-viewed-product__item')
//превращаем nodelist из слайдов в массив
const rVSliderItemsArray = Array.from(mAlSliderItems);
//создаем новый массив, сосотоящий из innerHtml каждого слайда
const rVSlideItemsInnerHTML = rVSliderItemsArray.map(el => el.innerHTML);
//в css предварительно даем display:none всем слайдам, кроме тех, которые показываются
//на начальном экране (кроме первых 3х) + сейчас удаляем эти слайды вообще из длока
let rVOffset;
let rVStepPr;
let rVLeftCounterPr;

if (window.innerWidth > 600) {
	for (let i = 3; i < rVSliderItems.length; i++) {
		rVSliderItems[i].remove()
	};
	rVOffset = 34.5;
	rVStepPr = 3;
	rVLeftCounterPr = 3;
}
if ((window.innerWidth <= 600) && (window.innerWidth >= 420)) {
	for (let i = 2; i < rVSliderItems.length; i++) {
		rVSliderItems[i].remove()
	};
	rVOffset = 53;
	rVStepPr = 2;
	rVLeftCounterPr = 2;
}
if (window.innerWidth < 420) {
	for (let i = 1; i < rVSliderItems.length; i++) {
		rVSliderItems[i].remove()
	};
	rVOffset = 100;
	rVStepPr = 1;
	rVLeftCounterPr = 1;
}


let rVOpacity = 100;

//Сдвиг prev 

// сдвиг с помощью transform влево, изначально -1
let rVTransformCounterPr = -1

// Сдвиг next
// поставить такие же значения
let rVStepNext = rVSlideItemsInnerHTML.length - 1
let rVLeftCounterNext = -1
let rVTransformCounterNext = 1


function rVdrawPrevButton() {
	// создаем и наполняем блок справа от слайдера
	let sliderItem = document.createElement('div')
	sliderItem.classList.add('recently-viewed-product__item')
	sliderItem.classList.add('product-item')

	//наполняем
	if (rVSlideItemsInnerHTML[rVStepPr]) {
		sliderItem.innerHTML = rVSlideItemsInnerHTML[rVStepPr]
	} else {
		rVStepPr = 0
		sliderItem.innerHTML = rVSlideItemsInnerHTML[rVStepPr]
	}

	//размещаем этот блок правее 3х видимых слайдов
	sliderItem.style.cssText = `
 					left: ${rVOffset * rVLeftCounterPr}%;
					 display:block `
	// добавляем блок с этими характеристиками в конец родителя
	rVSliderBlock.append(sliderItem)
	// смещаем родитель влево с помощью translateX
	rVSliderBlock.style.cssText = `
 					transform: translateX(${rVOffset * rVTransformCounterPr}%)`
	setTimeout(() => sliderItem.classList.add('_visible'), rVOpacity)
	// удаляем первый блок, который уезжает левее слайдера
	rVSliderBlock.firstElementChild.remove()


	rVTransformCounterPr--
	rVTransformCounterNext--

	rVLeftCounterPr++
	rVLeftCounterNext++

	rVStepPr++
	rVStepNext++

	if (!rVSlideItemsInnerHTML[rVStepNext]) {
		rVStepNext = 0
	}
};



function rVdrawNextButton() {
	// создаем и наполняем блок слева от слайдера
	let sliderItem = document.createElement('div')
	sliderItem.classList.add('recently-viewed-product__item')
	sliderItem.classList.add('product-item')
	//наполняем
	if (rVSlideItemsInnerHTML[rVStepNext]) {
		sliderItem.innerHTML = rVSlideItemsInnerHTML[rVStepNext]
	} else {
		rVStepNext = rVSlideItemsInnerHTML.length - 1
		sliderItem.innerHTML = rVSlideItemsInnerHTML[rVStepNext]
	}
	//размещаем этот блок правее 3х видимых слайдов
	sliderItem.style.cssText = `
 					left: ${rVOffset * rVLeftCounterNext}%;
					 display:block; `
	// добавляем блок с этими характеристиками в конец родителя
	rVSliderBlock.prepend(sliderItem)
	// смещаем родитель влево с помощью translateX
	rVSliderBlock.style.cssText = `
 					transform: translateX(${rVOffset * rVTransformCounterNext}%); `
	setTimeout(() => sliderItem.classList.add('_visible'), rVOpacity)



	// удаляем первый блок, который уезжает левее слайдера
	rVSliderBlock.lastElementChild.remove()

	rVTransformCounterNext++
	rVTransformCounterPr++

	rVLeftCounterNext--
	rVLeftCounterPr--

	rVStepNext--
	rVStepPr--

	if (!rVSlideItemsInnerHTML[rVStepNext]) {
		rVStepPr = rVSlideItemsInnerHTML.length - 1
	}

};

// получаем весь блок с кнопками
const rVSliderWrapper = document.querySelector('.recently-viewed__items');

if (rVSliderItems.length > 3) {
	rVSliderWrapper.addEventListener('click', () => {
		console.log('fghj')
		if (event.target.closest('.recently-viewed__button-prev')) {
			rVdrawPrevButton()
		}
		if (event.target.closest('.recently-viewed__button-next')) {
			rVdrawNextButton()
		}
	})
}

// //!-----------Popup--------------------------------------------------------

const popupLinks = document.querySelectorAll('.popup__link');
const popupCloseIcon = document.querySelectorAll('.close-popup');
const popups = document.querySelectorAll('.popup')
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');

document.addEventListener('click', () => {
	if (event.target.closest('.popup__link')) {
		let popupId = event.target.closest('.popup__link').getAttribute('href').replace('#', '');
		let requiredPopup = document.getElementById(popupId);
		openPopup(requiredPopup);
		event.preventDefault();
	}
})

document.addEventListener('click', () => {
	if (event.target.closest('.close-popup')) {
		closePopup(event.target.closest('.popup'))
		event.preventDefault();
	}
})

popups.forEach((el) => {
	el.addEventListener('click', () => {
		if (!event.target.closest('.popup__content')) {
			closePopup(event.target.closest('.popup'))
		}
	})
})
document.addEventListener('keydown', () => {
	if (event.code === 'Escape') {
		const popupActive = document.querySelector('.popup.open');
		closePopup(popupActive);
		
	}
});

function openPopup(requiredPopup) {
	const popupActive = document.querySelector('.popup.open');
	if (popupActive) {
		closePopup(popupActive);
		requiredPopup.classList.add('open');
	} else {
		requiredPopup.classList.add('open');
		bodyLock();
	}
}
function bodyLock() {
	const addPadding = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
	body.style.paddingRight = addPadding;
	lockPadding.forEach((el) => {
		el.style.paddingRight = addPadding;
	});
	body.classList.add('lock')
}
function bodyUnlock() {
	body.style.paddingRight = '0px';
	lockPadding.forEach((el) => {
		el.style.paddingRight = '0px';
	});
	body.classList.remove('lock')
}
function closePopup(willClosePopup) {
	willClosePopup.classList.remove('open');
	bodyUnlock()
}







//!---------------------------------------Счетчики----------------------------------
