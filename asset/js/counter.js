/**
 * Odometer counters — IntersectionObserver (no scroll listener spam).
 */
(function () {
    if (!window.jQuery) {
        return;
    }
    var $ = window.jQuery;
    if (!$(".counter-scroll").length) {
        return;
    }

    function fireCounter($counter) {
        if ($counter.hasClass("counted")) {
            return;
        }
        $counter.addClass("counted");
        var targetNumber = $counter.find(".odometer").data("number");
        window.setTimeout(function () {
            $counter.find(".odometer").text(targetNumber);
        }, 0);
    }

    if ("IntersectionObserver" in window) {
        var io = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (!entry.isIntersecting) {
                        return;
                    }
                    fireCounter($(entry.target));
                    io.unobserve(entry.target);
                });
            },
            { root: null, rootMargin: "40px", threshold: 0.15 }
        );
        $(".wg-counter").each(function () {
            io.observe(this);
        });
    } else {
        $(window).on("scroll", function () {
            $(".wg-counter").each(function () {
                var $c = $(this);
                if ($c.hasClass("counted")) {
                    return;
                }
                var top = $c.offset().top;
                var bottom = top + $c.outerHeight();
                var viewportTop = $(window).scrollTop();
                var viewportBottom = viewportTop + $(window).height();
                if (bottom > viewportTop && top < viewportBottom) {
                    fireCounter($c);
                }
            });
        });
    }
})();
