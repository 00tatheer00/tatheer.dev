gsap.registerPlugin(ScrollTrigger);
/** ScrollTrigger: one-shot enter animations only (no scrub) for smooth native scrolling. */
if (typeof ScrollTrigger !== "undefined") {
    ScrollTrigger.config({ limitCallbacks: true });
}

(function ($) {
    ("use strict");

    var stOnce = {
        start: "top 92%",
        toggleActions: "play none none none",
        once: true,
        fastScrollEnd: true,
    };

    /* animation_text
  -------------------------------------------------------------------------*/
    const animationText = () => {
        const splitTextElements = document.querySelectorAll(".split-text");
        if (!splitTextElements.length) return;
        gsap.registerPlugin(SplitText);
        splitTextElements.forEach((el) => {
            const $el = $(el);
            const $target =
                $el.find("p, a").length > 0 ? $el.find("p, a")[0] : el;

            const pxlSplit = new SplitText($target, {
                type: "words, chars, lines",
                lineThreshold: 0.5,
                wordsClass: "word",
                linesClass: "split-line",
            });

            const gradientChars = $el.find(".text-gradient > .word > *");
            if (gradientChars.length) {
                let offset = 0;
                gradientChars.each((i, char) => {
                    const $char = $(char);
                    const parent = $char.parent();
                    const parentWidth = parent.outerWidth();

                    $char.css("background-size", `${parentWidth}px 100%`);
                    offset += $char.prev().outerWidth() || 0;
                    $char.css(
                        "background-position",
                        `${parentWidth - offset}px 0%`
                    );
                });
            }

            let splitTypeSet = pxlSplit.chars;
            gsap.set($target, { perspective: 400 });

            const settings = {
                scrollTrigger: {
                    trigger: $target,
                    start: "top 86%",
                    toggleActions: "play none none reset",
                    fastScrollEnd: true,
                    once: true,
                },
                duration: 0.9,
                stagger: 0.02,
                ease: "power3.out",
            };

            const hasClass = (className) => $el.hasClass(className);

            if (hasClass("effect-fade")) settings.opacity = 0;
            /* Horizontal slides removed — fade only */
            if (hasClass("effect-right") || hasClass("effect-left")) {
                settings.opacity = 0;
                settings.duration = 0.65;
            }
            if (hasClass("effect-up")) {
                settings.opacity = 0;
                settings.y = "80";
            }
            if (hasClass("effect-down")) {
                settings.opacity = 0;
                settings.y = "-80";
            }
            if (hasClass("effect-rotate")) {
                settings.opacity = 0;
                settings.rotateX = "50deg";
            }
            if (hasClass("effect-scale")) {
                settings.opacity = 0;
                settings.scale = "0.5";
            }

            if (
                hasClass("split-lines-transform") ||
                hasClass("split-lines-rotation-x")
            ) {
                pxlSplit.split({
                    type: "lines",
                    lineThreshold: 0.5,
                    linesClass: "split-line",
                });

                splitTypeSet = pxlSplit.lines;
                settings.opacity = 0;
                settings.stagger = 0.5;

                if (hasClass("split-lines-rotation-x")) {
                    settings.rotationX = -120;
                    settings.transformOrigin = "top center -50";
                } else {
                    settings.yPercent = 100;
                    settings.autoAlpha = 0;
                }
            }

            if (hasClass("split-words-scale")) {
                pxlSplit.split({ type: "words" });
                splitTypeSet = pxlSplit.words;

                splitTypeSet.forEach((elw, index) => {
                    gsap.set(
                        elw,
                        {
                            opacity: 0,
                            scale: index % 2 === 0 ? 0 : 2,
                            force3D: true,
                            duration: 0.1,
                            ease: "power3.out",
                            stagger: 0.02,
                        },
                        index * 0.01
                    );
                });

                gsap.to(splitTypeSet, {
                    scrollTrigger: {
                        trigger: el,
                        start: "top 86%",
                        toggleActions: "play none none none",
                        once: true,
                    },
                    rotateX: "0",
                    scale: 1,
                    opacity: 1,
                });
            } else {
                gsap.from(splitTypeSet, settings);
            }
        });
    };

    /* scrolling_effect — was scrub-based (heavy); now single play on enter */
    var scrolling_effect = function () {
        if ($(".scrolling-effect").length === 0) return;
        $(".scrolling-effect").each(function (index, el) {
            gsap.from(el, {
                opacity: 0,
                duration: 0.55,
                ease: "power2.out",
                scrollTrigger: Object.assign({}, stOnce, { trigger: el }),
            });
        });
    };

    /* scrollTransform — was scrub parallax; now one-shot from */
    var scrollTransform = function () {
        const scrollTransformElements =
            document.querySelectorAll(".scroll-tranform");
        if (!scrollTransformElements.length) return;

        scrollTransformElements.forEach(function (element) {
            const direction = element.dataset.direction || "up";
            const distance = element.dataset.distance || "10%";
            let fromProps = { opacity: 0.85 };
            switch (direction.toLowerCase()) {
                case "left":
                    fromProps.x = `-${distance}`;
                    break;
                case "right":
                    fromProps.x = distance;
                    break;
                case "up":
                    fromProps.y = `-${distance}`;
                    break;
                case "down":
                    fromProps.y = distance;
                    break;
                default:
                    fromProps.y = `-${distance}`;
            }

            gsap.from(element, {
                ...fromProps,
                duration: 0.75,
                ease: "power2.out",
                scrollTrigger: Object.assign({}, stOnce, { trigger: element }),
            });
        });
    };

    /* scroll-banners — was scrub horizontal drift; now enter animation */
    const scrollBanners = () => {
        const bannerStripes = document.querySelectorAll(".scroll-banners");
        if (!bannerStripes.length) return;

        bannerStripes.forEach((element) => {
            gsap.from(element, {
                opacity: 0,
                duration: 0.6,
                ease: "power2.out",
                scrollTrigger: Object.assign({}, stOnce, { trigger: element }),
            });
        });
    };

    $(function () {
        scrollTransform();
        scrollBanners();
        scrolling_effect();
        animationText();
    });

    $(window).on("load", function () {
        if (typeof ScrollTrigger !== "undefined") {
            ScrollTrigger.refresh();
        }
    });
})(jQuery);
