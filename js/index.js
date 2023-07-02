function Utils() {}
Utils.prototype = {
    constructor: Utils,
    isElementInView: function (element, fullyInView) {
        var pageTop = $(window).scrollTop();
        var pageBottom = pageTop + $(window).height();
        var elementTop = $(element).offset().top;
        var elementBottom = elementTop + $(element).height();

        if (fullyInView === true) {
            return ((pageTop < elementTop) && (pageBottom > elementBottom));
        } else {
            return ((elementTop <= pageBottom) && (elementBottom >= pageTop));
        }
    }
};

var Utils = new Utils();
$(window).on('load', addFadeIn());

$(window).scroll(function() {
    addFadeIn(true);
});

function addFadeIn(repeat) {
    var classToFadeIn = ".animaction";
    
    $(classToFadeIn).each(function( index ) {
        var isElementInView = Utils.isElementInView($(this), false);
        if (isElementInView) {
            if(!($(this).hasClass('fadeInRight')) && !($(this).hasClass('fadeInLeft'))) {
                if(index % 2 == 0) $(this).addClass('fadeInRight');
                else $(this).addClass('fadeInLeft');
            }
        } else if(repeat) {
            $(this).removeClass('fadeInRight');
            $(this).removeClass('fadeInLeft');
        }
    });
}



// Function to change the active image every 3 seconds
function changeImage() {
  const images = document.querySelectorAll('.main .image-container img');
  const activeImage = document.querySelector('.main .image-container img.active');

  // Find the index of the active image
  const activeIndex = Array.from(images).indexOf(activeImage);

  // Determine the index of the next image to be shown
  const nextIndex = (activeIndex + 1) % images.length;

  // Remove the 'active' class from the current active image
  activeImage.classList.remove('active');

  // Add the 'active' class to the next image
  images[nextIndex].classList.add('active');
}

// Call the changeImage function every 3 seconds
setInterval(changeImage, 3000);
