function onYouTubeIframeAPIReady(){slideshow_jquery_image_gallery_script.youTubeAPIReady=!0}slideshow_jquery_image_gallery_backend_script_scriptsloadedFlag=!1,slideshow_jquery_image_gallery_script=function(){var e=jQuery,t={};return t.slideshowInstances={},t.initialized=!1,t.youTubeAPIReady=!1,t.init=function(){slideshow_jquery_image_gallery_backend_script_scriptsloadedFlag!==!0||t.initialized||(t.initialized=!0,e(document).trigger("slideshow_jquery_image_gallery_script_ready"),t.loadYouTubeAPI(),t.repairStylesheetURLs(),t.activateSlideshows(),e(document).trigger("slideshow_jquery_image_gallery_slideshows_ready"))},t.getSlideshowInstance=function(s){if(isNaN(parseInt(s,10))){if(s instanceof e&&s.length>0)for(var i in t.slideshowInstances)if(t.slideshowInstances.hasOwnProperty(i)){var n=t.slideshowInstances[i];if(n instanceof t.Slideshow&&n.$container.get(0)===s.get(0))return n}}else if(t.slideshowInstances[s]instanceof t.Slideshow)return t.slideshowInstances[s];return new t.Slideshow},t.activateSlideshows=function(){e.each(jQuery(".slideshow_container"),function(s,i){var n=e(i),a=n.data("sessionId");isNaN(parseInt(a,10))&&(a=n.attr("data-session-id")),t.slideshowInstances[a]instanceof t.Slideshow||(t.slideshowInstances[a]=new t.Slideshow(n))})},t.loadYouTubeAPI=function(){if(t.loadYouTubeAPICalled=!0,!(e(".slideshow_slide_video").length<=0)){var s=document.createElement("script"),i=document.getElementsByTagName("script")[0];s.src="//www.youtube.com/iframe_api",i.parentNode.insertBefore(s,i)}},t.repairStylesheetURLs=function(){var s=e('[id*="slideshow-jquery-image-gallery-ajax-stylesheet_"]');return s.length<=0?(t.generateStylesheetURLs(!1),void 0):(e.each(s,function(t,s){var i,n,a,l=e(s),o=e(s).attr("href");void 0!==o&&""!==o&&(i=l.attr("id").split("_"),n=i.splice(1,i.length-1).join("_").slice(0,-4),a=o.split("?"),(void 0===a[1]||""===a[1]||a[1].toLowerCase().indexOf("style=")<0)&&(a[1]="action=slideshow_jquery_image_gallery_load_stylesheet&style="+n+"&ver="+Math.round((new Date).getTime()/1e3),o=a.join("?"),l.attr("href",o)))}),void 0)},t.generateStylesheetURLs=function(t){var s=e(".slideshow_container"),i=window.slideshow_jquery_image_gallery_script_adminURL;s.length<=0||"string"!=typeof i||i.length<=0||e.each(s,function(s,n){var a,l,o=e(n),r=o.attr("data-style-name"),d=o.attr("data-style-version"),c="slideshow-jquery-image-gallery-ajax-stylesheet_"+r+"-css";if("string"==typeof r&&"string"==typeof d&&r.length>0&&d.length>0){if(!t&&"boolean"==typeof t&&(a=e("#"+c),a.length>0))return;l=i+"admin-ajax.php?action=slideshow_jquery_image_gallery_load_stylesheet&style="+r+"&ver="+d,e("head").append('<link rel="stylesheet" id="'+c+'" href="'+l+'" type="text/css" media="all">')}})},e(document).ready(function(){t.init()}),e(window).load(function(){t.init()}),e.fn.getSlideshowInstance=function(){return t.getSlideshowInstance(this)},t}();

!function(){var i=jQuery,t=slideshow_jquery_image_gallery_script;t.Slideshow=function(t){if(t instanceof i&&(this.$container=t,this.$content=this.$container.find(".slideshow_content"),this.$views=this.$container.find(".slideshow_view"),this.$slides=this.$container.find(".slideshow_slide"),this.$controlPanel=this.$container.find(".slideshow_controlPanel"),this.$togglePlayButton=this.$controlPanel.find(".slideshow_togglePlay"),this.$nextButton=this.$container.find(".slideshow_next"),this.$previousButton=this.$container.find(".slideshow_previous"),this.$pagination=this.$container.find(".slideshow_pagination"),this.$loadingIcon=this.$container.find(".slideshow_loading_icon"),this.ID=this.getID(),!isNaN(parseInt(this.ID,10)))){this.settings=window["SlideshowPluginSettings_"+this.ID],i.each(this.settings,i.proxy(function(i,t){"true"==t?this.settings[i]=!0:"false"==t&&(this.settings[i]=!1)},this)),this.$parentElement=this.$container.parent(),this.viewData=[],this.viewIDs=[],this.currentlyAnimating=!1,this.currentViewID=void 0,this.currentWidth=0,this.visibleViews=[],this.videoPlayers=[],this.PlayStates={UNSTARTED:-2,PAUSED:-1,TEMPORARILY_PAUSED:0,PLAYING:1},this.playState=this.PlayStates.UNSTARTED,this.interval=!1,this.pauseOnHoverTimer=!1,this.descriptionTimer=!1,this.randomNextHistoryViewIDs=[],this.randomPreviousHistoryViewIDs=[],this.randomAvailableViewIDs=[],i.each(this.$views,i.proxy(function(i){this.viewIDs.push(i)},this)),this.currentViewID=this.getNextViewID(),this.visibleViews=[this.currentViewID],this.recalculate(!1);var s=i.proxy(function(t){(this.$container.width()<=0||this.$container.height()<=0)&&setTimeout(i.proxy(function(){t(t)},this),500),i.each(this.$views,i.proxy(function(t,s){var e=i(s);t!=this.visibleViews[0]?e.css("top",this.$container.outerHeight(!0)).find("a").attr("tabindex","-1"):e.addClass("slideshow_currentView")},this))},this);s(s);var e=!0;i.each(this.$views,i.proxy(function(t,s){var n=i(s);this.viewData[t]=[],i.each(n.find(".slideshow_slide"),i.proxy(function(s,n){var h=i(n);if(this.viewData[t][s]={},h.hasClass("slideshow_slide_image")){var a=h.find("img");a.length>0?a.get(0).complete?this.viewData[t][s].loaded=1:(t===this.currentViewID&&(e=!1),this.viewData[t][s].loaded=0,this.onImageLoad(a,i.proxy(function(i){this.viewData[t][s].loaded=i?1:2,this.settings.waitUntilLoaded&&t===this.currentViewID&&this.isViewLoaded(t)&&this.start()},this))):this.viewData[t][s].loaded=-1}else this.viewData[t][s].loaded=-1},this))},this)),i(window).load(i.proxy(function(){this.recalculateVisibleViews()},this)),parseFloat(this.settings.intervalSpeed)<parseFloat(this.settings.slideSpeed)+.1&&(this.settings.intervalSpeed=parseFloat(this.settings.slideSpeed)+.1),(!this.settings.waitUntilLoaded||this.settings.waitUntilLoaded&&e)&&this.start()}}}();
!function(){var t=jQuery,i=slideshow_jquery_image_gallery_script;i.Slideshow.prototype.start=function(){this.activateDescriptions(),this.activateControlPanel(),this.activateNavigationButtons(),this.activatePagination(),this.activatePauseOnHover(),this.$loadingIcon.length>0&&this.$loadingIcon.remove(),this.$content.show(),this.recalculateViews(),this.settings.enableResponsiveness&&t(window).resize(t.proxy(function(){this.recalculate(!0)},this)),this.playState=this.PlayStates.PAUSED,this.$container.trigger("slideshowPlayStateChange",[this.playState]),this.settings.play&&this.play()},i.Slideshow.prototype.play=function(){this.interval||(this.playState=this.PlayStates.PLAYING,this.$container.trigger("slideshowPlayStateChange",[this.playState]),this.interval=setInterval(t.proxy(function i(e,s){void 0===s&&(s=this),void 0===e&&(e=s.getNextViewID()),s.isViewLoaded(e)?(s.animateTo(e,1),s.play()):(s.pause(this.PlayStates.TEMPORARILY_PAUSED),setTimeout(t.proxy(function(){i(e,s)},s),100))},this),1e3*this.settings.intervalSpeed))},i.Slideshow.prototype.pause=function(t){clearInterval(this.interval),this.interval=!1,t!==this.PlayStates.PAUSED&&t!==this.PlayStates.TEMPORARILY_PAUSED&&(t=this.PlayStates.PAUSED),this.playState=t,this.$container.trigger("slideshowPlayStateChange",[this.playState])},i.Slideshow.prototype.next=function(){this.playState===this.PlayStates.PLAYING&&(this.pause(this.PlayStates.TEMPORARILY_PAUSED),this.play()),this.animateTo(this.getNextViewID(),1)},i.Slideshow.prototype.previous=function(){this.playState===this.PlayStates.PLAYING&&(this.pause(this.PlayStates.TEMPORARILY_PAUSED),this.play()),this.animateTo(this.getPreviousViewID(),-1)},i.Slideshow.prototype.isVideoPlaying=function(){for(var t in this.videoPlayers)if(this.videoPlayers.hasOwnProperty(t)){var i=this.videoPlayers[t].state;if(1==i||3==i)return!0}return!1},i.Slideshow.prototype.pauseAllVideos=function(){for(var t in this.videoPlayers)if(this.videoPlayers.hasOwnProperty(t)){var i=this.videoPlayers[t].player;null!=i&&"function"==typeof i.pauseVideo&&(this.videoPlayers[t].state=2,i.pauseVideo())}},i.Slideshow.prototype.isViewLoaded=function(i){var e=!0;return isNaN(parseInt(i,10))?!1:(t.each(this.viewData[i],t.proxy(function(t,i){0==i.loaded&&(e=!1)},this)),e)},i.Slideshow.prototype.getNaturalImageSize=function(i,e,s){return i.length<=0||!(i instanceof t)||"string"!=typeof i.attr("src")?(e(-1,-1,s),void 0):(this.onImageLoad(i,t.proxy(function(t,i){e(i.width,i.height,s)},this)),void 0)},i.Slideshow.prototype.onImageLoad=function(i,e,s){var a=new Image;return i.length<=0||!(i instanceof t)||"string"!=typeof i.attr("src")?(e(!1,a,s),void 0):(a.onload=t.proxy(function(){e(!0,a,s)},this),a.src=i.attr("src"),void 0)},i.Slideshow.prototype.getNextViewID=function(){var t=this.currentViewID;if(this.settings.random){var i=t;if(t=this.getNextRandomViewID(),t!=i)return t}return isNaN(parseInt(t,10))?0:t>=this.$views.length-1?this.settings.loop?0:this.currentViewID:t+1},i.Slideshow.prototype.getPreviousViewID=function(){var t=this.currentViewID;if(isNaN(parseInt(t,10))&&(t=0),this.settings.random){var i=t;if(t=this.getPreviousRandomViewID(),t!=i)return t}return 0>=t?this.settings.loop?t=this.$views.length-1:this.currentViewID:t-=1},i.Slideshow.prototype.getNextRandomViewID=function(){if(isNaN(parseInt(this.currentViewID,10))||this.randomPreviousHistoryViewIDs.push(this.currentViewID),this.randomPreviousHistoryViewIDs.length>2*this.viewIDs.length&&this.randomPreviousHistoryViewIDs.shift(),this.randomNextHistoryViewIDs.length>0)return this.randomNextHistoryViewIDs.pop();if(void 0===this.randomAvailableViewIDs||this.randomAvailableViewIDs.length<=0){this.randomAvailableViewIDs=t.extend(!0,[],this.viewIDs);var i=t.inArray(this.currentViewID,this.randomAvailableViewIDs);i>=0&&this.randomAvailableViewIDs.splice(i,1)}return this.randomAvailableViewIDs.splice(Math.floor(Math.random()*this.randomAvailableViewIDs.length),1).pop()},i.Slideshow.prototype.getPreviousRandomViewID=function(){return isNaN(parseInt(this.currentViewID,10))||this.randomNextHistoryViewIDs.push(this.currentViewID),this.randomNextHistoryViewIDs.length>2*this.viewIDs.length&&this.randomNextHistoryViewIDs.shift(),this.randomPreviousHistoryViewIDs.length>0?this.randomPreviousHistoryViewIDs.pop():this.viewIDs[Math.floor(Math.random()*this.viewIDs.length)]},i.Slideshow.prototype.getID=function(){var t=this.$container.data("sessionId");return isNaN(parseInt(t,10))&&(t=this.$container.attr("data-session-id")),t},i.Slideshow.prototype.bindSubmitListener=function(i){i.keypress(t.proxy(function(i){var e=i.keyCode||i.which;13===e&&(i.preventDefault(),t(i.currentTarget).click())},this))}}();
!function(){var e=jQuery,t=slideshow_jquery_image_gallery_script;t.Slideshow.prototype.animateTo=function(t,i){if(!(this.isVideoPlaying()||0>t||t>=this.$views.length||t==this.currentViewID)){if(this.currentlyAnimating===!0)return this.$container.one("slideshowAnimationEnd",e.proxy(function(){this.playState===this.PlayStates.PLAYING&&(this.pause(this.PlayStates.TEMPORARILY_PAUSED),this.play()),this.animateTo(t,i)},this)),void 0;this.currentlyAnimating=!0,(isNaN(parseInt(i,10))||0==i)&&(i=t<this.currentViewID?-1:1),this.visibleViews=[this.currentViewID,t];var s=this.settings.animation,n=["slide","slideRight","slideUp","slideDown","fade","directFade"];"random"==s&&(s=n[Math.floor(Math.random()*n.length)]);var o={slide:"slideRight",slideRight:"slide",slideUp:"slideDown",slideDown:"slideUp",fade:"fade",directFade:"directFade"};0>i&&(s=o[s]);var d=e(this.$views[this.currentViewID]),a=e(this.$views[t]);switch(d.stop(!0,!0),a.stop(!0,!0),a.addClass("slideshow_nextView"),this.recalculateVisibleViews(),this.currentViewID=t,this.$container.trigger("slideshowAnimationStart",[t,s,i]),s){case"slide":a.css({top:0,left:this.$content.width()}),d.animate({left:-d.outerWidth(!0)},1e3*this.settings.slideSpeed),a.animate({left:0},1e3*this.settings.slideSpeed),setTimeout(e.proxy(function(){d.stop(!0,!0).css("top",this.$container.outerHeight(!0))},this),1e3*this.settings.slideSpeed);break;case"slideRight":a.css({top:0,left:-this.$content.width()}),d.animate({left:d.outerWidth(!0)},1e3*this.settings.slideSpeed),a.animate({left:0},1e3*this.settings.slideSpeed),setTimeout(e.proxy(function(){d.stop(!0,!0).css("top",this.$container.outerHeight(!0))},this),1e3*this.settings.slideSpeed);break;case"slideUp":a.css({top:this.$content.height(),left:0}),d.animate({top:-d.outerHeight(!0)},1e3*this.settings.slideSpeed),a.animate({top:0},1e3*this.settings.slideSpeed),setTimeout(e.proxy(function(){d.stop(!0,!0).css("top",this.$container.outerHeight(!0))},this),1e3*this.settings.slideSpeed);break;case"slideDown":a.css({top:-this.$content.height(),left:0}),d.animate({top:d.outerHeight(!0)},1e3*this.settings.slideSpeed),a.animate({top:0},1e3*this.settings.slideSpeed),setTimeout(e.proxy(function(){d.stop(!0,!0).css("top",this.$container.outerHeight(!0))},this),1e3*this.settings.slideSpeed);break;case"fade":a.css({top:0,left:0,display:"none"}),d.fadeOut(1e3*this.settings.slideSpeed/2),setTimeout(e.proxy(function(){a.fadeIn(1e3*this.settings.slideSpeed/2),d.stop(!0,!0).css({top:this.$container.outerHeight(!0),display:"block"})},this),1e3*this.settings.slideSpeed/2);break;case"directFade":a.css({top:0,left:0,"z-index":0,display:"none"}),d.css({"z-index":1}),a.stop(!0,!0).fadeIn(1e3*this.settings.slideSpeed),d.stop(!0,!0).fadeOut(1e3*this.settings.slideSpeed),setTimeout(e.proxy(function(){a.stop(!0,!0).css({"z-index":0}),d.stop(!0,!0).css({top:this.$container.outerHeight(!0),display:"block","z-index":0})},this),1e3*this.settings.slideSpeed);break;case"crossFade":a.css({top:0,left:0,"z-index":1,display:"none"}),d.css({"z-index":0}),a.stop(!0,!0).fadeIn(1e3*this.settings.slideSpeed),setTimeout(e.proxy(function(){d.css({top:this.$container.outerHeight(!0)}),a.css({"z-index":1})},this),1e3*this.settings.slideSpeed)}setTimeout(e.proxy(function(){d.removeClass("slideshow_currentView").find("a").attr("tabindex","-1"),a.removeClass("slideshow_nextView"),a.addClass("slideshow_currentView").find("a").attr("tabindex","0"),this.visibleViews=[t],this.currentlyAnimating=!1,this.$container.trigger("slideshowAnimationEnd")},this),1e3*this.settings.slideSpeed)}}}();
!function(){var t=jQuery,i=slideshow_jquery_image_gallery_script;i.Slideshow.prototype.recalculate=function(i){if(!this.$container.is(":visible"))return setTimeout(t.proxy(function(){this.recalculate(i)},this),500),void 0;for(var e=this.$parentElement,h=0;e.width()<=0&&(e=e.parent(),!(h>50));h++);if(this.currentWidth!=e.width()){this.currentWidth=e.width();var s=e.width()-(this.$container.outerWidth()-this.$container.width());if(parseInt(this.settings.maxWidth,10)>0&&parseInt(this.settings.maxWidth,10)<s&&(s=parseInt(this.settings.maxWidth,10)),this.$container.css("width",Math.floor(s)),this.$content.css("width",Math.floor(s)-(this.$content.outerWidth(!0)-this.$content.width())),this.settings.preserveSlideshowDimensions){var o=s*this.settings.dimensionHeight/this.settings.dimensionWidth;this.$container.css("height",Math.floor(o)),this.$content.css("height",Math.floor(o)-(this.$content.outerHeight(!0)-this.$content.height()))}else this.$container.css("height",Math.floor(this.settings.height)),this.$content.css("height",Math.floor(this.settings.height));this.$views.each(t.proxy(function(i,e){t.inArray(i,this.visibleViews)<0&&t(e).css("top",this.$container.outerHeight(!0))},this)),this.$container.trigger("slideshowResize"),(i||"boolean"!=typeof i)&&this.recalculateVisibleViews()}},i.Slideshow.prototype.recalculateViews=function(){t.each(this.$views,t.proxy(function(t){this.recalculateView(t,!1)},this))},i.Slideshow.prototype.recalculateVisibleViews=function(){t.each(this.visibleViews,t.proxy(function(t,i){this.recalculateView(i,!1)},this))},i.Slideshow.prototype.recalculateView=function(e,h){if(this.$content.width()<=0||this.$content.height()<=0)return setTimeout(t.proxy(function(){this.recalculateView(e,h)},this),500),void 0;var s=t(this.$views[e]);if("boolean"==typeof h&&h||this.$content.width()!=s.outerWidth(!0)){var o=s.find(".slideshow_slide");if(!(o.length<=0)){var r=this.$content.width()-(s.outerWidth(!0)-s.width()),a=this.$content.height()-(s.outerHeight(!0)-s.height()),n=Math.floor(r/o.length),d=a,l=r%o.length,c=0;t(o[0]).css("margin-left",0),t(o[o.length-1]).css("margin-right",0),t.each(o,t.proxy(function(h,s){var r=t(s),a=r.outerWidth(!0)-r.width(),g=r.outerHeight(!0)-r.height();if(h==o.length-1?r.width(n-a+l):r.width(n-a),r.height(d-g),r.hasClass("slideshow_slide_text")){var w=r.find(".slideshow_background_anchor");if(w.length<=0)return;var u=r.width()-(w.outerWidth(!0)-w.width()),f=r.height()-(w.outerHeight(!0)-w.height());w.css({width:u,height:f})}else if(r.hasClass("slideshow_slide_image")){var v=r.find("img");if(v.length<=0)return;var p,m,y=v.outerWidth(),$=v.outerHeight();p=isNaN(parseInt(y,10))?0:y-v.width(),m=isNaN(parseInt($,10))?0:$-v.height();var _=r.width()-p,x=r.height()-m;"stretch"===this.settings.imageBehaviour?(v.css({width:_,height:x}),v.attr({width:_,height:x})):this.getNaturalImageSize(v,t.proxy(function(i,h){var s,o;return 0>=i||0>=h?(setTimeout(t.proxy(function(){this.recalculateView(e,!0)},this),500),void 0):(s=r.width()/r.height(),o=(i+p)/(h+m),o>=s?"natural"===this.settings.imageBehaviour?(v.css({margin:"0px",width:_,height:Math.floor(_/o)}),v.attr({width:_,height:Math.floor(_/o)})):"crop"===this.settings.imageBehaviour&&(v.css({"margin-top":"0px","margin-left":-Math.floor((x*o-_)/2),height:x,width:Math.floor(x*o)}),v.attr({width:Math.floor(x*o),height:x})):"natural"===this.settings.imageBehaviour?(v.css({"margin-left":"auto","margin-right":"auto",display:"block",width:Math.floor(x*o),height:x}),v.attr({width:Math.floor(x*o),height:x})):"crop"===this.settings.imageBehaviour&&(v.css({"margin-top":-Math.floor((_/o-x)/2),"margin-left":"0px",width:_,height:Math.floor(_/o)}),v.attr({width:_,height:Math.floor(_/o)})),void 0)},this))}else if(r.hasClass("slideshow_slide_video")){var M=r.find("iframe");if(M.length>0)M.attr({width:r.width(),height:r.height()});else var W=setInterval(t.proxy(function(){if(i.youTubeAPIReady){clearInterval(W);var e=r.find(".slideshow_slide_video_id");e.attr("id","slideshow_slide_video_"+Math.floor(1e6*Math.random())+"_"+e.text());var h=e.attr("data-show-related-videos"),s=new YT.Player(e.attr("id"),{width:r.width(),height:r.height(),videoId:e.text(),playerVars:{wmode:"opaque",rel:h},events:{onReady:function(){},onStateChange:t.proxy(function(t){this.videoPlayers[e.attr("id")].state=t.data},this)}}),o=t("#"+e.attr("id"));o.show(),o.attr("src",o.attr("src")+"&wmode=opaque"),this.videoPlayers[e.attr("id")]={player:s,state:-1}}},this),500)}c+=r.outerWidth(!0)},this)),s.css({width:r,height:a})}}}}();
!function(){var t=jQuery,i=slideshow_jquery_image_gallery_script;i.Slideshow.prototype.activateDescriptions=function(){this.settings.showDescription&&(t.each(this.$slides.find(".slideshow_description_box"),t.proxy(function(i,s){var e=t(s);e.show(),this.settings.hideDescription?e.css({position:"absolute",top:this.$container.outerHeight(!0)}):e.css({position:"absolute",bottom:0})},this)),this.settings.hideDescription&&(this.$container.bind("slideshowResize",t.proxy(function(){t.each(this.$container.find(".slideshow_description_box"),t.proxy(function(i,s){t(s).css("top",this.$container.outerHeight(!0))},this))},this)),this.$container.bind("slideshowAnimationStart",t.proxy(function(){void 0!=this.visibleViews[1]&&t.each(t(this.$views[this.visibleViews[1]]).find(".slideshow_description_box"),t.proxy(function(i,s){t(s).css("top",this.$container.outerHeight(!0))},this))},this)),this.$slides.mouseenter(t.proxy(function(i){var s=t(i.currentTarget).find(".slideshow_description_box");this.descriptionTimer=setTimeout(t.proxy(function(){this.descriptionTimer="",s.stop(!0,!1).animate({top:this.$container.outerHeight(!0)-s.outerHeight(!0)},parseInt(1e3*this.settings.descriptionSpeed,10))},this),200)},this)),this.$slides.mouseleave(t.proxy(function(i){this.descriptionTimer!==!1&&(clearInterval(this.descriptionTimer),this.descriptionTimer=!1),t(i.currentTarget).find(".slideshow_description_box").stop(!0,!1).animate({top:this.$container.outerHeight(!0)},parseInt(1e3*this.settings.descriptionSpeed,10))},this))))},i.Slideshow.prototype.activateNavigationButtons=function(){var i,s;this.settings.controllable&&(i=this.$nextButton.data("nextText"),s=this.$previousButton.data("previousText"),("string"!=typeof i||"string"!=typeof s||i.length<=0||s.length<=0)&&(i=this.$nextButton.attr("data-next-text"),s=this.$previousButton.attr("data-previous-text")),this.$nextButton.html('<span class="assistive-text hide-text">'+i+"</span>").attr({tabindex:"0",title:i}),this.$previousButton.html('<span class="assistive-text hide-text">'+s+"</span>").attr({tabindex:"0",title:s}),this.$nextButton.click(t.proxy(function(){this.currentlyAnimating||(this.pauseAllVideos(),this.playState===this.PlayStates.PLAYING&&(this.pause(this.PlayStates.TEMPORARILY_PAUSED),this.play()),this.animateTo(this.getNextViewID(),1))},this)),this.$previousButton.click(t.proxy(function(){this.currentlyAnimating||(this.pauseAllVideos(),this.playState===this.PlayStates.PLAYING&&(this.pause(this.PlayStates.TEMPORARILY_PAUSED),this.play()),this.animateTo(this.getPreviousViewID(),-1))},this)),this.bindSubmitListener(this.$nextButton),this.bindSubmitListener(this.$previousButton),this.settings.hideNavigationButtons?(this.$container.mouseenter(t.proxy(function(){this.$nextButton.stop(!0,!0).fadeIn(100)},this)),this.$container.mouseleave(t.proxy(function(){this.$nextButton.stop(!0,!0).fadeOut(500)},this)),this.$container.mouseenter(t.proxy(function(){this.$previousButton.stop(!0,!0).fadeIn(100)},this)),this.$container.mouseleave(t.proxy(function(){this.$previousButton.stop(!0,!0).fadeOut(500)},this))):(this.$nextButton.show(),this.$previousButton.show()))},i.Slideshow.prototype.activateControlPanel=function(){this.settings.controlPanel&&(this.$togglePlayButton.attr("tabindex","0"),this.$container.bind("slideshowPlayStateChange",t.proxy(function(t,i){var s,e;this.$togglePlayButton.attr("role","button"),s=this.$togglePlayButton.data("playText"),e=this.$togglePlayButton.data("pauseText"),("string"!=typeof s||"string"!=typeof e||s.length<=0||e.length<=0)&&(s=this.$nextButton.attr("data-play-text"),e=this.$previousButton.attr("data-pause-text")),i===this.PlayStates.PLAYING?this.$togglePlayButton.html('<span class="assistive-text hide-text">'+e+"</span>").attr({"class":"slideshow_pause",title:e}):i===this.PlayStates.PAUSED&&this.$togglePlayButton.html('<span class="assistive-text hide-text">'+s+"</span>").attr({"class":"slideshow_play",title:s})},this)),this.$togglePlayButton.click(t.proxy(function(i){var s=t(i.currentTarget);s.hasClass("slideshow_play")?this.play():this.pause(this.PlayStates.PAUSED)},this)),this.bindSubmitListener(this.$togglePlayButton),this.settings.hideControlPanel?(this.$container.mouseenter(t.proxy(function(){this.$controlPanel.stop(!0,!0).fadeIn(100)},this)),this.$container.mouseleave(t.proxy(function(){this.$controlPanel.stop(!0,!0).fadeOut(500)},this))):this.$controlPanel.show())},i.Slideshow.prototype.activatePagination=function(){if(this.settings.showPagination){this.$pagination.find(".slideshow_pagination_center").html("<ul></ul>");var i=this.$pagination.find("ul");i.html(""),this.$views.each(t.proxy(function(t){var s="",e=parseInt(t,10)+1,n=this.$pagination.data("goToText");("string"!=typeof n||n.length<=0)&&(n=this.$pagination.attr("data-go-to-text")),t==this.currentViewID&&(s="slideshow_currentView"),i.append('<li class="slideshow_transparent '+s+'" data-view-id="'+t+'" role="button" title="'+n+" "+e+'"><span class="assistive-text hide-text">'+n+" "+e+"</span></li>")},this)),this.$pagination.find("li").attr("tabindex","0").click(t.proxy(function(i){var s,e=t(i.currentTarget);this.currentlyAnimating||(s=e.data("viewId"),isNaN(parseInt(s,10))&&(s=e.attr("data-view-id"),isNaN(parseInt(s,10)))||(this.pauseAllVideos(),this.playState===this.PlayStates.PLAYING&&(this.pause(this.PlayStates.TEMPORARILY_PAUSED),this.play()),this.animateTo(parseInt(s,10),0)))},this)),this.bindSubmitListener(this.$pagination.find("li")),this.$container.bind("slideshowAnimationStart",t.proxy(function(){var i=this.$pagination.find("li");i.each(t.proxy(function(i,s){t(s).removeClass("slideshow_currentView")},this)),t(i[this.currentViewID]).addClass("slideshow_currentView")},this)),this.settings.hidePagination?(this.$container.mouseenter(t.proxy(function(){this.$pagination.stop(!0,!0).fadeIn(100)},this)),this.$container.mouseleave(t.proxy(function(){this.$pagination.stop(!0,!0).fadeOut(500)},this))):this.$pagination.show()}},i.Slideshow.prototype.activatePauseOnHover=function(){this.settings.pauseOnHover&&(this.$container.mouseenter(t.proxy(function(){clearTimeout(this.pauseOnHoverTimer),this.playState!==this.PlayStates.PAUSED&&(this.pauseOnHoverTimer=setTimeout(t.proxy(function(){this.pause(this.PlayStates.TEMPORARILY_PAUSED)},this),500))},this)),this.$container.mouseleave(t.proxy(function(){clearTimeout(this.pauseOnHoverTimer),this.playState!==this.PlayStates.PAUSED&&this.interval===!1&&this.play()},this)))}}();
slideshow_jquery_image_gallery_backend_script_scriptsloadedFlag=!0;