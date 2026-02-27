/*
 * Tatheer Hussain - Portfolio
 * Refactored for EmailJS, smooth scroll, modern UX
 */

(function ($) {
    "use strict";

    $(document).ready(function () {

        // Mobile nav close on link click
        $('.nav-link-click').click(function () {
            $('.navbar-collapse').collapse('hide');
        });

        // Smooth scrolling for anchor links
        $('html').css('scroll-behavior', 'smooth');
        $(".onepage a").on('click', function (e) {
            e.preventDefault();
            var hash = this.hash;
            if (hash) {
                var position = $(hash).offset().top;
                $("html, body").animate({ scrollTop: position }, 800);
            }
        });

        // Preloader
        $(window).on('load', function () {
            $('.loader').fadeOut();
            $('#preloader-area').delay(350).fadeOut('slow');

        });

        // Sticky header
        function headerStyle() {
            if ($('.main-header').length) {
                var windowpos = $(window).scrollTop();
                var siteHeader = $('.main-header');
                if (windowpos >= 100) {
                    siteHeader.addClass('fixed-header');
                } else {
                    siteHeader.removeClass('fixed-header');
                }
            }
        }
        headerStyle();
        $(window).on('scroll', headerStyle);

        // Scroll to top button
        var progressPath = document.querySelector('.progress-wrap path');
        if (progressPath) {
            var pathLength = progressPath.getTotalLength();
            progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
            progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
            progressPath.style.strokeDashoffset = pathLength;
            progressPath.getBoundingClientRect();
            progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';

            var updateProgress = function () {
                var scroll = $(window).scrollTop();
                var height = $(document).height() - $(window).height();
                var progress = pathLength - (scroll * pathLength / height);
                progressPath.style.strokeDashoffset = progress;
            };
            updateProgress();
            $(window).scroll(updateProgress);
        }

        var offset = 150;
        var duration = 550;
        $(window).on('scroll', function () {
            if ($(this).scrollTop() > offset) {
                $('.progress-wrap').addClass('active-progress');
            } else {
                $('.progress-wrap').removeClass('active-progress');
            }
        });
        $('.progress-wrap').on('click', function (e) {
            e.preventDefault();
            $('html, body').animate({ scrollTop: 0 }, duration);
            return false;
        });

        // Testimonials slider
        if ($('.testimonials-wrap').length) {
            $('.testimonials-wrap').slick({
                dots: false,
                infinite: true,
                autoplay: true,
                autoplaySpeed: 4000,
                arrows: true,
                speed: 600,
                prevArrow: '.testimonial-prev',
                nextArrow: '.testimonial-next',
                slidesToShow: 2,
                slidesToScroll: 1,
                responsive: [{
                    breakpoint: 767,
                    settings: { slidesToShow: 1 }
                }]
            });
        }

        // WOW Animation
        if ($('.wow').length && typeof WOW !== 'undefined') {
            new WOW({
                boxClass: 'wow',
                animateClass: 'animated',
                offset: 0,
                mobile: true,
                live: true
            }).init();
        }
    });

    /* ==========================================================================
       CONTACT FORM - FormSubmit.co (works immediately, no setup)
       ========================================================================== */
    (function () {
        function showMessage(text, type) {
            var msgEl = document.getElementById("msgSubmit");
            if (msgEl) {
                msgEl.textContent = text;
                msgEl.className = "form-message " + type;
                msgEl.style.display = "block";
                setTimeout(function () {
                    msgEl.style.display = "none";
                    msgEl.className = "form-message";
                }, 6000);
            }
        }

        $(document).ready(function () {
            $("#contactForm").on("submit", function (e) {
                e.preventDefault();

                var name = $("#name").val().trim();
                var email = $("#email").val().trim();
                var subject = $("#subject").val().trim();
                var message = $("#message").val().trim();

                if (!name || !email || !subject || !message) {
                    showMessage("Please fill in all fields.", "error");
                    return false;
                }

                var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    showMessage("Please enter a valid email address.", "error");
                    return false;
                }

                var btn = $("#submitBtn");
                btn.prop("disabled", true).html('Sending... <i class="ri-loader-4-line"></i>');

                $.ajax({
                    url: "https://formsubmit.co/ajax/tatheerabidi00@gmail.com",
                    method: "POST",
                    contentType: "application/json",
                    dataType: "json",
                    data: JSON.stringify({
                        name: name,
                        email: email,
                        subject: subject,
                        message: message
                    }),
                    success: function () {
                        $("#contactForm")[0].reset();
                        showMessage("Thank you! Your message has been sent. I'll get back to you soon.", "success");
                    },
                    error: function () {
                        showMessage("Sorry, something went wrong. Please email tatheerabidi00@gmail.com directly.", "error");
                    },
                    complete: function () {
                        btn.prop("disabled", false).html('Send Message <i class="ri-mail-line"></i>');
                    }
                });

                return false;
            });
        });
    })();

})(window.jQuery);
