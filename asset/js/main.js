/**
 *animateText
 *tabs
 *ajaxContactForm
 *ajaxSubscribe
 *canvas
 *infiniteSlide
 *stickyTabs
 *active_item
 *settings_color
**/

(function ($) {
    ("use strict");

    // animateText
    var animateText = function () {
        if ($(".text-color-change").length) {
            let animatedTextElements = document.querySelectorAll(".text-color-change");

            animatedTextElements.forEach((element) => {
                if (element.wordSplit) {
                    element.wordSplit.revert();
                }
                if (element.charSplit) {
                    element.charSplit.revert();
                }

                element.wordSplit = new SplitText(element, {
                    type: "words",
                    wordsClass: "word-wrapper",
                });

                element.charSplit = new SplitText(element.wordSplit.words, {
                    type: "chars",
                    charsClass: "char-wrapper",
                });

                gsap.set(element.charSplit.chars, {
                    color: "#DDDDDD4D",
                    opacity: 1,
                });

                element.animation = gsap.to(element.charSplit.chars, {
                    scrollTrigger: {
                        trigger: element,
                        start: "top 90%",
                        end: "bottom 35%",
                        toggleActions: "play none none reverse",
                        scrub: true,
                    },
                    color: "#ffffff",
                    stagger: {
                        each: 0.05,
                        from: "start",
                    },
                    duration: 0.5,
                    ease: "power2.out",
                });
            });
        }
        if ($(".text-fade-right").length > 0) {
            let animatedTextElements = document.querySelectorAll(".text-fade-right");
            animatedTextElements.forEach((element) => {
                if (element.animation) {
                    element.animation.progress(1).kill();
                    element.split.revert();
                }

                element.split = new SplitText(element, { type: "lines" });

                gsap.set(element, { perspective: 400 });

                gsap.set(element.split.lines, {
                    opacity: 0,
                    y: 30,
                });

                element.animation = gsap.to(element.split.lines, {
                    scrollTrigger: {
                        trigger: element,
                        start: "top 90%",
                        toggleActions: "play reverse play reverse",
                    },
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "back",
                    stagger: {
                        amount: 0.1,
                        from: "start",
                        ease: "sine.inOut",
                    },
                });
            });
        }

        if ($(".text-anime-clip").length > 0) {
            const textElements = document.querySelectorAll(".text-anime-clip");

            textElements.forEach((textElement) => {
                gsap.fromTo(
                    textElement,
                    { clipPath: "inset(0 0 100% 0)" },
                    {
                        clipPath: "inset(0 0 0 0)",
                        duration: 0.6,
                        ease: "back.out(1.7)",
                        scrollTrigger: {
                            trigger: textElement,
                            start: "top 90%",
                            toggleActions: "play reverse play reverse",
                        },
                    }
                );
            });
        }
    };

    // tabs
    var tabs = function () {
        $(".wg-tabs").each(function () {
            $(this).find(".widget-content-tab").children().hide();
            $(this).find(".widget-content-tab").children(".active").show();
            $(this)
                .find(".menu-tab")
                .children(".item")
                .on("click", function () {
                    var liActive = $(this).index();
                    var contentActive = $(this)
                        .siblings()
                        .removeClass("active")
                        .parents(".wg-tabs")
                        .find(".widget-content-tab")
                        .children()
                        .eq(liActive);
                    contentActive.addClass("active").fadeIn("slow");
                    contentActive.siblings().removeClass("active");
                    $(this)
                        .addClass("active")
                        .parents(".wg-tabs")
                        .find(".widget-content-tab")
                        .children()
                        .eq(liActive)
                        .siblings()
                        .hide();
                });
        });
    };

    // contact form (EmailJS)
    var ajaxContactForm = function () {
        var emailJsConfig = {
            serviceId: "service_2ut8onr",
            templateId: "template_afk86eu",
            publicKey: "K1r6e3NtrfnwC6SRp",
        };
        if (window.emailjs && typeof window.emailjs.init === "function") {
            window.emailjs.init({
                publicKey: emailJsConfig.publicKey,
            });
        }

        var showToast = function (message, type) {
            var $wrap = $("#premium-toast-wrap");
            if (!$wrap.length) {
                $wrap = $('<div id="premium-toast-wrap" class="premium-toast-wrap"></div>');
                $("body").append($wrap);
            }
            var tone = type === "msg-success" ? "success" : "error";
            var $toast = $(
                '<div class="premium-toast ' +
                    tone +
                    '">' +
                    '<div class="premium-toast-content">' +
                    '<span class="premium-toast-icon">' +
                    (tone === "success" ? "✓" : "!") +
                    "</span>" +
                    '<span class="premium-toast-text"></span>' +
                    "</div>" +
                    '<button type="button" class="premium-toast-close" aria-label="Close">×</button>' +
                    "</div>"
            );
            $toast.find(".premium-toast-text").text(message);
            $wrap.append($toast);
            window.requestAnimationFrame(function () {
                $toast.addClass("show");
            });
            var removeToast = function () {
                $toast.removeClass("show");
                setTimeout(function () {
                    $toast.remove();
                }, 260);
            };
            $toast.find(".premium-toast-close").on("click", removeToast);
            setTimeout(removeToast, 5200);
        };

        $('#form-contact').each(function () {
            $(this).validate({
                submitHandler: function (form) {
                    var $form = $(form),
                        loading = $('<div />', { 'class': 'loading' });
                    var payload = {
                        // Keep multiple aliases so different template variable names work.
                        to_email: "tatheerabidi00@gmail.com",
                        to_name: "S Tatheer Hussain",
                        from_email: form.mail.value,
                        mail: form.mail.value,
                        email: form.mail.value,
                        reply_to: form.mail.value,
                        phone: form.phone.value,
                        whatsapp: form.phone.value,
                        message: form.message.value,
                        project_details: form.message.value,
                        submitted_at: new Date().toLocaleString(),
                    };
                    var showAlert = function (message, cls) {
                        $form.find(".flat-alert").remove();
                        showToast(message, cls);
                    };

                    $form.find(".send-wrap").append(loading);
                    if (!(window.emailjs && typeof window.emailjs.send === "function")) {
                        showAlert("Email service failed to load. Please refresh and try again.", "msg-error");
                        $form.find(".loading").remove();
                        return;
                    }

                    window.emailjs
                        .send(emailJsConfig.serviceId, emailJsConfig.templateId, payload)
                        .then(function () {
                            showAlert("Message sent successfully. I will get back to you soon.", "msg-success");
                            $form.find(":input").not(".submit, button").val("");
                        })
                        .catch(function (error) {
                            var reason = "Error sending email. Please check EmailJS template variables.";
                            if (error && (error.text || error.message)) {
                                reason += " (" + (error.text || error.message) + ")";
                            }
                            showAlert(reason, "msg-error");
                        })
                        .finally(function () {
                            $form.find(".loading").remove();
                        });
                }
            });
        });
    };

    // subscribe mailchimp
    var ajaxSubscribe = {
        obj: {
            subscribeEmail: $("#subscribe-email"),
            subscribeButton: $("#subscribe-button"),
            subscribeMsg: $("#subscribe-msg"),
            subscribeContent: $("#subscribe-content"),
            dataMailchimp: $("#subscribe-form").attr("data-mailchimp"),
            success_message:
                '<div class="notification_ok">Thank you for joining our mailing list! Please check your email for a confirmation link.</div>',
            failure_message:
                '<div class="notification_error">Error! <strong>There was a problem processing your submission.</strong></div>',
            noticeError: '<div class="notification_error">{msg}</div>',
            noticeInfo: '<div class="notification_error">{msg}</div>',
            basicAction: "asset/mail/subscribe.php",
            mailChimpAction: "asset/mail/subscribe-mailchimp.php",
        },

        eventLoad: function () {
            var objUse = ajaxSubscribe.obj;

            $(objUse.subscribeButton).on("click", function () {
                if (window.ajaxCalling) return;
                var isMailchimp = objUse.dataMailchimp === "true";

                if (isMailchimp) {
                    ajaxSubscribe.ajaxCall(objUse.mailChimpAction);
                } else {
                    ajaxSubscribe.ajaxCall(objUse.basicAction);
                }
            });
        },

        ajaxCall: function (action) {
            window.ajaxCalling = true;
            var objUse = ajaxSubscribe.obj;
            var messageDiv = objUse.subscribeMsg.html("").hide();
            $.ajax({
                url: action,
                type: "POST",
                dataType: "json",
                data: {
                    subscribeEmail: objUse.subscribeEmail.val(),
                },
                success: function (responseData, textStatus, jqXHR) {
                    if (responseData.status) {
                        objUse.subscribeContent.fadeOut(500, function () {
                            messageDiv.html(objUse.success_message).fadeIn(500);
                        });
                    } else {
                        switch (responseData.msg) {
                            case "email-required":
                                messageDiv.html(
                                    objUse.noticeError.replace("{msg}", "Error! <strong>Email is required.</strong>")
                                );
                                break;
                            case "email-err":
                                messageDiv.html(
                                    objUse.noticeError.replace("{msg}", "Error! <strong>Email invalid.</strong>")
                                );
                                break;
                            case "duplicate":
                                messageDiv.html(
                                    objUse.noticeError.replace("{msg}", "Error! <strong>Email is duplicate.</strong>")
                                );
                                break;
                            case "filewrite":
                                messageDiv.html(
                                    objUse.noticeInfo.replace(
                                        "{msg}",
                                        "Error! <strong>Mail list file is open.</strong>"
                                    )
                                );
                                break;
                            case "undefined":
                                messageDiv.html(
                                    objUse.noticeInfo.replace("{msg}", "Error! <strong>undefined error.</strong>")
                                );
                                break;
                            case "api-error":
                                objUse.subscribeContent.fadeOut(500, function () {
                                    messageDiv.html(objUse.failure_message);
                                });
                        }
                        messageDiv.fadeIn(500);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert("Connection error");
                },
                complete: function (data) {
                    window.ajaxCalling = false;
                },
            });
        },
    };

    // canvas
    var canvas = function () {
        $(".tf-btn-menu").on("click", function () {
            $(".tf-sidebar-menu").addClass("active");
        });

        $(".close-canvas").on("click", function () {
            $(this).closest('.tf-canvas').removeClass("active");
        });
        $(".overlay").on("click", function () {
            $(this).closest('.tf-canvas').removeClass("active");
        });

        $(".tf-sidebar-menu .sidebar-nav a").on("click", function () {
            $(this).closest('.tf-canvas').removeClass("active");
        });
    }

    // infiniteSlide
    var infiniteSlide = function () {
        $(".infiniteslide").each(function () {
          var $this = $(this);
          var style = $this.data("style") || "left";
          var clone = parseInt($this.data("clone"),10) || 2;
          var speed = parseInt($this.data("speed"),10) || 100;
      
          $this.infiniteslide({
            speed: speed,
            direction: style,
            clone: clone,
          });
        });
    };

    // stickyTabs
    var stickyTabs = function () {
        let sectionIds = $('a.scroll-to');
        $(document).scroll(function () {
            let viewportTrigger = $(document).scrollTop() + ($(window).height() * 0.4);
            sectionIds.each(function () {
                let container = $(this).attr('href');
                if (!container || container.charAt(0) !== '#') {
                    return;
                }
                let $container = $(container);
                if (!$container.length) {
                    return;
                }
                let containerOffset = $container.offset().top;
                let containerHeight = $container.outerHeight();
                let containerBottom = containerOffset + containerHeight;
                if (viewportTrigger < containerBottom - 20 && viewportTrigger >= containerOffset - 20) {
                $(this).addClass('active');
                } else {
                $(this).removeClass('active');
                }
            });
        });
    }

    // Custom arrow cursor + SVG motion (desktop only; skips reduced-motion users)
    var initCustomCursor = function () {
        if (
            window.matchMedia &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
            return;
        }
        if (!window.matchMedia("(pointer: fine)").matches) {
            return;
        }
        if (window.matchMedia("(max-width: 991px)").matches) {
            return;
        }

        var uid =
            "sc" +
            Math.random().toString(36).slice(2, 10) +
            Math.random().toString(36).slice(2, 6);
        var wrap = document.createElement("div");
        wrap.className = "site-cursor";
        wrap.setAttribute("aria-hidden", "true");
        wrap.innerHTML =
            '<svg class="site-cursor-svg" width="36" height="36" viewBox="-1.5 -1.5 35 35" aria-hidden="true" overflow="visible">' +
            "<defs>" +
            '<linearGradient id="' +
            uid +
            '-fill" x1="0%" y1="100%" x2="100%" y2="0%">' +
            '<stop offset="0%" stop-color="#021327"/>' +
            '<stop offset="38%" stop-color="#003d99"/>' +
            '<stop offset="72%" stop-color="#005fea"/>' +
            '<stop offset="100%" stop-color="#8ec5ff"/>' +
            '<animate attributeName="x2" values="85%;115%;85%" dur="3.2s" repeatCount="indefinite"/>' +
            '<animate attributeName="y1" values="100%;70%;100%" dur="3.2s" repeatCount="indefinite"/>' +
            "</linearGradient>" +
            '<linearGradient id="' +
            uid +
            '-shine" gradientUnits="userSpaceOnUse" x1="0" y1="32" x2="28" y2="0">' +
            '<stop offset="0%" stop-color="#ffffff" stop-opacity="0"/>' +
            '<stop offset="45%" stop-color="#ffffff" stop-opacity="0.45"/>' +
            '<stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>' +
            '<animateTransform attributeName="gradientTransform" type="translate" values="-10 6; 12 -8; -10 6" dur="2.4s" repeatCount="indefinite"/>' +
            "</linearGradient>" +
            '<clipPath id="' +
            uid +
            '-clip">' +
            '<path d="M0 0 L0 24 L7 17 L11 28 L15 26 L11 15 L24 15 L0 0"/>' +
            "</clipPath>" +
            "</defs>" +
            '<path class="site-cursor-shape" fill="url(#' +
            uid +
            '-fill)" stroke="#0c0c0c" stroke-width="1.35" stroke-linejoin="round" d="M0 0 L0 24 L7 17 L11 28 L15 26 L11 15 L24 15 L0 0"/>' +
            '<g clip-path="url(#' +
            uid +
            '-clip)">' +
            '<rect x="-6" y="-6" width="44" height="44" fill="url(#' +
            uid +
            '-shine)" opacity="0.75"/>' +
            '<path fill="none" stroke="#cff0ff" stroke-width="1.1" stroke-linecap="round" d="M8 4 L10 13 M6.5 11.5 L12.5 9 M9.5 15.5 L16 17.5">' +
            '<animate attributeName="opacity" values="0.2;1;0.35;1;0.2" dur="0.75s" repeatCount="indefinite"/>' +
            "</path>" +
            '<path fill="none" stroke="#ffffff" stroke-width="1" stroke-linecap="round" d="M9 5 L11 14">' +
            '<animate attributeName="opacity" values="0;0.95;0" dur="0.9s" repeatCount="indefinite"/>' +
            "</path>" +
            "</g>" +
            "</svg>";

        document.body.appendChild(wrap);
        document.body.classList.add("site-cursor-on");

        var pointerSelector =
            "a, button, input, textarea, select, [role='button'], .tf-btn-menu, .close-canvas, label, .scroll-to, .overlay, [type='submit']";

        var cx = 0;
        var cy = 0;
        var rafId = null;

        function paintCursor() {
            rafId = null;
            wrap.style.transform =
                "translate3d(" + cx + "px," + cy + "px,0)";
        }

        function onMove(e) {
            cx = e.clientX;
            cy = e.clientY;
            if (rafId === null) {
                rafId = window.requestAnimationFrame(paintCursor);
            }
            var t = e.target;
            var interactive = t.closest && t.closest(pointerSelector);
            document.body.classList.toggle(
                "site-cursor-pointer",
                !!interactive
            );
        }

        window.addEventListener("mousemove", onMove, { passive: true });
    };

    // Cursor-follow primary glow on cards
    var initCardSpotlight = function () {
        if (
            window.matchMedia &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
            return;
        }
        var selector = [
            ".experiences-wrap .item",
            ".section-hero .indicators .indicators-item",
            ".section-hero .indicators .more-infor",
            ".projects-cta-card",
            ".banner-slider",
            ".section-services-inner",
            ".accordion-wrap .accordion-item",
            ".box-playground",
            ".section-tech-stack .tech-stack-item",
            ".section-testimonial-inner",
            ".section-partners .partners-item",
            ".section-process .process-item",
            ".section-awards .award-item",
            ".pricing-item",
            ".section-pricing .custom-quote",
            ".section-contact-inner",
        ].join(",");

        var seen = new Set();
        var onMove = function (e) {
            var el = e.currentTarget;
            var rect = el.getBoundingClientRect();
            var w = Math.max(rect.width, 1);
            var h = Math.max(rect.height, 1);
            var x = ((e.clientX - rect.left) / w) * 100;
            var y = ((e.clientY - rect.top) / h) * 100;
            el.style.setProperty("--spot-x", x.toFixed(2) + "%");
            el.style.setProperty("--spot-y", y.toFixed(2) + "%");
        };
        var onLeave = function (e) {
            var el = e.currentTarget;
            el.style.removeProperty("--spot-x");
            el.style.removeProperty("--spot-y");
        };

        document.querySelectorAll(selector).forEach(function (el) {
            if (seen.has(el)) {
                return;
            }
            seen.add(el);
            el.classList.add("spotlight-card");
            el.addEventListener("mousemove", onMove, { passive: true });
            el.addEventListener("mouseleave", onLeave, { passive: true });
        });
    };

    // site_loader — wait for window load + minimum time so “Tatheer” animation reads
    var site_loader = function () {
        var minShowMs = 920;
        var t0 = Date.now();
        var revealed = false;
        var scheduled = false;
        var $loader = $("#site-loader");

        function scheduleReveal() {
            if (revealed || scheduled) {
                return;
            }
            scheduled = true;
            var wait = Math.max(0, minShowMs - (Date.now() - t0));
            setTimeout(function () {
                if (revealed) {
                    return;
                }
                revealed = true;
                $("body").addClass("site-loaded");
                if ($loader.length) {
                    $loader.attr({
                        "aria-busy": "false",
                        "aria-hidden": "true",
                        "aria-valuetext": "Loaded",
                    });
                }
            }, wait);
        }

        $(window).on("load", scheduleReveal);
        setTimeout(scheduleReveal, 12000);
    }

    // Dom Ready
    $(function () {
        site_loader();
        animateText();
        tabs();
        ajaxContactForm();
        ajaxSubscribe.eventLoad();
        canvas();
        infiniteSlide();
        stickyTabs();
        initCustomCursor();
        initCardSpotlight();
    });
})(jQuery);
