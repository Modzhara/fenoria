import { i as isMobile } from "./app.min.js";
/* empty css                 */
import "./slider.min.js";
/*!
 * lightgallery | 2.9.0-beta.1 | June 15th 2025
 * http://www.lightgalleryjs.com/
 * Copyright (c) 2020 Sachin Neravath;
 * @license GPLv3
 */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var __assign = function() {
  __assign = Object.assign || function __assign2(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++)
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
      r[k] = a[j];
  return r;
}
var lGEvents = {
  afterAppendSlide: "lgAfterAppendSlide",
  init: "lgInit",
  hasVideo: "lgHasVideo",
  containerResize: "lgContainerResize",
  updateSlides: "lgUpdateSlides",
  afterAppendSubHtml: "lgAfterAppendSubHtml",
  beforeOpen: "lgBeforeOpen",
  afterOpen: "lgAfterOpen",
  slideItemLoad: "lgSlideItemLoad",
  beforeSlide: "lgBeforeSlide",
  afterSlide: "lgAfterSlide",
  posterClick: "lgPosterClick",
  dragStart: "lgDragStart",
  dragMove: "lgDragMove",
  dragEnd: "lgDragEnd",
  beforeNextSlide: "lgBeforeNextSlide",
  beforePrevSlide: "lgBeforePrevSlide",
  beforeClose: "lgBeforeClose",
  afterClose: "lgAfterClose"
};
var lightGalleryCoreSettings = {
  mode: "lg-slide",
  easing: "ease",
  speed: 400,
  licenseKey: "0000-0000-000-0000",
  height: "100%",
  width: "100%",
  addClass: "",
  startClass: "lg-start-zoom",
  backdropDuration: 300,
  container: "",
  startAnimationDuration: 400,
  zoomFromOrigin: true,
  hideBarsDelay: 0,
  showBarsAfter: 1e4,
  slideDelay: 0,
  supportLegacyBrowser: true,
  allowMediaOverlap: false,
  videoMaxSize: "1280-720",
  loadYouTubePoster: true,
  defaultCaptionHeight: 0,
  ariaLabelledby: "",
  ariaDescribedby: "",
  resetScrollPosition: true,
  hideScrollbar: false,
  closable: true,
  swipeToClose: true,
  closeOnTap: true,
  showCloseIcon: true,
  showMaximizeIcon: false,
  loop: true,
  escKey: true,
  keyPress: true,
  trapFocus: true,
  controls: true,
  slideEndAnimation: true,
  hideControlOnEnd: false,
  mousewheel: false,
  getCaptionFromTitleOrAlt: true,
  appendSubHtmlTo: ".lg-sub-html",
  subHtmlSelectorRelative: false,
  preload: 2,
  numberOfSlideItemsInDom: 10,
  selector: "",
  selectWithin: "",
  nextHtml: "",
  prevHtml: "",
  index: 0,
  iframeWidth: "100%",
  iframeHeight: "100%",
  iframeMaxWidth: "100%",
  iframeMaxHeight: "100%",
  download: true,
  counter: true,
  appendCounterTo: ".lg-toolbar",
  swipeThreshold: 50,
  enableSwipe: true,
  enableDrag: true,
  dynamic: false,
  dynamicEl: [],
  extraProps: [],
  exThumbImage: "",
  isMobile: void 0,
  mobileSettings: {
    controls: false,
    showCloseIcon: false,
    download: false
  },
  plugins: [],
  strings: {
    closeGallery: "Close gallery",
    toggleMaximize: "Toggle maximize",
    previousSlide: "Previous slide",
    nextSlide: "Next slide",
    download: "Download",
    playVideo: "Play video",
    mediaLoadingFailed: "Oops... Failed to load content..."
  }
};
function initLgPolyfills() {
  (function() {
    if (typeof window.CustomEvent === "function")
      return false;
    function CustomEvent2(event, params) {
      params = params || {
        bubbles: false,
        cancelable: false,
        detail: null
      };
      var evt = document.createEvent("CustomEvent");
      evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
      return evt;
    }
    window.CustomEvent = CustomEvent2;
  })();
  (function() {
    if (!Element.prototype.matches) {
      Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
    }
  })();
}
var lgQuery = (
  /** @class */
  function() {
    function lgQuery2(selector) {
      this.cssVenderPrefixes = [
        "TransitionDuration",
        "TransitionTimingFunction",
        "Transform",
        "Transition"
      ];
      this.selector = this._getSelector(selector);
      this.firstElement = this._getFirstEl();
      return this;
    }
    lgQuery2.generateUUID = function() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == "x" ? r : r & 3 | 8;
        return v.toString(16);
      });
    };
    lgQuery2.prototype._getSelector = function(selector, context) {
      if (context === void 0) {
        context = document;
      }
      if (typeof selector !== "string") {
        return selector;
      }
      context = context || document;
      var fl = selector.substring(0, 1);
      if (fl === "#") {
        return context.querySelector(selector);
      } else {
        return context.querySelectorAll(selector);
      }
    };
    lgQuery2.prototype._each = function(func) {
      if (!this.selector) {
        return this;
      }
      if (this.selector.length !== void 0) {
        [].forEach.call(this.selector, func);
      } else {
        func(this.selector, 0);
      }
      return this;
    };
    lgQuery2.prototype._setCssVendorPrefix = function(el, cssProperty, value) {
      var property = cssProperty.replace(/-([a-z])/gi, function(s, group1) {
        return group1.toUpperCase();
      });
      if (this.cssVenderPrefixes.indexOf(property) !== -1) {
        el.style[property.charAt(0).toLowerCase() + property.slice(1)] = value;
        el.style["webkit" + property] = value;
        el.style["moz" + property] = value;
        el.style["ms" + property] = value;
        el.style["o" + property] = value;
      } else {
        el.style[property] = value;
      }
    };
    lgQuery2.prototype._getFirstEl = function() {
      if (this.selector && this.selector.length !== void 0) {
        return this.selector[0];
      } else {
        return this.selector;
      }
    };
    lgQuery2.prototype.isEventMatched = function(event, eventName) {
      var eventNamespace = eventName.split(".");
      return event.split(".").filter(function(e) {
        return e;
      }).every(function(e) {
        return eventNamespace.indexOf(e) !== -1;
      });
    };
    lgQuery2.prototype.attr = function(attr, value) {
      if (value === void 0) {
        if (!this.firstElement) {
          return "";
        }
        return this.firstElement.getAttribute(attr);
      }
      this._each(function(el) {
        el.setAttribute(attr, value);
      });
      return this;
    };
    lgQuery2.prototype.find = function(selector) {
      return $LG(this._getSelector(selector, this.selector));
    };
    lgQuery2.prototype.first = function() {
      if (this.selector && this.selector.length !== void 0) {
        return $LG(this.selector[0]);
      } else {
        return $LG(this.selector);
      }
    };
    lgQuery2.prototype.eq = function(index) {
      return $LG(this.selector[index]);
    };
    lgQuery2.prototype.parent = function() {
      return $LG(this.selector.parentElement);
    };
    lgQuery2.prototype.get = function() {
      return this._getFirstEl();
    };
    lgQuery2.prototype.removeAttr = function(attributes) {
      var attrs = attributes.split(" ");
      this._each(function(el) {
        attrs.forEach(function(attr) {
          return el.removeAttribute(attr);
        });
      });
      return this;
    };
    lgQuery2.prototype.wrap = function(className) {
      if (!this.firstElement) {
        return this;
      }
      var wrapper = document.createElement("div");
      wrapper.className = className;
      this.firstElement.parentNode.insertBefore(wrapper, this.firstElement);
      this.firstElement.parentNode.removeChild(this.firstElement);
      wrapper.appendChild(this.firstElement);
      return this;
    };
    lgQuery2.prototype.addClass = function(classNames) {
      if (classNames === void 0) {
        classNames = "";
      }
      this._each(function(el) {
        classNames.split(" ").forEach(function(className) {
          if (className) {
            el.classList.add(className);
          }
        });
      });
      return this;
    };
    lgQuery2.prototype.removeClass = function(classNames) {
      this._each(function(el) {
        classNames.split(" ").forEach(function(className) {
          if (className) {
            el.classList.remove(className);
          }
        });
      });
      return this;
    };
    lgQuery2.prototype.hasClass = function(className) {
      if (!this.firstElement) {
        return false;
      }
      return this.firstElement.classList.contains(className);
    };
    lgQuery2.prototype.hasAttribute = function(attribute) {
      if (!this.firstElement) {
        return false;
      }
      return this.firstElement.hasAttribute(attribute);
    };
    lgQuery2.prototype.toggleClass = function(className) {
      if (!this.firstElement) {
        return this;
      }
      if (this.hasClass(className)) {
        this.removeClass(className);
      } else {
        this.addClass(className);
      }
      return this;
    };
    lgQuery2.prototype.css = function(property, value) {
      var _this = this;
      this._each(function(el) {
        _this._setCssVendorPrefix(el, property, value);
      });
      return this;
    };
    lgQuery2.prototype.on = function(events, listener) {
      var _this = this;
      if (!this.selector) {
        return this;
      }
      events.split(" ").forEach(function(event) {
        if (!Array.isArray(lgQuery2.eventListeners[event])) {
          lgQuery2.eventListeners[event] = [];
        }
        lgQuery2.eventListeners[event].push(listener);
        _this.selector.addEventListener(event.split(".")[0], listener);
      });
      return this;
    };
    lgQuery2.prototype.once = function(event, listener) {
      var _this = this;
      this.on(event, function() {
        _this.off(event);
        listener(event);
      });
      return this;
    };
    lgQuery2.prototype.off = function(event) {
      var _this = this;
      if (!this.selector) {
        return this;
      }
      Object.keys(lgQuery2.eventListeners).forEach(function(eventName) {
        if (_this.isEventMatched(event, eventName)) {
          lgQuery2.eventListeners[eventName].forEach(function(listener) {
            _this.selector.removeEventListener(eventName.split(".")[0], listener);
          });
          lgQuery2.eventListeners[eventName] = [];
        }
      });
      return this;
    };
    lgQuery2.prototype.trigger = function(event, detail) {
      if (!this.firstElement) {
        return this;
      }
      var customEvent = new CustomEvent(event.split(".")[0], {
        detail: detail || null
      });
      this.firstElement.dispatchEvent(customEvent);
      return this;
    };
    lgQuery2.prototype.load = function(url) {
      var _this = this;
      fetch(url).then(function(res) {
        return res.text();
      }).then(function(html) {
        _this.selector.innerHTML = html;
      });
      return this;
    };
    lgQuery2.prototype.html = function(html) {
      if (html === void 0) {
        if (!this.firstElement) {
          return "";
        }
        return this.firstElement.innerHTML;
      }
      this._each(function(el) {
        el.innerHTML = html;
      });
      return this;
    };
    lgQuery2.prototype.append = function(html) {
      this._each(function(el) {
        if (typeof html === "string") {
          el.insertAdjacentHTML("beforeend", html);
        } else {
          el.appendChild(html);
        }
      });
      return this;
    };
    lgQuery2.prototype.prepend = function(html) {
      this._each(function(el) {
        if (typeof html === "string") {
          el.insertAdjacentHTML("afterbegin", html);
        } else if (html instanceof HTMLElement) {
          el.insertBefore(html.cloneNode(true), el.firstChild);
        }
      });
      return this;
    };
    lgQuery2.prototype.remove = function() {
      this._each(function(el) {
        el.parentNode.removeChild(el);
      });
      return this;
    };
    lgQuery2.prototype.empty = function() {
      this._each(function(el) {
        el.innerHTML = "";
      });
      return this;
    };
    lgQuery2.prototype.scrollTop = function(scrollTop) {
      if (scrollTop !== void 0) {
        document.body.scrollTop = scrollTop;
        document.documentElement.scrollTop = scrollTop;
        return this;
      } else {
        return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      }
    };
    lgQuery2.prototype.scrollLeft = function(scrollLeft) {
      if (scrollLeft !== void 0) {
        document.body.scrollLeft = scrollLeft;
        document.documentElement.scrollLeft = scrollLeft;
        return this;
      } else {
        return window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
      }
    };
    lgQuery2.prototype.offset = function() {
      if (!this.firstElement) {
        return {
          left: 0,
          top: 0
        };
      }
      var rect = this.firstElement.getBoundingClientRect();
      var bodyMarginLeft = $LG("body").style().marginLeft;
      return {
        left: rect.left - parseFloat(bodyMarginLeft) + this.scrollLeft(),
        top: rect.top + this.scrollTop()
      };
    };
    lgQuery2.prototype.style = function() {
      if (!this.firstElement) {
        return {};
      }
      return this.firstElement.currentStyle || window.getComputedStyle(this.firstElement);
    };
    lgQuery2.prototype.width = function() {
      var style = this.style();
      return this.firstElement.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
    };
    lgQuery2.prototype.height = function() {
      var style = this.style();
      return this.firstElement.clientHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom);
    };
    lgQuery2.eventListeners = {};
    return lgQuery2;
  }()
);
function $LG(selector) {
  initLgPolyfills();
  return new lgQuery(selector);
}
var defaultDynamicOptions = [
  "src",
  "sources",
  "subHtml",
  "subHtmlUrl",
  "html",
  "video",
  "poster",
  "slideName",
  "responsive",
  "srcset",
  "sizes",
  "iframe",
  "downloadUrl",
  "download",
  "width",
  "facebookShareUrl",
  "tweetText",
  "iframeTitle",
  "twitterShareUrl",
  "pinterestShareUrl",
  "pinterestText",
  "fbHtml",
  "disqusIdentifier",
  "disqusUrl"
];
function convertToData(attr) {
  if (attr === "href") {
    return "src";
  }
  attr = attr.replace("data-", "");
  attr = attr.charAt(0).toLowerCase() + attr.slice(1);
  attr = attr.replace(/-([a-z])/g, function(g) {
    return g[1].toUpperCase();
  });
  return attr;
}
var utils = {
  /**
   * Fetches HTML content from a given URL and inserts it into a specified element.
   *
   * @param url - The URL to fetch the HTML content from.
   * @param element - The DOM element (jQuery object) to insert the HTML content into.
   * @param insertMethod - The method to insert the HTML ('append' or 'replace').
   */
  fetchCaptionFromUrl: function(url, element, insertMethod) {
    fetch(url).then(function(response) {
      return response.text();
    }).then(function(htmlContent) {
      if (insertMethod === "append") {
        var contentDiv = '<div class="lg-sub-html">' + htmlContent + "</div>";
        element.append(contentDiv);
      } else {
        element.html(htmlContent);
      }
    });
  },
  /**
   * get possible width and height from the lgSize attribute. Used for ZoomFromOrigin option
   */
  getSize: function(el, container, spacing, defaultLgSize) {
    if (spacing === void 0) {
      spacing = 0;
    }
    var LGel = $LG(el);
    var lgSize = LGel.attr("data-lg-size") || defaultLgSize;
    if (!lgSize) {
      return;
    }
    var isResponsiveSizes = lgSize.split(",");
    if (isResponsiveSizes[1]) {
      var wWidth = window.innerWidth;
      for (var i = 0; i < isResponsiveSizes.length; i++) {
        var size_1 = isResponsiveSizes[i];
        var responsiveWidth = parseInt(size_1.split("-")[2], 10);
        if (responsiveWidth > wWidth) {
          lgSize = size_1;
          break;
        }
        if (i === isResponsiveSizes.length - 1) {
          lgSize = size_1;
        }
      }
    }
    var size = lgSize.split("-");
    var width = parseInt(size[0], 10);
    var height = parseInt(size[1], 10);
    var cWidth = container.width();
    var cHeight = container.height() - spacing;
    var maxWidth = Math.min(cWidth, width);
    var maxHeight = Math.min(cHeight, height);
    var ratio = Math.min(maxWidth / width, maxHeight / height);
    return { width: width * ratio, height: height * ratio };
  },
  /**
   * @desc Get transform value based on the imageSize. Used for ZoomFromOrigin option
   * @param {jQuery Element}
   * @returns {String} Transform CSS string
   */
  getTransform: function(el, container, top, bottom, imageSize) {
    if (!imageSize) {
      return;
    }
    var LGel = $LG(el).find("img").first();
    if (!LGel.get()) {
      return;
    }
    var containerRect = container.get().getBoundingClientRect();
    var wWidth = containerRect.width;
    var wHeight = container.height() - (top + bottom);
    var elWidth = LGel.width();
    var elHeight = LGel.height();
    var elStyle = LGel.style();
    var x = (wWidth - elWidth) / 2 - LGel.offset().left + (parseFloat(elStyle.paddingLeft) || 0) + (parseFloat(elStyle.borderLeft) || 0) + $LG(window).scrollLeft() + containerRect.left;
    var y = (wHeight - elHeight) / 2 - LGel.offset().top + (parseFloat(elStyle.paddingTop) || 0) + (parseFloat(elStyle.borderTop) || 0) + $LG(window).scrollTop() + top;
    var scX = elWidth / imageSize.width;
    var scY = elHeight / imageSize.height;
    var transform = "translate3d(" + (x *= -1) + "px, " + (y *= -1) + "px, 0) scale3d(" + scX + ", " + scY + ", 1)";
    return transform;
  },
  getIframeMarkup: function(iframeWidth, iframeHeight, iframeMaxWidth, iframeMaxHeight, src, iframeTitle) {
    var title = iframeTitle ? 'title="' + iframeTitle + '"' : "";
    return '<div class="lg-media-cont lg-has-iframe" style="width:' + iframeWidth + "; max-width:" + iframeMaxWidth + "; height: " + iframeHeight + "; max-height:" + iframeMaxHeight + '">\n                    <iframe class="lg-object" frameborder="0" ' + title + ' src="' + src + '"  allowfullscreen="true"></iframe>\n                </div>';
  },
  getImgMarkup: function(index, src, altAttr, srcset, sizes, sources) {
    var srcsetAttr = srcset ? 'srcset="' + srcset + '"' : "";
    var sizesAttr = sizes ? 'sizes="' + sizes + '"' : "";
    var imgMarkup = "<img " + altAttr + " " + srcsetAttr + "  " + sizesAttr + ' class="lg-object lg-image" data-index="' + index + '" src="' + src + '" />';
    var sourceTag = "";
    if (sources) {
      var sourceObj = typeof sources === "string" ? JSON.parse(sources) : sources;
      sourceTag = sourceObj.map(function(source) {
        var attrs = "";
        Object.keys(source).forEach(function(key) {
          attrs += " " + key + '="' + source[key] + '"';
        });
        return "<source " + attrs + "></source>";
      });
    }
    return "" + sourceTag + imgMarkup;
  },
  // Get src from responsive src
  getResponsiveSrc: function(srcItms) {
    var rsWidth = [];
    var rsSrc = [];
    var src = "";
    for (var i = 0; i < srcItms.length; i++) {
      var _src = srcItms[i].split(" ");
      if (_src[0] === "") {
        _src.splice(0, 1);
      }
      rsSrc.push(_src[0]);
      rsWidth.push(_src[1]);
    }
    var wWidth = window.innerWidth;
    for (var j = 0; j < rsWidth.length; j++) {
      if (parseInt(rsWidth[j], 10) > wWidth) {
        src = rsSrc[j];
        break;
      }
    }
    return src;
  },
  isImageLoaded: function(img) {
    if (!img)
      return false;
    if (!img.complete) {
      return false;
    }
    if (img.naturalWidth === 0) {
      return false;
    }
    return true;
  },
  getVideoPosterMarkup: function(_poster, dummyImg, videoContStyle, playVideoString, _isVideo) {
    var videoClass = "";
    if (_isVideo && _isVideo.youtube) {
      videoClass = "lg-has-youtube";
    } else if (_isVideo && _isVideo.vimeo) {
      videoClass = "lg-has-vimeo";
    } else {
      videoClass = "lg-has-html5";
    }
    var _dummy = dummyImg;
    if (typeof dummyImg !== "string") {
      _dummy = dummyImg.outerHTML;
    }
    return '<div class="lg-video-cont ' + videoClass + '" style="' + videoContStyle + '">\n                <div class="lg-video-play-button">\n                <svg\n                    viewBox="0 0 20 20"\n                    preserveAspectRatio="xMidYMid"\n                    focusable="false"\n                    aria-labelledby="' + playVideoString + '"\n                    role="img"\n                    class="lg-video-play-icon"\n                >\n                    <title>' + playVideoString + '</title>\n                    <polygon class="lg-video-play-icon-inner" points="1,0 20,10 1,20"></polygon>\n                </svg>\n                <svg class="lg-video-play-icon-bg" viewBox="0 0 50 50" focusable="false">\n                    <circle cx="50%" cy="50%" r="20"></circle></svg>\n                <svg class="lg-video-play-icon-circle" viewBox="0 0 50 50" focusable="false">\n                    <circle cx="50%" cy="50%" r="20"></circle>\n                </svg>\n            </div>\n            ' + _dummy + '\n            <img class="lg-object lg-video-poster" src="' + _poster + '" />\n        </div>';
  },
  getFocusableElements: function(container) {
    var elements = container.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])');
    var visibleElements = [].filter.call(elements, function(element) {
      var style = window.getComputedStyle(element);
      return style.display !== "none" && style.visibility !== "hidden";
    });
    return visibleElements;
  },
  /**
   * @desc Create dynamic elements array from gallery items when dynamic option is false
   * It helps to avoid frequent DOM interaction
   * and avoid multiple checks for dynamic elments
   *
   * @returns {Array} dynamicEl
   */
  getDynamicOptions: function(items, extraProps, getCaptionFromTitleOrAlt, exThumbImage) {
    var dynamicElements = [];
    var availableDynamicOptions = __spreadArrays(defaultDynamicOptions, extraProps);
    [].forEach.call(items, function(item) {
      var dynamicEl = {};
      for (var i = 0; i < item.attributes.length; i++) {
        var attr = item.attributes[i];
        if (attr.specified) {
          var dynamicAttr = convertToData(attr.name);
          var label = "";
          if (availableDynamicOptions.indexOf(dynamicAttr) > -1) {
            label = dynamicAttr;
          }
          if (label) {
            dynamicEl[label] = attr.value;
          }
        }
      }
      var currentItem = $LG(item);
      var alt = currentItem.find("img").first().attr("alt");
      var title = currentItem.attr("title");
      var thumb = exThumbImage ? currentItem.attr(exThumbImage) : currentItem.find("img").first().attr("src");
      dynamicEl.thumb = thumb;
      if (getCaptionFromTitleOrAlt && !dynamicEl.subHtml) {
        dynamicEl.subHtml = title || alt || "";
      }
      dynamicEl.alt = alt || title || "";
      dynamicElements.push(dynamicEl);
    });
    return dynamicElements;
  },
  isMobile: function() {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  },
  /**
   * @desc Check the given src is video
   * @param {String} src
   * @return {Object} video type
   * Ex:{ youtube  :  ["//www.youtube.com/watch?v=c0asJgSyxcY", "c0asJgSyxcY"] }
   *
   * @todo - this information can be moved to dynamicEl to avoid frequent calls
   */
  isVideo: function(src, isHTML5VIdeo, index) {
    if (!src) {
      if (isHTML5VIdeo) {
        return {
          html5: true
        };
      } else {
        console.error("lightGallery :- data-src is not provided on slide item " + (index + 1) + ". Please make sure the selector property is properly configured. More info - https://www.lightgalleryjs.com/demos/html-markup/");
        return;
      }
    }
    var youtube = src.match(/\/\/(?:www\.)?youtu(?:\.be|be\.com|be-nocookie\.com)\/(?:watch\?v=|embed\/)?([a-z0-9\-\_\%]+)([\&|?][\S]*)*/i);
    var vimeo = src.match(/\/\/(?:www\.)?(?:player\.)?vimeo.com\/(?:video\/)?([0-9a-z\-_]+)(.*)?/i);
    var wistia = src.match(/https?:\/\/(.+)?(wistia\.com|wi\.st)\/(medias|embed)\/([0-9a-z\-_]+)(.*)/);
    if (youtube) {
      return {
        youtube
      };
    } else if (vimeo) {
      return {
        vimeo
      };
    } else if (wistia) {
      return {
        wistia
      };
    }
  }
};
var lgId = 0;
var LightGallery = (
  /** @class */
  function() {
    function LightGallery2(element, options) {
      this.lgOpened = false;
      this.index = 0;
      this.plugins = [];
      this.lGalleryOn = false;
      this.lgBusy = false;
      this.currentItemsInDom = [];
      this.prevScrollTop = 0;
      this.bodyPaddingRight = 0;
      this.isDummyImageRemoved = false;
      this.dragOrSwipeEnabled = false;
      this.mediaContainerPosition = {
        top: 0,
        bottom: 0
      };
      if (!element) {
        return this;
      }
      lgId++;
      this.lgId = lgId;
      this.el = element;
      this.LGel = $LG(element);
      this.generateSettings(options);
      this.buildModules();
      if (this.settings.dynamic && this.settings.dynamicEl !== void 0 && !Array.isArray(this.settings.dynamicEl)) {
        throw "When using dynamic mode, you must also define dynamicEl as an Array.";
      }
      this.galleryItems = this.getItems();
      this.normalizeSettings();
      this.init();
      this.validateLicense();
      return this;
    }
    LightGallery2.prototype.generateSettings = function(options) {
      this.settings = __assign(__assign({}, lightGalleryCoreSettings), options);
      if (this.settings.isMobile && typeof this.settings.isMobile === "function" ? this.settings.isMobile() : utils.isMobile()) {
        var mobileSettings = __assign(__assign({}, this.settings.mobileSettings), this.settings.mobileSettings);
        this.settings = __assign(__assign({}, this.settings), mobileSettings);
      }
    };
    LightGallery2.prototype.normalizeSettings = function() {
      if (this.settings.slideEndAnimation) {
        this.settings.hideControlOnEnd = false;
      }
      if (!this.settings.closable) {
        this.settings.swipeToClose = false;
      }
      this.zoomFromOrigin = this.settings.zoomFromOrigin;
      if (this.settings.dynamic) {
        this.zoomFromOrigin = false;
      }
      if (this.settings.container) {
        var container = this.settings.container;
        if (typeof container === "function") {
          this.settings.container = container();
        } else if (typeof container === "string") {
          var el = document.querySelector(container);
          this.settings.container = el !== null && el !== void 0 ? el : document.body;
        }
      } else {
        this.settings.container = document.body;
      }
      this.settings.preload = Math.min(this.settings.preload, this.galleryItems.length);
    };
    LightGallery2.prototype.init = function() {
      var _this = this;
      this.addSlideVideoInfo(this.galleryItems);
      this.buildStructure();
      this.LGel.trigger(lGEvents.init, {
        instance: this
      });
      if (this.settings.keyPress) {
        this.keyPress();
      }
      setTimeout(function() {
        _this.enableDrag();
        _this.enableSwipe();
        _this.triggerPosterClick();
      }, 50);
      this.arrow();
      if (this.settings.mousewheel) {
        this.mousewheel();
      }
      if (!this.settings.dynamic) {
        this.openGalleryOnItemClick();
      }
    };
    LightGallery2.prototype.openGalleryOnItemClick = function() {
      var _this = this;
      var _loop_1 = function(index2) {
        var element = this_1.items[index2];
        var $element = $LG(element);
        var uuid = lgQuery.generateUUID();
        $element.attr("data-lg-id", uuid).on("click.lgcustom-item-" + uuid, function(e) {
          e.preventDefault();
          var currentItemIndex = _this.settings.index || index2;
          _this.openGallery(currentItemIndex, element);
        });
      };
      var this_1 = this;
      for (var index = 0; index < this.items.length; index++) {
        _loop_1(index);
      }
    };
    LightGallery2.prototype.buildModules = function() {
      var _this = this;
      this.settings.plugins.forEach(function(plugin) {
        _this.plugins.push(new plugin(_this, $LG));
      });
    };
    LightGallery2.prototype.validateLicense = function() {
      if (!this.settings.licenseKey) {
        console.error("Please provide a valid license key");
      } else if (this.settings.licenseKey === "0000-0000-000-0000") {
        console.warn("lightGallery: " + this.settings.licenseKey + " license key is not valid for production use");
      }
    };
    LightGallery2.prototype.getSlideItem = function(index) {
      return $LG(this.getSlideItemId(index));
    };
    LightGallery2.prototype.getSlideItemId = function(index) {
      return "#lg-item-" + this.lgId + "-" + index;
    };
    LightGallery2.prototype.getIdName = function(id) {
      return id + "-" + this.lgId;
    };
    LightGallery2.prototype.getElementById = function(id) {
      return $LG("#" + this.getIdName(id));
    };
    LightGallery2.prototype.manageSingleSlideClassName = function() {
      if (this.galleryItems.length < 2) {
        this.outer.addClass("lg-single-item");
      } else {
        this.outer.removeClass("lg-single-item");
      }
    };
    LightGallery2.prototype.buildStructure = function() {
      var _this = this;
      var container = this.$container && this.$container.get();
      if (container) {
        return;
      }
      var controls = "";
      var subHtmlCont = "";
      if (this.settings.controls) {
        controls = '<button type="button" id="' + this.getIdName("lg-prev") + '" aria-label="' + this.settings.strings["previousSlide"] + '" class="lg-prev lg-icon"> ' + this.settings.prevHtml + ' </button>\n                <button type="button" id="' + this.getIdName("lg-next") + '" aria-label="' + this.settings.strings["nextSlide"] + '" class="lg-next lg-icon"> ' + this.settings.nextHtml + " </button>";
      }
      if (this.settings.appendSubHtmlTo !== ".lg-item") {
        subHtmlCont = '<div class="lg-sub-html" role="status" aria-live="polite"></div>';
      }
      var addClasses = "";
      if (this.settings.allowMediaOverlap) {
        addClasses += "lg-media-overlap ";
      }
      var ariaLabelledby = this.settings.ariaLabelledby ? 'aria-labelledby="' + this.settings.ariaLabelledby + '"' : "";
      var ariaDescribedby = this.settings.ariaDescribedby ? 'aria-describedby="' + this.settings.ariaDescribedby + '"' : "";
      var containerClassName = "lg-container " + this.settings.addClass + " " + (document.body !== this.settings.container ? "lg-inline" : "");
      var closeIcon = this.settings.closable && this.settings.showCloseIcon ? '<button type="button" aria-label="' + this.settings.strings["closeGallery"] + '" id="' + this.getIdName("lg-close") + '" class="lg-close lg-icon"></button>' : "";
      var maximizeIcon = this.settings.showMaximizeIcon ? '<button type="button" aria-label="' + this.settings.strings["toggleMaximize"] + '" id="' + this.getIdName("lg-maximize") + '" class="lg-maximize lg-icon"></button>' : "";
      var template = '\n        <div class="' + containerClassName + '" id="' + this.getIdName("lg-container") + '" tabindex="-1" aria-modal="true" ' + ariaLabelledby + " " + ariaDescribedby + ' role="dialog"\n        >\n            <div id="' + this.getIdName("lg-backdrop") + '" class="lg-backdrop"></div>\n\n            <div id="' + this.getIdName("lg-outer") + '" class="lg-outer lg-use-css3 lg-css3 lg-hide-items ' + addClasses + ' ">\n\n              <div id="' + this.getIdName("lg-content") + '" class="lg-content">\n                <div id="' + this.getIdName("lg-inner") + '" class="lg-inner">\n                </div>\n                ' + controls + '\n              </div>\n                <div id="' + this.getIdName("lg-toolbar") + '" class="lg-toolbar lg-group">\n                    ' + maximizeIcon + "\n                    " + closeIcon + "\n                    </div>\n                    " + (this.settings.appendSubHtmlTo === ".lg-outer" ? subHtmlCont : "") + '\n                <div id="' + this.getIdName("lg-components") + '" class="lg-components">\n                    ' + (this.settings.appendSubHtmlTo === ".lg-sub-html" ? subHtmlCont : "") + "\n                </div>\n            </div>\n        </div>\n        ";
      $LG(this.settings.container).append(template);
      if (document.body !== this.settings.container) {
        $LG(this.settings.container).css("position", "relative");
      }
      this.outer = this.getElementById("lg-outer");
      this.$lgComponents = this.getElementById("lg-components");
      this.$backdrop = this.getElementById("lg-backdrop");
      this.$container = this.getElementById("lg-container");
      this.$inner = this.getElementById("lg-inner");
      this.$content = this.getElementById("lg-content");
      this.$toolbar = this.getElementById("lg-toolbar");
      this.$backdrop.css("transition-duration", this.settings.backdropDuration + "ms");
      var outerClassNames = this.settings.mode + " ";
      this.manageSingleSlideClassName();
      if (this.settings.enableDrag) {
        outerClassNames += "lg-grab ";
      }
      this.outer.addClass(outerClassNames);
      this.$inner.css("transition-timing-function", this.settings.easing);
      this.$inner.css("transition-duration", this.settings.speed + "ms");
      if (this.settings.download) {
        this.$toolbar.append('<a id="' + this.getIdName("lg-download") + '" target="_blank" rel="noopener" aria-label="' + this.settings.strings["download"] + '" download class="lg-download lg-icon"></a>');
      }
      this.counter();
      $LG(window).on("resize.lg.global" + this.lgId + " orientationchange.lg.global" + this.lgId, function() {
        _this.refreshOnResize();
      });
      this.hideBars();
      this.manageCloseGallery();
      this.toggleMaximize();
      this.initModules();
    };
    LightGallery2.prototype.refreshOnResize = function() {
      if (this.lgOpened) {
        var currentGalleryItem = this.galleryItems[this.index];
        var __slideVideoInfo = currentGalleryItem.__slideVideoInfo;
        this.mediaContainerPosition = this.getMediaContainerPosition();
        var _a = this.mediaContainerPosition, top_1 = _a.top, bottom = _a.bottom;
        this.currentImageSize = utils.getSize(this.items[this.index], this.outer, top_1 + bottom, __slideVideoInfo && this.settings.videoMaxSize);
        if (__slideVideoInfo) {
          this.resizeVideoSlide(this.index, this.currentImageSize);
        }
        if (this.zoomFromOrigin && !this.isDummyImageRemoved) {
          var imgStyle = this.getDummyImgStyles(this.currentImageSize);
          this.outer.find(".lg-current .lg-dummy-img").first().attr("style", imgStyle);
        }
        this.LGel.trigger(lGEvents.containerResize);
      }
    };
    LightGallery2.prototype.resizeVideoSlide = function(index, imageSize) {
      var lgVideoStyle = this.getVideoContStyle(imageSize);
      var currentSlide = this.getSlideItem(index);
      currentSlide.find(".lg-video-cont").attr("style", lgVideoStyle);
    };
    LightGallery2.prototype.updateSlides = function(items, index) {
      if (this.index > items.length - 1) {
        this.index = items.length - 1;
      }
      if (items.length === 1) {
        this.index = 0;
      }
      if (!items.length) {
        this.closeGallery();
        return;
      }
      var currentSrc = this.galleryItems[index].src;
      this.galleryItems = items;
      this.updateControls();
      this.$inner.empty();
      this.currentItemsInDom = [];
      var _index = 0;
      this.galleryItems.some(function(galleryItem, itemIndex) {
        if (galleryItem.src === currentSrc) {
          _index = itemIndex;
          return true;
        }
        return false;
      });
      this.currentItemsInDom = this.organizeSlideItems(_index, -1);
      this.loadContent(_index, true);
      this.getSlideItem(_index).addClass("lg-current");
      this.index = _index;
      this.updateCurrentCounter(_index);
      this.LGel.trigger(lGEvents.updateSlides);
    };
    LightGallery2.prototype.getItems = function() {
      this.items = [];
      if (!this.settings.dynamic) {
        if (this.settings.selector === "this") {
          this.items.push(this.el);
        } else if (this.settings.selector) {
          if (typeof this.settings.selector === "string") {
            if (this.settings.selectWithin) {
              var selectWithin = $LG(this.settings.selectWithin);
              this.items = selectWithin.find(this.settings.selector).get();
            } else {
              this.items = this.el.querySelectorAll(this.settings.selector);
            }
          } else {
            this.items = this.settings.selector;
          }
        } else {
          this.items = this.el.children;
        }
        return utils.getDynamicOptions(this.items, this.settings.extraProps, this.settings.getCaptionFromTitleOrAlt, this.settings.exThumbImage);
      } else {
        return this.settings.dynamicEl || [];
      }
    };
    LightGallery2.prototype.shouldHideScrollbar = function() {
      return this.settings.hideScrollbar && document.body === this.settings.container;
    };
    LightGallery2.prototype.hideScrollbar = function() {
      if (!this.shouldHideScrollbar()) {
        return;
      }
      this.bodyPaddingRight = parseFloat($LG("body").style().paddingRight);
      var bodyRect = document.documentElement.getBoundingClientRect();
      var scrollbarWidth = window.innerWidth - bodyRect.width;
      $LG(document.body).css("padding-right", scrollbarWidth + this.bodyPaddingRight + "px");
      $LG(document.body).addClass("lg-overlay-open");
    };
    LightGallery2.prototype.resetScrollBar = function() {
      if (!this.shouldHideScrollbar()) {
        return;
      }
      $LG(document.body).css("padding-right", this.bodyPaddingRight + "px");
      $LG(document.body).removeClass("lg-overlay-open");
    };
    LightGallery2.prototype.openGallery = function(index, element) {
      var _this = this;
      if (index === void 0) {
        index = this.settings.index;
      }
      if (this.lgOpened)
        return;
      this.lgOpened = true;
      this.outer.removeClass("lg-hide-items");
      this.hideScrollbar();
      this.$container.addClass("lg-show");
      var itemsToBeInsertedToDom = this.getItemsToBeInsertedToDom(index, index);
      this.currentItemsInDom = itemsToBeInsertedToDom;
      var items = "";
      itemsToBeInsertedToDom.forEach(function(item) {
        items = items + ('<div id="' + item + '" class="lg-item"></div>');
      });
      this.$inner.append(items);
      this.addHtml(index);
      var transform = "";
      this.mediaContainerPosition = this.getMediaContainerPosition();
      var _a = this.mediaContainerPosition, top = _a.top, bottom = _a.bottom;
      if (!this.settings.allowMediaOverlap) {
        this.setMediaContainerPosition(top, bottom);
      }
      var __slideVideoInfo = this.galleryItems[index].__slideVideoInfo;
      if (this.zoomFromOrigin && element) {
        this.currentImageSize = utils.getSize(element, this.outer, top + bottom, __slideVideoInfo && this.settings.videoMaxSize);
        transform = utils.getTransform(element, this.outer, top, bottom, this.currentImageSize);
      }
      if (!this.zoomFromOrigin || !transform) {
        this.outer.addClass(this.settings.startClass);
        this.getSlideItem(index).removeClass("lg-complete");
      }
      var timeout = this.settings.zoomFromOrigin ? 100 : this.settings.backdropDuration;
      setTimeout(function() {
        _this.outer.addClass("lg-components-open");
      }, timeout);
      this.index = index;
      this.LGel.trigger(lGEvents.beforeOpen);
      this.getSlideItem(index).addClass("lg-current");
      this.lGalleryOn = false;
      this.prevScrollTop = $LG(window).scrollTop();
      setTimeout(function() {
        if (_this.zoomFromOrigin && transform) {
          var currentSlide_1 = _this.getSlideItem(index);
          currentSlide_1.css("transform", transform);
          setTimeout(function() {
            currentSlide_1.addClass("lg-start-progress lg-start-end-progress").css("transition-duration", _this.settings.startAnimationDuration + "ms");
            _this.outer.addClass("lg-zoom-from-image");
          });
          setTimeout(function() {
            currentSlide_1.css("transform", "translate3d(0, 0, 0)");
          }, 100);
        }
        setTimeout(function() {
          _this.$backdrop.addClass("in");
          _this.$container.addClass("lg-show-in");
        }, 10);
        setTimeout(function() {
          if (_this.settings.trapFocus && document.body === _this.settings.container) {
            _this.trapFocus();
          }
        }, _this.settings.backdropDuration + 50);
        if (!_this.zoomFromOrigin || !transform) {
          setTimeout(function() {
            _this.outer.addClass("lg-visible");
          }, _this.settings.backdropDuration);
        }
        _this.slide(index, false, false, false);
        _this.LGel.trigger(lGEvents.afterOpen);
      });
      if (document.body === this.settings.container) {
        $LG("html").addClass("lg-on");
      }
    };
    LightGallery2.prototype.getMediaContainerPosition = function() {
      if (this.settings.allowMediaOverlap) {
        return {
          top: 0,
          bottom: 0
        };
      }
      var top = this.$toolbar.get().clientHeight || 0;
      var subHtml = this.outer.find(".lg-components .lg-sub-html").get();
      var captionHeight = this.settings.defaultCaptionHeight || subHtml && subHtml.clientHeight || 0;
      var thumbContainer = this.outer.find(".lg-thumb-outer").get();
      var thumbHeight = thumbContainer ? thumbContainer.clientHeight : 0;
      var bottom = thumbHeight + captionHeight;
      return {
        top,
        bottom
      };
    };
    LightGallery2.prototype.setMediaContainerPosition = function(top, bottom) {
      if (top === void 0) {
        top = 0;
      }
      if (bottom === void 0) {
        bottom = 0;
      }
      this.$content.css("top", top + "px").css("bottom", bottom + "px");
    };
    LightGallery2.prototype.hideBars = function() {
      var _this = this;
      setTimeout(function() {
        _this.outer.removeClass("lg-hide-items");
        if (_this.settings.hideBarsDelay > 0) {
          _this.outer.on("mousemove.lg click.lg touchstart.lg", function() {
            _this.outer.removeClass("lg-hide-items");
            clearTimeout(_this.hideBarTimeout);
            _this.hideBarTimeout = setTimeout(function() {
              _this.outer.addClass("lg-hide-items");
            }, _this.settings.hideBarsDelay);
          });
          _this.outer.trigger("mousemove.lg");
        }
      }, this.settings.showBarsAfter);
    };
    LightGallery2.prototype.initPictureFill = function($img) {
      if (this.settings.supportLegacyBrowser) {
        try {
          picturefill({
            elements: [$img.get()]
          });
        } catch (e) {
          console.warn("lightGallery :- If you want srcset or picture tag to be supported for older browser please include picturefil javascript library in your document.");
        }
      }
    };
    LightGallery2.prototype.counter = function() {
      if (this.settings.counter) {
        var counterHtml = '<div class="lg-counter" role="status" aria-live="polite">\n                <span id="' + this.getIdName("lg-counter-current") + '" class="lg-counter-current">' + (this.index + 1) + ' </span> /\n                <span id="' + this.getIdName("lg-counter-all") + '" class="lg-counter-all">' + this.galleryItems.length + " </span></div>";
        this.outer.find(this.settings.appendCounterTo).append(counterHtml);
      }
    };
    LightGallery2.prototype.addHtml = function(index) {
      var subHtml;
      var subHtmlUrl;
      if (this.galleryItems[index].subHtmlUrl) {
        subHtmlUrl = this.galleryItems[index].subHtmlUrl;
      } else {
        subHtml = this.galleryItems[index].subHtml;
      }
      if (!subHtmlUrl) {
        if (subHtml) {
          var fL = subHtml.substring(0, 1);
          if (fL === "." || fL === "#") {
            try {
              if (this.settings.subHtmlSelectorRelative && !this.settings.dynamic) {
                subHtml = $LG(this.items).eq(index).find(subHtml).first().html();
              } else {
                subHtml = $LG(subHtml).first().html();
              }
            } catch (error) {
              console.warn('Error processing subHtml selector "' + subHtml + '"');
              subHtml = "";
            }
          }
        } else {
          subHtml = "";
        }
      }
      if (this.settings.appendSubHtmlTo !== ".lg-item") {
        if (subHtmlUrl) {
          utils.fetchCaptionFromUrl(subHtmlUrl, this.outer.find(".lg-sub-html"), "replace");
        } else {
          this.outer.find(".lg-sub-html").html(subHtml);
        }
      } else {
        var currentSlide = $LG(this.getSlideItemId(index));
        if (subHtmlUrl) {
          utils.fetchCaptionFromUrl(subHtmlUrl, currentSlide, "append");
        } else {
          currentSlide.append('<div class="lg-sub-html">' + subHtml + "</div>");
        }
      }
      if (typeof subHtml !== "undefined" && subHtml !== null) {
        if (subHtml === "") {
          this.outer.find(this.settings.appendSubHtmlTo).addClass("lg-empty-html");
        } else {
          this.outer.find(this.settings.appendSubHtmlTo).removeClass("lg-empty-html");
        }
      }
      this.LGel.trigger(lGEvents.afterAppendSubHtml, {
        index
      });
    };
    LightGallery2.prototype.preload = function(index) {
      for (var i = 1; i <= this.settings.preload; i++) {
        if (i >= this.galleryItems.length - index) {
          break;
        }
        this.loadContent(index + i, false);
      }
      for (var j = 1; j <= this.settings.preload; j++) {
        if (index - j < 0) {
          break;
        }
        this.loadContent(index - j, false);
      }
    };
    LightGallery2.prototype.getDummyImgStyles = function(imageSize) {
      if (!imageSize)
        return "";
      return "width:" + imageSize.width + "px;\n                margin-left: -" + imageSize.width / 2 + "px;\n                margin-top: -" + imageSize.height / 2 + "px;\n                height:" + imageSize.height + "px";
    };
    LightGallery2.prototype.getVideoContStyle = function(imageSize) {
      if (!imageSize)
        return "";
      return "width:" + imageSize.width + "px;\n                height:" + imageSize.height + "px";
    };
    LightGallery2.prototype.getDummyImageContent = function($currentSlide, index, alt) {
      var $currentItem;
      if (!this.settings.dynamic) {
        $currentItem = $LG(this.items).eq(index);
      }
      if ($currentItem) {
        var _dummyImgSrc = void 0;
        if (!this.settings.exThumbImage) {
          _dummyImgSrc = $currentItem.find("img").first().attr("src");
        } else {
          _dummyImgSrc = $currentItem.attr(this.settings.exThumbImage);
        }
        if (!_dummyImgSrc)
          return "";
        var imgStyle = this.getDummyImgStyles(this.currentImageSize);
        var dummyImgContentImg = document.createElement("img");
        dummyImgContentImg.alt = alt || "";
        dummyImgContentImg.src = _dummyImgSrc;
        dummyImgContentImg.className = "lg-dummy-img";
        dummyImgContentImg.style.cssText = imgStyle;
        $currentSlide.addClass("lg-first-slide");
        this.outer.addClass("lg-first-slide-loading");
        return dummyImgContentImg;
      }
      return "";
    };
    LightGallery2.prototype.setImgMarkup = function(src, $currentSlide, index) {
      var currentGalleryItem = this.galleryItems[index];
      var alt = currentGalleryItem.alt, srcset = currentGalleryItem.srcset, sizes = currentGalleryItem.sizes, sources = currentGalleryItem.sources;
      var imgContent = "";
      var altAttr = alt ? 'alt="' + alt + '"' : "";
      if (this.isFirstSlideWithZoomAnimation()) {
        imgContent = this.getDummyImageContent($currentSlide, index, altAttr);
      } else {
        imgContent = utils.getImgMarkup(index, src, altAttr, srcset, sizes, sources);
      }
      var picture = document.createElement("picture");
      picture.className = "lg-img-wrap";
      $LG(picture).append(imgContent);
      $currentSlide.prepend(picture);
    };
    LightGallery2.prototype.onSlideObjectLoad = function($slide, isHTML5VideoWithoutPoster, onLoad, onError) {
      var mediaObject = $slide.find(".lg-object").first();
      if (utils.isImageLoaded(mediaObject.get()) || isHTML5VideoWithoutPoster) {
        onLoad();
      } else {
        mediaObject.on("load.lg error.lg", function() {
          onLoad && onLoad();
        });
        mediaObject.on("error.lg", function() {
          onError && onError();
        });
      }
    };
    LightGallery2.prototype.onLgObjectLoad = function(currentSlide, index, delay, speed, isFirstSlide, isHTML5VideoWithoutPoster) {
      var _this = this;
      this.onSlideObjectLoad(currentSlide, isHTML5VideoWithoutPoster, function() {
        _this.triggerSlideItemLoad(currentSlide, index, delay, speed, isFirstSlide);
      }, function() {
        currentSlide.addClass("lg-complete lg-complete_");
        currentSlide.html('<span class="lg-error-msg">' + _this.settings.strings["mediaLoadingFailed"] + "</span>");
      });
    };
    LightGallery2.prototype.triggerSlideItemLoad = function($currentSlide, index, delay, speed, isFirstSlide) {
      var _this = this;
      var currentGalleryItem = this.galleryItems[index];
      var _speed = isFirstSlide && this.getSlideType(currentGalleryItem) === "video" && !currentGalleryItem.poster ? speed : 0;
      setTimeout(function() {
        $currentSlide.addClass("lg-complete lg-complete_");
        _this.LGel.trigger(lGEvents.slideItemLoad, {
          index,
          delay: delay || 0,
          isFirstSlide
        });
      }, _speed);
    };
    LightGallery2.prototype.isFirstSlideWithZoomAnimation = function() {
      return !!(!this.lGalleryOn && this.zoomFromOrigin && this.currentImageSize);
    };
    LightGallery2.prototype.addSlideVideoInfo = function(items) {
      var _this = this;
      items.forEach(function(element, index) {
        element.__slideVideoInfo = utils.isVideo(element.src, !!element.video, index);
        if (element.__slideVideoInfo && _this.settings.loadYouTubePoster && !element.poster && element.__slideVideoInfo.youtube) {
          element.poster = "//img.youtube.com/vi/" + element.__slideVideoInfo.youtube[1] + "/maxresdefault.jpg";
        }
      });
    };
    LightGallery2.prototype.loadContent = function(index, rec) {
      var _this = this;
      var currentGalleryItem = this.galleryItems[index];
      var $currentSlide = $LG(this.getSlideItemId(index));
      var poster = currentGalleryItem.poster, srcset = currentGalleryItem.srcset, sizes = currentGalleryItem.sizes, sources = currentGalleryItem.sources;
      var src = currentGalleryItem.src;
      var video = currentGalleryItem.video;
      var _html5Video = video && typeof video === "string" ? JSON.parse(video) : video;
      if (currentGalleryItem.responsive) {
        var srcDyItms = currentGalleryItem.responsive.split(",");
        src = utils.getResponsiveSrc(srcDyItms) || src;
      }
      var videoInfo = currentGalleryItem.__slideVideoInfo;
      var lgVideoStyle = "";
      var iframe = !!currentGalleryItem.iframe;
      var isFirstSlide = !this.lGalleryOn;
      var delay = 0;
      if (isFirstSlide) {
        if (this.zoomFromOrigin && this.currentImageSize) {
          delay = this.settings.startAnimationDuration + 10;
        } else {
          delay = this.settings.backdropDuration + 10;
        }
      }
      if (!$currentSlide.hasClass("lg-loaded")) {
        if (videoInfo) {
          var _a = this.mediaContainerPosition, top_2 = _a.top, bottom = _a.bottom;
          var videoSize = utils.getSize(this.items[index], this.outer, top_2 + bottom, videoInfo && this.settings.videoMaxSize);
          lgVideoStyle = this.getVideoContStyle(videoSize);
        }
        if (iframe) {
          var markup = utils.getIframeMarkup(this.settings.iframeWidth, this.settings.iframeHeight, this.settings.iframeMaxWidth, this.settings.iframeMaxHeight, src, currentGalleryItem.iframeTitle);
          $currentSlide.prepend(markup);
        } else if (poster) {
          var dummyImg = "";
          var hasStartAnimation = isFirstSlide && this.zoomFromOrigin && this.currentImageSize;
          if (hasStartAnimation) {
            dummyImg = this.getDummyImageContent($currentSlide, index, "");
          }
          var markup = utils.getVideoPosterMarkup(poster, dummyImg || "", lgVideoStyle, this.settings.strings["playVideo"], videoInfo);
          $currentSlide.prepend(markup);
        } else if (videoInfo) {
          var markup = '<div class="lg-video-cont " style="' + lgVideoStyle + '"></div>';
          $currentSlide.prepend(markup);
        } else {
          this.setImgMarkup(src, $currentSlide, index);
          if (srcset || sources) {
            var $img = $currentSlide.find(".lg-object");
            this.initPictureFill($img);
          }
        }
        if (poster || videoInfo) {
          this.LGel.trigger(lGEvents.hasVideo, {
            index,
            src,
            html5Video: _html5Video,
            hasPoster: !!poster
          });
        }
        this.LGel.trigger(lGEvents.afterAppendSlide, { index });
        if (this.lGalleryOn && this.settings.appendSubHtmlTo === ".lg-item") {
          this.addHtml(index);
        }
      }
      var _speed = 0;
      if (delay && !$LG(document.body).hasClass("lg-from-hash")) {
        _speed = delay;
      }
      if (this.isFirstSlideWithZoomAnimation()) {
        setTimeout(function() {
          $currentSlide.removeClass("lg-start-end-progress lg-start-progress").removeAttr("style");
        }, this.settings.startAnimationDuration + 100);
        if (!$currentSlide.hasClass("lg-loaded")) {
          setTimeout(function() {
            if (_this.getSlideType(currentGalleryItem) === "image") {
              var alt = currentGalleryItem.alt;
              var altAttr = alt ? 'alt="' + alt + '"' : "";
              $currentSlide.find(".lg-img-wrap").append(utils.getImgMarkup(index, src, altAttr, srcset, sizes, currentGalleryItem.sources));
              if (srcset || sources) {
                var $img2 = $currentSlide.find(".lg-object");
                _this.initPictureFill($img2);
              }
            }
            if (_this.getSlideType(currentGalleryItem) === "image" || _this.getSlideType(currentGalleryItem) === "video" && poster) {
              _this.onLgObjectLoad($currentSlide, index, delay, _speed, true, false);
              _this.onSlideObjectLoad($currentSlide, !!(videoInfo && videoInfo.html5 && !poster), function() {
                _this.loadContentOnFirstSlideLoad(index, $currentSlide, _speed);
              }, function() {
                _this.loadContentOnFirstSlideLoad(index, $currentSlide, _speed);
              });
            }
          }, this.settings.startAnimationDuration + 100);
        }
      }
      $currentSlide.addClass("lg-loaded");
      if (!this.isFirstSlideWithZoomAnimation() || this.getSlideType(currentGalleryItem) === "video" && !poster) {
        this.onLgObjectLoad($currentSlide, index, delay, _speed, isFirstSlide, !!(videoInfo && videoInfo.html5 && !poster));
      }
      if ((!this.zoomFromOrigin || !this.currentImageSize) && $currentSlide.hasClass("lg-complete_") && !this.lGalleryOn) {
        setTimeout(function() {
          $currentSlide.addClass("lg-complete");
        }, this.settings.backdropDuration);
      }
      this.lGalleryOn = true;
      if (rec === true) {
        if (!$currentSlide.hasClass("lg-complete_")) {
          $currentSlide.find(".lg-object").first().on("load.lg error.lg", function() {
            _this.preload(index);
          });
        } else {
          this.preload(index);
        }
      }
    };
    LightGallery2.prototype.loadContentOnFirstSlideLoad = function(index, $currentSlide, speed) {
      var _this = this;
      setTimeout(function() {
        $currentSlide.find(".lg-dummy-img").remove();
        $currentSlide.removeClass("lg-first-slide");
        _this.outer.removeClass("lg-first-slide-loading");
        _this.isDummyImageRemoved = true;
        _this.preload(index);
      }, speed + 300);
    };
    LightGallery2.prototype.getItemsToBeInsertedToDom = function(index, prevIndex, numberOfItems) {
      var _this = this;
      if (numberOfItems === void 0) {
        numberOfItems = 0;
      }
      var itemsToBeInsertedToDom = [];
      var possibleNumberOfItems = Math.max(numberOfItems, 3);
      possibleNumberOfItems = Math.min(possibleNumberOfItems, this.galleryItems.length);
      var prevIndexItem = "lg-item-" + this.lgId + "-" + prevIndex;
      if (this.galleryItems.length <= 3) {
        this.galleryItems.forEach(function(_element, index2) {
          itemsToBeInsertedToDom.push("lg-item-" + _this.lgId + "-" + index2);
        });
        return itemsToBeInsertedToDom;
      }
      if (index < (this.galleryItems.length - 1) / 2) {
        for (var idx = index; idx > index - possibleNumberOfItems / 2 && idx >= 0; idx--) {
          itemsToBeInsertedToDom.push("lg-item-" + this.lgId + "-" + idx);
        }
        var numberOfExistingItems = itemsToBeInsertedToDom.length;
        for (var idx = 0; idx < possibleNumberOfItems - numberOfExistingItems; idx++) {
          itemsToBeInsertedToDom.push("lg-item-" + this.lgId + "-" + (index + idx + 1));
        }
      } else {
        for (var idx = index; idx <= this.galleryItems.length - 1 && idx < index + possibleNumberOfItems / 2; idx++) {
          itemsToBeInsertedToDom.push("lg-item-" + this.lgId + "-" + idx);
        }
        var numberOfExistingItems = itemsToBeInsertedToDom.length;
        for (var idx = 0; idx < possibleNumberOfItems - numberOfExistingItems; idx++) {
          itemsToBeInsertedToDom.push("lg-item-" + this.lgId + "-" + (index - idx - 1));
        }
      }
      if (this.settings.loop) {
        if (index === this.galleryItems.length - 1) {
          itemsToBeInsertedToDom.push("lg-item-" + this.lgId + "-0");
        } else if (index === 0) {
          itemsToBeInsertedToDom.push("lg-item-" + this.lgId + "-" + (this.galleryItems.length - 1));
        }
      }
      if (itemsToBeInsertedToDom.indexOf(prevIndexItem) === -1) {
        itemsToBeInsertedToDom.push("lg-item-" + this.lgId + "-" + prevIndex);
      }
      return itemsToBeInsertedToDom;
    };
    LightGallery2.prototype.organizeSlideItems = function(index, prevIndex) {
      var _this = this;
      var itemsToBeInsertedToDom = this.getItemsToBeInsertedToDom(index, prevIndex, this.settings.numberOfSlideItemsInDom);
      itemsToBeInsertedToDom.forEach(function(item) {
        if (_this.currentItemsInDom.indexOf(item) === -1) {
          _this.$inner.append('<div id="' + item + '" class="lg-item"></div>');
        }
      });
      this.currentItemsInDom.forEach(function(item) {
        if (itemsToBeInsertedToDom.indexOf(item) === -1) {
          $LG("#" + item).remove();
        }
      });
      return itemsToBeInsertedToDom;
    };
    LightGallery2.prototype.getPreviousSlideIndex = function() {
      var prevIndex = 0;
      try {
        var currentItemId = this.outer.find(".lg-current").first().attr("id");
        prevIndex = parseInt(currentItemId.split("-")[3]) || 0;
      } catch (error) {
        prevIndex = 0;
      }
      return prevIndex;
    };
    LightGallery2.prototype.setDownloadValue = function(index) {
      if (this.settings.download) {
        var currentGalleryItem = this.galleryItems[index];
        var hideDownloadBtn = currentGalleryItem.downloadUrl === false || currentGalleryItem.downloadUrl === "false";
        if (hideDownloadBtn) {
          this.outer.addClass("lg-hide-download");
        } else {
          var $download = this.getElementById("lg-download");
          this.outer.removeClass("lg-hide-download");
          $download.attr("href", currentGalleryItem.downloadUrl || currentGalleryItem.src);
          if (currentGalleryItem.download) {
            $download.attr("download", currentGalleryItem.download);
          }
        }
      }
    };
    LightGallery2.prototype.makeSlideAnimation = function(direction, currentSlideItem, previousSlideItem) {
      var _this = this;
      if (this.lGalleryOn) {
        previousSlideItem.addClass("lg-slide-progress");
      }
      setTimeout(function() {
        _this.outer.addClass("lg-no-trans");
        _this.outer.find(".lg-item").removeClass("lg-prev-slide lg-next-slide");
        if (direction === "prev") {
          currentSlideItem.addClass("lg-prev-slide");
          previousSlideItem.addClass("lg-next-slide");
        } else {
          currentSlideItem.addClass("lg-next-slide");
          previousSlideItem.addClass("lg-prev-slide");
        }
        setTimeout(function() {
          _this.outer.find(".lg-item").removeClass("lg-current");
          currentSlideItem.addClass("lg-current");
          _this.outer.removeClass("lg-no-trans");
        }, 50);
      }, this.lGalleryOn ? this.settings.slideDelay : 0);
    };
    LightGallery2.prototype.slide = function(index, fromTouch, fromThumb, direction) {
      var _this = this;
      var prevIndex = this.getPreviousSlideIndex();
      this.currentItemsInDom = this.organizeSlideItems(index, prevIndex);
      if (this.lGalleryOn && prevIndex === index) {
        return;
      }
      var numberOfGalleryItems = this.galleryItems.length;
      if (!this.lgBusy) {
        if (this.settings.counter) {
          this.updateCurrentCounter(index);
        }
        var currentSlideItem = this.getSlideItem(index);
        var previousSlideItem_1 = this.getSlideItem(prevIndex);
        var currentGalleryItem = this.galleryItems[index];
        var videoInfo = currentGalleryItem.__slideVideoInfo;
        this.outer.attr("data-lg-slide-type", this.getSlideType(currentGalleryItem));
        this.setDownloadValue(index);
        if (videoInfo) {
          var _a = this.mediaContainerPosition, top_3 = _a.top, bottom = _a.bottom;
          var videoSize = utils.getSize(this.items[index], this.outer, top_3 + bottom, videoInfo && this.settings.videoMaxSize);
          this.resizeVideoSlide(index, videoSize);
        }
        this.LGel.trigger(lGEvents.beforeSlide, {
          prevIndex,
          index,
          fromTouch: !!fromTouch,
          fromThumb: !!fromThumb
        });
        this.lgBusy = true;
        clearTimeout(this.hideBarTimeout);
        this.arrowDisable(index);
        if (!direction) {
          if (index < prevIndex) {
            direction = "prev";
          } else if (index > prevIndex) {
            direction = "next";
          }
        }
        if (!fromTouch) {
          this.makeSlideAnimation(direction, currentSlideItem, previousSlideItem_1);
        } else {
          this.outer.find(".lg-item").removeClass("lg-prev-slide lg-current lg-next-slide");
          var touchPrev = void 0;
          var touchNext = void 0;
          if (numberOfGalleryItems > 2) {
            touchPrev = index - 1;
            touchNext = index + 1;
            if (index === 0 && prevIndex === numberOfGalleryItems - 1) {
              touchNext = 0;
              touchPrev = numberOfGalleryItems - 1;
            } else if (index === numberOfGalleryItems - 1 && prevIndex === 0) {
              touchNext = 0;
              touchPrev = numberOfGalleryItems - 1;
            }
          } else {
            touchPrev = 0;
            touchNext = 1;
          }
          if (direction === "prev") {
            this.getSlideItem(touchNext).addClass("lg-next-slide");
          } else {
            this.getSlideItem(touchPrev).addClass("lg-prev-slide");
          }
          currentSlideItem.addClass("lg-current");
        }
        if (!this.lGalleryOn) {
          this.loadContent(index, true);
        } else {
          setTimeout(function() {
            _this.loadContent(index, true);
            if (_this.settings.appendSubHtmlTo !== ".lg-item") {
              _this.addHtml(index);
            }
          }, this.settings.speed + 50 + (fromTouch ? 0 : this.settings.slideDelay));
        }
        setTimeout(function() {
          _this.lgBusy = false;
          previousSlideItem_1.removeClass("lg-slide-progress");
          _this.LGel.trigger(lGEvents.afterSlide, {
            prevIndex,
            index,
            fromTouch,
            fromThumb
          });
        }, (this.lGalleryOn ? this.settings.speed + 100 : 100) + (fromTouch ? 0 : this.settings.slideDelay));
      }
      this.index = index;
    };
    LightGallery2.prototype.updateCurrentCounter = function(index) {
      this.getElementById("lg-counter-current").html(index + 1 + "");
    };
    LightGallery2.prototype.updateCounterTotal = function() {
      this.getElementById("lg-counter-all").html(this.galleryItems.length + "");
    };
    LightGallery2.prototype.getSlideType = function(item) {
      if (item.__slideVideoInfo) {
        return "video";
      } else if (item.iframe) {
        return "iframe";
      } else {
        return "image";
      }
    };
    LightGallery2.prototype.touchMove = function(startCoords, endCoords, e) {
      var distanceX = endCoords.pageX - startCoords.pageX;
      var distanceY = endCoords.pageY - startCoords.pageY;
      var allowSwipe = false;
      if (this.swipeDirection) {
        allowSwipe = true;
      } else {
        if (Math.abs(distanceX) > 15) {
          this.swipeDirection = "horizontal";
          allowSwipe = true;
        } else if (Math.abs(distanceY) > 15) {
          this.swipeDirection = "vertical";
          allowSwipe = true;
        }
      }
      if (!allowSwipe) {
        return;
      }
      var $currentSlide = this.getSlideItem(this.index);
      if (this.swipeDirection === "horizontal") {
        e === null || e === void 0 ? void 0 : e.preventDefault();
        this.outer.addClass("lg-dragging");
        this.setTranslate($currentSlide, distanceX, 0);
        var width = $currentSlide.get().offsetWidth;
        var slideWidthAmount = width * 15 / 100;
        var gutter = slideWidthAmount - Math.abs(distanceX * 10 / 100);
        this.setTranslate(this.outer.find(".lg-prev-slide").first(), -width + distanceX - gutter, 0);
        this.setTranslate(this.outer.find(".lg-next-slide").first(), width + distanceX + gutter, 0);
      } else if (this.swipeDirection === "vertical") {
        if (this.settings.swipeToClose) {
          e === null || e === void 0 ? void 0 : e.preventDefault();
          this.$container.addClass("lg-dragging-vertical");
          var opacity = 1 - Math.abs(distanceY) / window.innerHeight;
          this.$backdrop.css("opacity", opacity);
          var scale = 1 - Math.abs(distanceY) / (window.innerWidth * 2);
          this.setTranslate($currentSlide, 0, distanceY, scale, scale);
          if (Math.abs(distanceY) > 100) {
            this.outer.addClass("lg-hide-items").removeClass("lg-components-open");
          }
        }
      }
    };
    LightGallery2.prototype.touchEnd = function(endCoords, startCoords, event) {
      var _this = this;
      var distance;
      if (this.settings.mode !== "lg-slide") {
        this.outer.addClass("lg-slide");
      }
      setTimeout(function() {
        _this.$container.removeClass("lg-dragging-vertical");
        _this.outer.removeClass("lg-dragging lg-hide-items").addClass("lg-components-open");
        var triggerClick = true;
        if (_this.swipeDirection === "horizontal") {
          distance = endCoords.pageX - startCoords.pageX;
          var distanceAbs = Math.abs(endCoords.pageX - startCoords.pageX);
          if (distance < 0 && distanceAbs > _this.settings.swipeThreshold) {
            _this.goToNextSlide(true);
            triggerClick = false;
          } else if (distance > 0 && distanceAbs > _this.settings.swipeThreshold) {
            _this.goToPrevSlide(true);
            triggerClick = false;
          }
        } else if (_this.swipeDirection === "vertical") {
          distance = Math.abs(endCoords.pageY - startCoords.pageY);
          if (_this.settings.closable && _this.settings.swipeToClose && distance > 100) {
            _this.closeGallery();
            return;
          } else {
            _this.$backdrop.css("opacity", 1);
          }
        }
        _this.outer.find(".lg-item").removeAttr("style");
        if (triggerClick && Math.abs(endCoords.pageX - startCoords.pageX) < 5) {
          var target = $LG(event.target);
          if (_this.isPosterElement(target)) {
            _this.LGel.trigger(lGEvents.posterClick);
          }
        }
        _this.swipeDirection = void 0;
      });
      setTimeout(function() {
        if (!_this.outer.hasClass("lg-dragging") && _this.settings.mode !== "lg-slide") {
          _this.outer.removeClass("lg-slide");
        }
      }, this.settings.speed + 100);
    };
    LightGallery2.prototype.enableSwipe = function() {
      var _this = this;
      var startCoords = {};
      var endCoords = {};
      var isMoved = false;
      var isSwiping = false;
      if (this.settings.enableSwipe) {
        this.$inner.on("touchstart.lg", function(e) {
          _this.dragOrSwipeEnabled = true;
          var $item = _this.getSlideItem(_this.index);
          if (($LG(e.target).hasClass("lg-item") || $item.get().contains(e.target)) && !_this.outer.hasClass("lg-zoomed") && !_this.lgBusy && e.touches.length === 1) {
            isSwiping = true;
            _this.touchAction = "swipe";
            _this.manageSwipeClass();
            startCoords = {
              pageX: e.touches[0].pageX,
              pageY: e.touches[0].pageY
            };
          }
        });
        this.$inner.on("touchmove.lg", function(e) {
          if (isSwiping && _this.touchAction === "swipe" && e.touches.length === 1) {
            endCoords = {
              pageX: e.touches[0].pageX,
              pageY: e.touches[0].pageY
            };
            _this.touchMove(startCoords, endCoords, e);
            isMoved = true;
          }
        });
        this.$inner.on("touchend.lg", function(event) {
          if (_this.touchAction === "swipe") {
            if (isMoved) {
              isMoved = false;
              _this.touchEnd(endCoords, startCoords, event);
            } else if (isSwiping) {
              var target = $LG(event.target);
              if (_this.isPosterElement(target)) {
                _this.LGel.trigger(lGEvents.posterClick);
              }
            }
            _this.touchAction = void 0;
            isSwiping = false;
          }
        });
      }
    };
    LightGallery2.prototype.enableDrag = function() {
      var _this = this;
      var startCoords = {};
      var endCoords = {};
      var isDraging = false;
      var isMoved = false;
      if (this.settings.enableDrag) {
        this.outer.on("mousedown.lg", function(e) {
          _this.dragOrSwipeEnabled = true;
          var $item = _this.getSlideItem(_this.index);
          if ($LG(e.target).hasClass("lg-item") || $item.get().contains(e.target)) {
            if (!_this.outer.hasClass("lg-zoomed") && !_this.lgBusy) {
              e.preventDefault();
              if (!_this.lgBusy) {
                _this.manageSwipeClass();
                startCoords = {
                  pageX: e.pageX,
                  pageY: e.pageY
                };
                isDraging = true;
                _this.outer.get().scrollLeft += 1;
                _this.outer.get().scrollLeft -= 1;
                _this.outer.removeClass("lg-grab").addClass("lg-grabbing");
                _this.LGel.trigger(lGEvents.dragStart);
              }
            }
          }
        });
        $LG(window).on("mousemove.lg.global" + this.lgId, function(e) {
          if (isDraging && _this.lgOpened) {
            isMoved = true;
            endCoords = {
              pageX: e.pageX,
              pageY: e.pageY
            };
            _this.touchMove(startCoords, endCoords);
            _this.LGel.trigger(lGEvents.dragMove);
          }
        });
        $LG(window).on("mouseup.lg.global" + this.lgId, function(event) {
          if (!_this.lgOpened) {
            return;
          }
          var target = $LG(event.target);
          if (isMoved) {
            isMoved = false;
            _this.touchEnd(endCoords, startCoords, event);
            _this.LGel.trigger(lGEvents.dragEnd);
          } else if (_this.isPosterElement(target)) {
            _this.LGel.trigger(lGEvents.posterClick);
          }
          if (isDraging) {
            isDraging = false;
            _this.outer.removeClass("lg-grabbing").addClass("lg-grab");
          }
        });
      }
    };
    LightGallery2.prototype.triggerPosterClick = function() {
      var _this = this;
      this.$inner.on("click.lg", function(event) {
        if (!_this.dragOrSwipeEnabled && _this.isPosterElement($LG(event.target))) {
          _this.LGel.trigger(lGEvents.posterClick);
        }
      });
    };
    LightGallery2.prototype.manageSwipeClass = function() {
      var _touchNext = this.index + 1;
      var _touchPrev = this.index - 1;
      if (this.settings.loop && this.galleryItems.length > 2) {
        if (this.index === 0) {
          _touchPrev = this.galleryItems.length - 1;
        } else if (this.index === this.galleryItems.length - 1) {
          _touchNext = 0;
        }
      }
      this.outer.find(".lg-item").removeClass("lg-next-slide lg-prev-slide");
      if (_touchPrev > -1) {
        this.getSlideItem(_touchPrev).addClass("lg-prev-slide");
      }
      this.getSlideItem(_touchNext).addClass("lg-next-slide");
    };
    LightGallery2.prototype.goToNextSlide = function(fromTouch) {
      var _this = this;
      var _loop = this.settings.loop;
      if (fromTouch && this.galleryItems.length < 3) {
        _loop = false;
      }
      if (!this.lgBusy) {
        if (this.index + 1 < this.galleryItems.length) {
          this.index++;
          this.LGel.trigger(lGEvents.beforeNextSlide, {
            index: this.index
          });
          this.slide(this.index, !!fromTouch, false, "next");
        } else {
          if (_loop) {
            this.index = 0;
            this.LGel.trigger(lGEvents.beforeNextSlide, {
              index: this.index
            });
            this.slide(this.index, !!fromTouch, false, "next");
          } else if (this.settings.slideEndAnimation && !fromTouch) {
            this.outer.addClass("lg-right-end");
            setTimeout(function() {
              _this.outer.removeClass("lg-right-end");
            }, 400);
          }
        }
      }
    };
    LightGallery2.prototype.goToPrevSlide = function(fromTouch) {
      var _this = this;
      var _loop = this.settings.loop;
      if (fromTouch && this.galleryItems.length < 3) {
        _loop = false;
      }
      if (!this.lgBusy) {
        if (this.index > 0) {
          this.index--;
          this.LGel.trigger(lGEvents.beforePrevSlide, {
            index: this.index,
            fromTouch
          });
          this.slide(this.index, !!fromTouch, false, "prev");
        } else {
          if (_loop) {
            this.index = this.galleryItems.length - 1;
            this.LGel.trigger(lGEvents.beforePrevSlide, {
              index: this.index,
              fromTouch
            });
            this.slide(this.index, !!fromTouch, false, "prev");
          } else if (this.settings.slideEndAnimation && !fromTouch) {
            this.outer.addClass("lg-left-end");
            setTimeout(function() {
              _this.outer.removeClass("lg-left-end");
            }, 400);
          }
        }
      }
    };
    LightGallery2.prototype.keyPress = function() {
      var _this = this;
      $LG(window).on("keydown.lg.global" + this.lgId, function(e) {
        if (_this.lgOpened && _this.settings.escKey === true && e.keyCode === 27) {
          e.preventDefault();
          if (_this.settings.allowMediaOverlap && _this.outer.hasClass("lg-can-toggle") && _this.outer.hasClass("lg-components-open")) {
            _this.outer.removeClass("lg-components-open");
          } else {
            _this.closeGallery();
          }
        }
        if (_this.lgOpened && _this.galleryItems.length > 1) {
          if (e.keyCode === 37) {
            e.preventDefault();
            _this.goToPrevSlide();
          }
          if (e.keyCode === 39) {
            e.preventDefault();
            _this.goToNextSlide();
          }
        }
      });
    };
    LightGallery2.prototype.arrow = function() {
      var _this = this;
      this.getElementById("lg-prev").on("click.lg", function() {
        _this.goToPrevSlide();
      });
      this.getElementById("lg-next").on("click.lg", function() {
        _this.goToNextSlide();
      });
    };
    LightGallery2.prototype.arrowDisable = function(index) {
      if (!this.settings.loop && this.settings.hideControlOnEnd) {
        var $prev = this.getElementById("lg-prev");
        var $next = this.getElementById("lg-next");
        if (index + 1 === this.galleryItems.length) {
          $next.attr("disabled", "disabled").addClass("disabled");
        } else {
          $next.removeAttr("disabled").removeClass("disabled");
        }
        if (index === 0) {
          $prev.attr("disabled", "disabled").addClass("disabled");
        } else {
          $prev.removeAttr("disabled").removeClass("disabled");
        }
      }
    };
    LightGallery2.prototype.setTranslate = function($el, xValue, yValue, scaleX, scaleY) {
      if (scaleX === void 0) {
        scaleX = 1;
      }
      if (scaleY === void 0) {
        scaleY = 1;
      }
      $el.css("transform", "translate3d(" + xValue + "px, " + yValue + "px, 0px) scale3d(" + scaleX + ", " + scaleY + ", 1)");
    };
    LightGallery2.prototype.mousewheel = function() {
      var _this = this;
      var lastCall = 0;
      this.outer.on("wheel.lg", function(e) {
        if (!e.deltaY || _this.galleryItems.length < 2) {
          return;
        }
        e.preventDefault();
        var now = (/* @__PURE__ */ new Date()).getTime();
        if (now - lastCall < 1e3) {
          return;
        }
        lastCall = now;
        if (e.deltaY > 0) {
          _this.goToNextSlide();
        } else if (e.deltaY < 0) {
          _this.goToPrevSlide();
        }
      });
    };
    LightGallery2.prototype.isSlideElement = function(target) {
      return target.hasClass("lg-outer") || target.hasClass("lg-item") || target.hasClass("lg-img-wrap") || target.hasClass("lg-img-rotate");
    };
    LightGallery2.prototype.isPosterElement = function(target) {
      var playButton = this.getSlideItem(this.index).find(".lg-video-play-button").get();
      return target.hasClass("lg-video-poster") || target.hasClass("lg-video-play-button") || playButton && playButton.contains(target.get());
    };
    LightGallery2.prototype.toggleMaximize = function() {
      var _this = this;
      this.getElementById("lg-maximize").on("click.lg", function() {
        _this.$container.toggleClass("lg-inline");
        _this.refreshOnResize();
      });
    };
    LightGallery2.prototype.invalidateItems = function() {
      for (var index = 0; index < this.items.length; index++) {
        var element = this.items[index];
        var $element = $LG(element);
        $element.off("click.lgcustom-item-" + $element.attr("data-lg-id"));
      }
    };
    LightGallery2.prototype.trapFocus = function() {
      var _this = this;
      this.$container.get().focus({
        preventScroll: true
      });
      $LG(window).on("keydown.lg.global" + this.lgId, function(e) {
        if (!_this.lgOpened) {
          return;
        }
        var isTabPressed = e.key === "Tab" || e.keyCode === 9;
        if (!isTabPressed) {
          return;
        }
        var focusableEls = utils.getFocusableElements(_this.$container.get());
        var firstFocusableEl = focusableEls[0];
        var lastFocusableEl = focusableEls[focusableEls.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === firstFocusableEl) {
            lastFocusableEl.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastFocusableEl) {
            firstFocusableEl.focus();
            e.preventDefault();
          }
        }
      });
    };
    LightGallery2.prototype.manageCloseGallery = function() {
      var _this = this;
      if (!this.settings.closable)
        return;
      var mousedown = false;
      this.getElementById("lg-close").on("click.lg", function() {
        _this.closeGallery();
      });
      if (this.settings.closeOnTap) {
        this.outer.on("mousedown.lg", function(e) {
          var target = $LG(e.target);
          if (_this.isSlideElement(target)) {
            mousedown = true;
          } else {
            mousedown = false;
          }
        });
        this.outer.on("mousemove.lg", function() {
          mousedown = false;
        });
        this.outer.on("mouseup.lg", function(e) {
          var target = $LG(e.target);
          if (_this.isSlideElement(target) && mousedown) {
            if (!_this.outer.hasClass("lg-dragging")) {
              _this.closeGallery();
            }
          }
        });
      }
    };
    LightGallery2.prototype.closeGallery = function(force) {
      var _this = this;
      if (!this.lgOpened || !this.settings.closable && !force) {
        return 0;
      }
      this.LGel.trigger(lGEvents.beforeClose);
      if (this.settings.resetScrollPosition && !this.settings.hideScrollbar) {
        $LG(window).scrollTop(this.prevScrollTop);
      }
      var currentItem = this.items[this.index];
      var transform;
      if (this.zoomFromOrigin && currentItem) {
        var _a = this.mediaContainerPosition, top_4 = _a.top, bottom = _a.bottom;
        var _b = this.galleryItems[this.index], __slideVideoInfo = _b.__slideVideoInfo, poster = _b.poster;
        var imageSize = utils.getSize(currentItem, this.outer, top_4 + bottom, __slideVideoInfo && poster && this.settings.videoMaxSize);
        transform = utils.getTransform(currentItem, this.outer, top_4, bottom, imageSize);
      }
      if (this.zoomFromOrigin && transform) {
        this.outer.addClass("lg-closing lg-zoom-from-image");
        this.getSlideItem(this.index).addClass("lg-start-end-progress").css("transition-duration", this.settings.startAnimationDuration + "ms").css("transform", transform);
      } else {
        this.outer.addClass("lg-hide-items");
        this.outer.removeClass("lg-zoom-from-image");
      }
      this.destroyModules();
      this.lGalleryOn = false;
      this.isDummyImageRemoved = false;
      this.zoomFromOrigin = this.settings.zoomFromOrigin;
      clearTimeout(this.hideBarTimeout);
      this.hideBarTimeout = false;
      $LG("html").removeClass("lg-on");
      this.outer.removeClass("lg-visible lg-components-open");
      this.$backdrop.removeClass("in").css("opacity", 0);
      var removeTimeout = this.zoomFromOrigin && transform ? Math.max(this.settings.startAnimationDuration, this.settings.backdropDuration) : this.settings.backdropDuration;
      this.$container.removeClass("lg-show-in");
      setTimeout(function() {
        if (_this.zoomFromOrigin && transform) {
          _this.outer.removeClass("lg-zoom-from-image");
        }
        _this.$container.removeClass("lg-show");
        _this.resetScrollBar();
        _this.$backdrop.removeAttr("style").css("transition-duration", _this.settings.backdropDuration + "ms");
        _this.outer.removeClass("lg-closing " + _this.settings.startClass);
        _this.getSlideItem(_this.index).removeClass("lg-start-end-progress");
        _this.$inner.empty();
        if (_this.lgOpened) {
          _this.LGel.trigger(lGEvents.afterClose, {
            instance: _this
          });
        }
        if (_this.$container.get()) {
          _this.$container.get().blur();
        }
        _this.lgOpened = false;
      }, removeTimeout + 100);
      return removeTimeout + 100;
    };
    LightGallery2.prototype.initModules = function() {
      this.plugins.forEach(function(module) {
        try {
          module.init();
        } catch (err) {
          console.warn("lightGallery:- make sure lightGallery module is properly initiated");
        }
      });
    };
    LightGallery2.prototype.destroyModules = function(destroy) {
      this.plugins.forEach(function(module) {
        try {
          if (destroy) {
            module.destroy();
          } else {
            module.closeGallery && module.closeGallery();
          }
        } catch (err) {
          console.warn("lightGallery:- make sure lightGallery module is properly destroyed");
        }
      });
    };
    LightGallery2.prototype.refresh = function(galleryItems) {
      if (!this.settings.dynamic) {
        this.invalidateItems();
      }
      if (galleryItems) {
        this.galleryItems = galleryItems;
      } else {
        this.galleryItems = this.getItems();
      }
      this.updateControls();
      this.openGalleryOnItemClick();
      this.LGel.trigger(lGEvents.updateSlides);
    };
    LightGallery2.prototype.updateControls = function() {
      this.addSlideVideoInfo(this.galleryItems);
      this.updateCounterTotal();
      this.manageSingleSlideClassName();
    };
    LightGallery2.prototype.destroyGallery = function() {
      this.destroyModules(true);
      if (!this.settings.dynamic) {
        this.invalidateItems();
      }
      $LG(window).off(".lg.global" + this.lgId);
      this.LGel.off(".lg");
      this.$container.remove();
    };
    LightGallery2.prototype.destroy = function() {
      var closeTimeout = this.closeGallery(true);
      if (closeTimeout) {
        setTimeout(this.destroyGallery.bind(this), closeTimeout);
      } else {
        this.destroyGallery();
      }
      return closeTimeout;
    };
    return LightGallery2;
  }()
);
function lightGallery(el, options) {
  return new LightGallery(el, options);
}
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var lgZoom_min$1 = { exports: {} };
/**
 * lightgallery | 2.9.0-beta.1 | June 15th 2025
 * http://www.lightgalleryjs.com/
 * Copyright (c) 2020 Sachin Neravath;
 * @license GPLv3
 */
var lgZoom_min = lgZoom_min$1.exports;
var hasRequiredLgZoom_min;
function requireLgZoom_min() {
  if (hasRequiredLgZoom_min) return lgZoom_min$1.exports;
  hasRequiredLgZoom_min = 1;
  (function(module, exports) {
    !function(e, t) {
      module.exports = t();
    }(lgZoom_min, function() {
      var e = function() {
        return (e = Object.assign || function(e2) {
          for (var t2, o2 = 1, i2 = arguments.length; o2 < i2; o2++) for (var s2 in t2 = arguments[o2]) Object.prototype.hasOwnProperty.call(t2, s2) && (e2[s2] = t2[s2]);
          return e2;
        }).apply(this, arguments);
      }, t = { scale: 1, zoom: true, infiniteZoom: true, actualSize: true, showZoomInOutIcons: false, actualSizeIcons: { zoomIn: "lg-zoom-in", zoomOut: "lg-zoom-out" }, enableZoomAfter: 300, zoomPluginStrings: { zoomIn: "Zoom in", zoomOut: "Zoom out", viewActualSize: "View actual size" } }, o = "lgContainerResize", i = "lgBeforeOpen", s = "lgAfterOpen", a = "lgSlideItemLoad", n = "lgAfterSlide", r = "lgRotateLeft", l = "lgRotateRight", c = "lgFlipHorizontal", g = "lgFlipVertical";
      return function() {
        function h(o2, i2) {
          return this.core = o2, this.$LG = i2, this.settings = e(e({}, t), this.core.settings), this;
        }
        return h.prototype.buildTemplates = function() {
          var e2 = this.settings.showZoomInOutIcons ? '<button id="' + this.core.getIdName("lg-zoom-in") + '" type="button" aria-label="' + this.settings.zoomPluginStrings.zoomIn + '" class="lg-zoom-in lg-icon"></button><button id="' + this.core.getIdName("lg-zoom-out") + '" type="button" aria-label="' + this.settings.zoomPluginStrings.zoomOut + '" class="lg-zoom-out lg-icon"></button>' : "";
          this.settings.actualSize && (e2 += '<button id="' + this.core.getIdName("lg-actual-size") + '" type="button" aria-label="' + this.settings.zoomPluginStrings.viewActualSize + '" class="' + this.settings.actualSizeIcons.zoomIn + ' lg-icon"></button>'), this.core.outer.addClass("lg-use-transition-for-zoom"), this.core.$toolbar.first().append(e2);
        }, h.prototype.enableZoom = function(e2) {
          var t2 = this, o2 = this.settings.enableZoomAfter + e2.detail.delay;
          this.$LG("body").first().hasClass("lg-from-hash") && e2.detail.delay ? o2 = 0 : this.$LG("body").first().removeClass("lg-from-hash"), this.zoomableTimeout = setTimeout(function() {
            t2.isImageSlide(t2.core.index) && (t2.core.getSlideItem(e2.detail.index).addClass("lg-zoomable"), e2.detail.index === t2.core.index && t2.setZoomEssentials());
          }, o2 + 30);
        }, h.prototype.enableZoomOnSlideItemLoad = function() {
          this.core.LGel.on(a + ".zoom", this.enableZoom.bind(this));
        }, h.prototype.getDragCords = function(e2) {
          return { x: e2.pageX, y: e2.pageY };
        }, h.prototype.getSwipeCords = function(e2) {
          return { x: e2.touches[0].pageX, y: e2.touches[0].pageY };
        }, h.prototype.getDragAllowedAxises = function(e2, t2) {
          if (!this.containerRect) return { allowX: false, allowY: false };
          var o2 = this.core.getSlideItem(this.core.index).find(".lg-image").first().get(), i2 = 0, s2 = 0, a2 = o2.getBoundingClientRect();
          e2 ? (i2 = o2.offsetHeight * e2, s2 = o2.offsetWidth * e2) : t2 ? (i2 = a2.height + t2 * a2.height, s2 = a2.width + t2 * a2.width) : (i2 = a2.height, s2 = a2.width);
          var n2 = i2 > this.containerRect.height;
          return { allowX: s2 > this.containerRect.width, allowY: n2 };
        }, h.prototype.setZoomEssentials = function() {
          this.containerRect = this.core.$content.get().getBoundingClientRect();
        }, h.prototype.zoomImage = function(e2, t2, o2, i2) {
          if (this.containerRect && !(Math.abs(t2) <= 0)) {
            var s2, a2, n2 = this.containerRect.width / 2 + this.containerRect.left, r2 = this.containerRect.height / 2 + this.containerRect.top + this.scrollTop;
            1 === e2 && (this.positionChanged = false);
            var l2 = this.getDragAllowedAxises(0, t2), c2 = l2.allowY, g2 = l2.allowX;
            this.positionChanged && (s2 = this.left / (this.scale - t2), a2 = this.top / (this.scale - t2), this.pageX = n2 - s2, this.pageY = r2 - a2, this.positionChanged = false);
            var h2, m, u = this.getPossibleSwipeDragCords(t2), d = n2 - this.pageX, f = r2 - this.pageY;
            if (e2 - t2 > 1) {
              var p = (e2 - t2) / Math.abs(t2);
              h2 = (d = (t2 < 0 ? -d : d) + this.left * (p + (t2 < 0 ? -1 : 1))) / p, m = (f = (t2 < 0 ? -f : f) + this.top * (p + (t2 < 0 ? -1 : 1))) / p;
            } else {
              h2 = d * (p = (e2 - t2) * t2), m = f * p;
            }
            o2 && (g2 ? this.isBeyondPossibleLeft(h2, u.minX) ? h2 = u.minX : this.isBeyondPossibleRight(h2, u.maxX) && (h2 = u.maxX) : e2 > 1 && (h2 < u.minX ? h2 = u.minX : h2 > u.maxX && (h2 = u.maxX)), c2 ? this.isBeyondPossibleTop(m, u.minY) ? m = u.minY : this.isBeyondPossibleBottom(m, u.maxY) && (m = u.maxY) : e2 > 1 && (m < u.minY ? m = u.minY : m > u.maxY && (m = u.maxY))), this.setZoomStyles({ x: h2, y: m, scale: e2 }), this.left = h2, this.top = m, i2 && this.setZoomImageSize();
          }
        }, h.prototype.resetImageTranslate = function(e2) {
          if (this.isImageSlide(e2)) {
            var t2 = this.core.getSlideItem(e2).find(".lg-image").first();
            this.imageReset = false, t2.removeClass("reset-transition reset-transition-y reset-transition-x"), this.core.outer.removeClass("lg-actual-size"), t2.css("width", "auto").css("height", "auto"), setTimeout(function() {
              t2.removeClass("no-transition");
            }, 10);
          }
        }, h.prototype.setZoomImageSize = function() {
          var e2 = this, t2 = this.core.getSlideItem(this.core.index).find(".lg-image").first();
          setTimeout(function() {
            var o2 = e2.getCurrentImageActualSizeScale();
            e2.scale >= o2 && (t2.addClass("no-transition"), e2.imageReset = true);
          }, 500), setTimeout(function() {
            var o2 = e2.getCurrentImageActualSizeScale();
            if (e2.scale >= o2) {
              var i2 = e2.getDragAllowedAxises(e2.scale);
              t2.css("width", t2.get().naturalWidth + "px").css("height", t2.get().naturalHeight + "px"), e2.core.outer.addClass("lg-actual-size"), i2.allowX && i2.allowY ? t2.addClass("reset-transition") : i2.allowX && !i2.allowY ? t2.addClass("reset-transition-x") : !i2.allowX && i2.allowY && t2.addClass("reset-transition-y");
            }
          }, 550);
        }, h.prototype.setZoomStyles = function(e2) {
          var t2 = this.core.getSlideItem(this.core.index).find(".lg-img-wrap").first(), o2 = this.core.getSlideItem(this.core.index).find(".lg-image").first(), i2 = this.core.outer.find(".lg-current .lg-dummy-img").first();
          this.scale = e2.scale, o2.css("transform", "scale3d(" + e2.scale + ", " + e2.scale + ", 1)"), i2.css("transform", "scale3d(" + e2.scale + ", " + e2.scale + ", 1)");
          var s2 = "translate3d(" + e2.x + "px, " + e2.y + "px, 0)";
          t2.css("transform", s2);
        }, h.prototype.setActualSize = function(e2, t2) {
          var o2 = this;
          if (!this.zoomInProgress) {
            this.zoomInProgress = true;
            var i2 = this.core.galleryItems[this.core.index];
            this.resetImageTranslate(e2), setTimeout(function() {
              if (i2.src && !o2.core.outer.hasClass("lg-first-slide-loading")) {
                var e3 = o2.getCurrentImageActualSizeScale(), s2 = o2.scale;
                o2.core.outer.hasClass("lg-zoomed") ? o2.scale = 1 : o2.scale = o2.getScale(e3), o2.setPageCords(t2), o2.beginZoom(o2.scale), o2.zoomImage(o2.scale, o2.scale - s2, true, true);
              }
            }, 50), setTimeout(function() {
              o2.core.outer.removeClass("lg-grabbing").addClass("lg-grab");
            }, 60), setTimeout(function() {
              o2.zoomInProgress = false;
            }, 610);
          }
        }, h.prototype.getNaturalWidth = function(e2) {
          var t2 = this.core.getSlideItem(e2).find(".lg-image").first(), o2 = this.core.galleryItems[e2].width;
          return o2 ? parseFloat(o2) : t2.get().naturalWidth;
        }, h.prototype.getActualSizeScale = function(e2, t2) {
          return e2 >= t2 ? e2 / t2 || 2 : 1;
        }, h.prototype.getCurrentImageActualSizeScale = function() {
          var e2 = this.core.getSlideItem(this.core.index).find(".lg-image").first().get().offsetWidth, t2 = this.getNaturalWidth(this.core.index) || e2;
          return this.getActualSizeScale(t2, e2);
        }, h.prototype.getPageCords = function(e2) {
          var t2 = {};
          if (e2) t2.x = e2.pageX || e2.touches[0].pageX, t2.y = e2.pageY || e2.touches[0].pageY;
          else {
            var o2 = this.core.$content.get().getBoundingClientRect();
            t2.x = o2.width / 2 + o2.left, t2.y = o2.height / 2 + this.scrollTop + o2.top;
          }
          return t2;
        }, h.prototype.setPageCords = function(e2) {
          var t2 = this.getPageCords(e2);
          this.pageX = t2.x, this.pageY = t2.y;
        }, h.prototype.manageActualPixelClassNames = function() {
          this.core.getElementById("lg-actual-size").removeClass(this.settings.actualSizeIcons.zoomIn).addClass(this.settings.actualSizeIcons.zoomOut);
        }, h.prototype.beginZoom = function(e2) {
          return this.core.outer.removeClass("lg-zoom-drag-transition lg-zoom-dragging"), e2 > 1 ? (this.core.outer.addClass("lg-zoomed"), this.manageActualPixelClassNames()) : this.resetZoom(), e2 > 1;
        }, h.prototype.getScale = function(e2) {
          var t2 = this.getCurrentImageActualSizeScale();
          return e2 < 1 ? e2 = 1 : e2 > t2 && (e2 = t2), e2;
        }, h.prototype.init = function() {
          var e2 = this;
          if (this.settings.zoom) {
            this.buildTemplates(), this.enableZoomOnSlideItemLoad();
            var t2 = null;
            this.core.outer.on("dblclick.lg", function(t3) {
              e2.$LG(t3.target).hasClass("lg-image") && e2.setActualSize(e2.core.index, t3);
            }), this.core.outer.on("touchstart.lg", function(o2) {
              var i2 = e2.$LG(o2.target);
              1 === o2.touches.length && i2.hasClass("lg-image") && (t2 ? (clearTimeout(t2), t2 = null, o2.preventDefault(), e2.setActualSize(e2.core.index, o2)) : t2 = setTimeout(function() {
                t2 = null;
              }, 300));
            }), this.core.LGel.on(o + ".zoom " + l + ".zoom " + r + ".zoom " + c + ".zoom " + g + ".zoom", function() {
              if (e2.core.lgOpened && e2.isImageSlide(e2.core.index) && !e2.core.touchAction) {
                var t3 = e2.core.getSlideItem(e2.core.index).find(".lg-img-wrap").first();
                e2.top = 0, e2.left = 0, e2.setZoomEssentials(), e2.setZoomSwipeStyles(t3, { x: 0, y: 0 }), e2.positionChanged = true;
              }
            }), this.$LG(window).on("scroll.lg.zoom.global" + this.core.lgId, function() {
              e2.core.lgOpened && (e2.scrollTop = e2.$LG(window).scrollTop());
            }), this.core.getElementById("lg-zoom-out").on("click.lg", function() {
              if (e2.isImageSlide(e2.core.index)) {
                var t3 = 0;
                e2.imageReset && (e2.resetImageTranslate(e2.core.index), t3 = 50), setTimeout(function() {
                  var t4 = e2.scale - e2.settings.scale;
                  t4 < 1 && (t4 = 1), e2.beginZoom(t4), e2.zoomImage(t4, -e2.settings.scale, true, !e2.settings.infiniteZoom);
                }, t3);
              }
            }), this.core.getElementById("lg-zoom-in").on("click.lg", function() {
              e2.zoomIn();
            }), this.core.getElementById("lg-actual-size").on("click.lg", function() {
              e2.setActualSize(e2.core.index);
            }), this.core.LGel.on(i + ".zoom", function() {
              e2.core.outer.find(".lg-item").removeClass("lg-zoomable");
            }), this.core.LGel.on(s + ".zoom", function() {
              e2.scrollTop = e2.$LG(window).scrollTop(), e2.pageX = e2.core.outer.width() / 2, e2.pageY = e2.core.outer.height() / 2 + e2.scrollTop, e2.scale = 1;
            }), this.core.LGel.on(n + ".zoom", function(t3) {
              var o2 = t3.detail.prevIndex;
              e2.scale = 1, e2.positionChanged = false, e2.zoomInProgress = false, e2.resetZoom(o2), e2.resetImageTranslate(o2), e2.isImageSlide(e2.core.index) && e2.setZoomEssentials();
            }), this.zoomDrag(), this.pinchZoom(), this.zoomSwipe(), this.zoomableTimeout = false, this.positionChanged = false, this.zoomInProgress = false;
          }
        }, h.prototype.zoomIn = function() {
          if (this.isImageSlide(this.core.index)) {
            var e2 = this.scale + this.settings.scale;
            this.settings.infiniteZoom || (e2 = this.getScale(e2)), this.beginZoom(e2), this.zoomImage(e2, Math.min(this.settings.scale, e2 - this.scale), true, !this.settings.infiniteZoom);
          }
        }, h.prototype.resetZoom = function(e2) {
          this.core.outer.removeClass("lg-zoomed lg-zoom-drag-transition");
          var t2 = this.core.getElementById("lg-actual-size"), o2 = this.core.getSlideItem(void 0 !== e2 ? e2 : this.core.index);
          t2.removeClass(this.settings.actualSizeIcons.zoomOut).addClass(this.settings.actualSizeIcons.zoomIn), o2.find(".lg-img-wrap").first().removeAttr("style"), o2.find(".lg-image").first().removeAttr("style"), this.scale = 1, this.left = 0, this.top = 0, this.setPageCords();
        }, h.prototype.getTouchDistance = function(e2) {
          return Math.sqrt((e2.touches[0].pageX - e2.touches[1].pageX) * (e2.touches[0].pageX - e2.touches[1].pageX) + (e2.touches[0].pageY - e2.touches[1].pageY) * (e2.touches[0].pageY - e2.touches[1].pageY));
        }, h.prototype.pinchZoom = function() {
          var e2 = this, t2 = 0, o2 = false, i2 = 1, s2 = 0, a2 = this.core.getSlideItem(this.core.index);
          this.core.outer.on("touchstart.lg", function(o3) {
            if (a2 = e2.core.getSlideItem(e2.core.index), e2.isImageSlide(e2.core.index) && 2 === o3.touches.length) {
              if (o3.preventDefault(), e2.core.outer.hasClass("lg-first-slide-loading")) return;
              i2 = e2.scale || 1, e2.core.outer.removeClass("lg-zoom-drag-transition lg-zoom-dragging"), e2.setPageCords(o3), e2.resetImageTranslate(e2.core.index), e2.core.touchAction = "pinch", t2 = e2.getTouchDistance(o3);
            }
          }), this.core.$inner.on("touchmove.lg", function(n2) {
            if (2 === n2.touches.length && "pinch" === e2.core.touchAction && (e2.$LG(n2.target).hasClass("lg-item") || a2.get().contains(n2.target))) {
              n2.preventDefault();
              var r2 = e2.getTouchDistance(n2), l2 = t2 - r2;
              if (!o2 && Math.abs(l2) > 5 && (o2 = true), o2) {
                s2 = e2.scale;
                var c2 = Math.max(1, i2 + 0.02 * -l2);
                e2.scale = Math.round(100 * (c2 + Number.EPSILON)) / 100;
                var g2 = e2.scale - s2;
                e2.zoomImage(e2.scale, Math.round(100 * (g2 + Number.EPSILON)) / 100, false, false);
              }
            }
          }), this.core.$inner.on("touchend.lg", function(i3) {
            if ("pinch" === e2.core.touchAction && (e2.$LG(i3.target).hasClass("lg-item") || a2.get().contains(i3.target))) {
              if (o2 = false, t2 = 0, e2.scale <= 1) e2.resetZoom();
              else {
                var s3 = e2.getCurrentImageActualSizeScale();
                if (e2.scale >= s3) {
                  var n2 = s3 - e2.scale;
                  0 === n2 && (n2 = 0.01), e2.zoomImage(s3, n2, false, true);
                }
                e2.manageActualPixelClassNames(), e2.core.outer.addClass("lg-zoomed");
              }
              e2.core.touchAction = void 0;
            }
          });
        }, h.prototype.touchendZoom = function(e2, t2, o2, i2, s2) {
          var a2 = t2.x - e2.x, n2 = t2.y - e2.y, r2 = Math.abs(a2) / s2 + 1, l2 = Math.abs(n2) / s2 + 1;
          r2 > 2 && (r2 += 1), l2 > 2 && (l2 += 1), a2 *= r2, n2 *= l2;
          var c2 = this.core.getSlideItem(this.core.index).find(".lg-img-wrap").first(), g2 = {};
          g2.x = this.left + a2, g2.y = this.top + n2;
          var h2 = this.getPossibleSwipeDragCords();
          (Math.abs(a2) > 15 || Math.abs(n2) > 15) && (i2 && (this.isBeyondPossibleTop(g2.y, h2.minY) ? g2.y = h2.minY : this.isBeyondPossibleBottom(g2.y, h2.maxY) && (g2.y = h2.maxY)), o2 && (this.isBeyondPossibleLeft(g2.x, h2.minX) ? g2.x = h2.minX : this.isBeyondPossibleRight(g2.x, h2.maxX) && (g2.x = h2.maxX)), i2 ? this.top = g2.y : g2.y = this.top, o2 ? this.left = g2.x : g2.x = this.left, this.setZoomSwipeStyles(c2, g2), this.positionChanged = true);
        }, h.prototype.getZoomSwipeCords = function(e2, t2, o2, i2, s2) {
          var a2 = {};
          if (i2) {
            if (a2.y = this.top + (t2.y - e2.y), this.isBeyondPossibleTop(a2.y, s2.minY)) {
              var n2 = s2.minY - a2.y;
              a2.y = s2.minY - n2 / 6;
            } else if (this.isBeyondPossibleBottom(a2.y, s2.maxY)) {
              var r2 = a2.y - s2.maxY;
              a2.y = s2.maxY + r2 / 6;
            }
          } else a2.y = this.top;
          if (o2) {
            if (a2.x = this.left + (t2.x - e2.x), this.isBeyondPossibleLeft(a2.x, s2.minX)) {
              var l2 = s2.minX - a2.x;
              a2.x = s2.minX - l2 / 6;
            } else if (this.isBeyondPossibleRight(a2.x, s2.maxX)) {
              var c2 = a2.x - s2.maxX;
              a2.x = s2.maxX + c2 / 6;
            }
          } else a2.x = this.left;
          return a2;
        }, h.prototype.isBeyondPossibleLeft = function(e2, t2) {
          return e2 >= t2;
        }, h.prototype.isBeyondPossibleRight = function(e2, t2) {
          return e2 <= t2;
        }, h.prototype.isBeyondPossibleTop = function(e2, t2) {
          return e2 >= t2;
        }, h.prototype.isBeyondPossibleBottom = function(e2, t2) {
          return e2 <= t2;
        }, h.prototype.isImageSlide = function(e2) {
          var t2 = this.core.galleryItems[e2];
          return "image" === this.core.getSlideType(t2);
        }, h.prototype.getPossibleSwipeDragCords = function(e2) {
          var t2 = this.core.getSlideItem(this.core.index).find(".lg-image").first(), o2 = this.core.mediaContainerPosition.bottom, i2 = t2.get().getBoundingClientRect(), s2 = i2.height, a2 = i2.width;
          return e2 && (s2 += e2 * s2, a2 += e2 * a2), { minY: (s2 - this.containerRect.height) / 2, maxY: (this.containerRect.height - s2) / 2 + o2, minX: (a2 - this.containerRect.width) / 2, maxX: (this.containerRect.width - a2) / 2 };
        }, h.prototype.setZoomSwipeStyles = function(e2, t2) {
          e2.css("transform", "translate3d(" + t2.x + "px, " + t2.y + "px, 0)");
        }, h.prototype.zoomSwipe = function() {
          var e2, t2, o2 = this, i2 = {}, s2 = {}, a2 = false, n2 = false, r2 = false, l2 = /* @__PURE__ */ new Date(), c2 = this.core.getSlideItem(this.core.index);
          this.core.$inner.on("touchstart.lg", function(s3) {
            if (o2.isImageSlide(o2.core.index) && (c2 = o2.core.getSlideItem(o2.core.index), (o2.$LG(s3.target).hasClass("lg-item") || c2.get().contains(s3.target)) && 1 === s3.touches.length && o2.core.outer.hasClass("lg-zoomed"))) {
              s3.preventDefault(), l2 = /* @__PURE__ */ new Date(), o2.core.touchAction = "zoomSwipe", t2 = o2.core.getSlideItem(o2.core.index).find(".lg-img-wrap").first();
              var a3 = o2.getDragAllowedAxises(0);
              r2 = a3.allowY, ((n2 = a3.allowX) || r2) && (i2 = o2.getSwipeCords(s3)), e2 = o2.getPossibleSwipeDragCords(), o2.core.outer.addClass("lg-zoom-dragging lg-zoom-drag-transition");
            }
          }), this.core.$inner.on("touchmove.lg", function(l3) {
            if (1 === l3.touches.length && "zoomSwipe" === o2.core.touchAction && (o2.$LG(l3.target).hasClass("lg-item") || c2.get().contains(l3.target))) {
              l3.preventDefault(), o2.core.touchAction = "zoomSwipe", s2 = o2.getSwipeCords(l3);
              var g2 = o2.getZoomSwipeCords(i2, s2, n2, r2, e2);
              (Math.abs(s2.x - i2.x) > 15 || Math.abs(s2.y - i2.y) > 15) && (a2 = true, o2.setZoomSwipeStyles(t2, g2));
            }
          }), this.core.$inner.on("touchend.lg", function(e3) {
            if ("zoomSwipe" === o2.core.touchAction && (o2.$LG(e3.target).hasClass("lg-item") || c2.get().contains(e3.target))) {
              if (e3.preventDefault(), o2.core.touchAction = void 0, o2.core.outer.removeClass("lg-zoom-dragging"), !a2) return;
              a2 = false;
              var t3 = (/* @__PURE__ */ new Date()).valueOf() - l2.valueOf();
              o2.touchendZoom(i2, s2, n2, r2, t3);
            }
          });
        }, h.prototype.zoomDrag = function() {
          var e2, t2, o2, i2, s2 = this, a2 = {}, n2 = {}, r2 = false, l2 = false, c2 = false, g2 = false;
          this.core.outer.on("mousedown.lg.zoom", function(t3) {
            if (s2.isImageSlide(s2.core.index)) {
              var n3 = s2.core.getSlideItem(s2.core.index);
              if (s2.$LG(t3.target).hasClass("lg-item") || n3.get().contains(t3.target)) {
                e2 = /* @__PURE__ */ new Date(), i2 = s2.core.getSlideItem(s2.core.index).find(".lg-img-wrap").first();
                var l3 = s2.getDragAllowedAxises(0);
                g2 = l3.allowY, c2 = l3.allowX, s2.core.outer.hasClass("lg-zoomed") && s2.$LG(t3.target).hasClass("lg-object") && (c2 || g2) && (t3.preventDefault(), a2 = s2.getDragCords(t3), o2 = s2.getPossibleSwipeDragCords(), r2 = true, s2.core.outer.removeClass("lg-grab").addClass("lg-grabbing lg-zoom-drag-transition lg-zoom-dragging"));
              }
            }
          }), this.$LG(window).on("mousemove.lg.zoom.global" + this.core.lgId, function(e3) {
            if (r2) {
              l2 = true, n2 = s2.getDragCords(e3);
              var t3 = s2.getZoomSwipeCords(a2, n2, c2, g2, o2);
              s2.setZoomSwipeStyles(i2, t3);
            }
          }), this.$LG(window).on("mouseup.lg.zoom.global" + this.core.lgId, function(o3) {
            if (r2) {
              if (t2 = /* @__PURE__ */ new Date(), r2 = false, s2.core.outer.removeClass("lg-zoom-dragging"), l2 && (a2.x !== n2.x || a2.y !== n2.y)) {
                n2 = s2.getDragCords(o3);
                var i3 = t2.valueOf() - e2.valueOf();
                s2.touchendZoom(a2, n2, c2, g2, i3);
              }
              l2 = false;
            }
            s2.core.outer.removeClass("lg-grabbing").addClass("lg-grab");
          });
        }, h.prototype.closeGallery = function() {
          this.resetZoom(), this.zoomInProgress = false;
        }, h.prototype.destroy = function() {
          this.$LG(window).off(".lg.zoom.global" + this.core.lgId), this.core.LGel.off(".lg.zoom"), this.core.LGel.off(".zoom"), clearTimeout(this.zoomableTimeout), this.zoomableTimeout = false;
        }, h;
      }();
    });
  })(lgZoom_min$1);
  return lgZoom_min$1.exports;
}
var lgZoom_minExports = requireLgZoom_min();
const lgZoom = /* @__PURE__ */ getDefaultExportFromCjs(lgZoom_minExports);
const KEY = "7EC452A9-0CFD441C-BD984C7C-17C8456E";
function initGallery() {
  if (document.querySelector("[data-fls-gallery]")) {
    new lightGallery(document.querySelector("[data-fls-gallery]"), {
      plugins: [lgZoom],
      licenseKey: KEY,
      selector: "a",
      speed: isMobile.any() ? 300 : 0,
      mode: "lg-fade",
      subHtmlSelectorRelative: false,
      getCaptionFromTitleOrAlt: false,
      counter: false,
      download: false,
      zoomFromOrigin: true,
      allowMediaOverlap: true,
      zoom: true,
      actualSize: false,
      showZoomInOutIcons: true,
      enableDrag: false,
      // щоб тягати
      enableZoomAfter: 300,
      // щоб пан був доступний після zoom
      scale: 1.5,
      // рівень зуму (можна змінити)
      mousewheel: false
      // прибрати zoom на колесо
    });
  }
}
window.addEventListener("load", initGallery());
