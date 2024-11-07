/**
 * WEBSITE: https://themefisher.com
 * TWITTER: https://twitter.com/themefisher
 * FACEBOOK: https://www.facebook.com/themefisher
 * GITHUB: https://github.com/themefisher/
 */

// Preloader js    
$(window).on('load', function () {
	'use strict';
	$('.preloader').fadeOut(100);
});

(function ($) {
	'use strict';

	$(window).on('scroll', function () {
		var scrolling = $(this).scrollTop();
		if (scrolling > 10) {
			$('.navigation').addClass('nav-bg');
		} else {
			$('.navigation').removeClass('nav-bg');
		}
	});

	// tab
	$('.tab-content').find('.tab-pane').each(function (idx, item) {
		var navTabs = $(this).closest('.code-tabs').find('.nav-tabs'),
			title = $(this).attr('title');
		navTabs.append('<li class="nav-item"><a class="nav-link" href="#">' + title + '</a></li>');
	});

	$('.code-tabs ul.nav-tabs').each(function () {
		$(this).find('li:first').addClass('active');
	});

	$('.code-tabs .tab-content').each(function () {
		$(this).find('div:first').addClass('active');
	});

	$('.nav-tabs a').click(function (e) {
		e.preventDefault();
		var tab = $(this).parent(),
			tabIndex = tab.index(),
			tabPanel = $(this).closest('.code-tabs'),
			tabPane = tabPanel.find('.tab-pane').eq(tabIndex);
		tabPanel.find('.active').removeClass('active');
		tab.addClass('active');
		tabPane.addClass('active');
	});

	// Accordions
	$('.collapse').on('shown.bs.collapse', function () {
		$(this).parent().find('.ti-plus').removeClass('ti-plus').addClass('ti-minus');
	}).on('hidden.bs.collapse', function () {
		$(this).parent().find('.ti-minus').removeClass('ti-minus').addClass('ti-plus');
	});

	//post slider
	$('.post-slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		dots: false,
		arrows: true,
		prevArrow: '<button type=\'button\' class=\'prevArrow\'><i class=\'ti-angle-left\'></i></button>',
		nextArrow: '<button type=\'button\' class=\'nextArrow\'><i class=\'ti-angle-right\'></i></button>'
	});

	// copy to clipboard
	$('.copy').click(function () {
		$(this).siblings('.inputlink').select();
		document.execCommand('copy');
	});


	// instafeed
	if (($('#instafeed').length) !== 0) {
		var accessToken = $('#instafeed').attr('data-accessToken');
		var userFeed = new Instafeed({
			get: 'user',
			resolution: 'low_resolution',
			accessToken: accessToken,
			template: '<div class="instagram-post"><a href="{{link}}" target="_blank"><img src="{{image}}"></a></div>'
		});
		userFeed.run();
	}

	setTimeout(function () {
		$('.instagram-slider').slick({
			dots: false,
			speed: 300,
			autoplay: true,
			arrows: false,
			slidesToShow: 8,
			slidesToScroll: 1,
			responsive: [{
					breakpoint: 1024,
					settings: {
						slidesToShow: 6
					}
				},
				{
					breakpoint: 600,
					settings: {
						slidesToShow: 4
					}
				},
				{
					breakpoint: 480,
					settings: {
						slidesToShow: 2
					}
				}
			]
		});
	}, 1500);


	// popup video
	var $videoSrc;
	$('.video-btn').click(function () {
		$videoSrc = $(this).data('src');
	});
	// console.log($videoSrc);
	$('#myModal').on('shown.bs.modal', function (e) {
		$('#video').attr('src', $videoSrc + '?autoplay=1&amp;modestbranding=1&amp;showinfo=0');
	});
	$('#myModal').on('hide.bs.modal', function (e) {
		$('#video').attr('src', $videoSrc);
	});



})(jQuery);