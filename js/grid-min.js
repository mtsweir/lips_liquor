/*
* debouncedresize: special jQuery event that happens once after a window resize
*
* latest version and complete README available on Github:
* https://github.com/louisremi/jquery-smartresize/blob/master/jquery.debouncedresize.js
*
* Copyright 2011 @louis_remi
* Licensed under the MIT license.
*/
var $event=$.event,$special,resizeTimeout;$special=$event.special.debouncedresize={setup:function(){$(this).on("resize",$special.handler)},teardown:function(){$(this).off("resize",$special.handler)},handler:function(i,e){
// Save the context
var t=this,s=arguments,n=function(){
// set correct event type
i.type="debouncedresize",$event.dispatch.apply(t,s)};resizeTimeout&&clearTimeout(resizeTimeout),e?n():resizeTimeout=setTimeout(n,$special.threshold)},threshold:250};
// ======================= imagesLoaded Plugin ===============================
// https://github.com/desandro/imagesloaded
// $('#my-container').imagesLoaded(myFunction)
// execute a callback when all images have loaded.
// needed because .load() doesn't work on cached images
// callback function gets image collection as argument
//  this is the container
// original: MIT license. Paul Irish. 2010.
// contributors: Oren Solomianik, David DeSandro, Yiannis Chatzikonstantinou
// blank image data-uri bypasses webkit log warning (thx doug jones)
var BLANK="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";$.fn.imagesLoaded=function(t){function s(){var i=$(c),e=$(l);h&&(l.length?h.reject(o,i,e):h.resolve(o)),$.isFunction(t)&&t.call(a,o,i,e)}function n(i,e){
// don't proceed if BLANK image, or image is already loaded
i.src!==BLANK&&-1===$.inArray(i,d)&&(
// store element in loaded images array
d.push(i),
// keep track of broken and properly loaded images
e?l.push(i):c.push(i),
// cache image and its state for future calls
$.data(i,"imagesLoaded",{isBroken:e,src:i.src}),
// trigger deferred progress method if present
r&&h.notifyWith($(i),[e,o,$(c),$(l)]),
// call doneLoading and clean listeners if all images are loaded
o.length===d.length&&(setTimeout(s),o.unbind(".imagesLoaded")))}
// if no images, trigger immediately
var a=this,h=$.isFunction($.Deferred)?$.Deferred():0,r=$.isFunction(h.notify),o=a.find("img").add(a.filter("img")),d=[],c=[],l=[];
// Register deferred callbacks
return $.isPlainObject(t)&&$.each(t,function(i,e){"callback"===i?t=e:h&&h[i](e)}),o.length?o.bind("load.imagesLoaded error.imagesLoaded",function(i){
// trigger imgLoaded
n(i.target,"error"===i.type)}).each(function(i,e){var t=e.src,s=$.data(e,"imagesLoaded");
// find out if this image has been already checked for status
// if it was, and src has not changed, call imgLoaded on it
s&&s.src===t?n(e,s.isBroken):
// if complete is true and browser supports natural sizes, try
// to check for image status manually
e.complete&&void 0!==e.naturalWidth?n(e,0===e.naturalWidth||0===e.naturalHeight):
// cached images don't fire load sometimes, so we reset src, but only when
// dealing with IE, or image is complete (loaded) and failed manual check
// webkit hack from http://groups.google.com/group/jquery-dev/browse_thread/thread/eee6ab7b2da50e1f
(e.readyState||e.complete)&&(e.src=BLANK,e.src=t)}):s(),h?h.promise(a):a};var Grid=function(){function i(i){
// the settings..
b=$.extend(!0,{},b,i),
// preload all images
c.imagesLoaded(function(){
// save item´s size and offset
t(!0),
// get window´s size
a(),
// initialize some events
s()})}
// add more items to the grid.
// the new items need to appended to the grid.
// after that call Grid.addItems(theItems);
function e(i){l=l.add(i),i.each(function(){var i=$(this);i.data({offsetTop:i.offset().top,height:i.height()})}),n(i)}
// saves the item´s offset top and height (if saveheight is true)
function t(e){l.each(function(){var i=$(this);i.data("offsetTop",i.offset().top),e&&i.data("height",i.height())})}function s(){
// when clicking an item, show the preview with the item´s info and large image.
// close the item if already expanded.
// also close if clicking on the item´s cross
n(l),
// on window resize get the window´s size again
// reset some values..
m.on("debouncedresize",function(){f=0,p=-1,
// save item´s offset
t(),a();var i=$.data(this,"preview");
// if( typeof preview != 'undefined' ) {
// 	hidePreview();
// }
})}function n(i){i.on("click","span.og-close",function(){return r(),!1}).children("a").on("click",function(i){var e=$(this).parent();
// check if item already opened
return g===e.index()?r():h(e),!1})}function a(){v={width:m.width(),height:m.height()}}function h(i){var e=$.data(this,"preview"),
// item´s offset top
t=i.data("offsetTop");
// if a preview exists and previewPos is different (different row) from item´s top then close it
if(void(f=0)!==e){
// not in the same row
if(p===t)return e.update(i),!1;
// if position > previewPos then we need to take te current preview´s height in consideration when scrolling the window
p<t&&(f=e.height),r()}
// update previewPos
p=t,
// expand preview overlay
(
// initialize new preview for the clicked item
e=$.data(this,"preview",new o(i))).open()}function r(){var i;g=-1,$.data(this,"preview").close(),$.removeData(this,"preview")}
// the preview obj / overlay
function o(i){this.$item=i,this.expandedIdx=this.$item.index(),this.create(),this.update()}
// grid selector
var d,
// list of items
c=$("#og-grid"),
// the items
l=c.children("li"),
// current expanded item's index
g=-1,
// position (top) of the expanded item
// used to know if the preview will expand in a different row
p=-1,
// extra amount of pixels to scroll the window
f=0,
// extra margin when expanded (between preview overlay and the next items)
u=10,m=$(window),v,w=$("html, body"),
// transitionend events
A,T={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd",msTransition:"MSTransitionEnd",transition:"transitionend"}[Modernizr.prefixed("transition")],
// support for csstransitions
x=Modernizr.csstransitions,
// default settings
b={minHeight:500,speed:350,easing:"ease",showVisitButton:!0};return o.prototype={create:function(){
// create Preview structure:
this.$title=$("<h3></h3>"),this.$description=$("<p></p>");var i=[this.$title,this.$description];!0===b.showVisitButton&&(this.$href=$('<a href="#">Grab this Deal!</a>'),i.push(this.$href)),this.$details=$('<div class="og-details"></div>').append(i),this.$loading=$('<div class="og-loading"></div>'),this.$fullimage=$('<div class="og-fullimg"></div>').append(this.$loading),this.$closePreview=$('<span class="og-close"></span>'),this.$previewInner=$('<div class="og-expander-inner"></div>').append(this.$closePreview,this.$fullimage,this.$details),this.$previewEl=$('<div class="og-expander"></div>').append(this.$previewInner),
// append preview element to the item
this.$item.append(this.getEl()),
// set the transitions for the preview and the item
x&&this.setTransition()},update:function(i){var e;
// if already expanded remove class "og-expanded" from current item and add it to new item
(i&&(this.$item=i),-1!==g)&&(l.eq(g).removeClass("og-expanded"),this.$item.addClass("og-expanded"),
// position the preview correctly
this.positionPreview());
// update current value
g=this.$item.index();
// update preview´s content
var t=this.$item.children("a"),s={href:t.attr("href"),largesrc:t.data("largesrc"),title:t.data("title"),description:t.data("description")};this.$title.html(s.title),this.$description.html(s.description),!0===b.showVisitButton&&this.$href.attr("href",s.href);var n=this;
// remove the current image in the preview
void 0!==n.$largeImg&&n.$largeImg.remove(),
// preload large image and add it to the preview
// for smaller screens we don´t display the large image (the media query will hide the fullimage wrapper)
n.$fullimage.is(":visible")&&(this.$loading.show(),$("<img/>").load(function(){var i=$(this);i.attr("src")===n.$item.children("a").data("largesrc")&&(n.$loading.hide(),n.$fullimage.find("img").remove(),n.$largeImg=i.fadeIn(350),n.$fullimage.append(n.$largeImg))}).attr("src",s.largesrc))},open:function(){setTimeout($.proxy(function(){
// set the height for the preview and the item
this.setHeights(),
// scroll to position the preview in the right place
this.positionPreview()},this),25)},close:function(){var i=this,e=function(){x&&$(this).off(T),i.$item.removeClass("og-expanded"),i.$previewEl.remove()};return setTimeout($.proxy(function(){void 0!==this.$largeImg&&this.$largeImg.fadeOut("fast"),this.$previewEl.css("height",0);
// the current expanded item (might be different from this.$item)
var i=l.eq(this.expandedIdx);i.css("height",i.data("height")).on(T,e),x||e.call()},this),25),!1},calcHeight:function(){var i=v.height-this.$item.data("height")-u,e=v.height;i<b.minHeight&&(i=b.minHeight,e=b.minHeight+this.$item.data("height")+u),this.height=i,this.itemHeight=e},setHeights:function(){var i=this,e=function(){x&&i.$item.off(T),i.$item.addClass("og-expanded")};this.calcHeight(),this.$previewEl.css("height",this.height),this.$item.css("height",this.itemHeight).on(T,e),x||e.call()},positionPreview:function(){
// scroll page
// case 1 : preview height + item height fits in window´s height
// case 2 : preview height + item height does not fit in window´s height and preview height is smaller than window´s height
// case 3 : preview height + item height does not fit in window´s height and preview height is bigger than window´s height
var i=this.$item.data("offsetTop"),e=this.$previewEl.offset().top-f,t=this.height+this.$item.data("height")+u<=v.height?i:this.height<v.height?e-(v.height-this.height):e;w.animate({scrollTop:t},b.speed)},setTransition:function(){this.$previewEl.css("transition","height "+b.speed+"ms "+b.easing),this.$item.css("transition","height "+b.speed+"ms "+b.easing)},getEl:function(){return this.$previewEl}},{init:i,addItems:e}}();