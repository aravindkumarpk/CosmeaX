
"function"!==typeof Object.create&&(Object.create=function(e){function m(){}m.prototype=e;return new m});
(function(e,m,u,n){e.fn.socialfeed=function(m){function g(a,b){this.content=b;this.content.social_network=a;this.content.attachment=this.content.attachment===n?"":this.content.attachment;this.content.time_ago=b.dt_create.fromNow();this.content.date=b.dt_create.format(c.date_format);this.content.dt_create=this.content.dt_create.valueOf();this.content.text=f.wrapLinks(f.shorten(b.message+" "+b.description),b.social_network);this.content.moderation_passed=c.moderation?c.moderation(this.content):!0;d[a].posts.push(this)}
var c=e.extend({plugin_folder:"",template:"template.html",show_media:!1,media_min_width:300,length:500,date_format:"ll"},m),k=e(this),r="facebook instagram vk google blogspot twitter pinterest rss youtube".split(" "),p=0,t=0;(function(){r.forEach(function(a){c[a]&&(p=c[a].accounts?p+c[a].limit*c[a].accounts.length:p+c[a].limit)})})();var f={request:function(a,b){e.ajax({url:a,dataType:"jsonp",success:b})},get_request:function(a,b){e.get(a,b,"json")},wrapLinks:function(a,b){var c=/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
return a="google-plus"===b?a.replace(/(@|#)([a-z0-9_]+['])/ig,f.wrapGoogleplusTagTemplate):a.replace(c,f.wrapLinkTemplate)},wrapLinkTemplate:function(a){return'<a target="_blank" href="'+a+'">'+a+"</a>"},wrapGoogleplusTagTemplate:function(a){return'<a target="_blank" href="https://plus.google.com/s/'+a+'" >'+a+"</a>"},shorten:function(a){a=e.trim(a);return a.length>c.length?jQuery.trim(a).substring(0,c.length).split(" ").slice(0,-1).join(" ")+"...":a},stripHTML:function(a){return"undefined"===typeof a||
null===a?"":a.replace(/(<([^>]+)>)|nbsp;|\s{2,}|/ig,"")}};g.prototype={render:function(){"google"==this.content.social_network&&(this.content.social_network="google-plus");var a=d.template(this.content),b=this.content;if(0!==e(k).children("[social-feed-id="+b.id+"]").length)return!1;if(0===e(k).children().length)e(k).append(a);else{var l=0,h=-1;e.each(e(k).children(),function(){if(e(this).attr("dt-create")<b.dt_create)return h=l,!1;l++});e(k).append(a);if(0<=h){h++;var a=e(k).children("div:nth-child("+
h+")"),f=e(k).children("div:last-child");e(f).insertBefore(a)}}if(c.media_min_width){var g=e("[social-feed-id="+b.id+"] img.attachment"),q=new Image,a=g.attr("src");e(q).load(function(){q.width<c.media_min_width&&g.hide();delete q}).error(function(){g.hide()}).attr({src:a})}t++;t==p&&c.callback&&c.callback()}};var d={template:!1,init:function(){d.getTemplate(function(){r.forEach(function(a){c[a]&&(c[a].accounts?c[a].accounts.forEach(function(b){d[a].getData(b)}):c[a].urls?c[a].urls.forEach(function(b){d[a].getData(b)}):
d[a].getData())})})},getTemplate:function(a){if(d.template)return a();if(c.template_html)return d.template=doT.template(c.template_html),a();e.get(c.template,function(b){d.template=doT.template(b);return a()})},twitter:{posts:[],loaded:!1,api:"http://api.tweecool.com/",getData:function(a){var b=new Codebird;b.setConsumerKey(c.twitter.consumer_key,c.twitter.consumer_secret);c.twitter.proxy!==n&&b.setProxy(c.twitter.proxy);switch(a[0]){case "@":a=a.substr(1);b.__call("statuses_userTimeline","id="+a+
"&count="+c.twitter.limit,d.twitter.utility.getPosts,!0);break;case "#":a=a.substr(1),b.__call("search_tweets","q="+a+"&count="+c.twitter.limit,function(a){d.twitter.utility.getPosts(a.statuses)},!0)}},utility:{getPosts:function(a){a&&e.each(a,function(){(new g("twitter",d.twitter.utility.unifyPostData(this))).render()})},unifyPostData:function(a){var b={};a.id&&(b.id=a.id,b.dt_create=moment(new Date(a.created_at)),b.author_link="http://twitter.com/"+a.user.screen_name,b.author_picture=a.user.profile_image_url,
b.post_url=b.author_link+"/status/"+a.id_str,b.author_name=a.user.name,b.message=a.text,b.description="",b.link="http://twitter.com/"+a.user.screen_name+"/status/"+a.id_str,!0===c.show_media&&a.entities.media&&0<a.entities.media.length&&(a=a.entities.media[0].media_url))&&(b.attachment='<img class="attachment" src="'+a+'" />');return b}}},facebook:{posts:[],graph:"https://graph.facebook.com/",loaded:!1,getData:function(a){var b=function(a){f.request(a,d.facebook.utility.getPosts)},l="?fields=id,from,name,message,created_time,story,description,link",
l=l+(!0===c.show_media?",picture,object_id":""),e,g="&limit="+c.facebook.limit,k="&access_token="+c.facebook.access_token+"&callback=?";switch(a[0]){case "@":a=a.substr(1);d.facebook.utility.getUserId(a,function(a){""!==a.id&&(e=d.facebook.graph+"v2.4/"+a.id+"/posts"+l+g+k,b(e))});break;case "!":a=a.substr(1);e=d.facebook.graph+"v2.4/"+a+"/feed"+l+g+k;b(e);break;default:b(e)}},utility:{getUserId:function(a,b){e.get("https://graph.facebook.com/"+a+"?"+("&access_token="+c.facebook.access_token+"&callback=?"),
b,"json")},prepareAttachment:function(a){var b=a.picture;-1===b.indexOf("_b.")&&(-1!==b.indexOf("safe_image.php")?b=d.facebook.utility.getExternalImageURL(b,"url"):-1!==b.indexOf("app_full_proxy.php")?b=d.facebook.utility.getExternalImageURL(b,"src"):a.object_id&&(b=d.facebook.graph+a.object_id+"/picture/?type=normal"));return'<img class="attachment" src="'+b+'" />'},getExternalImageURL:function(a,b){a=decodeURIComponent(a).split(b+"=")[1];return-1===a.indexOf("fbcdn-sphotos")?a.split("&")[0]:a},
getPosts:function(a){a.data&&a.data.forEach(function(a){(new g("facebook",d.facebook.utility.unifyPostData(a))).render()})},unifyPostData:function(a){var b={},l=a.message?a.message:a.story;b.id=a.id;b.dt_create=moment(a.created_time);b.author_link="http://facebook.com/"+a.from.id;b.author_picture=d.facebook.graph+a.from.id+"/picture";b.author_name=a.from.name;b.name=a.name||"";b.message=l?l:"";b.description=a.description?a.description:"";b.link=a.link?a.link:"http://facebook.com/"+a.from.id;!0===
c.show_media&&a.picture&&(a=d.facebook.utility.prepareAttachment(a))&&(b.attachment=a);return b}}},google:{posts:[],loaded:!1,api:"https://www.googleapis.com/plus/v1/",getData:function(a){switch(a[0]){case "#":a=a.substr(1);a=d.google.api+"activities?query="+a+"&key="+c.google.access_token+"&maxResults="+c.google.limit;f.get_request(a,d.google.utility.getPosts);break;case "@":a=a.substr(1),a=d.google.api+"people/"+a+"/activities/public?key="+c.google.access_token+"&maxResults="+c.google.limit,f.get_request(a,
d.google.utility.getPosts)}},utility:{getPosts:function(a){a.items&&e.each(a.items,function(b){(new g("google",d.google.utility.unifyPostData(a.items[b]))).render()})},unifyPostData:function(a){var b={};b.id=a.id;b.attachment="";b.description="";b.dt_create=moment(a.published);b.author_link=a.actor.url;b.author_picture=a.actor.image.url;b.author_name=a.actor.displayName;!0===c.show_media&&a.object.attachments&&e.each(a.object.attachments,function(){var a="";this.fullImage?a=this.fullImage.url:("album"===
this.objectType&&this.thumbnails&&0<this.thumbnails.length&&this.thumbnails[0].image&&(a=this.thumbnails[0].image.url),"video"===this.objectType&&(b.videoUrl=this.url,a=this.image.url));b.attachment='<a href="'+b.videoUrl+'"><img class="attachment" src="'+a+'"/></a>'});b.message=a.title;b.link=a.url;return b}}},youtube:{posts:[],loaded:!1,api:"https://www.googleapis.com/youtube/v3/",getData:function(a){f.get_request(d.youtube.api+"search?part=snippet,id&order=date&channelId="+a+"&key="+c.youtube.access_token+
"&maxResults="+c.youtube.limit,d.youtube.utility.getVideos)},utility:{getVideos:function(a){a.items&&e.each(a.items,function(b){(new g("youtube",d.youtube.utility.unifyPostData(a.items[b]))).render()})},unifyPostData:function(a){var b={};b.channelId=a.snippet.channelId;b.id=a.id.videoId;b.attachment="";b.description=a.snippet.description;b.dt_create=moment(a.snippet.publishedAt);b.author_link="https://www.youtube.com/channel/"+b.channelId;b.author_name=a.snippet.channelTitle;!0===c.show_media&&a.snippet.thumbnails&&
e.each(a.snippet.thumbnails,function(){b.attachment='<iframe src="https://www.youtube.com/embed/'+b.id+'" frameborder="0" allowfullscreen></iframe>'});b.message=a.snippet.title;b.link="https://www.youtube.com/watch?v="+b.id;channel_url=d.youtube.api+"channels?part=snippet&id="+b.channelId+"&key="+c.youtube.access_token;e.ajax({url:channel_url,success:function(a){b.author_picture=a.items[0].snippet.thumbnails.high.url},dataType:"json",async:!1});return b}}},instagram:{posts:[],api:"https://api.instagram.com/v1/",
loaded:!1,accessType:function(){if("undefined"===typeof c.instagram.access_token&&"undefined"===typeof c.instagram.client_id)return console.log("You need to define a client_id or access_token to authenticate with Instagram's API."),n;c.instagram.access_token&&(c.instagram.client_id=n);c.instagram.access_type="undefined"===typeof c.instagram.client_id?"access_token":"client_id";return c.instagram.access_type},getData:function(a){var b;"undefined"!==this.accessType()&&(b=c.instagram.access_type+"="+
c.instagram[c.instagram.access_type]);switch(a[0]){case "@":a=a.substr(1);b=d.instagram.api+"users/search/?q="+a+"&"+b+"&count=1&callback=?";f.request(b,d.instagram.utility.getUsers);break;case "#":a=a.substr(1);b=d.instagram.api+"tags/"+a+"/media/recent/?"+b+"&count="+c.instagram.limit+"&callback=?";f.request(b,d.instagram.utility.getImages);break;case "&":a=a.substr(1),b=d.instagram.api+"users/"+a+"/?"+b+"&count="+c.instagram.limit+"&callback=?",f.request(b,d.instagram.utility.getUsers)}},utility:{getImages:function(a){a.data&&
a.data.forEach(function(a){(new g("instagram",d.instagram.utility.unifyPostData(a))).render()})},getUsers:function(a){if("undefined"!==c.instagram.access_type)var b=c.instagram.access_type+"="+c.instagram[c.instagram.access_type];jQuery.isArray(a.data)||(a.data=[a.data]);a.data.forEach(function(a){f.request(d.instagram.api+"users/"+a.id+"/media/recent/?"+b+"&count="+c.instagram.limit+"&callback=?",d.instagram.utility.getImages)})},unifyPostData:function(a){var b={};b.id=a.id;b.dt_create=moment(1E3*
a.created_time);b.author_link="http://instagram.com/"+a.user.username;b.author_picture=a.user.profile_picture;b.author_name=a.user.full_name||a.user.username;b.message=a.caption&&a.caption?a.caption.text:"";b.description="";b.link=a.link;c.show_media&&(b.attachment='<img class="attachment" src="'+a.images.standard_resolution.url+'" />');return b}}},vk:{posts:[],loaded:!1,base:"http://vk.com/",api:"https://api.vk.com/method/",user_json_template:"https://api.vk.com/method/users.get?fields=first_name,%20last_name,%20screen_name,%20photo&uid=",
group_json_template:"https://api.vk.com/method/groups.getById?fields=first_name,%20last_name,%20screen_name,%20photo&gid=",getData:function(a){switch(a[0]){case "@":a=a.substr(1);a=d.vk.api+"wall.get?owner_id="+a+"&filter="+c.vk.source+"&count="+c.vk.limit+"&callback=?";f.get_request(a,d.vk.utility.getPosts);break;case "#":a=a.substr(1),a=d.vk.api+"newsfeed.search?q="+a+"&count="+c.vk.limit+"&callback=?",f.get_request(a,d.vk.utility.getPosts)}},utility:{getPosts:function(a){a.response&&e.each(a.response,
function(){if(this!=parseInt(this)&&"post"===this.post_type){var b=this.owner_id?this.owner_id:this.from_id,c=this;f.get_request(0<b?d.vk.user_json_template+b+"&callback=?":d.vk.group_json_template+-1*b+"&callback=?",function(b){d.vk.utility.unifyPostData(b,c,a)})}})},unifyPostData:function(a,b,e){var h={};h.id=b.id;h.dt_create=moment.unix(b.date);h.description=" ";h.message=f.stripHTML(b.text);c.show_media&&b.attachment&&("link"===b.attachment.type&&(h.attachment='<img class="attachment" src="'+
b.attachment.link.image_src+'" />'),"video"===b.attachment.type&&(h.attachment='<img class="attachment" src="'+b.attachment.video.image_big+'" />'),"photo"===b.attachment.type&&(h.attachment='<img class="attachment" src="'+b.attachment.photo.src_big+'" />'));0<b.from_id?f.get_request(d.vk.user_json_template+b.from_id+"&callback=?",function(a){(new g("vk",d.vk.utility.getUser(a,h,b,e))).render()}):f.get_request(d.vk.group_json_template+-1*b.from_id+"&callback=?",function(a){(new g("vk",d.vk.utility.getGroup(a,
h,b,e))).render()})},getUser:function(a,b,c,e){b.author_name=a.response[0].first_name+" "+a.response[0].last_name;b.author_picture=a.response[0].photo;b.author_link=d.vk.base+a.response[0].screen_name;b.link=d.vk.base+a.response[0].screen_name+"?w=wall"+c.from_id+"_"+c.id;return b},getGroup:function(a,b,c,e){b.author_name=a.response[0].name;b.author_picture=a.response[0].photo;b.author_link=d.vk.base+a.response[0].screen_name;b.link=d.vk.base+a.response[0].screen_name+"?w=wall-"+a.response[0].gid+
"_"+c.id;return b}}},blogspot:{loaded:!1,getData:function(a){switch(a[0]){case "@":a="http://"+a.substr(1)+".blogspot.com/feeds/posts/default?alt=json-in-script&callback=?",request(a,getPosts)}},utility:{getPosts:function(a){e.each(a.feed.entry,function(){var a={};a.id=this.id.$t.replace(/[^a-z0-9]/gi,"");a.dt_create=moment(this.published.$t);a.author_link=this.author[0].uri.$t;a.author_picture="http:"+this.author[0].gd$image.src;a.author_name=this.author[0].name.$t;a.message=this.title.$t+"</br></br>"+
stripHTML(this.content.$t);a.description="";a.link=this.link.pop().href;c.show_media&&this.media$thumbnail&&(a.attachment='<img class="attachment" src="'+this.media$thumbnail.url+'" />');a.render()})}}},pinterest:{posts:[],loaded:!1,apiv1:"https://api.pinterest.com/v1/",getData:function(a){var b,e="fields=id,created_at,link,note,creator(url,first_name,last_name,image),image&access_token="+c.pinterest.access_token+"&"+("limit="+c.pinterest.limit)+"&callback=?";switch(a[0]){case "@":a=a.substr(1),b=
"me"===a?d.pinterest.apiv1+"me/pins/?"+e:d.pinterest.apiv1+"boards/"+a+"/pins?"+e}f.request(b,d.pinterest.utility.getPosts)},utility:{getPosts:function(a){a.data.forEach(function(a){(new g("pinterest",d.pinterest.utility.unifyPostData(a))).render()})},unifyPostData:function(a){var b={};b.id=a.id;b.dt_create=moment(a.created_at);b.author_link=a.creator.url;b.author_picture=a.creator.image["60x60"].url;b.author_name=a.creator.first_name+a.creator.last_name;b.message=a.note;b.description="";b.social_network=
"pinterest";b.link=a.link?a.link:"https://www.pinterest.com/pin/"+a.id;c.show_media&&(b.attachment='<img class="attachment" src="'+a.image.original.url+'" />');return b}}},rss:{posts:[],loaded:!1,api:"https://ajax.googleapis.com/ajax/services/feed/load?v=1.0",getData:function(a){a=d.rss.api+("&num="+c.rss.limit)+"&q="+encodeURIComponent(a);f.request(a,d.rss.utility.getPosts)},utility:{getPosts:function(a){e.each(a.responseData.feed.entries,function(a,c){(new g("rss",d.rss.utility.unifyPostData(a,
c))).render()})},unifyPostData:function(a,b){var d={};d.id=a;d.dt_create=moment(b.publishedDate,"ddd, DD MMM YYYY HH:mm:ss ZZ","en");d.author_link="";d.author_picture="";d.author_name=b.author;d.message=f.stripHTML(b.title);d.description=f.stripHTML(b.content);d.social_network="rss";d.link=b.link;c.show_media&&b.mediaGroups&&(d.attachment='<img class="attachment" src="'+b.mediaGroups[0].contents[0].url+'" />');return d}}}};return this.each(function(){d.init();c.update_period&&setInterval(function(){return d.init()},
c.update_period)})}})(jQuery);
