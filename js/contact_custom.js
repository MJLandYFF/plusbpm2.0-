/* JS Document */

/******************************

[Table of Contents]

1. Vars and Inits
2. Set Header
3. Init Search Form
4. Init Hamburger
5. Init Parallax
6. Init Scrolling
7. Init Google Map


******************************/

$(document).ready(function () {
	"use strict";

	/* 

	1. Vars and Inits

	*/

	var searchActive = false;
	var menuActive = false;
	var header = $('.header');
	var ctrl = new ScrollMagic.Controller();
	var map;

	setHeader();

	$(window).on('resize', function () {
		setHeader();
	});

	$(document).on('scroll', function () {
		setHeader();
	});

	initSearchForm();
	initHamburger();
	initParallax();
	initScrolling();
	// initGoogleMap();
	initMap();//创建和初始化地图
	/* 

	2. Set Header

	*/

	function setHeader() {
		if (window.innerWidth < 992) {
			if ($(window).scrollTop() > 100) {
				header.addClass('scrolled');
			}
			else {
				header.removeClass('scrolled');
			}
		}
		else {
			if ($(window).scrollTop() > 100) {
				header.addClass('scrolled');
			}
			else {
				header.removeClass('scrolled');
			}
		}
		if (window.innerWidth > 991 && menuActive) {
			closeMenu();
		}
	}

	/* 

	3. Init Search Form

	*/

	function initSearchForm() {
		if ($('.search_form').length) {
			var searchForm = $('.search_form');
			var searchInput = $('.search_input');
			var searchButton = $('.search_button');

			searchButton.on('click', function (event) {
				event.stopPropagation();

				if (!searchActive) {
					searchForm.addClass('active');
					searchActive = true;
					searchInput.focus();

					$(document).one('click', function closeForm(e) {
						if ($(e.target).hasClass('search_input')) {
							$(document).one('click', closeForm);
						}
						else {
							searchForm.removeClass('active');
							searchActive = false;
						}
					});
				}
				else {
					searchForm.removeClass('active');
					searchActive = false;
				}
			});
		}
	}

	/* 

	4. Init Hamburger

	*/

	function initHamburger() {
		if ($('.hamburger_container').length) {
			var hamb = $('.hamburger_container');

			hamb.on('click', function (event) {
				event.stopPropagation();

				if (!menuActive) {
					openMenu();

					$(document).one('click', function cls(e) {
						if ($(e.target).hasClass('menu_mm')) {
							$(document).one('click', cls);
						}
						else {
							closeMenu();
						}
					});
				}
				else {
					$('.menu_container').removeClass('active');
					menuActive = false;
				}
			});
		}
	}

	function openMenu() {
		$('.menu_container').addClass('active');
		menuActive = true;
	}

	function closeMenu() {
		$('.menu_container').removeClass('active');
		menuActive = false;
	}

	/* 

	5. Init Parallax

	*/

	function initParallax() {
		// Add parallax effect to home slider
		if ($('.slider_prlx').length) {
			var homeBcg = $('.slider_prlx');

			var homeBcgScene = new ScrollMagic.Scene({
				triggerElement: homeBcg,
				triggerHook: 1,
				duration: "100%"
			})
				.setTween(TweenMax.to(homeBcg, 1, { y: '15%', ease: Power0.easeNone }))
				.addTo(ctrl);
		}

		// Add parallax effect to every element with class prlx
		// Add class prlx_parent to the parent of the element
		if ($('.prlx_parent').length && $('.prlx').length) {
			var elements = $('.prlx_parent');

			elements.each(function () {
				var ele = this;
				var bcg = $(ele).find('.prlx');

				var slideParallaxScene = new ScrollMagic.Scene({
					triggerElement: ele,
					triggerHook: 1,
					duration: "200%"
				})
					.setTween(TweenMax.from(bcg, 1, { y: '-30%', ease: Power0.easeNone }))
					.addTo(ctrl);
			});
		}
	}

	/*

	6. Init Scrolling

	*/

	function initScrolling() {
		if ($('.nav_links').length) {

			/* Clicking on any element with class .nav_links scrolls down to the element set in the data-scroll-to value */

			var links = $('.nav_links');
			links.each(function () {
				var ele = $(this);
				var target = ele.data('scroll-to');
				ele.on('click', function (e) {
					e.preventDefault();
					$(window).scrollTo(target, 1500, { offset: -80, easing: 'easeInOutQuart' });
				});
			});
		}
	}

    /*

	7. baidu map

	*/
	//创建和初始化地图函数：
	function initMap() {
		createMap();//创建地图
		setMapEvent();//设置地图事件
		addMapControl();//向地图添加控件
	}

});

//创建地图函数：
function createMap() {
	var map = new BMap.Map("baidu_map");//在百度地图容器中创建一个地图
	var point = new BMap.Point(121.387114, 31.115127);//定义一个中心点坐标
	map.centerAndZoom(point, 17);//设定地图的中心点和坐标并将地图显示在地图容器中
	window.map = map;//将map变量存储在全局
}

//地图事件设置函数：
function setMapEvent() {
	map.enableDragging();//启用地图拖拽事件，默认启用(可不写)
	map.enableScrollWheelZoom();//启用地图滚轮放大缩小
	map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
	map.enableKeyboard();//启用键盘上下左右键移动地图
}

//地图控件添加函数：
function addMapControl() {
	//向地图中添加缩放控件
	var ctrl_nav = new BMap.NavigationControl({ anchor: BMAP_ANCHOR_TOP_LEFT, type: BMAP_NAVIGATION_CONTROL_SMALL });
	map.addControl(ctrl_nav);
	//向地图中添加缩略图控件
	var ctrl_ove = new BMap.OverviewMapControl({ anchor: BMAP_ANCHOR_BOTTOM_RIGHT, isOpen: 1 });
	map.addControl(ctrl_ove);
	//向地图中添加比例尺控件
	var ctrl_sca = new BMap.ScaleControl({ anchor: BMAP_ANCHOR_BOTTOM_LEFT });
	map.addControl(ctrl_sca);
}



jQuery(document).ready(function ($) {
	$(".scroll").click(function (event) {
		event.preventDefault();
		$('html,body').animate({ scrollTop: $(this.hash).offset().top }, 1000);
	});
});

$(document).ready(function () {
	/*
	var defaults = {
		containerID: 'toTop', // fading element id
		containerHoverID: 'toTopHover', // fading element hover id
		scrollSpeed: 1200,
		easingType: 'linear' 
	};
	*/

	$().UItoTop({ easingType: 'easeOutQuart' });

});