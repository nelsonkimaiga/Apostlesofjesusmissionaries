$(document).foundation()
$(window).scroll(function () {
    var scroll = $(window).scrollTop();

    if (scroll >= 50) {
        $(".header").addClass("scrolling");
    } else {
        $(".header").removeClass("scrolling");
    }
});

$(document).ready(function () {

    var deadline = new Date("2016/06/25");

    function updateClock() {
        var today = Date();
        var diff = Date.parse(deadline) - Date.parse(today);
        if (diff <= 0) {
            clearInterval(interval);
        } else {
            var seconds = Math.floor((diff / 1000) % 60);
            var minutes = Math.floor((diff / 1000 / 60) % 60);
            var hours = Math.floor((diff / 1000 / 60 / 60) % 24);
            var days = Math.floor(diff / (1000 * 60 * 60 * 24) % 30.5);
            var months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30.5) % 12);

            $("#months").text(('0' + months).slice(-2));
            $("#days").text(('0' + days).slice(-2));
            $("#hours").text(('0' + hours).slice(-2));
            $("#minutes").text(('0' + minutes).slice(-2));
            $("#seconds").text(('0' + seconds).slice(-2));

        } //EOF ELSE

    } //EOF FUNCTION

    var interval = setInterval(updateClock, 1000);

}); //EOF DOCUMENT.READY
$(function () {
    $('a[href*="#"]:not([href="#"])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });
});

// counter
(function ($) {
    $.fn.countTo = function (options) {
        // merge the default plugin settings with the custom options
        options = $.extend({}, $.fn.countTo.defaults, options || {});

        // how many times to update the value, and how much to increment the value on each update
        var loops = Math.ceil(options.speed / options.refreshInterval),
            increment = (options.to - options.from) / loops;

        return $(this).each(function () {
            var _this = this,
                loopCount = 0,
                value = options.from,
                interval = setInterval(updateTimer, options.refreshInterval);

            function updateTimer() {
                value += increment;
                loopCount++;
                $(_this).html(value.toFixed(options.decimals));

                if (typeof (options.onUpdate) == 'function') {
                    options.onUpdate.call(_this, value);
                }

                if (loopCount >= loops) {
                    clearInterval(interval);
                    value = options.to;

                    if (typeof (options.onComplete) == 'function') {
                        options.onComplete.call(_this, value);
                    }
                }
            }
        });
    };

    $.fn.countTo.defaults = {
        from: 0, // the number the element should start at
        to: 100, // the number the element should end at
        speed: 1000, // how long it should take to count between the target numbers
        refreshInterval: 100, // how often the element should be updated
        decimals: 0, // the number of decimal places to show
        onUpdate: null, // callback method for every time the element is updated,
        onComplete: null, // callback method for when the element finishes updating
    };
})(jQuery);

jQuery(function ($) {
    $('.timer').countTo({
        from: 50,
        to: 2500,
        speed: 5000,
        refreshInterval: 50,
        onComplete: function (value) {
            console.debug(this);
        }
    });
});

// view guy



// Returns true if the specified element has been scrolled into the viewport.
function isElementInViewport(elem) {
    var $elem = $(elem);

    // Get the scroll position of the page.
    var scrollElem = ((navigator.userAgent.toLowerCase().indexOf('webkit') != -1) ? 'body' : 'html');
    var viewportTop = $(scrollElem).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    // Get the position of the element on the page.
    var elemTop = Math.round($elem.offset().top);
    var elemBottom = elemTop + $elem.height();

    return ((elemTop < viewportBottom) && (elemBottom > viewportTop));
}

// Check if it's time to start the animation.
function checkAnimation() {
    var $elem = $('.timer');

    // If the animation has already been started
    if ($elem.hasClass('start')) return;

    if (isElementInViewport($elem)) {
        // Start the animation
        $elem.addClass('start');
    }
}

// Capture scroll events
$(window).scroll(function () {
    checkAnimation();
});
